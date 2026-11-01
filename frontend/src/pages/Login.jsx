import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  page: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a1a2f' },
  card: { background: '#fff', borderRadius: 16, padding: 40, width: 360, boxShadow: '0 8px 32px rgba(0,0,0,.2)' },
  title: { fontSize: 24, fontWeight: 700, marginBottom: 4, textAlign: 'center' },
  teal: { color: '#2dd4bf' },
  sub: { color: '#666', fontSize: 13, textAlign: 'center', marginBottom: 24 },
  label: { display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 4, color: '#333' },
  input: { width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 8, fontSize: 14, marginBottom: 16 },
  btn: { width: '100%', padding: 12, background: '#2dd4bf', color: '#0a1a2f', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: 'pointer' },
  error: { color: '#e74c3c', fontSize: 13, marginBottom: 12, textAlign: 'center' },
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (email === 'admin@orbitabank.com' && senha === 'admin123') {
      localStorage.setItem('user', JSON.stringify({ email, nome: 'Matheus' }));
      navigate('/');
    } else {
      setErro('Email ou senha incorretos');
    }
  }

  return (
    <div style={styles.page}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <h1 style={styles.title}>Orbita<span style={styles.teal}>Bank</span></h1>
        <p style={styles.sub}>Acesse sua conta</p>
        {erro && <p style={styles.error}>{erro}</p>}
        <label style={styles.label}>Email</label>
        <input style={styles.input} type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <label style={styles.label}>Senha</label>
        <input style={styles.input} type="password" value={senha} onChange={e => setSenha(e.target.value)} required />
        <button style={styles.btn} type="submit">Entrar</button>
      </form>
    </div>
  );
}
