define(function(require, exports, module){

  // Game Class Definition 
  function Game(context, width, height){
    this.width  = width;
    this.height = height;
    this.ctx = context;
    this.assets = {}; 
    this.states = [];
    this.state = {
      current: 'default',
      finished: false
    };
    this.backgroundColor = '#FAFAFA'
  }

  // This function draws every object that have been added to the Game in order
  // asset opacity can be set to 0 to hide the asset 
  Game.prototype.draw = function(){
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, this.width, this.height);  
    
    var self = this;
    this.assets[this.state.current].forEach(function(asset){
      if(asset.opacity > 0) asset.draw(self.ctx);
    });
  }

  Game.prototype.update = function(){
    // Update every asset in the game 
    // TODO: update only if needed, for this we need some kind of watcher or flag 
    // that tell us if we need to update this asset as the opacity for draw                                                                               
    this.assets[this.state.current].forEach(function(asset){
      if(asset.update != undefined) asset.update();
    });
  }

  Game.prototype.addState = function(newState, setAsCurrent){
    setAsCurrent = typeof setAsCurrent !== 'undefined'? setAsCurrent : false; 
    if(this.states.indexOf(newState) == -1) {
      this.states.push(newState);
      this.assets[newState] = [];
      if(setAsCurrent) {
        this.state.current = newState;
      }
    }
  }

  Game.prototype.checkState = function(){
    // Check the state of the game and update to a new state if needed
    if(this.state.finished) {
      this.nextState();
    }  
  }

  Game.prototype.setNextState = function(state) {
    // Change game state, waiting for the current state to finish
    this.state.next = state;
    this.checkState();
  }

  Game.prototype.nextState = function() {
    // force next state transition
    this.state.old = this.state.current;
    this.state.current = this.state.next;
    this.state.next = null;
    this.state.finished = false;
  }

  Game.prototype.addItemToState = function(item, state) {
    state = typeof state !== 'undefined' ? state : 'default';
    // Add an object to a game state, this object will be drawn and updated when the game is in this state
    if(this.assets[state] === undefined) {
      this.assets[state] = [];
    }

    this.assets[state].push(item);
  }

  Game.prototype.loop = function(){
    this.checkState();
    this.update();
    this.draw();
    var self = this;
    requestAnimationFrame(function(){ self.loop(); });
  }

  exports.Game = Game;

});