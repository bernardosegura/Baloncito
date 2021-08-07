Mundo.niveles = function(game) {};
Mundo.niveles.prototype = {

	create: function() {
		this.add.sprite(0, 0, 'nivelesPantalla');
		this.fontSmall = { font: "16px Arial", fill: "#b7fff9",stroke: "#000000", strokeThickness: 2 };//2196f3//1ca300

		this.btnRegresaMenu = this.add.button(53, 380, 'boton-menu', this.regresaMenu, this, 2, 0, 1);
		this.btnRegresaMenu.anchor.set(0.5,0);
		this.btnRegresaMenu.input.useHandCursor = true;
		this.game.nNiveles = 10;
		this.game.nivelActivo = 0;
		
		this.nivel = [];
		if(window.localStorage.getItem('estadoNivel') === null)
		{
			this.game.estadoNivel =[];
			for (var j = 0; j < this.game.nNiveles; j++) { //se crea los nuiveles primera vez
			 	if(j == 0)
			 	{
			 		this.game.estadoNivel[j] = {time: 0, active: true};
			 	}
			 	else
			 	{
			 		this.game.estadoNivel[j] = {time: 0, active: false};
			 	}
			 } 
		}
		else
		{
			this.game.estadoNivel = "constructor"["constructor"]["constructor"]( "return " + window.localStorage.getItem('estadoNivel'))();
		}
		
		var txtUltRes = this.game.add.text(35, 315, "Ultimo Resultado: ", this.fontSmall);
 		var record = 0, total = 0;
		var xB = 0, yB = 0;
		for(var i=0;i < this.game.estadoNivel.length; i++)
		{
			if (i%4 == 0 && xB != 0) 
			{
				xB = 0;
				yB += 58;
			}
			this.nivel[i] = this.add.button(87 + ( xB * 48), 111 + yB, 'nivel', this.iniciarNivel, this, 2, ((this.game.estadoNivel[i].active)?0:3), 1);
			this.nivel[i].sprite = this.nivel[i].animations.sprite;
			this.nivel[i].anchor.set(0.5,0);
			this.nivel[i].input.useHandCursor = true;
			this.nivel[i].inputEnabled = this.game.estadoNivel[i].active;
			this.nivel[i].numNivel = i;

			if(this.game.estadoNivel[i].active)
			{
			//	txtUltRes.setText("Ultimo Resultado: " + this.game.estadoNivel[((i-1 >= 0)?(i-1):i)].time + " seg.");
				total++;
				record += this.game.estadoNivel[i].time;
			}

			txtUltRes.setText("Tu posición: " + Math.round(record / total));

			this.game.add.text((87 + ( xB * 48))-5, (111 + yB) + 30, i+1, this.fontSmall);
			xB++;
		}

		
		// button to "read the article"
	},
	iniciarNivel: function(btn) {
		this.game.nivelActivo = btn.numNivel;
		this.game.state.start('stJugar');
	},
	regresaMenu: function(n) {
		this.game.state.start('menuPrincipal');
	}
};