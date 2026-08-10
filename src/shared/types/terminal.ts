export interface TerminalSession {
  id: string;
  title: string;
  shell: string;
  pid?: number;
  cwd: string;
  cols: number;
  rows: number;
}

export interface TerminalTab {
  id: string;
  sessionId: string;
  title: string;
  active: boolean;
}

export type ShellType = 'powershell' | 'cmd' | 'bash' | 'zsh';
