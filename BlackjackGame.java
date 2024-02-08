package edu.fje.daw2.restcartasblackjack;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Path("/blackjack")
public class BlackjackGame {

    private Map<String, Partida> partidas;

    public BlackjackGame() {
        this.partidas = new HashMap<>();
    }

    @POST
    @Path("/iniciarJoc/{codiPartida}/{jugador}")
    public String iniciarJoc(@PathParam("codiPartida") String codiPartida,
                             @PathParam("jugador") String jugador) {
        Partida nuevaPartida = new Partida();
        nuevaPartida.getJugadores().add(jugador);
        this.partidas.put(codiPartida, nuevaPartida);

        return String.format("El jugador %s ha iniciado la Partida de Blackjack %s.", jugador, codiPartida);
    }

    @GET
    @Path("/pedirCarta/{codiPartida}/{jugador}")
    @Produces(MediaType.TEXT_PLAIN)
    public String pedirCarta(@PathParam("codiPartida") String codiPartida,
                             @PathParam("jugador") String jugador) {
        if (!this.partidas.containsKey(codiPartida)) {
            iniciarJoc(codiPartida, jugador);
        }

        Partida partida = this.partidas.get(codiPartida);
        List<Carta> nuevasCartasJugador = generarCarta();
        List<Carta> nuevasCartasCrupier = generarCarta();

        partida.getCartas().addAll(nuevasCartasJugador);
        partida.getJugador().get(jugador).addAll(nuevasCartasJugador);
        partida.getCrupier().addAll(nuevasCartasCrupier);

        String cartasString = nuevasCartasJugador.stream()
                .map(carta -> String.format("%s (%d)", carta.getCarta(), carta.getValor()))
                .reduce((carta1, carta2) -> carta1 + ", " + carta2)
                .orElse("");

        return String.format("El jugador %s ha recibido las cartas: %s.", jugador, cartasString);
    }

    @PUT
    @Path("/plantarse/{codiPartida}/{jugador}")
    @Produces(MediaType.APPLICATION_JSON)
    public String plantarse(@PathParam("codiPartida") String codiPartida,
                            @PathParam("jugador") String jugador) {
        Partida partida = this.partidas.get(codiPartida);

        if (partida == null || partida.getJugador().get(jugador) == null || partida.getCrupier() == null) {
            return "{\"resultado\": \"Error: Datos de la partida incompletos.\"}";
        }

        List<Carta> cartasJugador = partida.getJugador().get(jugador);
        List<Carta> cartasCrupier = partida.getCrupier();

        if (cartasJugador == null || cartasCrupier == null) {
            return "{\"resultado\": \"Error: Datos de las cartas incompletos.\"}";
        }

        Puntos puntosJugador = calcularPuntos(cartasJugador);
        Puntos puntosCrupier = calcularPuntos(cartasCrupier);

        String resultado;

        if (puntosJugador.getJugador() > puntosCrupier.getCrupier()) {
            resultado = String.format("%s ha ganado con %d. ¡Felicidades!", jugador, puntosJugador.getJugador());
        } else if (puntosJugador.getJugador() < puntosCrupier.getCrupier()) {
            resultado = String.format("%s ha perdido con %d. El crupier tiene %d.", jugador, puntosJugador.getJugador(), puntosCrupier.getCrupier());
        } else {
            resultado = "Empate. No hay ganador.";
        }

        return String.format("{\"resultado\": \"%s\"}", resultado);
    }

    private Puntos calcularPuntos(List<Carta> cartas) {
        int puntos = 0;
        boolean tieneAs = false;

        for (Carta carta : cartas) {
            int valorCarta = carta.getValor();

            if (valorCarta == 10 || valorCarta == 11 || valorCarta == 12) {
                puntos += 10;
            } else if (valorCarta == 0) {
                puntos += 11;
                tieneAs = true;
            } else {
                puntos += valorCarta + 1;
            }
        }

        while (tieneAs && puntos > 21) {
            puntos -= 10;
            tieneAs = false;
        }

        Puntos puntosObj = new Puntos();
        puntosObj.setJugador(puntos);
        puntosObj.setCrupier(puntos);

        return puntosObj;
    }

    private List<Carta> generarCarta() {
        Random random = new Random();
        List<Carta> clavesCartas = Cartas.getCards();
        Carta cartaAleatoria1 = clavesCartas.get(random.nextInt(clavesCartas.size()));
        Carta cartaAleatoria2 = clavesCartas.get(random.nextInt(clavesCartas.size()));

        List<Carta> nuevasCartas = new ArrayList<>();
        nuevasCartas.add(cartaAleatoria1);
        nuevasCartas.add(cartaAleatoria2);

        return nuevasCartas;
    }

    private static class Partida {
        private List<String> jugadores;
        private List<Carta> cartas;
        p


