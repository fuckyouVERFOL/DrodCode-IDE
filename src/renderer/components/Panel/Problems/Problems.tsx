import React from 'react';
import { useEditorStore } from '../../../store/editorStore';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { DiagnosticItem } from '../../../../shared/types/editor';

export const Problems: React.FC = () => {
  const { diagnostics } = useEditorStore();

  if (diagnostics.length === 0) {
    return (
      <div style={{ padding: '12px', color: '#888888', fontSize: '12px' }}>
        В рабочей области ошибок и предупреждений не обнаружено.
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '8px', overflowY: 'auto' }}>
      {diagnostics.map((diag: DiagnosticItem) => (
        <div
          key={diag.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 8px',
            fontSize: '12px',
          }}
        >
          {diag.severity === 'error' && <AlertCircle size={14} color="#F44747" />}
          {diag.severity === 'warning' && <AlertTriangle size={14} color="#CCA700" />}
          {diag.severity === 'info' && <Info size={14} color="#75BEFF" />}
          <span style={{ color: '#ffffff' }}>{diag.message}</span>
          <span style={{ color: '#888888', marginLeft: 'auto' }}>
            [{diag.filePath}:{diag.line}:{diag.column}]
          </span>
        </div>
      ))}
    </div>
  );
};
