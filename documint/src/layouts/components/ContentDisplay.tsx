import React, { useEffect, useState } from 'react'

interface ContentDisplayProps {
    htmlContent: string
}

export const ContentDisplay = (props: ContentDisplayProps) => {
    const [state, setState] = useState<ContentDisplayProps>(props)

    useEffect(() => {
        setState(props)
    })
    
    return (
        <div className="ContentDisplay" dangerouslySetInnerHTML={{ __html: state.htmlContent }}>
        </div>
    )
}