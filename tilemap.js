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
    this.camera       = {x: 0, y:0};
    this.width        = width;
    this.height       = height;
    this.tilePalette  = defaultTilePalette;
    this.tileWidth    = typeof tileWidth !== 'undefined' ? tileWidth : defaultTileWidth;
    this.map          = [];
    
    // initialize map array
    for(var i=0; i<width; i++){
      for(var j=0; j<height; j++){
        this.map[i][j] = 0;
      }
    }    
    
    // you could also do...
    // var matrix = Array.apply(null, new Array(width)).map(function(){ 
    //      return Array.apply(null, new Array(height)).map(Number.prototype.valueOf, 0) 
    //   }, null); buhahahaha    
  }
  
})(TileMap);
