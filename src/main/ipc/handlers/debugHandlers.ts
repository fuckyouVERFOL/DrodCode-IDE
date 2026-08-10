import { ipcMain } from 'electron';
import { IPC_CHANNELS } from '../channels';
import { debugSessionManager } from '../../debug/session';
import { DebugBreakpoint } from '../../debug/adapter';

export function registerDebugHandlers(): void {
  ipcMain.handle(IPC_CHANNELS.DEBUG.START, async (_, config: any) => {
    return debugSessionManager.startSession(config);
  });

  ipcMain.handle(IPC_CHANNELS.DEBUG.STOP, async () => {
    return debugSessionManager.stopSession();
  });

  ipcMain.handle(IPC_CHANNELS.DEBUG.SET_BREAKPOINTS, async (_, filePath: string, bps: DebugBreakpoint[]) => {
    return debugSessionManager.setBreakpoints(filePath, bps);
  });

  ipcMain.handle(IPC_CHANNELS.DEBUG.PAUSE, async () => {
    return debugSessionManager.pause();
  });

  ipcMain.handle(IPC_CHANNELS.DEBUG.CONTINUE, async () => {
    return debugSessionManager.continue();
  });

  ipcMain.handle(IPC_CHANNELS.DEBUG.STEP_OVER, async () => {
    return debugSessionManager.stepOver();
  });

  ipcMain.handle(IPC_CHANNELS.DEBUG.STEP_INTO, async () => {
    return debugSessionManager.stepInto();
  });

  ipcMain.handle(IPC_CHANNELS.DEBUG.STEP_OUT, async () => {
    return debugSessionManager.stepOut();
  });

  ipcMain.handle(IPC_CHANNELS.DEBUG.EVALUATE, async (_, expression: string) => {
    return debugSessionManager.evaluate(expression);
  });

  ipcMain.handle(IPC_CHANNELS.DEBUG.VARIABLES, async () => {
    return debugSessionManager.getVariables();
  });
}
