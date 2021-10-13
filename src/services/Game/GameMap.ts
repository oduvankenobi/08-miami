export class GameMap {
    ctx: CanvasRenderingContext2D;

    static blockHeight = 25;

    static blockLineWidth = 1;

    mapField: number[][] = [[0, Infinity]];

    blockWidth = 25;

    blockHeight = GameMap.blockHeight;

    blockLineWidth = GameMap.blockLineWidth;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    closestFloor(
        ballX: number,
        ballY: number,
        containerHeight: number,
    ): number {
        for (let i = this.mapField.length - 1; i >= 0; i -= 1) {
            if (
                ballY < containerHeight - (i + 1) * this.blockHeight
                && ballX >= this.mapField[0][0] * this.blockWidth
                && ballX <= this.mapField[0][1] * this.blockWidth
            ) {
                return containerHeight - (i + 1) * this.blockHeight;
            }
        }

        return containerHeight;
    }

    drawBlock(x: number, y: number): void {
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#111E6C';
        this.ctx.lineWidth = this.blockLineWidth;
        this.ctx.rect(x, y, this.blockHeight, this.blockWidth);
        this.ctx.fillStyle = '#A1AEFC';
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.beginPath();
    }

    drawFloor(bottom: number, width: number): void {
        const commonY = bottom - this.blockHeight;
        const blocksCount = Math.ceil(width / this.blockWidth);
        for (let i = 0; i < blocksCount; i += 1) {
            this.drawBlock(i * this.blockWidth, commonY);
        }
    }

    drawMap(bottom: number, width: number): void {
        const fullBlocksCount = Math.ceil(width / this.blockWidth);

        // lvl of drawing
        for (let i = 0; i < this.mapField.length; i += 1) {
            if (this.mapField[i].length === 0) {
                // eslint-disable-next-line no-continue
                continue;
            }
            const [leftestBlockNum, rightestBlockInSchemesNum] = this.mapField[i];
            const rightestBlockNum = Math.min(
                rightestBlockInSchemesNum,
                fullBlocksCount,
            );

            for (let j = leftestBlockNum; j < rightestBlockNum; j += 1) {
                this.drawBlock(
                    j * this.blockWidth,
                    bottom - (i + 1) * this.blockHeight,
                );
            }
        }
    }
}
