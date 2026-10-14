package dao;

import factory.ConnectionFactory;
import model.Conta;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ContaDAO {

    public void insert(Conta conta) {
        String sql = "INSERT INTO T_CONTA (id, titular, tipo_conta, saldo, agencia, numero_conta) VALUES (?, ?, ?, ?, ?, ?)";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, conta.getId());
            stmt.setString(2, conta.getTitular());
            stmt.setString(3, conta.getTipoConta());
            stmt.setDouble(4, conta.getSaldo());
            stmt.setString(5, conta.getAgencia());
            stmt.setString(6, conta.getNumeroConta());

            stmt.executeUpdate();
            System.out.println("Conta inserida com sucesso! ID " + conta.getId());

        } catch (SQLException e) {
            System.err.println("Erro ao inserir conta " + e.getMessage());
            e.printStackTrace();
        }
    }

    public List<Conta> getAll() {
        List<Conta> lista = new ArrayList<>();
        String sql = "SELECT id, titular, tipo_conta, saldo, agencia, numero_conta FROM T_CONTA ORDER BY id";

        try (Connection conn = ConnectionFactory.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                Conta conta = new Conta();
                conta.setId(rs.getInt("id"));
                conta.setTitular(rs.getString("titular"));
                conta.setTipoConta(rs.getString("tipo_conta"));
                conta.setSaldo(rs.getDouble("saldo"));
                conta.setAgencia(rs.getString("agencia"));
                conta.setNumeroConta(rs.getString("numero_conta"));
                lista.add(conta);
            }

        } catch (SQLException e) {
            System.err.println("Erro ao consultar contas " + e.getMessage());
            e.printStackTrace();
        }

        return lista;
    }
}
