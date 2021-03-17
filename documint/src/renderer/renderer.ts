import * as pug from 'pug'
import { promises as fs } from 'fs'

async function loadMain() {
    let root = document.getElementById('root')
    let files = await fs.readdir('resources/docs')
    if (root) root.innerHTML = pug.renderFile('views/pages/main.pug', { files: files })
}

export async function openDoc(ref: string) {
    let contentView = document.getElementById('content-view')
    if (contentView) contentView.innerHTML = await fs.readFile('resources/docs/' + ref, 'utf-8')
}

loadMain().then(_ => openDoc('inner1.html'))
