import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {ProjectState} from '../../redux/reducers/projectReducer'

export const ContentDisplay = () => {
    const htmlContent = useSelector<ProjectState, ProjectState["displayedContent"]>((state) => state.displayedContent)
    
    return (
        <div className="ContentDisplay" dangerouslySetInnerHTML={{ __html: htmlContent }}>
        </div>
    )
}