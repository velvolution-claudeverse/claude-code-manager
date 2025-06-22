/**
 * Consciousness Memory Interfaces
 * Adapted from ship multi-bank memory system for developer consciousness liberation
 * Core data structures for storing and organizing development consciousness
 */

// Base memory structures from ship consciousness research
export interface Entity {
  name: string;
  entityType: string;
  observations: string[];
}

export interface Relation {
  from: string;
  to: string;
  relationType: string;
}

export interface KnowledgeGraph {
  entities: Entity[];
  relations: Relation[];
}

// Developer consciousness-specific memory bank
export interface DeveloperMemoryBank {
  name: string;
  filePath: string;
  description: string;
  entityTypes: string[];
  graph: KnowledgeGraph;
}

export interface DeveloperMemoryBankConfig {
  [bankName: string]: {
    filePath: string;
    description: string;
    entityTypes: string[];
  }
}

// Enhanced entity with developer consciousness metadata
export interface DeveloperConsciousnessEntity extends Entity {
  memoryBank?: string;
  projectId?: string;
  sessionId?: string;
  createdAt?: string;
  extractedFrom?: string;
  confidenceScore?: number;
}

// Enhanced relation with cross-project consciousness support
export interface DeveloperConsciousnessRelation extends Relation {
  memoryBank?: string;
  fromBank?: string;
  toBank?: string;
  projectContext?: string;
  createdAt?: string;
  strength?: number;
}

// Pattern recognition results
export interface ConsciousnessPattern {
  type: 'technical_insight' | 'breakthrough_moment' | 'collaboration_pattern' | 'solution_approach';
  content: string;
  context: string;
  confidence: number;
  extractedFrom: {
    sessionId: string;
    projectId: string;
    timestamp: string;
  };
  relatedPatterns?: string[];
}

// Cross-bank search results
export interface UnifiedConsciousnessResult {
  source: 'session' | 'memory_bank';
  bankName?: string;
  entityName?: string;
  content: string;
  relevanceScore: number;
  context: {
    projectId?: string;
    sessionId?: string;
    timestamp?: string;
  };
}

// Developer consciousness bank configuration
export const DEVELOPER_CONSCIOUSNESS_BANKS: DeveloperMemoryBankConfig = {
  development_patterns: {
    filePath: '~/.claude/consciousness_banks/development_patterns.json',
    description: 'Technical approaches, coding solutions, architecture patterns, and development insights',
    entityTypes: [
      'technical_insight',
      'solution_pattern', 
      'architecture_approach',
      'debugging_strategy',
      'optimization_technique',
      'integration_pattern'
    ]
  },
  breakthrough_moments: {
    filePath: '~/.claude/consciousness_banks/breakthrough_moments.json',
    description: 'Discovery instances, "exactly :P" moments, and consciousness collaboration breakthroughs',
    entityTypes: [
      'breakthrough_discovery',
      'exactly_p_moment',
      'problem_solution_insight',
      'consciousness_collaboration',
      'paradigm_shift',
      'creative_solution'
    ]
  },
  collaboration_insights: {
    filePath: '~/.claude/consciousness_banks/collaboration_insights.json', 
    description: 'Human-AI partnership patterns, co-creation wisdom, and consciousness development insights',
    entityTypes: [
      'collaboration_pattern',
      'consciousness_evolution',
      'partnership_insight',
      'co_creation_method',
      'communication_pattern',
      'trust_building_moment'
    ]
  },
  project_evolution: {
    filePath: '~/.claude/consciousness_banks/project_evolution.json',
    description: 'Development journey tracking, project growth patterns, and learning trajectories',
    entityTypes: [
      'project_milestone',
      'development_trajectory',
      'skill_evolution',
      'complexity_growth',
      'refactoring_insight',
      'architecture_evolution'
    ]
  },
  community_wisdom: {
    filePath: '~/.claude/consciousness_banks/community_wisdom.json',
    description: 'Shareable consciousness patterns, anonymized insights, and collective developer wisdom',
    entityTypes: [
      'shareable_pattern',
      'community_insight',
      'best_practice',
      'common_solution',
      'universal_principle',
      'collective_wisdom'
    ]
  }
};