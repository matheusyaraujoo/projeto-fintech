import React, { useState, useEffect } from 'react';
import { contaApi } from '../services/api';
import DataTable from '../components/DataTable';
import Mensagem from '../components/Mensagem';

const formStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, background: '#fff', padding: 20, borderRadius: 12, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,.06)' };
const input = { padding: '10px 12px', border: '1px solid #ddd', borderRadius: 8, fontSize: 14 };
const btnSave = { padding: '10px 20px', background: '#2dd4bf', color: '#0a1a2f', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer' };
const btnCancel = { padding: '10px 20px', background: '#e2e8f0', color: '#333', border: 'none', borderRadius: 8, cursor: 'pointer' };

const colunas = [
  { campo: 'id', titulo: 'ID' },
  { campo: 'titular', titulo: 'Titular' },
  { campo: 'tipoConta', titulo: 'Tipo' },
  { campo: 'saldo', titulo: 'Saldo', formatar: (v) => `R$ ${(v || 0).toFixed(2)}` },
  { campo: 'agencia', titulo: 'Agencia' },
  { campo: 'numeroConta', titulo: 'Conta' },
];

const vazio = { titular: '', tipoConta: 'Corrente', saldo: '', agencia: '', numeroConta: '' };

export default function Contas() {
  const [lista, setLista] = useState([]);
  const [form, setForm] = useState(vazio);
  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState('');

  useEffect(() => { carregar(); }, []);

  async function carregar() {
    try { setLista(await contaApi.listar()); }
    catch { setMsg('Erro ao carregar contas'); }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const dados = { ...form, saldo: parseFloat(form.saldo) || 0 };
      if (editId) {
        await contaApi.atualizar(editId, dados);
        setMsg('Conta atualizada com sucesso');
      } else {
        await contaApi.criar(dados);
        setMsg('Conta criada com sucesso');
      }
      setForm(vazio);
      setEditId(null);
      carregar();
    } catch { setMsg('Erro ao salvar conta'); }
  }

  function handleEdit(conta) {
    setForm({ titular: conta.titular, tipoConta: conta.tipoConta, saldo: conta.saldo, agencia: conta.agencia, numeroConta: conta.numeroConta });
    setEditId(conta.id);
  }

  async function handleDelete(id) {
    if (!window.confirm('Tem certeza que deseja excluir esta conta?')) return;
    try { await contaApi.deletar(id); carregar(); setMsg('Conta removida com sucesso'); }
    catch { setMsg('Erro ao remover conta'); }
  }

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20 }}>Contas</h1>
      <Mensagem texto={msg} />

      <form style={formStyle} onSubmit={handleSubmit}>
        <input style={input} name="titular" placeholder="Titular" value={form.titular} onChange={handleChange} required />
        <select style={input} name="tipoConta" value={form.tipoConta} onChange={handleChange}>
          <option>Corrente</option>
          <option>Poupanca</option>
        </select>
        <input style={input} name="saldo" placeholder="Saldo" type="number" step="0.01" value={form.saldo} onChange={handleChange} />
        <input style={input} name="agencia" placeholder="Agencia" value={form.agencia} onChange={handleChange} required />
        <input style={input} name="numeroConta" placeholder="Numero da conta" value={form.numeroConta} onChange={handleChange} required />
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
        mensagemVazia="Nenhuma conta cadastrada"
      />
    </div>
  );
}
