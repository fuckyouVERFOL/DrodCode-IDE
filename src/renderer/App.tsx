import React, { useEffect, useState } from 'react';
import { MenuBar } from './components/MenuBar/MenuBar';
import { FileExplorer } from './components/Sidebar/FileExplorer/FileExplorer';
import { Search } from './components/Sidebar/Search/Search';
import { SourceControl } from './components/Sidebar/SourceControl/SourceControl';
import { Debug } from './components/Sidebar/Debug/Debug';
import { Extensions } from './components/Sidebar/Extensions/Extensions';
import { Settings } from './components/Settings/Settings';
import { EditorGroup } from './components/Editor/EditorGroup';
import { Terminal } from './components/Panel/Terminal/Terminal';
import { AIChat } from './components/Panel/AI/AIChat';
import { BrowserPanel } from './components/Panel/Browser/BrowserPanel';
import { StatusBar } from './components/StatusBar/StatusBar';
import { useSettingsStore } from './store/settingsStore';
import { useTerminalStore } from './store/terminalStore';
import { useEditorStore } from './store/editorStore';
import { useTerminal } from './hooks/useTerminal';
import { useEditor } from './hooks/useEditor';
import { FileService } from './services/fileService';
import { IPCService } from './services/ipcService';
import { Code2, X } from 'lucide-react';

export const App: React.FC = () => {
  const { activeView } = useSettingsStore();
  const { panelVisible, togglePanel } = useTerminalStore();
  const { setRootPath } = useEditorStore();
  const { spawnTerminal } = useTerminal();
  const { openFileFromPath, saveActiveFile } = useEditor();
  const [showAboutModal, setShowAboutModal] = useState(false);

  useEffect(() => {
    const removeListener = IPCService.on('menu:action', async (action: string) => {
      if (action === 'open-folder') {
        const folder = await FileService.selectFolder();
        if (folder) setRootPath(folder);
      } else if (action === 'open-file') {
        const file = await FileService.selectFile();
        if (file) openFileFromPath(file);
      } else if (action === 'save-file') {
        saveActiveFile();
      } else if (action === 'new-terminal') {
        spawnTerminal();
      } else if (action === 'toggle-terminal') {
        togglePanel();
      } else if (action === 'about') {
        setShowAboutModal(true);
      }
    });

    return () => removeListener();
  }, []);

  const renderSidebar = () => {
    switch (activeView) {
      case 'explorer':
        return <FileExplorer />;
      case 'search':
        return <Search />;
      case 'git':
        return <SourceControl />;
      case 'debug':
        return <Debug />;
      case 'extensions':
        return <Extensions />;
      case 'ai':
        return <AIChat />;
      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh', backgroundColor: '#1e1e1e', color: '#cccccc' }}>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <MenuBar />
        {activeView !== 'settings' && activeView !== 'browser' && (
          <div
            style={{
              width: '280px',
              height: '100%',
              backgroundColor: '#252526',
              borderRight: '1px solid #3c3c3c',
            }}
          >
            {renderSidebar()}
          </div>
        )}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
          {activeView === 'settings' ? (
            <Settings />
          ) : activeView === 'browser' ? (
            <BrowserPanel />
          ) : (
            <>
              <div style={{ flex: panelVisible ? 0.65 : 1, height: '100%' }}>
                <EditorGroup />
              </div>
              {panelVisible && (
                <div style={{ flex: 0.35, borderTop: '1px solid #3c3c3c', height: '100%' }}>
                  <Terminal />
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <StatusBar />

      {showAboutModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              width: '420px',
              backgroundColor: '#252526',
              border: '1px solid #3c3c3c',
              borderRadius: '6px',
              padding: '20px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              position: 'relative',
            }}
          >
            <X
              size={18}
              style={{ position: 'absolute', top: '16px', right: '16px', cursor: 'pointer' }}
              onClick={() => setShowAboutModal(false)}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Code2 size={40} color="#007acc" />
              <div>
                <h2 style={{ margin: 0, fontSize: '18px', color: '#ffffff' }}>DrodCode IDE</h2>
                <span style={{ fontSize: '12px', color: '#888888' }}>Версия 1.0.0</span>
              </div>
            </div>

            <p style={{ fontSize: '12px', color: '#cccccc', margin: 0, lineHeight: '1.5' }}>
              Полнофункциональная полноценная среда разработки (IDE) на базе Electron, React, TypeScript и Monaco Editor.
            </p>

            <div style={{ fontSize: '11px', color: '#aaaaaa', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div>Автор: <b>DrodCode Team</b></div>
              <div>Репозиторий: <a href="https://github.com/fuckyouVERFOL/DrodCode-IDE" target="_blank" rel="noreferrer" style={{ color: '#3794ff' }}>fuckyouVERFOL/DrodCode-IDE</a></div>
              <div>Лицензия: <b>MIT</b></div>
            </div>

            <button
              onClick={() => setShowAboutModal(false)}
              style={{
                alignSelf: 'flex-end',
                backgroundColor: '#0e639c',
                color: '#ffffff',
                padding: '6px 16px',
                borderRadius: '2px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
