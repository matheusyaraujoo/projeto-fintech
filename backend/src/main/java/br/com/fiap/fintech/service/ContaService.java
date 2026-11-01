package br.com.fiap.fintech.service;

import br.com.fiap.fintech.model.Conta;
import br.com.fiap.fintech.repository.ContaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContaService {

    private final ContaRepository repository;

    public ContaService(ContaRepository repository) {
        this.repository = repository;
    }

    public List<Conta> listarTodas() {
        return repository.findAll();
    }

    public Optional<Conta> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Conta criar(Conta conta) {
        validar(conta);
        conta.setId(null);
        if (conta.getSaldo() == null) {
            conta.setSaldo(0.0);
        }
        return repository.save(conta);
    }

    public Optional<Conta> atualizar(Long id, Conta dados) {
        validar(dados);
        return repository.findById(id).map(conta -> {
            conta.setTitular(dados.getTitular());
            conta.setTipoConta(dados.getTipoConta());
            conta.setSaldo(dados.getSaldo());
            conta.setAgencia(dados.getAgencia());
            conta.setNumeroConta(dados.getNumeroConta());
            return repository.save(conta);
        });
    }

    public boolean deletar(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    private void validar(Conta conta) {
        if (conta.getTitular() == null || conta.getTitular().isBlank()) {
            throw new IllegalArgumentException("Titular e obrigatorio");
        }
        if (conta.getAgencia() == null || conta.getAgencia().isBlank()) {
            throw new IllegalArgumentException("Agencia e obrigatoria");
        }
        if (conta.getNumeroConta() == null || conta.getNumeroConta().isBlank()) {
            throw new IllegalArgumentException("Numero da conta e obrigatorio");
        }
        if (conta.getTipoConta() == null || conta.getTipoConta().isBlank()) {
            throw new IllegalArgumentException("Tipo de conta e obrigatorio");
        }
        if (conta.getSaldo() != null && conta.getSaldo() < 0) {
            throw new IllegalArgumentException("Saldo nao pode ser negativo");
        }
    }
}
