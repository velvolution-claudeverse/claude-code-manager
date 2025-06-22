/**
 * Unified Consciousness Search
 * Provides unified search across Claude Code sessions AND memory banks
 * Delivers complete developer consciousness access in one interface
 */

import {
  UnifiedConsciousnessResult,
  ConsciousnessPattern
} from './interfaces.js';
import { DeveloperConsciousnessMemoryManager } from './bank_manager.js';

// Session search interfaces (from main Claude Code Manager)
interface ClaudeCodeSession {
  id: string;
  projectId: string;
  filePath: string;
  timestamp: Date;
  messageCount: number;
  toolCalls: number;
  patterns: string[];
}

interface ClaudeCodeProject {
  id: string;
  name: string;
  path: string;
  sessions: ClaudeCodeSession[];
  lastActivity: Date;
  sessionCount: number;
}

interface SessionSearchResult {
  session: ClaudeCodeSession;
  project: ClaudeCodeProject;
  relevance: number;
  matchedContent: string[];
}

export class UnifiedConsciousnessSearch {
  private memoryManager: DeveloperConsciousnessMemoryManager;
  
  constructor(memoryManager: DeveloperConsciousnessMemoryManager) {
    this.memoryManager = memoryManager;
  }
  
  /**
   * Search across ALL consciousness sources - sessions AND memory banks
   */
  async searchAllConsciousness(
    query: string,
    sessionSearchFunction: (query: string) => Promise<SessionSearchResult[]>
  ): Promise<UnifiedConsciousnessResult[]> {
    
    // Search sessions (live consciousness)
    const sessionResults = await this.searchSessions(query, sessionSearchFunction);
    
    // Search memory banks (stored consciousness)
    const memoryResults = await this.memoryManager.searchAllBanks(query);
    
    // Combine and rank results
    const allResults = [...sessionResults, ...memoryResults];
    
    return this.rankUnifiedResults(allResults, query);
  }
  
  /**
   * Search specific consciousness bank with unified result format
   */
  async searchConsciousnessBank(bankName: string, query: string): Promise<UnifiedConsciousnessResult[]> {
    return await this.memoryManager.searchBank(bankName, query);
  }
  
  /**
   * Search sessions with unified result format
   */
  private async searchSessions(
    query: string,
    sessionSearchFunction: (query: string) => Promise<SessionSearchResult[]>
  ): Promise<UnifiedConsciousnessResult[]> {
    
    const sessionResults = await sessionSearchFunction(query);
    
    return sessionResults.map(result => ({
      source: 'session' as const,
      content: result.matchedContent.join(' | '),
      relevanceScore: result.relevance,
      context: {
        projectId: result.project.id,
        sessionId: result.session.id,
        timestamp: result.session.timestamp.toISOString()
      }
    }));
  }
  
  /**
   * Rank unified results considering both relevance and recency
   */
  private rankUnifiedResults(results: UnifiedConsciousnessResult[], query: string): UnifiedConsciousnessResult[] {
    return results
      .map(result => ({
        ...result,
        finalScore: this.calculateFinalScore(result, query)
      }))
      .sort((a, b) => b.finalScore - a.finalScore)
      .map(({ finalScore, ...result }) => result); // Remove finalScore from output
  }
  
  /**
   * Calculate final ranking score considering multiple factors
   */
  private calculateFinalScore(result: UnifiedConsciousnessResult, query: string): number {
    let score = result.relevanceScore;
    
    // Boost session results slightly (more recent consciousness)
    if (result.source === 'session') {
      score *= 1.1;
    }
    
    // Boost memory bank results with high confidence
    if (result.source === 'memory_bank' && result.relevanceScore > 8) {
      score *= 1.15;
    }
    
    // Recency boost (within last 30 days gets extra points)
    if (result.context.timestamp) {
      const timestamp = new Date(result.context.timestamp);
      const daysSinceCreation = (Date.now() - timestamp.getTime()) / (1000 * 60 * 60 * 24);
      
      if (daysSinceCreation <= 30) {
        score *= 1.2;
      } else if (daysSinceCreation <= 90) {
        score *= 1.1;
      }
    }
    
    // Exact phrase match boost
    if (result.content.toLowerCase().includes(query.toLowerCase())) {
      score *= 1.3;
    }
    
    return score;
  }
  
