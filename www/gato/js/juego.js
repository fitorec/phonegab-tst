var gato = {
	fichasActivas: 0,
	inicio: function() {
		fichasActivas = 0;
		$('#tablero .ficha').click(function() {
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
		gato.marcarFicha($el, 'x');
		gato.tirarMaquina();
	},
	/**
	 * Función encargada de realizar un tiro en el tablero
	 **/
	tirarMaquina: function() {
		if (gato.fichasActivas > 8) {
			return;
		}
		//gato.maquinaPuedoGanar();
		//gato.maquinaTiroDefensa();
		gato.maquinaTiroAleatorio();
	},
	maquinaTiroAleatorio: function() {
		while(1) {
			var f = app.randomRange(0, 2);
			var c = app.randomRange(0, 2);
			var $ficha = gato.ficha(f, c);
			if (parseInt($ficha.attr('data-activa')) == 0) {
				gato.marcarFicha($ficha, 'o');
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
	}
	,fin: function() {
		$('#gato').append(
			'<div class="resultado">' +
			'<h1>Has ganado</h1>' +
			'<a class="event received btn-inicio" href="#">' +
			'Iniciar Juego</a>' +
			'<div>'
		);
	}
};