import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setFilesList } from '../../redux/actions';
import { GlobalState } from '../../redux/reducer';
import { getFileList, readMarkdownFile, readMarkdownFileAsHTML, saveMarkdownFile } from '../../utils/fileHandler';
import { htmlFromMD } from '../../utils/markdownHandler';
import { FileNav } from './display-components/FileNav';

export const ProjectDisplay = () => {
    const dispatch = useDispatch()

    const currentProject = useSelector<GlobalState, GlobalState["currentProject"]>(state => state.currentProject)
    const currentFile = useSelector<GlobalState, GlobalState["currentFile"]>((state) => state.currentFile)

    const [readTimestamp, setReadTimestamp] = useState<number>(Date.now())
    const [content, setContent] = useState<string>("<p>No file is open.<p>")
    const [edit, setEdit] = useState<boolean>(false);
    const [livePreview, setLivePreview] = useState<boolean>(false)

    useEffect(() => {
        if (currentFile !== undefined) {
            setEdit(false)
            readMarkdownFileAsHTML(currentFile).then(timestampedHtmlContent => {
                setContent(timestampedHtmlContent.content)
                setReadTimestamp(timestampedHtmlContent.readTimestamp)
            })
        } else {
            setContent("No files.")
        }
    }, [currentFile])

    const onEdit = () => {
        if (!currentFile) return
        readMarkdownFile(currentFile).then(timestampedMdContent => {
            setContent(timestampedMdContent.content)
            setReadTimestamp(timestampedMdContent.readTimestamp)
        })
        setEdit(true)
    }

    const onSave = () => {
        if (!currentFile) return
        saveMarkdownFile(currentFile, content, readTimestamp).then(() => {
            readMarkdownFileAsHTML(currentFile).then(timestampedHtmlContent => {
                setContent(timestampedHtmlContent.content)
                setReadTimestamp(timestampedHtmlContent.readTimestamp)
            })

            // Update file list in case of remote conflict
            getFileList(currentProject).then(files => dispatch(setFilesList(files)))
        })
        setEdit(false)
    }

    const onCancel = () => {
        if (!currentFile) return
        readMarkdownFileAsHTML(currentFile).then(timestampedHtmlContent => {
            setContent(timestampedHtmlContent.content)
            setReadTimestamp(timestampedHtmlContent.readTimestamp)
        })
        setEdit(false)
    }

    // RENDERING

    let fileControls = !edit ? (
        <div className="flex flex-row gap-2 justify-end border-b border-gray-900 mx-4 py-4">
            <div className="bg-mint text-white rounded py-1 px-2 select-none hover:bg-opacity-60 active:bg-opacity-80" onClick={onEdit}>
                Edit
            </div>
        </div>
    ) : (
        <div className="flex flex-row gap-2 justify-end border-b border-gray-900 mx-4 py-4">
            <div className="bg-mint text-white rounded py-1 px-2 select-none hover:bg-opacity-60 active:bg-opacity-80" onClick={() => setLivePreview(!livePreview)}>
                Toggle preview
                </div>
            <div className="bg-mint text-white rounded py-1 px-2 select-none hover:bg-opacity-60 active:bg-opacity-80" onClick={onSave}>
                Save
                </div>
            <div className="bg-mint text-white rounded py-1 px-2 select-none hover:bg-opacity-60 active:bg-opacity-80" onClick={onCancel}>
                Cancel
                </div>
        </div>
    )

    let frame = !edit ? (
        <div className="prose max-w-full w-full flex-grow overflow-y-auto p-8" dangerouslySetInnerHTML={{ __html: content }}>
        </div>
    ) : (
        <textarea className="w-full flex-grow overflow-y-auto outline-none resize-none p-8" value={content} onChange={(e) => setContent(e.target.value)}>
        </textarea>
    )

    return (
        <div className="flex flex-row justify-center w-full h-full bg-gray-100">
            <FileNav />
            <div className="max-w-screen-lg flex-grow bg-white flex flex-col">
                {fileControls}
                {frame}
            </div>

            {(livePreview && edit)
                ? (
                    <div className="prose max-w-screen-lg flex-grow bg-white px-8 pt-8 overflow-y-auto" dangerouslySetInnerHTML={{ __html: htmlFromMD(content) }}>
                    </div>
                ) : (
                    <div className="w-72 max-h-full overflow-y-auto hidden flex-col items-end 2xl:flex">
                    </div>
                )}

        </div>
    )
}
