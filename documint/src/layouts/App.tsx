import React, { useState } from 'react';
import { promises as fs } from 'fs'
import MarkdownIt from 'markdown-it';
import { FileNav}  from './components/FileNav';
import { ContentDisplay}  from './components/ContentDisplay';
import { InnerNav}  from './components/InnerNav';
import { Header}  from './components/Header';

const md = new MarkdownIt();

interface AppProps {
  htmlContent: string;
}

export const App = () => {
  const [state, setState] = useState<AppProps>({ htmlContent: "<p>No open document.</p>" });

  const openFile = async (file: String) => {
    console.log("Attempting to display file: " + file)
    let htmlString = await fs.readFile('resources/docs/' + file, 'utf-8')
      .then(markdownString => md.render(markdownString))
    setState({
      htmlContent: htmlString
    })
  }

  return (<div className="App">
    <Header />
    <FileNav openFile={(file: string) => openFile(file)} />
    <ContentDisplay htmlContent={state.htmlContent} />
    <InnerNav />
  </div>)
}
