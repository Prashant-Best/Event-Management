function ModuleGrid({ items }) {
  return (
    <section className="module-grid">
      {items.map((module) => (
        <article className="module-card" key={module.title}>
          <div className="module-title-row">
            <h3>{module.title}</h3>
            {module.optional && <span className="tag">Optional</span>}
          </div>
          <p>{module.description}</p>
          <button className="ghost-btn">{module.action}</button>
        </article>
      ))}
    </section>
  )
}

export default ModuleGrid
