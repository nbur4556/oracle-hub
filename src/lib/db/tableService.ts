import { db } from "./db";
import type { OracleTable, Entry, Setting } from "./schema";

export const TableService = {
  async createTable(table: Omit<OracleTable, "id">) {
    return await db.oracleTables.add(table);
  },

  async getTables() {
    return await db.oracleTables.toArray();
  },

  async getTableById(id: number) {
    return await db.oracleTables.get(id);
  },

  async updateTable(id: number, updates: Partial<OracleTable>) {
    return await db.oracleTables.update(id, updates);
  },

  async deleteTable(id: number) {
    return await db.oracleTables.delete(id);
  },

  async getTablesByGame(game: string) {
    return await db.oracleTables.where("game").equals(game).toArray();
  },

  async getTablesByTag(tag: string) {
    return await db.oracleTables.where("tags").equals(tag).toArray();
  },
};
