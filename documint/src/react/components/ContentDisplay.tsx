import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { GlobalState } from '../../redux/reducer'
import { readMarkdownFile, readMarkdownFileAsHTML } from '../../utils/fileHandler'

export const ContentDisplay = () => {
    const projectName = useSelector<GlobalState, GlobalState["projectName"]>(state => state.projectName)
    const openFile = useSelector<GlobalState, GlobalState["openFile"]>((state) => state.openFile)

    const [content, setContent] = useState<string>("<p>No file is open.<p>")

    useEffect(() => {
        if (projectName && openFile) {
            //if (editMode) {
            //    readMarkdownFile(projectName, openFile).then(mdContent => setContent(mdContent))
            //} else {
                console.log('Setting content to:' + openFile)
                readMarkdownFileAsHTML(projectName, openFile).then(htmlContent => setContent(htmlContent))
            //}
        }
    }, [openFile])
    
    return (
        <div className="ContentDisplay" dangerouslySetInnerHTML={{ __html: content }}>
        </div>
    )
}