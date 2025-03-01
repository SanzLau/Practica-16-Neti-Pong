window.onload = function() {
    // Variables globales
    var svg = document.getElementById("lienzo");
    var bola = document.getElementById("bola");
    var paletaIzq = document.getElementById("paletaIzq");
    var paletaDer = document.getElementById("paletaDer");
    var puntosJugador = document.getElementById("puntosJugador");
    var puntosCPU = document.getElementById("puntosCPU");

    var bolaX = 400, bolaY = 300, velocidadX = 4, velocidadY = 4;
    var paletaIzqY = 250, paletaDerY = 250;
    var puntosJ = 0, puntosC = 0;

    var alturaPaleta = 100, velocidadPaleta = 6;

    // Detecta las teclas presionadas
    var teclas = {};
    window.addEventListener("keydown", function(e) { teclas[e.key] = true; });
    window.addEventListener("keyup", function(e) { teclas[e.key] = false; });

    // Inicia el juego
    function netipong() {
        setInterval(actualizar, 16);
    }
    
    netipong(); // Llamar a la función después de cargar la página

    // Función principal de actualización
    function actualizar() {
        moverPaletas();
        moverBola();
    }

    // Mueve las paletas del jugador con "W" y "S"
    function moverPaletas() {
        if (teclas["w"] && paletaIzqY > 0) {
            paletaIzqY -= velocidadPaleta;
        }
        if (teclas["s"] && paletaIzqY < 500) {
            paletaIzqY += velocidadPaleta;
        }
        paletaIzq.setAttribute("y", paletaIzqY);

        // Movimiento automático de la CPU (seguimiento de la bola)
        if (paletaDerY + alturaPaleta / 2 < bolaY) {
            paletaDerY += velocidadPaleta;
        }
        if (paletaDerY + alturaPaleta / 2 > bolaY) {
            paletaDerY -= velocidadPaleta;
        }
        paletaDer.setAttribute("y", paletaDerY);
    }

    // Mueve la bola y detecta colisiones
    function moverBola() {
        bolaX += velocidadX;
        bolaY += velocidadY;

        // Rebote en los bordes superior e inferior
        if (bolaY <= 0 || bolaY >= 600) {
            velocidadY *= -1;
        }

        // Colisión con la paleta izquierda
        if (bolaX <= 30 && bolaY > paletaIzqY && bolaY < paletaIzqY + alturaPaleta) {
            velocidadX *= -1;
            bolaX = 30;
        }

        // Colisión con la paleta derecha (CPU)
        if (bolaX >= 750 && bolaY > paletaDerY && bolaY < paletaDerY + alturaPaleta) {
            velocidadX *= -1;
            bolaX = 750;
        }

        // Punto para la CPU
        if (bolaX <= 0) {
            puntosC++;
            resetBola();
        }

        // Punto para el jugador
        if (bolaX >= 800) {
            puntosJ++;
            resetBola();
        }

        // Actualizar la posición de la bola
        bola.setAttribute("cx", bolaX);
        bola.setAttribute("cy", bolaY);

        // Actualizar marcador
        puntosJugador.textContent = puntosJ;
        puntosCPU.textContent = puntosC;
    }

    // Reinicia la posición de la bola al centro
    function resetBola() {
        bolaX = 400;
        bolaY = 300;
        velocidadX = (Math.random() > 0.5 ? 4 : -4);
        velocidadY = (Math.random() > 0.5 ? 4 : -4);
    }
};
