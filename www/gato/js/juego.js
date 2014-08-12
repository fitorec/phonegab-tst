var gato = {
	/* Variable para el control de fichas activas(sin tirar) */
	fichasActivas: 0,
	fichaPersonaValor: null,
	fichaMaquinaValor: null,
	inicio: function() {
		gato.fichasActivas = 0;
		$('#tablero .ficha').click(function() {
			gato.fichaPersonaValor = 'x';
			gato.fichaMaquinaValor = 'o';
			gato.tiroPersona($(this));
		});
	},
	/**
	 * Obtiene y devuelve una ficha a partir de sus indices fila y columna
	 **/
	ficha: function(fila, columna) {
		return $('#gato .fila-' + fila + '.columna-' + columna);
	},
	/**
	 * Función encargada de manejar el evento cuando tira una persona
	 **/
	tiroPersona: function($el) {
		var fichaActiva = parseInt($el.attr('data-activa'));
		if ((gato.fichasActivas > 8) ||  fichaActiva == 1) {
			return;
		}
		gato.marcarFicha($el, gato.fichaPersonaValor);
		gato.tirarMaquina();
	},

	/**
	 * Función encargada de realizar un tiro en el tablero
	 **/
	tirarMaquina: function() {
		if (gato.fichasActivas > 8) {
			return;
		}
		if(gato.maquinaTiroGanador()) {
			return;//
		}
		if(gato.maquinaTiroDefensa()) {
			return;//
		}
		gato.maquinaForzarTiro();
	},
	/*
	 * Busca una posibilidad de gane en el tablero:
	 *  - Si la encuentra   : tira y devuelve true
	 *  - Si no la encuentra: solo devuelve false
	 */
	maquinaTiroGanador: function() {
		//Logica puedo ganar?
		// if(puedoGanar_en_ficha($ficha)) {
		//     gato.marcarFicha($ficha, gato.fichaMaquinaValor);
		//     return true;
		// }
		return false;
	},
	/*
	 * Busca una amenaza evidente de pierde en el tablero:
	 *  - Si la encuentra   : tira y devuelve true
	 *  - Si no la encuentra: solo devuelve false
	 */
	maquinaTiroDefensa: function() {
		//Logica puedo impedir el gane?
		// if (puedoImpedirElGaneTirandoEnFicha($ficha)) {
		//      gato.marcarFicha($ficha, gato.fichaMaquinaValor);
		//      return true;
		// }
		return false;
	},
	/*
	 * Aqui deberia de venir la logica de nuestra siguiente jugada,
	 * debemos de analizar el estado del tablero y realizar el tiro que
	 * mejor nos convenga.
	 *
	 * Nota: De momento solo realizar un tiro aleatorio
	 */
	maquinaForzarTiro: function() {
		while(1) {
			var f = app.randomRange(0, 2);
			var c = app.randomRange(0, 2);
			var $ficha = gato.ficha(f, c);
			if (parseInt($ficha.attr('data-activa')) == 0) {
				gato.marcarFicha($ficha, gato.fichaMaquinaValor);
				break;
			}
		}
	},
	marcarFicha: function($ficha, val) {
		$ficha.attr('data-activa', '1');
		$ficha.attr('data-valor-ficha', val);
		gato.fichasActivas++;
		if (gato.fichasActivas == 9) {
			gato.fin();
		}
		console.log('Número de fichas: ' + gato.fichasActivas);
	},
	quienGano: function(){
	}
	fin: function() {
		var msgGanador = quienGano();
		$('#gato').append(
			'<div class="resultado">' +
			'<h1>Has ganado</h1>' +
			'<a class="event received btn-inicio" href="#">' +
			'Iniciar Juego</a>' +
			'<div>'
		);
	}
};