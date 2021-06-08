import { app, BrowserWindow, ipcMain } from 'electron'
import { promises as fs } from 'fs'
import * as path from 'path'

// Minimal ELectron setup

ipcMain.on('request-userdata-path', (event) => {
  event.returnValue = app.getPath('userData')
})

function createWindow () {
  const win = new BrowserWindow({
    frame: false,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })

  win.maximize()
  win.loadFile(path.join(app.getAppPath(), 'static/index.html'))
  // win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})