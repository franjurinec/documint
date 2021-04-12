import React, { useState } from 'react'
import { promises as fs } from 'fs'
import MarkdownIt from 'markdown-it';
import { useDispatch } from 'react-redux';
import { setContent } from '../../redux/actions/projectActions';
const md = new MarkdownIt();

interface FileNavState {
    files: string[]
}

export const FileNav = () => {
    const [state, setState] = useState<FileNavState>({
        files: []
    })

    const dispatch = useDispatch()

    const onOpenFile = async (fileName: string) => {
        console.log("Attempting to display file: " + fileName)

        let htmlString = await fs.readFile('resources/docs/' + fileName, 'utf-8')
            .then(markdownString => md.render(markdownString))

        dispatch(setContent(htmlString))
    }

    fs.readdir('resources/docs').then(files => setState({
        files: files
    }))

    return (
        <nav className="FileNav">
            {
                state.files.map(file => <button key={file} onClick={() => onOpenFile(file)}>{file}</button>)
            }
        </nav>
    )
}