import React from 'react';
import { FileNav } from './components/FileNav';
import { ContentDisplay } from './components/ContentDisplay';
import { InnerNav } from './components/InnerNav';
import { Header } from './components/Header';
import { useSelector } from 'react-redux';
import { GlobalState } from '../redux/reducer';
import { ProjectSelector } from './components/ProjectSelector';

export const App = () => {
    const currentProject = useSelector<GlobalState, GlobalState["currentProject"]>(state => state.currentProject)

    if (currentProject !== undefined) {
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
                <div className="Welcome">
                    <div className="hero-container">
                        <img className="hero-icon" src="../static/graphics/logo.svg" alt="Documint Logo"></img>
                        <p className="hero-text">Documint</p>
                    </div>
                    <ProjectSelector />
                </div>
            </div>
        )
    }

}
