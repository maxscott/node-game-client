var drawRegularPolygon = require('./shared/util').drawRegularPolygon;
var Warbler = require('./shared/Warbler');
var colors = require('./colors');

function outsideCanvas (thing, canvas) {
  return thing.x > canvas.width + 20 || thing.x < -20 ||
    thing.y > canvas.height + 20 || thing.y < -20;
}

function initialize (canvas, ctx, window, io) {
  canvas.style.backgroundColor = colors.background;
  canvas.width = 400;
  canvas.height = 300;

  var gameObjs = [];

  io.on('left', function (message) {
    var thingsToRemove = gameObjs.filter(function (a) {
      return a.id === message.who || a.owner.id === message.who;
    });
    if (thingsToRemove.length > 0) {
      var index = gameObjs.indexOf(leftArr[0]);
      gameObjs.splice(index, 1);
    }
  });

  io.on('joined', function (message) {
    for (var i in message.players) {
      var newPlayer = new Warbler(message.players[i]);
      newPlayer.id = i;
      if (i === io.id) {
        newPlayer.init(canvas, window);
      }

      gameObjs.push(newPlayer);
    }
  });


  var lastTime = Date.now();

  requestAnimationFrame(function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i in gameObjs) {
      gameObjs[i].render(ctx);
    }

    var now = Date.now();
    var dt = now - lastTime;
    var actionsTemp = null;

    for (var i in gameObjs) {
      if (gameObjs[i].getCurrentActions) {
        actionsTemp = gameObjs[i].getCurrentActions();
      }

      gameObjs[i].update(dt, gameObjs, actionsTemp);

      if (outsideCanvas(gameObjs[i], canvas)) {
        gameObjs.splice(i, 1);
      }
    }
    lastTime = now;
    requestAnimationFrame(main);
  });
}

exports.initialize = initialize;
