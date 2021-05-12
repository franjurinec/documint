import React from 'react'
import { WindowControls } from './WindowControls'

export const Header = () => (
    // @ts-ignore (WebkitAppRegion is electron-specific)
    <div className="Header relative top-0 flex justify-end z-40 w-full h-8 bg-mint overflow-hidden" style={{WebkitAppRegion: 'drag'}}>
        <WindowControls />
    </div>
)