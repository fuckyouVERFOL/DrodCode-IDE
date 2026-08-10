import { create } from 'zustand';
import { IDESettings } from '../../shared/types/settings';
import { DEFAULT_KEYBINDINGS } from '../../shared/constants/keybindings';

export const DEFAULT_SETTINGS: IDESettings = {
  editor: {
    fontSize: 14,
    fontFamily: "'Fira Code', 'Consolas', monospace",
    tabSize: 2,
    wordWrap: 'on',
    minimap: { enabled: true },
    renderWhitespace: 'selection',
    autoSave: 'afterDelay',
    autoSaveDelay: 1000,
    formatOnSave: true,
    bracketPairColorization: true,
    lineNumbers: 'on',
  },
  terminal: {
    fontSize: 13,
    fontFamily: "'Fira Code', 'Consolas', monospace",
    cursorStyle: 'block',
    shell: 'powershell.exe',
  },
  theme: {
    name: 'DrodCode Dark',
    type: 'dark',
    colors: {
      background: '#1e1e1e',
      foreground: '#d4d4d4',
      sidebarBackground: '#252526',
      activityBarBackground: '#333333',
      statusBarBackground: '#007acc',
      accentColor: '#0e639c',
    },
  },
  keybindings: DEFAULT_KEYBINDINGS,
  locale: 'ru',
};

interface SettingsState {
  settings: IDESettings;
  activeView: 'explorer' | 'search' | 'git' | 'debug' | 'extensions' | 'settings' | 'ai';

  updateSettings: (newSettings: Partial<IDESettings>) => void;
  setActiveView: (view: SettingsState['activeView']) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: DEFAULT_SETTINGS,
  activeView: 'explorer',

  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),

  setActiveView: (activeView) => set({ activeView }),
}));
