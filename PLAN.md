# Implementation Plan: Oracle Hub

## Phase 1: Infrastructure & Groundwork ✅
- [x] Initialize Git repository.
- [x] Scaffold SvelteKit project.
- [x] Setup Tailwind CSS.
- [x] Configure `vite-plugin-pwa` for offline capabilities.
- [x] Install Dexie.js.

## Phase 2: Data Layer ✅
- [x] Define Dexie database schema (`tables`, `entries`, `settings`).
- [x] Create a singleton `db.ts` service for database access.
- [x] Implement basic table CRUD operations.

## Phase 3: Table Management UI ✅
- [x] Build a "Table List" dashboard.
- [x] Create "Add Table" and "Edit Table" forms.
- [x] Implement the mandatory roll range validation (ensuring no gaps/overlaps).
- [x] Add tags and game system categorization.

## Phase 4: The Rolling Engine
- [ ] Implement the random roll logic based on range.
- [ ] Develop the "Manual View" vs "Digital Roll" toggle.
- [ ] Implement "Chained Rolls" (Pointer system) where one result triggers another roll.

## Phase 5: Limits & Portability
- [ ] Implement the "Demo Limit" logic (configurable limit on total tables).
- [ ] Create the "Unlock" check based on an auth token.
- [ ] Develop JSON Export/Import functionality for local backups.

## Phase 6: PWA Polish & Mobile UX
- [ ] Finalize PWA manifest (icons, theme colors).
- [ ] Audit mobile responsiveness (ensure it's usable at a table).
- [ ] Add a simple splash screen/loading state.

## Future Tasks
- [ ] Payment method (Stripe? External Shop?) for purchasing full version of Oracle Hub
- [ ] Dark Mode
