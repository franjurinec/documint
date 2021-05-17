import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setProjectList, setFilesList, setOpenProject, addProjectToList } from '../../redux/actions'
import { GlobalState } from '../../redux/reducer'
import { Project } from '../../types/types'
import { getDirectoryDialog } from '../../utils/dialogHandler'
import { appendProjectsFile, getFileList, getProjectList } from '../../utils/fileHandler'
import { getToken } from '../../utils/remoteHandler'
import { Modal } from './Modal'

export const ProjectSelector = () => {
    const dispatch = useDispatch()
    const projects = useSelector<GlobalState, GlobalState["projects"]>(state => state.projects)

    const [showAddProjectModal, setShowAddProjectModal] = useState<boolean>(false)
    const [showConnectRemoteModal, setShowConnectRemoteModal] = useState<boolean>(false)
    const [remoteProject, setRemoteProject] = useState<Project | undefined>(undefined)

    const updateProjectList = () => getProjectList().then(projectList => dispatch(setProjectList(projectList)))

    // Executes exactly once once ProjectSelector is mounted
    useEffect(() => {
        updateProjectList()
    }, []);

    const onAddProject = (project: Project) => {
        dispatch(addProjectToList(project))
        appendProjectsFile(project).then(updateProjectList)
    }

    const onOpenProject = (project: Project) => {
        if (project.type === "LOCAL") {
            dispatch(setOpenProject(project))
            getFileList(project).then(files => dispatch(setFilesList(files)))
        }

        if (project.type === "REMOTE") {
            setRemoteProject(project)
            setShowConnectRemoteModal(true)
        }
    }

    const onCancelRemote = () => {
        setRemoteProject(undefined)
        setShowConnectRemoteModal(false)
    }

    const onConnectRemote = (project: Project, username: string, password: string) => {
        getToken(project.path, username, password).then(token => {
            if (token === undefined)
                return
            project.token = token
            dispatch(setOpenProject(project))
            getFileList(project).then(files => dispatch(setFilesList(files)))
        })
    }

    return (
        <div className="ProjectSelector flex flex-row items-center justify-center -mt-8 pt-8 h-full w-full gap-10 select-none">
            {/* HERO BANNER */}
            <div className="flex flex-col">
                <img className="hero-icon max-h-64" src="../static/graphics/logo.svg" alt="Documint Logo"></img>
                <p className="hero-text text-9xl text-gray-400">Documint</p>
            </div>

            {/* List saved projects */}
            <div className="flex flex-col gap-2 justify-center border-l border-mint p-10">
                <div onClick={() => setShowAddProjectModal(true)}
                    className="p-3 bg-mint rounded font-bold text-white text-center hover:bg-opacity-60 active:bg-opacity-80 w-96">
                    <i className="fas fa-plus mr-1"></i>Add Project
                </div>
                {projects.map((project, index) => {
                    return (
                        <div className="flex flex-col p-3 gap-1 bg-gray-200 rounded hover:bg-opacity-60 active:bg-opacity-80"
                            key={index}
                            onClick={() => onOpenProject(project)}>
                            <div className="flex justify-between">
                                <div>{project.name}</div>
                                <div className="text-xs font-semibold">{project.type}</div>
                            </div>
                            <div className="text-xs">{project.path}</div>

                        </div>
                    )
                })}
            </div>

            <AddProjectModal show={showAddProjectModal} onClose={() => setShowAddProjectModal(false)} onAdd={onAddProject} />
            <ConnectRemoteModal show={showConnectRemoteModal} onClose={onCancelRemote} project={remoteProject} onConnect={onConnectRemote} />
        </div>

    )
}

const AddProjectModal = (args: { show: boolean, onClose: () => void, onAdd: (project: Project) => void }) => {

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

const ConnectRemoteModal = (args: {
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
