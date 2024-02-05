const cartas = require('./json/array.json');

class BlackjackGame {
    constructor() {
        this.partidas = {};
    }

    iniciarJoc(codiPartida, jugador) {
        this.partidas[codiPartida] = {
            jugadores: [jugador],
            cartas: [],
            crupier: {
                cartas: []
            }
        };
    }

    pedirCarta(codiPartida, jugador) {
        if (!this.partidas[codiPartida]) {
            this.iniciarJoc(codiPartida);
        } else if (!this.partidas[codiPartida].cartas) {
            this.partidas[codiPartida].cartas = [];
        }
    
        if (!this.partidas[codiPartida].jugador) {
            this.partidas[codiPartida].jugador = {};
        }
    
        if (!this.partidas[codiPartida].jugador[jugador]) {
            this.partidas[codiPartida].jugador[jugador] = { cartas: [] };
        }
    
        const nuevasCartasJugador = this.generarCarta();
        const nuevasCartasCrupier = this.generarCarta();
    
        this.partidas[codiPartida].cartas.push(...nuevasCartasJugador, ...nuevasCartasCrupier);
        this.partidas[codiPartida].jugador[jugador].cartas.push(...nuevasCartasJugador);
        this.partidas[codiPartida].crupier.cartas.push(...nuevasCartasCrupier);
    
        console.log('Cartas del Jugador:', nuevasCartasJugador);
        console.log('Cartas del Crupier:', nuevasCartasCrupier);

        return {
            jugador: nuevasCartasJugador,
            crupier: nuevasCartasCrupier
        };
    }
    

    plantarse(codiPartida, jugador) {
        const partida = this.partidas[codiPartida];
    
        if (!partida || !partida.jugador || !partida.jugador[jugador] || !partida.crupier || !partida.crupier.cartas) {
            return { resultado: "Error: Datos de la partida incompletos." };
        }
    
        const cartasJugador = partida.jugador[jugador].cartas;
        const cartasCrupier = partida.crupier.cartas;
    
        if (!cartasJugador || !cartasCrupier) {
            return { resultado: "Error: Datos de las cartas incompletos." };
        }
    
        const puntosJugador = this.calcularPuntos(cartasJugador);
        const puntosCrupier = this.calcularPuntos(cartasCrupier);
    
        let resultado = '';
    
        if (puntosJugador.jugador.puntos > puntosCrupier.crupier.puntos) {
            resultado = `${jugador} ha ganado con ${puntosJugador.jugador.puntos}. Felicidades!`;
        } else if (puntosJugador.jugador.puntos < puntosCrupier.crupier.puntos) {
            resultado = `${jugador} ha perdido con ${puntosJugador.jugador.puntos}. El crupier tiene ${puntosCrupier.crupier.puntos}.`;
        } else {
            resultado = 'Empate. No hay ganador.';
        }
    
        return { resultado: resultado };
    }

    calcularPuntos(cartas, jugador, crupier) {
        let puntos = 0;
        let tieneAs = false;
    
        if (!jugador) {
            jugador = { puntos: 0 };
        }
    
        if (!crupier) {
            crupier = { puntos: 0 };
        }
    
        cartas.forEach(carta => {
            const valorCarta = carta.valor;
    
            if (valorCarta === 'rey' || valorCarta === 'reina' || valorCarta === 'jota') {
                puntos += 10;
            } else if (valorCarta === 'as') {
                puntos += 11;
                tieneAs = true;
            } else {
                puntos += valorCarta;
            }
        });
    
        while (tieneAs && puntos > 21) {
            puntos -= 10;
            tieneAs = false;
        }
    
        jugador.puntos = puntos;
        crupier.puntos = puntos;
    
        return {
            jugador: {
                puntos: jugador.puntos,
            },
            crupier: {
                puntos: crupier.puntos,
            }
        };
    }

    generarCarta(){    
        const clavesCartas = cartas.cartas;
        const cartaAleatoria1 = clavesCartas[Math.floor(Math.random() * clavesCartas.length)];
        const cartaAleatoria2 = clavesCartas[Math.floor(Math.random() * clavesCartas.length)];

        const nuevaCarta1 = {
            carta: cartaAleatoria1.carta,
            valor: cartaAleatoria1.valor,
        };

        const nuevaCarta2 = {
            carta: cartaAleatoria2.carta,
            valor: cartaAleatoria2.valor,
        };

        return [nuevaCarta1, nuevaCarta2];
    }
};

module.exports = BlackjackGame;
