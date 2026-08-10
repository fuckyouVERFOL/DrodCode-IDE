import { ipcMain } from 'electron';
import { IPC_CHANNELS } from '../channels';
import { GitOperations } from '../../git/operations';
import { GitRepository } from '../../git/repository';

export function registerGitHandlers(): void {
  ipcMain.handle(IPC_CHANNELS.GIT.INIT, async (_, repoPath: string) => {
    try {
      const repo = new GitRepository(repoPath);
      await repo.init();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle(IPC_CHANNELS.GIT.STATUS, async (_, repoPath: string) => {
    try {
      const state = await GitOperations.getStatus(repoPath);
      return { success: true, state };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle(IPC_CHANNELS.GIT.STAGE, async (_, repoPath: string, filePath: string) => {
    try {
      await GitOperations.stageFile(repoPath, filePath);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle(IPC_CHANNELS.GIT.UNSTAGE, async (_, repoPath: string, filePath: string) => {
    try {
      await GitOperations.unstageFile(repoPath, filePath);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle(IPC_CHANNELS.GIT.COMMIT, async (_, repoPath: string, message: string) => {
    try {
      await GitOperations.commit(repoPath, message);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle(IPC_CHANNELS.GIT.PUSH, async (_, repoPath: string) => {
    try {
      await GitOperations.push(repoPath);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle(IPC_CHANNELS.GIT.PULL, async (_, repoPath: string) => {
    try {
      await GitOperations.pull(repoPath);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle(IPC_CHANNELS.GIT.FETCH, async (_, repoPath: string) => {
    try {
      await GitOperations.fetch(repoPath);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle(IPC_CHANNELS.GIT.CHECKOUT, async (_, repoPath: string, branchName: string) => {
    try {
      await GitOperations.checkout(repoPath, branchName);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle(IPC_CHANNELS.GIT.CREATE_BRANCH, async (_, repoPath: string, branchName: string) => {
    try {
      await GitOperations.createBranch(repoPath, branchName);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle(IPC_CHANNELS.GIT.DIFF, async (_, repoPath: string, filePath: string, staged: boolean) => {
    try {
      const res = await GitOperations.getDiff(repoPath, filePath, staged);
      return { success: true, diff: res.diff };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });
}
