import React from 'react';
import { ProjectSelector } from './ProjectSelector';

export const Welcome = () => (
    <div className="Welcome">
        <div className="hero-container">
            <img className="hero-icon" src="../static/graphics/logo.svg" alt="Documint Logo"></img>
            <p className="hero-text">Documint</p>
        </div>
        <ProjectSelector />
    </div>
)