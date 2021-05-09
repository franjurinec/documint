import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { GlobalState } from '../../redux/reducer'
import { readMarkdownFile, readMarkdownFileAsHTML, saveMarkdownFile } from '../../utils/fileHandler'

export const ContentDisplay = () => {
    const openFile = useSelector<GlobalState, GlobalState["currentFile"]>((state) => state.currentFile)

    const [content, setContent] = useState<string>("<p>No file is open.<p>")
    const [edit, setEdit] = useState<boolean>(false);

    useEffect(() => {
        if (openFile) {
            setEdit(false)
            readMarkdownFileAsHTML(openFile).then(htmlContent => setContent(htmlContent))
        }
    }, [openFile])

    const onEdit = () => {
        if (!openFile) return
        readMarkdownFile(openFile).then(mdContent => setContent(mdContent))
        setEdit(true)
    }

    const onSave = () => {
        if (!openFile) return
        saveMarkdownFile(openFile, content).then(() => {
            readMarkdownFileAsHTML(openFile).then(htmlContent => setContent(htmlContent))
        })
        setEdit(false)
    }

    const onCancel = () => {
        if (!openFile) return
        readMarkdownFileAsHTML(openFile).then(htmlContent => setContent(htmlContent))
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