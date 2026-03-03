import { useState } from 'react'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'
import CreateEventPage from './pages/CreateEventPage'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activePage, setActivePage] = useState('dashboard')

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />
  }

  if (activePage === 'create-event') {
    return <CreateEventPage onBack={() => setActivePage('dashboard')} />
  }

  return <DashboardPage onCreateEvent={() => setActivePage('create-event')} />
}

export default App
