import React from 'react';

export default function Mensagem({ texto, tipo }) {
  if (!texto) return null;

  const isErro = tipo === 'erro' || texto.toLowerCase().includes('erro');
  const estilo = {
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    fontSize: 14,
    background: isErro ? '#fee2e2' : '#d1fae5',
    color: isErro ? '#991b1b' : '#065f46',
  };

  return <div style={estilo}>{texto}</div>;
}
