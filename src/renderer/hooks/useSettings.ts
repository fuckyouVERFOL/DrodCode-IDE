import { useSettingsStore } from '../store/settingsStore';

export function useSettings() {
  const { settings, activeView, updateSettings, setActiveView } = useSettingsStore();

  return {
    settings,
    activeView,
    updateSettings,
    setActiveView,
  };
}
