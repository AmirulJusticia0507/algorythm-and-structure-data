import { useState } from 'react';
import { useStack } from '../hooks/useStack';

function StackItem({ item, index, isTop, total }) {
  const visualIndex = total - 1 - index;
  return (
    <div className="w-full max-w-md mx-auto" style={{ zIndex: total - index }}>
      <div className={`item-box ${isTop ? 'item-box-top' : ''}`}>
        <div className="text-orange font-mono text-lg font-semibold">{item.value}</div>
        <div className="flex items-center gap-1.5 mt-2">
          <span className="text-xs text-text-muted font-mono">#{visualIndex}</span>
          {isTop && <span className="badge badge-top">TOP</span>}
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
      setNewStackId('');
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
      else alert('Stack is empty');
    } catch (err) {
      alert(err.message);
    }
  };

  if (!stackId) {
    return (
      <div className="card">
        <div className="text-center py-8">
          <div className="text-5xl mb-4">📦</div>
          <h3 className="text-xl font-semibold mb-2">Stack (LIFO)</h3>
          <p className="text-text-muted mb-6 max-w-md mx-auto">
            Last-In, First-Out. Elements pushed and popped from top. Used in call stacks, undo/redo.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="text"
              value={newStackId}
              onChange={(e) => setNewStackId(e.target.value)}
              placeholder="Custom ID (optional)"
              maxLength={20}
              className="input"
            />
            <button onClick={handleCreate} disabled={loading} className="btn btn-primary">
              Create Stack
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
          <div className="p-2 bg-bg-tertiary rounded-lg text-orange">📦</div>
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              Stack
              <span className="px-2 py-0.5 text-xs font-mono bg-bg border border-border rounded">{stackId}</span>
            </h3>
            <p className="text-xs text-text-muted">Items: {items.length} • LIFO order</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={clear} disabled={loading || items.length === 0} className="btn btn-secondary btn-sm">
            Clear
          </button>
          <button onClick={deleteStack} disabled={loading} className="btn btn-danger btn-sm">
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
          <button onClick={handlePush} disabled={loading || !inputValue.trim()} className="btn btn-primary">
            Push (Add to Top)
          </button>
          <button onClick={handlePop} disabled={loading || items.length === 0} className="btn btn-danger">
            Pop (Remove from Top)
          </button>
          <button onClick={handlePeek} disabled={loading || items.length === 0} className="btn btn-secondary">
            Peek Top
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
          Push: <code className="text-success">O(1)</code>
        </span>
        <span className="px-3 py-1 bg-bg-tertiary border border-border rounded-lg text-xs font-mono flex items-center gap-1">
          Pop: <code className="text-success">O(1)</code>
        </span>
      </div>

      {/* Visualization - Stack grows upward */}
      <div className="min-h-[250px] rounded-lg bg-bg border border-border p-6">
        {loading ? (
          <div className="flex items-center justify-center h-48 text-text-muted">Loading...</div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-text-muted gap-2">
            <div className="text-4xl">📭</div>
            <span>Empty stack. Push your first item!</span>
          </div>
        ) : (
          <div className="flex flex-col-reverse items-center gap-2" role="list" aria-label="Stack visualization">
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

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-border flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2 text-text-muted">
          <span className="badge badge-top">TOP</span> Push/Pop here (LIFO)
        </div>
        <div className="flex items-center gap-2 text-text-muted">
          Bottom = oldest item
        </div>
      </div>
    </div>
  );
}

export default StackVisualizer;