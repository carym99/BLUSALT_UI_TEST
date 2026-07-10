# UI Testing Playground - Cypress BDD Framework

Automated end-to-end tests for [UI Testing Playground](https://www.uitestingplayground.com/) using **Cypress**, **Cucumber (BDD)**, and the **Page Object Model** pattern.

## Covered Scenarios

| Feature | Page | Feature File | Description |
|---------|------|--------------|-------------|
| Client Side Delay | `/clientdelay` | `client-side-delay.feature` | Waits for client-side JS processing and clicks the resulting label |
| Dynamic Table | `/dynamictable` | `dynamic-table.feature` | Compares Chrome CPU value in the table with the yellow label |
| Sample App | `/sampleapp` | `sample-app.feature` | Logs in using stable selectors (avoids dynamic IDs) |
| Shadow DOM | `/shadowdom` | `shadow-dom.feature` | Generates a GUID, copies to clipboard, and verifies the value |
| Alerts | `/alerts` | `alerts.feature` | Handles alert, confirm, and prompt dialogs automatically |
| File Upload | `/upload` | `file-upload.feature` | Uploads files via drag-and-drop and browse input (inside iframe) |

## Project Structure

```
cypress/
├── e2e/
│   ├── features/           # Gherkin .feature files (BDD)
│   └── step_definitions/   # Step definitions mapping to page objects
├── fixtures/               # Test data files (e.g. sample-upload.txt)
├── pages/                  # Page Object Model classes
└── support/                # Custom commands and global config
cypress.config.js
package.json
```

---

## Prerequisites

Before running the tests, ensure the following are in place:

| Requirement | Details |
|-------------|---------|
| **Node.js** | Version **18 or higher** (tested with v22.x) |
| **npm** | Bundled with Node.js; used to install dependencies and run scripts |
| **Internet access** | Tests run against the live site `https://www.uitestingplayground.com` |
| **Disk space** | ~500 MB free for `node_modules` and the Cypress binary (downloaded on first run) |
| **Operating system** | Windows, macOS, or Linux (commands below use cross-platform `npm` scripts) |

No global Cypress installation is required. Cypress is installed locally as a project dev dependency.

---

## Step-by-Step: Execute All Tests

### 1. Clone or open the repository

```bash
cd path/to/BLUSALT_UI_TEST

```

### 2. Install dependencies

```bash
npm install
```


### 3. Run the full test suite (headless)


```bash
npx cypress run
```

Cypress will:

1. Launch Electron in headless mode
2. Discover all `.feature` files under `cypress/e2e/features/`
3. Compile Gherkin scenarios via `@badeball/cypress-cucumber-preprocessor`
4. Execute **10 scenarios** across **6 feature files**
5. Print a pass/fail summary in the terminal

**Expected outcome:** All 10 scenarios pass. Full suite runtime is approximately **1–2 minutes** (the Client Side Delay scenario alone takes ~18 seconds).

---

## Step-by-Step: Run Tests in Interactive Mode

### 1. Install dependencies (if not already done)

```bash
npm install
```

### 2. Open the Cypress Test Runner

```bash
npm run cy:open
```

### 3. Select **E2E Testing**

Choose **E2E Testing** when prompted in the Cypress launchpad.

### 4. Choose a browser

Select a supported browser (e.g. **Electron**, **Chrome**, or **Edge**).

### 5. Run a feature file

Click any `.feature` file in the spec list to run it. You can:

- Re-run individual scenarios
- Inspect commands, DOM snapshots, and screenshots on failure
- Time-travel through each step

---

## Step-by-Step: Run a Single Feature or Spec

Run one feature file:

```bash
npx cypress run --spec "cypress/e2e/features/sample-app.feature"
```

Run multiple specific features:

```bash
npx cypress run --spec "cypress/e2e/features/alerts.feature,cypress/e2e/features/shadow-dom.feature"
```

Run in a specific browser:

```bash
npx cypress run --browser chrome
```

---

## Available npm Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `npm test` | `cypress run` | Run all tests headless  |
| `npm run cy:run` | `cypress run` | Same as `npm test` |
| `npm run cy:open` | `cypress open` | Open interactive Cypress Test Runner |

---

## Configuration Reference

Key settings in `cypress.config.js`:

| Setting | Value | Purpose |
|---------|-------|---------|
| `baseUrl` | `https://www.uitestingplayground.com` | Target application under test |
| `specPattern` | `cypress/e2e/features/**/*.feature` | BDD feature file discovery |
| `defaultCommandTimeout` | `20000` ms | Max wait for commands (needed for Client Side Delay) |
| `pageLoadTimeout` | `60000` ms | Max wait for page navigation |
| `includeShadowDom` | `true` | Enables Shadow DOM piercing for GUID generator tests |

---

## Design Patterns

### Page Object Model (POM)

Each page under test has a dedicated class in `cypress/pages/` that encapsulates selectors and actions. Step definitions delegate to these page objects, keeping Gherkin scenarios readable and maintenance low.

### BDD (Behavior Driven Development)

Scenarios are written in Gherkin (`.feature` files) and implemented via step definitions in `cypress/e2e/step_definitions/`. This separates *what* is being tested from *how* it is automated.

---

## Notes

### Prerequisites and environment

- **First-time setup:** The initial `npm install` downloads the Cypress application binary. Allow extra time and ensure your network allows downloads from Cypress CDN.
- **Live external dependency:** All tests hit the public [UI Testing Playground](https://www.uitestingplayground.com) website. Tests will fail if the site is down, unreachable, or its behaviour/selectors change.
- **No local server required:** Unlike component tests, no application server needs to be started locally.

### Observations per scenario

- **Client Side Delay:** The playground intentionally waits **15 seconds** after clicking the trigger button before showing the result label. The test uses a 20-second command timeout. Expect this scenario to take ~18 seconds on its own.
- **Dynamic Table:** Table row and column order is randomized on each page load. The test locates the CPU column by header text and the Chrome row by name, rather than relying on fixed positions.
- **Sample App:** Username and password field `id` attributes are regenerated on every page load. The framework uses stable selectors (`placeholder`, `type`, `#login`, `#loginstatus`) instead of dynamic IDs.
- **Shadow DOM:** The GUID generator lives inside an open Shadow DOM on the `guid-generator` custom element. `includeShadowDom: true` is enabled globally, and clipboard read/write permissions are granted via Chrome DevTools Protocol before asserting clipboard content.
- **Alerts:** Confirm and Prompt buttons trigger a **secondary alert** after a 1-second `setTimeout`. Cypress `window:confirm`, `window:prompt`, and `window:alert` handlers are registered before each click to handle both dialogs without manual intervention.
- **File Upload:** The upload UI is a React component rendered inside an **iframe** (`/static/upload.html`). Tests use a custom `getIframeBody` command to interact with the drop zone (`.upload-box`) and hidden file input. Success is verified via `.success-file` ("1 file(s) selected") and `.file-item` (filename).

### Blockers and known limitations

- **Site availability:** Test execution is blocked if `https://www.uitestingplayground.com` is unavailable or returns errors.
- **Site changes:** Updates to the playground HTML, selectors, or timing behaviour may cause test failures until page objects are updated.
- **Client Side Delay runtime:** This scenario cannot be shortened; it reflects the site's designed 15-second client-side processing delay.
- **Clipboard API (Shadow DOM):** Clipboard read/write requires a secure origin (HTTPS) and explicit browser permissions. The test grants permissions programmatically; failures may occur in browsers or environments that restrict the Clipboard API or CDP permission grants.
- **Iframe cross-origin:** The upload iframe is same-origin (`/static/upload.html`), so content is accessible. If the iframe source were changed to a different domain, iframe interaction would be blocked by browser security policies.
- **Headless vs interactive:** All tests pass in headless Electron. If a scenario fails in a specific browser, re-run with `npx cypress open` to debug visually.
- **Screenshots on failure:** Failed tests save screenshots to `cypress/screenshots/`. Review these when diagnosing failures.

### Troubleshooting

| Issue | Suggested action |
|-------|------------------|
| `npm install` fails | Verify Node.js 18+ is installed (`node -v`) and retry with a stable network connection |
| Cypress binary not found | Run `npx cypress install` to re-download the binary |
| Timeout on Client Side Delay | Confirm the site is responsive; the 15-second wait is expected |
| File upload assertion fails | Ensure `cypress/fixtures/sample-upload.txt` exists and the iframe loads completely |
| Shadow DOM clipboard mismatch | Re-run in Electron or Chrome; verify clipboard permissions are not blocked by OS policies |
| All tests fail immediately | Check internet connectivity and that `https://www.uitestingplayground.com` loads in a browser |
