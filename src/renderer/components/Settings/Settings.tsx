import React from 'react';
import { SettingsEditor } from './SettingsEditor';
import { useSettingsStore } from '../../store/settingsStore';

export const Settings: React.FC = () => {
  const { settings } = useSettingsStore();

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', backgroundColor: '#1e1e1e' }}>
      <div style={{ flex: 1, borderRight: '1px solid #3c3c3c', overflowY: 'auto' }}>
        <SettingsEditor />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px', overflowY: 'auto' }}>
        <h3 style={{ fontSize: '14px', marginBottom: '8px', color: '#aaaaaa' }}>JSON Просмотр (settings.json)</h3>
        <pre
          style={{
            backgroundColor: '#2d2d2d',
            padding: '12px',
            borderRadius: '4px',
            fontSize: '12px',
            color: '#4EC9B0',
            fontFamily: "'Fira Code', monospace",
          }}
        >
          {JSON.stringify(settings, null, 2)}
        </pre>
      </div>
    </div>
  );
};
