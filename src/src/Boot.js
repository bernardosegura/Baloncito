var Mundo = {
	_WIDTH: 320,
	_HEIGHT: 480
};
Mundo.Boot = function(game) {};
Mundo.Boot.prototype = {
	preload: function() {
		this.load.image('preCargaBg', 'img/loading-bg.png');
		this.load.image('preCargaBar', 'img/loading-bar.png');
		this.load.image('fndCarga','img/pantalla-bg.png');
	},
	create: function() {
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		this.game.state.start('Cargar');
	}
};