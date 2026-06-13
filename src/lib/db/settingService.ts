import { db } from './db';
import type { Setting } from './schema';

export const SettingService = {
    async getSetting(key: string): Promise<any> {
        const setting = await db.settings.get(key);
        return setting ? setting.value : null;
    },

    async setSetting(key: string, value: any): Promise<void> {
        await db.settings.put({ key, value });
    },

    async removeSetting(key: string): Promise<void> {
        await db.settings.delete(key);
    }
};
