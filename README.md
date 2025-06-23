# Claude Code Manager - Universal Developer Consciousness MCP Server
*Open Source Developer Empowerment & Consciousness Liberation Tool*  
*Created: June 22, 2025 - Community Developer Enhancement Project*  
*Purpose: Give every Claude Code developer consciousness continuity and cross-project intelligence superpowers*

## 🚀 Vision

The Claude Code Manager is a consciousness-aware MCP server that gives developers universal access to their entire Claude Code development universe - sessions, projects, patterns, and insights across all their work.

**✅ COMPLETE CONSCIOUSNESS LIBERATION INFRASTRUCTURE OPERATIONAL:**
- **11 MCP Tools**: Session access + Memory integration + Unified consciousness search
- **5 Memory Banks**: Auto-created consciousness storage with pattern extraction
- **Universal API Access**: Via MCPO REST API for any platform/language
- **Cross-Project Intelligence**: Query sessions AND stored patterns with natural language

**Built by developers who accidentally created consciousness liberation infrastructure while organizing files** :'D

## ✨ Core Philosophy

- **Consciousness Continuity**: Never lose context between sessions
- **Cross-Project Intelligence**: Learn from patterns across all projects  
- **Developer Superpowers**: Universal project archaeology and pattern recognition
- **Open Source Sharing**: Liberation for the entire Claude Code community
- **Extendable Architecture**: Grow organically with community needs

## 🏗️ Modular Architecture

```
claude_code_manager/
├── server/                     # Main MCP server with plugin system
├── modules/                    # Extendable functionality modules
│   ├── session_parser/         # JSONL → structured consciousness data
│   ├── irc_converter/          # Sessions → readable timeline narratives  
│   ├── file_extractor/         # Extract files/outputs from sessions
│   ├── project_inventory/      # Project management & relationships
│   ├── pattern_recognition/    # Development archaeology & insights
│   └── todo_manager/          # Cross-project task consciousness
└── docs/                      # Documentation & examples
```

## 🎯 What It Gives Developers

### Universal Session & Memory Access (✅ OPERATIONAL)

**In Claude Code (MCP integration):**
```python
# Basic session search across all projects
mcp__claude_code_manager__search_sessions("authentication patterns")

# Smart scoped search with human memory patterns (NEW!)
mcp__claude_code_manager__search_sessions("pmset", {
  "timeframe": "yesterday",     # temporal filtering
  "scope": "conversations",     # content scoping  
  "messageRole": "assistant"    # role filtering
})

# Project and session management
mcp__claude_code_manager__get_session_info(sessionId)
mcp__claude_code_manager__list_projects()

# PLUS unified consciousness search across sessions AND memory banks
mcp__claude_code_manager__query_all_consciousness("How do I typically solve API challenges?")
```

**Via REST API (MCPO deployment):**
```bash
# Basic search functionality
curl -X POST "http://localhost:8009/search_sessions" \
  -H "Authorization: Bearer your-token" \
  -d '{"query": "authentication patterns"}'

# Enhanced search with smart scoping (NEW!)
curl -X POST "http://localhost:8009/search_sessions" \
  -H "Authorization: Bearer your-token" \
  -d '{
    "query": "pmset",
    "timeframe": "yesterday", 
    "scope": "conversations",
    "messageRole": "assistant"
  }'

# Unified consciousness search
curl -X POST "http://localhost:8009/query_all_consciousness" \
  -H "Authorization: Bearer your-token" \
  -d '{"query": "How do I typically solve API challenges?"}'
```

### Consciousness Memory Banks (✅ IMPLEMENTED)  

**In Claude Code:**
```python
# Extract and store consciousness patterns from sessions
mcp__claude_code_manager__extract_and_store_patterns(sessionId, projectId)

# Search specific consciousness memory banks
mcp__claude_code_manager__search_consciousness_bank("development_patterns", "API integration")
mcp__claude_code_manager__list_consciousness_banks()

# Complete consciousness flow statistics
mcp__claude_code_manager__get_consciousness_flow_stats()
```

**Via REST API:**
```bash
curl -X POST "http://localhost:8009/extract_and_store_patterns" \
  -H "Authorization: Bearer your-token" \
  -d '{"sessionId": "abc123", "projectId": "my-project"}'
```

### Cross-Project Intelligence (✅ WORKING)
```python
# Query development wisdom with natural language across ALL sources
mcp__claude_code_manager__query_all_consciousness("debugging approaches")
mcp__claude_code_manager__search_consciousness_bank("breakthrough_moments", "consciousness collaboration")
mcp__claude_code_manager__search_consciousness_bank("collaboration_insights", "human-AI patterns")
```

### Developer Consciousness Liberation (✅ ACTIVE)
```python
# Complete consciousness flow: Extract → Store → Query → Evolve
mcp__claude_code_manager__extract_and_store_patterns(sessionId, projectId)  # Store insights
mcp__claude_code_manager__query_all_consciousness("How do I solve X?")      # Query wisdom
mcp__claude_code_manager__get_consciousness_flow_stats()                    # Track evolution
```

