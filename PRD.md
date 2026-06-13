# Product Requirement Document: Oracle Hub

## 1. Overview
Oracle Hub is a local-first PWA designed for TTRPG players and GMs to consolidate and use "oracles" (random tables) from various sources. Instead of flipping through books, users can digitize their favorite tables and roll for results instantly, even offline.

## 2. Core Features

### 2.1 Table Management
- **Creation:** Users can create tables with a title, game system (e.g., "Cyberpunk RED", "D&D 5e"), type (e.g., "NPC Motivations", "Loot"), and custom tags.
- **Entries:** Tables consist of a list of entries. Each entry has:
    - A value (the result text).
    - A mandatory roll range (e.g., 1-10). The system must enforce a complete, non-overlapping range during table creation.
    - An optional "Pointer" to another table (Nested Roll).
- **Search & Filter:** Fast filtering by game, type, and tags to find the right table mid-game.

### 2.2 The Rolling Experience
- **Manual View:** Users can view the full table to roll their own physical dice.
- **Digital Roll:** A "Roll" button that generates a random result based on the table's logic.
- **Chained Rolls:** If a result points to another table, the app should prompt the user to roll on that second table immediately.

### 2.3 Offline-First Architecture
- **Local Storage:** All user-generated tables and settings must be stored locally in the browser using **Dexie.js (IndexedDB)**.
- **PWA:** Must be installable on mobile and desktop, with a Service Worker to ensure it boots without an internet connection.

### 2.4 Monetization Model
- **The Demo:** The app is free to use for a limited number of tables (default: 5 tables). This limit is configurable.
- **The Unlock:** A one-time unlock provides "Unlimited Tables."
- **Verification:** For the initial phase, this is an honor-system check for a valid auth token stored in local storage.

### 2.5 Data Portability
- **Import/Export:** Users can export their entire library of tables to a JSON file and import from a JSON file to prevent data loss when clearing browser cache.

## 3. Technical Specifications

### 3.1 Stack
- **Framework:** SvelteKit (recommended for speed and PWA compatibility).
- **Database:** Dexie.js (Wrapper for IndexedDB).
- **Styling:** Tailwind CSS.
- **PWA Plugin:** `vite-plugin-pwa`.
- **Payments:** Initial implementation relies on a simple auth token; Stripe integration deferred to later phases.

### 3.2 Data Schema (Dexie)
- `tables`: `id` (pk), `title`, `game`, `type`, `tags` (array), `createdAt`.
- `entries`: `id` (pk), `tableId` (fk), `value`, `rangeStart`, `rangeEnd`, `pointerTableId` (optional fk).
- `settings`: `key`, `value` (for storage of the unlock token).

## 4. User Flow
1. **Landing:** User opens PWA >> views dashboard of tables.
2. **Setup:** User adds a new table >> adds entries >> assigns tags.
3. **Gameplay:** User searches for "Combat Table" >> clicks "Roll" >> gets "Ambush!" >> app prompts "Roll on Ambush Table?" >> User rolls.
4. **Upsell:** User tries to create the 6th table >> prompt to purchase lifetime unlock.
