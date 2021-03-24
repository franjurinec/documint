import React from 'react';
import DocumentList from './components/DocumentList'

class App extends React.Component {
  render() {
    return (
      <div id="app" className="App"> 
        <DocumentList id="sidebar-left" />
        <div id="content-view"></div>
        <nav id="sidebar-right"></nav>
      </div>
    )
  }
}

export default App;