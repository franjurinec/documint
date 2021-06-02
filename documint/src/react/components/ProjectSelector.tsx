import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setProjectList, setFilesList, setOpenProject, addProjectToList } from '../../redux/actions'
import { GlobalState } from '../../redux/reducer'
import { Project } from '../../types/types'
import { appendProjectsFile, getFileList, getProjectList, removeFromProjectsFile } from '../../utils/fileHandler'
import { getToken } from '../../utils/remoteHandler'
import { AddProjectModal } from './selector-components/AddProjectModal'
import { ConnectRemoteModal } from './selector-components/ConnectRemoteModal'

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
        <div className="flex flex-row items-center justify-center h-full w-full gap-10 select-none">
            {/* HERO BANNER */}
            <div className="hidden flex-col xl:flex">
                <img className="hero-icon max-h-64" src="../static/graphics/logo.svg" alt="Documint Logo"></img>
                <p className="hero-text text-9xl text-gray-400">Documint</p>
            </div>

            {/* List saved projects */}
            <div className="flex flex-col gap-2 justify-center xl:border-l border-mint pl-10 py-10 w-96">
                <div onClick={() => setShowAddProjectModal(true)}
                    className="p-3 bg-mint rounded font-bold text-white text-center hover:bg-opacity-60 active:bg-opacity-80">
                    <i className="fas fa-plus mr-1"></i>Add Project
                </div>
                {projects.map((project, index) => {
                    return (
                        <div className="flex flex-col p-3 gap-1 bg-gray-200 rounded hover:bg-opacity-60 active:bg-opacity-80"
                            key={index}
                            onClick={() => onOpenProject(project)}>
                            <div className="flex flex-row justify-between gap-2">
                                <div className="flex-grow truncate">{project.name}</div>
                                <div className="text-xs font-semibold">{project.type}</div>
                            </div>
                            <div className="flex flex-row justify-between gap-2">
                                <div className="flex-grow text-xs truncate">{project.path}</div>
                                <div className="text-gray-500 hover:text-gray-700"
                                    onClick={(e) => {e.stopPropagation(); removeFromProjectsFile(project).then(updateProjectList)}}><i className="fas fa-trash"></i>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <AddProjectModal show={showAddProjectModal} onClose={() => setShowAddProjectModal(false)} onAdd={onAddProject} />
            <ConnectRemoteModal show={showConnectRemoteModal} onClose={onCancelRemote} project={remoteProject} onConnect={onConnectRemote} />
        </div>

    )
}



