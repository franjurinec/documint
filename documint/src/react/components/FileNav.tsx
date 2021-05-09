import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setOpenFile } from '../../redux/actions';
import { GlobalState } from '../../redux/reducer';


export const FileNav = () => {
    const files = useSelector<GlobalState, GlobalState["files"]>(state => state.files)
    const dispatch = useDispatch()

    const onFileSelect = (value: any) => {
        if (typeof value === 'number') {
            dispatch(setOpenFile(files[value]))
        }
    }

    return (
        <nav className="FileNav">
            {files.map((file, index) => <span key={index} onClick={() => onFileSelect(index)}>{file.name}</span>)}
        </nav>
    )
}