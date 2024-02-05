const express = require('express');
const router = express.Router();
const BlackjackGame = require('./game2');

const blackjackGame = new BlackjackGame();

router.post('/iniciarJoc/:codiPartida/:jugador', (req, res) => {
  const codiPartida = req.params.codiPartida;
  const jugador = req.params.jugador;

  console.log('Parámetros de la ruta:', req.params);
  console.log('Código de la Partida:', codiPartida);
  console.log('Nombre del Jugador:', jugador);

  blackjackGame.iniciarJoc(codiPartida, jugador);

  res.send(`El jugador ${jugador} ha iniciado la Partida de Blackjack ${codiPartida}.`);
});

router.get('/pedirCarta/:codiPartida/:jugador', (req, res) => {
  const codiPartida = req.params.codiPartida;
  const jugador = req.params.jugador;
  
  const crupier = blackjackGame.partidas[codiPartida].crupier;
  const cartas = blackjackGame.pedirCarta(codiPartida, jugador, crupier);

  const cartasString = cartas.jugador.map(carta => `${carta.carta} (${carta.valor})`).join(', ');
  res.send(`El jugador ${jugador} ha recibido las cartas: ${cartasString}.`);

  console.log('Parámetros de la ruta:', req.params);
  console.log('Código de la Partida:', codiPartida);
  console.log('Nombre del Jugador:', jugador);
});

router.put('/plantarse/:codiPartida/:jugador', (req, res) => {
  const codiPartida = req.params.codiPartida;
  const jugador = req.params.jugador;
  const resultado = blackjackGame.plantarse(codiPartida, jugador);

  res.json({resultado}); 

});

module.exports = router;
