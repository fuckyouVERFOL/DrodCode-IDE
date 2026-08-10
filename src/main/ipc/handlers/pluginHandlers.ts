import { ipcMain, app } from 'electron';
import { IPC_CHANNELS } from '../channels';
import { PluginManager } from '../../plugins/manager';
import { marketplaceClient } from '../../plugins/marketplace';
import { extensionHostAPI } from '../../plugins/api';

let pluginManager: PluginManager | null = null;

export function registerPluginHandlers(): void {
  pluginManager = new PluginManager(app.getPath('userData'));
  pluginManager.initialize();

  ipcMain.handle(IPC_CHANNELS.PLUGIN.GET_INSTALLED, async () => {
    if (!pluginManager) return [];
    return pluginManager.getInstalledPlugins();
  });

  ipcMain.handle(IPC_CHANNELS.PLUGIN.INSTALL, async (_, downloadUrl: string) => {
    if (!pluginManager) return { success: false, error: 'Plugin manager not initialized' };
    try {
      const buffer = await marketplaceClient.downloadPlugin(downloadUrl);
      const installed = await pluginManager.installPluginFromBuffer(buffer);
      return { success: true, plugin: installed };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle(IPC_CHANNELS.PLUGIN.UNINSTALL, async (_, pluginId: string) => {
    if (!pluginManager) return { success: false, error: 'Plugin manager not initialized' };
    try {
      await pluginManager.uninstallPlugin(pluginId);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle(IPC_CHANNELS.PLUGIN.EXECUTE_COMMAND, async (_, commandId: string, ...args: any[]) => {
    try {
      const result = await extensionHostAPI.executeCommand(commandId, ...args);
      return { success: true, result };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });
}
