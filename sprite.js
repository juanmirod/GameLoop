/** Sprite Class
 *  Sprites are images that contain a character with animations 
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