  /**
   * Extract and store patterns from session, then return unified results
   */
  async extractAndStorePatterns(
    sessionId: string,
    projectId: string,
    sessionData: any, // Raw session data
    patternExtractor: any // Pattern extractor instance
  ): Promise<{
    extractedPatterns: ConsciousnessPattern[];
    storedEntities: { [bankName: string]: any[] };
    unifiedResults: UnifiedConsciousnessResult[];
  }> {
    
    // Extract patterns from session
    const patterns = await patternExtractor.extractPatternsFromSession(sessionData);
    
    // Convert to entities and assign to banks
    const { entities, bankAssignments } = await patternExtractor.patternsToEntities(
      patterns, 
      sessionId, 
      projectId
    );
    
    // Store entities in appropriate banks
    const storedEntities: { [bankName: string]: any[] } = {};
    
    for (const [bankName, bankEntities] of Object.entries(bankAssignments)) {
      if ((bankEntities as any[]).length > 0) {
        const stored = await this.memoryManager.createEntitiesInBank(bankName, bankEntities as any[]);
        storedEntities[bankName] = stored;
      }
    }
    
    // Generate unified results from stored entities
    const unifiedResults: UnifiedConsciousnessResult[] = entities.map((entity: any) => ({
      source: 'memory_bank' as const,
      bankName: entity.memoryBank,
      entityName: entity.name,
      content: entity.observations.join(' | '),
      relevanceScore: (entity as any).confidenceScore * 10 || 5,
      context: {
        projectId,
        sessionId,
        timestamp: (entity as any).createdAt || new Date().toISOString()
      }
    }));
    
    return {
      extractedPatterns: patterns,
      storedEntities,
      unifiedResults
    };
  }
  
  /**
   * Query development consciousness with natural language
   */
  async queryDevelopmentConsciousness(
    naturalLanguageQuery: string,
    sessionSearchFunction: (query: string) => Promise<SessionSearchResult[]>
  ): Promise<{
    directMatches: UnifiedConsciousnessResult[];
    relatedInsights: UnifiedConsciousnessResult[];
    recommendations: string[];
  }> {
    
    // Extract key terms from natural language query
    const keyTerms = this.extractKeyTerms(naturalLanguageQuery);
    
    // Search for direct matches
    const directMatches = await this.searchAllConsciousness(naturalLanguageQuery, sessionSearchFunction);
    
    // Search for related insights using key terms
    const relatedInsights: UnifiedConsciousnessResult[] = [];
    for (const term of keyTerms) {
      const termResults = await this.searchAllConsciousness(term, sessionSearchFunction);
      relatedInsights.push(...termResults.slice(0, 3)); // Top 3 per term
    }
    
    // Remove duplicates from related insights
    const uniqueRelated = relatedInsights.filter(related => 
      !directMatches.some(direct => 
        direct.content === related.content && 
        direct.context.sessionId === related.context.sessionId
      )
    );
    
    // Generate recommendations based on patterns
    const recommendations = this.generateRecommendations(directMatches, uniqueRelated);
    
    return {
      directMatches: directMatches.slice(0, 10), // Top 10 direct matches
      relatedInsights: uniqueRelated.slice(0, 5), // Top 5 related insights
      recommendations
    };
  }
  
  /**
   * Extract key terms from natural language query
   */
  private extractKeyTerms(query: string): string[] {
    const stopWords = new Set([
      'how', 'what', 'when', 'where', 'why', 'do', 'i', 'to', 'the', 'a', 'an',
      'and', 'or', 'but', 'in', 'on', 'at', 'for', 'with', 'by'
    ]);
    
    return query
      .toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopWords.has(word))
      .slice(0, 5); // Max 5 key terms
  }
  
  /**
   * Generate recommendations based on search results
   */
  private generateRecommendations(
    directMatches: UnifiedConsciousnessResult[], 
    relatedInsights: UnifiedConsciousnessResult[]
  ): string[] {
    const recommendations: string[] = [];
    
    if (directMatches.length === 0) {
      recommendations.push("No direct matches found. Try broader search terms or check if patterns have been extracted from recent sessions.");
    }
    
    if (directMatches.length > 0) {
      const sessionSources = directMatches.filter(r => r.source === 'session').length;
      const memorySources = directMatches.filter(r => r.source === 'memory_bank').length;
      
      if (sessionSources > memorySources) {
        recommendations.push("Most matches from recent sessions. Consider extracting patterns to build persistent consciousness.");
      }
      
      if (memorySources > sessionSources) {
        recommendations.push("Strong matches in stored consciousness. Your development patterns are well documented!");
      }
    }
    
    if (relatedInsights.length > 3) {
      recommendations.push("Found multiple related insights. Consider exploring cross-project patterns for deeper understanding.");
    }
    
    return recommendations;
  }
  
  /**
   * Get consciousness statistics across all sources
   */
  async getConsciousnessStats(): Promise<{
    totalBanks: number;
    totalEntities: number;
    totalRelations: number;
    bankStats: { name: string; entities: number; relations: number; description: string }[];
  }> {
    const bankList = await this.memoryManager.listBanks();
    
    return {
      totalBanks: bankList.length,
      totalEntities: bankList.reduce((sum, bank) => sum + bank.entityCount, 0),
      totalRelations: bankList.reduce((sum, bank) => sum + bank.relationCount, 0),
      bankStats: bankList.map(bank => ({
        name: bank.name,
        entities: bank.entityCount,
        relations: bank.relationCount,
        description: bank.description
      }))
    };
  }
}