import React from 'react';
import { FileNav } from './components/FileNav';
import { ContentDisplay } from './components/ContentDisplay';
import { InnerNav } from './components/InnerNav';
import { Header } from './components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalState } from '../redux/reducer';
import { Welcome } from './components/Welcome';
import { getProjectList } from '../utils/fileHandler';
import { loadProjects } from '../redux/actions';

export const App = () => {
    const projectOpen = useSelector<GlobalState, GlobalState["projectOpen"]>(state => state.projectOpen)

    if (projectOpen) {
        return (
            <div className="App">
                <Header />
                <FileNav />
                <ContentDisplay />
                <InnerNav />
            </div>
        )
    } else {
        // Load basic app state
        const dispatch = useDispatch()
        getProjectList().then(projects => {
            console.log(projects)
            dispatch(loadProjects(projects))
        })

        return (
            <div className="App">
                <Header />
                <Welcome />
            </div>
        )
    }

}
