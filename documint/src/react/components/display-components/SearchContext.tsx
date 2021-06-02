import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setOpenFile } from "../../../redux/actions"
import { GlobalState } from "../../../redux/reducer"
import { DocumentFile } from "../../../types/types"
import { searchFiles } from "../../../utils/searchHandler"
import { Context } from "../common/Context"

export const SearchContext = (args: { show: boolean, onClose: () => void }) => {
    const dispatch = useDispatch()

    const files = useSelector<GlobalState, GlobalState["files"]>(state => state.files)

    const [searchString, setSearchString] = useState<string>("")
    const [searchResults, setSearchResults] = useState<DocumentFile[]>([])

    useEffect(() => {
        searchFiles(files, searchString).then(results => {
            let searchRes = results
                .filter(e => e.titleMatches > 0 || e.contentMatches > 0)
                .sort((e1, e2) => e2.titleMatches - e1.titleMatches || e2.contentMatches - e1.contentMatches)
                .slice(0, 5)
                .map(e => e.file)

            setSearchResults(searchRes)
        })
    }, [searchString])

    return (
        <Context show={args.show} onClose={() => { args.onClose(); setSearchString("") }}>
            <input className="outline-none w-60 border-b" type="text" value={searchString} placeholder="Search..." onChange={(e) => setSearchString(e.target.value)}></input>
            <div className="flex flex-col gap-2">
                {searchResults.map(file => {
                    return (
                        <div key={file.path + file.name}
                            className="select-none w-full px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
                            onClick={() => { dispatch(setOpenFile(file)); args.onClose(); setSearchString("") }}>
                            {file.name}
                        </div>
                    )
                })}
            </div>
        </Context>
    )
}