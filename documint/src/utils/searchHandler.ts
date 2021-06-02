import { DocumentFile } from '../types/types';
import { readMarkdownFile } from './fileHandler';

let fileContents: {file: DocumentFile, content: string}[] | undefined = undefined
let timeoutHandle: NodeJS.Timeout | undefined = undefined

export async function searchFiles(files: DocumentFile[], searchString: string) {
    searchString = searchString.toLowerCase()
    let searchRegEx = new RegExp(searchString, 'g')

    // Load file contents into memory and keep for 90s, reset timer on every new search
    if (fileContents === undefined && files.length > 0) {
        fileContents = await generateFileContents(files)

        timeoutHandle = setTimeout(() => fileContents = undefined, 90*1000)
    } else {
        if (timeoutHandle !== undefined){
            clearTimeout(timeoutHandle)
            timeoutHandle = setTimeout(() => fileContents = undefined, 90*1000)
        } else {
            fileContents = undefined
        } 
    }

    if (fileContents === undefined)
        return []

    return await Promise.all(fileContents.map(async fileContent => {
        let titleMatches = fileContent.file.name.toLowerCase().match(searchRegEx)?.length ?? 0
        let contentMatches = fileContent.content.match(searchRegEx)?.length ?? 0
        return {
            file: fileContent.file,
            titleMatches: titleMatches,
            contentMatches: contentMatches
        }
    }))
}

export async function generateFileContents(files: DocumentFile[]) {
    return await Promise.all(files.map(async file => { return {
        file: file,
        content: await readMarkdownFile(file).then(timestampedContent => timestampedContent.content.toLowerCase())
    }}))
}