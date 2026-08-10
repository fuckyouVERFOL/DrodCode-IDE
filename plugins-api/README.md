# DrodCode Plugin Development SDK 🔌

Package `.drodplugin` extension format SDK for building custom language tools, themes, and commands for DrodCode IDE.

## Quick Start Example

```typescript
import { commands, window, ExtensionContext } from 'drodcode';

export function activate(context: ExtensionContext) {
  const disposable = commands.registerCommand('extension.sayHello', () => {
    window.showInformationMessage('Hello World from DrodCode Plugin!');
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
```
