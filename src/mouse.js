// check this for alternative to bind: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.addEventListener#The_value_of_this_within_the_handler
// And this in how to remove all handlers for an event: http://jsfiddle.net/fksBW/
define(function(require, exports, module) {

  var elem, init, on, off, dragCheckFunction;

  onMouseDownDrag = function(event){
    this.isDragging = true;
  }

  onMoveCheckDragging = function(event, callback){
    if(this.isDragging) {
      callback.call(this, event); 
    }
  }

  onMouseUpDrag = function(event){
    this.isDragging = false;
  }

  init = function(elem) {
    this.elem = elem;
  }

  on = function(event, callback) {
    switch(event) {
      case 'click':
        this.elem.addEventListener('click', callback);
        break;

      case 'move':
        this.elem.addEventListener('mousemove', callback);
        break;

      case 'drag':
        onMoveCheckDragging = onMoveCheckDragging.bind(this);          
        dragCheckFunction = function(e) { 
          onMoveCheckDragging(e, callback); 
        };
        this.elem.addEventListener('mousedown', onMouseDownDrag.bind(this));
        this.elem.addEventListener('mousemove', dragCheckFunction.bind(this));
        this.elem.addEventListener('mouseup', onMouseUpDrag.bind(this));
        break;

      case 'enter':
        this.elem.addEventListener('mouseover', callback);
        break;

      case 'leave':
        this.elem.addEventListener('mouseout', callback);
        break;
    }
  }

  off = function(event) {
    switch(event) {
      case 'click':
        this.elem.removeEventListener('click', callback);
        break;
      case 'move':
        this.elem.removeEventListener('mousemove', callback);
        break;
      case 'drag':
        // This is not compatible with several objects attaching handlers to drag,
        // I need to keep a track of the different calls and only dettach
        // everything in the last one.
        this.elem.removeEventListener('mousedown', onMouseDownDrag);
        this.elem.removeEventListener('mousemove', dragCheckFunction);
        this.elem.removeEventListener('mouseup', onMouseUpDrag);
        break;
      case 'enter':
        this.elem.removeEventListener('mouseover', callback);
        break;
      case 'leave':
        this.elem.removeEventListener('mouseout', callback);
        break;
    }    
  }

  exports.init = init;
  exports.on = on;
  exports.off = off;

});