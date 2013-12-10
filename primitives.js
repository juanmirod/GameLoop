var Hello = "Hello";
console.log(Hello);

var Primitive = (function() {

  //private scope of this module
  function deg2rad(ang) {
      return ang * (Math.PI/180.0);
  }
    
  //exposed properties    
  return {
    // A Rectangle is an encapsulation of the canvas.fill to draw rectagles
    Rectangle: function(x, y, width, height){
      
      // private properties
      var color = "rgb(200,0,0)";
      
      var pub = {}
      
      pub.x = x;
      pub.y = y;
      pub.width = width;
      pub.height = height;
        
      pub.draw = function (context) {
        context.fillStyle = color;
        context.fillRect(pub.x, pub.y, pub.width, pub.height);
      },
                          
      pub.setColor = function (newColor){
        color = newColor;
      }
      
      return pub;
      
    }
    
    // A Polygon is a closed path that draws a regular polygon of N sides
    Polygon: function(){
      
    }
  };  
})();

console.log("Primitives loaded...");
