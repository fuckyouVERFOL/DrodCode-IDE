import React, { useEffect, useRef } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { useTerminal } from '../../../hooks/useTerminal';
import { IPCService } from '../../../services/ipcService';
import { IPC_CHANNELS } from '../../../../main/ipc/channels';
import { TerminalTabs } from './TerminalTabs';
import 'xterm/css/xterm.css';

export const Terminal: React.FC = () => {
  const { tabs, activeTabId, spawnTerminal } = useTerminal();
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);

  const activeTab = tabs.find((t) => t.id === activeTabId);

  useEffect(() => {
    if (tabs.length === 0) {
      spawnTerminal();
    }
  }, []);

  useEffect(() => {
    if (!terminalRef.current || !activeTab) return;

    // Clear previous instance
    terminalRef.current.innerHTML = '';

    const term = new XTerm({
      theme: {
        background: '#1e1e1e',
        foreground: '#cccccc',
        cursor: '#ffffff',
        selectionBackground: '#264F78',
      },
      fontSize: 13,
      fontFamily: "'Fira Code', 'Consolas', monospace",
      cursorBlink: true,
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);

    term.open(terminalRef.current);
    fitAddon.fit();

    xtermRef.current = term;

    term.onData((data) => {
      IPCService.invoke(IPC_CHANNELS.TERMINAL.INPUT, { id: activeTab.sessionId, data });
    });

    const removeDataListener = IPCService.on(
      IPC_CHANNELS.TERMINAL.ON_DATA,
      (payload: { id: string; data: string }) => {
        if (payload.id === activeTab.sessionId) {
          term.write(payload.data);
        }
      },
    );

    const handleResize = () => fitAddon.fit();
    window.addEventListener('resize', handleResize);

    return () => {
      removeDataListener();
      window.removeEventListener('resize', handleResize);
      term.dispose();
    };
  }, [activeTabId]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <TerminalTabs />
      <div ref={terminalRef} style={{ flex: 1, padding: '4px', overflow: 'hidden' }} />
    </div>
  );
};
