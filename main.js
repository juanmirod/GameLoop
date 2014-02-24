requirejs.config({
  baseUrl: 'src',
  paths: {
    vendor: '../vendor'
  }
});


requirejs(['polyfills','primitives', 'game'], function(p, Primitives, Game){

  // Get a reference to the element.
  var elem = document.getElementById('myCanvas');

  // Always check for properties and methods, to make sure your code doesn't break 
  // in other browsers.
  if ( elem && elem.getContext ) {
    // Get the 2d context.
    // Remember: you can only initialize one context per element.
    window.context = elem.getContext( '2d' );
    if ( context ) {

      var game = new Game.Game(context, elem.width, elem.height);

      var p = new Primitives.Polygon(100, 100, 20, 5);

      game.addItemToState(p);

      game.loop();
    }
    
  }

});