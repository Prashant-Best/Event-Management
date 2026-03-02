function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-dot" />
        <div>
          <p className="brand-title">EventOps Console</p>
          <p className="brand-subtitle">Organizer Control Center</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        <button className="nav-link active">Dashboard</button>
        <button className="nav-link">Bookings</button>
        <button className="nav-link">Seats</button>
        <button className="nav-link">Verification</button>
        <button className="nav-link">Analytics</button>
        <button className="nav-link">Notifications</button>
      </nav>

      <div className="sidebar-foot">
        <p>Next Event</p>
        <h3>Global Tech Summit</h3>
        <span>Today, 7:30 PM</span>
      </div>
    </aside>
  )
}

export default Sidebar
