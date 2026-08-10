import React from 'react';
import { MarketplacePlugin } from '../../../../shared/types/plugin';
import { Download, Star } from 'lucide-react';

interface MarketplaceProps {
  plugins: MarketplacePlugin[];
  onInstall: (plugin: MarketplacePlugin) => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({ plugins, onInstall }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '8px' }}>
      {plugins.map((plugin) => (
        <div
          key={plugin.id}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            padding: '8px',
            backgroundColor: '#2d2d2d',
            borderRadius: '4px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 600, fontSize: '13px', color: '#ffffff' }}>{plugin.displayName}</span>
            <span style={{ fontSize: '11px', color: '#888888' }}>v{plugin.version}</span>
          </div>
          <p style={{ fontSize: '11px', color: '#cccccc' }}>{plugin.description}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
            <div style={{ display: 'flex', gap: '8px', fontSize: '11px', color: '#aaaaaa' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                <Download size={12} /> {plugin.downloads}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                <Star size={12} color="#E8AB53" /> {plugin.rating}
              </span>
            </div>
            <button
              onClick={() => onInstall(plugin)}
              style={{
                backgroundColor: '#0e639c',
                color: '#ffffff',
                padding: '3px 8px',
                borderRadius: '2px',
                fontSize: '11px',
              }}
            >
              Установить
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
