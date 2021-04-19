import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setContent } from '../../redux/actions';
import { GlobalState } from '../../redux/reducer';
import { readMarkdownFileAsHTML } from '../../utils/fileHandler';


export const FileNav = () => {
    // Redux hooks (global context)
    const files = useSelector<GlobalState, GlobalState["files"]>(state => state.files)
    const projectName = useSelector<GlobalState, GlobalState["projectName"]>(state => state.projectName)
    const dispatch = useDispatch()

    // Update currently open content in global context
    const onOpenFile = (fileName: string) => {
        readMarkdownFileAsHTML(projectName, fileName)
            .then(htmlContent => dispatch(setContent(htmlContent)))
    }

    return (
        <nav className="FileNav">
            {files.map(file => <span key={file} onClick={() => onOpenFile(file)}>{file}</span>)}
        </nav>
    )
}