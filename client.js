const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const token = localStorage.getItem("placementhub_token");

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || "Request failed");
  }

  if (response.status === 204) return null;
  return response.json();
}

export const api = {
  login: (body) => request("/auth/login", { method: "POST", body: JSON.stringify(body) }),
  register: (body) => request("/auth/register", { method: "POST", body: JSON.stringify(body) }),
  me: () => request("/auth/me"),
  dashboard: () => request("/dashboard"),
  applications: (params = "") => request(`/applications${params}`),
  createApplication: (body) =>
    request("/applications", { method: "POST", body: JSON.stringify(body) }),
  updateApplication: (id, body) =>
    request(`/applications/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
  deleteApplication: (id) =>
    request(`/applications/${id}`, { method: "DELETE" }),
  createInterview: (applicationId, body) =>
    request(`/interviews/application/${applicationId}`, {
      method: "POST",
      body: JSON.stringify(body)
    })
};
