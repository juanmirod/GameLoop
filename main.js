// Get a reference to the element.
var elem = document.getElementById('myCanvas')
  , map = new TileMap.Map(10, 10);

//TODO: put this in a separate module
document.addEventListener('keydown', function(event) {
  switch(event.keyCode){
    case 37:  // LEFT
      map.camera.x+=5; 
      break;
    case 39: // RIGHT
      map.camera.x-=5;
      break;    
    case 38: // UP
      map.camera.y+=5;
      break;    
    case 40: // DOWN
      map.camera.y-=5;
      break;    
  }
});

// Always check for properties and methods, to make sure your code doesn't break 
// in other browsers.
if ( elem && elem.getContext ) {
  // Get the 2d context.
  // Remember: you can only initialize one context per element.
  window.context = elem.getContext( '2d' );
  if ( context ) {
    
    //Create new Game Object
    var game = new Game(elem.width, elem.height);             
    
    map.loadTilePalette();
    
    game.assets.push(map);
    game.assets.push(new Primitive.Circle(50, 50, 20));
    
    loop(game, context);
    
  }
  
}
