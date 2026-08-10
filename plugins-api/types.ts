export interface Disposable {
  dispose(): void;
}

export interface ExtensionContext {
  subscriptions: Disposable[];
  extensionPath: string;
}

export interface Command {
  title: string;
  command: string;
  arguments?: any[];
}
