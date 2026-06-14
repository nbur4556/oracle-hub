import { describe, it, expect } from 'vitest';
import { SettingService } from '../settingService';

describe('SettingService', () => {
  it('should set and get a setting', async () => {
    await SettingService.setSetting('theme', 'dark');
    const value = await SettingService.getSetting('theme');
    expect(value).toBe('dark');
  });

  it('should return null for non-existent setting', async () => {
    const value = await SettingService.getSetting('non-existent');
    expect(value).toBeNull();
  });

  it('should remove a setting', async () => {
    await SettingService.setSetting('volume', 0.5);
    await SettingService.removeSetting('volume');
    const value = await SettingService.getSetting('volume');
    expect(value).toBeNull();
  });
});
