import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setOpenFile } from '../../redux/actions';
import { GlobalState } from '../../redux/reducer';


export const FileNav = () => {
    const files = useSelector<GlobalState, GlobalState["files"]>(state => state.files)
    const currentFile = useSelector<GlobalState, GlobalState["currentFile"]>((state) => state.currentFile)
    const dispatch = useDispatch()

    useEffect(() => {
        if (currentFile === undefined && files.length > 0)
            dispatch(setOpenFile(files[0]))
    },[files])

    const onFileSelect = (value: any) => {
        if (typeof value === 'number') {
            dispatch(setOpenFile(files[value]))
        }
    }

    return (
        <div className="FileNav w-1/6 max-h-full overflow-y-auto flex flex-col gap-2 p-2 pt-10 items-start">
            <div className="text-lg font-medium select-none">Documents</div>
            {files.map((file, index) => <div className="select-none w-full hover:text-gray-400" key={index} onClick={() => onFileSelect(index)}>{file.name}</div>)}
        </div>
    )
}