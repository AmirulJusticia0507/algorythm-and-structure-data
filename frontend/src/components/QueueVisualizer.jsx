import { useState } from 'react';
import { useQueue } from '../hooks/useQueue';

function QueueItem({ item, index, isFront, isRear }) {
  return (
    <div className="queue-item">
      <div className={`item-box ${isFront ? 'front' : ''} ${isRear ? 'rear' : ''}`}>
        <div className="item-value">{item.value}</div>
        <div className="item-meta">
          <span className="item-index">#{index}</span>
          {isFront && <span className="badge front">FRONT</span>}
          {isRear && <span className="badge rear">REAR</span>}
        </div>
      </div>
      {!isRear && <div className="item-arrow">←</div>}
    </div>
  );
}

function QueueVisualizer({ structureId, onStructureCreate }) {
  const { queueId, items, loading, error, create, enqueue, dequeue, peek, clear, deleteQueue, refresh } = useQueue(structureId);
  const [inputValue, setInputValue] = useState('');
  const [newQueueId, setNewQueueId] = useState('');

  const handleCreate = async () => {
    try {
      await create(newQueueId || undefined, 'My Queue');
      onStructureCreate?.(newQueueId || undefined);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEnqueue = async () => {
    if (!inputValue.trim()) return;
    try { await enqueue(inputValue); setInputValue(''); } catch (err) { alert(err.message); }
  };

  const handleDequeue = async () => {
    try {
      const item = await dequeue();
      alert(`Dequeued: ${item.value}`);
    } catch (err) {
      alert(err.message);
    }
  };

  const handlePeek = async () => {
    try {
      const item = await peek();
      if (item) alert(`Front: ${item.value}`);
      else alert('Queue kosong');
    } catch (err) {
      alert(err.message);
    }
  };

  if (!queueId) {
    return (
      <div className="visualizer">
        <div className="empty-state">
          <h3>📥 Queue (FIFO)</h3>
          <p>First-In, First-Out. Elemen pertama masuk, pertama keluar.</p>
          <div className="input-group">
            <input
              type="text"
              value={newQueueId}
              onChange={(e) => setNewQueueId(e.target.value)}
              placeholder="Custom ID (opsional)"
              maxLength={20}
            />
            <button onClick={handleCreate} disabled={loading}>Buat Queue</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="visualizer">
      <div className="visualizer-header">
        <h3>📥 Queue <span className="id-badge">{queueId}</span></h3>
        <div className="actions">
          <button onClick={clear} disabled={loading || items.length === 0}>Clear</button>
          <button onClick={deleteQueue} disabled={loading} className="danger">Delete</button>
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
          <button onClick={handleEnqueue} disabled={loading || !inputValue.trim()}>Enqueue (Masuk)</button>
          <button onClick={handleDequeue} disabled={loading || items.length === 0}>Dequeue (Keluar)</button>
          <button onClick={handlePeek} disabled={loading || items.length === 0}>Peek</button>
        </div>
      </div>

      <div className="complexity-info">
        <span>Access: O(N)</span>
        <span>Search: O(N)</span>
        <span>Enqueue: O(1)</span>
        <span>Dequeue: O(1)</span>
      </div>

      <div className="visualization">
        {loading ? (
          <div className="loading">Memuat...</div>
        ) : items.length === 0 ? (
          <div className="empty-list">Queue kosong. Enqueue item pertama!</div>
        ) : (
          <div className="queue-container" role="list" aria-label="Queue visualization">
            {items.map((item, index) => (
              <QueueItem
                key={item.id}
                item={item}
                index={index}
                isFront={index === 0}
                isRear={index === items.length - 1}
              />
            ))}
          </div>
        )}
      </div>

      <div className="legend">
        <div className="legend-item"><span className="badge front">FRONT</span> Dihapus pertama (Dequeue)</div>
        <div className="legend-item"><span className="badge rear">REAR</span> Ditambah terakhir (Enqueue)</div>
        <div className="legend-item"><span className="arrow">←</span> Arah keluar (FIFO)</div>
      </div>
    </div>
  );
}

export default QueueVisualizer;