import React, { useState } from 'react';
import { VariablesView } from './VariablesView';
import { CallStack } from './CallStack';
import { Play, Square, StepForward, CornerDownRight, CornerOutUpRight } from 'lucide-react';
import { IPCService } from '../../services/ipcService';
import { IPC_CHANNELS } from '../../../main/ipc/channels';

export const Debug: React.FC = () => {
  const [debugging, setDebugging] = useState(false);

  const startDebug = async () => {
    await IPCService.invoke(IPC_CHANNELS.DEBUG.START, {
      type: 'node',
      request: 'launch',
      program: '${workspaceFolder}/index.js',
    });
    setDebugging(true);
  };

  const stopDebug = async () => {
    await IPCService.invoke(IPC_CHANNELS.DEBUG.STOP);
    setDebugging(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <div
        style={{
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          padding: '8px 12px',
          backgroundColor: '#252526',
          borderBottom: '1px solid #3c3c3c',
          textTransform: 'uppercase',
          fontSize: '11px',
          fontWeight: 600,
          color: '#bbbbbb',
        }}
      >
        <span>Отладка (DAP)</span>
        <div style={{ display: 'flex', gap: '8px' }}>
          {!debugging ? (
            <span title="Запуск отладки" style={{ cursor: 'pointer', display: 'flex' }} onClick={startDebug}>
              <Play size={14} color="#4EC9B0" />
            </span>
          ) : (
            <span title="Остановить" style={{ cursor: 'pointer', display: 'flex' }} onClick={stopDebug}>
              <Square size={14} color="#F44747" />
            </span>
          )}
        </div>
      </div>

      {debugging && (
        <div
          style={{
            display: 'flex',
            gap: '12px',
            padding: '8px',
            backgroundColor: '#2d2d2d',
            justify: 'center',
          }}
        >
          <span title="Step Over" style={{ cursor: 'pointer', display: 'flex' }}>
            <StepForward size={16} />
          </span>
          <span title="Step Into" style={{ cursor: 'pointer', display: 'flex' }}>
            <CornerDownRight size={16} />
          </span>
          <span title="Step Out" style={{ cursor: 'pointer', display: 'flex' }}>
            <CornerOutUpRight size={16} />
          </span>
        </div>
      )}

      <div style={{ flex: 1, overflowY: 'auto' }}>
        <VariablesView />
        <CallStack />
      </div>
    </div>
  );
};
