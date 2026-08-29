---
name: desktop-overlay-widget
description: Build a small always-on-top, frameless, transparent desktop widget (an Electron mini-app that floats in a screen corner, showing live/animated info — a status tracker, clock, countdown, monitor, ticker, reminder banner, etc.) that stays visible over every other window. Use this skill whenever the user asks for something to "sobreponerse en la pantalla", "flotar siempre encima", "quedar fijo/pegado en una esquina", a "widget", "overlay", "banner flotante", "always-on-top window", a live tracker/clock/countdown they want visible while they work, or anything similar — even if they don't say "Electron" or "desktop app" explicitly. Do NOT use this for a page meant to be opened in a browser tab or shared as a link (that's a normal HTML artifact) — this skill is specifically for a native window that floats above other applications on the user's own machine.
---

# Desktop overlay widget

A reusable Electron boilerplate for small floating widgets: frameless,
transparent background, always-on-top, pinned to a screen corner, with a
system-tray icon so the user can show/hide/quit it. Only `index.html`
changes between widgets — `main.js`, `preload.js`, and `package.json` are a
fixed pattern that already handles the fiddly Electron/Linux parts.

Ship this pattern instead of rebuilding it from scratch: the windowing
flags, the tray icon generation, and the drag-region CSS are all easy to
get subtly wrong (see Pitfalls below), and getting them wrong produces a
widget that *looks* like it works but loses focus, disappears behind other
windows, or can't be recovered once hidden.

## 1. Interview

Before writing anything, get four things from the user (infer sensible
defaults for the rest — don't interrogate them over trivia):

1. **What should it show/track**, and does the underlying value change (a
   live clock, a countdown, a poll of some local state) or is it closer to
   a static reminder? This determines whether `index.html` needs a
   `setInterval` render loop.
2. **Which corner** of the screen (default: top-right).
3. **Does it need an expand/collapse toggle** (a compact view plus a "see
   more" panel), or is one fixed size enough?
4. **Where does this widget need to end up running?** This changes the
   delivery method — see §4. If unsure, ask directly: "¿estás corriendo
   Claude Code en tu propia compu, o esto es una sesión remota/en la nube
   y tenés que pegar comandos en tu propia terminal?"

## 2. Copy the template

The boilerplate lives in `assets/template/` next to this file:
`package.json`, `main.js`, `preload.js`. Copy all three into a fresh
project directory, then edit the constants at the top of `main.js`:

```js
const WIDTH = 300;
const HEIGHT_COMPACT = 176;
const HEIGHT_EXPANDED = 470;   // only matters if there's an expand toggle
const MARGIN = 16;
const CORNER = 'top-right';    // 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
const TRAY_COLOR = { r: 255, g: 46, b: 166 };
const TRAY_TOOLTIP = 'WIDGET-TITLE';
```

Also replace `WIDGET-SLUG` / `WIDGET-DESCRIPTION` in `package.json`. If the
widget has no expand/collapse toggle, you can leave the `resize` IPC
handler in `main.js` unused — it's harmless — rather than stripping it out;
just set `HEIGHT_EXPANDED = HEIGHT_COMPACT` so the unused constant can't
drift out of sync with the window's actual (single) size.

**Give every widget a distinct `package.json` `"name"`.** The template's
single-instance lock (`app.requestSingleInstanceLock()`) identifies "is
another copy of this app already running?" by the app name, which Electron
derives from that field — not from the folder path. Two widgets sharing a
name (e.g. both left as a copy-pasted `"name": "my-widget"`) look like the
same app to Electron: whichever one starts second detects the first as an
existing instance and silently exits without opening a window or printing
an error, which is confusing to debug because nothing looks broken. This
happened once already, and cost a long debugging detour that a five-second
uniqueness check would have skipped — always check every widget the user
already has running has a different name before troubleshooting anything
else about a widget that "won't open."

## 3. Write `index.html`

This is the only file you write from scratch each time. It's a normal
transparent-background HTML/CSS/JS page loaded via `win.loadFile()`, with
two Electron-specific conventions:

- **Dragging**: put `-webkit-app-region: drag` on a header bar so the user
  can reposition the widget, and `-webkit-app-region: no-drag` on any
  buttons inside that header (otherwise clicks on them just drag the
  window instead of firing).
- **Resize/hide/quit**: call `window.overlayAPI.resize(expandedBool)`,
  `window.overlayAPI.hide()`, `window.overlayAPI.quit()` — these are
  exposed by `preload.js` and go through `ipcMain.handle` in `main.js`.

Keep `html, body { background: transparent; }` and build the actual
visible surface as a padded, rounded `<div class="card">` inside — the
window itself is transparent, so anything outside that card is invisible
(that's what makes the widget look borderless/floating instead of a
rectangle).

For a live-updating widget, use one `render()` function called immediately
and then on a `setInterval`, rather than scattering separate timers —
it keeps the "what does the UI show right now" logic in one place, which
matters a lot once there's more than one derived value (e.g. a badge, a
countdown, and a highlighted cell that all depend on the same instant).

### Fixed-timezone clocks — a specific trap

If the widget shows time for a timezone that is *not* the viewer's system
timezone (e.g. "always show Paraguay time" regardless of where this runs),
compute it as pure epoch arithmetic and read it back with UTC getters:

```js
function getFixedZoneNow(now, offsetHours) {
  return new Date(now.getTime() - offsetHours * 3600000);
}
// then use .getUTCHours(), .getUTCMinutes(), .getUTCDay(), etc. on the result
```

Do **not** mix in `now.getTimezoneOffset()`. That returns the *viewer's own
machine's* offset from UTC — it has nothing to do with the timezone you're
targeting. Adding it in feels like it should "normalize for the viewer's
timezone" but it actually cancels or compounds your intended offset
depending on what the viewer's system clock happens to be set to, which is
exactly the kind of bug that only shows up on someone else's machine and
not in your own testing. This exact mistake shipped once already (a
DeepSeek-API peak-pricing tracker showed UTC time instead of Paraguay
time) — `now.getTime()` is already timezone-agnostic epoch milliseconds,
so just subtract the fixed offset and stop there.

## 4. Delivery: figure out where the files need to land

**If you have direct filesystem + terminal access to the machine that will
run the widget** (a local session, or a remote session where you can `npm
install && npm start` yourself and the result is what the user sees):
just write the files normally and run it. Nothing below applies.

**If this is a remote/cloud session and the widget needs to run on the
user's own separate machine** (they're pasting commands you give them into
their own terminal — this is the common case for Claude Code on the web),
none of your file-write tools reach their disk. You have to hand them
exact terminal commands. Two things reliably go wrong here — both were
hit, live, building the reference widget for this skill:

