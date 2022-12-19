const drawAxis = (
  ctx: CanvasRenderingContext2D,
) => {
  const x = ctx.canvas.width;
  const y = ctx.canvas.height;

  ctx.fillStyle = "#fff2";
  ctx.fillRect(0, 0, x, 1);
  ctx.fillRect(0, 0, 1, y);
};

const drawProfileGrid = (
  ctx: CanvasRenderingContext2D,
  resolution: number
) => {
  const x = ctx.canvas.width;
  const y = ctx.canvas.height;

  ctx.strokeStyle = "#fff2";
  for (let i = 0; i < resolution; ++i) {
    const t = i / (resolution - 1);
    const r = x / 2;
    const px = Math.sin(t * Math.PI / 2) * r;
    const py = -Math.cos(t * Math.PI / 2) * r;

    ctx.beginPath();

    ctx.moveTo(x / 2, y);
    ctx.lineTo(x / 2 + px, y + py);

    if (i > 0) {
      ctx.moveTo(x / 2, y);
      ctx.lineTo(x / 2 - px, y + py);
    }

    ctx.stroke();
  }
};

export {
  drawAxis,
  drawProfileGrid
}
