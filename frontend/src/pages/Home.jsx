import React from 'react';
import { Link } from 'react-router-dom';

const card = { background: '#fff', borderRadius: 12, padding: 24, textAlign: 'center', textDecoration: 'none', color: '#1a1a2e', boxShadow: '0 2px 8px rgba(0,0,0,.08)' };

export default function Home() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Ola, {user.nome || 'Usuario'}</h1>
      <p style={{ color: '#666', marginBottom: 32 }}>Bem-vindo ao painel Orbita Bank</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
        <Link to="/contas" style={card}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🏦</div>
          <h2 style={{ fontSize: 18, fontWeight: 600 }}>Contas</h2>
          <p style={{ fontSize: 13, color: '#888', marginTop: 4 }}>Gerenciar contas</p>
        </Link>
        <Link to="/receitas" style={card}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>📈</div>
          <h2 style={{ fontSize: 18, fontWeight: 600 }}>Receitas</h2>
          <p style={{ fontSize: 13, color: '#888', marginTop: 4 }}>Entradas de dinheiro</p>
        </Link>
        <Link to="/despesas" style={card}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>📉</div>
          <h2 style={{ fontSize: 18, fontWeight: 600 }}>Despesas</h2>
          <p style={{ fontSize: 13, color: '#888', marginTop: 4 }}>Saidas de dinheiro</p>
        </Link>
      </div>
    </div>
  );
}
