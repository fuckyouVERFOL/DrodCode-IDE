import { SimpleGit } from 'simple-git';

export interface DiffResult {
  filePath: string;
  diff: string;
}

export async function getFileDiff(git: SimpleGit, filePath: string, staged: boolean = false): Promise<DiffResult> {
  try {
    const args = staged ? ['--staged', filePath] : [filePath];
    const diff = await git.diff(args);
    return { filePath, diff };
  } catch (err: any) {
    return { filePath, diff: '' };
  }
}
