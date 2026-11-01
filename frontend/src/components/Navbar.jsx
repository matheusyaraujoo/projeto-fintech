import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const styles = {
  nav: { background: '#0a1a2f', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 },
  brand: { color: '#fff', fontWeight: 700, fontSize: 18, textDecoration: 'none' },
  teal: { color: '#2dd4bf' },
  links: { display: 'flex', gap: 16, alignItems: 'center' },
  link: { color: '#cbd5e1', textDecoration: 'none', fontSize: 14 },
  btn: { background: '#2dd4bf', color: '#0a1a2f', border: 'none', padding: '6px 14px', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: 13 },
};

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('user');
    navigate('/login');
  }

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>Orbita<span style={styles.teal}>Bank</span></Link>
      <div style={styles.links}>
        <Link to="/contas" style={styles.link}>Contas</Link>
        <Link to="/receitas" style={styles.link}>Receitas</Link>
        <Link to="/despesas" style={styles.link}>Despesas</Link>
        <button style={styles.btn} onClick={handleLogout}>Sair</button>
      </div>
    </nav>
  );
}
