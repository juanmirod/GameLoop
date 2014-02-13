// check this for alternative to bind: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.addEventListener#The_value_of_this_within_the_handler
// And this in how to remove all handlers for an event: http://jsfiddle.net/fksBW/

var Mouse = Mouse || {};

(function(Mouse) {

  var elem, init, on, off, dragCheckFunction;

  function onMouseDownDrag(event){
    this.isDragging = true;
  }

  function onMoveCheckDragging(event, callback){
    if(this.isDragging) {
      callback.call(event); 
    }
  }

  function onMouseUpDrag(event){
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
        dragCheckFunction = function(event) { onMoveCheckDragging(event, callback); };
        this.elem.addEventListener('mousedown', onMouseDownDrag);
        this.elem.addEventListener('mousemove', dragCheckFunction);
        this.elem.addEventListener('mouseup', onMouseUpDrag);
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

  Mouse.init = init;
  Mouse.on = on;
  Mouse.off = off;

}(Mouse);

if(window.debug != undefined) console.log("Mouse module loaded...");