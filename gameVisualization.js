const width = window.innerWidth || document.documentElement.clientWidth;
const height = window.innerHeight || document.documentElement.clientHeight;

const canvas = document.getElementById('game');

const size = 30;

game = new GameSimulation(size);
let pause = true;

let cellSize = Math.floor((height - 50) / size);
if (width < height) {
  cellSize = Math.floor((width - 50) / size);
}

const canvasSize = cellSize * size;
canvas.width = canvasSize;
canvas.height = canvasSize;

canvas.addEventListener('click', function(e) {
  const mouseX = e.pageX - canvas.offsetLeft;
  const mouseY = e.pageY - canvas.offsetTop;

  const col = Math.floor(mouseX / cellSize);
  const row = Math.floor(mouseY / cellSize);
  console.log(row, col);
  game.bearEntity(row, col);
  updateCanvas();
}, false);

document.addEventListener('keypress', function(e) {
  if (e.key = ' ') {
    if (pause) {
      pause = false;
    } else {
      pause = true;
    }
  }
})

const gctx = canvas.getContext('2d');
gctx.strokeRect(0, 0, canvasSize, canvasSize);

const updateCanvas = function() {
  gctx.clearRect(0, 0, canvasSize, canvasSize);
  gctx.strokeRect(0, 0, canvasSize, canvasSize);
  const entities = game.getEntities();
  for (var row = 0; row < game.size; row++) {
    const startPosY = row * cellSize;
    for (var col = 0; col < game.size; col++) {
      const startPosX = col * cellSize;
      if (entities[row][col]) {
        gctx.fillRect(startPosX, startPosY, cellSize, cellSize);
      } else {
        gctx.strokeRect(startPosX, startPosY, cellSize, cellSize);
      }
    }
  }
};
updateCanvas();

const gameLoop = function() {
  if (!pause) {
    updateCanvas();
    game.update();
  }
  setTimeout(gameLoop, 300);
}
gameLoop();
