import Dexie, { Table as DexieTable } from "dexie";
import { Table, Entry, Setting } from "./schema";

export class OracleDb extends Dexie {
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
