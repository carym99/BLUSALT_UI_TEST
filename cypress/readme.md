# BLUSALT UI Test

Automated tests for the [UI Testing Playground](https://www.uitestingplayground.com/), built with **Cypress**, **Cucumber**, and the **Page Object Model**.

Clone the repo, run `npm install`, then `npm test`. That's the short version — details below if you need them.

---

## What gets tested

| Area | Page | Scenarios |
|------|------|-----------|
| Client Side Delay | `/clientdelay` | Trigger the button, wait for the label, click it |
| Dynamic Table | `/dynamictable` | Match Chrome's CPU in the table to the yellow label |
| Sample App | `/sampleapp` | Login with good and bad credentials |
| Shadow DOM | `/shadowdom` | Generate a GUID, copy it, check it matches the input |
| Alerts | `/alerts` | Handle alert, confirm, and prompt dialogs |
| File Upload | `/upload` | Upload via drag-and-drop and browse |

10 scenarios across 6 feature files.

---

## Project layout

```
cypress/
├── e2e/
│   ├── features/           # Gherkin scenarios
│   └── step_definitions/   # Glue between features and page objects
├── fixtures/               # sample-upload.txt
├── pages/                  # Page objects (selectors + actions)
└── support/                # Custom commands
cypress.config.js
package.json
```

Page objects live in `cypress/pages/`. Feature files describe behaviour in plain English; step definitions call the page objects to do the work.

---

## Getting started

**You'll need:**

- Node.js 18+ (tested on v22)
- npm
- Internet access — tests hit the live playground site
- ~500 MB free disk space for dependencies and the Cypress browser

No global Cypress install. No local server to start.

**Run everything:**

```bash
cd BLUSALT_UI_TEST
npm install
npm test
```

First `npm install` downloads the Cypress browser — can take a few minutes.

All 10 scenarios should pass in about 1–2 minutes. Client Side Delay alone takes ~18 seconds because the site makes you wait 15 seconds on purpose.

**Run interactively** (watch tests step by step):

```bash
npm run cy:open
```

Choose E2E Testing, pick a browser, click a `.feature` file.

**Run one feature:**

```bash
npx cypress run --spec "cypress/e2e/features/sample-app.feature"
```

**npm scripts:**

| Command | Does |
|---------|------|
| `npm test` | Run all tests headless |
| `npm run cy:run` | Same as above |
| `npm run cy:open` | Open Cypress UI |

---

## Config (`cypress.config.js`)

| Setting | Value | Why |
|---------|-------|-----|
| `baseUrl` | `https://www.uitestingplayground.com` | Site under test |
| `defaultCommandTimeout` | 20s | Client Side Delay needs the extra wait |
| `pageLoadTimeout` | 60s | Slow page loads |
| `includeShadowDom` | `true` | GUID generator lives in Shadow DOM |

---

## Notes

### Before you run

- Tests need [uitestingplayground.com](https://www.uitestingplayground.com) to be up. If the site's down, tests fail — not a framework bug.
- First install pulls the Cypress binary from their CDN. Slow network = slow install.

### Per scenario

- **Client Side Delay** — 15-second wait is built into the site. Don't shorten the timeout.
- **Dynamic Table** — Row/column order shuffles on reload. Tests find CPU by header text and Chrome by name.
- **Sample App** — Username/password IDs change every load. Tests use placeholders and `#login` instead.
- **Shadow DOM** — Clipboard permissions are granted in code before reading `navigator.clipboard`.
- **Alerts** — Confirm and Prompt fire a second dialog after 1 second. Handlers are set up before each click.
- **File Upload** — Upload UI is inside an iframe. Tests use `getIframeBody` to reach the drop zone and file input.

### Blockers & limitations

- Site offline or changed → tests break until page objects are updated.
- Client Side Delay can't run faster than the site allows.
- Clipboard test needs HTTPS; some OS/browser settings may still block it.
- Upload iframe is same-origin today. A cross-origin change would break those tests.
- Screenshots on failure land in `cypress/screenshots/`.

### Something broke?

| Problem | Fix |
|---------|-----|
| `npm install` fails | Check `node -v` is 18+ and retry on a stable connection |
| Cypress binary missing | `npx cypress install` |
| Client Side Delay timeout | Open the site in a browser — 15s wait is normal |
| Upload fails | Check `cypress/fixtures/sample-upload.txt` exists |
| Clipboard mismatch | Try Electron or Chrome; check OS clipboard settings |
| Everything fails | Confirm the playground loads in your browser |
