import React, { useState } from 'react'
import { promises as fs } from 'fs'

interface FileNavProps {
    openFile: (file: string) => void
}

interface FileNavState {
    openFile: (file: string) => void,
    files: string[]
}

export const FileNav = (props: FileNavProps) => {
    const [state, setState] = useState<FileNavState>({
        openFile: props.openFile,
        files: []
    })

    fs.readdir('resources/docs').then(files => setState({
        openFile: state.openFile,
        files: files
    }))

    return (
        <nav className="FileNav">
            {
                state.files.map(file => <button key={file} onClick={() => state.openFile(file)}>{file}</button>)
            }
        </nav>
    )
}