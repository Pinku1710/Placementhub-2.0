import { useState } from "react";

const initial = {
  company: "",
  role: "",
  location: "",
  jobUrl: "",
  status: "APPLIED",
  deadline: "",
  notes: ""
};

export default function ApplicationForm({ onCreate }) {
  const [form, setForm] = useState(initial);

  function update(e) {
    setForm((old) => ({ ...old, [e.target.name]: e.target.value }));
  }

  async function submit(e) {
    e.preventDefault();
    await onCreate({
      ...form,
      deadline: form.deadline ? new Date(form.deadline).toISOString() : null
    });
    setForm(initial);
  }

  return (
    <form className="panel form-grid" onSubmit={submit}>
      <div className="panel-heading">
        <div>
          <p className="eyebrow">TRACK</p>
          <h2>Add application</h2>
        </div>
      </div>

      <input required name="company" placeholder="Company" value={form.company} onChange={update} />
      <input required name="role" placeholder="Role" value={form.role} onChange={update} />
      <input name="location" placeholder="Location" value={form.location} onChange={update} />
      <input name="jobUrl" placeholder="Job URL" value={form.jobUrl} onChange={update} />

      <select name="status" value={form.status} onChange={update}>
        <option value="APPLIED">Applied</option>
        <option value="SCREENING">Screening</option>
        <option value="INTERVIEW">Interview</option>
        <option value="OFFER">Offer</option>
        <option value="REJECTED">Rejected</option>
        <option value="WITHDRAWN">Withdrawn</option>
      </select>

      <input name="deadline" type="datetime-local" value={form.deadline} onChange={update} />
      <textarea name="notes" placeholder="Notes" value={form.notes} onChange={update} />
      <button className="primary" type="submit">Add application</button>
    </form>
  );
}
