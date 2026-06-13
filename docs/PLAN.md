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

## Phase 3: Table Management UI
- [ ] Build a "Table List" dashboard.
- [ ] Create "Add Table" and "Edit Table" forms.
- [ ] Implement the mandatory roll range validation (ensuring no gaps/overlaps).
- [ ] Add tags and game system categorization.

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

## Upcoming Tasks
- [ ] Payment method (Stripe? External Shop?) for purchasing full version of Oracle Hub
- [ ] Dark Mode and/or theming
- [ ] Update the readme
- [ ] Customize the UI
- [ ] Wrap the PWA for app stores
    - [ ] Get app onto Google Play
    - [ ] Get app onto Apple App Store
- [ ] Tables should be able to evenly devide entry ranges automatically, with ability for the users to edit afterwards
- [ ] Edit table route from the tables page
    - [ ] Delete entries from this view
    - [ ] Change values from this view
    - [ ] Change ranges from this view
- [ ] Game system should not be required
    - [ ] Also when creating a new table
- [ ] Game systems route lists all the game systems that a table has been assigned to. Able to browse and select game systems to view all associated tables
    - [ ] Could be cool to allow adding the games cover art to the game system
- [ ] Component testing
- [ ] Visual Regression testing
- [ ] Sort functionality on dashboard
- [ ] Full unit (or component?) tests
    - [ ] unit (or component?) tests for feat/table-management functionality
    - [ ] unit (or component?) tests for feat/implement-new-tables functionality
- [ ] Clear messaging AT STARTUP and THROUGHOUT APP USAGE that the users data is not permanent. Recommend that that user regularly export their data.
    - [ ] Maybe have a file (on phone or at computer) that the app exports to by default. On import, it can also check this directory first and request importing those files.
