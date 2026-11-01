import React, { useState, useEffect } from 'react';
import { despesaApi } from '../services/api';

const s = {
  heading: { fontSize: 24, fontWeight: 700, marginBottom: 20 },
  form: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, background: '#fff', padding: 20, borderRadius: 12, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,.06)' },
  input: { padding: '10px 12px', border: '1px solid #ddd', borderRadius: 8, fontSize: 14 },
  btnRow: { gridColumn: '1 / -1', display: 'flex', gap: 8 },
  btnSave: { padding: '10px 20px', background: '#2dd4bf', color: '#0a1a2f', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer' },
  btnCancel: { padding: '10px 20px', background: '#e2e8f0', color: '#333', border: 'none', borderRadius: 8, cursor: 'pointer' },
  table: { width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,.06)' },
  th: { textAlign: 'left', padding: '12px 16px', background: '#0a1a2f', color: '#fff', fontSize: 13, fontWeight: 600 },
  td: { padding: '10px 16px', borderBottom: '1px solid #eee', fontSize: 14 },
  btnEdit: { background: '#3b82f6', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: 6, cursor: 'pointer', marginRight: 4, fontSize: 12 },
  btnDel: { background: '#ef4444', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: 6, cursor: 'pointer', fontSize: 12 },
  msg: { padding: 12, marginBottom: 16, borderRadius: 8, fontSize: 14 },
};

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
        setMsg('Despesa atualizada');
      } else {
        await despesaApi.criar(dados);
        setMsg('Despesa criada');
      }
      setForm(vazio);
      setEditId(null);
      carregar();
    } catch { setMsg('Erro ao salvar'); }
  }

  function handleEdit(d) {
    setForm({ contaId: d.contaId, descricao: d.descricao, valor: d.valor, data: d.data, categoria: d.categoria || '' });
    setEditId(d.id);
  }

  async function handleDelete(id) {
    if (!window.confirm('Tem certeza?')) return;
    try { await despesaApi.deletar(id); carregar(); setMsg('Despesa removida'); }
    catch { setMsg('Erro ao remover'); }
  }

  return (
    <div>
      <h1 style={s.heading}>Despesas</h1>
      {msg && <div style={{ ...s.msg, background: msg.includes('Erro') ? '#fee2e2' : '#d1fae5' }}>{msg}</div>}

      <form style={s.form} onSubmit={handleSubmit}>
        <input style={s.input} name="contaId" placeholder="ID da Conta" type="number" value={form.contaId} onChange={handleChange} required />
        <input style={s.input} name="descricao" placeholder="Descricao" value={form.descricao} onChange={handleChange} required />
        <input style={s.input} name="valor" placeholder="Valor" type="number" step="0.01" value={form.valor} onChange={handleChange} required />
        <input style={s.input} name="data" type="date" value={form.data} onChange={handleChange} required />
        <input style={s.input} name="categoria" placeholder="Categoria" value={form.categoria} onChange={handleChange} />
        <div style={s.btnRow}>
          <button style={s.btnSave} type="submit">{editId ? 'Atualizar' : 'Cadastrar'}</button>
          {editId && <button style={s.btnCancel} type="button" onClick={() => { setForm(vazio); setEditId(null); }}>Cancelar</button>}
        </div>
      </form>

      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}>ID</th><th style={s.th}>Conta</th><th style={s.th}>Descricao</th>
            <th style={s.th}>Valor</th><th style={s.th}>Data</th><th style={s.th}>Categoria</th><th style={s.th}>Acoes</th>
          </tr>
        </thead>
        <tbody>
          {lista.map(d => (
            <tr key={d.id}>
              <td style={s.td}>{d.id}</td><td style={s.td}>{d.contaId}</td><td style={s.td}>{d.descricao}</td>
              <td style={s.td}>R$ {d.valor?.toFixed(2)}</td><td style={s.td}>{d.data}</td><td style={s.td}>{d.categoria}</td>
              <td style={s.td}>
                <button style={s.btnEdit} onClick={() => handleEdit(d)}>Editar</button>
                <button style={s.btnDel} onClick={() => handleDelete(d.id)}>Excluir</button>
              </td>
            </tr>
          ))}
          {lista.length === 0 && <tr><td style={s.td} colSpan={7}>Nenhuma despesa cadastrada</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
