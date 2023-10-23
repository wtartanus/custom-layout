import * as go from 'gojs';

const $ = go.GraphObject.make;

export const createDiagram = (diagramDiv: HTMLDivElement) => {
    const diagram = $(go.Diagram, diagramDiv);

    diagram.nodeTemplateMap = new go.Map([
        { key: '', value: $(
            go.Node,
            $(
                go.Panel,
                go.Panel.Vertical,
                $(
                    go.Shape,
                    'Rectangle',
                    {
                        fill: 'orange',
                        desiredSize: new go.Size(100, 100)
                    }
                ),
            )
        ) },
    ]);

    (window as any).goJsDiagram = diagram;
    
    return diagram;
}