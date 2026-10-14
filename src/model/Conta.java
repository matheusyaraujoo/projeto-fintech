package model;

public class Conta {

    private int id;
    private String titular;
    private String tipoConta;
    private double saldo;
    private String agencia;
    private String numeroConta;

    public Conta() {
    }

    public Conta(int id, String titular, String tipoConta, double saldo, String agencia, String numeroConta) {
        this.id = id;
        this.titular = titular;
        this.tipoConta = tipoConta;
        this.saldo = saldo;
        this.agencia = agencia;
        this.numeroConta = numeroConta;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitular() {
        return titular;
    }

    public void setTitular(String titular) {
        this.titular = titular;
    }

    public String getTipoConta() {
        return tipoConta;
    }

    public void setTipoConta(String tipoConta) {
        this.tipoConta = tipoConta;
    }

    public double getSaldo() {
        return saldo;
    }

    public void setSaldo(double saldo) {
        this.saldo = saldo;
    }

    public String getAgencia() {
        return agencia;
    }

    public void setAgencia(String agencia) {
        this.agencia = agencia;
    }

    public String getNumeroConta() {
        return numeroConta;
    }

    public void setNumeroConta(String numeroConta) {
        this.numeroConta = numeroConta;
    }

    @Override
    public String toString() {
        return "Conta [id=" + id
                + ", titular=" + titular
                + ", tipo=" + tipoConta
                + ", saldo=" + saldo
                + ", agencia=" + agencia
                + ", numeroConta=" + numeroConta + "]";
    }
}
