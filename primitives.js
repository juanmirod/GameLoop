/*TODO: need to refactor this to be more readable and easier to modify in the future.
  I don't like this pattern with inheritance all nested in the same place. 
  Maybe is better just to use the prototype pattern and use this when needed.
*/
var Primitive = Primitive || {};

(function ( Primitive ) {

  var Rectangle, Polygon;
  
  //private scope of this module
  function deg2rad(ang) {
      return ang * (Math.PI/180.0);
  }
  
  // A Rectangle is an encapsulation of the canvas.fill to draw rectagles
  Rectangle = function (x, y, width, height){
    
    // private properties
    this.color = "rgb(200,0,0)";
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    
    return this;    
  }
    
  Rectangle.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }                       
    
  // A Polygon is a closed path that draws a regular polygon of N sides
  Polygon = function(x, y, size, numSides) {
    
    this.colorFill   = "rgb(200,250,200)"
    this.lineWidth   = "3";
    
    this.color = "rgb(150,200,150)";
    this.x = x;
    this.y = y;    
    this.size = size;
    this.numSides = numSides;
    this.rotateAngle = 0;
    
  }
  
  Polygon.prototype.update = function(){
    var angle   = deg2rad(360/this.numSides);
    var initAngle = deg2rad(this.rotateAngle);
    this.points  = []; 
    for(var i=0; i < this.numSides; i++){
      this.points[i] = {
        x: this.x+(Math.cos(initAngle+angle*i)*this.size), 
        y: this.y+(Math.sin(initAngle+angle*i)*this.size) 
      };
    }
  };
  
  Polygon.prototype.draw = function(ctx){
    ctx.strokeStyle = this.color;
    ctx.lineWidth   = this.lineWidth;
    ctx.fillStyle   = this.colorFill;
    ctx.beginPath();
    for(var index in this.points){        
      if(index == 0)
        ctx.moveTo(this.points[index].x, this.points[index].y);
      else
        ctx.lineTo(this.points[index].x, this.points[index].y);            
    }
    ctx.fill();
    if(this.lineWidth > 0){
      ctx.lineTo(this.points[0].x, this.points[0].y);        
      ctx.stroke();
    }
    if(window.debug != undefined){
      ctx.fillStyle = "red";
      ctx.fillRect(this.x-1, this.y-1, 2, 2);
    }
  }
  
  // exports 
  Primitive.Rectangle = Rectangle;
  Primitive.Polygon = Polygon;

})( Primitive );

if(window.debug != undefined) console.log("Primitives loaded...");
