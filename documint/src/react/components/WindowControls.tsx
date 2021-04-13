import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalState } from '../../redux/reducer';
import { setWindowMaximized } from '../../redux/actions'
import * as windowHandler from '../../utils/windowHandler';

export const WindowControls = () => {
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
        <span className="WindowControls">
            <i className="fas fa-window-minimize" onClick={() => minimize()}></i>
            {windowMaximized 
            ? <i className="fas fa-window-restore" onClick={() => restore()}></i>
            : <i className="fas fa-window-maximize" onClick={() => maximize()}></i>
            }
            <i className="fas fa-window-close" onClick={() => close()}></i>
        </span>
    )
}