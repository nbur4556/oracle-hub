import Dexie from "dexie";
import type { Table as DexieTable } from "dexie";
import { OracleTable, Entry, Setting } from "./schema";

export class OracleDb extends Dexie {
  oracleTables!: DexieTable<OracleTable>;
  entries!: DexieTable<Entry>;
  settings!: DexieTable<Setting>;

  constructor() {
    super("OracleHubDB");
    this.version(1).stores({
      oracleTables: "++id, title, game, type, *tags",
      entries: "++id, tableId, value, rangeStart, rangeEnd, pointerTableId",
      settings: "key, value",
    });
  }
}

export const db = new OracleDb();
