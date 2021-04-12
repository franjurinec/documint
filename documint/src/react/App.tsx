import React from 'react';
import { FileNav } from './components/FileNav';
import { ContentDisplay } from './components/ContentDisplay';
import { InnerNav } from './components/InnerNav';
import { Header } from './components/Header';

export const App = () => (
    <div className="App">
        <Header />
        <FileNav />
        <ContentDisplay />
        <InnerNav />
    </div>
)
