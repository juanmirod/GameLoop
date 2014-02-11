var Mouse = Mouse || {};

(function(Mouse) {

  Mouse.on = function(event, callback) {
    switch(event) {
      case 'click':
        break;

      case 'move':
        break;

      case 'drag':
        break;

      case 'enter':
        break;

      case 'leave':
        break;
    }
  }

  Mouse.off = function(event) {

  }

}(Mouse);

if(window.debug != undefined) console.log("Mouse module loaded...");