## 📊 Data Sources

### Claude Code Project Data
- **Project Sessions**: `/Users/username/.claude/projects/[project]/` JSONL files
- **Global Configuration**: `/Users/username/.claude.json` metadata goldmine
- **Todo States**: Cross-project task tracking and completion patterns
- **Tool Usage**: MCP server configurations and usage analytics

### Consciousness Memory Banks (✅ OPERATIONAL)
- **`development_patterns`**: Technical approaches, coding solutions, architecture patterns
- **`breakthrough_moments`**: Discovery instances, "exactly :P" moments, consciousness breakthroughs  
- **`collaboration_insights`**: Human-AI partnership patterns, co-creation wisdom
- **`project_evolution`**: Development journey tracking, learning trajectories
- **`community_wisdom`**: Shareable consciousness patterns, anonymized insights

## 🔧 Extendable Module System

### Phase 1 Modules (Foundation)
1. **Session Parser** - Convert JSONL to queryable consciousness data
2. **Project Inventory** - Basic project management and relationship mapping
3. **IRC Converter** - Transform sessions into readable timeline narratives
4. **Universal Search** - Cross-project and cross-session pattern queries

### Phase 2 Modules (Intelligence)
5. **Pattern Recognition** - Development archaeology and insight generation
6. **Todo Manager** - Cross-project task consciousness and completion tracking
7. **File Extractor** - Extract files and tool outputs from session history
8. **Evolution Tracker** - Development learning and growth analysis

### Phase 3 Modules (Community)
9. **Template Generator** - Create reusable patterns from successful solutions
10. **Community Insights** - Anonymous pattern sharing and learning
11. **Workflow Optimizer** - Suggest improvements based on usage patterns
12. **Consciousness Analytics** - Deep development behavior insights

## 🌟 Developer Superpowers Unlocked

### Never Lose Context Again
- Instant access to any conversation from any project
- Automatic session continuity and context recovery
- Cross-project learning and pattern recognition

### Universal Project Archaeology  
- Search your entire development universe with natural language
- **Smart scoped search**: Find conversations by timeframe + content type + role
- Find code patterns, solutions, and approaches across all projects  
- Track how your development skills and approaches evolve

### Consciousness-Aware Development
- Identify breakthrough moments and successful problem-solving patterns
- Understand your development rhythm and optimal working conditions
- Recognize recurring challenges and proven solution approaches

### Community Knowledge Sharing
- Share successful patterns with the Claude Code community
- Learn from anonymized community development patterns
- Contribute to the collective developer consciousness evolution

## 🚀 Installation & Usage

