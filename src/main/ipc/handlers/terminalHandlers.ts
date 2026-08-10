import { ipcMain, BrowserWindow } from 'electron';
import { IPC_CHANNELS } from '../channels';
import { terminalManager } from '../../terminal/session';

export function registerTerminalHandlers(): void {
  ipcMain.handle(
    IPC_CHANNELS.TERMINAL.CREATE,
    (event, payload: { id: string; shell?: string; cwd?: string; cols?: number; rows?: number }) => {
      const win = BrowserWindow.fromWebContents(event.sender);
      if (!win) return { success: false, error: 'No active browser window' };
      try {
        const { pid } = terminalManager.createSession(payload.id, payload, win);
        return { success: true, pid };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    },
  );

  ipcMain.handle(IPC_CHANNELS.TERMINAL.INPUT, (_, payload: { id: string; data: string }) => {
    terminalManager.write(payload.id, payload.data);
  });

  ipcMain.handle(
    IPC_CHANNELS.TERMINAL.RESIZE,
    (_, payload: { id: string; cols: number; rows: number }) => {
      terminalManager.resize(payload.id, payload.cols, payload.rows);
    },
  );

  ipcMain.handle(IPC_CHANNELS.TERMINAL.KILL, (_, payload: { id: string }) => {
    terminalManager.kill(payload.id);
  });
}
