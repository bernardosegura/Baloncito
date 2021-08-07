Mundo.stJuego = function(game) {};
Mundo.stJuego.prototype = {
	create: function() {
		this.add.sprite(0, 0, 'juegoBg');
		this.isGool = false;
		Mundo._displayControl = this.game.displayControl;
		this.game.displayControl =! this.game.displayControl;
		//this.physics.startSystem(Phaser.Physics.ARCADE);

		this.fontSmall = { font: "14px Arial", fill: "#434343",stroke: "#f4dfdf", strokeThickness: 1 };
		this.fontBig = { font: "20px Arial", fill: "#434343",stroke: "#f4dfdf", strokeThickness: 1 };
		this.fontMessage = { font: "24px Arial", fill: "#ffffff",  align: "center", stroke: "#000000", strokeThickness: 4 };
		
		
		this.timer = 0;
		this.tTempo = this.game.add.text(30, 0, " Tiempo: "+this.timer, this.fontBig);
		this.tNivel = this.game.add.text(35, 25, "Partidos: "+(this.game.nivelActivo + 1)+" / "+this.game.nNiveles, this.fontSmall);
		this.tTiempoNivel = this.game.add.text(145, 25, "Resultado: "+this.game.estadoNivel[this.game.nivelActivo].time, this.fontSmall);
		this.time.events.loop(Phaser.Timer.SECOND, this.updateTime, this);
		
		this.porteria = this.add.sprite(Mundo._WIDTH*0.5, 63, 'porteria');
		this.physics.enable(this.porteria, Phaser.Physics.ARCADE);
		this.porteria.anchor.set(0.5);
		this.porteria.body.setSize(2, 2);

		this.balon = this.add.sprite(((Mundo._WIDTH*0.5)-10), 453, 'balon');
		//this.balon.anchor.set(0.5); //ancla a posicion mitad de las cordenadas dadas al parecer
		this.physics.enable(this.balon, Phaser.Physics.ARCADE);
		this.balon.animations.add('derecha',[9,8,7,6,5,4,3,2,1,0]);
		this.balon.animations.add('izquierda');
		this.balon.animations.add('stop',[0]/*,0, false*/); //los fps y si es loop se pued eponer aqui o en el play.
		//this.balon.body.setSize(22, 22); //redimenciona el objeto 
		this.balon.body.bounce.set(0.3, 0.3); // para el rebote al colicionar
		this.balon.velocidadBalon = 0;

		this.keys = this.game.input.keyboard.createCursorKeys();
		this.keys.esc = this.game.input.keyboard.addKey(27);
		this.movementForce = 10;

		this.borderGroup = this.add.group();
		this.borderGroup.enableBody = true;
		this.borderGroup.physicsBodyType = Phaser.Physics.ARCADE;
		this.borderGroup.create(0, 51, 'border-vertical');
		this.borderGroup.create(Mundo._WIDTH-3, 51, 'border-vertical');
		this.borderGroup.create(0, 51, 'border-head');
		this.borderGroup.create(0,Mundo._HEIGHT-3, 'border-horizontal');
		this.borderGroup.setAll('body.immovable', true);

		
		
		this.btnNoAudio = this.add.button(278, 1, 'btn_audio', this.quitarAudio, this);
		this.btnNoAudio.anchor.set(0.5,0);
		this.btnNoAudio.input.useHandCursor = true;
		this.btnNoAudio.animations.add('true', [0]);
		this.btnNoAudio.animations.add('false', [1]);
		this.btnNoAudio.animations.play(this.game.audio);
		
		this.btnPausa = this.add.button(278-28, 2, 'btn_pausa', this.pausarJuego, this, 2, 0, 1);
		this.btnPausa.anchor.set(0.5,0);
		this.btnPausa.input.useHandCursor = true;

		this.btncontrol = this.add.button(254-32, 2, 'btn_control', this.controlesPantalla, this, 2, 0, 1);
		this.btncontrol.anchor.set(0.5,0);
		this.btncontrol.input.useHandCursor = true;

		this.btnRegresaNiveles = this.add.button(230-36, 2, 'btn_regresar', this.regresaNiveles, this, 2, 0, 1);
		this.btnRegresaNiveles.anchor.set(0.5,0);
		this.btnRegresaNiveles.input.useHandCursor = true;
		// button to "read the article"
		this.btnUp = this.add.button((Mundo._WIDTH - (26 * 2)), (Mundo._HEIGHT - (28 * 3)), 'btn_pad', this.btnMoveUp, this, 0, 0, 1);
		this.btnUp.anchor.set(0.5,0);
		this.btnUp.alpha = 0;
		this.btnUp.inputEnabled = true;
		this.btnUp.events.onInputDown.add(this.btnMoveUp,this);

		this.btnRigtht = this.add.button((Mundo._WIDTH - (26 * 1)), (Mundo._HEIGHT - (28 * 2)), 'btn_pad', this.btnMoveRight, this, 2, 2, 3);
		this.btnRigtht.anchor.set(0.5,0);
		this.btnRigtht.alpha = 0;
		this.btnRigtht.inputEnabled = true;
		this.btnRigtht.events.onInputDown.add(this.btnMoveRight,this);

		this.btnDown = this.add.button((Mundo._WIDTH - (26 * 2)), (Mundo._HEIGHT - (28 * 1)), 'btn_pad', this.btnMoveDown, this, 4, 4, 5);
		this.btnDown.anchor.set(0.5,0);
		this.btnDown.alpha = 0;
		this.btnDown.inputEnabled = true;
		this.btnDown.events.onInputDown.add(this.btnMoveDown,this);

		this.btnLeft = this.add.button((Mundo._WIDTH - (26 * 3)), (Mundo._HEIGHT - (28 * 2)), 'btn_pad', this.btnMoveLeft, this, 6, 6, 7);
		this.btnLeft.anchor.set(0.5,0);
		this.btnLeft.alpha = 0;
		this.btnLeft.inputEnabled = true;
		this.btnLeft.events.onInputDown.add(this.btnMoveLeft,this);

		this.colicionSound = this.game.add.audio('audio-choque');

		this.controlesPantalla();

		Mundo._player = this.balon;
		window.addEventListener("deviceorientation", this.handleOrientation, true);

		this.objNivel;
		this.levelData = [
			[ //1
				{ x: 90, y: 60, t: 'v' },
				{ x: 30, y: 280, t: 'h' },
				{ x: 220, y: 129, t: 'h' },
				{ x: 210, y: 319, t: 'h' },
				{ x: 270, y: 289, t: 'h' },
				{ x: 90, y: 99, t: 'h' },
				{ x: 139, y: 250, t: 'v' },
				{ x: 60, y: 210, t: 'v' },
				{ x: 140, y: 110, t: 'v' },
				{ x: 230, y: 220, t: 'h' },
				{ x: 10, y: 160, t: 'v' },
				{ x: 240, y: 60, t: 'h' }
			],
			[//2
				{ x: 120, y: 309, t: 'h' },
				{ x: 40, y: 300, t: 'h' },
				{ x: 280, y: 60, t: 'h' },
				{ x: 200, y: 270, t: 'h' },
				{ x: 270, y: 279, t: 'h' },
				{ x: 230, y: 90, t: 'h' },
				{ x: 60, y: 169, t: 'h' },
				{ x: 70, y: 60, t: 'v' },
				{ x: 60, y: 250, t: 'v' },
				{ x: 130, y: 229, t: 'v' },
				{ x: 140, y: 110, t: 'v' },
				{ x: 160, y: 169, t: 'v' },
				{ x: 30, y: 119, t: 'v' },
				{ x: 210, y: 220, t: 'v' }
			],
			[//3
				{ x: 80, y: 220, t: 'h' },
				{ x: 240, y: 160, t: 'h' },
				{ x: 40, y: 270, t: 'h' },
				{ x: 280, y: 60, t: 'h' },
				{ x: 210, y: 230, t: 'h' },
				{ x: 270, y: 239, t: 'h' },
				{ x: 230, y: 90, t: 'h' },
				{ x: 30, y: 120, t: 'h' },
				{ x: 70, y: 60, t: 'v' },
				{ x: 144, y: 189, t: 'v' },
				{ x: 133, y: 260, t: 'v' },
				{ x: 140, y: 110, t: 'v' },
				{ x: 31, y: 199, t: 'v' },
				{ x: 69, y: 141, t: 'v' },
				{ x: 181, y: 145, t: 'v' },
				{ x: 92, y: 312, t: 'v' }
			],
			[//4
				{ x: 78, y: 242, t: 'h' },
				{ x: 89, y: 319, t: 'h' },
				{ x: 242, y: 182, t: 'h' },
				{ x: 34, y: 277, t: 'h' },
				{ x: 269, y: 92, t: 'h' },
				{ x: 211, y: 282, t: 'h' },
				{ x: 272, y: 260, t: 'h' },
				{ x: 230, y: 55, t: 'h' },
				{ x: 30, y: 97, t: 'h' },
				{ x: 67, y: 71, t: 'v' },
				{ x: 180, y: 350, t: 'v' },
				{ x: 160, y: 183, t: 'v' },
				{ x: 117, y: 212, t: 'v' },
				{ x: 189, y: 121, t: 'v' },
				{ x: 20, y: 215, t: 'v' },
				{ x: 109, y: 133, t: 'v' },
				{ x: 53, y: 167, t: 'v' },
				{ x: 124, y: 294, t: 'v' }
			],
			[//5
				{ x: 130, y: 258, t: 'h' },
				{ x: 38, y: 397, t: 'h' },
				{ x: 60, y: 309, t: 'h' },
				{ x: 243, y: 182, t: 'h' },
				{ x: 22, y: 257, t: 'h' },
				{ x: 241, y: 74, t: 'h' },
				{ x: 229, y: 300, t: 'h' },
				{ x: 282, y: 239, t: 'h' },
				{ x: 199, y: 59, t: 'h' },
				{ x: 30, y: 110, t: 'h' },
				{ x: 67, y: 71, t: 'v' },
				{ x: 198, y: 359, t: 'v' },
				{ x: 140, y: 168, t: 'v' },
				{ x: 189, y: 238, t: 'v' },
				{ x: 200, y: 141, t: 'v' },
				{ x: 49, y: 228, t: 'v' },
				{ x: 111, y: 121, t: 'v' },
				{ x: 57, y: 169, t: 'v' },
				{ x: 134, y: 336, t: 'v' },
				{ x: 99, y: 389, t: 'v' }
			],
			[//6
				{ x: 80, y: 198, t: 'v' },
				{ x: 210, y: 350, t: 'v' },
				{ x: 83, y: 283, t: 'v' },
				{ x: 260, y: 307, t: 'v' },
				{ x: 110, y: 341, t: 'v' },
				{ x: 140, y: 237, t: 'v' },
				{ x: 32, y: 250, t: 'v' },
				{ x: 199, y: 183, t: 'v' },
				{ x: 35, y: 142, t: 'v' },
				{ x: 213, y: 124, t: 'v' },
				{ x: 127, y: 108, t: 'v' },
				{ x: 161, y: 155, t: 'h' },
				{ x: 183, y: 274, t: 'h' },
				{ x: 291, y: 128, t: 'h' },
				{ x: 56, y: 347, t: 'h' },
				{ x: 274, y: 356, t: 'h' },
				{ x: 173, y: 368, t: 'h' },
				{ x: 263, y: 165, t: 'h' },
				{ x: 14, y: 292, t: 'h' },
				{ x: 244, y: 240, t: 'h' },
				{ x: 212, y: 58, t: 'h' },
				{ x: 102, y: 52, t: 'h' }
				
			],
			[//7
				{ x: 80, y: 209, t: 'v' },
				{ x: 210, y: 350, t: 'v' },
				{ x: 83, y: 283, t: 'v' },
				{ x: 260, y: 307, t: 'v' },
				{ x: 110, y: 341, t: 'v' },
				{ x: 140, y: 237, t: 'v' },
				{ x: 32, y: 250, t: 'v' },
				{ x: 199, y: 183, t: 'v' },
				{ x: 35, y: 142, t: 'v' },
				{ x: 213, y: 124, t: 'v' },
				{ x: 127, y: 108, t: 'v' },
				{ x: 14, y: 183, t: 'v' },
				{ x: 161, y: 155, t: 'h' },
				{ x: 183, y: 274, t: 'h' },
				{ x: 291, y: 128, t: 'h' },
				{ x: 56, y: 347, t: 'h' },
				{ x: 274, y: 356, t: 'h' },
				{ x: 173, y: 368, t: 'h' },
				{ x: 263, y: 165, t: 'h' },
				{ x: 14, y: 292, t: 'h' },
				{ x: 244, y: 240, t: 'h' },
				{ x: 212, y: 58, t: 'h' },
				{ x: 102, y: 52, t: 'h' },
				{ x: 104, y: 137, t: 'h' }
				
			],
			[//8
				{ x: 80, y: 209, t: 'v' },
				{ x: 210, y: 350, t: 'v' },
				{ x: 83, y: 283, t: 'v' },
				{ x: 260, y: 307, t: 'v' },
				{ x: 110, y: 341, t: 'v' },
				{ x: 140, y: 237, t: 'v' },
				{ x: 32, y: 250, t: 'v' },
				{ x: 199, y: 183, t: 'v' },
				{ x: 35, y: 142, t: 'v' },
				{ x: 213, y: 124, t: 'v' },
				{ x: 127, y: 108, t: 'v' },
				{ x: 14, y: 183, t: 'v' },
				{ x: 88, y: 402, t: 'v' },
				{ x: 161, y: 155, t: 'h' },
				{ x: 183, y: 274, t: 'h' },
				{ x: 291, y: 128, t: 'h' },
				{ x: 56, y: 347, t: 'h' },
				{ x: 274, y: 356, t: 'h' },
				{ x: 173, y: 368, t: 'h' },
				{ x: 263, y: 165, t: 'h' },
				{ x: 14, y: 292, t: 'h' },
				{ x: 244, y: 240, t: 'h' },
				{ x: 212, y: 58, t: 'h' },
				{ x: 102, y: 52, t: 'h' },
				{ x: 104, y: 137, t: 'h' },
				{ x: 40, y: 72, t: 'h' }
				
			],
			[//9
				{ x: 80, y: 209, t: 'v' },
				{ x: 210, y: 350, t: 'v' },
				{ x: 83, y: 283, t: 'v' },
				{ x: 260, y: 307, t: 'v' },
				{ x: 110, y: 341, t: 'v' },
				{ x: 140, y: 237, t: 'v' },
				{ x: 32, y: 250, t: 'v' },
				{ x: 199, y: 183, t: 'v' },
				{ x: 35, y: 142, t: 'v' },
				{ x: 213, y: 124, t: 'v' },
				{ x: 127, y: 108, t: 'v' },
				{ x: 14, y: 183, t: 'v' },
				{ x: 88, y: 402, t: 'v' },
				{ x: 214, y: 403, t: 'v' },
				{ x: 161, y: 155, t: 'h' },
				{ x: 183, y: 274, t: 'h' },
				{ x: 291, y: 128, t: 'h' },
				{ x: 56, y: 347, t: 'h' },
				{ x: 274, y: 356, t: 'h' },
				{ x: 173, y: 368, t: 'h' },
				{ x: 263, y: 165, t: 'h' },
				{ x: 14, y: 292, t: 'h' },
				{ x: 244, y: 240, t: 'h' },
				{ x: 212, y: 58, t: 'h' },
				{ x: 102, y: 52, t: 'h' },
				{ x: 104, y: 137, t: 'h' },
				{ x: 40, y: 72, t: 'h' },
				{ x: 18, y: 376, t: 'h' }
				
			],
			[//10
				{ x: 80, y: 209, t: 'v' },
				{ x: 210, y: 350, t: 'v' },
				{ x: 83, y: 283, t: 'v' },
				{ x: 260, y: 307, t: 'v' },
				{ x: 110, y: 341, t: 'v' },
				{ x: 140, y: 237, t: 'v' },
				{ x: 32, y: 250, t: 'v' },
				{ x: 199, y: 183, t: 'v' },
				{ x: 35, y: 142, t: 'v' },
				{ x: 213, y: 124, t: 'v' },
				{ x: 127, y: 108, t: 'v' },
				{ x: 14, y: 183, t: 'v' },
				{ x: 88, y: 402, t: 'v' },
				{ x: 214, y: 403, t: 'v' },
				{ x: 150, y: 130, t: 'v' },
				{ x: 161, y: 155, t: 'h' },
				{ x: 183, y: 274, t: 'h' },
				{ x: 291, y: 128, t: 'h' },
				{ x: 56, y: 347, t: 'h' },
				{ x: 274, y: 356, t: 'h' },
				{ x: 173, y: 368, t: 'h' },
				{ x: 263, y: 165, t: 'h' },
				{ x: 14, y: 292, t: 'h' },
				{ x: 244, y: 240, t: 'h' },
				{ x: 212, y: 58, t: 'h' },
				{ x: 102, y: 52, t: 'h' },
				{ x: 104, y: 137, t: 'h' },
				{ x: 40, y: 72, t: 'h' },
				{ x: 18, y: 376, t: 'h' },
				{ x: 211, y: 208, t: 'h' }

			]
		];

		this.mostrarNivel();
	},
	updateTime: function()
	{
		this.timer++;
		this.tTempo.setText(" Tiempo: "+this.timer);
	},
	update: function() {
		if(this.keys.left.isDown) {
			this.moveBalonLeft();
		}
		else if(this.keys.right.isDown) {
			this.moveBalonRight();
		}
		if(this.keys.up.isDown) {
			this.moveBalonUp();			
		}
		else if(this.keys.down.isDown) {
			this.moveBalonDown();
		}
		if(this.keys.esc.isDown) {
			this.balon.body.velocity.x = 0;
			this.balon.body.velocity.y = 0;
			this.direccio = 0;
			this.balon.velocidadBalon = 0;
			this.balon.animations.play('stop');
		}
		//console.log(this.game.input.keyboard.lastKey); //objeto->event->keycode fue lo unico que encontre o la web https://github.com/photonstorm/phaser/blob/v2.4.4/src/input/Keyboard.js linea 601 inicia
		if((!this.keys.left.isDown && !this.keys.right.isDown && !this.keys.up.isDown && !this.keys.down.isDown))
		{
			this.balon.velocidadBalon --;//= this.movementForce;
			if(this.balon.velocidadBalon <= 10) this.balon.velocidadBalon = 10;
			this.balon.animations.currentAnim.speed = this.balon.velocidadBalon;
		}

		this.physics.arcade.collide(this.balon, this.borderGroup, this.colision, null, this);
		
		this.physics.arcade.overlap(this.balon, this.porteria, this.finishLevel, null, this);

		this.physics.arcade.collide(this.balon, this.objNivel, this.colision, null, this);

	},
	colision: function() {
		if(this.game.audio) {
			this.colicionSound.play();
		}
		/*// Vibration API
		if("vibrate" in window.navigator) {
			window.navigator.vibrate(100);
		}*/
	},
	regresaNiveles: function() {
		
		this.game.state.start('nivelesJuego');
	},
	quitarAudio: function(btn)
	{
		this.game.audio =! this.game.audio;
		btn.animations.play(this.game.audio);
		/*if(this.audio)
		{
			btn.setFrames(1,1,0);
			this.audio = false;
		}
		else
		{
			btn.setFrames(0,0,1);
			this.audio = true;
		}*/
	},
	pausarJuego: function()
	{
		this.game.paused = true;
		var pausedText = this.add.text(Mundo._WIDTH*0.5, 250, "Juego Pausado,\nPresiona la pantalla\npara continuar.", this.fontMessage);
		pausedText.anchor.set(0.5);
		this.input.onDown.add(function(){
			pausedText.destroy();
			this.game.paused = false;
		}, this);
	},
	controlesPantalla: function()
	{
		if(!this.game.displayControl)
		{
			this.btnUp.alpha = 0.5;
			this.btnRigtht.alpha = 0.5;
			this.btnDown.alpha = 0.5;
			this.btnLeft.alpha = 0.5;

			this.btnUp.input.useHandCursor = true;
			this.btnRigtht.input.useHandCursor = true;
			this.btnDown.input.useHandCursor = true;
			this.btnLeft.input.useHandCursor = true;
		}
		else
		{
			this.btnUp.alpha = 0;
			this.btnRigtht.alpha = 0;
			this.btnDown.alpha = 0;
			this.btnLeft.alpha = 0;

			this.btnUp.input.useHandCursor = false;
			this.btnRigtht.input.useHandCursor = false;
			this.btnDown.input.useHandCursor = false;
			this.btnLeft.input.useHandCursor = false;
		}

		this.game.displayControl =! this.game.displayControl;
		Mundo._displayControl = this.game.displayControl;
		
	},
	finishLevel: function()
	{
		if(!this.isGool)
		{
			this.balon.body.velocity.x = 0;
			this.balon.body.velocity.y = 0;
			this.direccio = 0;
			this.balon.velocidadBalon = 0;
			this.balon.animations.play('stop');

			if((this.game.nivelActivo + 1) < this.game.nNiveles)
			{
				this.game.estadoNivel[this.game.nivelActivo].time = this.timer;
				var desb = (this.game.estadoNivel[(this.game.nivelActivo + 1)].active)? 'con nuevo tiempo.': (this.game.nivelActivo + 2) + " desbloqueado.";
				this.game.estadoNivel[(this.game.nivelActivo + 1)].active = true;
				this.add.text((Mundo._WIDTH*0.5)-50, 240, "Gooool!!!", this.fontMessage);
				var msg = this.add.text((Mundo._WIDTH*0.5)-140, 264, "Partido " + desb, this.fontMessage);
				window.localStorage.setItem('estadoNivel',JSON.stringify(this.game.estadoNivel));
			}
			else
			{
				this.game.estadoNivel[this.game.nivelActivo].time = this.timer;
				window.localStorage.setItem('estadoNivel',JSON.stringify(this.game.estadoNivel));

				this.add.text((Mundo._WIDTH*0.5)-50, 240, "Gooool!!!", this.fontMessage);
				var msg = this.add.text((Mundo._WIDTH*0.5)-140, 264, "Felicidades desbloqueo\ntotal.", this.fontMessage);
				
			}	
			var tween = this.game.add.tween(msg).to( { alpha: 1 }, 2000, "Linear", true);
	    	tween.onComplete.add(this.sigNivel, this);
	    	this.isGool = true;
		}
		

	},
	sigNivel: function()
	{
		this.game.state.start('nivelesJuego');
	},
	btnMoveUp: function(btn)
	{
		if(btn.alpha != 0)
		{
			this.keys.up.isDown = (this.keys.up.isDown)?false:true;
			//btn.isDown = (btn.isDown)?false:true;
			//this.moveBalonUp();
		}
	},
	btnMoveLeft: function(btn)
	{
		if(btn.alpha != 0)
		{
			this.keys.left.isDown = (this.keys.left.isDown)?false:true;
			//this.moveBalonLeft();
		}
	},
	btnMoveDown: function(btn)
	{
		if(btn.alpha != 0)
		{
			this.keys.down.isDown = (this.keys.down.isDown)?false:true;
			//this.moveBalonDown();
		}
	},
	btnMoveRight: function(btn)
	{
		if(btn.alpha != 0)
		{
			this.keys.right.isDown = (this.keys.right.isDown)?false:true;
			//this.moveBalonRight();
		}
	},
	moveBalonUp: function()
	{
		this.balon.body.velocity.y -= this.movementForce;
			this.balon.velocidadBalon += this.movementForce;
			if(this.balon.animations.currentAnim.name != 'izquierda')
				this.balon.animations.play('izquierda',this.balon.velocidadBalon, true);
			else
				this.balon.animations.currentAnim.speed = this.balon.velocidadBalon;
	},
	moveBalonLeft: function()
	{
		this.balon.body.velocity.x -= this.movementForce;
			this.balon.velocidadBalon += this.movementForce;
			if(this.balon.animations.currentAnim.name != 'izquierda')
				this.balon.animations.play('izquierda',this.balon.velocidadBalon, true);
			else
				this.balon.animations.currentAnim.speed = this.balon.velocidadBalon;
	},
	moveBalonDown: function()
	{
		this.balon.body.velocity.y += this.movementForce;
			this.balon.velocidadBalon += this.movementForce;
			if(this.balon.animations.currentAnim.name != 'derecha')
				this.balon.animations.play('derecha',this.balon.velocidadBalon, true);
			else
				this.balon.animations.currentAnim.speed = this.balon.velocidadBalon;
	},
	moveBalonRight: function()
	{
		this.balon.body.velocity.x += this.movementForce;
			this.balon.velocidadBalon += this.movementForce;
			if(this.balon.animations.currentAnim.name != 'derecha')
				this.balon.animations.play('derecha',this.balon.velocidadBalon, true);
			else
				this.balon.animations.currentAnim.speed = this.balon.velocidadBalon;
	},
	handleOrientation: function(e) {
		if(!Mundo._displayControl)
		{
			// Device Orientation API
			var x = e.gamma; // range [-90,90], left-right
			var y = e.beta;  // range [-180,180], top-bottom
			var z = e.alpha; // range [0,360], up-down
			Mundo._player.body.velocity.x += x;
			Mundo._player.body.velocity.y += y*0.5;

			Mundo._player.velocidadBalon += 10;
			if(Mundo._player.animations.currentAnim.name != 'izquierda')
				Mundo._player.animations.play('izquierda',Mundo._player.velocidadBalon, true);
			else
				Mundo._player.animations.currentAnim.speed = Mundo._player.velocidadBalon;
		}
		
	},
	mostrarNivel: function()
	{
		var newLevel = this.add.group();
		newLevel.enableBody = true;
		newLevel.physicsBodyType = Phaser.Physics.ARCADE;
		for(var e=0; e<this.levelData[this.game.nivelActivo].length; e++) {
			var item = this.levelData[this.game.nivelActivo][e];
			newLevel.create(item.x, item.y, 'obstaculo-'+item.t);
		}
		newLevel.setAll('body.immovable', true);
		newLevel.visible = true;
		this.objNivel = newLevel;
	}	
};