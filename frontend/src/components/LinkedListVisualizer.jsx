import { useState } from 'react';
import { useLinkedList } from '../hooks/useLinkedList';

function NodeComponent({ node, index, isHead, isTail }) {
  return (
    <div className="flex items-center">
      <div className="node-box">
        <div className="text-accent font-mono text-lg font-semibold">{node.value}</div>
        <div className="flex items-center gap-1.5 mt-2">
          <span className="text-xs text-text-muted font-mono">#{index}</span>
          {isHead && <span className="badge badge-head">HEAD</span>}
          {isTail && <span className="badge badge-tail">TAIL</span>}
        </div>
      </div>
      {!isTail && <div className="text-purple text-2xl font-bold mx-2 select-none" aria-hidden="true">→</div>}
    </div>
  );
}

function LinkedListVisualizer({ structureId, onStructureCreate }) {
  const { listId, nodes, loading, error, create, insertAtHead, insertAtTail, insertAtPosition, deleteAtPosition, deleteHead, deleteTail, clear, deleteList, refresh } = useLinkedList(structureId);
  const [inputValue, setInputValue] = useState('');
  const [position, setPosition] = useState(0);
  const [newListId, setNewListId] = useState('');

  const handleCreate = async () => {
    try {
      await create(newListId || undefined, 'My Linked List');
      onStructureCreate?.(newListId || undefined);
      setNewListId('');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleInsertHead = async () => {
    if (!inputValue.trim()) return;
    try { await insertAtHead(inputValue); setInputValue(''); } catch (err) { alert(err.message); }
  };

  const handleInsertTail = async () => {
    if (!inputValue.trim()) return;
    try { await insertAtTail(inputValue); setInputValue(''); } catch (err) { alert(err.message); }
  };

  const handleInsertPos = async () => {
    if (!inputValue.trim()) return;
    try { await insertAtPosition(inputValue, position); setInputValue(''); } catch (err) { alert(err.message); }
  };

  const handleDeleteHead = async () => {
    try { await deleteHead(); } catch (err) { alert(err.message); }
  };

  const handleDeleteTail = async () => {
    try { await deleteTail(); } catch (err) { alert(err.message); }
  };

  const handleDeletePos = async (pos) => {
    try { await deleteAtPosition(pos); } catch (err) { alert(err.message); }
  };

  if (!listId) {
    return (
      <div className="card">
        <div className="text-center py-8">
          <div className="text-5xl mb-4">📋</div>
          <h3 className="text-xl font-semibold mb-2">Linked List</h3>
          <p className="text-text-muted mb-6 max-w-md mx-auto">
            Pointer-based dynamic structure. Nodes linked via references. O(1) insert/delete at known position.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="text"
              value={newListId}
              onChange={(e) => setNewListId(e.target.value)}
              placeholder="Custom ID (optional)"
              maxLength={20}
              className="input"
            />
            <button onClick={handleCreate} disabled={loading} className="btn btn-primary">
              Create Linked List
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
          <div className="p-2 bg-bg-tertiary rounded-lg text-accent">📋</div>
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              Linked List
              <span className="px-2 py-0.5 text-xs font-mono bg-bg border border-border rounded">{listId}</span>
            </h3>
            <p className="text-xs text-text-muted">Nodes: {nodes.length} • Dynamic allocation</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={clear} disabled={loading || nodes.length === 0} className="btn btn-secondary btn-sm">
            Clear
          </button>
          <button onClick={deleteList} disabled={loading} className="btn btn-danger btn-sm">
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
          <button onClick={handleInsertHead} disabled={loading || !inputValue.trim()} className="btn btn-primary">
            Insert Head
          </button>
          <button onClick={handleInsertTail} disabled={loading || !inputValue.trim()} className="btn btn-primary">
            Insert Tail
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="number"
            value={position}
            onChange={(e) => setPosition(Math.max(0, parseInt(e.target.value) || 0))}
            min="0"
            placeholder="Position"
            className="input input-sm"
            disabled={loading}
          />
          <button onClick={handleInsertPos} disabled={loading || !inputValue.trim()} className="btn btn-secondary">
            Insert at Position
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
          Insert: <code className="text-success">O(1)*</code>
        </span>
        <span className="px-3 py-1 bg-bg-tertiary border border-border rounded-lg text-xs font-mono flex items-center gap-1">
          Delete: <code className="text-success">O(1)*</code>
        </span>
        <span className="px-3 py-1 bg-bg-tertiary border border-border rounded-lg text-xs text-text-muted italic">
          * with node pointer
        </span>
      </div>

      {/* Visualization */}
      <div className="min-h-[200px] rounded-lg bg-bg border border-border p-6 overflow-x-auto">
        {loading ? (
          <div className="flex items-center justify-center h-32 text-text-muted">Loading...</div>
        ) : nodes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-text-muted gap-2">
            <div className="text-4xl">📭</div>
            <span>Empty list. Add your first node!</span>
          </div>
        ) : (
          <div className="flex items-center gap-0" role="list" aria-label="Linked List visualization">
            {nodes.map((node, index) => (
              <NodeComponent
                key={node.id}
                node={node}
                index={index}
                isHead={index === 0}
                isTail={index === nodes.length - 1}
              />
            ))}
          </div>
        )}
      </div>

      {/* Node Operations */}
      {nodes.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="text-sm font-medium text-text-muted mb-4">Node Operations</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {nodes.map((node, index) => (
              <div key={node.id} className="flex items-center justify-between p-3 bg-bg rounded-lg border border-border">
                <span className="flex items-center gap-2">
                  <span className="text-xs text-text-muted font-mono">#{index}</span>
                  <code className="text-accent font-mono">{node.value}</code>
                </span>
                <button 
                  onClick={() => handleDeletePos(index)} 
                  disabled={loading} 
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-border flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2 text-text-muted">
          <span className="badge badge-head">HEAD</span> First node
        </div>
        <div className="flex items-center gap-2 text-text-muted">
          <span className="badge badge-tail">TAIL</span> Last node
        </div>
        <div className="flex items-center gap-2 text-text-muted">
          <span className="text-purple text-xl font-bold">→</span> Next pointer
        </div>
      </div>
    </div>
  );
}

export default LinkedListVisualizer;