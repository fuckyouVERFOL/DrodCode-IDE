import simpleGit, { SimpleGit } from 'simple-git';

export class GitRepository {
  private git: SimpleGit;

  constructor(repoPath: string) {
    this.git = simpleGit(repoPath);
  }

  public async checkIsRepo(): Promise<boolean> {
    try {
      return await this.git.checkIsRepo();
    } catch {
      return false;
    }
  }

  public async init(): Promise<void> {
    await this.git.init();
  }

  public get instance(): SimpleGit {
    return this.git;
  }
}
