import { useGitStore } from '../store/gitStore';
import { IPCService } from '../services/ipcService';
import { IPC_CHANNELS } from '../../main/ipc/channels';

export function useGit() {
  const { repoState, loading, repoPath, setRepoPath, setRepoState, setLoading } = useGitStore();

  const refreshStatus = async (path?: string) => {
    const currentPath = path || repoPath;
    if (!currentPath) return;
    setLoading(true);
    try {
      const res = await IPCService.invoke(IPC_CHANNELS.GIT.STATUS, currentPath);
      if (res.success) {
        setRepoState(res.state);
        setRepoPath(currentPath);
      }
    } finally {
      setLoading(false);
    }
  };

  const stageFile = async (filePath: string) => {
    if (!repoPath) return;
    await IPCService.invoke(IPC_CHANNELS.GIT.STAGE, repoPath, filePath);
    await refreshStatus();
  };

  const unstageFile = async (filePath: string) => {
    if (!repoPath) return;
    await IPCService.invoke(IPC_CHANNELS.GIT.UNSTAGE, repoPath, filePath);
    await refreshStatus();
  };

  const commit = async (message: string) => {
    if (!repoPath || !message) return;
    await IPCService.invoke(IPC_CHANNELS.GIT.COMMIT, repoPath, message);
    await refreshStatus();
  };

  const push = async () => {
    if (!repoPath) return;
    await IPCService.invoke(IPC_CHANNELS.GIT.PUSH, repoPath);
    await refreshStatus();
  };

  const pull = async () => {
    if (!repoPath) return;
    await IPCService.invoke(IPC_CHANNELS.GIT.PULL, repoPath);
    await refreshStatus();
  };

  return {
    repoState,
    loading,
    repoPath,
    refreshStatus,
    stageFile,
    unstageFile,
    commit,
    push,
    pull,
  };
}
