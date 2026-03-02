function KpiGrid({ cards }) {
  return (
    <section className="kpi-grid">
      {cards.map((item) => (
        <article className="kpi-card" key={item.label}>
          <p>{item.label}</p>
          <h2>{item.value}</h2>
          <span>{item.delta}</span>
        </article>
      ))}
    </section>
  )
}

export default KpiGrid
