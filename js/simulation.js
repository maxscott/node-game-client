var drawRegularPolygon = require('util').drawRegularPolygon;
var Warbler = require('./Warbler');
var colors = require('./colors');

function outsideCanvas (thing, canvas) {
  return thing.x > canvas.width + 20 || thing.x < -20 ||
    thing.y > canvas.height + 20 || thing.y < -20;
}

function initialize (canvas, ctx, window) {
  canvas.style.backgroundColor = colors.background;
  canvas.width = 800;
  canvas.height = 600;

  var p1 = new Warbler(50, 50, 30, colors.player1.border, colors.player1.main);
  var p2 = new Warbler(200, 200, 30, colors.player2.border, colors.player2.main);

  p1.init(canvas, window);

  var gameObjs = [ p1, p2 ];
  var lastTime = Date.now();

  requestAnimationFrame(function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (var i in gameObjs) {
      gameObjs[i].render(ctx);
    }

    var now = Date.now();
    var dt = now - lastTime;

    for (var i in gameObjs) {
      gameObjs[i].update(dt, gameObjs);

      if (outsideCanvas(gameObjs[i], canvas)) {
        gameObjs.splice(i, 1);
      }
    }
    lastTime = now;
    requestAnimationFrame(main);
  });
}

exports.initialize = initialize;
