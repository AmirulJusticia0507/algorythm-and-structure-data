import { useState } from 'react';
import { useQueue } from '../hooks/useQueue';

function QueueItem({ item, index, isFront, isRear }) {
  return (
    <div className="flex items-center">
      <div className={`item-box ${isFront ? 'item-box-front' : ''} ${isRear ? 'item-box-rear' : ''}`}>
        <div className="text-orange font-mono text-lg font-semibold">{item.value}</div>
        <div className="flex items-center gap-1.5 mt-2">
          <span className="text-xs text-text-muted font-mono">#{index}</span>
          {isFront && <span className="badge badge-front">FRONT</span>}
          {isRear && <span className="badge badge-rear">REAR</span>}
        </div>
      </div>
      {!isRear && <div className="text-success text-xl font-bold mx-2 select-none" aria-hidden="true">←</div>}
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
      setNewQueueId('');
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
      else alert('Queue is empty');
    } catch (err) {
      alert(err.message);
    }
  };

  if (!queueId) {
    return (
      <div className="card">
        <div className="text-center py-8">
          <div className="text-5xl mb-4">📥</div>
          <h3 className="text-xl font-semibold mb-2">Queue (FIFO)</h3>
          <p className="text-text-muted mb-6 max-w-md mx-auto">
            First-In, First-Out. Elements added at rear, removed from front. Perfect for task scheduling.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="text"
              value={newQueueId}
              onChange={(e) => setNewQueueId(e.target.value)}
              placeholder="Custom ID (optional)"
              maxLength={20}
              className="input"
            />
            <button onClick={handleCreate} disabled={loading} className="btn btn-primary">
              Create Queue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-bg-tertiary rounded-lg text-orange">📥</div>
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              Queue
              <span className="px-2 py-0.5 text-xs font-mono bg-bg border border-border rounded">{queueId}</span>
            </h3>
            <p className="text-xs text-text-muted">Items: {items.length} • FIFO order</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={clear} disabled={loading || items.length === 0} className="btn btn-secondary btn-sm">
            Clear
          </button>
          <button onClick={deleteQueue} disabled={loading} className="btn btn-danger btn-sm">
            Delete
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-danger/30 text-red-400 rounded-lg text-sm flex items-center gap-2">
          ⚠️ {error}
        </div>
      )}

      {/* Controls */}
      <div className="space-y-4 mb-6 p-4 bg-bg rounded-lg border border-border">
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter value..."
            className="input flex-1 min-w-[180px]"
            disabled={loading}
          />
          <button onClick={handleEnqueue} disabled={loading || !inputValue.trim()} className="btn btn-primary">
            Enqueue (Add to Rear)
          </button>
          <button onClick={handleDequeue} disabled={loading || items.length === 0} className="btn btn-danger">
            Dequeue (Remove from Front)
          </button>
          <button onClick={handlePeek} disabled={loading || items.length === 0} className="btn btn-secondary">
            Peek Front
          </button>
        </div>
      </div>

      {/* Complexity badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-3 py-1 bg-bg-tertiary border border-border rounded-lg text-xs font-mono flex items-center gap-1">
          Access: <code className="text-accent">O(N)</code>
        </span>
        <span className="px-3 py-1 bg-bg-tertiary border border-border rounded-lg text-xs font-mono flex items-center gap-1">
          Search: <code className="text-accent">O(N)</code>
        </span>
        <span className="px-3 py-1 bg-bg-tertiary border border-border rounded-lg text-xs font-mono flex items-center gap-1">
          Enqueue: <code className="text-success">O(1)</code>
        </span>
        <span className="px-3 py-1 bg-bg-tertiary border border-border rounded-lg text-xs font-mono flex items-center gap-1">
          Dequeue: <code className="text-success">O(1)</code>
        </span>
      </div>

      {/* Visualization */}
      <div className="min-h-[180px] rounded-lg bg-bg border border-border p-6 overflow-x-auto">
        {loading ? (
          <div className="flex items-center justify-center h-32 text-text-muted">Loading...</div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-text-muted gap-2">
            <div className="text-4xl">📭</div>
            <span>Empty queue. Enqueue your first item!</span>
          </div>
        ) : (
          <div className="flex items-center justify-center" role="list" aria-label="Queue visualization">
            <div className="flex items-center gap-0" style={{ direction: 'rtl' }}>
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
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-border flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2 text-text-muted">
          <span className="badge badge-front">FRONT</span> Removed first (Dequeue)
        </div>
        <div className="flex items-center gap-2 text-text-muted">
          <span className="badge badge-rear">REAR</span> Added last (Enqueue)
        </div>
        <div className="flex items-center gap-2 text-text-muted">
          <span className="text-success text-xl font-bold">←</span> FIFO direction
        </div>
      </div>
    </div>
  );
}

export default QueueVisualizer;