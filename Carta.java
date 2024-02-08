package edu.fje.daw2.restcartasblackjack;

public class Carta {
    private String Carta;
    private int valor;

    public Carta() {
    }

    public String getCarta() {
        return Carta;
    }

    public void setCarta(String carta) {
        Carta = carta;
    }

    public int getValor() {
        return valor;
    }

    public void setValor(int valor) {
        this.valor = valor;
    }

    public Carta(String carta, int valor) {
        this.carta = carta;
        this.valor = valor;
    }


}

