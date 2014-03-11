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
      //game.backgroundColor = '#020202';

      document.addEventListener('keydown', function(event) {

        if ( event.keyCode == '32' ) {
          game.assets[game.state.current].length = 0;
          return false;
        }

        // each time the user hits a key, draw a random polygon!
        var p = new Primitives.Polygon(Math.random()*1200, 
                                       Math.random()*600, 
                                       Math.random()*60+20, 
                                       Math.random()*5+3
                                       );
        // give it a bright colour
        switch(Math.round(Math.random()*5))
        {
          case 0: // Reddish
            p.colorFill = 'rgb('+Math.round(Math.random()*50+200)+','+
                            Math.round(Math.random()*50)+','+
                            Math.round(Math.random()*50)+')';        
            break;
          case 1: // Greenish
            p.colorFill = 'rgb('+Math.round(Math.random()*50)+','+
                            Math.round(Math.random()*50+200)+','+
                            Math.round(Math.random()*50)+')';
            break;
          case 2: // Blueish
            p.colorFill = 'rgb('+Math.round(Math.random()*50)+','+
                            Math.round(Math.random()*50)+','+
                            Math.round(Math.random()*50+200)+')';
            break;
          case 3: // Yellow
            p.colorFill = 'rgb('+Math.round(Math.random()*50+200)+','+
                            Math.round(Math.random()*50+200)+','+
                            Math.round(Math.random()*50)+')';        
            break;
          case 4: // Pink
            p.colorFill = 'rgb('+Math.round(Math.random()*50+200)+','+
                            Math.round(Math.random()*50)+','+
                            Math.round(Math.random()*50+200)+')';
            break;
          case 5: // Cyan
            p.colorFill = 'rgb('+Math.round(Math.random()*50)+','+
                            Math.round(Math.random()*50+200)+','+
                            Math.round(Math.random()*50+200)+')';
            break;
        }
        p.color = p.colorFill;

        // add it to the Loop
        game.addItemToState(p);        
      });
      
      game.loop();
    }
    
  }

});