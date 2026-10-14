package model;

import java.time.LocalDate;

public class Receita {

    private int id;
    private int contaId;
    private String descricao;
    private double valor;
    private LocalDate data;
    private String categoria;

    public Receita() {
    }

    public Receita(int id, int contaId, String descricao, double valor, LocalDate data, String categoria) {
        this.id = id;
        this.contaId = contaId;
        this.descricao = descricao;
        this.valor = valor;
        this.data = data;
        this.categoria = categoria;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getContaId() {
        return contaId;
    }

    public void setContaId(int contaId) {
        this.contaId = contaId;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public double getValor() {
        return valor;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    @Override
    public String toString() {
        return "Receita [id=" + id
                + ", contaId=" + contaId
                + ", descricao=" + descricao
                + ", valor=" + valor
                + ", data=" + data
                + ", categoria=" + categoria + "]";
    }
}
