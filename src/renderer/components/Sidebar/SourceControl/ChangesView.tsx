import React from 'react';
import { GitFileStatus } from '../../../../shared/types/git';
import { Plus, Minus, FileCode } from 'lucide-react';

interface ChangesViewProps {
  title: string;
  files: GitFileStatus[];
  onAction: (path: string) => void;
  actionIcon: 'stage' | 'unstage';
}

export const ChangesView: React.FC<ChangesViewProps> = ({ title, files, onAction, actionIcon }) => {
  if (files.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '12px' }}>
      <div style={{ padding: '4px 12px', fontSize: '11px', fontWeight: 600, color: '#aaaaaa' }}>
        {title} ({files.length})
      </div>
      {files.map((file) => (
        <div
          key={file.path}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '4px 12px',
            fontSize: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FileCode size={14} color="#569CD6" />
            <span>{file.path}</span>
          </div>
          <button
            onClick={() => onAction(file.path)}
            style={{ padding: '2px 4px', background: 'transparent' }}
          >
            {actionIcon === 'stage' ? <Plus size={14} color="#4EC9B0" /> : <Minus size={14} color="#F44747" />}
          </button>
        </div>
      ))}
    </div>
  );
};
