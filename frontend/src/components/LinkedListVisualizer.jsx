import { useState } from 'react';
import { useLinkedList } from '../hooks/useLinkedList';

function NodeComponent({ node, index, isHead, isTail }) {
  return (
    <div className="ll-node">
      <div className="node-box">
        <div className="node-value">{node.value}</div>
        <div className="node-meta">
          <span className="node-index">#{index}</span>
          {isHead && <span className="badge head">HEAD</span>}
          {isTail && <span className="badge tail">TAIL</span>}
        </div>
      </div>
      {!isTail && <div className="node-arrow">→</div>}
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
      <div className="visualizer">
        <div className="empty-state">
          <h3>📋 Linked List</h3>
          <p>Masukkan ID kustom (opsional) dan buat linked list baru</p>
          <div className="input-group">
            <input
              type="text"
              value={newListId}
              onChange={(e) => setNewListId(e.target.value)}
              placeholder="Custom ID (opsional)"
              maxLength={20}
            />
            <button onClick={handleCreate} disabled={loading}>Buat Linked List</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="visualizer">
      <div className="visualizer-header">
        <h3>📋 Linked List <span className="id-badge">{listId}</span></h3>
        <div className="actions">
          <button onClick={clear} disabled={loading || nodes.length === 0}>Clear</button>
          <button onClick={deleteList} disabled={loading} className="danger">Delete</button>
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
          <button onClick={handleInsertHead} disabled={loading || !inputValue.trim()}>Insert Head</button>
          <button onClick={handleInsertTail} disabled={loading || !inputValue.trim()}>Insert Tail</button>
        </div>
        <div className="control-group">
          <input
            type="number"
            value={position}
            onChange={(e) => setPosition(Math.max(0, parseInt(e.target.value) || 0))}
            min="0"
            placeholder="Posisi"
            disabled={loading}
            style={{ width: '80px' }}
          />
          <button onClick={handleInsertPos} disabled={loading || !inputValue.trim()}>Insert at Position</button>
        </div>
      </div>

      <div className="complexity-info">
        <span>Access: O(N)</span>
        <span>Search: O(N)</span>
        <span>Insert: O(1)*</span>
        <span>Delete: O(1)*</span>
        <span className="note">* Jika pointer ke node sudah diketahui</span>
      </div>

      <div className="visualization">
        {loading ? (
          <div className="loading">Memuat...</div>
        ) : nodes.length === 0 ? (
          <div className="empty-list">List kosong. Tambahkan node pertama!</div>
        ) : (
          <div className="linked-list-container" role="list" aria-label="Linked List visualization">
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

      {nodes.length > 0 && (
        <div className="node-operations">
          <h4>Operasi per Node:</h4>
          <div className="node-list">
            {nodes.map((node, index) => (
              <div key={node.id} className="node-op">
                <span>#{index}: {node.value}</span>
                <button onClick={() => handleDeletePos(index)} disabled={loading} className="small danger">Hapus</button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="legend">
        <div className="legend-item"><span className="badge head">HEAD</span> Node pertama</div>
        <div className="legend-item"><span className="badge tail">TAIL</span> Node terakhir</div>
        <div className="legend-item"><span className="arrow">→</span> Pointer ke node berikutnya</div>
      </div>
    </div>
  );
}

export default LinkedListVisualizer;