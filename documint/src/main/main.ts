import { app, ipcMain, BrowserWindow } from 'electron'
import * as path from 'path'

function createWindow () {
  const win = new BrowserWindow({
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  win.maximize()
  win.loadFile(path.join(app.getAppPath(), 'views/index.html'))
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


// Exposed functions

ipcMain.handle('readDoc', async (ref) => {
  console.log('Try')
  
})