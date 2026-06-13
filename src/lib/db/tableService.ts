import { db } from "./db";
import type { Table, Entry, Setting } from "./schema";

export const TableService = {
  async createTable(table: Omit<Table, "id">) {
    //FIX: feat/data-layer: db.tables.add property does not exist on db.tables
    return await db.tables.add(table);
  },

  async getTables() {
    //FIX: feat/data-layer: db.tables.toArray property does not exist on db.tables
    return await db.tables.toArray();
  },

  async getTableById(id: number) {
    //FIX: feat/data-layer: db.tables.get property does not exist on db.tables
    return await db.tables.get(id);
  },

  async updateTable(id: number, updates: Partial<Table>) {
    //FIX: feat/data-layer: db.tables.update property does not exist on db.tables
    return await db.tables.update(id, updates);
  },

  async deleteTable(id: number) {
    //FIX: feat/data-layer: db.tables.delete property does not exist on db.tables
    return await db.tables.delete(id);
  },

  async getTablesByGame(game: string) {
    //FIX: feat/data-layer: db.tables.where property does not exist on db.tables
    return await db.tables.where("game").equals(game).toArray();
  },

  async getTablesByTag(tag: string) {
    //FIX: feat/data-layer: db.tables.where property does not exist on db.tables
    return await db.tables.where("tags").equals(tag).toArray();
  },
};
