// Get a reference to the element.

var elem = document.getElementById('myCanvas');
  
// Always check for properties and methods, to make sure your code doesn't break 
// in other browsers.
if ( elem && elem.getContext ) {
  // Get the 2d context.
  // Remember: you can only initialize one context per element.
  var context = elem.getContext( '2d' );
  if ( context ) {
    
    //Create new Game Object
    var game = new Game(elem.width, elem.height);
    var rectX = 0;                       
    
    game.draw = function(){
      context.fillStyle="#FFFFFF";
      context.fillRect( 0, 0, game.width, game.height );
      context.fillStyle="#FF0000";
      context.fillRect( rectX, 0, 10, 10 );
    };
    
    game.update = function(){
      rectX = rectX+1;
    };
    
    loop(game);
    
  }
  
}
