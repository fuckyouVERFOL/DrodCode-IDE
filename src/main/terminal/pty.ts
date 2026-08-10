import * as pty from 'node-pty';
import * as os from 'os';

export interface PTYOptions {
  shell?: string;
  cwd?: string;
  cols?: number;
  rows?: number;
}

export class PTYProcess {
  private ptyProcess: pty.IPty;

  constructor(options: PTYOptions, onData: (data: string) => void, onExit: (exitCode: number) => void) {
    const shell = options.shell || (os.platform() === 'win32' ? 'powershell.exe' : 'bash');
    const cwd = options.cwd || process.env.HOME || process.cwd();

    this.ptyProcess = pty.spawn(shell, [], {
      name: 'xterm-256color',
      cols: options.cols || 80,
      rows: options.rows || 24,
      cwd,
      env: process.env as any,
    });

    this.ptyProcess.onData(onData);
    this.ptyProcess.onExit((e) => onExit(e.exitCode));
  }

  public write(data: string): void {
    this.ptyProcess.write(data);
  }

  public resize(cols: number, rows: number): void {
    try {
      this.ptyProcess.resize(cols, rows);
    } catch {
      // ignore resize errors on shutdown
    }
  }

  public kill(): void {
    this.ptyProcess.kill();
  }

  public get pid(): number {
    return this.ptyProcess.pid;
  }
}
