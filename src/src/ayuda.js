Mundo.ayuda = function(game) {};
Mundo.ayuda.prototype = {
	create: function() {
		this.add.sprite(0, 0, 'fnd_ayuda');

		this.btnRegresaMenu = this.add.button(53, 380, 'boton-menu', this.regresaMenu, this, 2, 0, 1);
		this.btnRegresaMenu.anchor.set(0.5,0);
		this.btnRegresaMenu.input.useHandCursor = true;

		this.btnAcercade = this.add.button(223, 375, 'btn_acercade', this.acercade, this, 2, 0, 1);
		this.btnAcercade.anchor.set(0.5,0);
		this.btnAcercade.input.useHandCursor = true;
		// button to "read the article"
	},
	regresaMenu: function() {
		this.game.state.start('menuPrincipal');
	},
	acercade: function() {
		this.game.state.start('stAcercade');
	}
	
};