package br.com.fiap.fintech.service;

import br.com.fiap.fintech.model.Receita;
import br.com.fiap.fintech.repository.ReceitaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReceitaService {

    private final ReceitaRepository repository;

    public ReceitaService(ReceitaRepository repository) {
        this.repository = repository;
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
        receita.setId(null);
        return repository.save(receita);
    }

    public Optional<Receita> atualizar(Long id, Receita dados) {
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
}
