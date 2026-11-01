import React, { useState, useEffect } from 'react';
import { contaApi } from '../services/api';

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
        setMsg('Conta atualizada');
      } else {
        await contaApi.criar(dados);
        setMsg('Conta criada');
      }
      setForm(vazio);
      setEditId(null);
      carregar();
    } catch { setMsg('Erro ao salvar'); }
  }

  function handleEdit(conta) {
    setForm({ titular: conta.titular, tipoConta: conta.tipoConta, saldo: conta.saldo, agencia: conta.agencia, numeroConta: conta.numeroConta });
    setEditId(conta.id);
  }

  async function handleDelete(id) {
    if (!window.confirm('Tem certeza?')) return;
    try { await contaApi.deletar(id); carregar(); setMsg('Conta removida'); }
    catch { setMsg('Erro ao remover'); }
  }

  return (
    <div>
      <h1 style={s.heading}>Contas</h1>
      {msg && <div style={{ ...s.msg, background: msg.includes('Erro') ? '#fee2e2' : '#d1fae5' }}>{msg}</div>}

      <form style={s.form} onSubmit={handleSubmit}>
        <input style={s.input} name="titular" placeholder="Titular" value={form.titular} onChange={handleChange} required />
        <select style={s.input} name="tipoConta" value={form.tipoConta} onChange={handleChange}>
          <option>Corrente</option>
          <option>Poupanca</option>
        </select>
        <input style={s.input} name="saldo" placeholder="Saldo" type="number" step="0.01" value={form.saldo} onChange={handleChange} />
        <input style={s.input} name="agencia" placeholder="Agencia" value={form.agencia} onChange={handleChange} required />
        <input style={s.input} name="numeroConta" placeholder="Numero da conta" value={form.numeroConta} onChange={handleChange} required />
        <div style={s.btnRow}>
          <button style={s.btnSave} type="submit">{editId ? 'Atualizar' : 'Cadastrar'}</button>
          {editId && <button style={s.btnCancel} type="button" onClick={() => { setForm(vazio); setEditId(null); }}>Cancelar</button>}
        </div>
      </form>

      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}>ID</th><th style={s.th}>Titular</th><th style={s.th}>Tipo</th>
            <th style={s.th}>Saldo</th><th style={s.th}>Agencia</th><th style={s.th}>Conta</th><th style={s.th}>Acoes</th>
          </tr>
        </thead>
        <tbody>
          {lista.map(c => (
            <tr key={c.id}>
              <td style={s.td}>{c.id}</td><td style={s.td}>{c.titular}</td><td style={s.td}>{c.tipoConta}</td>
              <td style={s.td}>R$ {c.saldo?.toFixed(2)}</td><td style={s.td}>{c.agencia}</td><td style={s.td}>{c.numeroConta}</td>
              <td style={s.td}>
                <button style={s.btnEdit} onClick={() => handleEdit(c)}>Editar</button>
                <button style={s.btnDel} onClick={() => handleDelete(c.id)}>Excluir</button>
              </td>
            </tr>
          ))}
          {lista.length === 0 && <tr><td style={s.td} colSpan={7}>Nenhuma conta cadastrada</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
