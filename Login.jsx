import { useState } from "react";
import { api } from "../api/client";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("student@example.com");
  const [password, setPassword] = useState("Password123!");
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setError("");
    try {
      const result = await api.login({ email, password });
      localStorage.setItem("placementhub_token", result.token);
      onLogin(result.user);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <p className="eyebrow">PLACEMENTHUB 2.0</p>
        <h1>Welcome back</h1>
        <p className="muted">Track applications, interviews and placement progress.</p>

        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        {error && <p className="error">{error}</p>}
        <button className="primary" type="submit">Sign in</button>

        <small className="muted">Demo: student@example.com / Password123!</small>
      </form>
    </main>
  );
}
