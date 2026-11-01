package br.com.fiap.fintech.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "T_RECEITA")
@SequenceGenerator(name = "receita_seq", sequenceName = "SEQ_RECEITA", allocationSize = 1)
public class Receita {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "receita_seq")
    private Long id;

    @Column(name = "conta_id", nullable = false)
    private Long contaId;

    @Column(nullable = false, length = 200)
    private String descricao;

    @Column(nullable = false, precision = 15)
    private Double valor;

    @Column(name = "data_receita", nullable = false)
    private LocalDate data;

    @Column(length = 50)
    private String categoria;

    public Receita() {}

    public Receita(Long id, Long contaId, String descricao, Double valor, LocalDate data, String categoria) {
        this.id = id; this.contaId = contaId; this.descricao = descricao;
        this.valor = valor; this.data = data; this.categoria = categoria;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getContaId() { return contaId; }
    public void setContaId(Long contaId) { this.contaId = contaId; }
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    public Double getValor() { return valor; }
    public void setValor(Double valor) { this.valor = valor; }
    public LocalDate getData() { return data; }
    public void setData(LocalDate data) { this.data = data; }
    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }
}
