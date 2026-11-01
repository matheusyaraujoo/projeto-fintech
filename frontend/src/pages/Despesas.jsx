import React, { useState, useEffect } from 'react';
import { despesaApi } from '../services/api';
import DataTable from '../components/DataTable';
import Mensagem from '../components/Mensagem';

const formStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, background: '#fff', padding: 20, borderRadius: 12, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,.06)' };
const input = { padding: '10px 12px', border: '1px solid #ddd', borderRadius: 8, fontSize: 14 };
const btnSave = { padding: '10px 20px', background: '#2dd4bf', color: '#0a1a2f', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer' };
const btnCancel = { padding: '10px 20px', background: '#e2e8f0', color: '#333', border: 'none', borderRadius: 8, cursor: 'pointer' };

const colunas = [
  { campo: 'id', titulo: 'ID' },
  { campo: 'contaId', titulo: 'Conta' },
  { campo: 'descricao', titulo: 'Descricao' },
  { campo: 'valor', titulo: 'Valor', formatar: (v) => `R$ ${(v || 0).toFixed(2)}` },
  { campo: 'data', titulo: 'Data' },
  { campo: 'categoria', titulo: 'Categoria' },
];

const vazio = { contaId: '', descricao: '', valor: '', data: '', categoria: '' };

export default function Despesas() {
  const [lista, setLista] = useState([]);
  const [form, setForm] = useState(vazio);
  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState('');

  useEffect(() => { carregar(); }, []);

  async function carregar() {
    try { setLista(await despesaApi.listar()); }
    catch { setMsg('Erro ao carregar despesas'); }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const dados = { ...form, contaId: parseInt(form.contaId), valor: parseFloat(form.valor) };
      if (editId) {
        await despesaApi.atualizar(editId, dados);
        setMsg('Despesa atualizada com sucesso');
      } else {
        await despesaApi.criar(dados);
        setMsg('Despesa criada com sucesso');
      }
      setForm(vazio);
      setEditId(null);
      carregar();
    } catch { setMsg('Erro ao salvar despesa'); }
  }

  function handleEdit(d) {
    setForm({ contaId: d.contaId, descricao: d.descricao, valor: d.valor, data: d.data, categoria: d.categoria || '' });
    setEditId(d.id);
  }

  async function handleDelete(id) {
    if (!window.confirm('Tem certeza que deseja excluir esta despesa?')) return;
    try { await despesaApi.deletar(id); carregar(); setMsg('Despesa removida com sucesso'); }
    catch { setMsg('Erro ao remover despesa'); }
  }

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20 }}>Despesas</h1>
      <Mensagem texto={msg} />

      <form style={formStyle} onSubmit={handleSubmit}>
        <input style={input} name="contaId" placeholder="ID da Conta" type="number" value={form.contaId} onChange={handleChange} required />
        <input style={input} name="descricao" placeholder="Descricao" value={form.descricao} onChange={handleChange} required />
        <input style={input} name="valor" placeholder="Valor" type="number" step="0.01" value={form.valor} onChange={handleChange} required />
        <input style={input} name="data" type="date" value={form.data} onChange={handleChange} required />
        <input style={input} name="categoria" placeholder="Categoria" value={form.categoria} onChange={handleChange} />
        <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 8 }}>
          <button style={btnSave} type="submit">{editId ? 'Atualizar' : 'Cadastrar'}</button>
          {editId && <button style={btnCancel} type="button" onClick={() => { setForm(vazio); setEditId(null); }}>Cancelar</button>}
        </div>
      </form>

      <DataTable
        colunas={colunas}
        dados={lista}
        onEdit={handleEdit}
        onDelete={handleDelete}
        mensagemVazia="Nenhuma despesa cadastrada"
      />
    </div>
  );
}
