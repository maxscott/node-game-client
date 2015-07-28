var drawRegularPolygon = require('util').drawRegularPolygon;
var Bullet = require('bullet');

var Warbler = function Warbler (x, y, radius, color, color2) {
  this.x = this.pointedX = x;
  this.y = this.pointedY = y;
  this.radius = radius;
  this.offset = 0;
  this.color = color;
  this.color2 = color2;
  this.keys = [];
  this.speed = 170;
  this.bulletDelay = 0;
}

Warbler.prototype.render = function (ctx) {
  drawRegularPolygon(ctx, this.x, this.y, this.radius/3, this.radius, this.offset, true, this.color, true, this.color2, 10);
  drawRegularPolygon(ctx, this.pointedX, this.pointedY, 10, 3, this.offset, true, this.color, true, this.color2, 10);
}

Warbler.prototype.update = function (dt, bullets) {
  this.bulletDelay = Math.max(this.bulletDelay - dt, -1);
  var adjSpeed = dt/1000 * this.speed;
  if (this.keys["Left"])  this.x -= adjSpeed;
  if (this.keys["Right"]) this.x += adjSpeed;
  if (this.keys["Up"])    this.y -= adjSpeed;
  if (this.keys["Down"])  this.y += adjSpeed;
  if (this.keys["U+0020"] && this.bulletDelay < 0) {
    bullets.push(new Bullet(this));
    this.bulletDelay = 120;
  }
}

Warbler.prototype.init = function (canvas, window) {
  var self = this;

  canvas.addEventListener('mousemove', function(ev) {
    self.pointedX = ev.x;
    self.pointedY = ev.y;
  });

  window.addEventListener('keydown', function(ev) {
    self.keys[ev.keyIdentifier] = true;
  });
  window.addEventListener('keyup', function(ev) {
    self.keys[ev.keyIdentifier] = false;
  });
}

module.exports = Warbler;
