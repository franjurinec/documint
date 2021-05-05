import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { GlobalState } from '../../redux/reducer'
import { readMarkdownFile, readMarkdownFileAsHTML, saveMarkdownFile } from '../../utils/fileHandler'

export const ContentDisplay = () => {
    const projectName = useSelector<GlobalState, GlobalState["projectName"]>(state => state.projectName)
    const openFile = useSelector<GlobalState, GlobalState["openFile"]>((state) => state.openFile)

    const [content, setContent] = useState<string>("<p>No file is open.<p>")
    const [edit, setEdit] = useState<boolean>(false);

    useEffect(() => {
        if (projectName && openFile) {
            setEdit(false)
            readMarkdownFileAsHTML(projectName, openFile).then(htmlContent => setContent(htmlContent))
        }
    }, [openFile])

    const onEdit = () => {
        readMarkdownFile(projectName, openFile).then(mdContent => setContent(mdContent))
        setEdit(true)
    }

    const onSave = () => {
        saveMarkdownFile(projectName, openFile, content).then(() => {
            readMarkdownFileAsHTML(projectName, openFile).then(htmlContent => setContent(htmlContent))
        })
        setEdit(false)
    }

    const onCancel = () => {
        readMarkdownFileAsHTML(projectName, openFile).then(htmlContent => setContent(htmlContent))
        setEdit(false)
    }
    
    if (!edit) {
        return (
            <div className="ContentDisplay">
                <div className="EditContent" onClick={onEdit}>
                    <i className="fa fa-edit"></i>
                </div>
                <div className="ContentFrame" dangerouslySetInnerHTML={{ __html: content }}>
                </div>
            </div>
        )
    } else {
        return (
            <div className="ContentDisplay">
                <div className="EditContent" onClick={onSave}>
                    <i className="fa fa-save"></i>
                </div>
                <div className="EditContent" onClick={onCancel}>
                    <i className="fa fa-times"></i>
                </div>
                <div className="ContentFrame">
                    <textarea value={content} onChange={(e) => setContent(e.target.value)}>
                    </textarea>
                </div>
            </div>
        )
    }
    
}