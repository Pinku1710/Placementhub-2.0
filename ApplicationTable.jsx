export default function ApplicationTable({
  items,
  onDelete,
  onStatusChange,
  page,
  pages,
  onPageChange
}) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">APPLICATION PIPELINE</p>
          <h2>Your applications</h2>
        </div>
        <span className="muted">{items.length} shown</span>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Status</th>
              <th>Applied</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <strong>{item.company}</strong>
                  <small>{item.location || "Remote / not specified"}</small>
                </td>
                <td>{item.role}</td>
                <td>
                  <select
                    value={item.status}
                    onChange={(e) => onStatusChange(item.id, e.target.value)}
                  >
                    <option>APPLIED</option>
                    <option>SCREENING</option>
                    <option>INTERVIEW</option>
                    <option>OFFER</option>
                    <option>REJECTED</option>
                    <option>WITHDRAWN</option>
                  </select>
                </td>
                <td>{new Date(item.appliedDate).toLocaleDateString()}</td>
                <td>
                  <div className="actions">
                    {item.jobUrl && (
                      <a href={item.jobUrl} target="_blank" rel="noreferrer">Job</a>
                    )}
                    <button className="danger-link" onClick={() => onDelete(item.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {!items.length && (
              <tr>
                <td colSpan="5" className="empty">No applications found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button disabled={page <= 1} onClick={() => onPageChange(page - 1)}>Previous</button>
        <span>Page {page} of {pages || 1}</span>
        <button disabled={page >= pages} onClick={() => onPageChange(page + 1)}>Next</button>
      </div>
    </section>
  );
}
