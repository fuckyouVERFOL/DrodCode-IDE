import { app, BrowserWindow } from 'electron';
import { createMainWindow } from './window';
import { registerFileHandlers } from './ipc/handlers/fileHandlers';
import { registerTerminalHandlers } from './ipc/handlers/terminalHandlers';
import { registerGitHandlers } from './ipc/handlers/gitHandlers';
import { registerDebugHandlers } from './ipc/handlers/debugHandlers';
import { registerPluginHandlers } from './ipc/handlers/pluginHandlers';
import { registerAIHandlers } from './ipc/handlers/aiHandlers';
import { terminalManager } from './terminal/session';

let mainWindow: BrowserWindow | null = null;

app.whenReady().then(() => {
  registerFileHandlers();
  registerTerminalHandlers();
  registerGitHandlers();
  registerDebugHandlers();
  registerPluginHandlers();
  registerAIHandlers();

  mainWindow = createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      mainWindow = createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  terminalManager.killAll();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
