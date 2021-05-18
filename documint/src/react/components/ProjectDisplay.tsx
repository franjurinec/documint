import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setFilesList, setOpenFile, setOpenProject } from '../../redux/actions';
import { GlobalState } from '../../redux/reducer';
import { DocumentFile } from '../../types/types';
import { deleteFile, getFileList, readMarkdownFile, readMarkdownFileAsHTML, saveMarkdownFile } from '../../utils/fileHandler';

export const ProjectDisplay = () => {
    const currentFile = useSelector<GlobalState, GlobalState["currentFile"]>((state) => state.currentFile)

    const [content, setContent] = useState<string>("<p>No file is open.<p>")
    const [edit, setEdit] = useState<boolean>(false);

    useEffect(() => {
        if (currentFile) {
            setEdit(false)
            readMarkdownFileAsHTML(currentFile).then(htmlContent => setContent(htmlContent))
        }
    }, [currentFile])

    const onEdit = () => {
        if (!currentFile) return
        readMarkdownFile(currentFile).then(mdContent => setContent(mdContent))
        setEdit(true)
    }

    const onSave = () => {
        if (!currentFile) return
        saveMarkdownFile(currentFile, content).then(() => {
            readMarkdownFileAsHTML(currentFile).then(htmlContent => setContent(htmlContent))
        })
        setEdit(false)
    }

    const onCancel = () => {
        if (!currentFile) return
        readMarkdownFileAsHTML(currentFile).then(htmlContent => setContent(htmlContent))
        setEdit(false)
    }

    // RENDERING

    let fileControls = !edit ? (
        <div className="flex flex-row justify-end">
            <div className="bg-mint text-white rounded py-1 px-2 m-2 select-none hover:bg-opacity-60 active:bg-opacity-80" onClick={onEdit}>
                Edit
                </div>
        </div>
    ) : (
        <div className="flex flex-row justify-end">
            <div className="bg-mint text-white rounded py-1 px-2 m-2 select-none hover:bg-opacity-60 active:bg-opacity-80" onClick={onSave}>
                Save
                </div>
            <div className="bg-mint text-white rounded py-1 px-2 m-2 select-none hover:bg-opacity-60 active:bg-opacity-80" onClick={onCancel}>
                Cancel
                </div>
        </div>
    )

    let frame = !edit ? (
        <div className="prose max-w-full p-8 bg-white rounded shadow-lg h-9/10 overflow-y-auto" dangerouslySetInnerHTML={{ __html: content }}>
        </div>
    ) : (
        <textarea className="ContentFrame w-full p-8 bg-white rounded shadow-lg h-9/10 overflow-y-auto outline-none resize-none" value={content} onChange={(e) => setContent(e.target.value)}>
        </textarea>
    )

    return (
        <div className="flex flex-row justify-center w-full h-full px-4 bg-gray-100">
            <FileNav />
            <div className="max-h-full max-w-screen-lg flex-grow">
                {fileControls}
                {frame}
            </div>
            <InnerNav />
        </div>
    )
}

const FileNav = () => {
    const dispatch = useDispatch()

    const files = useSelector<GlobalState, GlobalState["files"]>(state => state.files)
    const currentFile = useSelector<GlobalState, GlobalState["currentFile"]>(state => state.currentFile)
    const currentProject = useSelector<GlobalState, GlobalState["currentProject"]>(state => state.currentProject)

    useEffect(() => {
        if ((currentFile === undefined || !files.includes(currentFile)) && files.length > 0)
            dispatch(setOpenFile(files[0]))
    }, [files])

    const onFileSelect = (value: any) => {
        if (typeof value === 'number') {
            dispatch(setOpenFile(files[value]))
        }
    }

    const onFileDelete = (file: DocumentFile) => {

        deleteFile(file)
            .then(() => getFileList(currentProject)
                .then(files => dispatch(setFilesList(files))))
    }

    return (
        <div className="w-72 flex-shrink-0 max-h-full overflow-y-auto flex flex-col gap-2 p-2 pt-10 items-start">
            <div className="text-sm select-none hover:text-gray-400" onClick={() => dispatch(setOpenProject(undefined))}>
                Back
            </div>
            <div className="flex flex-row select-none gap-1 w-full items-center text-lg pb-2 border-b border-gray-900">
                <div className="flex-grow font-medium">
                    {currentProject?.type == "REMOTE" &&
                        <i className="fas fa-server mr-2"></i>
                    }
                    {currentProject !== undefined ? currentProject.name : "Undefined"}
                    </div>
                
                <div className="text-mint hover:text-mint-dark">
                    <i className="fas fa-plus"></i>
                </div>
            </div>
            {files.map((file, index) => {
                return (
                    <div className="flex flex-row gap-1 select-none w-full items-center" key={index} >
                        <div className="hover:text-gray-400 flex-grow truncate" onClick={() => onFileSelect(index)}>{file.name}</div>
                        <div className="text-gray-300 hover:text-gray-400">
                            <i className="fas fa-pen"></i>
                        </div>
                        <div className="text-gray-300 hover:text-gray-400"
                            onClick={() => onFileDelete(file)}>
                            <i className="fas fa-trash"></i>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

const InnerNav = () => (
    <div className="w-72 max-h-full overflow-y-auto hidden flex-col items-end 2xl:flex">
    </div>
)