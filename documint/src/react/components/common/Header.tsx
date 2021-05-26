import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalState } from '../../../redux/reducer';
import { setWindowMaximized } from '../../../redux/actions'
import * as windowHandler from '../../../utils/windowHandler';
import { Modal } from './Modal';
import { exportProject, ExportSettings } from '../../../utils/exportHandler';
import { getDirectoryDialog } from '../../../utils/dialogHandler';

export const Header = () => (
    // @ts-ignore (WebkitAppRegion is electron-specific)
    <div className="Header relative top-0 flex justify-between z-40 w-full h-8 bg-mint overflow-hidden" style={{WebkitAppRegion: 'drag'}}>
        <ExportButton />
        <WindowControls />
    </div>
)

const ExportButton = () => {
    const currentProject = useSelector<GlobalState, GlobalState["currentProject"]>(state => state.currentProject)
    const [showExportModal, setShowExportModal] = useState<boolean>(false)

    return (
        <div className={currentProject === undefined ? "contents invisible" : "contents"}> 
            <div className="bg-mint-dark rounded text-white text-xs hover:bg-opacity-50 active:bg-opacity-80 px-2 py-1 my-1 ml-2 align-middle select-none" 
            style={{// @ts-ignore (WebkitAppRegion is electron-specific)
                WebkitAppRegion: 'no-drag'}} 
            onClick={() => setShowExportModal(true)}>
                Export
            </div>

            <ExportModal show={showExportModal} onClose={() => setShowExportModal(false)}/>
        </div>
    )
}

const ExportModal = (args: {show: boolean, onClose: () => void}) => {

    const currentProject = useSelector<GlobalState, GlobalState["currentProject"]>(state => state.currentProject)
    const files = useSelector<GlobalState, GlobalState["files"]>(state => state.files)

    const initialState = {
        project: currentProject,
        files: files,
        color: "",
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

    const onColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExportConfig({...exportConfig, color: e.target.value})
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

    return (
        <Modal show={args.show} onClose={() => args.onClose()}>
            <div className="border py-10 px-20 rounded-lg shadow-lg">
                <div className="text-3xl font mb-5 text-center">
                    Export Settings
                </div>
                <form className="flex flex-col gap-4 w-96">
                    <input className="border-b outline-none" type="text" placeholder="Title" value={exportConfig.title} onChange={(e) => onTitleChange(e)} />
                    <input className="border-b outline-none" type="text" placeholder="Color" value={exportConfig.color} onChange={(e) => onColorChange(e)} />
                    <div className="flex flex-row justify-between border-b w-96">
                        <input className="flex-grow outline-none" type="text" placeholder="Path" value={exportConfig.path} onChange={(e) => onPathChange(e)} />
                        <div className="text-gray-500 hover:text-gray-700"
                                onClick={() => onSearchDirectory()}>
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

const WindowControls = () => {
    const dispatch = useDispatch()

    const windowMaximized = useSelector<GlobalState, GlobalState["windowMaximized"]>(state => state.windowMaximized)

    const minimize = () => {
        windowHandler.minimizeWindow()
    }

    const maximize = () => {
        dispatch(setWindowMaximized(true))
        windowHandler.maximizeWindow()
    }

    const restore = () => {
        dispatch(setWindowMaximized(false))
        windowHandler.restoreWindow()
    }

    const close = () => {
        windowHandler.closeWindow()
    }

    return (
        // @ts-ignore (WebkitAppRegion is electron-specific)
        <div className="WindowControls h-full" style={{WebkitAppRegion: 'no-drag'}}>
            <i className="far fa-window-minimize h-full py-2 px-3 hover:bg-opacity-30 hover:bg-white" onClick={() => minimize()}></i>
            {windowMaximized 
            ? <i className="far fa-window-restore h-full py-2 px-3 hover:bg-opacity-30 hover:bg-white" onClick={() => restore()}></i>
            : <i className="far fa-window-maximize h-full py-2 px-3 hover:bg-opacity-30 hover:bg-white" onClick={() => maximize()}></i>
            }
            <i className="far fa-window-close h-full py-2 px-3 hover:bg-opacity-80 hover:bg-red-400" onClick={() => close()}></i>
        </div>
    )
}