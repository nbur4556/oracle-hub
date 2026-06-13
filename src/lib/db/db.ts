import Dexie from "dexie";
import type { Table as DexieTable } from "dexie";
import type { Table, Entry, Setting } from "./schema";

export class OracleDb extends Dexie {
  //FIX: feat/data-layer: property tables in OracleDb is not defined? Why?
  tables!: DexieTable<Table>;
  entries!: DexieTable<Entry>;
  settings!: DexieTable<Setting>;

  constructor() {
    super("OracleHubDB");
    this.version(1).stores({
      tables: "++id, title, game, type, *tags",
      entries: "++id, tableId, value, rangeStart, rangeEnd, pointerTableId",
      settings: "key, value",
    });
  }
}

export const db = new OracleDb();
