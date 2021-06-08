import { ipcRenderer } from 'electron';

export const userDataPath: string = ipcRenderer.sendSync('request-userdata-path')