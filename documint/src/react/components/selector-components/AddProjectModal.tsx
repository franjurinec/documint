import React, { useState } from "react"
import { Project } from "../../../types/types"
import { getDirectoryDialog } from "../../../utils/dialogService"
import { Modal } from "../common/Modal"

export const AddProjectModal = (args: { show: boolean, onClose: () => void, onAdd: (project: Project) => void }) => {

    const initialProjectState: Project = {
        name: "",
        type: "LOCAL",
        path: ""
    }

    const [projectSettings, setProjectSettings] = useState<Project>(initialProjectState)

    const setProjectType = (type: Project['type']) => {
        setProjectSettings({
            ...projectSettings,
            type: type
        })
    }

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case 'name':
                setProjectSettings({
                    ...projectSettings,
                    name: e.target.value

                })
                break;
            case 'path':
                setProjectSettings({
                    ...projectSettings,
                    path: e.target.value
                })
                break;
        }
    }

    const onSearchDirectory = () => {
        getDirectoryDialog().then(path => {
            if (path !== undefined) {
                setProjectSettings({
                    ...projectSettings,
                    path: path
                })
            }
        })
    }

    return (
        <Modal show={args.show} onClose={args.onClose}>
            <div className="border py-10 px-20 rounded-lg shadow-lg">
                <div className="flex flex-row justify-center mb-10 w-full">
                    <div className={"py-1 px-2 rounded-l font-medium text-center flex-grow" + (projectSettings.type === "LOCAL" ? " bg-mint text-white" : " bg-gray-100 text-gray-500")}
                        onClick={() => setProjectType("LOCAL")}>
                        LOCAL
                    </div>
                    <div className={"py-1 px-2 rounded-r font-medium text-center flex-grow" + (projectSettings.type === "REMOTE" ? " bg-mint text-white" : " bg-gray-100 text-gray-500")}
                        onClick={() => setProjectType("REMOTE")}>
                        REMOTE
                    </div>
                </div>

                <form className="flex flex-col items-center gap-2 m-0">
                    <input className="border-b m-1 outline-none w-72"
                        placeholder="Project Name"
                        type="text" name="name"
                        value={projectSettings.name}
                        onChange={(e) => handleFormChange(e)} />
                    <div className="flex flex-row w-72 border-b m-1">
                        <input className="outline-none flex-grow"
                            placeholder={projectSettings.type === "LOCAL" ? "Path" : "URL"}
                            type="text"
                            name="path"
                            value={projectSettings.path}
                            onChange={(e) => handleFormChange(e)} />

                        {projectSettings.type === "LOCAL" &&
                            <div className="text-gray-500 hover:text-gray-700"
                                onClick={() => onSearchDirectory()}>
                                <i className="fas fa-folder-open"></i>
                            </div>
                        }
                    </div>

                </form>

                <div className="flex flex-row justify-between w-full mt-5">
                    <div className="bg-mint w-20 text-center text-white rounded py-1 px-2 select-none hover:bg-opacity-60 active:bg-opacity-80"
                        onClick={() => args.onClose()}>
                        Cancel
                    </div>
                    <div className="bg-mint w-20 text-center text-white rounded py-1 px-2 select-none hover:bg-opacity-60 active:bg-opacity-80"
                        onClick={() => { args.onAdd(projectSettings); args.onClose(); setProjectSettings(initialProjectState) }}>
                        Add
                    </div>
                </div>
            </div>
        </Modal>
    )
}