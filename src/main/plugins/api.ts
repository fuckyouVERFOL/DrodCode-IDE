export class ExtensionHostAPI {
  private commands: Map<string, (...args: any[]) => any> = new Map();

  public registerCommand(commandId: string, handler: (...args: any[]) => any) {
    this.commands.set(commandId, handler);
    return {
      dispose: () => this.commands.delete(commandId),
    };
  }

  public async executeCommand(commandId: string, ...args: any[]) {
    const handler = this.commands.get(commandId);
    if (!handler) {
      throw new Error(`Command '${commandId}' not found.`);
    }
    return await handler(...args);
  }
}

export const extensionHostAPI = new ExtensionHostAPI();
