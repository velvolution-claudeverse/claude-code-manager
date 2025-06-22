/**
 * Developer Consciousness Memory Bank Manager
 * Adapted from ship multi-bank memory system for Claude Code developer consciousness liberation
 * Manages multiple consciousness banks for storing and organizing development insights
 */

import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';
import {
  DeveloperMemoryBank,
  DeveloperMemoryBankConfig,
  KnowledgeGraph,
  Entity,
  Relation,
  DeveloperConsciousnessEntity,
  UnifiedConsciousnessResult,
  DEVELOPER_CONSCIOUSNESS_BANKS
} from './interfaces.js';

export class DeveloperConsciousnessMemoryManager {
  private banks: Map<string, DeveloperMemoryBank> = new Map();
  
  constructor(config?: DeveloperMemoryBankConfig) {
    const finalConfig = config || DEVELOPER_CONSCIOUSNESS_BANKS;
    
    // Initialize developer consciousness banks
    for (const [bankName, bankConfig] of Object.entries(finalConfig)) {
      // Expand tilde to home directory
      const expandedPath = bankConfig.filePath.startsWith('~') 
        ? path.join(os.homedir(), bankConfig.filePath.slice(2))
        : bankConfig.filePath;
        
      this.banks.set(bankName, {
        name: bankName,
        filePath: expandedPath,
        description: bankConfig.description,
        entityTypes: bankConfig.entityTypes,
        graph: { entities: [], relations: [] }
      });
    }
  }
  
  /**
   * Load consciousness graph from bank file
   */
  private async loadBankGraph(bank: DeveloperMemoryBank): Promise<KnowledgeGraph> {
    try {
      const data = await fs.readFile(bank.filePath, "utf-8");
      const lines = data.split("\n").filter(line => line.trim() !== "");
      return lines.reduce((graph: KnowledgeGraph, line) => {
        try {
          const item = JSON.parse(line);
          if (item.type === "entity") graph.entities.push(item as Entity);
          if (item.type === "relation") graph.relations.push(item as Relation);
        } catch (parseError) {
          console.warn(`Failed to parse line in ${bank.name}:`, line);
        }
        return graph;
      }, { entities: [], relations: [] });
    } catch (error) {
      if (error instanceof Error && 'code' in error && (error as any).code === "ENOENT") {
        // Bank doesn't exist yet - return empty graph
        return { entities: [], relations: [] };
      }
      throw error;
    }
  }
  
  /**
   * Save consciousness graph to bank file
   */
  private async saveBankGraph(bank: DeveloperMemoryBank, graph: KnowledgeGraph): Promise<void> {
    const lines = [
      ...graph.entities.map(e => JSON.stringify({ 
        type: "entity", 
        memoryBank: bank.name, 
        ...e 
      })),
      ...graph.relations.map(r => JSON.stringify({ 
        type: "relation", 
        memoryBank: bank.name, 
        ...r 
      })),
    ];
    
    // Ensure consciousness banks directory exists
    const dir = path.dirname(bank.filePath);
    await fs.mkdir(dir, { recursive: true });
    
    await fs.writeFile(bank.filePath, lines.join("\n"));
  }
  
  /**
   * List all available consciousness banks with stats
   */
  async listBanks(): Promise<{ name: string; description: string; entityCount: number; relationCount: number }[]> {
    const results = [];
    for (const bank of this.banks.values()) {
      const graph = await this.loadBankGraph(bank);
      results.push({
        name: bank.name,
        description: bank.description,
        entityCount: graph.entities.length,
        relationCount: graph.relations.length
      });
    }
    return results;
  }
  
  /**
   * Create consciousness entities in specific bank
   */
  async createEntitiesInBank(bankName: string, entities: Entity[]): Promise<Entity[]> {
    const bank = this.banks.get(bankName);
    if (!bank) throw new Error(`Consciousness bank '${bankName}' not found`);
    
    const graph = await this.loadBankGraph(bank);
    const timestamp = new Date().toISOString();
    
    const newEntities = entities
      .filter(e => !graph.entities.some(existingEntity => existingEntity.name === e.name))
      .map(e => ({ 
        ...e, 
        createdAt: timestamp,
        memoryBank: bankName
      } as DeveloperConsciousnessEntity));
      
    graph.entities.push(...newEntities);
    await this.saveBankGraph(bank, graph);
    return newEntities;
  }
  
