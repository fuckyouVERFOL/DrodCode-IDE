import { IPCService } from './ipcService';
import { IPC_CHANNELS } from '../../main/ipc/channels';

export class FileService {
  public static async readFile(filePath: string): Promise<{ success: boolean; content?: string; error?: string }> {
    return await IPCService.invoke(IPC_CHANNELS.FILE.READ, filePath);
  }

  public static async writeFile(filePath: string, content: string): Promise<{ success: boolean; error?: string }> {
    return await IPCService.invoke(IPC_CHANNELS.FILE.WRITE, filePath, content);
  }

  public static async deleteFile(filePath: string): Promise<{ success: boolean; error?: string }> {
    return await IPCService.invoke(IPC_CHANNELS.FILE.DELETE, filePath);
  }

  public static async createDirectory(dirPath: string): Promise<{ success: boolean; error?: string }> {
    return await IPCService.invoke(IPC_CHANNELS.FILE.CREATE_DIR, dirPath);
  }

  public static async listDirectory(dirPath: string) {
    return await IPCService.invoke(IPC_CHANNELS.FILE.LIST_DIR, dirPath);
  }

  public static async selectFolder(): Promise<string | null> {
    return await IPCService.invoke(IPC_CHANNELS.FILE.SELECT_FOLDER);
  }

  public static async selectFile(): Promise<string | null> {
    return await IPCService.invoke(IPC_CHANNELS.FILE.SELECT_FILE);
  }

  public static async searchInFiles(rootPath: string, query: string): Promise<string[]> {
    return await IPCService.invoke(IPC_CHANNELS.FILE.SEARCH, rootPath, query);
  }
}
