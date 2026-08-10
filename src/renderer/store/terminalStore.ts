import { create } from 'zustand';
import { TerminalSession, TerminalTab } from '../../shared/types/terminal';
import { generateId } from '../../shared/utils/string';

interface TerminalState {
  sessions: Map<string, TerminalSession>;
  tabs: TerminalTab[];
  activeTabId: string | null;
  panelVisible: boolean;

  createTab: (shell?: string, cwd?: string) => string;
  closeTab: (tabId: string) => void;
  setActiveTab: (tabId: string) => void;
  togglePanel: () => void;
  setPanelVisible: (visible: boolean) => void;
}

export const useTerminalStore = create<TerminalState>((set, get) => ({
  sessions: new Map(),
  tabs: [],
  activeTabId: null,
  panelVisible: false,

  createTab: (shell = 'powershell.exe', cwd = '') => {
    const { sessions, tabs } = get();
    const sessionId = generateId();
    const tabId = generateId();

    const session: TerminalSession = {
      id: sessionId,
      title: `Terminal ${tabs.length + 1}`,
      shell,
      cwd,
      cols: 80,
      rows: 24,
    };

    const tab: TerminalTab = {
      id: tabId,
      sessionId,
      title: session.title,
      active: true,
    };

    const newSessions = new Map(sessions);
    newSessions.set(sessionId, session);

    set({
      sessions: newSessions,
      tabs: [...tabs, tab],
      activeTabId: tabId,
      panelVisible: true,
    });

    return sessionId;
  },

  closeTab: (tabId: string) => {
    const { tabs, activeTabId, sessions } = get();
    const tab = tabs.find((t) => t.id === tabId);
    if (!tab) return;

    const newSessions = new Map(sessions);
    newSessions.delete(tab.sessionId);

    const newTabs = tabs.filter((t) => t.id !== tabId);
    let nextActiveId = activeTabId;

    if (activeTabId === tabId) {
      nextActiveId = newTabs.length > 0 ? newTabs[newTabs.length - 1].id : null;
    }

    set({
      sessions: newSessions,
      tabs: newTabs,
      activeTabId: nextActiveId,
    });
  },

  setActiveTab: (tabId: string) => {
    set({ activeTabId: tabId });
  },

  togglePanel: () => {
    set((state) => ({ panelVisible: !state.panelVisible }));
  },

  setPanelVisible: (visible: boolean) => {
    set({ panelVisible: visible });
  },
}));
