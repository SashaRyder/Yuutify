import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import { YouTubeService } from "./youtube";
import express from "express";
import { EVENTS } from "../src/events";

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    minWidth: 1280,
    minHeight: 720,
    frame: false,
    resizable: true
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }
}


let YTService: YouTubeService | null = null;

//Used for google auth only.
const expressApp = express();
expressApp.listen(1337);
expressApp.get('/auth_callback', async (req, res) => {
  if(!req.query.code) {
    return;
  }
    const code = req.query.code;
    await YTService?.handleCode(code as string);
    res.send("Thank you, you may now close this tab and return to Yuutify");
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(async () => {
  createWindow();
});

ipcMain.on(EVENTS.APP_READY, async  () => {
  YTService = await YouTubeService.createService();
  await YTService?.authoriseUser(false);
});

ipcMain.on(EVENTS.OPEN_AUTHENTICATE_URL, async () => {
  await YTService?.authoriseUser();
});

ipcMain.on("authenticated", async () => {
  win?.webContents.send(EVENTS.AUTHENTICATED, null);
})
ipcMain.on(EVENTS.REQUEST_PLAYLISTS, async () => {
  const playlists = await YTService?.getPlaylists();
  win?.webContents.send(EVENTS.LOAD_PLAYLISTS,  playlists);
})

ipcMain.on(EVENTS.QUIT, async () => {
  if (!win) return;
  app.quit();
});
