import { useEffect, useState } from "react";
import { api } from "./api/client";
import Login from "./components/Login";
import Stats from "./components/Stats";
import ApplicationForm from "./components/ApplicationForm";
import ApplicationTable from "./components/ApplicationTable";

export default function App() {
  const [user, setUser] = useState(null);
  const [totals, setTotals] = useState({
    total: 0, applied: 0, screening: 0, interviews: 0, offers: 0, rejected: 0
  });
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  async function loadDashboard() {
    const data = await api.dashboard();
    setTotals(data.totals);
  }

  async function loadApplications(page = pagination.page) {
    const params = new URLSearchParams({
      page,
      limit: 8,
      ...(search ? { search } : {}),
      ...(status ? { status } : {})
    });

    const data = await api.applications(`?${params.toString()}`);
    setItems(data.items);
    setPagination(data.pagination);
  }

  async function refresh(page = 1) {
    try {
      setError("");
      await Promise.all([loadDashboard(), loadApplications(page)]);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("placementhub_token");
    if (!token) return;

    api.me().then(setUser).catch(() => {
      localStorage.removeItem("placementhub_token");
    });
  }, []);

  useEffect(() => {
    if (user) refresh(1);
  }, [user, search, status]);

  if (!user) return <Login onLogin={setUser} />;

  async function createApplication(data) {
    await api.createApplication(data);
    await refresh(1);
  }

  async function deleteApplication(id) {
    if (!confirm("Delete this application?")) return;
    await api.deleteApplication(id);
    await refresh(items.length === 1 && pagination.page > 1 ? pagination.page - 1 : pagination.page);
  }

  async function updateStatus(id, nextStatus) {
    await api.updateApplication(id, { status: nextStatus });
    await refresh(pagination.page);
  }

  function logout() {
    localStorage.removeItem("placementhub_token");
    setUser(null);
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">PLACEMENTHUB</p>
          <h1>Placement command center</h1>
        </div>
        <div className="user-actions">
          <span>{user.name}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </header>

      {error && <div className="error-banner">{error}</div>}

      <Stats totals={totals} />

      <div className="toolbar panel">
        <input
          placeholder="Search company, role or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All statuses</option>
          <option value="APPLIED">Applied</option>
          <option value="SCREENING">Screening</option>
          <option value="INTERVIEW">Interview</option>
          <option value="OFFER">Offer</option>
          <option value="REJECTED">Rejected</option>
          <option value="WITHDRAWN">Withdrawn</option>
        </select>
      </div>

      <ApplicationForm onCreate={createApplication} />

      <ApplicationTable
        items={items}
        onDelete={deleteApplication}
        onStatusChange={updateStatus}
        page={pagination.page}
        pages={pagination.pages}
        onPageChange={(page) => loadApplications(page)}
      />
    </div>
  );
}
