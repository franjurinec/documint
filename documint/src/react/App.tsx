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
            <div className="App bg-gray-50">
                <Header />
                <div className="z-0 flex flex-row -mt-8 pt-8 h-full justify-center overflow-y-hidden">
                    <FileNav />
                    <ContentDisplay />
                    <InnerNav />
                </div>
            </div>
        )
    } else {
        return (
            <div className="App">
                <Header />
                <div className="Welcome flex flex-col items-center pt-60">
                    <div className="hero-container">
                        <img className="hero-icon max-h-96" src="../static/graphics/logo.svg" alt="Documint Logo"></img>
                        <p className="hero-text text-9xl text-gray-400">Documint</p>
                    </div>
                    <ProjectSelector />
                </div>
            </div>
        )
    }

}
