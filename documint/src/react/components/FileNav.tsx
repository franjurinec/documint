import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadFiles, setContent } from '../../redux/actions';
import { GlobalState } from '../../redux/reducer';
import { getFileList, readMarkdownFileAsHTML } from '../../utils/fileHandler';

export const FileNav = () => {
    // Redux hooks (global context)
    const files = useSelector<GlobalState, GlobalState["files"]>(state => state.files)
    const dispatch = useDispatch()

    // Store file list into global context
    getFileList().then(files => dispatch(loadFiles(files)))

    // Update currently open content in global context
    const onOpenFile = (fileName: string) => {
        readMarkdownFileAsHTML('resources/docs/' + fileName)
            .then(htmlContent => dispatch(setContent(htmlContent)))
    }

    return (
        <nav className="FileNav">
            {files.map(file => <button key={file} onClick={() => onOpenFile(file)}>{file}</button>)}
        </nav>
    )
}