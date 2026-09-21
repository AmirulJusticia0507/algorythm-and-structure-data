function ComplexityTable() {
  const data = [
    { structure: 'Array', access: 'O(1)', search: 'O(N)', insert: 'O(N)', delete: 'O(N)' },
    { structure: 'Singly Linked List', access: 'O(N)', search: 'O(N)', insert: 'O(1)*', delete: 'O(1)*' },
    { structure: 'Queue', access: 'O(N)', search: 'O(N)', insert: 'O(1)', delete: 'O(1)' },
    { structure: 'Stack', access: 'O(N)', search: 'O(N)', insert: 'O(1)', delete: 'O(1)' }
  ];

  return (
    <div className="card sticky top-24">
      <h4 className="text-sm font-semibold text-accent mb-4 flex items-center gap-2">
        <span className="p-1.5 bg-accent/10 rounded">📊</span>
        Big-O Complexity
      </h4>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="pb-3 text-xs font-medium text-text-muted uppercase tracking-wider">Structure</th>
              <th className="pb-3 text-xs font-medium text-text-muted uppercase tracking-wider text-center">Access</th>
              <th className="pb-3 text-xs font-medium text-text-muted uppercase tracking-wider text-center">Search</th>
              <th className="pb-3 text-xs font-medium text-text-muted uppercase tracking-wider text-center">Insert</th>
              <th className="pb-3 text-xs font-medium text-text-muted uppercase tracking-wider text-center">Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-bg-tertiary/50 transition-colors">
                <td className="py-3 font-medium text-text whitespace-nowrap">{row.structure}</td>
                <td className="py-3 text-center"><code className="text-accent">{row.access}</code></td>
                <td className="py-3 text-center"><code className="text-accent">{row.search}</code></td>
                <td className="py-3 text-center"><code className="text-success">{row.insert}</code></td>
                <td className="py-3 text-center"><code className="text-success">{row.delete}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-text-muted italic border-t border-border pt-3">
        * Linked List: O(1) when pointer to target node is known (head/tail)
      </p>
    </div>
  );
}

export default ComplexityTable;