import React from 'react';
import { Header } from './components/common/Header';
import { useSelector } from 'react-redux';
import { GlobalState } from '../redux/reducer';
import { ProjectSelector } from './components/ProjectSelector';
import { ProjectDisplay } from './components/ProjectDisplay';

export const App = () => {
    const currentProject = useSelector<GlobalState, GlobalState["currentProject"]>(state => state.currentProject)

    return (
        <div className="App">
            <Header />
            <div className="z-0 -mt-8 pt-8 h-full w-full overflow-y-hidden">
                {currentProject === undefined 
                    ? <ProjectSelector />
                    : <ProjectDisplay />
                }
            </div>
        </div>
    )
    

}
