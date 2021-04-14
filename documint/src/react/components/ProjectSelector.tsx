import React from 'react'
import { useDispatch } from 'react-redux'
import { setProject } from '../../redux/actions'

export const ProjectSelector = () => {
    const dispatch = useDispatch()

    const openProject = () => {
        dispatch(setProject("sampleProject"))   
    }

    return (
        <div className="ProjectSelector">
            <select name="project">
                <option>/sample/project/url</option>
            </select>
            <button onClick={() => openProject()}>Open</button>
        </div>
    )
}