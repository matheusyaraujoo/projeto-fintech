package dao;

import factory.ConnectionFactory;
import model.Despesa;

import java.sql.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class DespesaDAO {

    public void insert(Despesa despesa) {
        String sql = "INSERT INTO T_DESPESA (id, conta_id, descricao, valor, data_despesa, categoria) VALUES (?, ?, ?, ?, ?, ?)";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, despesa.getId());
            stmt.setInt(2, despesa.getContaId());
            stmt.setString(3, despesa.getDescricao());
            stmt.setDouble(4, despesa.getValor());
            stmt.setDate(5, Date.valueOf(despesa.getData()));
            stmt.setString(6, despesa.getCategoria());

            stmt.executeUpdate();
            System.out.println("Despesa inserida com sucesso! ID " + despesa.getId());

        } catch (SQLException e) {
            System.err.println("Erro ao inserir despesa " + e.getMessage());
            e.printStackTrace();
        }
    }

    public List<Despesa> getAll() {
        List<Despesa> lista = new ArrayList<>();
        String sql = "SELECT id, conta_id, descricao, valor, data_despesa, categoria FROM T_DESPESA ORDER BY id";

        try (Connection conn = ConnectionFactory.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                Despesa despesa = new Despesa();
                despesa.setId(rs.getInt("id"));
                despesa.setContaId(rs.getInt("conta_id"));
                despesa.setDescricao(rs.getString("descricao"));
                despesa.setValor(rs.getDouble("valor"));
                Date sqlDate = rs.getDate("data_despesa");
                if (sqlDate != null) {
                    despesa.setData(sqlDate.toLocalDate());
                }
                despesa.setCategoria(rs.getString("categoria"));
                lista.add(despesa);
            }

        } catch (SQLException e) {
            System.err.println("Erro ao consultar despesas " + e.getMessage());
            e.printStackTrace();
        }

        return lista;
    }
}
