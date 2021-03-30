import React from 'react';
import { promises as fs } from 'fs'
import MarkdownIt from 'markdown-it';
import DocumentList from './components/DocumentList'

const md = new MarkdownIt();

interface AppState {
  htmlContent: string;
}

class App extends React.Component<any, AppState> {

  constructor(props: any) {
    super(props)
    this.state = {
      htmlContent: "No open document."
    }
  }

  async openFile(file: string) {
    let htmlString = await fs.readFile('resources/docs/' + file, 'utf-8')
      .then(markdownString => md.render(markdownString))

    this.setState({
      htmlContent: htmlString
    })
  }

  async getFileASHTML(file: string): Promise<{ __html: string; } | undefined> {
    if (!file) {
      return {
        __html: 'No file open.'
      }
    } else {

    }
  }

  render() {
    return (
      <div className="App"> 
        <DocumentList openFile={(file: string) => this.openFile(file)} />
        <div id="content-view" dangerouslySetInnerHTML={{__html: this.state.htmlContent}}></div>
        <nav id="sidebar-right"></nav>
      </div>
    )
  }
}

export default App;