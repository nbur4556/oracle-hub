# Product Requirement Document: Oracle Hub

## 1. Overview
Oracle Hub is a local-first PWA designed for TTRPG players and GMs to consolidate and use "oracles" (random tables) from various sources. Instead of flipping through books, users can digitize their favorite tables and roll for results instantly, even offline.

## 2. Core Features

### 2.1 Table Management
- **Creation:** Users can create tables with a title, game system (e.g., "Cyberpunk RED", "D&D 5e"), type (e.g., "NPC Motivations", "Loot"), and custom tags.
- **Entries:** Tables consist of a list of entries. Each entry has:
    - A value (the result text).
    - An optional roll range (e.g., 1-10).
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
- **The Demo:** The app is free to use for a limited number of tables (e.g., 5 tables).
- **The Unlock:** A one-time payment unlocks "Unlimited Tables."
- **Verification:** Unlock status is handled via a license key or signed token stored in local storage, validated via a payment provider (Stripe).

## 3. Technical Specifications

### 3.1 Stack
- **Framework:** SvelteKit (recommended for speed and PWA compatibility).
- **Database:** Dexie.js (Wrapper for IndexedDB).
- **Styling:** Tailwind CSS.
- **PWA Plugin:** `vite-plugin-pwa`.
- **Payments:** Stripe (for the one-time unlock).

### 3.2 Data Schema (Dexie)
- `tables`: `id` (pk), `title`, `game`, `type`, `tags` (array), `createdAt`.
- `entries`: `id` (pk), `tableId` (fk), `value`, `rangeStart`, `rangeEnd`, `pointerTableId` (optional fk).
- `settings`: `key`, `value` (for storage of the unlock token).

## 4. User Flow
1. **Landing:** User opens PWA $\rightarrow$ views dashboard of tables.
2. **Setup:** User adds a new table $\rightarrow$ adds entries $\rightarrow$ assigns tags.
3. **Gameplay:** User searches for "Combat Table" $\rightarrow$ clicks "Roll" $\rightarrow$ gets "Ambush!" $\rightarrow$ app prompts "Roll on Ambush Table?" $\rightarrow$ User rolls.
4. **Upsell:** User tries to create the 6th table $\rightarrow$ prompt to purchase lifetime unlock.
