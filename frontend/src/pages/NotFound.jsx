import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0a1a2f', color: '#fff' }}>
      <h1 style={{ fontSize: 96, fontWeight: 700, color: '#2dd4bf' }}>404</h1>
      <p style={{ fontSize: 20, marginBottom: 24 }}>Pagina nao encontrada</p>
      <Link to="/" style={{ color: '#2dd4bf', fontSize: 16 }}>Voltar para o inicio</Link>
    </div>
  );
}
