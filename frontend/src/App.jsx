import { useState } from 'react';
import LinkedListVisualizer from './components/LinkedListVisualizer';
import QueueVisualizer from './components/QueueVisualizer';
import StackVisualizer from './components/StackVisualizer';
import ComplexityTable from './components/ComplexityTable';

const structures = [
  { id: 'linked-list', name: 'Linked List', icon: '→', desc: 'Pointer-based, dynamic' },
  { id: 'queue', name: 'Queue (FIFO)', icon: '↓', desc: 'First-In, First-Out' },
  { id: 'stack', name: 'Stack (LIFO)', icon: '↑', desc: 'Last-In, First-Out' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('linked-list');
  const [structureIds, setStructureIds] = useState({
    'linked-list': null,
    'queue': null,
    'stack': null
  });

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      {/* Header */}
      <header className="bg-bg-secondary border-b border-border px-6 py-5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-accent via-purple to-orange bg-clip-text text-transparent">
                Data Structures Visualizer
              </h1>
              <p className="text-text-muted text-sm mt-1">
                Interactive: Linked List, Queue, Stack dengan Node.js + React + PostgreSQL
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-text-muted font-mono">
              <span className="px-2 py-1 bg-bg-tertiary rounded border border-border">API: localhost:3001</span>
              <span className="px-2 py-1 bg-bg-tertiary rounded border border-border">DB: PostgreSQL</span>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <nav className="bg-bg-secondary border-b border-border px-6" role="tablist">
        <div className="max-w-7xl mx-auto">
          <div className="flex overflow-x-auto gap-1 pb-4" role="tablist">
            {structures.map(s => (
              <button
                key={s.id}
                role="tab"
                aria-selected={activeTab === s.id}
                className={`flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeTab === s.id
                    ? 'bg-bg-tertiary text-accent border-b-2 border-accent'
                    : 'text-text-muted hover:text-text hover:bg-bg-tertiary/50'
                }`}
                onClick={() => setActiveTab(s.id)}
              >
                <span className="text-lg">{s.icon}</span>
                <span>{s.name}</span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-xs bg-bg rounded border border-border text-text-muted">
                  {s.desc}
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row px-6 py-6 gap-6 max-w-7xl mx-auto w-full">
        {/* Visualizer Panel */}
        <div className="flex-1 min-w-0 lg:pr-8">
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

        {/* Sidebar - Complexity Table */}
        <aside className="lg:w-80 flex-shrink-0">
          <ComplexityTable />
        </aside>
      </main>

      {/* Footer */}
      <footer className="bg-bg-secondary border-t border-border px-6 py-4">
        <div className="max-w-7xl mx-auto text-center text-sm text-text-muted">
          Fundamental Data Structures & Algorithms • Built with Node.js, React, PostgreSQL
        </div>
      </footer>
    </div>
  );
}