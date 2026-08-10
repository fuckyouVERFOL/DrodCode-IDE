import React, { useState } from 'react';
import { useGit } from '../../../hooks/useGit';
import { ChangesView } from './ChangesView';
import { CommitView } from './CommitView';
import { GitBranch, RefreshCw, UploadCloud, DownloadCloud } from 'lucide-react';

export const SourceControl: React.FC = () => {
  const { repoState, repoPath, refreshStatus, stageFile, unstageFile, commit, push, pull } = useGit();
  const [commitMessage, setCommitMessage] = useState('');

  const handleCommit = () => {
    if (commitMessage.trim()) {
      commit(commitMessage);
      setCommitMessage('');
    }
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
        <span>Управление версиями</span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span title="Обновить" style={{ cursor: 'pointer', display: 'flex' }} onClick={() => refreshStatus()}>
            <RefreshCw size={14} />
          </span>
          <span title="Push" style={{ cursor: 'pointer', display: 'flex' }} onClick={push}>
            <UploadCloud size={14} />
          </span>
          <span title="Pull" style={{ cursor: 'pointer', display: 'flex' }} onClick={pull}>
            <DownloadCloud size={14} />
          </span>
        </div>
      </div>

      {repoState.isRepo ? (
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', padding: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#569CD6' }}>
            <GitBranch size={14} />
            <span style={{ fontWeight: 600 }}>{repoState.currentBranch}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <textarea
              placeholder="Сообщение коммита..."
              value={commitMessage}
              onChange={(e) => setCommitMessage(e.target.value)}
              rows={2}
              style={{
                backgroundColor: '#3c3c3c',
                color: '#ffffff',
                padding: '6px',
                borderRadius: '2px',
                fontSize: '12px',
                resize: 'none',
              }}
            />
            <button
              onClick={handleCommit}
              disabled={repoState.stagedFiles.length === 0}
              style={{
                backgroundColor: repoState.stagedFiles.length > 0 ? '#0e639c' : '#444444',
                color: '#ffffff',
                padding: '6px',
                borderRadius: '2px',
                fontWeight: 600,
              }}
            >
              Закоммитить ({repoState.stagedFiles.length})
            </button>
          </div>

          <ChangesView
            title="Staged Changes"
            files={repoState.stagedFiles}
            onAction={unstageFile}
            actionIcon="unstage"
          />

          <ChangesView
            title="Changes"
            files={repoState.unstagedFiles}
            onAction={stageFile}
            actionIcon="stage"
          />

          <CommitView commits={repoState.commits} />
        </div>
      ) : (
        <div style={{ padding: '16px', textAlign: 'center', color: '#888888' }}>
          Текущая папка не является Git-репозиторием.
        </div>
      )}
    </div>
  );
};
