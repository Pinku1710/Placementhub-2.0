export default function Stats({ totals }) {
  const cards = [
    ["Total", totals.total],
    ["Applied", totals.applied],
    ["Screening", totals.screening],
    ["Interviews", totals.interviews],
    ["Offers", totals.offers],
    ["Rejected", totals.rejected]
  ];

  return (
    <section className="stats-grid">
      {cards.map(([label, value]) => (
        <div className="stat-card" key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </section>
  );
}
