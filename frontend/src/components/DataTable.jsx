import React from 'react';

const s = {
  table: { width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,.06)' },
  th: { textAlign: 'left', padding: '12px 16px', background: '#0a1a2f', color: '#fff', fontSize: 13, fontWeight: 600 },
  td: { padding: '10px 16px', borderBottom: '1px solid #eee', fontSize: 14 },
  btnEdit: { background: '#3b82f6', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: 6, cursor: 'pointer', marginRight: 4, fontSize: 12 },
  btnDel: { background: '#ef4444', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: 6, cursor: 'pointer', fontSize: 12 },
};

export default function DataTable({ colunas, dados, onEdit, onDelete, mensagemVazia }) {
  return (
    <table style={s.table}>
      <thead>
        <tr>
          {colunas.map(col => (
            <th key={col.campo} style={s.th}>{col.titulo}</th>
          ))}
          <th style={s.th}>Acoes</th>
        </tr>
      </thead>
      <tbody>
        {dados.map(item => (
          <tr key={item.id}>
            {colunas.map(col => (
              <td key={col.campo} style={s.td}>
                {col.formatar ? col.formatar(item[col.campo]) : item[col.campo]}
              </td>
            ))}
            <td style={s.td}>
              <button style={s.btnEdit} onClick={() => onEdit(item)}>Editar</button>
              <button style={s.btnDel} onClick={() => onDelete(item.id)}>Excluir</button>
            </td>
          </tr>
        ))}
        {dados.length === 0 && (
          <tr>
            <td style={s.td} colSpan={colunas.length + 1}>
              {mensagemVazia || 'Nenhum registro encontrado'}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
