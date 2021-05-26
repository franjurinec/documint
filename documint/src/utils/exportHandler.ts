import { DocumentFile, Project } from "../types/types";
import { promises as fs, existsSync } from 'fs';
import pug from 'pug';
import path from 'path';
import { readMarkdownFileAsHTML } from "./fileHandler";

export type ExportSettings = {
    project: Project | undefined,
    files: DocumentFile[],
    color: string,
    title: string,
    path: string
}

export async function exportProject(settings: ExportSettings) {
    console.log("Exporting project!")
    console.log('Current directory: ' + process.cwd());
    console.log(settings)

    if (settings.project === undefined) return
    
    let exportPath = settings.path
    let docsPath = path.join(exportPath, 'docs')
    let stylePath = path.join(exportPath, 'styles')
    let fontPath = path.join(exportPath, 'static', 'fonts', 'fa-webfonts')

    let files = settings.files
    let fileNames = files.map(file => file.name.slice(0, -3))
    
    const renderFunction = pug.compileFile("static/export-chunks/page.pug")

    if (!existsSync(exportPath))
        await fs.mkdir(exportPath, { recursive: true })

    if (!existsSync(stylePath))
        await fs.mkdir(stylePath, { recursive: true })

    if (!existsSync(fontPath))
        await fs.mkdir(fontPath, { recursive: true })

    if (!existsSync(docsPath))
        await fs.mkdir(docsPath, { recursive: true })

    let styleFiles = await fs.readdir('styles')
    await Promise.all(styleFiles.map(async file => {
        await fs.copyFile(path.join('styles', file), path.join(stylePath, file))
    }))

    let fontFiles = await fs.readdir(path.join('static', 'fonts', 'fa-webfonts'))
    await Promise.all(fontFiles.map(async file => {
        await fs.copyFile(path.join('static', 'fonts', 'fa-webfonts', file), path.join(fontPath, file))
    }))

    await Promise.all(files.map(async file => {
        let fileName = file.name.slice(0, -3)

        const renderedHTML = renderFunction({
            projectTitle: settings.title,
            pageTitle: fileName,
            fileNames: fileNames,
            content: await readMarkdownFileAsHTML(file)
        })
        
        await fs.writeFile(path.join(exportPath, 'docs', fileName + '.html'), renderedHTML, 'utf-8')
    }))
}