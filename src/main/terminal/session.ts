import { PTYProcess, PTYOptions } from './pty';
import { BrowserWindow } from 'electron';
import { IPC_CHANNELS } from '../ipc/channels';

export class TerminalSessionManager {
  private sessions: Map<string, PTYProcess> = new Map();

  public createSession(
    id: string,
    options: PTYOptions,
    window: BrowserWindow,
  ): { pid: number } {
    const process = new PTYProcess(
      options,
      (data) => {
        if (!window.isDestroyed()) {
          window.webContents.send(IPC_CHANNELS.TERMINAL.ON_DATA, { id, data });
        }
      },
      (exitCode) => {
        if (!window.isDestroyed()) {
          window.webContents.send(IPC_CHANNELS.TERMINAL.ON_EXIT, { id, exitCode });
        }
        this.sessions.delete(id);
      },
    );

    this.sessions.set(id, process);
    return { pid: process.pid };
  }

  public write(id: string, data: string): void {
    const session = this.sessions.get(id);
    if (session) {
      session.write(data);
    }
  }

  public resize(id: string, cols: number, rows: number): void {
    const session = this.sessions.get(id);
    if (session) {
      session.resize(cols, rows);
    }
  }

  public kill(id: string): void {
    const session = this.sessions.get(id);
    if (session) {
      session.kill();
      this.sessions.delete(id);
    }
  }

  public killAll(): void {
    this.sessions.forEach((s) => s.kill());
    this.sessions.clear();
  }
}

export const terminalManager = new TerminalSessionManager();
