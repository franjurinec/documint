import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadFiles, openProject, setProject } from '../../redux/actions'
import { GlobalState } from '../../redux/reducer'
import { getFileList } from '../../utils/fileHandler'

export const ProjectSelector = () => {
    const dispatch = useDispatch()
    const projects = useSelector<GlobalState, GlobalState["projects"]>(state => state.projects)
    const projectName = useSelector<GlobalState, GlobalState["projectName"]>(state => state.projectName)

    const onOpenProject = () => {
        getFileList(projectName).then(files => dispatch(loadFiles(files)))
        dispatch(openProject())
    }

    const onSelectProject = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setProject(e.currentTarget.value))
    }

    if (projects.length > 0) dispatch(setProject(projects[0]))

    return (
        <div className="ProjectSelector">
            <select onChange={onSelectProject}>
                {projects.map(project => <option key={project} value={project}>{project}</option>)}
            </select>
            <button onClick={onOpenProject}>Open</button>
        </div>
    )
}