Mundo.Cargar = function(game) {};
Mundo.Cargar.prototype = {
	preload: function() {
		this.add.sprite(0, 0, 'fndCarga');
		this.preloadBg = this.add.sprite((Mundo._WIDTH-297)*0.5, (Mundo._HEIGHT-145)*0.5, 'preCargaBg');
		this.preloadBar = this.add.sprite((Mundo._WIDTH-162)*0.5, (Mundo._HEIGHT-50)*0.5, 'preCargaBar');
		this.load.setPreloadSprite(this.preloadBar);

		this.load.image('menu', 'img/menu.png');
		this.load.spritesheet('boton-jugar', 'img/btn_jugar.png', 170, 60);
		this.load.spritesheet('boton-ayuda', 'img/btn_ayuda.png', 170, 60);
		
		this.load.image('nivelesPantalla', 'img/niveles.png');
		this.load.spritesheet('nivel', 'img/btn-nivel.png', 44, 43);
		this.load.spritesheet('boton-menu', 'img/btn_mnu.png', 44, 43);
		
		this.load.image('juegoBg', 'img/juegoBg.png');
		this.load.image('porteria', 'img/porte.png');
		this.load.spritesheet('balon', 'img/balon.png', 24, 24);
		this.load.image('border-horizontal', 'img/border-horizontal.png');
		this.load.image('border-vertical', 'img/border-vertical.png');
		this.load.image('border-head', 'img/border-head.png');
		this.load.spritesheet('btn_regresar', 'img/btn_regresar.png', 24, 24);
		this.load.spritesheet('btn_audio', 'img/btn_audio.png', 24, 48);
		this.load.spritesheet('btn_pausa', 'img/btn_pausa.png', 24, 24);
		this.load.spritesheet('btn_control', 'img/btn_control.png', 24, 24);
		this.load.spritesheet('btn_pad', 'img/btn_pad.png', 26, 28);
		this.load.audio('audio-choque', ['audio/golpebalon.ogg','audio/golpebalon.mp3']);//'audio/bounce.ogg', 'audio/bounce.mp3', 'audio/bounce.m4a']);
		this.load.image('obstaculo-v', 'img/bloqueo-v.png');
		this.load.image('obstaculo-h', 'img/bloqueo-h.png');
		
		this.load.image('fnd_ayuda', 'img/ayuda.png');
		this.load.spritesheet('btn_acercade', 'img/btn_acerca.png', 82, 22);

		this.load.image('fnd_acercade', 'img/acercade.png');
		/*this.load.image('hole', 'img/hole.png');
		this.load.image('element-w', 'img/element-w.png');
		this.load.image('element-h', 'img/element-h.png');
		this.load.image('panel', 'img/panel.png');
		this.load.image('title', 'img/title.png');
		this.load.image('button-pause', 'img/button-pause.png');
		this.load.image('screen-bg', 'img/screen-bg.png');
		this.load.image('screen-mainmenu', 'img/screen-mainmenu.png');
		this.load.image('screen-howtoplay', 'img/screen-howtoplay.png');
		

		this.load.spritesheet('button-audio', 'img/button-audio.png', 35, 35);
		this.load.spritesheet('button-start', 'img/button-start.png', 146, 51);

		this.load.audio('audio-bounce', ['audio/bounce.ogg', 'audio/bounce.mp3', 'audio/bounce.m4a']);*/
	},
	create: function() {
		this.game.state.start('menuPrincipal');
	}
};