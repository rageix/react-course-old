import "lazysizes/lazysizes.min.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import MainView from "./View/MainView";

const root = createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <MainView/>
    </StrictMode>
);
