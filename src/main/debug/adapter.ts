import { DebugProtocol } from '@vscode/debugprotocol';

export interface DebugBreakpoint {
  id: string;
  filePath: string;
  line: number;
  column?: number;
  condition?: string;
  verified: boolean;
}

export interface DebugFrame {
  id: number;
  name: string;
  source?: { path?: string };
  line: number;
  column: number;
}

export interface DebugVariable {
  name: string;
  value: string;
  type?: string;
  variablesReference: number;
}
