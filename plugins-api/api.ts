import { Disposable } from './types';

export namespace commands {
  export function registerCommand(commandId: string, callback: (...args: any[]) => any): Disposable {
    console.log(`[DrodCode Plugin SDK] Registered command: ${commandId}`);
    return {
      dispose: () => {
        console.log(`[DrodCode Plugin SDK] Disposed command: ${commandId}`);
      },
    };
  }

  export function executeCommand(commandId: string, ...args: any[]): Promise<any> {
    return Promise.resolve();
  }
}

export namespace window {
  export function showInformationMessage(message: string): void {
    console.log(`[DrodCode Info]: ${message}`);
  }

  export function showErrorMessage(message: string): void {
    console.error(`[DrodCode Error]: ${message}`);
  }
}
