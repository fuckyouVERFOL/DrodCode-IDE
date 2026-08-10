export class LSPClient {
  private languageId: string;

  constructor(languageId: string) {
    this.languageId = languageId;
  }

  public initialize() {
    return { success: true, languageId: this.languageId };
  }

  public sendCompletionRequest(documentPath: string, line: number, character: number) {
    return [
      { label: 'console.log', kind: 2, detail: 'Console output function' },
      { label: 'function', kind: 14, detail: 'Function declaration' },
      { label: 'const', kind: 14, detail: 'Constant variable' },
    ];
  }
}
