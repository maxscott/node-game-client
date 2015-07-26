
function generatePoints (x, y, sides, radius, offset) {      
  var angle = 2 * Math.PI / sides;    
  var points = [];
  for (var i = 0; i < sides; i++) {
    var single = [];
    var verticeX = x + radius * Math.sin((i * angle) + offset);
    var verticeY = y + radius * Math.cos((i * angle) + offset);
    single.push(verticeX);
    single.push(verticeY);
    points.push(single);
  }    
  return points;
}

function drawRegularPolygon (context, x, y, sides, radius, offset, fill, fillColor, stroke, strokeColor, strokeWidth){
  var vertices = generatePoints(x,y,sides,radius,offset);
  context.beginPath(vertices[0][0], vertices[0][1]);
  for (var i = 0; i < vertices.length; i++){
    context.lineTo(vertices[i][0],vertices[i][1]);
  }
  context.lineTo(vertices[0][0], vertices[0][1]);
  context.closePath();
  if(fill == true)
    {
      context.fillStyle = fillColor;
      context.fill();
    }
    if (stroke == true)
      {
        context.strokeStyle = strokeColor;
        context.lineWidth = strokeWidth;
        context.stroke();
      }
}

exports.drawRegularPolygon = drawRegularPolygon;
