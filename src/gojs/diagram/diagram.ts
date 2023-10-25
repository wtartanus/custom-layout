import * as go from 'gojs';

import { Layout } from './layout';
const $ = go.GraphObject.make;

const handleTextDoubleClick = (e: go.InputEvent, obj: go.GraphObject) => {
    if (obj instanceof go.TextBlock) {
        obj.editable = true;
    }
}

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
                $(
                    go.TextBlock,
                    { doubleClick: handleTextDoubleClick },
                    new go.Binding('text', 'text').makeTwoWay(),
                    new go.Binding('editable', 'editable').ofObject()
                )
            )
        ) },
    ]);

    const textEditingTool = new go.TextEditingTool();
    diagram.toolManager.textEditingTool = textEditingTool;

    diagram.layout = new Layout();

    (window as any).goJsDiagram = diagram;
    
    return diagram;
}