- **Sending files as downloadable attachments and asking the user to `mv`
  them into place is fragile.** If a same-named file (commonly
  `index.html`) already exists in their Downloads folder from an unrelated
  project, the browser silently saves the new one under an auto-suffixed
  name, and a naive `mv old-name new-location` moves the *wrong,
  pre-existing* file into the new project. The widget then runs but shows
  stale/unrelated content, and it's not obvious why. **Prefer generating
  the files directly in their terminal instead** (below) — it sidesteps
  the whole class of problem.
- **Plain heredocs corrupt non-ASCII content on some terminals.**
  `cat > file <<'EOF' ... EOF` is reliable for pure-ASCII files
  (`package.json`, `main.js`, `preload.js` — none of these need anything
  outside ASCII). But `index.html` usually has UTF-8 multi-byte characters
  (emoji, accented Spanish text, glyphs like ▾▴×) and pasting a heredoc
  containing those through some terminal setups drops or mangles bytes —
  the file "works" but the byte count is off and something inside it is
  subtly broken. Use base64 for any file with non-ASCII content:

  ```bash
  base64 -w 0 index.html   # run this yourself, then hand the output to the user
  ```

  Give the user this to paste:

  ```bash
  base64 -d > index.html <<'EOF'
  <the base64 blob>
  EOF
  ```

  Always tell them the expected `wc -c index.html` byte count too, so they
  can confirm the paste landed intact before running anything.

Either way, once the files are in place: `npm install && npm start`.

## 5. The Linux sandbox crash

On many Linux setups `npm start` (`electron .`) fails immediately with:

```
FATAL:setuid_sandbox_host.cc(...) The SUID sandbox helper binary was found,
but is not configured correctly.
```

Give the user both fixes, preferred first:

```bash
# Preferred — fixes permissions, keeps Chromium's sandbox active
sudo chown root:root node_modules/electron/dist/chrome-sandbox
sudo chmod 4755 node_modules/electron/dist/chrome-sandbox
npm start
```

```bash
# Fallback — skips the fix above by disabling the sandbox outright.
# Acceptable here because the window only ever loads its own local
# index.html, never remote/untrusted content.
npx electron . --no-sandbox
```

## 6. Sanity-check before handing it over

Once it's running, make sure: the window actually stays on top when you
click into another application; hiding it (if the widget has a hide
button) doesn't strand the user — the tray icon should bring it back;
and if it shows live data, watch one full update tick to confirm the
numbers/status actually change rather than being frozen at first render.
