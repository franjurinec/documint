import { url } from 'node:inspector'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setProjectList, setFilesList, setOpenProject } from '../../redux/actions'
import { GlobalState } from '../../redux/reducer'
import { Project } from '../../types/types'
import { getFileList, getProjectList } from '../../utils/fileHandler'
import { getToken } from '../../utils/remoteHandler'

export const ProjectSelector = () => {
    const dispatch = useDispatch()
    const projects = useSelector<GlobalState, GlobalState["projects"]>(state => state.projects)

    const [selectedProject, setSelectedProject] = useState<Project|undefined>(undefined)
    const [remoteProjectSettings, setRemoteProjectSettings] = useState<{url:string,username:string,password:string}>({url:"",username:"",password:""})

    useEffect(() => {
        getProjectList().then(projectList => {
            dispatch(setProjectList(projectList))
            setSelectedProject(projectList[0])
        })
    }, []);

    const onOpenProject = () => {
        if (selectedProject != undefined) {
            dispatch(setOpenProject(selectedProject))
            getFileList(selectedProject).then(files => dispatch(setFilesList(files)))
        }
    }

    const onSelectProject = (value: any) => {
        if (typeof value === 'number') {
            setSelectedProject(projects[value])
        }
    }

    const onOpenRemoteProject = () => {        
        getToken(remoteProjectSettings.url, remoteProjectSettings.username, remoteProjectSettings.password).then(token => {
            if (token === undefined) 
            return

            let project: Project = {
                name: 'Remote',
                type: 'REMOTE',
                path: remoteProjectSettings.url,
                token: token
            }
            dispatch(setOpenProject(project))
            getFileList(project).then(files => dispatch(setFilesList(files)))
        })
    }

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case 'url':
                setRemoteProjectSettings({
                    ...remoteProjectSettings,
                    url: e.target.value
                })
                break;
            case 'username':
                setRemoteProjectSettings({
                    ...remoteProjectSettings,
                    username: e.target.value
                })
                break;
            case 'password':
                setRemoteProjectSettings({
                    ...remoteProjectSettings,
                    password: e.target.value
                })
                break;
        }
        
    }

    return (
        <div className="ProjectSelector">
            <div className="flex flex-row justify-center">
                <select className="outline-none" onChange={(e) => onSelectProject(e.currentTarget.value)}>
                    {projects.map((project, index) => <option key={index} value={index}>{project.name}</option>)}
                </select>
                <div className="bg-mint text-white rounded py-1 px-2 m-2 select-none hover:bg-opacity-60 active:bg-opacity-80" onClick={onOpenProject}>Open</div>
            </div>

            <form className="flex flex-col items-center gap-2">
                <input className="rounded bg-gray-100 p-3 outline-none w-72" placeholder="URL" type="text" name="url" value={remoteProjectSettings.url} onChange={(e) => handleFormChange(e)}/>
                <input className="rounded bg-gray-100 p-3 outline-none w-72" placeholder="Name" type="text" name="username" value={remoteProjectSettings.username} onChange={(e) => handleFormChange(e)}/>
                <input className="rounded bg-gray-100 p-3 outline-none w-72" placeholder="Password" type="text" name="password" value={remoteProjectSettings.password} onChange={(e) => handleFormChange(e)}/>
                <div className="bg-mint w-48 text-center text-white rounded py-1 px-2 m-2 select-none hover:bg-opacity-60 active:bg-opacity-80" onClick={onOpenRemoteProject}>Connect Remote</div>
            </form>
        </div>
        
    )
}