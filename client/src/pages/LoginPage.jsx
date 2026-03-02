import AuthHighlights from '../components/AuthHighlights'
import LoginForm from '../components/LoginForm'

function LoginPage({ onLoginSuccess }) {
  return (
    <div className="auth-shell">
      <AuthHighlights />
      <LoginForm onLoginSuccess={onLoginSuccess} />
    </div>
  )
}

export default LoginPage
