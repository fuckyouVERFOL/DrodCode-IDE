import React from 'react';
import { useSettingsStore } from '../../store/settingsStore';
import { Files, Search, GitBranch, Bug, Package, Settings as SettingsIcon, Sparkles } from 'lucide-react';

export const MenuBar: React.FC = () => {
  const { activeView, setActiveView } = useSettingsStore();

  const navItems: Array<{ id: any; icon: any; title: string }> = [
    { id: 'explorer', icon: Files, title: 'Проводник (Ctrl+Shift+E)' },
    { id: 'search', icon: Search, title: 'Поиск (Ctrl+Shift+F)' },
    { id: 'git', icon: GitBranch, title: 'Управление версиями (Ctrl+Shift+G)' },
    { id: 'debug', icon: Bug, title: 'Отладка (Ctrl+Shift+D)' },
    { id: 'extensions', icon: Package, title: 'Расширения (Ctrl+Shift+X)' },
    { id: 'ai', icon: Sparkles, title: 'AI Ассистент' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '48px',
        height: '100%',
        backgroundColor: '#333333',
        paddingTop: '8px',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              title={item.title}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '48px',
                height: '48px',
                color: isActive ? '#ffffff' : '#858585',
                borderLeft: isActive ? '2px solid #ffffff' : '2px solid transparent',
              }}
            >
              <Icon size={22} />
            </button>
          );
        })}
      </div>

      <div style={{ marginBottom: '8px' }}>
        <button
          onClick={() => setActiveView('settings')}
          title="Настройки"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '48px',
            height: '48px',
            color: activeView === 'settings' ? '#ffffff' : '#858585',
          }}
        >
          <SettingsIcon size={22} />
        </button>
      </div>
    </div>
  );
};
