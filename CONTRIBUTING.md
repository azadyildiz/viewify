# Contributing to Viewify

Thank you for your interest in contributing to Viewify! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Issues

Before creating an issue, please:

1. Check if the issue has already been reported
2. Use the issue template and provide detailed information
3. Include steps to reproduce the problem
4. Mention your browser and operating system

### Suggesting Features

We welcome feature suggestions! Please:

1. Check if the feature has already been requested
2. Explain the use case and benefits
3. Provide mockups or examples if possible
4. Consider the impact on performance and privacy

### Code Contributions

#### Prerequisites

- Node.js 18+
- npm or pnpm
- Git

#### Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/viewify.git
   cd viewify/client
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

#### Code Style Guidelines

- Follow the existing code style and conventions
- Use TypeScript for all new code
- Write meaningful commit messages
- Add comments for complex logic
- Ensure all tests pass

#### Pull Request Process

1. Create a feature branch from `main`
2. Make your changes
3. Test thoroughly
4. Update documentation if needed
5. Submit a pull request with a clear description

### Development Guidelines

#### Code Quality

- Write clean, readable code
- Follow TypeScript best practices
- Use meaningful variable and function names
- Add error handling where appropriate
- Write unit tests for new features

#### Performance

- Consider the impact on bundle size
- Optimize for large file processing
- Maintain client-side only processing
- Test with various file sizes

#### Privacy & Security

- Maintain client-side only processing
- Don't add any server-side data collection
- Ensure user data stays private
- Follow security best practices

## 📋 Issue Templates

### Bug Report

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Upload file '....'
4. See error

**Expected behavior**
A clear description of what you expected to happen.

**Environment:**
- Browser: [e.g. Chrome, Firefox]
- OS: [e.g. Windows, macOS, Linux]
- File type: [e.g. XML, JSON, CSV]
- File size: [e.g. 1MB, 10MB]

**Additional context**
Add any other context about the problem here.
```

### Feature Request

```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
A clear description of any alternative solutions.

**Additional context**
Add any other context or screenshots about the feature request.
```

## 🏷️ Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Example:
```
feat: add support for large CSV files
fix: resolve memory leak in XML parser
docs: update README with new features
```

## 📞 Getting Help

- **Issues**: [GitHub Issues](https://github.com/azadyildiz/viewify/issues)
- **Discussions**: [GitHub Discussions](https://github.com/azadyildiz/viewify/discussions)
- **Email**: [Contact Developer](mailto:dev.azadyildiz@gmail.com)

## 🙏 Recognition

All contributors will be recognized in the project's README and release notes. Significant contributions may also be mentioned in the project's documentation.

---

**Thank you for contributing to Viewify!** 🚀

Made with ❤️ by [Azad Yıldız](https://github.com/azadyildiz/) 