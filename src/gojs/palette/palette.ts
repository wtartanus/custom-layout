import * as go from 'gojs';

const $ = go.GraphObject.make;

export const createPalette = (paletteDiv: HTMLDivElement) => {
    const palette = $(go.Palette, paletteDiv);

    palette.nodeTemplateMap = new go.Map([
        { key: '', value: $(
            go.Node,
            $(
                go.Panel,
                go.Panel.Auto,
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

    palette.model.nodeDataArray = [{}];

    palette.padding = 20;
}
