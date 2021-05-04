import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setProjectList, setFilesList, setProject } from '../../redux/actions'
import { GlobalState } from '../../redux/reducer'
import { getFileList, getProjectList } from '../../utils/fileHandler'

export const ProjectSelector = () => {
    const dispatch = useDispatch()
    const projects = useSelector<GlobalState, GlobalState["projects"]>(state => state.projects)

    const [selectedProject, setSelectedProject] = useState<string>("")

    useEffect(() => {
        getProjectList().then(projectList => {
            dispatch(setProjectList(projectList))
            setSelectedProject(projectList[0])
        })
    }, []);

    const onOpenProject = () => {
        dispatch(setProject(selectedProject))
        getFileList(selectedProject).then(files => dispatch(setFilesList(files)))
    }

    return (
        <div className="ProjectSelector">
            <select onChange={(e) => setSelectedProject(e.currentTarget.value)}>
                {projects.map(project => <option key={project} value={project}>{project}</option>)}
            </select>
            <button onClick={onOpenProject}>Open</button>
        </div>
    )
}