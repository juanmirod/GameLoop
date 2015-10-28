requirejs.config({
  baseUrl: 'src',
  paths: {
    vendor: '../vendor'
  }
});


requirejs(['polyfills','primitives', 'game'], function(p, Primitives, G){

  // Get a reference to the element.
  var viewport = document.getElementById('myCanvas');

  // Always check for properties and methods, to make sure your code doesn't break 
  // in other browsers.
  if ( viewport && viewport.getContext ) {
    // Get the 2d context.
    // Remember: you can only initialize one context per element.
    window.context = viewport.getContext( '2d' );
    if ( context ) {

      var game = new G.Game(context, viewport.width, viewport.height);
      game.backgroundColor = '#ccaa55';

      var goldmine = new Primitives.Polygon(100, 100, 10, 4);
      goldmine.color = '#f0f010';
      goldmine.rotateAngle = 45;

      var trees = [];
      for(var i=0; i < 100; i++) {
        trees.push(new Primitives.Polygon(Math.random()*viewport.width, Math.random()*viewport.height, 10, 3));
        var tree = trees[trees.length-1];
        tree.rotateAngle = 30;
        tree.color = "#1f7702";
        game.addItemToState(tree);
      }
      debugger;

      game.addItemToState(goldmine);

      game.loop();
    }
    
  }

});