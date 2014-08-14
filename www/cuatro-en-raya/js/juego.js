var cuatroEnRaya = {
	/* Variable para el control de fichas activas(sin tirar) */
	fichasActivas: 0,
	fichaPersonaValor: null,
	fichaMaquinaValor: null,
	inicio: function() {
		cuatroEnRaya.fichasActivas = 0;
		$('#tablero .ficha').click(function() {
			cuatroEnRaya.fichaPersonaValor = 'x';
			cuatroEnRaya.fichaMaquinaValor = 'o';
			cuatroEnRaya.tiroPersona($(this));
		});
	},
	/**
	 * Obtiene y devuelve una ficha a partir de sus indices fila y columna
	 **/
	ficha: function(fila, columna) {
		return $('#cuatro-en-raya .fila-' + fila + '.columna-' + columna);
	},
	/**
	 * Función encargada de manejar el evento cuando tira una persona
	 **/
	tiroPersona: function($el) {
		var fichaActiva = parseInt($el.attr('data-activa'));
		if ((cuatroEnRaya.fichasActivas > 41) ||  fichaActiva == 1) {
			return;
		}
		cuatroEnRaya.marcarFicha($el, cuatroEnRaya.fichaPersonaValor);
		cuatroEnRaya.tirarMaquina();
	},

	/**
	 * Función encargada de realizar un tiro en el tablero
	 **/
	tirarMaquina: function() {
		if (cuatroEnRaya.fichasActivas > 41) {
			return;
		}
		if(cuatroEnRaya.maquinaTiroGanador()) {
			return;//
		}
		if(cuatroEnRaya.maquinaTiroDefensa()) {
			return;//
		}
		cuatroEnRaya.maquinaForzarTiro();
	},
	/*
	 * Busca una posibilidad de gane en el tablero:
	 *  - Si la encuentra   : tira y devuelve true
	 *  - Si no la encuentra: solo devuelve false
	 */
	maquinaTiroGanador: function() {
		//Logica puedo ganar?
		// if(puedoGanar_en_ficha($ficha)) {
		//     cuatroEnRaya.marcarFicha($ficha, cuatroEnRaya.fichaMaquinaValor);
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
		//      cuatroEnRaya.marcarFicha($ficha, cuatroEnRaya.fichaMaquinaValor);
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
			var f = app.randomRange(0, 6);
			var c = app.randomRange(0, 7);
			var $ficha = cuatroEnRaya.ficha(f, c);
			if (parseInt($ficha.attr('data-activa')) == 0) {
				cuatroEnRaya.marcarFicha($ficha, cuatroEnRaya.fichaMaquinaValor);
				break;
			}
		}
	},
	marcarFicha: function($ficha, val) {
		$ficha.attr('data-activa', '1');
		$ficha.attr('data-valor-ficha', val);
		cuatroEnRaya.fichasActivas++;
		if (cuatroEnRaya.fichasActivas == 42) {
			cuatroEnRaya.fin();
		}
		console.log('Número de fichas: ' + cuatroEnRaya.fichasActivas);
	},
	quienGano: function(){
		return "Has ganado";
	},
	fin: function() {
		var msgGanador = cuatroEnRaya.quienGano();
		app.finJuego($('#cuatro-en-raya'), msgGanador);
	}
};