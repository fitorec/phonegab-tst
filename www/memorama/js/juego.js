var memorama = {
	/* Variable para el control de fichas activas(sin tirar) */
	fichasActivas: 0,
	fichaPersonaValor: null,
	fichaMaquinaValor: null,
	inicio: function() {
		memorama.fichasActivas = 0;
		$('#tablero .ficha').click(function() {
			memorama.fichaPersonaValor = 'x';
			memorama.fichaMaquinaValor = 'o';
			memorama.tiroPersona($(this));
		});
	},
	/**
	 * Obtiene y devuelve una ficha a partir de sus indices fila y columna
	 **/
	ficha: function(fila, columna) {
		return $('#memorama .fila-' + fila + '.columna-' + columna);
	},
	/**
	 * Función encargada de manejar el evento cuando tira una persona
	 **/
	tiroPersona: function($el) {
		var fichaActiva = parseInt($el.attr('data-activa'));
		if ((memorama.fichasActivas > 15) ||  fichaActiva == 1) {
			return;
		}
		memorama.marcarFicha($el, memorama.fichaPersonaValor);
		memorama.tirarMaquina();
	},

	/**
	 * Función encargada de realizar un tiro en el tablero
	 **/
	tirarMaquina: function() {
		if (memorama.fichasActivas > 15) {
			return;
		}
		if(memorama.maquinaTiroGanador()) {
			return;//
		}
		if(memorama.maquinaTiroDefensa()) {
			return;//
		}
		memorama.maquinaForzarTiro();
	},
	/*
	 * Busca una posibilidad de gane en el tablero:
	 *  - Si la encuentra   : tira y devuelve true
	 *  - Si no la encuentra: solo devuelve false
	 */
	maquinaTiroGanador: function() {
		//Logica puedo ganar?
		// if(puedoGanar_en_ficha($ficha)) {
		//     memorama.marcarFicha($ficha, memorama.fichaMaquinaValor);
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
		//      memorama.marcarFicha($ficha, memorama.fichaMaquinaValor);
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
			var f = app.randomRange(0, 3);
			var c = app.randomRange(0, 3);
			var $ficha = memorama.ficha(f, c);
			if (parseInt($ficha.attr('data-activa')) == 0) {
				memorama.marcarFicha($ficha, memorama.fichaMaquinaValor);
				break;
			}
		}
	},
	marcarFicha: function($ficha, val) {
		$ficha.attr('data-activa', '1');
		$ficha.attr('data-valor-ficha', val);
		memorama.fichasActivas++;
		if (memorama.fichasActivas == 16) {
			memorama.fin();
		}
		console.log('Número de fichas: ' + memorama.fichasActivas);
	},
	quienGano: function(){
		return "Has ganado";
	},
	fin: function() {
		var msgGanador = memorama.quienGano();
		app.finJuego($('#memorama'), msgGanador);
	}
};