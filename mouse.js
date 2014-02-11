// check this for alternative to bind: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.addEventListener#The_value_of_this_within_the_handler
// And this in how to remove all handlers for an event: http://jsfiddle.net/fksBW/

var Mouse = Mouse || {};

(function(Mouse) {

  var elem, init, on, off;

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
        this.elem.addEventListener('mousedown', onMouseDownDrag);
        this.elem.addEventListener('mousemove', function(event) { onMoveCheckDragging(event, callback); });
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
    //TODO this.elem.removeEventListener();
  }

}(Mouse);

if(window.debug != undefined) console.log("Mouse module loaded...");