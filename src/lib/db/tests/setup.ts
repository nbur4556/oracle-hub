import 'fake-indexeddb/auto';
import { db } from '../db';

export async function clearDb() {
  await db.oracleTables.clear();
  await db.entries.clear();
  await db.settings.clear();
}

beforeEach(async () => {
  await clearDb();
});
