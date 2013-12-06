var Hello = "Hello";
console.log(Hello);

var Primitive = (function() {

  //private scope of this module
    
  //exposed properties
    
  return {
    //A rectangle is an encapsulation of the canvas.fill to draw rectagles
    Rectangle: function(x, y, width, height){
      
      //rectangle properties
      var color = "rgb(200,0,0)";
      return {
      
        draw: function (context) {
          context.fillStyle = color;
          context.fillRect(x, y, width, height);
        },
                          
        setColor: function (newColor){
          color = newColor;
        },
        
        setX: function (newX){
          x = newX;
        },
        
        getX: function (){
          return x;
        }
      };
      
    }
  };  
})();

console.log("Primitives loaded...");
