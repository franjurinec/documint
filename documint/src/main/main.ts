import { app, BrowserWindow } from 'electron'
import * as path from 'path'

// Minimal ELectron setup

function createWindow () {
  const win = new BrowserWindow({
    frame: false,
    minWidth: 1500,
    minHeight: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })

  win.maximize()
  win.loadFile(path.join(app.getAppPath(), 'static/index.html'))
  win.webContents.openDevTools()
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