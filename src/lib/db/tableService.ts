import { db } from "./db";
import type { Table, Entry, Setting } from "./schema";

export const TableService = {
  async createTable(table: Omit<Table, "id">) {
    return await db.tables.add(table);
  },

  async getTables() {
    return await db.tables.toArray();
  },

  async getTableById(id: number) {
    return await db.tables.get(id);
  },

  async updateTable(id: number, updates: Partial<Table>) {
    return await db.tables.update(id, updates);
  },

  async deleteTable(id: number) {
    return await db.tables.delete(id);
  },

  async getTablesByGame(game: string) {
    return await db.tables.where("game").equals(game).toArray();
  },

  async getTablesByTag(tag: string) {
    return await db.tables.where("tags").equals(tag).toArray();
  },
};
