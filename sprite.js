/** Sprite Class
 *  SpritesSheets are images that contain a lot of individual game sprites
 *  To load an Sprite you have to load the image and the json object that
 *  give you the info about the individual images. Both, json and image are
 *  generated from a group of individual images in game compilation.
 *  You can also ignore the spritesheet and use folder_image_number to draw the
 *  Sprite.
 */
function Sprite(imageSrc){
  this.imageSrc = imageSrc;
  this.image = load(imageSrc);
};

Sprite.prototype.setReferencePoint = function(x, y){
  this.refX = x;
  this.refY = y;
};

Sprite.prototype.setPosition = function(x, y){
  this.x = x;
  this.y = y;
};

Sprite.prototype.startAnimation = function(){
};

Sprite.prototype.stopAnimation = function(){
};

Sprite.prototype.setAnimation = function(index){
};

Sprite.prototype.draw = function(context){
  context.draw(this.image, this.x-this.refX, this.y-this.refY);
}; 
