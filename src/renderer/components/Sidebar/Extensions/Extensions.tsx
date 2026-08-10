import React, { useEffect } from 'react';
import { Marketplace } from './Marketplace';
import { usePluginStore } from '../../store/pluginStore';
import { IPCService } from '../../services/ipcService';
import { IPC_CHANNELS } from '../../../main/ipc/channels';
import { Package } from 'lucide-react';

export const Extensions: React.FC = () => {
  const { installed, marketplace, searchQuery, setInstalled, setMarketplace, setSearchQuery } = usePluginStore();

  useEffect(() => {
    IPCService.invoke(IPC_CHANNELS.PLUGIN.GET_INSTALLED).then((res) => {
      if (res) setInstalled(res);
    });

    // Mock initial marketplace list
    setMarketplace([
      {
        id: 'drodcode.prettier',
        name: 'prettier',
        displayName: 'DrodCode Prettier',
        description: 'Официальный форматировщик кода Prettier для JS/TS/HTML/CSS',
        version: '1.0.0',
        publisher: 'drodcode',
        downloads: 1420,
        rating: 4.9,
        downloadUrl: 'http://localhost:3000/api/plugins/download/drodcode.prettier',
      },
      {
        id: 'drodcode.python-tools',
        name: 'python-tools',
        displayName: 'Python Intelligence',
        description: 'Подсветка, Pylint линтинг и автодополнение для Python',
        version: '1.1.0',
        publisher: 'drodcode',
        downloads: 2890,
        rating: 4.8,
        downloadUrl: 'http://localhost:3000/api/plugins/download/drodcode.python-tools',
      },
    ]);
  }, []);

  const handleInstall = async (plugin: any) => {
    await IPCService.invoke(IPC_CHANNELS.PLUGIN.INSTALL, plugin.downloadUrl);
    const updated = await IPCService.invoke(IPC_CHANNELS.PLUGIN.GET_INSTALLED);
    setInstalled(updated);
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
        Расширения и Плагины
      </div>
      <div style={{ padding: '8px' }}>
        <input
          type="text"
          placeholder="Поиск плагинов..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            backgroundColor: '#3c3c3c',
            color: '#ffffff',
            padding: '6px 10px',
            borderRadius: '2px',
            fontSize: '12px',
          }}
        />
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ padding: '8px', fontSize: '11px', fontWeight: 600, color: '#aaaaaa' }}>
          УСТАНОВЛЕННЫЕ ПЛАГИНЫ ({installed.length})
        </div>
        {installed.map((inst) => (
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

        <div style={{ padding: '8px', fontSize: '11px', fontWeight: 600, color: '#aaaaaa', marginTop: '12px' }}>
          МАРКЕТПЛЕЙС
        </div>
        <Marketplace plugins={marketplace} onInstall={handleInstall} />
      </div>
    </div>
  );
};
