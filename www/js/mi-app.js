/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        $('#btn-iniciar-juego').click(this.iniciarJuego);
        $( document ).on( "click", "a.btn-inicio", function() {
						$('#tablero').hide();
						$('#pantalla-inicio').show();
				});
    },
    // Al iniciar el juego ocultamos el div de inicio y mostramos el div del tablero
    iniciarJuego: function() {
			var nombreJuego = $('#nombre-juego option:selected').val();
			var objectJuego = null;
			$('#tablero').empty();
			if (nombreJuego == "gato") {
				objectJuego = gato;
			}else if(nombreJuego == "cuatro-en-raya") {
				objectJuego = cuatroEnRaya;
			}else if(nombreJuego == "memorama") {
				objectJuego = memorama;
			}
			$('#tablero').load(
				'./'+nombreJuego+'/plantilla.html',
				null,
				objectJuego.inicio
			);
      $('#pantalla-inicio').hide();
      $('#tablero').show();
    },
    randomRange: function (min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
};
