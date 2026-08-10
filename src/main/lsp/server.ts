export class LSPServerManager {
  private servers: Map<string, any> = new Map();

  public startServer(languageId: string) {
    this.servers.set(languageId, { running: true });
    return { success: true };
  }

  public stopServer(languageId: string) {
    this.servers.delete(languageId);
    return { success: true };
  }
}

export const lspServerManager = new LSPServerManager();
