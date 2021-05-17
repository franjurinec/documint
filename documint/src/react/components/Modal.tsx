import React, { ReactNode } from 'react'

export const Modal = (args: {show: boolean, onClose: () => void, children?: ReactNode}) => {
    if (args.show) {
        return (
            <div className="fixed top-8 bottom-0 left-0 right-0 bg-white flex flex-col items-center justify-center" onClick={() => args.onClose()}>
                <div className="flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
                    {args.children}
                </div>
            </div>
        )
    } else {
        return (null)
    }
}