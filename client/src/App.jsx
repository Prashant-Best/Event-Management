import { useState } from 'react'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'
import CreateEventPage from './pages/CreateEventPage'
import BookingPage from './pages/BookingPage'
import SeatsPage from './pages/SeatsPage'

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
        onOpenSeats={() => setActivePage('seats')}
      />
    )
  }

  if (activePage === 'bookings') {
    return (
      <BookingPage
        onBack={() => setActivePage('dashboard')}
        onOpenCreateEvent={() => setActivePage('create-event')}
        onOpenSeats={() => setActivePage('seats')}
      />
    )
  }

  if (activePage === 'seats') {
    return (
      <SeatsPage
        onBack={() => setActivePage('dashboard')}
        onOpenCreateEvent={() => setActivePage('create-event')}
        onOpenBookings={() => setActivePage('bookings')}
      />
    )
  }

  return (
    <DashboardPage
      onCreateEvent={() => setActivePage('create-event')}
      onOpenBookings={() => setActivePage('bookings')}
      onOpenSeats={() => setActivePage('seats')}
    />
  )
}

export default App
