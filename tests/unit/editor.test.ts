import { getLanguageByExtension } from '../../src/shared/constants/languages';

describe('Editor Store & Language Detection', () => {
  it('should correctly detect TypeScript files', () => {
    const lang = getLanguageByExtension('.ts');
    expect(lang.monacoId).toBe('typescript');
  });

  it('should correctly detect Python files', () => {
    const lang = getLanguageByExtension('.py');
    expect(lang.monacoId).toBe('python');
  });

  it('should fallback to plaintext for unknown extensions', () => {
    const lang = getLanguageByExtension('.xyz123');
    expect(lang.monacoId).toBe('plaintext');
  });
});
