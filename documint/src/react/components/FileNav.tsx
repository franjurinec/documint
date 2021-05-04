import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setOpenFile } from '../../redux/actions';
import { GlobalState } from '../../redux/reducer';


export const FileNav = () => {
    const files = useSelector<GlobalState, GlobalState["files"]>(state => state.files)
    const dispatch = useDispatch()

    return (
        <nav className="FileNav">
            {files.map(file => <span key={file} onClick={() => dispatch(setOpenFile(file))}>{file}</span>)}
        </nav>
    )
}