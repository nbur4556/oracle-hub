import { describe, it, expect } from "vitest";
import { EntryService } from "../entryService";
import { OracleTableService } from "../oracleTableService";

describe("EntryService", () => {
  it("should create an entry", async () => {
    const tableId = await OracleTableService.createOracleTable({
      title: "Test Table",
      game: "Game",
      type: "Type",
      tags: [],
      createdAt: Date.now(),
    });

    const entryData = {
      tableId,
      value: "Test Result",
      rangeStart: 1,
      rangeEnd: 10,
    };

    const id = await EntryService.createEntry(entryData);
    expect(id).toBeDefined();
    expect(typeof id).toBe("number");
  });

  it("should get entries for a table", async () => {
    const tableId = await OracleTableService.createOracleTable({
      title: "Test Table",
      game: "Game",
      type: "Type",
      tags: [],
      createdAt: Date.now(),
    });

    await EntryService.createEntry({
      tableId,
      value: "R1",
      rangeStart: 1,
      rangeEnd: 5,
    });
    await EntryService.createEntry({
      tableId,
      value: "R2",
      rangeStart: 6,
      rangeEnd: 10,
    });

    const entries = await EntryService.getEntriesByTable(tableId);
    expect(entries).toHaveLength(2);
  });

  it("should update an entry", async () => {
    const tableId = await OracleTableService.createOracleTable({
      title: "Test Table",
      game: "Game",
      type: "Type",
      tags: [],
      createdAt: Date.now(),
    });

    const id = await EntryService.createEntry({
      tableId,
      value: "Old",
      rangeStart: 1,
      rangeEnd: 5,
    });
    await EntryService.updateEntry(id, { value: "New" });

    const entries = await EntryService.getEntriesByTable(tableId);
    expect(entries.find((e) => e.id === id)?.value).toBe("New");
  });

  it("should delete an entry", async () => {
    const tableId = await OracleTableService.createOracleTable({
      title: "Test Table",
      game: "Game",
      type: "Type",
      tags: [],
      createdAt: Date.now(),
    });

    const id = await EntryService.createEntry({
      tableId,
      value: "Delete",
      rangeStart: 1,
      rangeEnd: 5,
    });
    await EntryService.deleteEntry(id);

    const entries = await EntryService.getEntriesByTable(tableId);
    expect(entries.find((e) => e.id === id)).toBeUndefined();
  });

  it("should delete all entries for a table", async () => {
    const tableId = await OracleTableService.createOracleTable({
      title: "Test Table",
      game: "Game",
      type: "Type",
      tags: [],
      createdAt: Date.now(),
    });

    await EntryService.createEntry({
      tableId,
      value: "R1",
      rangeStart: 1,
      rangeEnd: 5,
    });
    await EntryService.createEntry({
      tableId,
      value: "R2",
      rangeStart: 6,
      rangeEnd: 10,
    });

    await EntryService.deleteEntriesByTable(tableId);
    const entries = await EntryService.getEntriesByTable(tableId);
    expect(entries).toHaveLength(0);
  });
});
