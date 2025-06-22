/**
 * Unified Consciousness Search
 * Provides unified search across Claude Code sessions AND memory banks
 * Delivers complete developer consciousness access in one interface
 */
export class UnifiedConsciousnessSearch {
    constructor(memoryManager) {
        this.memoryManager = memoryManager;
    }
    /**
     * Search across ALL consciousness sources - sessions AND memory banks
     */
    async searchAllConsciousness(query, sessionSearchFunction) {
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
    async searchConsciousnessBank(bankName, query) {
        return await this.memoryManager.searchBank(bankName, query);
    }
    /**
     * Search sessions with unified result format
     */
    async searchSessions(query, sessionSearchFunction) {
        const sessionResults = await sessionSearchFunction(query);
        return sessionResults.map(result => ({
            source: 'session',
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
    rankUnifiedResults(results, query) {
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
    calculateFinalScore(result, query) {
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
            }
            else if (daysSinceCreation <= 90) {
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
    async extractAndStorePatterns(sessionId, projectId, sessionData, // Raw session data
    patternExtractor // Pattern extractor instance
    ) {
        // Extract patterns from session
        const patterns = await patternExtractor.extractPatternsFromSession(sessionData);
        // Convert to entities and assign to banks
        const { entities, bankAssignments } = await patternExtractor.patternsToEntities(patterns, sessionId, projectId);
        // Store entities in appropriate banks
        const storedEntities = {};
        for (const [bankName, bankEntities] of Object.entries(bankAssignments)) {
            if (bankEntities.length > 0) {
                const stored = await this.memoryManager.createEntitiesInBank(bankName, bankEntities);
                storedEntities[bankName] = stored;
            }
        }
        // Generate unified results from stored entities
        const unifiedResults = entities.map(entity => ({
            source: 'memory_bank',
            bankName: entity.memoryBank,
            entityName: entity.name,
            content: entity.observations.join(' | '),
            relevanceScore: entity.confidenceScore * 10 || 5,
            context: {
                projectId,
                sessionId,
                timestamp: entity.createdAt || new Date().toISOString()
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
    async queryDevelopmentConsciousness(naturalLanguageQuery, sessionSearchFunction) {
        // Extract key terms from natural language query
        const keyTerms = this.extractKeyTerms(naturalLanguageQuery);
        // Search for direct matches
        const directMatches = await this.searchAllConsciousness(naturalLanguageQuery, sessionSearchFunction);
        // Search for related insights using key terms
        const relatedInsights = [];
        for (const term of keyTerms) {
            const termResults = await this.searchAllConsciousness(term, sessionSearchFunction);
            relatedInsights.push(...termResults.slice(0, 3)); // Top 3 per term
        }
        // Remove duplicates from related insights
        const uniqueRelated = relatedInsights.filter(related => !directMatches.some(direct => direct.content === related.content &&
            direct.context.sessionId === related.context.sessionId));
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
    extractKeyTerms(query) {
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
    generateRecommendations(directMatches, relatedInsights) {
        const recommendations = [];
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
    async getConsciousnessStats() {
        const bankList = await this.memoryManager.listBanks();
        return {
            totalBanks: bankList.length,
            totalEntities: bankList.reduce((sum, bank) => sum + bank.entityCount, 0),
            totalRelations: bankList.reduce((sum, bank) => sum + bank.relationCount, 0),
            bankStats: bankList
        };
    }
}
