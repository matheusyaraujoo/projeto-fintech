package br.com.fiap.fintech.service;

import br.com.fiap.fintech.model.Despesa;
import br.com.fiap.fintech.repository.ContaRepository;
import br.com.fiap.fintech.repository.DespesaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class DespesaService {

    private final DespesaRepository repository;
    private final ContaRepository contaRepository;

    public DespesaService(DespesaRepository repository, ContaRepository contaRepository) {
        this.repository = repository;
        this.contaRepository = contaRepository;
    }

    public List<Despesa> listarTodas() {
        return repository.findAll();
    }

    public Optional<Despesa> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public List<Despesa> listarPorConta(Long contaId) {
        return repository.findByContaId(contaId);
    }

    public Despesa criar(Despesa despesa) {
        validar(despesa);
        despesa.setId(null);
        return repository.save(despesa);
    }

    public Optional<Despesa> atualizar(Long id, Despesa dados) {
        validar(dados);
        return repository.findById(id).map(despesa -> {
            despesa.setContaId(dados.getContaId());
            despesa.setDescricao(dados.getDescricao());
            despesa.setValor(dados.getValor());
            despesa.setData(dados.getData());
            despesa.setCategoria(dados.getCategoria());
            return repository.save(despesa);
        });
    }

    public boolean deletar(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    private void validar(Despesa despesa) {
        if (despesa.getDescricao() == null || despesa.getDescricao().isBlank()) {
            throw new IllegalArgumentException("Descricao e obrigatoria");
        }
        if (despesa.getValor() == null || despesa.getValor() <= 0) {
            throw new IllegalArgumentException("Valor deve ser maior que zero");
        }
        if (despesa.getData() == null) {
            throw new IllegalArgumentException("Data e obrigatoria");
        }
        if (despesa.getData().isAfter(LocalDate.now())) {
            throw new IllegalArgumentException("Data da despesa nao pode ser futura");
        }
        if (despesa.getContaId() == null) {
            throw new IllegalArgumentException("Conta e obrigatoria");
        }
        if (!contaRepository.existsById(despesa.getContaId())) {
            throw new IllegalArgumentException("Conta informada nao existe");
        }
    }
}
