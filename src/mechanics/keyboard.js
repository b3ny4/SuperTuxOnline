
export function Keyboard(game) {
    this.game = game;
    this.keymap = new Array();
    window.addEventListener("keydown", this.keydown.bind(this));
    window.addEventListener("keyup", this.keyup.bind(this));
}

Keyboard.prototype.keydown = function(event) {
    this.keymap[event.keyCode] = true;
    this.game.debug.register("keymap", this.keymap);
}
Keyboard.prototype.keyup = function(event) {
    this.keymap[event.keyCode] = false;
    this.game.debug.register("keymap", this.keymap);
}