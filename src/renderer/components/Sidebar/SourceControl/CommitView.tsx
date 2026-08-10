import React, { useState } from 'react';
import { GitCommit } from '../../../../shared/types/git';
import { GitCommit as CommitIcon } from 'lucide-react';

interface CommitViewProps {
  commits: GitCommit[];
}

export const CommitView: React.FC<CommitViewProps> = ({ commits }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '8px' }}>
      <div style={{ fontSize: '11px', fontWeight: 600, color: '#aaaaaa', textTransform: 'uppercase' }}>
        История коммитов ({commits.length})
      </div>
      {commits.map((commit) => (
        <div
          key={commit.hash}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            padding: '6px',
            backgroundColor: '#2d2d2d',
            borderRadius: '3px',
            fontSize: '11px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#569CD6' }}>
            <CommitIcon size={12} />
            <span style={{ fontWeight: 600 }}>{commit.shortHash}</span>
            <span style={{ color: '#888888', marginLeft: 'auto' }}>{commit.author}</span>
          </div>
          <div style={{ color: '#dddddd' }}>{commit.message}</div>
        </div>
      ))}
    </div>
  );
};
