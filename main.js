// Get a reference to the element.

var elem = document.getElementById('myCanvas')
  , polygon
  , debugON = true;
  
function addSide(){
  polygon.numSides++;
  polygon.update();
}

function rotateAngle(){
  polygon.rotateAngle += 1;
  polygon.update();
}
  
// Always check for properties and methods, to make sure your code doesn't break 
// in other browsers.
if ( elem && elem.getContext ) {
  // Get the 2d context.
  // Remember: you can only initialize one context per element.
  var context = elem.getContext( '2d' );
  if ( context ) {
    
    //Create new Game Object
    var game = new Game(elem.width, elem.height);             
    
    var pj = new Primitive.Rectangle(0, 0, 10, 10);
    pj.setColor("rgb(200,100,0)");
    
    var pj2 = new Primitive.Rectangle(5, 20, 10, 10);
    pj2.setColor("rgb(0,200,0)");
    
    polygon = new Primitive.Polygon(100, 100, 50, 5);
    
    game.draw = function(){
      
	    //clear the screen
	    context.fillStyle="#FAFAFA";
      context.fillRect( 0, 0, game.width, game.height );
        
	    //paints some figures
	    pj.draw(context);
	    pj2.draw(context);
	    polygon.draw(context);
    };
    
    game.update = function(){
      pj.x += 1;
      pj2.x += 2;
      rotateAngle();
    };
    
    loop(game);
    
  }
  
}
