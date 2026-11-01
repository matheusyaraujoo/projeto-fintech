import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Contas from './pages/Contas';
import Receitas from './pages/Receitas';
import Despesas from './pages/Despesas';
import Navbar from './components/Navbar';

function PrivateRoute({ children }) {
  const user = localStorage.getItem('user');
  if (!user) return <Navigate to="/login" />;
  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 960, margin: '24px auto', padding: '0 16px' }}>
        {children}
      </main>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/contas" element={<PrivateRoute><Contas /></PrivateRoute>} />
        <Route path="/receitas" element={<PrivateRoute><Receitas /></PrivateRoute>} />
        <Route path="/despesas" element={<PrivateRoute><Despesas /></PrivateRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
