import * as go from 'gojs';

import { createDiagram } from './gojs/diagram/diagram';
import { createPalette } from './gojs/palette/palette';

import './styles.css';

window.addEventListener('load', () => {
    const diagramDiv = document.getElementById('diagram') as HTMLDivElement;
    const diagram = createDiagram(diagramDiv);

    const paletteDiv = document.getElementById('palette') as HTMLDivElement;
    createPalette(paletteDiv);
});
