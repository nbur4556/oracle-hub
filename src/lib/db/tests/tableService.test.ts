import { describe, it, expect } from 'vitest';
import { TableService } from '../tableService';

describe('TableService', () => {
  it('should create a table', async () => {
    const tableData = {
      title: 'Test Table',
      game: 'Test Game',
      type: 'Test Type',
      tags: ['tag1', 'tag2'],
      createdAt: Date.now(),
    };

    const id = await TableService.createTable(tableData);
    expect(id).toBeDefined();
    expect(typeof id).toBe('number');

    const table = await TableService.getTableById(id);
    expect(table).toEqual({ id, ...tableData });
  });

  it('should get all tables', async () => {
    await TableService.createTable({
      title: 'Table 1',
      game: 'Game 1',
      type: 'Type 1',
      tags: [],
      createdAt: Date.now(),
    });
    await TableService.createTable({
      title: 'Table 2',
      game: 'Game 2',
      type: 'Type 2',
      tags: [],
      createdAt: Date.now(),
    });

    const tables = await TableService.getTables();
    expect(tables).toHaveLength(2);
  });

  it('should update a table', async () => {
    const id = await TableService.createTable({
      title: 'Original',
      game: 'Game',
      type: 'Type',
      tags: [],
      createdAt: Date.now(),
    });

    await TableService.updateTable(id, { title: 'Updated' });
    const table = await TableService.getTableById(id);
    expect(table?.title).toBe('Updated');
  });

  it('should delete a table', async () => {
    const id = await TableService.createTable({
      title: 'Delete Me',
      game: 'Game',
      type: 'Type',
      tags: [],
      createdAt: Date.now(),
    });

    await TableService.deleteTable(id);
    const table = await TableService.getTableById(id);
    expect(table).toBeUndefined();
  });

  it('should filter tables by game', async () => {
    await TableService.createTable({
      title: 'Game A Table',
      game: 'Game A',
      type: 'Type',
      tags: [],
      createdAt: Date.now(),
    });
    await TableService.createTable({
      title: 'Game B Table',
      game: 'Game B',
      type: 'Type',
      tags: [],
      createdAt: Date.now(),
    });

    const gameATables = await TableService.getTablesByGame('Game A');
    expect(gameATables).toHaveLength(1);
    expect(gameATables[0].title).toBe('Game A Table');
  });

  it('should filter tables by tag', async () => {
    await TableService.createTable({
      title: 'Tag A Table',
      game: 'Game',
      type: 'Type',
      tags: ['tag-a'],
      createdAt: Date.now(),
    });
    await TableService.createTable({
      title: 'Tag B Table',
      game: 'Game',
      type: 'Type',
      tags: ['tag-b'],
      createdAt: Date.now(),
    });

    const tagATables = await TableService.getTablesByTag('tag-a');
    expect(tagATables).toHaveLength(1);
    expect(tagATables[0].title).toBe('Tag A Table');
  });
});
