import path from 'path';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setFilesList, setOpenFile, setOpenProject } from '../../redux/actions';
import { GlobalState } from '../../redux/reducer';
import { DocumentFile } from '../../types/types';
import { addFile, deleteFile, getFileList, readMarkdownFile, readMarkdownFileAsHTML, saveMarkdownFile } from '../../utils/fileHandler';
import { htmlFromMD } from '../../utils/markdownHandler';
import { searchFiles } from '../../utils/searchHandler';
import { Context } from './common/Context';

export const ProjectDisplay = () => {
    const currentFile = useSelector<GlobalState, GlobalState["currentFile"]>((state) => state.currentFile)

    const [content, setContent] = useState<string>("<p>No file is open.<p>")
    const [edit, setEdit] = useState<boolean>(false);
    const [livePreview, setLivePreview] = useState<boolean>(false)

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
        <div className="flex flex-row gap-2 justify-end border-b border-gray-900 mx-4 py-4">
            <div className="bg-mint text-white rounded py-1 px-2 select-none hover:bg-opacity-60 active:bg-opacity-80" onClick={onEdit}>
                Edit
                </div>
        </div>
    ) : (
        <div className="flex flex-row gap-2 justify-end border-b border-gray-900 mx-4 py-4">
            <div className="bg-mint text-white rounded py-1 px-2 select-none hover:bg-opacity-60 active:bg-opacity-80" onClick={() => setLivePreview(!livePreview)}>
                Toggle preview
                </div>
            <div className="bg-mint text-white rounded py-1 px-2 select-none hover:bg-opacity-60 active:bg-opacity-80" onClick={onSave}>
                Save
                </div>
            <div className="bg-mint text-white rounded py-1 px-2 select-none hover:bg-opacity-60 active:bg-opacity-80" onClick={onCancel}>
                Cancel
                </div>
        </div>
    )

    let frame = !edit ? (
        <div className="prose max-w-full w-full flex-grow overflow-y-auto p-8" dangerouslySetInnerHTML={{ __html: content }}>
        </div>
    ) : (
        <textarea className="w-full flex-grow overflow-y-auto outline-none resize-none p-8" value={content} onChange={(e) => setContent(e.target.value)}>
        </textarea>
    )

    return (
        <div className="flex flex-row justify-center w-full h-full bg-gray-100">
            <FileNav />
            <div className="max-w-screen-lg flex-grow bg-white flex flex-col">
                {fileControls}
                {frame}
            </div>

            {(livePreview && edit)
                ? (
                    <div className="prose max-w-screen-lg flex-grow bg-white px-8 pt-8 overflow-y-auto" dangerouslySetInnerHTML={{ __html: htmlFromMD(content) }}>
                    </div>
                ) : (
                    <InnerNav />
                )}

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

    // New file context menu state
    const [showAddContext, setShowAddContext] = useState<boolean>(false);
    const [newFileName, setNewFileName] = useState<string>("")
    const onAddFile = () => {
        if (!currentProject) return

        let newDoc: DocumentFile = {
            name: newFileName + '.md',
            project: currentProject,
            path: path.join(currentProject.path, newFileName)
        }

        setShowAddContext(false)
        addFile(newDoc).then(() => getFileList(currentProject).then(files => dispatch(setFilesList(files))))
        setNewFileName("")
    }


    // Search context menu state
    const [showSearchContext, setShowSearchContext] = useState<boolean>(false)


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
        <div className="w-72 flex-shrink-0 max-h-full overflow-y-auto flex flex-col gap-2 p-2 pt-4 ml-4 items-start">
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

                <div className="text-gray-300 hover:text-gray-400"
                    onClick={() => setShowSearchContext(true)}>
                    <i className="fas fa-search"></i>
                </div>

                <div className="text-mint hover:text-mint-dark"
                    onClick={() => setShowAddContext(true)}>
                    <i className="fas fa-plus"></i>
                </div>
            </div>
            {files.map((file, index) => {
                return (
                    <div className="flex flex-row gap-1 select-none w-full items-center" key={index} >
                        <div className="hover:text-gray-400 flex-grow truncate" onClick={() => onFileSelect(index)}>{file.name}</div>
                        {/*<div className="text-gray-300 hover:text-gray-400">
                            <i className="fas fa-pen"></i>
                        </div>*/}
                        <div className="text-gray-300 hover:text-gray-400"
                            onClick={() => onFileDelete(file)}>
                            <i className="fas fa-trash"></i>
                        </div>
                    </div>
                )
            })}

            <Context show={showAddContext} onClose={() => { setShowAddContext(false); setNewFileName("") }}>
                <input className="outline-none w-60 border-b" type="text" value={newFileName} placeholder="File Name" onChange={(e) => setNewFileName(e.target.value)}></input>
                <div className="select-none bg-mint text-white rounded py-1 px-2 w-32 hover:bg-opacity-60 active:bg-opacity-80 text-center"
                    onClick={() => onAddFile()}>
                    Add
                    </div>
            </Context>

            <SearchContext show={showSearchContext} onClose={() => setShowSearchContext(false)} />
        </div>
    )
}

const InnerNav = () => (
    <div className="w-72 max-h-full overflow-y-auto hidden flex-col items-end 2xl:flex">
    </div>
)

const SearchContext = (args: { show: boolean, onClose: () => void }) => {
    const dispatch = useDispatch()

    const files = useSelector<GlobalState, GlobalState["files"]>(state => state.files)

    const [searchString, setSearchString] = useState<string>("")
    const [searchResults, setSearchResults] = useState<DocumentFile[]>([])

    useEffect(() => {
        searchFiles(files, searchString).then(results => {
            console.log(results)

            let searchRes = results
                .filter(e => e.titleMatches > 0 || e.contentMatches > 0)
                .sort((e1, e2) => e2.titleMatches - e1.titleMatches || e2.contentMatches - e1.contentMatches)
                .slice(0, 5)
                .map(e => e.file)

            setSearchResults(searchRes)
        })
    }, [searchString])

    return (
        <Context show={args.show} onClose={() => { args.onClose(); setSearchString("") }}>
            <input className="outline-none w-60 border-b" type="text" value={searchString} placeholder="Search..." onChange={(e) => setSearchString(e.target.value)}></input>
            <div className="flex flex-col gap-2">
                {searchResults.map(file => {
                    return (
                        <div key={file.path + file.name} 
                            className="select-none w-full px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
                            onClick={() => {dispatch(setOpenFile(file)); args.onClose(); setSearchString("")}}>
                            {file.name}
                        </div>
                    )
                })}
            </div>
        </Context>
    )
}