Mundo.menuPrincipal = function(game) {};
Mundo.menuPrincipal.prototype = {
	create: function() {
		this.add.sprite(0, 0, 'menu');
		this.iniciarNiveles = this.add.button((Mundo._WIDTH + 50)*0.5, 200, 'boton-jugar', this.nivelesJuego, this, 2, 0, 1);
		this.iniciarNiveles.anchor.set(0.5,0);
		this.iniciarNiveles.input.useHandCursor = true;
		this.ayuda = this.add.button((Mundo._WIDTH + 50)*0.5, 270, 'boton-ayuda', this.ayudaJuego, this, 2, 0, 1);
		this.ayuda.anchor.set(0.5,0);
		this.ayuda.input.useHandCursor = true;
		this.game.audio = true;
		this.game.displayControl = false;

		// button to "read the article"
	},
	nivelesJuego: function() {
		this.game.state.start('nivelesJuego');
	},
	ayudaJuego: function() {
		this.game.state.start('stAyuda');
	}
};