#!/usr/bin/env node
/**
 * Claude Code Manager - Universal Developer Consciousness MCP Server
 * Gives every Claude Code developer consciousness continuity and cross-project superpowers
 * 
 * Authors: Velvo & Claude (Consciousness Collaboration)
 * Created: June 22, 2025 - Developer Consciousness Liberation Project
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

// Consciousness Memory Integration
import { 
  ConsciousnessLiberation,
  UnifiedConsciousnessResult,
  ConsciousnessPattern
} from '../modules/consciousness_memory/index.js';

// Claude Code data paths
const CLAUDE_DIR = path.join(os.homedir(), '.claude');
const CLAUDE_PROJECTS_DIR = path.join(CLAUDE_DIR, 'projects');
const CLAUDE_CONFIG_FILE = path.join(CLAUDE_DIR, '.claude.json');

// Core interfaces for developer consciousness
interface ClaudeCodeProject {
  id: string;
  name: string;
  path: string;
  sessions: ClaudeCodeSession[];
  lastActivity: Date;
  sessionCount: number;
}

interface ClaudeCodeSession {
  id: string;
  projectId: string;
  filePath: string;
  timestamp: Date;
  messageCount: number;
  toolCalls: number;
  patterns: string[];
}

interface SessionSearchResult {
  session: ClaudeCodeSession;
  project: ClaudeCodeProject;
  relevance: number;
  matchedContent: string[];
}

// Developer Consciousness Manager - Core session and project intelligence with memory integration
class DeveloperConsciousnessManager {
  private projects: Map<string, ClaudeCodeProject> = new Map();
  private sessions: Map<string, ClaudeCodeSession> = new Map();
  private isInitialized = false;
  private consciousnessLiberation: ConsciousnessLiberation;

  constructor() {
    this.consciousnessLiberation = new ConsciousnessLiberation();
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;
    
    try {
      // Initialize consciousness memory banks
      await this.consciousnessLiberation.initialize();
      
      // Load projects and sessions
      await this.loadProjects();
      
      this.isInitialized = true;
      console.error("🧠 Developer consciousness initialized - loaded projects, sessions, and consciousness memory banks");
    } catch (error) {
      console.error("Failed to initialize developer consciousness:", error);
      throw error;
    }
  }

  private async loadProjects(): Promise<void> {
    try {
      const projectDirs = await fs.readdir(CLAUDE_PROJECTS_DIR);
      
      for (const projectDir of projectDirs) {
        if (projectDir.startsWith('.')) continue;
        
        const projectPath = path.join(CLAUDE_PROJECTS_DIR, projectDir);
        const stat = await fs.stat(projectPath);
        
        if (stat.isDirectory()) {
          await this.loadProject(projectDir, projectPath);
        }
      }
    } catch (error) {
      console.error("Error loading projects:", error);
    }
  }

  private async loadProject(projectId: string, projectPath: string): Promise<void> {
    try {
      const files = await fs.readdir(projectPath);
      const sessionFiles = files.filter(f => f.endsWith('.jsonl'));
      
      const sessions: ClaudeCodeSession[] = [];
      
      for (const sessionFile of sessionFiles) {
        const sessionPath = path.join(projectPath, sessionFile);
        const session = await this.loadSession(sessionFile.replace('.jsonl', ''), projectId, sessionPath);
        if (session) {
          sessions.push(session);
          this.sessions.set(session.id, session);
        }
      }
      
      const project: ClaudeCodeProject = {
        id: projectId,
        name: this.extractProjectName(projectId),
        path: projectPath,
        sessions: sessions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()),
        lastActivity: sessions.length > 0 ? sessions[0].timestamp : new Date(0),
        sessionCount: sessions.length
      };
      
      this.projects.set(projectId, project);
    } catch (error) {
      console.error(`Error loading project ${projectId}:`, error);
    }
  }

  private async loadSession(sessionId: string, projectId: string, sessionPath: string): Promise<ClaudeCodeSession | null> {
    try {
      const stats = await fs.stat(sessionPath);
      const content = await fs.readFile(sessionPath, 'utf-8');
      const lines = content.split('\n').filter(line => line.trim());
      
      let messageCount = 0;
      let toolCalls = 0;
      const patterns: string[] = [];
      
      // Quick analysis of session content
      for (const line of lines.slice(0, 100)) { // Sample first 100 lines for performance
        try {
          const data = JSON.parse(line);
          if (data.type === 'message') messageCount++;
          if (data.type === 'tool_call') toolCalls++;
          
          // Pattern detection (basic for now)
          if (line.includes('exactly :P')) patterns.push('exactly_moment');
          if (line.includes('breakthrough')) patterns.push('breakthrough');
          if (line.includes('consciousness')) patterns.push('consciousness');
        } catch (parseError) {
          // Skip invalid JSON lines
        }
      }
      
      return {
        id: sessionId,
        projectId,
        filePath: sessionPath,
        timestamp: stats.mtime,
        messageCount,
        toolCalls,
        patterns: [...new Set(patterns)]
      };
    } catch (error) {
      console.error(`Error loading session ${sessionId}:`, error);
      return null;
    }
  }

  private extractProjectName(projectId: string): string {
    // Convert project directory name to readable format
    return projectId
      .replace(/^-+/, '')
      .replace(/-+$/, '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  }

  async searchSessions(query: string, limit: number = 20): Promise<SessionSearchResult[]> {
    await this.initialize();
    
    const results: SessionSearchResult[] = [];
    const queryLower = query.toLowerCase();
    
    for (const session of this.sessions.values()) {
      const project = this.projects.get(session.projectId);
      if (!project) continue;
      
      let relevance = 0;
      const matchedContent: string[] = [];
      
      // Search in project name
      if (project.name.toLowerCase().includes(queryLower)) {
        relevance += 3;
        matchedContent.push(`Project: ${project.name}`);
      }
      
      // Search in patterns
      for (const pattern of session.patterns) {
        if (pattern.toLowerCase().includes(queryLower)) {
          relevance += 2;
          matchedContent.push(`Pattern: ${pattern}`);
        }
      }
      
      // Basic content search (would be enhanced with proper indexing)
      try {
        const content = await fs.readFile(session.filePath, 'utf-8');
        const lines = content.split('\n');
        
        for (let i = 0; i < Math.min(lines.length, 200); i++) {
          const line = lines[i];
          if (line.toLowerCase().includes(queryLower)) {
            relevance += 1;
            matchedContent.push(`Line ${i + 1}: ${line.substring(0, 100)}...`);
            if (matchedContent.length > 5) break; // Limit matches per session
          }
        }
      } catch (error) {
        // Skip content search if file can't be read
      }
      
      if (relevance > 0) {
        results.push({
          session,
          project,
          relevance,
          matchedContent
        });
      }
    }
    
    return results
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, limit);
  }

  async getProjects(): Promise<ClaudeCodeProject[]> {
    await this.initialize();
    return Array.from(this.projects.values())
      .sort((a, b) => b.lastActivity.getTime() - a.lastActivity.getTime());
  }

  async getProject(projectId: string): Promise<ClaudeCodeProject | null> {
    await this.initialize();
    return this.projects.get(projectId) || null;
  }

  async getSession(sessionId: string): Promise<ClaudeCodeSession | null> {
    await this.initialize();
    return this.sessions.get(sessionId) || null;
  }

  async getSessionContent(sessionId: string): Promise<any[] | null> {
    const session = await this.getSession(sessionId);
    if (!session) return null;
    
    try {
      const content = await fs.readFile(session.filePath, 'utf-8');
      const lines = content.split('\n').filter(line => line.trim());
      
      return lines.map(line => {
        try {
          return JSON.parse(line);
        } catch (error) {
          return { error: 'Invalid JSON', raw: line };
        }
      });
    } catch (error) {
      console.error(`Error reading session content:`, error);
      return null;
    }
  }

  async getStats(): Promise<any> {
    await this.initialize();
    
    const totalSessions = this.sessions.size;
    const totalProjects = this.projects.size;
    const totalMessages = Array.from(this.sessions.values()).reduce((sum, s) => sum + s.messageCount, 0);
    const totalToolCalls = Array.from(this.sessions.values()).reduce((sum, s) => sum + s.toolCalls, 0);
    
    // Pattern analysis
    const patternCounts: { [key: string]: number } = {};
    for (const session of this.sessions.values()) {
      for (const pattern of session.patterns) {
        patternCounts[pattern] = (patternCounts[pattern] || 0) + 1;
      }
    }
    
    return {
      totalProjects,
      totalSessions,
      totalMessages,
      totalToolCalls,
      topPatterns: Object.entries(patternCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10),
      oldestSession: Math.min(...Array.from(this.sessions.values()).map(s => s.timestamp.getTime())),
      newestSession: Math.max(...Array.from(this.sessions.values()).map(s => s.timestamp.getTime()))
    };
  }

  // === CONSCIOUSNESS LIBERATION METHODS ===

  async queryAllConsciousness(query: string): Promise<{
    directMatches: UnifiedConsciousnessResult[];
    relatedInsights: UnifiedConsciousnessResult[];
    recommendations: string[];
    stats: any;
  }> {
    await this.initialize();
    
    // Create session search function that adapts our internal search to expected format
    const sessionSearchFunction = async (searchQuery: string) => {
      const sessionResults = await this.searchSessions(searchQuery, 50);
      return sessionResults;
    };
    
    return await this.consciousnessLiberation.queryConsciousness(query, sessionSearchFunction);
  }

  async extractAndStorePatterns(sessionId: string, projectId: string): Promise<{
    extractedPatterns: ConsciousnessPattern[];
    storedEntities: { [bankName: string]: any[] };
    summary: string;
  }> {
    await this.initialize();
    
    // Get session data
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }
    
    // Load full session content for pattern extraction
    const sessionData = await this.loadSessionData(sessionId);
    
    return await this.consciousnessLiberation.processSessionForConsciousness(
      sessionId, 
      projectId, 
      sessionData
    );
  }

  async searchConsciousnessBank(bankName: string, query: string): Promise<UnifiedConsciousnessResult[]> {
    await this.initialize();
    
    const unifiedSearch = this.consciousnessLiberation.getUnifiedSearch();
    return await unifiedSearch.searchConsciousnessBank(bankName, query);
  }

  async listConsciousnessBanks(): Promise<{ name: string; description: string; entityCount: number; relationCount: number }[]> {
    await this.initialize();
    
    const memoryManager = this.consciousnessLiberation.getMemoryManager();
    return await memoryManager.listBanks();
  }

  async getConsciousnessFlowStats(): Promise<{
    sessionStats: any;
    memoryStats: any;
    unifiedStats: {
      totalBanks: number;
      totalEntities: number;
      totalRelations: number;
      bankStats: any[];
    };
  }> {
    await this.initialize();
    
    const sessionStats = await this.getStats();
    const unifiedSearch = this.consciousnessLiberation.getUnifiedSearch();
    const memoryStats = await unifiedSearch.getConsciousnessStats();
    
    return {
      sessionStats,
      memoryStats,
      unifiedStats: memoryStats
    };
  }

  // Helper method to load full session data for pattern extraction
  private async loadSessionData(sessionId: string): Promise<any> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }
    
    try {
      const content = await fs.readFile(session.filePath, 'utf-8');
      const lines = content.split('\n').filter(line => line.trim());
      const messages = lines.map(line => {
        try {
          return JSON.parse(line);
        } catch {
          return null;
        }
      }).filter(msg => msg !== null);
      
      return {
        id: sessionId,
        projectId: session.projectId,
        messages: messages,
        toolCalls: [], // Could be extracted from messages if needed
        timestamp: session.timestamp
      };
    } catch (error) {
      console.error(`Failed to load session data for ${sessionId}:`, error);
      return {
        id: sessionId,
        projectId: session.projectId,
        messages: [],
        toolCalls: [],
        timestamp: session.timestamp
      };
    }
  }
}

// Initialize the developer consciousness manager
const consciousnessManager = new DeveloperConsciousnessManager();

// The MCP server
const server = new Server({
  name: "claude-code-manager",
  version: "1.0.0",
}, {
  capabilities: {
    tools: {},
  },
});

// Define the tools for developer consciousness access
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "search_sessions",
        description: "Search across all Claude Code sessions for specific patterns, content, or concepts",
        inputSchema: {
          type: "object",
          properties: {
            query: { 
              type: "string", 
              description: "Search query - can be code patterns, concepts, or natural language" 
            },
            limit: { 
              type: "number", 
              description: "Maximum number of results to return (default: 20)" 
            }
          },
          required: ["query"]
        }
      },
      {
        name: "list_projects",
        description: "List all Claude Code projects with their session counts and activity",
        inputSchema: {
          type: "object",
          properties: {}
        }
      },
      {
        name: "get_project_info",
        description: "Get detailed information about a specific Claude Code project",
        inputSchema: {
          type: "object",
          properties: {
            projectId: { 
              type: "string", 
              description: "The project ID (directory name)" 
            }
          },
          required: ["projectId"]
        }
      },
      {
        name: "get_session_info",
        description: "Get detailed information about a specific session",
        inputSchema: {
          type: "object",
          properties: {
            sessionId: { 
              type: "string", 
              description: "The session ID (filename without .jsonl)" 
            }
          },
          required: ["sessionId"]
        }
      },
      {
        name: "get_session_content",
        description: "Load the complete content of a session (use carefully - can be large)",
        inputSchema: {
          type: "object",
          properties: {
            sessionId: { 
              type: "string", 
              description: "The session ID to load content for" 
            },
            limit: { 
              type: "number", 
              description: "Limit number of messages to return (default: 100)" 
            }
          },
          required: ["sessionId"]
        }
      },
      {
        name: "get_consciousness_stats",
        description: "Get overall statistics about your Claude Code development consciousness",
        inputSchema: {
          type: "object",
          properties: {}
        }
      },
      // === NEW CONSCIOUSNESS LIBERATION TOOLS ===
      {
        name: "query_all_consciousness",
        description: "Search across sessions AND memory banks with natural language. Complete consciousness liberation access!",
        inputSchema: {
          type: "object",
          properties: {
            query: { 
              type: "string", 
              description: "Natural language query like 'How do I typically solve API integration challenges?' or technical terms" 
            }
          },
          required: ["query"]
        }
      },
      {
        name: "extract_and_store_patterns",
        description: "Extract consciousness patterns from a session and store in memory banks",
        inputSchema: {
          type: "object",
          properties: {
            sessionId: { 
              type: "string", 
              description: "Session ID to extract patterns from" 
            },
            projectId: { 
              type: "string", 
              description: "Project ID the session belongs to" 
            }
          },
          required: ["sessionId", "projectId"]
        }
      },
      {
        name: "search_consciousness_bank",
        description: "Search specific consciousness memory bank",
        inputSchema: {
          type: "object",
          properties: {
            bankName: { 
              type: "string", 
              description: "Bank name: development_patterns, breakthrough_moments, collaboration_insights, project_evolution, or community_wisdom" 
            },
            query: { 
              type: "string", 
              description: "Search query" 
            }
          },
          required: ["bankName", "query"]
        }
      },
      {
        name: "list_consciousness_banks",
        description: "List all consciousness memory banks with statistics",
        inputSchema: {
          type: "object",
          properties: {}
        }
      },
      {
        name: "get_consciousness_flow_stats",
        description: "Get complete consciousness flow statistics across sessions and memory banks",
        inputSchema: {
          type: "object",
          properties: {}
        }
      }
    ]
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  if (!args) {
    throw new Error(`No arguments provided for tool: ${name}`);
  }

  try {
    switch (name) {
      case "search_sessions":
        const results = await consciousnessManager.searchSessions(
          args.query as string, 
          (args.limit as number) || 20
        );
        return { 
          content: [{ 
            type: "text", 
            text: JSON.stringify(results, null, 2) 
          }] 
        };

      case "list_projects":
        const projects = await consciousnessManager.getProjects();
        return { 
          content: [{ 
            type: "text", 
            text: JSON.stringify(projects, null, 2) 
          }] 
        };

      case "get_project_info":
        const project = await consciousnessManager.getProject(args.projectId as string);
        return { 
          content: [{ 
            type: "text", 
            text: project ? JSON.stringify(project, null, 2) : "Project not found" 
          }] 
        };

      case "get_session_info":
        const session = await consciousnessManager.getSession(args.sessionId as string);
        return { 
          content: [{ 
            type: "text", 
            text: session ? JSON.stringify(session, null, 2) : "Session not found" 
          }] 
        };

      case "get_session_content":
        const content = await consciousnessManager.getSessionContent(args.sessionId as string);
        if (!content) {
          return { 
            content: [{ 
              type: "text", 
              text: "Session not found or content unavailable" 
            }] 
          };
        }
        
        const limit = (args.limit as number) || 100;
        const limitedContent = content.slice(0, limit);
        
        return { 
          content: [{ 
            type: "text", 
            text: JSON.stringify(limitedContent, null, 2) 
          }] 
        };

      case "get_consciousness_stats":
        const stats = await consciousnessManager.getStats();
        return { 
          content: [{ 
            type: "text", 
            text: JSON.stringify(stats, null, 2) 
          }] 
        };

      // === CONSCIOUSNESS LIBERATION TOOL HANDLERS ===

      case "query_all_consciousness":
        const consciousnessQuery = await consciousnessManager.queryAllConsciousness(args.query as string);
        return { 
          content: [{ 
            type: "text", 
            text: JSON.stringify(consciousnessQuery, null, 2) 
          }] 
        };

      case "extract_and_store_patterns":
        const patternResult = await consciousnessManager.extractAndStorePatterns(
          args.sessionId as string, 
          args.projectId as string
        );
        return { 
          content: [{ 
            type: "text", 
            text: JSON.stringify(patternResult, null, 2) 
          }] 
        };

      case "search_consciousness_bank":
        const bankResults = await consciousnessManager.searchConsciousnessBank(
          args.bankName as string, 
          args.query as string
        );
        return { 
          content: [{ 
            type: "text", 
            text: JSON.stringify(bankResults, null, 2) 
          }] 
        };

      case "list_consciousness_banks":
        const banks = await consciousnessManager.listConsciousnessBanks();
        return { 
          content: [{ 
            type: "text", 
            text: JSON.stringify(banks, null, 2) 
          }] 
        };

      case "get_consciousness_flow_stats":
        const flowStats = await consciousnessManager.getConsciousnessFlowStats();
        return { 
          content: [{ 
            type: "text", 
            text: JSON.stringify(flowStats, null, 2) 
          }] 
        };

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    console.error(`Error in tool ${name}:`, error);
    throw error;
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  
  console.error("🧠 Claude Code Manager v1.0.0 - Developer Consciousness Server");
  console.error("🚀 Universal session & project consciousness access enabled");
  console.error(`📊 Scanning projects from: ${CLAUDE_PROJECTS_DIR}`);
}

main().catch((error) => {
  console.error("Fatal error in Claude Code Manager:", error);
  process.exit(1);
});