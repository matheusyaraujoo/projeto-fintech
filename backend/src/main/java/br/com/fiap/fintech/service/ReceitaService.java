package br.com.fiap.fintech.service;

import br.com.fiap.fintech.model.Receita;
import br.com.fiap.fintech.repository.ContaRepository;
import br.com.fiap.fintech.repository.ReceitaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ReceitaService {

    private final ReceitaRepository repository;
    private final ContaRepository contaRepository;

    public ReceitaService(ReceitaRepository repository, ContaRepository contaRepository) {
        this.repository = repository;
        this.contaRepository = contaRepository;
    }

    public List<Receita> listarTodas() {
        return repository.findAll();
    }

    public Optional<Receita> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public List<Receita> listarPorConta(Long contaId) {
        return repository.findByContaId(contaId);
    }

    public Receita criar(Receita receita) {
        validar(receita);
        receita.setId(null);
        return repository.save(receita);
    }

    public Optional<Receita> atualizar(Long id, Receita dados) {
        validar(dados);
        return repository.findById(id).map(receita -> {
            receita.setContaId(dados.getContaId());
            receita.setDescricao(dados.getDescricao());
            receita.setValor(dados.getValor());
            receita.setData(dados.getData());
            receita.setCategoria(dados.getCategoria());
            return repository.save(receita);
        });
    }

    public boolean deletar(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    private void validar(Receita receita) {
        if (receita.getDescricao() == null || receita.getDescricao().isBlank()) {
            throw new IllegalArgumentException("Descricao e obrigatoria");
        }
        if (receita.getValor() == null || receita.getValor() <= 0) {
            throw new IllegalArgumentException("Valor deve ser maior que zero");
        }
        if (receita.getData() == null) {
            throw new IllegalArgumentException("Data e obrigatoria");
        }
        if (receita.getData().isAfter(LocalDate.now())) {
            throw new IllegalArgumentException("Data da receita nao pode ser futura");
        }
        if (receita.getContaId() == null) {
            throw new IllegalArgumentException("Conta e obrigatoria");
        }
        if (!contaRepository.existsById(receita.getContaId())) {
            throw new IllegalArgumentException("Conta informada nao existe");
        }
    }
}
