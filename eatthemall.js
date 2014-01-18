// Get a reference to the element.
var elem = document.getElementById('myCanvas');

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

if ( elem && elem.getContext ) {
  // Get the 2d context.
  window.context = elem.getContext( '2d' );
  if ( context ) {
    
    // Create new Game Object
    var game = new Game(elem.width, elem.height);             
    
    // Create a random Level: full the screen with primitives
    for(var i=0; i<50; i++){
      game.assets.push(new Primitive.Polygon(
        Math.round(Math.random()*600), 
        Math.round(Math.random()*600), 
        Math.round(Math.random()*20+5), 
        Math.round(Math.random()*12+3)
      ));
    }
        
    loop(game, context);
    
  }
  
}
