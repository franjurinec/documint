import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalState } from '../../../redux/reducer';
import { setWindowMaximized } from '../../../redux/actions'
import * as windowHandler from '../../../utils/windowService';
import { ExportModal } from '../display-components/ExportModal';

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