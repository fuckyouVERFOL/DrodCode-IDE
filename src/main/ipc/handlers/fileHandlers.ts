import { ipcMain, dialog, BrowserWindow } from 'electron';
import * as fs from 'fs/promises';
import * as path from 'path';
import { IPC_CHANNELS } from '../channels';
import { glob } from 'glob';

export interface FileItemNode {
  name: string;
  path: string;
  isDirectory: boolean;
  children?: FileItemNode[];
  size?: number;
}

export function registerFileHandlers(): void {
  ipcMain.handle(IPC_CHANNELS.FILE.READ, async (_, filePath: string) => {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      return { success: true, content };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle(IPC_CHANNELS.FILE.WRITE, async (_, filePath: string, content: string) => {
    try {
      await fs.writeFile(filePath, content, 'utf-8');
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle(IPC_CHANNELS.FILE.DELETE, async (_, filePath: string) => {
    try {
      const stat = await fs.stat(filePath);
      if (stat.isDirectory()) {
        await fs.rm(filePath, { recursive: true, force: true });
      } else {
        await fs.unlink(filePath);
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle(IPC_CHANNELS.FILE.CREATE_DIR, async (_, dirPath: string) => {
    try {
      await fs.mkdir(dirPath, { recursive: true });
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle(IPC_CHANNELS.FILE.LIST_DIR, async (_, dirPath: string): Promise<FileItemNode[]> => {
    try {
      const entries = await fs.readdir(dirPath, { withFileTypes: true });
      const nodes: FileItemNode[] = await Promise.all(
        entries.map(async (entry) => {
          const fullPath = path.join(dirPath, entry.name);
          const isDir = entry.isDirectory();
          let size = 0;
          if (!isDir) {
            try {
              const stat = await fs.stat(fullPath);
              size = stat.size;
            } catch {
              // ignore
            }
          }
          return {
            name: entry.name,
            path: fullPath,
            isDirectory: isDir,
            size,
          };
        }),
      );
      return nodes.sort((a, b) => {
        if (a.isDirectory && !b.isDirectory) return -1;
        if (!a.isDirectory && b.isDirectory) return 1;
        return a.name.localeCompare(b.name);
      });
    } catch (err) {
      return [];
    }
  });

  ipcMain.handle(IPC_CHANNELS.FILE.SELECT_FOLDER, async (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (!win) return null;
    const result = await dialog.showOpenDialog(win, {
      properties: ['openDirectory'],
    });
    if (result.canceled || result.filePaths.length === 0) return null;
    return result.filePaths[0];
  });

  ipcMain.handle(IPC_CHANNELS.FILE.SELECT_FILE, async (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (!win) return null;
    const result = await dialog.showOpenDialog(win, {
      properties: ['openFile'],
    });
    if (result.canceled || result.filePaths.length === 0) return null;
    return result.filePaths[0];
  });

  ipcMain.handle(IPC_CHANNELS.FILE.SEARCH, async (_, rootPath: string, query: string) => {
    try {
      if (!rootPath || !query) return [];
      const matches = await glob(`**/*${query}*`, {
        cwd: rootPath,
        ignore: ['**/node_modules/**', '**/.git/**', '**/dist/**'],
        nodir: true,
      });
      return matches.map((m) => path.join(rootPath, m));
    } catch (err) {
      return [];
    }
  });
}
