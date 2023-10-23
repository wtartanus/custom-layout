import * as go from 'gojs';

const $ = go.GraphObject.make;

export const createDiagram = (diagramDiv: HTMLDivElement) => {
    const diagram = $(go.Diagram, diagramDiv);

    (window as any).goJsDiagram = diagram;
    
    return diagram;
}