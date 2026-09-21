import { useState } from 'react';
import LinkedListVisualizer from './components/LinkedListVisualizer';
import QueueVisualizer from './components/QueueVisualizer';
import StackVisualizer from './components/StackVisualizer';
import ComplexityTable from './components/ComplexityTable';

const structures = [
  { id: 'linked-list', name: 'Linked List', icon: '↗' },
  { id: 'queue', name: 'Queue (FIFO)', icon: '→' },
  { id: 'stack', name: 'Stack (LIFO)', icon: '↑' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('linked-list');
  const [structureIds, setStructureIds] = useState({
    'linked-list': null,
    'queue': null,
    'stack': null
  });

  return (
    <div className="app">
      <header className="header">
        <h1>📚 Data Structures Visualizer</h1>
        <p className="subtitle">Interaktif: Linked List, Queue, Stack dengan Node.js + React + PostgreSQL</p>
      </header>

      <nav className="tabs" role="tablist">
        {structures.map(s => (
          <button
            key={s.id}
            role="tab"
            aria-selected={activeTab === s.id}
            className={`tab ${activeTab === s.id ? 'active' : ''}`}
            onClick={() => setActiveTab(s.id)}
          >
            <span className="tab-icon">{s.icon}</span>
            <span>{s.name}</span>
          </button>
        ))}
      </nav>

      <main className="main">
        <div className="visualizer-panel">
          {activeTab === 'linked-list' && (
            <LinkedListVisualizer 
              structureId={structureIds['linked-list']}
              onStructureCreate={(id) => setStructureIds(prev => ({...prev, 'linked-list': id}))}
            />
          )}
          {activeTab === 'queue' && (
            <QueueVisualizer 
              structureId={structureIds['queue']}
              onStructureCreate={(id) => setStructureIds(prev => ({...prev, 'queue': id}))}
            />
          )}
          {activeTab === 'stack' && (
            <StackVisualizer 
              structureId={structureIds['stack']}
              onStructureCreate={(id) => setStructureIds(prev => ({...prev, 'stack': id}))}
            />
          )}
        </div>

        <aside className="sidebar">
          <ComplexityTable />
        </aside>
      </main>

      <footer className="footer">
        <p>Fundamental Data Structures & Algorithms • Built with Node.js, React, PostgreSQL</p>
      </footer>
    </div>
  );
}