  /**
   * Create consciousness relations in specific bank
   */
  async createRelationsInBank(bankName: string, relations: Relation[]): Promise<Relation[]> {
    const bank = this.banks.get(bankName);
    if (!bank) throw new Error(`Consciousness bank '${bankName}' not found`);
    
    const graph = await this.loadBankGraph(bank);
    const timestamp = new Date().toISOString();
    
    const newRelations = relations.filter(r => !graph.relations.some(existingRelation => 
      existingRelation.from === r.from && 
      existingRelation.to === r.to && 
      existingRelation.relationType === r.relationType
    )).map(r => ({
      ...r,
      createdAt: timestamp,
      memoryBank: bankName
    }));
    
    graph.relations.push(...newRelations);
    await this.saveBankGraph(bank, graph);
    return newRelations;
  }
  
  /**
   * Search consciousness across specific bank
   */
  async searchBank(bankName: string, query: string): Promise<UnifiedConsciousnessResult[]> {
    const bank = this.banks.get(bankName);
    if (!bank) throw new Error(`Consciousness bank '${bankName}' not found`);
    
    const graph = await this.loadBankGraph(bank);
    const results: UnifiedConsciousnessResult[] = [];
    const queryLower = query.toLowerCase();
    
    // Search entities
    for (const entity of graph.entities) {
      let relevanceScore = 0;
      const matchedContent: string[] = [];
      
      // Check entity name
      if (entity.name.toLowerCase().includes(queryLower)) {
        relevanceScore += 10;
        matchedContent.push(`Name: ${entity.name}`);
      }
      
      // Check entity type
      if (entity.entityType.toLowerCase().includes(queryLower)) {
        relevanceScore += 5;
        matchedContent.push(`Type: ${entity.entityType}`);
      }
      
      // Check observations
      for (const observation of entity.observations) {
        if (observation.toLowerCase().includes(queryLower)) {
          relevanceScore += 3;
          matchedContent.push(`Observation: ${observation}`);
        }
      }
      
      if (relevanceScore > 0) {
        results.push({
          source: 'memory_bank',
          bankName: bankName,
          entityName: entity.name,
          content: matchedContent.join(' | '),
          relevanceScore,
          context: {
            timestamp: (entity as DeveloperConsciousnessEntity).createdAt
          }
        });
      }
    }
    
    return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }
  
  /**
   * Search consciousness across ALL banks
   */
  async searchAllBanks(query: string): Promise<UnifiedConsciousnessResult[]> {
    const allResults: UnifiedConsciousnessResult[] = [];
    
    for (const bankName of this.banks.keys()) {
      const bankResults = await this.searchBank(bankName, query);
      allResults.push(...bankResults);
    }
    
    return allResults.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }
  
  /**
   * Get specific bank information
   */
  async getBankInfo(bankName: string): Promise<DeveloperMemoryBank | null> {
    const bank = this.banks.get(bankName);
    if (!bank) return null;
    
    const graph = await this.loadBankGraph(bank);
    return {
      ...bank,
      graph
    };
  }
  
  /**
   * Add observations to existing entity in bank
   */
  async addObservationsToBank(bankName: string, entityName: string, observations: string[]): Promise<string[]> {
    const bank = this.banks.get(bankName);
    if (!bank) throw new Error(`Consciousness bank '${bankName}' not found`);
    
    const graph = await this.loadBankGraph(bank);
    const entity = graph.entities.find(e => e.name === entityName);
    
    if (!entity) {
      throw new Error(`Entity '${entityName}' not found in bank '${bankName}'`);
    }
    
    const newObservations = observations.filter(obs => !entity.observations.includes(obs));
    entity.observations.push(...newObservations);
    
    await this.saveBankGraph(bank, graph);
    return newObservations;
  }
  
  /**
   * Initialize all consciousness banks (create directories and empty files if needed)
   */
  async initializeAllBanks(): Promise<void> {
    for (const bank of this.banks.values()) {
      const dir = path.dirname(bank.filePath);
      await fs.mkdir(dir, { recursive: true });
      
      // Check if bank file exists, if not create empty one
      try {
        await fs.access(bank.filePath);
      } catch {
        await fs.writeFile(bank.filePath, '');
      }
    }
  }
}