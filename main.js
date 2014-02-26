requirejs.config({
  baseUrl: 'src',
  paths: {
    vendor: '../vendor'
  }
});


requirejs(['polyfills','primitives', 'mouse', 'game'], function(p, Primitives, Mouse, G){

  // Get a reference to the element.
  var elem = document.getElementById('myCanvas');

  // Always check for properties and methods, to make sure your code doesn't break 
  // in other browsers.
  if ( elem && elem.getContext ) {
    // Get the 2d context.
    // Remember: you can only initialize one context per element.
    window.context = elem.getContext( '2d' );
    if ( context ) {

      var game = new G.Game(context, elem.width, elem.height);

      game.addState('Play', true);
      game.addState('GameOver');     

      var button = new Primitives.Rectangle(100, 100, 100, 50);
      var gameOverText = new Primitives.Rectangle(100, 100, 100, 50);
      gameOverText.color = '#00ff00';

      game.addItemToState(button, 'Play');
      game.addItemToState(gameOverText, 'GameOver');

      Mouse.init(elem);
      Mouse.on('click', function(){
        game.setNextState('GameOver');
        game.nextState();
      });

      game.loop();
    }
    
  }

});