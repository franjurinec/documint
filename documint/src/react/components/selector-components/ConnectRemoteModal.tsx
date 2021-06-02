import React, { useState } from "react"
import { Project } from "../../../types/types"
import { Modal } from "../common/Modal"

export const ConnectRemoteModal = (args: {
    show: boolean,
    onClose: () => void,
    project: Project | undefined,
    onConnect: (project: Project, username: string, password: string) => void
}) => {

    const initialState = { username: "", password: "" }
    const [remoteSettings, setRemoteSettings] = useState<{ username: string, password: string }>(initialState)

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case 'username':
                setRemoteSettings({
                    ...remoteSettings,
                    username: e.target.value

                })
                break;
            case 'password':
                setRemoteSettings({
                    ...remoteSettings,
                    password: e.target.value
                })
                break;
        }
    }

    const onConnect = () => { 
        if (args.project) {
            args.onConnect(args.project, remoteSettings.username, remoteSettings.password)
            args.onClose()
            setRemoteSettings(initialState) 
        }
    }

    return (
        <Modal show={args.show} onClose={args.onClose}>
            <div className="border py-10 px-20 rounded-lg shadow-lg">

                <form className="flex flex-col items-center gap-2 m-0">
                    <input className="border-b m-1 outline-none w-72"
                        placeholder="User"
                        type="text"
                        name="username"
                        value={remoteSettings.username}
                        onChange={(e) => handleFormChange(e)} />

                    <input className="border-b m-1 outline-none w-72"
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={remoteSettings.password}
                        onChange={(e) => handleFormChange(e)} />

                </form>

                <div className="flex flex-row justify-between w-full mt-5">
                    <div className="bg-mint w-20 text-center text-white rounded py-1 px-2 select-none hover:bg-opacity-60 active:bg-opacity-80"
                        onClick={() => args.onClose()}>
                        Cancel
                    </div>
                    <div className="bg-mint w-20 text-center text-white rounded py-1 px-2 select-none hover:bg-opacity-60 active:bg-opacity-80"
                        onClick={onConnect}>
                        Connect
                    </div>
                </div>
            </div>
        </Modal>
    )
}
