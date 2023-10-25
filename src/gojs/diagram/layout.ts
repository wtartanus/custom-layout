import * as go from 'gojs';

export class Layout extends go.GridLayout {
    constructor() {
        super();
    }

    doLayout(coll: go.Diagram | go.Group | go.Iterable<go.Part>): void {
        super.doLayout(coll);

        const nodeWidth = this.diagram.nodes.first()?.actualBounds.width || 0;
        const nodeHeight = this.diagram.nodes.first()?.actualBounds.height || 0;
        const rowSize = Math.floor(this.diagram.div.offsetWidth / (nodeWidth + this.spacing.width));

        let x = this.arrangementOrigin.x;
        let y = this.arrangementOrigin.y;

        const rearrangedNodes = this.rearrangeNodeArray(rowSize);
        rearrangedNodes.forEach((node, i) => {            
            node.move(new go.Point(x, y));

            x += nodeWidth + this.spacing.width;

            if ((i + 1) % rowSize === 0) {
                x = this.arrangementOrigin.x;
                y += nodeHeight + this.spacing.height;
            }
        });

        return null;
    }

    private rearrangeNodeArray(rowSize: number) : go.Node[] {
        const nodeArray = [];
        const iterator = this.diagram.nodes.iterator;
        while (iterator.next()) {
            const node = iterator.value;
            nodeArray.push(node);
        }

        nodeArray.sort((a, b) => a.data.text.localeCompare(b.data.text));

        const matrix = [];
        for (let i = 0; i < nodeArray.length; i += rowSize) {
            matrix.push(nodeArray.slice(i, i + rowSize));
        }

        for (let i = 0; i < matrix.length; i++) {
            // Check if the subarray should be reversed
            if (i % 4 === 2 || i % 4 === 3) {
              matrix[i] = matrix[i].reverse();
            }
          }

          return [].concat(...matrix);
    }
}