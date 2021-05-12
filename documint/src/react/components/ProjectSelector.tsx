import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setProjectList, setFilesList, setOpenProject } from '../../redux/actions'
import { GlobalState } from '../../redux/reducer'
import { Project } from '../../types/types'
import { getFileList, getProjectList } from '../../utils/fileHandler'

export const ProjectSelector = () => {
    const dispatch = useDispatch()
    const projects = useSelector<GlobalState, GlobalState["projects"]>(state => state.projects)

    const [selectedProject, setSelectedProject] = useState<Project|undefined>(undefined)

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

    return (
        <div className="ProjectSelector flex flex-row">
            <select className="outline-none" onChange={(e) => onSelectProject(e.currentTarget.value)}>
                {projects.map((project, index) => <option key={index} value={index}>{project.name}</option>)}
            </select>
            <div className="bg-mint text-white rounded py-1 px-2 m-2 select-none hover:bg-opacity-60 active:bg-opacity-80" onClick={onOpenProject}>Open</div>
        </div>
    )
}