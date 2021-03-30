import React from 'react'
import { promises as fs } from 'fs'

interface DoocumentListProps {
  openFile: (file: string) => void
}

interface DoocumentListState {
  openFile: (file: string) => void,
  files: string[]
}

class DocumentList extends React.Component<DoocumentListProps, DoocumentListState> {
  constructor(props: DoocumentListProps) {
    super(props)
    this.state = {
      openFile: props.openFile,
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
        {
          this.state.files.map(file => <button key={file} onClick={() => this.state.openFile(file)}>{file}</button>)
        }
      </nav>
    )
  }
}

export default DocumentList