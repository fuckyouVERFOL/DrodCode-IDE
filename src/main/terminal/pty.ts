import * as os from 'os';
import { spawn as childSpawn, ChildProcess } from 'child_process';

export interface PTYOptions {
  shell?: string;
  cwd?: string;
  cols?: number;
  rows?: number;
}

export class PTYProcess {
  private ptyProcess: any = null;
  private fallbackProcess: ChildProcess | null = null;
  public pid: number = 0;

  constructor(options: PTYOptions, onData: (data: string) => void, onExit: (exitCode: number) => void) {
    const shell = options.shell || (os.platform() === 'win32' ? 'powershell.exe' : 'bash');
    const cwd = options.cwd || process.env.USERPROFILE || process.env.HOME || process.cwd();

    try {
      const pty = require('node-pty');
      this.ptyProcess = pty.spawn(shell, [], {
        name: 'xterm-256color',
        cols: options.cols || 80,
        rows: options.rows || 24,
        cwd,
        env: process.env as any,
      });

      this.pid = this.ptyProcess.pid;
      this.ptyProcess.onData(onData);
      this.ptyProcess.onExit((e: { exitCode: number }) => onExit(e.exitCode));
    } catch (err) {
      console.warn('[Terminal] node-pty failed to initialize, using child_process fallback:', err);
      this.fallbackProcess = childSpawn(shell, [], {
        cwd,
        env: process.env as any,
        shell: true,
      });

      this.pid = this.fallbackProcess.pid || 0;

      this.fallbackProcess.stdout?.on('data', (chunk) => onData(chunk.toString('utf-8')));
      this.fallbackProcess.stderr?.on('data', (chunk) => onData(chunk.toString('utf-8')));
      this.fallbackProcess.on('exit', (code) => onExit(code || 0));
    }
  }

  public write(data: string): void {
    if (this.ptyProcess) {
      this.ptyProcess.write(data);
    } else if (this.fallbackProcess && this.fallbackProcess.stdin) {
      this.fallbackProcess.stdin.write(data);
    }
  }

  public resize(cols: number, rows: number): void {
    if (this.ptyProcess) {
      try {
        this.ptyProcess.resize(cols, rows);
      } catch {
        // ignore resize errors
      }
    }
  }

  public kill(): void {
    if (this.ptyProcess) {
      this.ptyProcess.kill();
    } else if (this.fallbackProcess) {
      this.fallbackProcess.kill();
    }
  }
}
