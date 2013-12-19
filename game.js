// Game Class Definition 
function Game(width, height){
  this.width = width;
  this.height = height;
};

Game.prototype.draw = function(){
  // Game drawing goes here, you must overwrite this function 
  // in order to draw your game assets 
};

Game.prototype.update = function(){
  // Game logic goes here, overwrite to add some logic                                                                                   
};

function loop(game){
  game.update();
  game.draw();
  requestAnimationFrame(function(){loop(game);});
};

console.log("Game loaded...")
