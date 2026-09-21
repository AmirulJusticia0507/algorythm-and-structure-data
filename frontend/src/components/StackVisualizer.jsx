import { useState } from 'react';
import { useStack } from '../hooks/useStack';

function StackItem({ item, index, isTop, total }) {
  const visualIndex = total - 1 - index;
  return (
    <div className="stack-item" style={{ zIndex: total - index }}>
      <div className={`item-box ${isTop ? 'top' : ''}`}>
        <div className="item-value">{item.value}</div>
        <div className="item-meta">
          <span className="item-index">#{visualIndex}</span>
          {isTop && <span className="badge top">TOP</span>}
        </div>
      </div>
    </div>
  );
}

function StackVisualizer({ structureId, onStructureCreate }) {
  const { stackId, items, loading, error, create, push, pop, peek, clear, deleteStack, refresh } = useStack(structureId);
  const [inputValue, setInputValue] = useState('');
  const [newStackId, setNewStackId] = useState('');

  const handleCreate = async () => {
    try {
      await create(newStackId || undefined, 'My Stack');
      onStructureCreate?.(newStackId || undefined);
    } catch (err) {
      alert(err.message);
    }
  };

  const handlePush = async () => {
    if (!inputValue.trim()) return;
    try { await push(inputValue); setInputValue(''); } catch (err) { alert(err.message); }
  };

  const handlePop = async () => {
    try {
      const item = await pop();
      alert(`Popped: ${item.value}`);
    } catch (err) {
      alert(err.message);
    }
  };

  const handlePeek = async () => {
    try {
      const item = await peek();
      if (item) alert(`Top: ${item.value}`);
      else alert('Stack kosong');
    } catch (err) {
      alert(err.message);
    }
  };

  if (!stackId) {
    return (
      <div className="visualizer">
        <div className="empty-state">
          <h3>📦 Stack (LIFO)</h3>
          <p>Last-In, First-Out. Elemen terakhir masuk, pertama keluar.</p>
          <div className="input-group">
            <input
              type="text"
              value={newStackId}
              onChange={(e) => setNewStackId(e.target.value)}
              placeholder="Custom ID (opsional)"
              maxLength={20}
            />
            <button onClick={handleCreate} disabled={loading}>Buat Stack</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="visualizer">
      <div className="visualizer-header">
        <h3>📦 Stack <span className="id-badge">{stackId}</span></h3>
        <div className="actions">
          <button onClick={clear} disabled={loading || items.length === 0}>Clear</button>
          <button onClick={deleteStack} disabled={loading} className="danger">Delete</button>
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="controls">
        <div className="control-group">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Masukkan nilai..."
            disabled={loading}
          />
          <button onClick={handlePush} disabled={loading || !inputValue.trim()}>Push (Masuk)</button>
          <button onClick={handlePop} disabled={loading || items.length === 0}>Pop (Keluar)</button>
          <button onClick={handlePeek} disabled={loading || items.length === 0}>Peek</button>
        </div>
      </div>

      <div className="complexity-info">
        <span>Access: O(N)</span>
        <span>Search: O(N)</span>
        <span>Push: O(1)</span>
        <span>Pop: O(1)</span>
      </div>

      <div className="visualization">
        {loading ? (
          <div className="loading">Memuat...</div>
        ) : items.length === 0 ? (
          <div className="empty-list">Stack kosong. Push item pertama!</div>
        ) : (
          <div className="stack-container" role="list" aria-label="Stack visualization">
            {items.map((item, index) => (
              <StackItem
                key={item.id}
                item={item}
                index={index}
                isTop={index === 0}
                total={items.length}
              />
            ))}
          </div>
        )}
      </div>

      <div className="legend">
        <div className="legend-item"><span className="badge top">TOP</span> Dipush/Pop terakhir (LIFO)</div>
        <div className="legend-item">Item bawah = paling lama (bottom)</div>
      </div>
    </div>
  );
}

export default StackVisualizer;