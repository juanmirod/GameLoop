// Get a reference to the element.
var elem = document.getElementById('myCanvas'),
    enemies = [],
    debug = 1,
    player;

//TODO: put this in a separate module
document.addEventListener('keydown', function(event) {
  switch(event.keyCode){
    case 37:  // LEFT
      player.inertiaX -= Math.max(0.1, player.inertiaX*0.1);
      break;
    case 39: // RIGHT
      player.inertiaX += Math.max(0.1, player.inertiaX*0.1);
      break;    
    case 38: // UP
      player.inertiaY -= Math.max(0.1, player.inertiaY*0.1);
      break;    
    case 40: // DOWN
      player.inertiaY += Math.max(0.1, player.inertiaY*0.1);
      break;    
  }
  console.log(player.inertiaX);
});

// An enemy is a circle that changes color accordingly to the user size
// and its own size. It also can eat other enemies and the user
var Enemy = function(x, y, size){
  this.shape = new Primitive.Circle(x, y, size);
  this.inertiaX = 0;
  this.inertiaY = 0;
  this.opacity = 1; //make it visible
}

Enemy.prototype.updateColor = function(playerSize){
  if(this.shape.r >= playerSize){
    this.shape.color = 'rgb(250, 10, 10)';
    this.shape.colorFill = 'rgb(200, 10, 10)';
  } else {
    this.shape.color = 'rgb(10, 250, 10)';
    this.shape.colorFill = 'rgb(10, 200, 10)';
  }
}

Enemy.prototype.draw = function(ctx){
  this.shape.draw(ctx);
}

Enemy.prototype.updatePosition = function(){
  this.shape.x += this.inertiaX;
  this.shape.y += this.inertiaY;
}

Enemy.prototype.searchFood = function(){
  var self = this;
  for(var i=0; i<enemies.length; i++){
    if(enemies[i] != null && self.collide(enemies[i])){
      if(self.shape.r > enemies[i].shape.r){ //don't eat things bigger than you!
        self.eat(enemies[i]);
        enemies[i] = null;
      }
    }  
  }
}

Enemy.prototype.collide = function(pal){
  var dx = this.shape.x - pal.shape.x,
      dy = this.shape.y - pal.shape.y,
      dist = this.shape.r + pal.shape.r;
  
  return (this != pal)
    && (Math.abs(dx) < dist && Math.abs(dy) < dist) // this let us skip the multiplications if they are far away from each other
    && (dx*dx + dy*dy <= dist*dist); 
}

Enemy.prototype.eat = function(food){
  var areaFood = food.shape.r*food.shape.r*Math.PI,
      areaThis = this.shape.r*this.shape.r*Math.PI;
  this.shape.r = Math.sqrt((areaThis+areaFood)/Math.PI);
}

if ( elem && elem.getContext ) {
  // Get the 2d context.
  window.context = elem.getContext( '2d' );
  if ( context ) {
    
    // Create new Game Object
    var game = new Game(elem.width, elem.height);
    game.backgroundColor = '#150525';            
    player = new Enemy(10, 10, 10);
        
    // Create a random Level: fill the screen with primitives
    for(var i=0; i<100; i++){
      enemies.push(new Enemy(
        Math.round(Math.random()*500+50), 
        Math.round(Math.random()*500+50), 
        Math.round(Math.random()*20+5)
      ));
    }
    
    game.assets = enemies;
        
    // overwrite update function to call collision detection
    game.update = function(){
      for(var i=0; i < enemies.length; i++){
        enemies[i].updatePosition();
      }
      player.updatePosition();
      
      for(var i=0; i < enemies.length && enemies[i] != null; i++){
        enemies[i].searchFood();
      }
      enemies = enemies.filter(function(enemy){ return enemy != null; });
      player.searchFood();
      enemies = enemies.filter(function(enemy){ return enemy != null; });
      enemies.forEach(function(enemy){
        enemy.updateColor(player.shape.r);
      });
      game.assets = enemies.concat(player);
      
    }
        
    loop(game, context);
    
  }
  
}
