import { normalizePath } from '../../src/shared/utils/path';

describe('Git & Path Utilities', () => {
  it('should normalize Windows backslashes to forward slashes', () => {
    const result = normalizePath('C:\\Users\\DrodCode\\project\\file.ts');
    expect(result).toBe('C:/Users/DrodCode/project/file.ts');
  });
});
