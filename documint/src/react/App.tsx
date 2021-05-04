import React from 'react';
import { FileNav } from './components/FileNav';
import { ContentDisplay } from './components/ContentDisplay';
import { InnerNav } from './components/InnerNav';
import { Header } from './components/Header';
import { useSelector } from 'react-redux';
import { GlobalState } from '../redux/reducer';
import { Welcome } from './components/Welcome';

export const App = () => {
    const projectName = useSelector<GlobalState, GlobalState["projectName"]>(state => state.projectName)

    if (projectName !== "") {
        return (
            <div className="App">
                <Header />
                <FileNav />
                <ContentDisplay />
                <InnerNav />
            </div>
        )
    } else {
        return (
            <div className="App">
                <Header />
                <Welcome />
            </div>
        )
    }

}
