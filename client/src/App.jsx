import { useState } from 'react'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'
import CreateEventPage from './pages/CreateEventPage'
import BookingPage from './pages/BookingPage'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activePage, setActivePage] = useState('dashboard')

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />
  }

  if (activePage === 'create-event') {
    return (
      <CreateEventPage
        onBack={() => setActivePage('dashboard')}
        onOpenBookings={() => setActivePage('bookings')}
      />
    )
  }

  if (activePage === 'bookings') {
    return (
      <BookingPage
        onBack={() => setActivePage('dashboard')}
        onOpenCreateEvent={() => setActivePage('create-event')}
      />
    )
  }

  return (
    <DashboardPage
      onCreateEvent={() => setActivePage('create-event')}
      onOpenBookings={() => setActivePage('bookings')}
    />
  )
}

export default App
