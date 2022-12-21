/**
 * Represents a sprite based element
 * @param {Game} game Game which the player is in
 * @param {int} x x coord in the game
 * @param {int} y y coord in the game
 */
export function Element(game, x=0, y=0) {
    this.game = game;
    this.x = x;
    this.y = y;
}

Element.prototype.render = function() {}
Element.prototype.run = function() {}