const { ipcRenderer } = window.require('electron');
import { IPC_CHANNELS } from '../../main/ipc/channels';

export class IPCService {
  public static async invoke(channel: string, ...args: any[]): Promise<any> {
    return await ipcRenderer.invoke(channel, ...args);
  }

  public static on(channel: string, listener: (...args: any[]) => void): () => void {
    const wrapper = (_: any, ...args: any[]) => listener(...args);
    ipcRenderer.on(channel, wrapper);
    return () => ipcRenderer.removeListener(channel, wrapper);
  }
}
