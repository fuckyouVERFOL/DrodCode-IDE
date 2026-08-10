import React, { useState } from 'react';
import { MarketplacePlugin } from '../../../../shared/types/plugin';
import { Download, Star, Package } from 'lucide-react';

interface MarketplaceProps {
  plugins: MarketplacePlugin[];
  onInstall: (plugin: MarketplacePlugin) => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({ plugins, onInstall }) => {
  const [failedIcons, setFailedIcons] = useState<Record<string, boolean>>({});

  const formatDownloads = (num: number) => {
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}k`;
    return `${num}`;
  };

  const handleImageError = (id: string) => {
    setFailedIcons((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '8px' }}>
      {plugins.map((plugin) => (
        <div
          key={plugin.id}
          style={{
            display: 'flex',
            gap: '10px',
            padding: '10px',
            backgroundColor: '#2d2d2d',
            borderRadius: '4px',
            border: '1px solid #3c3c3c',
          }}
        >
          {plugin.iconUrl && !failedIcons[plugin.id] ? (
            <img
              src={plugin.iconUrl}
              alt={plugin.name}
              onError={() => handleImageError(plugin.id)}
              style={{ width: '36px', height: '36px', borderRadius: '4px', objectFit: 'cover' }}
            />
          ) : (
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '4px',
                backgroundColor: '#3c3c3c',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Package size={20} color="#4EC9B0" />
            </div>
          )}

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, fontSize: '12px', color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {plugin.displayName}
              </span>
              <span style={{ fontSize: '10px', color: '#888888' }}>v{plugin.version}</span>
            </div>
            <div style={{ fontSize: '10px', color: '#569CD6' }}>{plugin.publisher}</div>
            <p style={{ fontSize: '11px', color: '#cccccc', margin: '2px 0', lineHeight: '1.3', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {plugin.description}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
              <div style={{ display: 'flex', gap: '10px', fontSize: '11px', color: '#aaaaaa' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <Download size={12} color="#4EC9B0" /> {formatDownloads(plugin.downloads)}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <Star size={12} color="#E8AB53" /> {plugin.rating}
                </span>
              </div>
              <button
                onClick={() => onInstall(plugin)}
                style={{
                  backgroundColor: '#0e639c',
                  color: '#ffffff',
                  padding: '3px 10px',
                  borderRadius: '2px',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Установить
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
