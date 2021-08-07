Mundo.acercade = function(game) {};
Mundo.acercade.prototype = {
	create: function() {
		this.add.sprite(0, 0, 'fnd_acercade');

		this.btnRegresaMenu = this.add.button(43, 380, 'boton-menu', this.regresaMenu, this, 2, 0, 1);
		this.btnRegresaMenu.anchor.set(0.5,0);
		this.btnRegresaMenu.input.useHandCursor = true;

		this.fontBig = { font: "20px Arial", fill: "#ffffff",stroke: "#000000", strokeThickness: 1 };

		this.game.add.text(20, 0 + 120, "Versión "+this.game.version, this.fontBig);
		this.game.add.text(20, 34 + 120, "© 2018"+ (((new Date).getFullYear() > 2018) ? "-"+(new Date).getFullYear():'') +" B.M.S.M", this.fontBig);
		this.game.add.text(20, 68 + 120, "Todos los derechos reservados", this.fontBig);
		this.game.add.text(20, 102 + 120, "Videojuego Gratuito,\nAyuda a continuar con\ndesarrollos para donaciones\n(MNX,BTC,ETH,LTC,XRP,BCH,\nTUSD,DASH)     contactame :)", this.fontBig);

		// button to "read the article"
	},
	regresaMenu: function(n) {
		this.game.state.start('menuPrincipal');
	}
};