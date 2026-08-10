import React, { useEffect, useState } from 'react';
import { Marketplace } from './Marketplace';
import { usePluginStore } from '../../../store/pluginStore';
import { IPCService } from '../../../services/ipcService';
import { IPC_CHANNELS } from '../../../../main/ipc/channels';
import { Package, Search } from 'lucide-react';
import { InstalledPlugin, MarketplacePlugin } from '../../../../shared/types/plugin';

export const Extensions: React.FC = () => {
  const { installed, marketplace, searchQuery, setInstalled, setMarketplace, setSearchQuery } = usePluginStore();
  const [loading, setLoading] = useState(false);

  const fetchMarketplace = async (query: string) => {
    setLoading(true);
    try {
      const res = await IPCService.invoke(IPC_CHANNELS.PLUGIN.SEARCH_MARKETPLACE, query);
      if (res && res.success && Array.isArray(res.plugins)) {
        setMarketplace(res.plugins);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    IPCService.invoke(IPC_CHANNELS.PLUGIN.GET_INSTALLED).then((res: InstalledPlugin[]) => {
      if (res) setInstalled(res);
    });

    fetchMarketplace('');
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMarketplace(searchQuery);
  };

  const handleInstall = async (plugin: MarketplacePlugin) => {
    await IPCService.invoke(IPC_CHANNELS.PLUGIN.INSTALL, plugin.downloadUrl);
    const updated = await IPCService.invoke(IPC_CHANNELS.PLUGIN.GET_INSTALLED);
    if (updated) setInstalled(updated);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <div
        style={{
          padding: '8px 12px',
          backgroundColor: '#252526',
          borderBottom: '1px solid #3c3c3c',
          textTransform: 'uppercase',
          fontSize: '11px',
          fontWeight: 600,
          color: '#bbbbbb',
        }}
      >
        Расширения и Маркетплейс VS Code
      </div>

      <form onSubmit={handleSearchSubmit} style={{ padding: '8px', display: 'flex', gap: '4px' }}>
        <input
          type="text"
          placeholder="Поиск в VS Code Marketplace (Prettier, Python, ESLint...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: 1,
            backgroundColor: '#3c3c3c',
            color: '#ffffff',
            padding: '6px 10px',
            borderRadius: '2px',
            fontSize: '12px',
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: '#0e639c',
            color: '#ffffff',
            padding: '6px 10px',
            borderRadius: '2px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Search size={14} />
        </button>
      </form>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {installed.length > 0 && (
          <>
            <div style={{ padding: '8px 12px', fontSize: '11px', fontWeight: 600, color: '#aaaaaa' }}>
              УСТАНОВЛЕННЫЕ ПЛАГИНЫ ({installed.length})
            </div>
            {installed.map((inst: InstalledPlugin) => (
              <div
                key={inst.manifest.id}
                style={{
                  padding: '6px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '12px',
                }}
              >
                <Package size={16} color="#4EC9B0" />
                <span>{inst.manifest.displayName}</span>
              </div>
            ))}
          </>
        )}

        <div style={{ padding: '8px 12px', fontSize: '11px', fontWeight: 600, color: '#aaaaaa', marginTop: '4px' }}>
          ОФИЦИАЛЬНЫЙ VS CODE МАРКЕТПЛЕЙС {loading && '(загрузка...)'}
        </div>

        <Marketplace plugins={marketplace} onInstall={handleInstall} />
      </div>
    </div>
  );
};
