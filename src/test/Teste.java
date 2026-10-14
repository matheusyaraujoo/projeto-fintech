package test;

import dao.ContaDAO;
import dao.ReceitaDAO;
import dao.DespesaDAO;
import model.Conta;
import model.Receita;
import model.Despesa;

import java.time.LocalDate;
import java.util.List;

public class Teste {

    public static void main(String[] args) {

        ContaDAO contaDAO = new ContaDAO();
        ReceitaDAO receitaDAO = new ReceitaDAO();
        DespesaDAO despesaDAO = new DespesaDAO();

        // =============================================
        // INSERINDO 5 CONTAS
        // =============================================
        System.out.println("=== INSERINDO CONTAS ===");
        contaDAO.insert(new Conta(1, "Matheus Araujo", "Corrente", 12480.75, "0001", "88123-4"));
        contaDAO.insert(new Conta(2, "Ana Silva", "Poupanca", 5320.00, "0001", "88124-5"));
        contaDAO.insert(new Conta(3, "Carlos Souza", "Corrente", 890.50, "0002", "77001-0"));
        contaDAO.insert(new Conta(4, "Juliana Costa", "Corrente", 23100.00, "0001", "88125-6"));
        contaDAO.insert(new Conta(5, "Roberto Lima", "Poupanca", 1500.00, "0003", "66010-1"));

        // =============================================
        // CONSULTANDO TODAS AS CONTAS
        // =============================================
        System.out.println("\n=== CONSULTANDO CONTAS ===");
        List<Conta> contas = contaDAO.getAll();
        for (Conta c : contas) {
            System.out.println(c);
        }

        // =============================================
        // INSERINDO 5 RECEITAS
        // =============================================
        System.out.println("\n=== INSERINDO RECEITAS ===");
        receitaDAO.insert(new Receita(1, 1, "Salario", 9700.00, LocalDate.of(2024, 10, 5), "Salario"));
        receitaDAO.insert(new Receita(2, 1, "Freelance design", 1200.00, LocalDate.of(2024, 10, 12), "Renda Extra"));
        receitaDAO.insert(new Receita(3, 2, "Salario", 4500.00, LocalDate.of(2024, 10, 5), "Salario"));
        receitaDAO.insert(new Receita(4, 3, "Venda de equipamento", 800.00, LocalDate.of(2024, 10, 8), "Venda"));
        receitaDAO.insert(new Receita(5, 4, "Dividendos", 350.00, LocalDate.of(2024, 10, 15), "Investimento"));

        // =============================================
        // CONSULTANDO TODAS AS RECEITAS
        // =============================================
        System.out.println("\n=== CONSULTANDO RECEITAS ===");
        List<Receita> receitas = receitaDAO.getAll();
        for (Receita r : receitas) {
            System.out.println(r);
        }

        // =============================================
        // INSERINDO 5 DESPESAS
        // =============================================
        System.out.println("\n=== INSERINDO DESPESAS ===");
        despesaDAO.insert(new Despesa(1, 1, "Aluguel", 1800.00, LocalDate.of(2024, 10, 1), "Moradia"));
        despesaDAO.insert(new Despesa(2, 1, "Supermercado", 419.25, LocalDate.of(2024, 10, 7), "Alimentacao"));
        despesaDAO.insert(new Despesa(3, 2, "Conta de luz", 180.00, LocalDate.of(2024, 10, 10), "Moradia"));
        despesaDAO.insert(new Despesa(4, 3, "Transporte", 250.00, LocalDate.of(2024, 10, 3), "Transporte"));
        despesaDAO.insert(new Despesa(5, 4, "Plano de saude", 890.00, LocalDate.of(2024, 10, 5), "Saude"));

        // =============================================
        // CONSULTANDO TODAS AS DESPESAS
        // =============================================
        System.out.println("\n=== CONSULTANDO DESPESAS ===");
        List<Despesa> despesas = despesaDAO.getAll();
        for (Despesa d : despesas) {
            System.out.println(d);
        }

        System.out.println("\n=== TESTES FINALIZADOS COM SUCESSO ===");
    }
}
