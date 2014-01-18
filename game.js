// Game Class Definition 
function Game(width, height){
  this.width  = width;
  this.height = height;
  this.assets = []; 
  this.backgroundColor = '#FAFAFA'
}

// This function draws every object that have been added to the Game in order
// asset opacity can be set to 0 to hide the asset 
Game.prototype.draw = function(ctx){
  ctx.fillStyle = this.backgroundColor;
  ctx.fillRect(0, 0, this.width, this.height);  
  
  this.assets.forEach(function(asset){
    if(asset.opacity > 0) asset.draw(ctx);
  });
}

Game.prototype.update = function(){
  // Update every asset in the game 
  // TODO: update only if needed, for this we need some kind of watcher or flag 
  // that tell us if we need to update this asset as the opacity for draw                                                                               
  this.assets.forEach(function(asset){
    if(asset.update != undefined) asset.update();
  });
}

Game.prototype.checkState = function(){
  // Check the state of the game and update to a new state if needed
}

function loop(game, ctx){
  game.checkState();
  game.update();
  game.draw(ctx);
  requestAnimationFrame(function(){loop(game, ctx);});
}

console.log("Game loaded...")
