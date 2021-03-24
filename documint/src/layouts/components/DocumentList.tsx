import React from 'react'
import { promises as fs } from 'fs'

interface DocListState {
    files: string[]
}

class DocumentList extends React.Component<any, DocListState> {
    constructor(props: any) {
        super(props)
        this.state = {
            files: []
        }
    }

    async componentDidMount() {
        let fileList = await fs.readdir('resources/docs')
        this.setState({
            files: fileList
        })
    }

    render() {
        return (
            <nav className="DocumentList">
                {this.state.files.map(file => <button key={file}>{file}</button>)}
            </nav>
        )
    }
}

export default DocumentList