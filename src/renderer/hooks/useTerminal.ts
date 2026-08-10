import { useTerminalStore } from '../store/terminalStore';
import { IPCService } from '../services/ipcService';
import { IPC_CHANNELS } from '../../main/ipc/channels';

export function useTerminal() {
  const {
    sessions,
    tabs,
    activeTabId,
    panelVisible,
    createTab,
    closeTab,
    setActiveTab,
    togglePanel,
    setPanelVisible,
  } = useTerminalStore();

  const spawnTerminal = async (shell = 'powershell.exe', cwd = '') => {
    const sessionId = createTab(shell, cwd);
    await IPCService.invoke(IPC_CHANNELS.TERMINAL.CREATE, {
      id: sessionId,
      shell,
      cwd,
      cols: 80,
      rows: 24,
    });
  };

  const killTerminal = async (tabId: string) => {
    const tab = tabs.find((t) => t.id === tabId);
    if (tab) {
      await IPCService.invoke(IPC_CHANNELS.TERMINAL.KILL, { id: tab.sessionId });
      closeTab(tabId);
    }
  };

  return {
    sessions,
    tabs,
    activeTabId,
    panelVisible,
    spawnTerminal,
    killTerminal,
    setActiveTab,
    togglePanel,
    setPanelVisible,
  };
}
