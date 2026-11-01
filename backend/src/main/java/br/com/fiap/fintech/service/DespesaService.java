package br.com.fiap.fintech.service;

import br.com.fiap.fintech.model.Despesa;
import br.com.fiap.fintech.repository.DespesaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DespesaService {

    private final DespesaRepository repository;

    public DespesaService(DespesaRepository repository) {
        this.repository = repository;
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
        despesa.setId(null);
        return repository.save(despesa);
    }

    public Optional<Despesa> atualizar(Long id, Despesa dados) {
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
}
