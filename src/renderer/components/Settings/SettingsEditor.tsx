import React from 'react';
import { useSettingsStore } from '../../store/settingsStore';

export const SettingsEditor: React.FC = () => {
  const { settings, updateSettings } = useSettingsStore();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px', maxWidth: '600px' }}>
      <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff' }}>Настройки Редактора (settings.json)</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontSize: '12px', color: '#cccccc' }}>Размер шрифта (fontSize)</label>
        <input
          type="number"
          value={settings.editor.fontSize}
          onChange={(e) =>
            updateSettings({
              editor: { ...settings.editor, fontSize: parseInt(e.target.value) || 14 },
            })
          }
          style={{
            backgroundColor: '#3c3c3c',
            color: '#ffffff',
            padding: '6px',
            borderRadius: '2px',
            width: '120px',
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontSize: '12px', color: '#cccccc' }}>Семейство шрифтов (fontFamily)</label>
        <input
          type="text"
          value={settings.editor.fontFamily}
          onChange={(e) =>
            updateSettings({
              editor: { ...settings.editor, fontFamily: e.target.value },
            })
          }
          style={{
            backgroundColor: '#3c3c3c',
            color: '#ffffff',
            padding: '6px',
            borderRadius: '2px',
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontSize: '12px', color: '#cccccc' }}>Размер табуляции (tabSize)</label>
        <input
          type="number"
          value={settings.editor.tabSize}
          onChange={(e) =>
            updateSettings({
              editor: { ...settings.editor, tabSize: parseInt(e.target.value) || 2 },
            })
          }
          style={{
            backgroundColor: '#3c3c3c',
            color: '#ffffff',
            padding: '6px',
            borderRadius: '2px',
            width: '120px',
          }}
        />
      </div>
    </div>
  );
};
