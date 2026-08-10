# DrodCode IDE 🚀

**DrodCode IDE** is a modern, extensible, high-performance cross-platform Code Editor and Integrated Development Environment built on **Electron**, **React**, **TypeScript**, **Monaco Editor**, and **xterm.js**.

---

## ✨ Features

- ⚡ **Monaco Editor Core**: Multi-cursor, syntax highlighting for 30+ programming languages, minimap, bracket matching, code folding, auto-formatting, and refactoring support.
- 🐚 **Integrated Multi-tab Terminal**: xterm.js powered PTY terminal with split pane support, customizable shell (PowerShell, CMD, Bash, Zsh), colors, and history.
- 🔌 **VS Code Compatible Plugin System**: Complete extension API (`.drodplugin` format) with registerCommand, completion, hover, definition, codeAction providers, and built-in Extension Marketplace.
- 🌿 **Git Version Control**: Branch management, status tree, stage/unstage, commits, push/pull/fetch, commit history graph, side-by-side diff viewer, and 3-way merge conflict resolution.
- 🐞 **Debug Adapter Protocol (DAP)**: Breakpoints, conditional breakpoints, call stack view, variable inspector, expression watch, and stepping (over, into, out).
- ⚙️ **Tasks & Build Launch Configurations**: Integrated task runner for NPM, Pip, Cargo, Gradle, Maven, Node.js, Python, C++, Go, and Rust.
- 🎨 **DrodCode Dark Theme & Customization**: Customizable settings editor (`settings.json`), custom hotkeys remapping, and theme import/export.
- 🤖 **AI Assistant Panel**: Inline code autocompletion, chat context assistant, error diagnosis, explanation, and code generation.
- 📦 **Marketplace Server**: Full standalone backend for hosting, downloading, and searching plugins.
- 🛠️ **Built-in Tools**: Postman-style HTTP API Client, Markdown preview, Image viewer, Snippets generator.

---

## 🏗️ Quick Start & Installation

```bash
# Install dependencies
npm install

# Run in Development Mode
npm run dev

# Run Plugin Marketplace Server
npm run marketplace

# Package for Distribution (Windows / Linux / macOS)
npm run package
```

---

## 🛠️ Architecture Overview

- **`src/main/`**: Electron main process managing native system IPC, file system access, terminal PTY processes (`node-pty`), Git operations (`simple-git`), DAP server connections, and plugin process sandbox.
- **`src/renderer/`**: React UI with Zustand state management, Monaco editor wrapper, xterm terminal tabs, custom styled sidebars, and status tools.
- **`src/shared/`**: Shared interfaces, types, constants, and utilities.
- **`plugins-api/`**: Extension SDK for plugin developers.
- **`marketplace-server/`**: Standalone Express.js backend with SQLite DB schema for plugin distribution.

---

## 📄 License

Licensed under the [MIT License](LICENSE).
