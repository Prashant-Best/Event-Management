import { useMemo, useState } from 'react'

function LoginForm({ onLoginSuccess }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
    role: '',
    rememberMe: false,
    acceptedTerms: false,
  })
  const [touched, setTouched] = useState({})

  const errors = useMemo(() => {
    const currentErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/

    if (!form.email.trim()) {
      currentErrors.email = 'Email is required.'
    } else if (!emailRegex.test(form.email)) {
      currentErrors.email = 'Enter a valid email address.'
    }

    if (!form.password) {
      currentErrors.password = 'Password is required.'
    } else if (!strongPasswordRegex.test(form.password)) {
      currentErrors.password =
        'Use 8+ chars with upper, lower, number, and special character.'
    }

    if (!form.role) {
      currentErrors.role = 'Please select your account role.'
    }

    if (!form.acceptedTerms) {
      currentErrors.acceptedTerms = 'You must accept terms and privacy policy.'
    }

    return currentErrors
  }, [form])

  const isFormValid = Object.keys(errors).length === 0

  const handleFieldChange = (event) => {
    const { name, value, type, checked } = event.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleBlur = (event) => {
    const { name } = event.target
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setTouched({
      email: true,
      password: true,
      role: true,
      acceptedTerms: true,
    })

    if (isFormValid) {
      onLoginSuccess()
    }
  }

  return (
    <section className="auth-card-wrap">
      <form className="auth-card" onSubmit={handleSubmit} noValidate>
        <div>
          <h2>Login</h2>
          <p>Use your registered account to continue</p>
        </div>

        <label className="field">
          <span>Email Address</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleFieldChange}
            onBlur={handleBlur}
            placeholder="name@company.com"
            autoComplete="email"
          />
          {touched.email && errors.email && (
            <small className="field-error">{errors.email}</small>
          )}
        </label>

        <label className="field">
          <span>Password</span>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleFieldChange}
            onBlur={handleBlur}
            placeholder="Enter strong password"
            autoComplete="current-password"
          />
          {touched.password && errors.password && (
            <small className="field-error">{errors.password}</small>
          )}
        </label>

        <label className="field">
          <span>Role</span>
          <select
            name="role"
            value={form.role}
            onChange={handleFieldChange}
            onBlur={handleBlur}
          >
            <option value="">Select role</option>
            <option value="user">User</option>
            <option value="organizer">Organizer</option>
          </select>
          {touched.role && errors.role && (
            <small className="field-error">{errors.role}</small>
          )}
        </label>

        <label className="check-field">
          <input
            type="checkbox"
            name="rememberMe"
            checked={form.rememberMe}
            onChange={handleFieldChange}
          />
          <span>Remember this device</span>
        </label>

        <label className="check-field">
          <input
            type="checkbox"
            name="acceptedTerms"
            checked={form.acceptedTerms}
            onChange={handleFieldChange}
            onBlur={handleBlur}
          />
          <span>I accept terms and privacy policy</span>
        </label>
        {touched.acceptedTerms && errors.acceptedTerms && (
          <small className="field-error">{errors.acceptedTerms}</small>
        )}

        <button className="primary-btn auth-submit" type="submit">
          Sign In
        </button>
      </form>
    </section>
  )
}

export default LoginForm
