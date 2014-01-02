/*TODO: need to refactor this to be more readable and easier to modify in the future.
  I don't like this pattern with inheritance all nested in the same place. 
  Maybe is better just to use the prototype pattern and use this when needed.
*/
var Primitive = Primitive || {};

(function ( Primitive ) {

  //private scope of this module
  function deg2rad(ang) {
      return ang * (Math.PI/180.0);
  }
    
  // A Rectangle is an encapsulation of the canvas.fill to draw rectagles
  Primitive.Rectangle = function(x, y, width, height){
    
    // private properties
    var color = "rgb(200,0,0)";
    
    var pub = {};
    
    pub.x = x;
    pub.y = y;
    pub.width = width;
    pub.height = height;
    
    return pub;    
  }
  
  Primitive.Rectangle.prototype.draw = function (ctx) {
    ctx.fillStyle = pub.color;
    ctx.fillRect(pub.x, pub.y, pub.width, pub.height);
  }
                        
  Primitive.Rectangle.prototype.setColor = function (newColor){
    color = newColor;
  }
    
  // A Polygon is a closed path that draws a regular polygon of N sides
  Primitive.Polygon = function(x, y, size, numSides){
    
    var color       = "rgb(0,250,0)"
      , colorFill   = "rgb(200,250,200)"
      , lineWidth   = "3";
      
    
    var updatePoints = function(){
      var angle   = deg2rad(360/pub.numSides);
      var initAngle = deg2rad(pub.rotateAngle);
      pub.points  = []; 
      for(var i=0; i<pub.numSides; i++){
        pub.points[i] = {
          x: pub.x+(Math.cos(initAngle+angle*i)*pub.size), 
          y: pub.y+(Math.sin(initAngle+angle*i)*pub.size) 
        };
      }
    };
    
    var pub = {
      x: x,
      y: y,
      size: size,
      numSides: numSides,
      rotateAngle: 0
    };
    
    pub.draw = function(ctx){
      ctx.strokeStyle = color;
      ctx.lineWidth   = lineWidth;
      ctx.fillStyle   = colorFill;
      ctx.beginPath();
      for(var index in pub.points){        
        if(index == 0)
          ctx.moveTo(pub.points[index].x, pub.points[index].y);
        else
          ctx.lineTo(pub.points[index].x, pub.points[index].y);            
      }
      ctx.fill();
      if(lineWidth > 0){
        ctx.lineTo(pub.points[0].x, pub.points[0].y);        
        ctx.stroke();
      }
      if(debugON){
        ctx.fillStyle = "red";
        ctx.fillRect(pub.x-1, pub.y-1, 2, 2);
      }
    };
    
    pub.setColor = function (newColor){
      color = newColor;
    };
    
    pub.update = function () {
      updatePoints();
    };
    
    updatePoints();
    
    return pub;      
  }

})( Primitive );

if(debug) console.log("Primitives loaded...");
