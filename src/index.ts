import * as go from 'gojs';

import { createDiagram } from './gojs/diagram/diagram';
import { createPalette } from './gojs/palette/palette';

import './styles.css';
import { Layout } from './gojs/diagram/layout';

window.addEventListener('load', () => {
    const diagramDiv = document.getElementById('diagram') as HTMLDivElement;
    const diagram = createDiagram(diagramDiv);

    const paletteDiv = document.getElementById('palette') as HTMLDivElement;
    createPalette(paletteDiv);

    diagram.addDiagramListener('ExternalObjectsDropped', (e: go.DiagramEvent) => {
        const selectedNodeData = e.diagram.selection.first().data;
        const text = `Element_${e.diagram.nodes.count}`

        e.diagram.model.setDataProperty(selectedNodeData, 'text', text);
        diagram.updateAllRelationshipsFromData();
    });

    const redoLayout = (e: go.DiagramEvent) => diagram.layoutDiagram(true); 
    diagram.addDiagramListener("TextEdited", redoLayout);
    diagram.addDiagramListener("PartRotated", redoLayout);
    diagram.addDiagramListener("ExternalObjectsDropped", redoLayout);
    diagram.addDiagramListener("LostFocus", redoLayout);
    diagram.addDiagramListener("SelectionMoved", redoLayout);

    const switchButton = document.getElementsByClassName('form-check-input')[0] as HTMLInputElement;

    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.ctrlKey && e.key === "l") {
            diagram.layout = new Layout();
            diagram.layoutDiagram(true);
            diagram.layout = new go.Layout();
        }
    }
    switchButton.onchange = (e: Event) => {
        const checkbox = e.target as HTMLInputElement;

        const label = document.getElementsByClassName('form-check-label')[0] as HTMLLabelElement;
        
        if (checkbox.checked) {
            diagram.layout = new Layout();
            label.innerHTML = 'Auto';
            document.removeEventListener("keydown", handleKeyPress);
        } else {
            label.innerHTML = 'Manual';
            diagram.layout = new go.Layout();
            document.addEventListener("keydown", handleKeyPress);
        }
    }

});
