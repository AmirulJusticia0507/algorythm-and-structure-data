function ComplexityTable() {
  const data = [
    { structure: 'Array', access: 'O(1)', search: 'O(N)', insert: 'O(N)', delete: 'O(N)' },
    { structure: 'Singly Linked List', access: 'O(N)', search: 'O(N)', insert: 'O(1)*', delete: 'O(1)*' },
    { structure: 'Queue', access: 'O(N)', search: 'O(N)', insert: 'O(1)', delete: 'O(1)' },
    { structure: 'Stack', access: 'O(N)', search: 'O(N)', insert: 'O(1)', delete: 'O(1)' }
  ];

  return (
    <div className="sidebar-card">
      <h4>📊 Big-O Complexity</h4>
      <table className="complexity-table">
        <thead>
          <tr>
            <th>Struktur</th>
            <th>Access</th>
            <th>Search</th>
            <th>Insert</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td className="structure-name">{row.structure}</td>
              <td><code>{row.access}</code></td>
              <td><code>{row.search}</code></td>
              <td><code>{row.insert}</code></td>
              <td><code>{row.delete}</code></td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="complexity-note">* Linked List: O(1) jika pointer ke node sudah diketahui (head/tail)</p>
    </div>
  );
}

export default ComplexityTable;