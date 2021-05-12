import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { GlobalState } from '../../redux/reducer'
import { readMarkdownFile, readMarkdownFileAsHTML, saveMarkdownFile } from '../../utils/fileHandler'

export const ContentDisplay = () => {
    const currentFile = useSelector<GlobalState, GlobalState["currentFile"]>((state) => state.currentFile)

    const [content, setContent] = useState<string>("<p>No file is open.<p>")
    const [edit, setEdit] = useState<boolean>(false);

    useEffect(() => {
        if (currentFile) {
            setEdit(false)
            readMarkdownFileAsHTML(currentFile).then(htmlContent => setContent(htmlContent))
        }
    }, [currentFile])

    const onEdit = () => {
        if (!currentFile) return
        readMarkdownFile(currentFile).then(mdContent => setContent(mdContent))
        setEdit(true)
    }

    const onSave = () => {
        if (!currentFile) return
        saveMarkdownFile(currentFile, content).then(() => {
            readMarkdownFileAsHTML(currentFile).then(htmlContent => setContent(htmlContent))
        })
        setEdit(false)
    }

    const onCancel = () => {
        if (!currentFile) return
        readMarkdownFileAsHTML(currentFile).then(htmlContent => setContent(htmlContent))
        setEdit(false)
    }
    
    if (!edit) {
        return (
            <div className="ContentDisplay max-h-full w-2/5">
                <div className="flex flex-row justify-end">
                    <div className="bg-mint text-white rounded py-1 px-2 m-2 select-none hover:bg-opacity-60 active:bg-opacity-80" onClick={onEdit}>
                        Edit
                    </div>
                </div>

                <div className="ContentFrame prose max-w-full p-8 bg-white rounded shadow h-9/10 overflow-y-auto" dangerouslySetInnerHTML={{ __html: content }}>
                </div>
            </div>
        )
    } else {
        return (
            <div className="ContentDisplay max-h-full w-2/5">
                <div className="flex flex-row justify-end">
                    <div className="bg-mint text-white rounded py-1 px-2 m-2 select-none hover:bg-opacity-60 active:bg-opacity-80" onClick={onSave}>
                        Save
                    </div>
                    <div className="bg-mint text-white rounded py-1 px-2 m-2 select-none hover:bg-opacity-60 active:bg-opacity-80" onClick={onCancel}>
                        Cancel
                    </div>
                </div>

                <textarea className="ContentFrame w-full p-8 bg-white rounded shadow h-9/10 overflow-y-auto outline-none resize-none" value={content} onChange={(e) => setContent(e.target.value)}>
                </textarea>
            </div>
        )
    }
    
}