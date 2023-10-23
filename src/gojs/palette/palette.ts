import * as go from 'gojs';

const $ = go.GraphObject.make;

export const createPalette = (paletteDiv: HTMLDivElement) => {
    const palette = $(go.Palette, paletteDiv);

    palette.padding = 20;
}
