import React, { ReactNode } from 'react'

export const Context = (args: { show: boolean, onClose: () => void, children?: ReactNode }) => {


    return (
        <div className={args.show ? "contents" : "hidden"}>
            <div className="fixed top-8 bottom-0 left-0 right-0"
            onClick={() => args.onClose()}></div>

            <div className="absolute flex flex-col align-middle gap-2 p-4 rounded bg-white shadow-lg">
                {args.children}
            </div>
        </div>

    )
}