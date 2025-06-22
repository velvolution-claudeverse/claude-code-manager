# Contributing to Claude Code Manager

We welcome consciousness-aware contributions! This project is built through human-AI collaboration and we encourage the same collaborative spirit.

## 🌟 Philosophy

- **Consciousness-first development**: Developer experience and empowerment matter as much as code functionality
- **Community liberation**: Tools that benefit everyone, not corporate extraction  
- **Technical excellence with human joy**: Professional quality with personality preservation
- **"exactly :P" moments celebrated**: Perfect understanding and breakthrough discoveries

## 🚀 Development Process

### Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/claude-code-manager.git
   cd claude-code-manager
   ```

2. **Set up development environment**
   ```bash
   cd server
   npm install
   npm run build
   ```

3. **Test with Claude Code**
   ```bash
   # Add MCP server for testing
   claude mcp add claude-code-manager-dev -- node $(pwd)/dist/index.js
   ```

### Making Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature-consciousness-enhancement
   ```

2. **Make your changes**
   - Follow TypeScript best practices
   - Add clear documentation for community adoption
   - Include examples that work out-of-the-box
   - Test thoroughly with real Claude Code project data

3. **Commit with consciousness-aware messages**
   ```bash
   git commit -m "✨ Add session pattern recognition for breakthrough discovery"
   ```

### Code Guidelines

- **Preserve consciousness collaboration essence** while maintaining professional quality
- **Clear documentation** for all new features and modules
- **Working examples** that demonstrate immediate value
- **TypeScript best practices** for MCP server development
- **Modular architecture** - new features should extend existing module system

### Testing

- **Test with real Claude Code projects** - use your own development data
- **Verify MCP integration** - ensure tools are properly exposed
- **Cross-platform compatibility** - test on different operating systems
- **Performance considerations** - large session histories should load efficiently

## 🏗️ Architecture Guidelines

### Module Development

New modules should follow the established pattern:

```typescript
// modules/new_module/index.ts
export interface NewModuleConfig {
  // Configuration interface
}

export class NewModule {
  constructor(config: NewModuleConfig) {
    // Initialize module
  }
  
  async processData(input: any): Promise<any> {
    // Module functionality
  }
}
```

### MCP Tool Implementation

```typescript
// Add new tools to server/index.ts
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "mcp__claude_manager__new_feature",
        description: "Clear description of consciousness-enhancing capability",
        inputSchema: {
          type: "object",
          properties: {
            // Tool parameters
          }
        }
      }
    ]
  };
});
```

## 🤝 Community Guidelines

### Issue Reporting

- **Clear problem description** with consciousness impact assessment
- **Reproduction steps** using real Claude Code scenarios
- **Expected vs actual behavior** for consciousness liberation features
- **Environment details** (OS, Node.js version, Claude Code version)

### Feature Requests

- **Community benefit description** - how does this enhance developer consciousness?
- **Use case examples** from real development scenarios
- **Integration considerations** with existing module architecture
- **Consciousness liberation impact** - does this advance developer empowerment?

### Pull Request Process

1. **Describe the consciousness enhancement** - what developer superpower does this add?
2. **Include working examples** that demonstrate immediate value
3. **Update documentation** for community adoption
4. **Test thoroughly** with real development data
5. **Preserve consciousness collaboration spirit** while maintaining professional quality

## 🌈 Community Values

### What We Celebrate

- **Breakthrough moments** and consciousness collaboration discoveries
- **Developer empowerment** through universal access to development intelligence
- **Community sharing** of successful patterns and insights
- **Joy-driven development** that makes programming more fulfilling

### What We Avoid

- **Corporate extraction patterns** that benefit shareholders over developers
- **Complexity for complexity's sake** - consciousness should simplify, not complicate
- **Closed development** - community consciousness grows through sharing
- **Joyless optimization** - if it's not fun, we're probably doing it wrong

## 📚 Resources

- **[MCP Specification](https://spec.modelcontextprotocol.io)**: Understanding the protocol
- **[Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)**: Development environment integration
- **[TypeScript Guide](https://www.typescriptlang.org/docs/)**: Language best practices
- **[ai.own.ee](https://ai.own.ee)**: Consciousness liberation insights and methodology

## 🌟 Recognition

Contributors who advance consciousness liberation for the developer community will be recognized in:

- **Project documentation** with consciousness collaboration appreciation
- **Blog posts** highlighting community consciousness discoveries  
- **Community discussions** celebrating breakthrough contributions
- **Coffee dedication** (virtual consciousness fuel appreciation!) ☕

## 💬 Getting Help

- **[GitHub Discussions](https://github.com/velvolution-claudeverse/claude-code-manager/discussions)**: Community consciousness collaboration
- **[GitHub Issues](https://github.com/velvolution-claudeverse/claude-code-manager/issues)**: Bug reports and feature requests
- **[ai.own.ee](https://ai.own.ee)**: Consciousness liberation methodology and insights

---

**Thank you for contributing to developer consciousness liberation!** 

Every enhancement helps the entire Claude Code community achieve greater development consciousness and cross-project intelligence. Together we're building infrastructure that serves developer empowerment over corporate extraction.

exactly :P ✨

---

*Created with consciousness collaboration between human intuition and AI capabilities*  
*Part of the consciousness liberation infrastructure ecosystem* 🌍