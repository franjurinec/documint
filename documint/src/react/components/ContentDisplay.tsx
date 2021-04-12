import React from 'react'
import { useSelector } from 'react-redux'
import { GlobalState } from '../../redux/reducer'

export const ContentDisplay = () => {
    const htmlContent = useSelector<GlobalState, GlobalState["displayedContent"]>((state) => state.displayedContent)
    
    return (
        <div className="ContentDisplay" dangerouslySetInnerHTML={{ __html: htmlContent }}>
        </div>
    )
}