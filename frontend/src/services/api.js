const API_BASE = 'http://localhost:8080/api';

async function request(url, options = {}) {
  const response = await fetch(`${API_BASE}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (response.status === 204) return null;
  if (!response.ok) throw new Error(`Erro ${response.status}`);
  return response.json();
}

export const contaApi = {
  listar: () => request('/contas'),
  buscar: (id) => request(`/contas/${id}`),
  criar: (data) => request('/contas', { method: 'POST', body: JSON.stringify(data) }),
  atualizar: (id, data) => request(`/contas/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deletar: (id) => request(`/contas/${id}`, { method: 'DELETE' }),
};

export const receitaApi = {
  listar: () => request('/receitas'),
  buscar: (id) => request(`/receitas/${id}`),
  criar: (data) => request('/receitas', { method: 'POST', body: JSON.stringify(data) }),
  atualizar: (id, data) => request(`/receitas/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deletar: (id) => request(`/receitas/${id}`, { method: 'DELETE' }),
};

export const despesaApi = {
  listar: () => request('/despesas'),
  buscar: (id) => request(`/despesas/${id}`),
  criar: (data) => request('/despesas', { method: 'POST', body: JSON.stringify(data) }),
  atualizar: (id, data) => request(`/despesas/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deletar: (id) => request(`/despesas/${id}`, { method: 'DELETE' }),
};
