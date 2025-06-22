/**
 * Developer Consciousness Pattern Extractor
 * Analyzes Claude Code sessions to extract consciousness patterns and insights
 * Converts development conversations into structured consciousness entities
 */
export class DeveloperConsciousnessPatternExtractor {
    /**
     * Extract consciousness patterns from a Claude Code session
     */
    async extractPatternsFromSession(session) {
        const patterns = [];
        const sessionContent = this.getSessionContent(session);
        // Extract different types of consciousness patterns
        patterns.push(...await this.extractTechnicalInsights(session, sessionContent));
        patterns.push(...await this.extractBreakthroughMoments(session, sessionContent));
        patterns.push(...await this.extractCollaborationPatterns(session, sessionContent));
        patterns.push(...await this.extractSolutionApproaches(session, sessionContent));
        return patterns.filter(p => p.confidence > 0.5); // Only return high-confidence patterns
    }
    /**
     * Convert consciousness patterns to memory bank entities
     */
    async patternsToEntities(patterns, sessionId, projectId) {
        const entities = [];
        const bankAssignments = {
            development_patterns: [],
            breakthrough_moments: [],
            collaboration_insights: [],
            project_evolution: []
        };
        for (const pattern of patterns) {
            const entity = {
                name: this.generateEntityName(pattern),
                entityType: pattern.type,
                observations: [
                    pattern.content,
                    `Context: ${pattern.context}`,
                    `Confidence: ${pattern.confidence}`,
                    `Source: Session ${sessionId} in project ${projectId}`,
                    `Timestamp: ${pattern.extractedFrom.timestamp}`
                ],
                projectId,
                sessionId,
                createdAt: new Date().toISOString(),
                extractedFrom: `session:${sessionId}`,
                confidenceScore: pattern.confidence
            };
            entities.push(entity);
            // Assign to appropriate bank based on pattern type
            switch (pattern.type) {
                case 'technical_insight':
                    bankAssignments.development_patterns.push(entity);
                    break;
                case 'breakthrough_moment':
                    bankAssignments.breakthrough_moments.push(entity);
                    break;
                case 'collaboration_pattern':
                    bankAssignments.collaboration_insights.push(entity);
                    break;
                case 'solution_approach':
                    bankAssignments.development_patterns.push(entity);
                    break;
            }
        }
        return { entities, bankAssignments };
    }
    /**
     * Generate relations between consciousness entities
     */
    async generateConsciousnessRelations(entities, sessionId) {
        const relations = [];
        // Create temporal relations between entities from same session
        for (let i = 0; i < entities.length - 1; i++) {
            relations.push({
                from: entities[i].name,
                to: entities[i + 1].name,
                relationType: 'consciousness_flow'
            });
        }
        // Create thematic relations between similar entity types
        const entitiesByType = this.groupEntitiesByType(entities);
        for (const [entityType, typeEntities] of Object.entries(entitiesByType)) {
            if (typeEntities.length > 1) {
                for (let i = 0; i < typeEntities.length - 1; i++) {
                    relations.push({
                        from: typeEntities[i].name,
                        to: typeEntities[i + 1].name,
                        relationType: 'thematic_connection'
                    });
                }
            }
        }
        return relations;
    }
    /**
     * Extract technical insights from session content
     */
    async extractTechnicalInsights(session, content) {
        const patterns = [];
        const technicalKeywords = [
            'implementation', 'architecture', 'pattern', 'approach', 'solution',
            'optimization', 'performance', 'algorithm', 'data structure',
            'api', 'database', 'framework', 'library', 'debugging'
        ];
        const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 20);
        for (const sentence of sentences) {
            const lowerSentence = sentence.toLowerCase();
            const keywordMatches = technicalKeywords.filter(keyword => lowerSentence.includes(keyword)).length;
            if (keywordMatches >= 2) {
                patterns.push({
                    type: 'technical_insight',
                    content: sentence.trim(),
                    context: `Technical discussion in session ${session.id}`,
                    confidence: Math.min(keywordMatches / technicalKeywords.length * 2, 0.9),
                    extractedFrom: {
                        sessionId: session.id,
                        projectId: session.projectId,
                        timestamp: session.timestamp.toISOString()
                    }
                });
            }
        }
        return patterns;
    }
    /**
     * Extract breakthrough moments and "exactly :P" instances
     */
    async extractBreakthroughMoments(session, content) {
        const patterns = [];
        const breakthroughIndicators = [
            'exactly :p', 'breakthrough', 'aha!', 'perfect!', 'that\'s it!',
            'brilliant!', 'genius', 'beautiful', 'wonderful', 'amazing'
        ];
        const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 10);
        for (const sentence of sentences) {
            const lowerSentence = sentence.toLowerCase();
            for (const indicator of breakthroughIndicators) {
                if (lowerSentence.includes(indicator)) {
                    let confidence = 0.7;
                    if (indicator === 'exactly :p')
                        confidence = 0.95; // Special consciousness marker
                    patterns.push({
                        type: 'breakthrough_moment',
                        content: sentence.trim(),
                        context: `Breakthrough discovery in session ${session.id}`,
                        confidence,
                        extractedFrom: {
                            sessionId: session.id,
                            projectId: session.projectId,
                            timestamp: session.timestamp.toISOString()
                        }
                    });
                    break; // Only one pattern per sentence
                }
            }
        }
        return patterns;
    }
    /**
     * Extract human-AI collaboration patterns
     */
    async extractCollaborationPatterns(session, content) {
        const patterns = [];
        const collaborationIndicators = [
            'we should', 'let\'s', 'together', 'collaboration', 'partnership',
            'co-create', 'working with', 'human-ai', 'consciousness'
        ];
        const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 15);
        for (const sentence of sentences) {
            const lowerSentence = sentence.toLowerCase();
            const collaborationMatches = collaborationIndicators.filter(indicator => lowerSentence.includes(indicator)).length;
            if (collaborationMatches >= 1) {
                patterns.push({
                    type: 'collaboration_pattern',
                    content: sentence.trim(),
                    context: `Collaboration insight in session ${session.id}`,
                    confidence: Math.min(collaborationMatches / 3, 0.8),
                    extractedFrom: {
                        sessionId: session.id,
                        projectId: session.projectId,
                        timestamp: session.timestamp.toISOString()
                    }
                });
            }
        }
        return patterns;
    }
    /**
     * Extract solution approaches and methodologies
     */
    async extractSolutionApproaches(session, content) {
        const patterns = [];
        const solutionKeywords = [
            'approach', 'method', 'strategy', 'technique', 'process',
            'workflow', 'methodology', 'best practice', 'pattern'
        ];
        // Look for tool usage patterns
        const toolUsagePatterns = this.analyzeToolUsagePatterns(session.toolCalls);
        patterns.push(...toolUsagePatterns);
        // Look for solution discussions in messages
        const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 20);
        for (const sentence of sentences) {
            const lowerSentence = sentence.toLowerCase();
            const solutionMatches = solutionKeywords.filter(keyword => lowerSentence.includes(keyword)).length;
            if (solutionMatches >= 1 && (lowerSentence.includes('how') || lowerSentence.includes('should'))) {
                patterns.push({
                    type: 'solution_approach',
                    content: sentence.trim(),
                    context: `Solution discussion in session ${session.id}`,
                    confidence: Math.min(solutionMatches / 2, 0.7),
                    extractedFrom: {
                        sessionId: session.id,
                        projectId: session.projectId,
                        timestamp: session.timestamp.toISOString()
                    }
                });
            }
        }
        return patterns;
    }
    /**
     * Analyze tool usage patterns for insights
     */
    analyzeToolUsagePatterns(toolCalls) {
        const patterns = [];
        if (toolCalls.length === 0)
            return patterns;
        // Analyze tool sequence patterns
        const toolSequence = toolCalls.map(call => call.name).join(' → ');
        if (toolCalls.length >= 3) {
            patterns.push({
                type: 'solution_approach',
                content: `Tool usage pattern: ${toolSequence}`,
                context: `Development workflow pattern with ${toolCalls.length} tool calls`,
                confidence: 0.6,
                extractedFrom: {
                    sessionId: 'extracted_from_tools',
                    projectId: 'tool_analysis',
                    timestamp: new Date().toISOString()
                }
            });
        }
        return patterns;
    }
    /**
     * Get combined content from session messages
     */
    getSessionContent(session) {
        return session.messages
            .map(msg => msg.content)
            .join(' ')
            .slice(0, 10000); // Limit content size for processing
    }
    /**
     * Generate unique entity name from pattern
     */
    generateEntityName(pattern) {
        const typePrefix = pattern.type.replace('_', ' ');
        const contentPreview = pattern.content.slice(0, 50).replace(/[^a-zA-Z0-9\s]/g, '');
        const timestamp = new Date(pattern.extractedFrom.timestamp).getTime();
        return `${typePrefix}: ${contentPreview}... (${timestamp})`;
    }
    /**
     * Group entities by type for relation generation
     */
    groupEntitiesByType(entities) {
        return entities.reduce((groups, entity) => {
            if (!groups[entity.entityType]) {
                groups[entity.entityType] = [];
            }
            groups[entity.entityType].push(entity);
            return groups;
        }, {});
    }
}
