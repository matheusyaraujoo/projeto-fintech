package dao;

import factory.ConnectionFactory;
import model.Receita;

import java.sql.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class ReceitaDAO {

    public void insert(Receita receita) {
        String sql = "INSERT INTO T_RECEITA (id, conta_id, descricao, valor, data_receita, categoria) VALUES (?, ?, ?, ?, ?, ?)";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, receita.getId());
            stmt.setInt(2, receita.getContaId());
            stmt.setString(3, receita.getDescricao());
            stmt.setDouble(4, receita.getValor());
            stmt.setDate(5, Date.valueOf(receita.getData()));
            stmt.setString(6, receita.getCategoria());

            stmt.executeUpdate();
            System.out.println("Receita inserida com sucesso! ID " + receita.getId());

        } catch (SQLException e) {
            System.err.println("Erro ao inserir receita " + e.getMessage());
            e.printStackTrace();
        }
    }

    public List<Receita> getAll() {
        List<Receita> lista = new ArrayList<>();
        String sql = "SELECT id, conta_id, descricao, valor, data_receita, categoria FROM T_RECEITA ORDER BY id";

        try (Connection conn = ConnectionFactory.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                Receita receita = new Receita();
                receita.setId(rs.getInt("id"));
                receita.setContaId(rs.getInt("conta_id"));
                receita.setDescricao(rs.getString("descricao"));
                receita.setValor(rs.getDouble("valor"));
                Date sqlDate = rs.getDate("data_receita");
                if (sqlDate != null) {
                    receita.setData(sqlDate.toLocalDate());
                }
                receita.setCategoria(rs.getString("categoria"));
                lista.add(receita);
            }

        } catch (SQLException e) {
            System.err.println("Erro ao consultar receitas " + e.getMessage());
            e.printStackTrace();
        }

        return lista;
    }
}
