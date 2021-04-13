import {remote} from 'electron'

export function minimizeWindow() {
    let window = remote.getCurrentWindow()
    window.minimize()
}

export function maximizeWindow() {
    let window = remote.getCurrentWindow()
    window.maximize()
}

export function restoreWindow() {
    let window = remote.getCurrentWindow()
    window.restore()
}

export function closeWindow() {
    let window = remote.getCurrentWindow()
    window.close()
}