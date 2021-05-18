import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalState } from '../../../redux/reducer';
import { setWindowMaximized } from '../../../redux/actions'
import * as windowHandler from '../../../utils/windowHandler';

export const Header = () => (
    // @ts-ignore (WebkitAppRegion is electron-specific)
    <div className="Header relative top-0 flex justify-end z-40 w-full h-8 bg-mint overflow-hidden" style={{WebkitAppRegion: 'drag'}}>
        <WindowControls />
    </div>
)

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