function Sidebar({
  active = 'dashboard',
  onOpenDashboard,
  onOpenCreateEvent,
  onOpenBookings,
  onOpenSeats,
}) {
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
        <button
          className={`nav-link ${active === 'dashboard' ? 'active' : ''}`}
          type="button"
          onClick={onOpenDashboard}
        >
          Dashboard
        </button>
        <button
          className={`nav-link ${active === 'create-event' ? 'active' : ''}`}
          type="button"
          onClick={onOpenCreateEvent}
        >
          Create Event
        </button>
        <button
          className={`nav-link ${active === 'bookings' ? 'active' : ''}`}
          type="button"
          onClick={onOpenBookings}
        >
          Bookings
        </button>
        <button
          className={`nav-link ${active === 'seats' ? 'active' : ''}`}
          type="button"
          onClick={onOpenSeats}
        >
          Seats
        </button>
        <button className="nav-link" type="button">
          Verification
        </button>
        <button className="nav-link" type="button">
          Analytics
        </button>
        <button className="nav-link" type="button">
          Notifications
        </button>
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
