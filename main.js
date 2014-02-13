// Get a reference to the element.
var elem = document.getElementById('myCanvas');

// Always check for properties and methods, to make sure your code doesn't break 
// in other browsers.
if ( elem && elem.getContext ) {
  // Get the 2d context.
  // Remember: you can only initialize one context per element.
  window.context = elem.getContext( '2d' );
  if ( context ) {

    Mouse.init(elem);

    context.fillStyle = '#f2f2ff';
    context.fillRect(0,0,600,600);
    
    Mouse.on('click', function(event){
      var circle = new Primitive.Circle(event.offsetX, event.offsetY, 10);
      circle.draw(context);      
    });
    
    Mouse.on('drag', function(event){
      var rect = new Primitive.Rectangle(event.offsetX, event.offsetY, 5, 5);
      rect.draw(context);
    })
  }
  
}
