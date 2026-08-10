import simpleGit, { SimpleGit } from 'simple-git';
import { GitFileStatus, GitBranch, GitCommit, GitRepositoryState } from '../../shared/types/git';
import { getFileDiff } from './diff';

export class GitOperations {
  public static async getStatus(repoPath: string): Promise<GitRepositoryState> {
    const git: SimpleGit = simpleGit(repoPath);
    const isRepo = await git.checkIsRepo();
    if (!isRepo) {
      return {
        isRepo: false,
        currentBranch: '',
        branches: [],
        stagedFiles: [],
        unstagedFiles: [],
        commits: [],
        behind: 0,
        ahead: 0,
      };
    }

    const status = await git.status();
    const branchSummary = await git.branch();

    const stagedFiles: GitFileStatus[] = status.staged.map((file) => ({
      path: file,
      status: 'staged',
      staged: true,
    }));

    const unstagedFiles: GitFileStatus[] = [
      ...status.modified.filter((f) => !status.staged.includes(f)).map((f) => ({ path: f, status: 'modified' as const, staged: false })),
      ...status.not_added.map((f) => ({ path: f, status: 'untracked' as const, staged: false })),
      ...status.deleted.map((f) => ({ path: f, status: 'deleted' as const, staged: false })),
    ];

    const branches: GitBranch[] = Object.values(branchSummary.branches).map((b) => ({
      name: b.name,
      current: b.current,
      commitHash: b.commit,
      remote: b.label,
    }));

    let commits: GitCommit[] = [];
    try {
      const log = await git.log({ maxCount: 30 });
      commits = log.all.map((c) => ({
        hash: c.hash,
        shortHash: c.hash.substring(0, 7),
        author: c.author_name,
        email: c.author_email,
        date: c.date,
        message: c.message,
        parents: (c as any).parents || [],
      }));
    } catch {
      // empty repo commit log
    }

    return {
      isRepo: true,
      currentBranch: status.current || 'main',
      branches,
      stagedFiles,
      unstagedFiles,
      commits,
      behind: status.behind,
      ahead: status.ahead,
    };
  }

  public static async stageFile(repoPath: string, filePath: string): Promise<void> {
    const git = simpleGit(repoPath);
    await git.add(filePath);
  }

  public static async unstageFile(repoPath: string, filePath: string): Promise<void> {
    const git = simpleGit(repoPath);
    await git.reset(['HEAD', filePath]);
  }

  public static async commit(repoPath: string, message: string): Promise<void> {
    const git = simpleGit(repoPath);
    await git.commit(message);
  }

  public static async push(repoPath: string): Promise<void> {
    const git = simpleGit(repoPath);
    await git.push();
  }

  public static async pull(repoPath: string): Promise<void> {
    const git = simpleGit(repoPath);
    await git.pull();
  }

  public static async fetch(repoPath: string): Promise<void> {
    const git = simpleGit(repoPath);
    await git.fetch();
  }

  public static async checkout(repoPath: string, branchName: string): Promise<void> {
    const git = simpleGit(repoPath);
    await git.checkout(branchName);
  }

  public static async createBranch(repoPath: string, branchName: string): Promise<void> {
    const git = simpleGit(repoPath);
    await git.checkoutLocalBranch(branchName);
  }

  public static async getDiff(repoPath: string, filePath: string, staged: boolean) {
    const git = simpleGit(repoPath);
    return await getFileDiff(git, filePath, staged);
  }
}
