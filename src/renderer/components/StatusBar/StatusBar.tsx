import React from 'react';
import { useGitStore } from '../../store/gitStore';
import { useEditor } from '../../hooks/useEditor';
import { GitBranch, Sparkles, CheckCircle2 } from 'lucide-react';

export const StatusBar: React.FC = () => {
  const { repoState } = useGitStore();
  const { activeFile } = useEditor();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '24px',
        backgroundColor: '#007acc',
        color: '#ffffff',
        padding: '0 8px',
        fontSize: '11px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {repoState.isRepo && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <GitBranch size={12} />
            {repoState.currentBranch}
          </span>
        )}
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <CheckCircle2 size={12} /> DrodCode Ready
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {activeFile && (
          <>
            <span>{activeFile.language}</span>
            <span>UTF-8</span>
            <span>LF</span>
          </>
        )}
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Sparkles size={12} /> AI Active
        </span>
      </div>
    </div>
  );
};
