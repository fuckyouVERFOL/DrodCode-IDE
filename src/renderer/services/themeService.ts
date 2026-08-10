import { ThemeSettings } from '../../shared/types/settings';

export class ThemeService {
  public static applyTheme(theme: ThemeSettings) {
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--theme-${key}`, value);
    });
  }
}
