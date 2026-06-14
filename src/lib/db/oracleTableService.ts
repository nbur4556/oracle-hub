import { db } from "./db";
import type { OracleTable, Entry } from "./schema";

export const OracleTableService = {
  //FIX: This is returning Promise<any>, should return the type expected for id
  async createOracleTable(table: Omit<OracleTable, "id">) {
    return await db.oracleTables.add(table);
  },

  async getOracleTables() {
    return await db.oracleTables.toArray();
  },

  async getOracleTableById(id: number) {
    return await db.oracleTables.get(id);
  },

  async updateOracleTable(id: number, updates: Partial<OracleTable>) {
    return await db.oracleTables.update(id, updates);
  },

  async deleteOracleTable(id: number) {
    return await db.oracleTables.delete(id);
  },

  async getOracleTablesByGame(game: string) {
    return await db.oracleTables.where("game").equals(game).toArray();
  },

  async getOracleTablesByTag(tag: string) {
    return await db.oracleTables.where("tags").equals(tag).toArray();
  },
};
