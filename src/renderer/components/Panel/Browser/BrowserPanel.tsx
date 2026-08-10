import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Globe, ExternalLink, ShieldCheck } from 'lucide-react';

interface BrowserPanelProps {
  initialUrl?: string;
}

export const BrowserPanel: React.FC<BrowserPanelProps> = ({ initialUrl = 'http://localhost:3000' }) => {
  const [url, setUrl] = useState(initialUrl);
  const [inputUrl, setInputUrl] = useState(initialUrl);
  const [iframeKey, setIframeKey] = useState(0);

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    let target = inputUrl.trim();
    if (!target.startsWith('http://') && !target.startsWith('https://')) {
      target = `http://${target}`;
    }
    setUrl(target);
    setInputUrl(target);
  };

  const handleRefresh = () => {
    setIframeKey((prev) => prev + 1);
  };

  const openExternal = () => {
    window.open(url, '_blank');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', backgroundColor: '#1e1e1e', color: '#cccccc' }}>
      {/* Top Address Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 12px',
          backgroundColor: '#252526',
          borderBottom: '1px solid #3c3c3c',
        }}
      >
        <div style={{ display: 'flex', gap: '4px' }}>
          <button
            onClick={() => window.history.back()}
            style={{ backgroundColor: 'transparent', border: 'none', color: '#aaaaaa', cursor: 'pointer', padding: '4px', borderRadius: '4px' }}
            title="Назад"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={() => window.history.forward()}
            style={{ backgroundColor: 'transparent', border: 'none', color: '#aaaaaa', cursor: 'pointer', padding: '4px', borderRadius: '4px' }}
            title="Вперед"
          >
            <ArrowRight size={16} />
          </button>
          <button
            onClick={handleRefresh}
            style={{ backgroundColor: 'transparent', border: 'none', color: '#aaaaaa', cursor: 'pointer', padding: '4px', borderRadius: '4px' }}
            title="Обновить"
          >
            <RotateCw size={15} />
          </button>
        </div>

        <form onSubmit={handleNavigate} style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              backgroundColor: '#3c3c3c',
              borderRadius: '4px',
              padding: '4px 10px',
              gap: '8px',
            }}
          >
            <Globe size={14} color="#888888" />
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Введите URL (например http://localhost:3000)..."
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                border: 'none',
                color: '#ffffff',
                fontSize: '12px',
                outline: 'none',
              }}
            />
            <span title="Защищенное локальное соединение">
              <ShieldCheck size={14} color="#4EC9B0" />
            </span>
          </div>
        </form>

        <button
          onClick={openExternal}
          style={{ backgroundColor: 'transparent', border: 'none', color: '#aaaaaa', cursor: 'pointer', padding: '4px', borderRadius: '4px' }}
          title="Открыть в системном браузере"
        >
          <ExternalLink size={16} />
        </button>
      </div>

      {/* Frame Viewer */}
      <div style={{ flex: 1, position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
        <iframe
          key={iframeKey}
          src={url}
          title="DrodCode Web Preview"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            backgroundColor: '#ffffff',
          }}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>
    </div>
  );
};
