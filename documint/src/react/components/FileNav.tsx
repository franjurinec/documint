import React, { useState } from 'react'
import { promises as fs } from 'fs'
import MarkdownIt from 'markdown-it';
import { useDispatch, useSelector } from 'react-redux';
import { loadFiles, setContent } from '../../redux/actions/projectActions';
import { ProjectState } from '../../redux/reducers/projectReducer';
const md = new MarkdownIt();

export const FileNav = () => {

    // Store file list into global context
    const dispatch = useDispatch()
    fs.readdir('resources/docs').then(files => dispatch(loadFiles(files)))

    // Use file list from global context
    const files = useSelector<ProjectState, ProjectState["files"]>(state => state.files)

    // Update currently open content in global context
    const onOpenFile = async (fileName: string) => {
        console.log("Attempting to display file: " + fileName)

        let htmlString = await fs.readFile('resources/docs/' + fileName, 'utf-8')
            .then(markdownString => md.render(markdownString))

        dispatch(setContent(htmlString))
    }

    return (
        <nav className="FileNav">
            {files.map(file => <button key={file} onClick={() => onOpenFile(file)}>{file}</button>)}
        </nav>
    )
}