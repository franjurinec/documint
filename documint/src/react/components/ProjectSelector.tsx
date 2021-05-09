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
        <div className="ProjectSelector">
            <select onChange={(e) => onSelectProject(e.currentTarget.value)}>
                {projects.map((project, index) => <option key={index} value={index}>{project.name}</option>)}
            </select>
            <button onClick={onOpenProject}>Open</button>
        </div>
    )
}