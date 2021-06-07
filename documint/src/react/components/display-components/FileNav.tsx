import path from "path"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setFilesList, setOpenFile, setOpenProject } from "../../../redux/actions"
import { GlobalState } from "../../../redux/reducer"
import { DocumentFile } from "../../../types/types"
import { addFile, deleteFile, getFileList } from "../../../utils/fileHandler"
import { Context } from "../common/Context"
import { SearchContext } from "./SearchContext"

export const FileNav = () => {
    const dispatch = useDispatch()

    const files = useSelector<GlobalState, GlobalState["files"]>(state => state.files)
    const currentFile = useSelector<GlobalState, GlobalState["currentFile"]>(state => state.currentFile)
    const currentProject = useSelector<GlobalState, GlobalState["currentProject"]>(state => state.currentProject)

    const [categoryFiles, setCategoryFiles] = useState(new Map<string, DocumentFile[]>())
    const [uncategorisedFiles, setUncategorisedFiles] = useState<DocumentFile[]>([])

    useEffect(() => {
        if ((currentFile === undefined || !files.includes(currentFile)) && files.length > 0) {
            dispatch(setOpenFile(files[0]))
        }

        let uncategorisedFiles: DocumentFile[] = []
        let categoryFiles = new Map<string, DocumentFile[]>()
        files.forEach(file => {
            if (file.category === undefined) {
                uncategorisedFiles.push(file)
            } else {
                if (categoryFiles.has(file.category)) {
                    categoryFiles.get(file.category)?.push(file)
                } else {
                    categoryFiles.set(file.category, [])
                    categoryFiles.get(file.category)?.push(file)
                }
            }
        })

        setUncategorisedFiles(uncategorisedFiles)
        setCategoryFiles(categoryFiles)

    }, [files])

    // New file context menu state
    const [showAddContext, setShowAddContext] = useState<boolean>(false);
    const [newFileName, setNewFileName] = useState<string>("")
    const [newFileCategory, setNewFileCategory] = useState<string>("")
    
    const onAddFile = () => {
        if (!currentProject) return

        let newDoc: DocumentFile = {
            name: newFileName,
            project: currentProject,
            category: newFileCategory === "" ? undefined : newFileCategory,
            path: newFileCategory === ""
                ? path.join(currentProject.path, newFileName + '.md')
                : path.join(currentProject.path, newFileCategory, newFileName + '.md')
        }

        setShowAddContext(false)
        addFile(newDoc).then(() => getFileList(currentProject).then(files => dispatch(setFilesList(files))))
        setNewFileName("")
        setNewFileCategory("")
    }

    // Search context menu state
    const [showSearchContext, setShowSearchContext] = useState<boolean>(false)


    const onFileSelect = (file: DocumentFile) => {
        dispatch(setOpenFile(file))
    }

    const onFileDelete = (file: DocumentFile) => {
        deleteFile(file)
            .then(() => getFileList(currentProject)
                .then(files => dispatch(setFilesList(files))))
    }

    return (
        <div className="w-72 flex-shrink-0 max-h-full overflow-y-auto flex flex-col gap-2 p-2 pt-4 ml-4 items-start">
            <div className="text-sm select-none hover:text-gray-400"
                onClick={() => {
                    dispatch(setOpenProject(undefined));
                    dispatch(setFilesList([]));
                    dispatch(setOpenFile(undefined))
                }}>
                Back
            </div>
            <div className="flex flex-row select-none gap-2 w-full items-center text-lg pb-2 mb-4 border-b border-gray-900">
                <div className="flex-grow font-medium">
                    {currentProject?.type == "REMOTE" &&
                        <i className="fas fa-server mr-2"></i>
                    }
                    {currentProject !== undefined ? currentProject.name : "Undefined"}
                </div>

                <div className="text-gray-400 hover:text-gray-600"
                    onClick={() => setShowSearchContext(true)}>
                    <i className="fas fa-search"></i>
                </div>

                <div className="text-gray-400 hover:text-gray-600"
                    onClick={() => setShowAddContext(true)}>
                    <i className="fas fa-plus"></i>
                </div>
            </div>

            <Context show={showAddContext} onClose={() => { setShowAddContext(false); setNewFileName(""); setNewFileCategory("") }}>
                <input className="outline-none w-60 border-b" type="text" value={newFileName} placeholder="File Name" onChange={(e) => setNewFileName(e.target.value)}></input>
                <input className="outline-none w-60 border-b" type="text" value={newFileCategory} placeholder="Category (optional)" onChange={(e) => setNewFileCategory(e.target.value)}></input>
                <div className="select-none bg-mint text-white rounded py-1 px-2 w-32 hover:bg-opacity-60 active:bg-opacity-80 text-center"
                    onClick={() => onAddFile()}>
                    Add
                    </div>
            </Context>

            <SearchContext show={showSearchContext} onClose={() => setShowSearchContext(false)} />

            {uncategorisedFiles.map((file) => {
                return (
                    <div className="flex flex-row gap-1 select-none w-full items-center" key={file.path} >
                        <div className="hover:text-gray-400 flex-grow truncate" onClick={() => onFileSelect(file)}>{file.name}</div>
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

            {Array.from(categoryFiles, ([category, files]) => {
                return (
                    <CategoryItem key={category} files={files} name={category} onFileDelete={onFileDelete} onFileSelect={onFileSelect} />
                )
            })}
        </div>
    )
}

type CategoryArgType = {
    files: DocumentFile[],
    name: string,
    onFileSelect: (file: DocumentFile) => void,
    onFileDelete: (file: DocumentFile) => void
}

const CategoryItem = (args: CategoryArgType) => {
    const [collapsed, setCollapsed] = useState<boolean>(false)

    const dispatch = useDispatch()
    const currentProject = useSelector<GlobalState, GlobalState["currentProject"]>(state => state.currentProject)

    const [showAddContext, setShowAddContext] = useState<boolean>(false);
    const [newFileName, setNewFileName] = useState<string>("")
    const onAddFile = () => {
        if (!currentProject) return

        let newDoc: DocumentFile = {
            name: newFileName,
            project: currentProject,
            category: args.name,
            path: path.join(currentProject.path, args.name, newFileName + '.md')
        }

        setShowAddContext(false)
        addFile(newDoc).then(() => getFileList(currentProject).then(files => dispatch(setFilesList(files))))
        setNewFileName("")
    }

    return (
        <div className="w-full border-t mt-2 border-gray-300">
            <div className="flex flex-row gap-2 items-center justify-between pt-4 pb-2 w-full">
                <div className="flex-grow flex flex-row gap-2 items-center font-semibold hover:text-gray-400 select-none"
                    onClick={() => setCollapsed(!collapsed)}>
                    <i className={collapsed ? "fas fa-chevron-right w-3" : "fas fa-chevron-down w-3"}></i>
                    {args.name}
                </div>
                <div className="text-gray-400 hover:text-gray-600"
                    onClick={() => setShowAddContext(true)}>
                    <i className="fas fa-plus"></i>
                </div>
            </div>

            <Context show={showAddContext} onClose={() => { setShowAddContext(false); setNewFileName("") }}>
                <input className="outline-none w-60 border-b" type="text" value={newFileName} placeholder="File Name" onChange={(e) => setNewFileName(e.target.value)}></input>
                <div className="select-none bg-mint text-white rounded py-1 px-2 w-32 hover:bg-opacity-60 active:bg-opacity-80 text-center"
                    onClick={() => onAddFile()}>
                    Add
                    </div>
            </Context>

            {!collapsed && (
                <div className="flex flex-col gap-2 w-full">
                    {args.files.map((file) => {
                        return (
                            <div className="flex flex-row gap-1 select-none w-full items-center" key={file.path} >
                                <div className="hover:text-gray-400 flex-grow truncate" onClick={() => args.onFileSelect(file)}>{file.name}</div>
                                {/*<div className="text-gray-300 hover:text-gray-400">
                                <i className="fas fa-pen"></i>
                            </div>*/}
                                <div className="text-gray-300 hover:text-gray-400"
                                    onClick={() => args.onFileDelete(file)}>
                                    <i className="fas fa-trash"></i>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )

}