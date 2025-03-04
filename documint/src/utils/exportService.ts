import { DocumentFile, Project } from "../types/types";
import { promises as fs, existsSync } from 'fs';
import pug from 'pug';
import path from 'path';
import { readMarkdownFile, readMarkdownFileAsHTML } from "./fileService";

export type ExportSettings = {
    project: Project | undefined,
    files: DocumentFile[],
    customStyle: string,
    title: string,
    path: string
}

export async function exportProject(settings: ExportSettings) {
    if (settings.project === undefined) return
    
    let exportPath = settings.path
    let docsPath = path.join(exportPath, 'docs')
    let stylePath = path.join(exportPath, 'styles')
    let fontPath = path.join(exportPath, 'static', 'fonts', 'fa-webfonts')
    let katexFontPath = path.join(exportPath, 'static', 'fonts', 'katex-fonts')

    let files = settings.files

    let uncategorisedFileNames: string[] = []
    let categoryFileNames = new Map<string, string[]>()
    files.forEach(file => {
        if (file.category === undefined) {
            uncategorisedFileNames.push(file.name)
        } else {
            if (categoryFileNames.has(file.category)) {
                categoryFileNames.get(file.category)?.push(file.name)
            } else {
                categoryFileNames.set(file.category, [])
                categoryFileNames.get(file.category)?.push(file.name)
            }
        }
    })
    
    const renderFunction = pug.compileFile("static/export-chunks/page.pug")

    if (!existsSync(exportPath))
        await fs.mkdir(exportPath, { recursive: true })

    if (!existsSync(stylePath))
        await fs.mkdir(stylePath, { recursive: true })

    if (!existsSync(fontPath))
        await fs.mkdir(fontPath, { recursive: true })

    if (!existsSync(katexFontPath))
        await fs.mkdir(katexFontPath, { recursive: true })

    if (!existsSync(docsPath))
        await fs.mkdir(docsPath, { recursive: true })

    let styleFiles = await fs.readdir('styles')
    await Promise.all(styleFiles.map(async file => {
        await fs.copyFile(path.join('styles', file), path.join(stylePath, file))
    }))
    if (settings.customStyle !== "") {
        await fs.copyFile(settings.customStyle, path.join(stylePath, 'customStyle.css'))
    } else {
        await fs.writeFile(path.join(stylePath, 'customStyle.css'), '', 'utf-8')
    }

    let fontFiles = await fs.readdir(path.join('static', 'fonts', 'fa-webfonts'))
    await Promise.all(fontFiles.map(async file => {
        await fs.copyFile(path.join('static', 'fonts', 'fa-webfonts', file), path.join(fontPath, file))
    }))

    let katexFontFiles = await fs.readdir(path.join('static', 'fonts', 'katex-fonts'))
    await Promise.all(katexFontFiles.map(async file => {
        await fs.copyFile(path.join('static', 'fonts', 'katex-fonts', file), path.join(katexFontPath, file))
    }))

    // Search
    let searchMap = await Promise.all(files.map(async file => {
        return {
            name: file.name,
            content: (await readMarkdownFile(file)).content.toLowerCase()
        }
    }))
    await fs.writeFile(path.join(exportPath, 'searchMap.js'), 'searchMap=' + JSON.stringify(searchMap) +';', 'utf-8')
    await fs.copyFile('static/export-chunks/searchScript.js', path.join(exportPath, 'searchScript.js'))

    await Promise.all(files.map(async file => {
        let fileName = file.name

        const renderedHTML = renderFunction({
            projectTitle: settings.title,
            pageTitle: fileName,
            uncategorisedFileNames: uncategorisedFileNames,
            categoryFileNames: Array.from(categoryFileNames, ([category, fileNames]) => ({ category, fileNames })),
            content: (await readMarkdownFileAsHTML(file)).content
        })
        
        await fs.writeFile(path.join(exportPath, 'docs', fileName + '.html'), renderedHTML, 'utf-8')
    }))
}