const { app, BrowserWindow, Tray, Menu, ipcMain, nativeImage, screen } = require('electron');
const path = require('path');

// ---- customize these per widget ----
const WIDTH = 300;
const HEIGHT_COMPACT = 176;   // collapsed/default height
const HEIGHT_EXPANDED = 470;  // used only if the widget has an expand/collapse toggle
const MARGIN = 16;            // px gap from the screen edge
const CORNER = 'top-right';   // 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
const TRAY_COLOR = { r: 255, g: 46, b: 166 }; // tray dot color (RGB 0-255)
const TRAY_TOOLTIP = 'WIDGET-TITLE';
// -------------------------------------

let win = null;
let tray = null;

// Without this, every `npm start` while an instance is already running
// spawns a second, independent window+tray instead of reusing the first —
// the old one doesn't close itself just because a new one launched, and
// it keeps showing whatever it loaded at its own startup even after you
// edit index.html on disk. Second launch just wakes up the first instead.
const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (win) { win.show(); win.focus(); }
  });
}

function makeTrayIcon() {
  const size = 32;
  const buf = Buffer.alloc(size * size * 4);
  const cx = size / 2, cy = size / 2, r = size / 2 - 1;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      const dx = x - cx + 0.5, dy = y - cy + 0.5;
      if (dx * dx + dy * dy <= r * r) {
        buf[idx] = TRAY_COLOR.r; buf[idx + 1] = TRAY_COLOR.g; buf[idx + 2] = TRAY_COLOR.b; buf[idx + 3] = 255;
      } else {
        buf[idx] = 0; buf[idx + 1] = 0; buf[idx + 2] = 0; buf[idx + 3] = 0;
      }
    }
  }
  return nativeImage.createFromBitmap(buf, { width: size, height: size });
}

function cornerPosition(width, height) {
  const { workArea } = screen.getPrimaryDisplay();
  const x = CORNER.includes('right')
    ? workArea.x + workArea.width - width - MARGIN
    : workArea.x + MARGIN;
  const y = CORNER.includes('bottom')
    ? workArea.y + workArea.height - height - MARGIN
    : workArea.y + MARGIN;
  return { x, y };
}

function createWindow() {
  const { x, y } = cornerPosition(WIDTH, HEIGHT_COMPACT);
  win = new BrowserWindow({
    width: WIDTH,
    height: HEIGHT_COMPACT,
    x, y,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    skipTaskbar: true,
    hasShadow: false,
    fullscreenable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // 'screen-saver' level + visibleOnAllWorkspaces keeps it above fullscreen apps
  // and visible across workspaces too — important on GNOME/KDE where plain
  // alwaysOnTop can still lose to a maximized/fullscreen window.
  win.setAlwaysOnTop(true, 'screen-saver');
  win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  win.loadFile('index.html');

  win.on('closed', () => { win = null; });
}

app.whenReady().then(() => {
  createWindow();

  // skipTaskbar:true means there is no other way to get the window back once
  // it's hidden, so a tray icon + menu is not optional.
  tray = new Tray(makeTrayIcon());
  tray.setToolTip(TRAY_TOOLTIP);
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: 'Mostrar / Ocultar', click: () => { if (win) win.isVisible() ? win.hide() : win.show(); } },
    { label: 'Salir', click: () => app.quit() },
  ]));
  tray.on('click', () => { if (win) win.isVisible() ? win.hide() : win.show(); });
});

// Only needed if index.html has an expand/collapse toggle that calls
// window.overlayAPI.resize(expanded) — remove otherwise.
ipcMain.handle('resize', (_evt, expanded) => {
  if (!win) return;
  const height = expanded ? HEIGHT_EXPANDED : HEIGHT_COMPACT;
  const { x, y } = cornerPosition(WIDTH, height);
  win.setBounds({ x, y, width: WIDTH, height });
});

ipcMain.handle('hide', () => { if (win) win.hide(); });
ipcMain.handle('quit', () => app.quit());

// Keep running from the tray instead of quitting when the window closes.
app.on('window-all-closed', () => {});
