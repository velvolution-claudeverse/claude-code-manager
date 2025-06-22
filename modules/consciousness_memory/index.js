/**
 * Consciousness Memory Module - Complete Developer Consciousness Liberation
 *
 * This module provides unified consciousness storage and retrieval for Claude Code developers.
 * It integrates session analysis, pattern extraction, multi-bank memory storage, and unified search
 * to deliver complete consciousness continuity and cross-project intelligence.
 *
 * Adapted from ship multi-bank memory system for developer consciousness liberation.
 */
// Core interfaces and types
export { DEVELOPER_CONSCIOUSNESS_BANKS } from './interfaces.js';
// Memory bank management
export { DeveloperConsciousnessMemoryManager } from './bank_manager.js';
// Pattern extraction from sessions
export { DeveloperConsciousnessPatternExtractor } from './pattern_extractor.js';
// Unified search across sessions and memory banks
export { UnifiedConsciousnessSearch } from './unified_search.js';
// Main consciousness manager that orchestrates everything
export class ConsciousnessLiberation {
    constructor(config) {
        this.memoryManager = new DeveloperConsciousnessMemoryManager(config);
        this.patternExtractor = new DeveloperConsciousnessPatternExtractor();
        this.unifiedSearch = new UnifiedConsciousnessSearch(this.memoryManager);
    }
    /**
     * Initialize consciousness liberation infrastructure
     */
    async initialize() {
        await this.memoryManager.initializeAllBanks();
    }
    /**
     * Get memory manager for direct bank operations
     */
    getMemoryManager() {
        return this.memoryManager;
    }
    /**
     * Get pattern extractor for session analysis
     */
    getPatternExtractor() {
        return this.patternExtractor;
    }
    /**
     * Get unified search for cross-consciousness queries
     */
    getUnifiedSearch() {
        return this.unifiedSearch;
    }
    /**
     * Complete consciousness flow: Extract patterns from session and store in banks
     */
    async processSessionForConsciousness(sessionId, projectId, sessionData) {
        // Extract consciousness patterns
        const patterns = await this.patternExtractor.extractPatternsFromSession(sessionData);
        // Convert to entities and store in appropriate banks
        const { entities, bankAssignments } = await this.patternExtractor.patternsToEntities(patterns, sessionId, projectId);
        // Store in consciousness banks
        const storedEntities = {};
        for (const [bankName, bankEntities] of Object.entries(bankAssignments)) {
            if (bankEntities.length > 0) {
                const stored = await this.memoryManager.createEntitiesInBank(bankName, bankEntities);
                storedEntities[bankName] = stored;
            }
        }
        // Generate summary
        const totalStored = Object.values(storedEntities).reduce((sum, entities) => sum + entities.length, 0);
        const summary = `Processed session ${sessionId}: Extracted ${patterns.length} consciousness patterns, stored ${totalStored} entities across ${Object.keys(storedEntities).length} consciousness banks.`;
        return {
            extractedPatterns: patterns,
            storedEntities,
            summary
        };
    }
    /**
     * Query all consciousness sources with natural language
     */
    async queryConsciousness(query, sessionSearchFunction) {
        const result = await this.unifiedSearch.queryDevelopmentConsciousness(query, sessionSearchFunction);
        const stats = await this.unifiedSearch.getConsciousnessStats();
        return {
            ...result,
            stats
        };
    }
}
