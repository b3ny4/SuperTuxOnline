
export function Sprite(game, src, width = 32, height= 32) {
    this.game = game;
    this.img = document.createElement('img');
    this.img.src = src;
    this.numTiles = 0;
    this.width = width;
    this.height = height;
}
Sprite.prototype.setNumTiles = function(num) {
    this.numTiles = num;
}
Sprite.prototype.render = function(x, y) {
    let index = this.game.tick % this.numTiles;
    this.game.ctx.drawImage(this.img, this.width * index, 0, this.width, this.height, x - this.width/2, y - this.height/2, this.width, this.height);
}
