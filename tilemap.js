/**
  I will try to keep it simple for now:
  A TileMap is a matrix of integers each integer corresponding one type in
  the tile palette. You can draw the tile map, move the camera and change tiles
  in the map. 
*/
var TileMap = TileMap || {};

(function ( Map ) {

  var defaultTilePalette  = ['http://placehold.it/32/00dd00', 'http://placehold.it/32/aa6600'];
  var defaultTileWidth    = 32;

  Map = function(width, height, tileWidth){
    this.tileWidth    = typeof tileWidth !== 'undefined' ? tileWidth : defaultTileWidth;
    this.camera       = {x: (width*this.tileWidth)/2, y: (height*this.tileWidth)/2};
    this.width        = width;
    this.height       = height;
    this.tilePalette  = defaultTilePalette;
    this.map          = [];
    
    // initialize map array
    for(var i=0; i < this.width; i++){
      this.map[i] = [];
      for(var j=0; j < this.height; j++){
        this.map[i][j] = Math.round(Math.random());
      }
    }    
    
    // you could also do...
    // var matrix = Array.apply(null, new Array(width)).map(function(){ 
    //      return Array.apply(null, new Array(height)).map(Number.prototype.valueOf, 0) 
    //   }, null); buhahahaha    
  }
  
  Map.prototype = {
  
    loadTilePalette: function(callback){
      this.tilePaletteImg = [];
      var map = this;
      this.tilePalette.forEach(function(url){
        var img = new Image();
        img.onload = function(){
          return (function(map, image){
            map.tilePaletteImg.push(image);
          })(map, this);
        };
        img.src = url;        
      });
      
      if(typeof callback === 'function') callback();
    },
  
    getViewport: function(screenWidth, screenHeight){
      //I don't mind right now if the coordinates goes of the map
      return { x: this.camera.x-screenWidth/2, y: this.camera.y-screenHeight/2 };      
    },
    
    draw: function(ctx){
      // calculate viewport
      var view = this.getViewport(ctx.canvas.width, ctx.canvas.height);
      // paint tiles inside the viewport 
      // (really really rought, needs refactoring and optimization)
      var x = view.x + this.camera.x;
      var y = view.y + this.camera.y;
      for(var i=0; i < this.width; i++){
        for(var j=0; j< this.height; j++){
          if(typeof this.tilePaletteImg[this.map[i][j]] != 'undefined'){            
            ctx.drawImage(
              this.tilePaletteImg[this.map[i][j]], 
              x+i*this.tileWidth, 
              y+j*this.tileWidth
            );
          }
        }
      }
    },
  }
  
  TileMap.Map = Map;
  
})(TileMap);

if(window.debug != undefined) console.log('TileMap loaded...');
