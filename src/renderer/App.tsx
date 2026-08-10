import React from 'react';
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
import { StatusBar } from './components/StatusBar/StatusBar';
import { useSettingsStore } from './store/settingsStore';
import { useTerminalStore } from './store/terminalStore';

export const App: React.FC = () => {
  const { activeView } = useSettingsStore();
  const { panelVisible } = useTerminalStore();

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
    <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh' }}>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <MenuBar />
        {activeView !== 'settings' && (
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
    </div>
  );
};
