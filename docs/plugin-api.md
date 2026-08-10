# DrodCode Plugin API Reference 🔌

DrodCode provides a powerful extension framework compatible with `.drodplugin` packages.

## Extension Manifest (`manifest.json`)

```json
{
  "name": "my-drod-extension",
  "id": "publisher.my-drod-extension",
  "version": "1.0.0",
  "displayName": "My Sample Plugin",
  "publisher": "developer",
  "main": "./dist/index.js",
  "engines": {
    "drodcode": "^1.0.0"
  },
  "activationEvents": [
    "onLanguage:typescript",
    "onCommand:extension.hello"
  ]
}
```

## Supported API Endpoints
- `commands.registerCommand(id, callback)`
- `commands.executeCommand(id, ...args)`
- `window.showInformationMessage(msg)`
- `window.showErrorMessage(msg)`
