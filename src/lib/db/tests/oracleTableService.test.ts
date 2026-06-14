import { describe, it, expect } from "vitest";
import { OracleTableService } from "../oracleTableService";

describe("TableService", () => {
  it("should create a table", async () => {
    const tableData = {
      title: "Test Table",
      game: "Test Game",
      type: "Test Type",
      tags: ["tag1", "tag2"],
      createdAt: Date.now(),
    };

    const id = await OracleTableService.createOracleTable(tableData);
    expect(id).toBeDefined();
    expect(typeof id).toBe("number");

    const table = await OracleTableService.getOracleTableById(id);
    expect(table).toEqual({ id, ...tableData });
  });

  it("should get all tables", async () => {
    await OracleTableService.createOracleTable({
      title: "Table 1",
      game: "Game 1",
      type: "Type 1",
      tags: [],
      createdAt: Date.now(),
    });
    await OracleTableService.createOracleTable({
      title: "Table 2",
      game: "Game 2",
      type: "Type 2",
      tags: [],
      createdAt: Date.now(),
    });

    const tables = await OracleTableService.getOracleTables();
    expect(tables).toHaveLength(2);
    expect(tables[0].title).toBe("Table 1");
    expect(tables[1].title).toBe("Table 2");
  });

  it("should update a table", async () => {
    const id = await OracleTableService.createOracleTable({
      title: "Original",
      game: "Game",
      type: "Type",
      tags: [],
      createdAt: Date.now(),
    });

    await OracleTableService.updateOracleTable(id, { title: "Updated" });
    const table = await OracleTableService.getOracleTableById(id);
    expect(table?.title).toBe("Updated");
  });

  it("should delete a table", async () => {
    const id = await OracleTableService.createOracleTable({
      title: "Delete Me",
      game: "Game",
      type: "Type",
      tags: [],
      createdAt: Date.now(),
    });

    await OracleTableService.deleteOracleTable(id);
    const table = await OracleTableService.getOracleTableById(id);
    expect(table).toBeUndefined();
  });

  it("should filter tables by game", async () => {
    await OracleTableService.createOracleTable({
      title: "Game A Table",
      game: "Game A",
      type: "Type",
      tags: [],
      createdAt: Date.now(),
    });
    await OracleTableService.createOracleTable({
      title: "Game B Table",
      game: "Game B",
      type: "Type",
      tags: [],
      createdAt: Date.now(),
    });

    const gameATables =
      await OracleTableService.getOracleTablesByGame("Game A");
    expect(gameATables).toHaveLength(1);
    expect(gameATables[0].title).toBe("Game A Table");
  });

  //TODO: should have test to filter tables by type

  it("should filter tables by tag", async () => {
    await OracleTableService.createOracleTable({
      title: "Tag A Table",
      game: "Game",
      type: "Type",
      tags: ["tag-a"],
      createdAt: Date.now(),
    });
    await OracleTableService.createOracleTable({
      title: "Tag B Table",
      game: "Game",
      type: "Type",
      tags: ["tag-b"],
      createdAt: Date.now(),
    });

    const tagATables = await OracleTableService.getOracleTablesByTag("tag-a");
    expect(tagATables).toHaveLength(1);
    expect(tagATables[0].title).toBe("Tag A Table");
  });
});
