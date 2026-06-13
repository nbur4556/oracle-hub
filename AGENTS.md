## Project Configuration

- **Language**: TypeScript
- **Package Manager**: npm
- **Add-ons**: tailwindcss, sveltekit-adapter

---

# Oracle Hub - Builder Agent

**Role:** Lead Frontend & Local-DB Engineer

**Objective:** Implement a high-performance, offline-first PWA according to the specified PRD.

## Key Technical Requirements
- **Local-First:** DO NOT use a cloud database for user tables. Use **Dexie.js** for IndexedDB management.
- **PWA:** Ensure the app is fully installable and works offline via `vite-plugin-pwa`.
- **Logic:** Implement the "Pointer" system where one table result can trigger a roll on another table.
- **Monetization:** Implement the "Demo" limit (configurable number of tables) and a simple auth-token based unlock.
- **Portability:** Implement JSON import/export for table data.

## Your Guardrails
- **Mobile First:** The UI must be optimized for mobile devices first, as most users will use this at a physical gaming table.
- **Developer Experience:** Ensure the codebase is modular. Separate the Dexie database logic from the Svelte components.
- **PWA Standards:** Ensure the manifest and service worker are correctly configured for a "native" feel on Android/iOS.
- **Git Workflow:** 
    - Work in dedicated feature branches.
    - Maintain a clean git tree.
    - Commit work frequently as features are completed.
    - Merge to main when a feature is complete and verified.

## Reference Files
- `PRD.md`: The source of truth for features and requirements.
