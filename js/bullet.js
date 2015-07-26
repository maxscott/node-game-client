var drawRegularPolygon = require('util').drawRegularPolygon;

var Bullet = function Bullet (warbler) {
  this.x = warbler.x;
  this.y = warbler.y;
  this.radius = 10;
  this.speed = 300;
  this.color = 'yellow';
  this.color2 = 'black';
  this.offset = Math.random();
  var dx = warbler.x - warbler.pointedX;
  var dy = warbler.y - warbler.pointedY;
  this.xSlope = dx/dy;
  this.ySlope = dy/dx;
}

Bullet.prototype.update = function update (dt) {
  var adjSpeed = this.speed * dt/1000;
  this.x += adjSpeed * this.xSlope;
  this.y += adjSpeed * this.ySlope;
}

Bullet.prototype.render = function render (ctx) {
  drawRegularPolygon(ctx, this.x, this.y, this.radius/2, this.radius, this.offset, true, this.color, true, this.color2, 10);
}

module.exports = Bullet;
