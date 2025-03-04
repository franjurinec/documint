import React, { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { GlobalState } from "../../../redux/reducer"
import { getDirectoryDialog, getFileDialog } from "../../../utils/dialogService"
import { exportProject, ExportSettings } from "../../../utils/exportService"
import { Modal } from "../common/Modal"

export const ExportModal = (args: {show: boolean, onClose: () => void}) => {

    const currentProject = useSelector<GlobalState, GlobalState["currentProject"]>(state => state.currentProject)
    const files = useSelector<GlobalState, GlobalState["files"]>(state => state.files)

    const initialState = {
        project: currentProject,
        files: files,
        customStyle: "",
        title: "",
        path: ""
    }

    useEffect(() => {
        setExportConfig({...exportConfig, project: currentProject, files: files})
    }, [currentProject, files])

    const [exportConfig, setExportConfig] = useState<ExportSettings>(initialState)

    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExportConfig({...exportConfig, title: e.target.value})
    }

    const onStyleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExportConfig({...exportConfig, customStyle: e.target.value})
    }

    const onPathChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExportConfig({...exportConfig, path: e.target.value})
    }

    const onSearchDirectory = () => {
        getDirectoryDialog().then(path => {
            if (path !== undefined) {
                setExportConfig({...exportConfig, path: path})
            }
        })
    }

    const onSearchStyle = () => {
        getFileDialog([{name: 'CSS', extensions:['css']}]).then(stylePath => {
            if (stylePath !== undefined) {
                setExportConfig({...exportConfig, customStyle: stylePath})
            }
        })
    }

    return (
        <Modal show={args.show} onClose={() => args.onClose()}>
            <div className="border py-10 px-20 rounded-lg shadow-lg">
                <div className="text-3xl font mb-5 text-center">
                    Export Settings
                </div>
                <form className="flex flex-col gap-4 w-96">
                    <input className="border-b outline-none" type="text" placeholder="Title" value={exportConfig.title} onChange={(e) => onTitleChange(e)} />
                    <div className="flex flex-row justify-between border-b w-96">
                        <input className="flex-grow outline-none" type="text" placeholder="Path" value={exportConfig.path} onChange={(e) => onPathChange(e)} />
                        <div className="text-gray-500 hover:text-gray-700"
                                onClick={() => onSearchDirectory()}>
                                <i className="fas fa-folder-open"></i>
                            </div>
                    </div>
                    <div className="flex flex-row justify-between border-b w-96">
                        <input className="flex-grow outline-none" type="text" placeholder="Optional: Custom Stylesheet" value={exportConfig.customStyle} onChange={(e) => onStyleChange(e)} />
                        <div className="text-gray-500 hover:text-gray-700"
                                onClick={() => onSearchStyle()}>
                                <i className="fas fa-folder-open"></i>
                            </div>
                    </div>
                    <div className="bg-mint rounded text-white text-center select-none py-1 px-2"
                        onClick={() => {exportProject(exportConfig); args.onClose(); setExportConfig(initialState)}}>
                        Export
                    </div>
                </form>
            </div>
        </Modal>
    )
}