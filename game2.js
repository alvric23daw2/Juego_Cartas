// game.js

class BlackjackGame {
    constructor() {
        this.partidas = {};
    }

    // Inicializar una nueva partida de Blackjack
    iniciarJoc(codiPartida, jugador) {
        this.partidas[codiPartida] = {
            jugadores: [jugador],
            cartas: [],
        };
    }

    // Verificar si la partida existe y tiene la propiedad 'cartas'
    pedirCarta(codiPartida) {
        if (!this.partidas[codiPartida]) {
            this.iniciarJoc(codiPartida);
        } else if (!this.partidas[codiPartida].cartas) {
            this.partidas[codiPartida].cartas = [];
        }

        // Generar una carta y agregarla a las cartas de la partida
        const nuevaCarta = this.generarCarta();
        this.partidas[codiPartida].cartas.push(nuevaCarta);

        return nuevaCarta;
    }

    // Comprobar si el juego existe y tiene la propiedad 'cartas'
    plantarse(codiPartida, jugador) {
        if (!this.partidas[codiPartida] || !this.partidas[codiPartida].cartas) {
            return 'Partida no encontrada. Por favor, inicia una nueva partida.';
        }

        // Comprobar si el jugador existe en el juego
        if (!this.partidas[codiPartida].jugadores.includes(jugador)) {
            return 'Jugador no encontrado en la partida.';
        }

        // Calcular el total de puntos de las cartas del jugador
        const puntosJugador = this.calcularPuntos(this.partidas[codiPartida].cartas, jugador);

        // Simular la acción de que un jugador se planta
        // Puedes implementar la lógica aquí para determinar el resultado del juego según los puntos
        // Por simplicidad, simplemente devolvemos un mensaje indicando que el jugador se ha plantado
        return `${jugador} se ha plantado con ${puntosJugador} puntos. Fin del turno.`;
    }

    // Función auxiliar para calcular el total de puntos de las cartas de un jugador
    calcularPuntos(cartas, jugador) {
        // Implementa tu lógica para calcular el total de puntos del jugador
        // Por simplicidad, asumimos que cada carta tiene un valor igual a su rango (ignorando las cartas con figuras por ahora)
        const puntos = cartas.reduce((acumulador, carta) => {
            // Extraer el valor numérico de la carta y sumarlo al total
            const valorCarta = parseInt(carta.valor);
            return `${jugador} te has plantado con ${acumulador + valorCarta}puntos `;
        }, 0);

        return puntos;
    }

    // Función auxiliar para generar una carta (puedes personalizarla según tus necesidades)
    generarCarta() {
        const cartas = {
            '🂡': 11, '🂢': 2, '🂣': 3, '🂤': 4, '🂥': 5, '🂦': 6, '🂧': 7, '🂨': 8, '🂩': 9, '🂪': 10,
            '🂫': 10, '🂭': 10, '🂮': 10, '🂱': 11, '🂲': 2, '🂳': 3, '🂴': 4, '🂵': 5, '🂶': 6, '🂷': 7,
            '🂸': 8, '🂹': 9, '🂺': 10, '🂻': 10, '🂼': 10, '🂽': 10, '🂱': 11, '🂲': 2, '🂳': 3, '🂴': 4, '🂵': 5, '🂶': 6, '🂷': 7,
            '🂸': 8, '🂹': 9, '🂺': 10, '🂻': 10, '🂼': 10, '🂽': 10, '🂱': 11, '🂲': 2, '🂳': 3, '🂴': 4, '🂵': 5, '🂶': 6, '🂷': 7,
            '🂸': 8, '🂹': 9, '🂺': 10, '🂻': 10, '🂼': 10, '🂽': 10,
        };
    
        const clavesCartas = Object.keys(cartas);
        const cartaAleatoria = clavesCartas[Math.floor(Math.random() * clavesCartas.length)];
    
        return {
            carta: cartaAleatoria,
            valor: cartas[cartaAleatoria],
        };
    }
    
}

module.exports = BlackjackGame;
