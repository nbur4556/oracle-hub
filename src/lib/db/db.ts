import Dexie from "dexie";

export class OracleDb extends Dexie {
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
