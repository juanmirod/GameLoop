define(function(require, exports, module) {

  var Rectangle, Polygon, Circle, Line;
  
  //private scope of this module
  function deg2rad(ang) {
      return ang * (Math.PI/180.0);
  }
  
  // A Rectangle is an encapsulation of the canvas.fill
  Rectangle = function (x, y, width, height){
    this.color = "rgb(200,0,0)";
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.opacity = 1;
  }
    
  Rectangle.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }         
  
  // A Circle is an encapsulation of the canvas.arc which always draws full circles
  Circle = function (x, y, r){    
    this.x = x;
    this.y = y;
    this.r = r; 
    this.lineWidth = "3";
    this.color = "rgb(100,250,250)";
    this.colorFill = "rgb(50, 200, 200)";
    this.opacity = 1;
  }            
  
  Circle.prototype.draw = function(ctx) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth   = this.lineWidth;
    ctx.fillStyle   = this.colorFill;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
    ctx.fill();
    if(this.lineWidth > 0){
      ctx.stroke();
    }
    if(window.debug != undefined){
      ctx.fillStyle = "red";
      ctx.fillRect(this.x-1, this.y-1, 2, 2);
    }
  } 
  
  // A Line is a wrapper over lineTo
  Line = function(x, y, x2, y2) {
    this.lineWidth = '3';
    this.color = 'rgb(150,200,150)';
    this.x = x;
    this.y = y;    
    this.x2 = x2;
    this.y2 = y2;
  }   
  
  Line.prototype.draw = function(ctx) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth   = this.lineWidth;
    
    ctx.beginPath();
    
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x2, this.y2);
    
    if(this.lineWidth > 0){
      ctx.stroke();
    }
  }
    
  // A Polygon is a closed path that draws a regular polygon of N sides
  Polygon = function(x, y, size, numSides) {
    this.colorFill   = 'rgb(200,250,200)';
    this.lineWidth   = '3';
    this.color = 'rgb(150,200,150)';
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
  
  exports.Rectangle = Rectangle;
  exports.Polygon = Polygon;
  exports.Circle = Circle;
  exports.Line = Line;

});