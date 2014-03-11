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

      document.addEventListener('keydown', function(event) {
        // each time the user hits a key, draw a random polygon!
        var p = new Primitives.Polygon(Math.random()*200, 
                                       Math.random()*200, 
                                       Math.random()*80, 
                                       Math.random()*20
                                       );
        // give it a bright colour
        p.color = 'rgb('+(Math.random()*100+150)+','+
                       (Math.random()*100+150)+','+
                       (Math.random()*100+150)+')';
        // add it to the Loop
        game.addItemToState(p);        
      });
      
      game.loop();
    }
    
  }

});