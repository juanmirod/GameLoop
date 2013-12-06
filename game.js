//Game Class Definition 
function Game(width, height){
  this.width = width;
  this.height = height;
};

Game.prototype.draw = function(){
  //game drawing goes here, you must overwrite this function in order to draw your game assets 
};

Game.prototype.update = function(){
  //game logic goes here                                                                                            
};

function loop(game){
  game.update();
  game.draw();
  requestAnimationFrame(function(){loop(game);});
};

console.log("Game loaded...")
