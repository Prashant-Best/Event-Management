import KpiGrid from '../components/KpiGrid'
import ModuleGrid from '../components/ModuleGrid'
import Sidebar from '../components/Sidebar'
import { kpiCards, modules } from '../data/dashboardData'

function DashboardPage({ onCreateEvent, onOpenBookings, onOpenSeats }) {
  return (
    <div className="dashboard-shell">
      <Sidebar
        active="dashboard"
        onOpenDashboard={() => {}}
        onOpenCreateEvent={onCreateEvent}
        onOpenBookings={onOpenBookings}
        onOpenSeats={onOpenSeats}
      />

      <main className="main-panel">
        <header className="topbar">
          <div>
            <h1>Event Management Dashboard</h1>
            <p>Unified control panel for tickets, crowd, and operations</p>
          </div>
          <button className="primary-btn" type="button" onClick={onCreateEvent}>
            Create Event
          </button>
        </header>

        <KpiGrid cards={kpiCards} />

        <section className="modules-header">
          <h2>Core Modules</h2>
          <p>All features listed in your project README are included below</p>
        </section>

        <ModuleGrid items={modules} />
      </main>
    </div>
  )
}

export default DashboardPage
