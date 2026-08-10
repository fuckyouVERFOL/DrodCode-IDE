import { DebugBreakpoint, DebugFrame, DebugVariable } from './adapter';

export class DebugSessionManager {
  private active: boolean = false;
  private breakpoints: Map<string, DebugBreakpoint[]> = new Map();
  private frames: DebugFrame[] = [];
  private variables: DebugVariable[] = [];

  public startSession(config: { type: string; request: string; program: string }) {
    this.active = true;
    return { success: true, sessionId: 'dap-session-1' };
  }

  public stopSession() {
    this.active = false;
    this.frames = [];
    this.variables = [];
    return { success: true };
  }

  public setBreakpoints(filePath: string, bps: DebugBreakpoint[]) {
    this.breakpoints.set(filePath, bps);
    return bps.map((b) => ({ ...b, verified: true }));
  }

  public pause() {
    return { success: true };
  }

  public continue() {
    return { success: true };
  }

  public stepOver() {
    return { success: true };
  }

  public stepInto() {
    return { success: true };
  }

  public stepOut() {
    return { success: true };
  }

  public evaluate(expression: string) {
    return { result: `Evaluated: ${expression}`, type: 'string' };
  }

  public getVariables() {
    return this.variables;
  }

  public isSessionActive(): boolean {
    return this.active;
  }
}

export const debugSessionManager = new DebugSessionManager();
