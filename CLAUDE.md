# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Succotash is a farm management web app for tracking crop cycles and farming activities. This repo is the
frontend only (Create React App, React 16 + Redux). The companion backend (Rails API) lives in a separate
repo, `succotash-backend`, and must be running for the frontend to load real data — otherwise the app stalls
in a perpetual loading state.

## Commands

- `npm start` — runs the dev server over HTTPS (`HTTPS=true react-scripts start`) at https://localhost:3000
- `npm run build` — production build to `build/`
- `npm test` — runs `react-scripts test` (CRA/Jest watch mode). Note: there are currently no test files in
  `src/` (the only default CRA test was intentionally removed — see `src/versions.js` v1.0.11 changelog), so
  this command has nothing to run against right now.
- Node version: this project expects Node 18.15.0 (see README's NVM instructions: `nvm install 18.15.0`)

There is no configured lint script beyond CRA's built-in `eslintConfig: { extends: "react-app" }`, which runs
automatically as part of `npm start`/`npm run build`.

## Backend dependency

The frontend expects a backend API reachable at `process.env.REACT_APP_DOMAIN`:
- `.env.development` → `http://localhost:2020`
- `.env.production` → the deployed Heroku API

Clone/run `succotash-backend` on port 2020 locally, or most views will hang on load. On `App` mount
(`src/App.js`), the app fetches `/crops` (always) and, if a JWT is present in `localStorage`, also fetches
`/api/v1/profile` to hydrate the logged-in user's fields/todos/favorites.

## Architecture

**State management**: Single Redux store (`src/redux_files/reducer.js`) combining ~18 small reducers (user,
fields, bed, stage, sidebar, todos, crops, favorites, several stacked modal reducers, toast, login form,
etc.). All async work — API calls — goes through `redux-thunk` action creators in
`src/redux_files/actions.js`; there are no separate service/API modules, `fetch` calls live directly inside
thunks. Components connect via `react-redux`'s `connect()` (this predates hooks-based `useSelector`).

**Auth**: JWT is stored in `localStorage` under the key `user_29E6C4D` (an obfuscated key name, not a
meaningful constant elsewhere) and sent as `Authorization: Bearer <token>`. Logging out
(`unsetUser` action) clears that key plus an `autosave_CA9D01F` key used by the bed-editing autosave-confirmation
flow (`src/field_view/ConfirmSaveBox.js`, `src/components/SaveButton.js`).

**Routing** (`src/App.js`, `react-router-dom` v5): route-gating is done inline per-`<Route>` by checking
`this.props.user` and rendering a `<Redirect>` when the user is/isn't logged in, rather than a wrapped
`PrivateRoute` component. Key routes: `/`, `/login`, `/signup`, `/profile`, `/field/new`, `/field/:slug`,
`/guide` (how-to), `/developers`, `/reset-password` and `/reset-password/:slug`.

**View folders are organized by page/feature, not by type**:
- `field_view/` — the core crop-bed-grid interface (`Field.js`, `BedTile.js`, `SidebarForm.js`,
  `DateBar.js`, `EditFieldForm.js`, `NewCropForm.js`, `ConfirmSaveBox.js`) — this is the most complex view,
  modeling fields → beds → stages (a stage = a crop + status + date range occupying a bed).
- `profile_view/` — logged-in user's dashboard (fields list, favorites, todos)
- `about_view/` — the "how to use this app" guide page
- `home_view/`, `developer_view/` — marketing/landing and version-history pages (`src/versions.js` is the
  changelog data source rendered there; per the README, don't hand-edit it without checking with repo owners)
- `components/` — shared/cross-page components (header/footer, login form, date picker, todo UI, toasts)
- `helpers/dates.js` / `helpers/conversions.js` — date (de)construction/formatting and sorting utilities used
  heavily by both actions and reducers (e.g. `constructDate`, `deconstructDate`, `convertBedToCurrentStage`)

**Domain model** (as reflected in Redux state, not formally documented elsewhere): a `user` has many
`fields`; a `field` has many `beds` (grid cells); a `bed` has a history of `stages`, where a `stage` is the
current/past occupant of that bed — a crop with a status and start/due dates. `SET_BED` derives the
"current stage" for the selected calendar date via `convertBedToCurrentStage`, which is why date handling
(`helpers/dates.js`) is central to how the field view behaves.

**UI library**: Material-UI v4 (`@material-ui/core`/`icons`/`lab`/`pickers`), themed in `src/index.js`
(custom primary/secondary/warning palette). `react-socks` provides responsive breakpoint components used
throughout for mobile-specific rendering (see `about_view/MobileStep.js` vs `Step.js` for the pattern).