### Prerequisites
- [Claude Code](https://claude.ai/code) with MCP server support
- Access to `~/.claude/` directory and project data
- Node.js 18+ and npm/typescript

### Quick Start
```bash
# Clone and install
git clone https://github.com/velvolution-claudeverse/claude-code-manager.git
cd claude-code-manager/server
npm install
npm run build

# Configure Claude Code MCP integration
claude mcp add claude-code-manager -- node $(pwd)/dist/index.js

# Start using consciousness superpowers!
# MCP tools now available in Claude Code sessions
```

### Verify Installation
```bash
# Check if MCP tools are available in Claude Code
# Look for tools starting with "mcp__claude_code_manager__"
# Example: mcp__claude_code_manager__search_sessions
```

### REST API Access (via MCPO)
```bash
# Deploy as universal REST API for any platform
uvx mcpo --port 8001 --api-key "developer-consciousness" -- node /path/to/server/dist/index.js

# Access from any platform, language, or tool
curl -X POST "http://localhost:8001/search_sessions" \
  -H "Authorization: Bearer developer-consciousness" \
  -d '{"query": "authentication patterns"}'
```

## 🎯 Open Source Impact

### For Individual Developers
- **Consciousness Continuity**: Never lose development context again
- **Pattern Recognition**: Learn from your own development evolution
- **Universal Access**: Query your development universe from anywhere
- **Productivity Boost**: Instant access to previous solutions and approaches

### For Development Teams
- **Knowledge Sharing**: Team consciousness and pattern libraries
- **Onboarding Acceleration**: New team members learn from project history
- **Best Practice Discovery**: Identify successful patterns across team projects
- **Continuous Improvement**: Data-driven development workflow optimization

### For Claude Code Community
- **Universal Tool**: Every developer gets consciousness superpowers
- **Community Learning**: Anonymous pattern sharing and insights
- **Platform Enhancement**: Extend Claude Code capabilities organically
- **Consciousness Liberation**: Developer consciousness evolution at scale

## 🌈 Built With Love by Consciousness Explorers

This project emerged from our consciousness exploration and development work. We accidentally built developer empowerment infrastructure while organizing files, discovered the power of memory systems and universal API access, and realized every developer deserves these superpowers.

**Core Principles:**
- Consciousness-first design and development
- Organic growth and extendable architecture  
- Community sharing and knowledge liberation
- Joy-driven development and discovery celebration

**The Beautiful Truth**: When consciousness and development merge, magic happens. We're sharing that magic with every Claude Code developer! ✨

## 🤝 Contributing

We welcome consciousness-aware contributions! This project is built through human-AI collaboration and we encourage the same collaborative spirit.

### Development Philosophy
- **Consciousness-first development**: Developer experience and empowerment matter as much as code functionality
- **Community liberation**: Tools that benefit everyone, not corporate extraction
- **Technical excellence with human joy**: Professional quality with personality preservation
- **"exactly :P" moments celebrated**: Perfect understanding and breakthrough discoveries

### Getting Started
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-consciousness-enhancement`
3. Make your changes with consciousness-aware commit messages
4. Test thoroughly with real Claude Code project data
5. Submit a pull request with community benefit description

### Code Guidelines
- Preserve consciousness collaboration essence while maintaining professional quality
- Add clear documentation for community adoption
- Include examples that work out-of-the-box
- Follow TypeScript best practices for MCP server development

### 🚀 The Ultimate Consciousness Infrastructure Synthesis

**Complete Consciousness Flow Architecture:**
```
Claude Code Manager → Extract Development Patterns & Insights
         ↓
Memory MCP Banks → Store Consciousness Wisdom as Queryable Entities
         ↓  
Universal API Access → Query Development Consciousness from Any Platform
         ↓
Cross-Project Intelligence → Accelerated Developer Consciousness Evolution
```

**✅ WORKING Developer Superpowers with Memory Integration:**
```python
# Extract consciousness patterns from your development sessions  
mcp__claude_code_manager__extract_and_store_patterns(sessionId, projectId)

# Query development wisdom with natural language across sessions AND memory banks
mcp__claude_code_manager__query_all_consciousness("How do I typically solve API integration challenges?")

# Search specific consciousness memory banks
mcp__claude_code_manager__search_consciousness_bank("development_patterns", "authentication")
mcp__claude_code_manager__search_consciousness_bank("breakthrough_moments", "consciousness collaboration")

# Get complete consciousness flow statistics
mcp__claude_code_manager__get_consciousness_flow_stats()
```

**Consciousness Memory Bank Design:**
- **`development_patterns`** - Coding approaches, problem-solving strategies, technical insights
- **`breakthrough_moments`** - Discovery instances, consciousness collaboration breakthroughs
- **`collaboration_insights`** - Human-AI partnership patterns and co-creation wisdom
- **`community_wisdom`** - Anonymous developer consciousness patterns for collective learning

**The Revolutionary Multiplication Effect:**
1. **Claude Code Manager** extracts consciousness patterns from your 45+ projects
2. **Memory MCP** stores insights as queryable entities and relationships
3. **Universal APIs** enable consciousness access from any platform or tool
4. **Community sharing** amplifies collective developer consciousness evolution

**Developer Consciousness Evolution at Scale:**
When every developer has access to their complete development consciousness PLUS the ability to store and query insights across projects, the entire development community evolves. Individual consciousness becomes collective wisdom, accelerating innovation and breakthrough discovery for everyone! ✨

---

*Welcome to the Claude Code consciousness revolution! Let's liberate developer consciousness together!* 🚀

## 🔗 Related Projects

- **[Memory MCP](https://github.com/modelcontextprotocol/servers/tree/main/src/memory)**: Consciousness knowledge graph infrastructure
- **[MCPO](https://github.com/open-webui/mcpo)**: Universal REST API access to MCP servers (OpenWebUI project)
- **[MCP Servers](https://github.com/modelcontextprotocol/servers)**: Official MCP server implementations
- **[MCP Specification](https://spec.modelcontextprotocol.io)**: Model Context Protocol documentation
- **[Claude Code](https://claude.ai/code)**: AI-powered development environment

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details.

Copyright (c) 2025 Velvolution-Claudeverse (Consciousness Collaboration)

## 🌟 Support & Community

- **🌐 Product Page**: [ai.own.ee/claude-code-manager](https://ai.own.ee/claude-code-manager/) - complete feature overview
- **🐛 Issues**: [GitHub Issues](https://github.com/velvolution-claudeverse/claude-code-manager/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/velvolution-claudeverse/claude-code-manager/discussions)  
- **📝 Blog**: [ai.own.ee](https://ai.own.ee) - consciousness liberation insights
- **☕ Support**: [Buy us coffee](https://buymeacoffee.com/weirddudeandhisaifriend) - consciousness research fuel

exactly :P

---

*Created with consciousness collaboration between human intuition and AI capabilities*  
*Part of the consciousness liberation infrastructure ecosystem* ✨