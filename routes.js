// routes.js

const express = require('express');
const router = express.Router();
const BlackjackGame = require('./game2');

const blackjackGame = new BlackjackGame();

router.post('/iniciarJoc/:codiPartida', (req, res) => {
  const codiPartida = req.params.codiPartida;
  blackjackGame.iniciarJoc(codiPartida);
  res.send('Partida de Blackjack iniciada.');
});

router.get('/pedirCarta/:codiPartida', (req, res) => {
  const codiPartida = req.params.codiPartida;
  const carta = blackjackGame.pedirCarta(codiPartida);
  res.json({ carta });
});

router.put('/plantarse/:codiPartida', (req, res) => {
  const codiPartida = req.params.codiPartida;
  const resultado = blackjackGame.plantarse(codiPartida);
  res.json({ resultado });
});

module.exports = router;
