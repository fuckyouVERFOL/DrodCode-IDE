import { BrowserWindow, app } from 'electron';
import * as path from 'path';
import { createApplicationMenu } from './menu';

export function createMainWindow(): BrowserWindow {
  const iconPath = path.join(__dirname, '../../resources/icons/icon.png');

  const mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 600,
    title: 'DrodCode IDE',
    icon: iconPath,
    frame: true,
    backgroundColor: '#1e1e1e',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
  });

  createApplicationMenu(mainWindow);

  const isDev = process.env.NODE_ENV !== 'production';
  if (isDev) {
    mainWindow.loadURL('http://localhost:8080').catch(() => {
      mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
    });
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }

  return mainWindow;
}
