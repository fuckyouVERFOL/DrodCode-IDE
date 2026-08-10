import * as fs from 'fs/promises';
import * as path from 'path';
import AdmZip from 'adm-zip';
import { InstalledPlugin, PluginManifest } from '../../shared/types/plugin';

export class PluginManager {
  private pluginsDir: string;
  private installedPlugins: Map<string, InstalledPlugin> = new Map();

  constructor(userDataPath: string) {
    this.pluginsDir = path.join(userDataPath, 'plugins');
  }

  public async initialize(): Promise<void> {
    await fs.mkdir(this.pluginsDir, { recursive: true });
    await this.scanPlugins();
  }

  public async scanPlugins(): Promise<InstalledPlugin[]> {
    this.installedPlugins.clear();
    try {
      const entries = await fs.readdir(this.pluginsDir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory()) {
          const pluginPath = path.join(this.pluginsDir, entry.name);
          const manifestPath = path.join(pluginPath, 'manifest.json');
          try {
            const content = await fs.readFile(manifestPath, 'utf-8');
            const manifest: PluginManifest = JSON.parse(content);
            const installed: InstalledPlugin = {
              manifest,
              path: pluginPath,
              enabled: true,
            };
            this.installedPlugins.set(manifest.id, installed);
          } catch {
            // invalid manifest ignore
          }
        }
      }
    } catch {
      // ignore
    }
    return Array.from(this.installedPlugins.values());
  }

  public async installPluginFromBuffer(buffer: Buffer): Promise<InstalledPlugin> {
    const zip = new AdmZip(buffer);
    const manifestEntry = zip.getEntry('manifest.json');
    if (!manifestEntry) {
      throw new Error('Invalid plugin package: missing manifest.json');
    }
    const manifestText = manifestEntry.getData().toString('utf-8');
    const manifest: PluginManifest = JSON.parse(manifestText);

    const pluginDirName = `${manifest.publisher}.${manifest.name}-${manifest.version}`;
    const targetPath = path.join(this.pluginsDir, pluginDirName);

    await fs.mkdir(targetPath, { recursive: true });
    zip.extractAllTo(targetPath, true);

    const installed: InstalledPlugin = {
      manifest,
      path: targetPath,
      enabled: true,
    };

    this.installedPlugins.set(manifest.id, installed);
    return installed;
  }

  public async uninstallPlugin(pluginId: string): Promise<void> {
    const plugin = this.installedPlugins.get(pluginId);
    if (plugin) {
      await fs.rm(plugin.path, { recursive: true, force: true });
      this.installedPlugins.delete(pluginId);
    }
  }

  public getInstalledPlugins(): InstalledPlugin[] {
    return Array.from(this.installedPlugins.values());
  }
}
