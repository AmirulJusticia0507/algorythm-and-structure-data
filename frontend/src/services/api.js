const API_BASE = '/api';

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export const linkedListApi = {
  create: (listId, name) => request('/linked-list', { method: 'POST', body: JSON.stringify({ listId, name }) }),
  getAll: (listId) => request(`/linked-list/${listId}`),
  getHead: (listId) => request(`/linked-list/${listId}/head`),
  insertAtHead: (listId, value) => request(`/linked-list/${listId}/head`, { method: 'POST', body: JSON.stringify({ value }) }),
  insertAtTail: (listId, value) => request(`/linked-list/${listId}/tail`, { method: 'POST', body: JSON.stringify({ value }) }),
  insertAtPosition: (listId, value, position) => request(`/linked-list/${listId}/position`, { method: 'POST', body: JSON.stringify({ value, position }) }),
  deleteAtPosition: (listId, position) => request(`/linked-list/${listId}/position/${position}`, { method: 'DELETE' }),
  deleteHead: (listId) => request(`/linked-list/${listId}/head`, { method: 'DELETE' }),
  deleteTail: (listId) => request(`/linked-list/${listId}/tail`, { method: 'DELETE' }),
  search: (listId, value) => request(`/linked-list/${listId}/search?value=${encodeURIComponent(value)}`),
  getSize: (listId) => request(`/linked-list/${listId}/size`),
  clear: (listId) => request(`/linked-list/${listId}/clear`, { method: 'DELETE' }),
  deleteList: (listId) => request(`/linked-list/${listId}`, { method: 'DELETE' }),
  toArray: (listId) => request(`/linked-list/${listId}/array`)
};

export const queueApi = {
  create: (queueId, name) => request('/queue', { method: 'POST', body: JSON.stringify({ queueId, name }) }),
  getAll: (queueId) => request(`/queue/${queueId}`),
  enqueue: (queueId, value) => request(`/queue/${queueId}/enqueue`, { method: 'POST', body: JSON.stringify({ value }) }),
  dequeue: (queueId) => request(`/queue/${queueId}/dequeue`, { method: 'POST' }),
  peek: (queueId) => request(`/queue/${queueId}/peek`),
  getSize: (queueId) => request(`/queue/${queueId}/size`),
  isEmpty: (queueId) => request(`/queue/${queueId}/empty`),
  clear: (queueId) => request(`/queue/${queueId}/clear`, { method: 'DELETE' }),
  deleteQueue: (queueId) => request(`/queue/${queueId}`, { method: 'DELETE' }),
  search: (queueId, value) => request(`/queue/${queueId}/search?value=${encodeURIComponent(value)}`),
  toArray: (queueId) => request(`/queue/${queueId}/array`)
};

export const stackApi = {
  create: (stackId, name) => request('/stack', { method: 'POST', body: JSON.stringify({ stackId, name }) }),
  getAll: (stackId) => request(`/stack/${stackId}`),
  push: (stackId, value) => request(`/stack/${stackId}/push`, { method: 'POST', body: JSON.stringify({ value }) }),
  pop: (stackId) => request(`/stack/${stackId}/pop`, { method: 'POST' }),
  peek: (stackId) => request(`/stack/${stackId}/peek`),
  getSize: (stackId) => request(`/stack/${stackId}/size`),
  isEmpty: (stackId) => request(`/stack/${stackId}/empty`),
  clear: (stackId) => request(`/stack/${stackId}/clear`, { method: 'DELETE' }),
  deleteStack: (stackId) => request(`/stack/${stackId}`, { method: 'DELETE' }),
  search: (stackId, value) => request(`/stack/${stackId}/search?value=${encodeURIComponent(value)}`),
  toArray: (stackId) => request(`/stack/${stackId}/array`)
};