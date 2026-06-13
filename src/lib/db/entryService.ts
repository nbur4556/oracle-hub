import { db } from "./db";
import type { Entry } from "./schema";

export const EntryService = {
  async createEntry(entry: Omit<Entry, "id">) {
    return await db.entries.add(entry);
  },

  async getEntriesByTable(tableId: number) {
    return await db.entries.where("tableId").equals(tableId).toArray();
  },

  async updateEntry(id: number, updates: Partial<Entry>) {
    return await db.entries.update(id, updates);
  },

  async deleteEntry(id: number) {
    return await db.entries.delete(id);
  },

  async deleteEntriesByTable(tableId: number) {
    return await db.entries.where("tableId").equals(tableId).delete();
  },
};
