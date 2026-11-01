package br.com.fiap.fintech.model;

import jakarta.persistence.*;

@Entity
@Table(name = "T_CONTA")
@SequenceGenerator(name = "conta_seq", sequenceName = "SEQ_CONTA", allocationSize = 1)
public class Conta {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "conta_seq")
    private Long id;

    @Column(nullable = false, length = 100)
    private String titular;

    @Column(name = "tipo_conta", nullable = false, length = 30)
    private String tipoConta;

    @Column(precision = 15)
    private Double saldo;

    @Column(nullable = false, length = 10)
    private String agencia;

    @Column(name = "numero_conta", nullable = false, length = 20)
    private String numeroConta;

    public Conta() {}

    public Conta(Long id, String titular, String tipoConta, Double saldo, String agencia, String numeroConta) {
        this.id = id;
        this.titular = titular;
        this.tipoConta = tipoConta;
        this.saldo = saldo;
        this.agencia = agencia;
        this.numeroConta = numeroConta;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitular() { return titular; }
    public void setTitular(String titular) { this.titular = titular; }
    public String getTipoConta() { return tipoConta; }
    public void setTipoConta(String tipoConta) { this.tipoConta = tipoConta; }
    public Double getSaldo() { return saldo; }
    public void setSaldo(Double saldo) { this.saldo = saldo; }
    public String getAgencia() { return agencia; }
    public void setAgencia(String agencia) { this.agencia = agencia; }
    public String getNumeroConta() { return numeroConta; }
    public void setNumeroConta(String numeroConta) { this.numeroConta = numeroConta; }
}
