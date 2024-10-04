import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <h1>All sites sidepanel extension</h1>
        <p>This side panel is enabled on all sites</p>
    </React.StrictMode>
);
