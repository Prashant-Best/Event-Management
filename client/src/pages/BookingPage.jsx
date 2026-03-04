import { useMemo, useState } from 'react'
import Sidebar from '../components/Sidebar'

const ticketRates = {
  Standard: 39,
  Premium: 69,
  VIP: 129,
  Student: 24,
}

function BookingPage({ onBack, onOpenCreateEvent }) {
  const [form, setForm] = useState({
    eventName: '',
    eventDate: '',
    slot: '',
    ticketType: '',
    ticketQty: '1',
    fullName: '',
    email: '',
    phone: '',
    seatSection: '',
    needsAccessibility: false,
    adjacentSeats: true,
    paymentMethod: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    upiId: '',
    walletProvider: '',
    billingAddress: '',
    city: '',
    country: '',
    postalCode: '',
    sendEmailTicket: true,
    sendSmsUpdates: true,
    sendWhatsappUpdates: false,
    specialRequest: '',
    acceptedTerms: false,
  })

  const [touched, setTouched] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const errors = useMemo(() => {
    const currentErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!form.eventName) currentErrors.eventName = 'Select an event.'
    if (!form.eventDate) currentErrors.eventDate = 'Select event date.'
    if (!form.slot) currentErrors.slot = 'Select a time slot.'
    if (!form.ticketType) currentErrors.ticketType = 'Select ticket type.'

    const ticketQty = Number(form.ticketQty)
    if (!ticketQty || ticketQty < 1 || ticketQty > 10) {
      currentErrors.ticketQty = 'Choose between 1 and 10 tickets.'
    }

    if (!form.fullName.trim()) currentErrors.fullName = 'Full name is required.'

    if (!form.email.trim()) {
      currentErrors.email = 'Email is required.'
    } else if (!emailRegex.test(form.email)) {
      currentErrors.email = 'Enter a valid email address.'
    }

    if (!form.phone.trim()) {
      currentErrors.phone = 'Phone number is required.'
    } else if (form.phone.replace(/\D/g, '').length < 10) {
      currentErrors.phone = 'Use a valid phone number.'
    }

    if (!form.seatSection) currentErrors.seatSection = 'Choose a preferred section.'

    if (!form.paymentMethod) {
      currentErrors.paymentMethod = 'Select a payment method.'
    }

    if (form.paymentMethod === 'card') {
      if (!form.cardName.trim()) currentErrors.cardName = 'Card holder name is required.'
      if (form.cardNumber.replace(/\s/g, '').length < 12) {
        currentErrors.cardNumber = 'Card number looks incomplete.'
      }
      if (!form.cardExpiry.trim()) currentErrors.cardExpiry = 'Expiry is required.'
      if (!/^\d{3,4}$/.test(form.cardCvv.trim())) {
        currentErrors.cardCvv = 'Enter a valid CVV.'
      }
    }

    if (form.paymentMethod === 'upi' && !form.upiId.trim()) {
      currentErrors.upiId = 'UPI ID is required.'
    }

    if (form.paymentMethod === 'wallet' && !form.walletProvider) {
      currentErrors.walletProvider = 'Choose your wallet.'
    }

    if (!form.billingAddress.trim()) currentErrors.billingAddress = 'Billing address is required.'
    if (!form.city.trim()) currentErrors.city = 'City is required.'
    if (!form.country.trim()) currentErrors.country = 'Country is required.'
    if (!form.postalCode.trim()) currentErrors.postalCode = 'Postal code is required.'

    if (!form.acceptedTerms) {
      currentErrors.acceptedTerms = 'Accept terms to confirm this booking.'
    }

    return currentErrors
  }, [form])

  const isFormValid = Object.keys(errors).length === 0

  const pricing = useMemo(() => {
    const basePrice = form.ticketType ? ticketRates[form.ticketType] : 0
    const quantity = Math.max(0, Number(form.ticketQty) || 0)
    const subtotal = basePrice * quantity
    const fee = Number((subtotal * 0.05).toFixed(2))
    return {
      basePrice,
      quantity,
      subtotal,
      fee,
      total: Number((subtotal + fee).toFixed(2)),
    }
  }, [form.ticketQty, form.ticketType])

  const handleChange = (event) => {
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

  const markAllTouched = () => {
    const allTouched = Object.keys(form).reduce((acc, key) => {
      acc[key] = true
      return acc
    }, {})
    setTouched(allTouched)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    markAllTouched()

    if (isFormValid) {
      setIsSubmitted(true)
    }
  }

  return (
    <div className="dashboard-shell">
      <Sidebar
        active="bookings"
        onOpenDashboard={onBack}
        onOpenCreateEvent={onOpenCreateEvent}
        onOpenBookings={() => {}}
      />

      <main className="main-panel">
        <header className="topbar">
          <div>
            <h1>Booking Desk</h1>
            <p>Capture attendee details, seat choices, and payment information</p>
          </div>
          <button className="ghost-btn" type="button" onClick={onBack}>
            Back to Dashboard
          </button>
        </header>

        <div className="booking-content-grid">
          <form className="event-form" onSubmit={handleSubmit} noValidate>
            <section className="event-form-card">
              <h2>Event and Ticket Selection</h2>
              <div className="event-form-grid two-col">
                <label className="field">
                  <span>Event</span>
                  <select
                    name="eventName"
                    value={form.eventName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">Select event</option>
                    <option>Global Tech Summit 2026</option>
                    <option>Night Beats Concert</option>
                    <option>Startup Connect Expo</option>
                    <option>City Marathon Finals</option>
                  </select>
                  {touched.eventName && errors.eventName && (
                    <small className="field-error">{errors.eventName}</small>
                  )}
                </label>

                <label className="field">
                  <span>Event Date</span>
                  <input
                    type="date"
                    name="eventDate"
                    value={form.eventDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.eventDate && errors.eventDate && (
                    <small className="field-error">{errors.eventDate}</small>
                  )}
                </label>

                <label className="field">
                  <span>Time Slot</span>
                  <select
                    name="slot"
                    value={form.slot}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">Select slot</option>
                    <option>10:00 AM - 01:00 PM</option>
                    <option>03:00 PM - 06:00 PM</option>
                    <option>07:30 PM - 10:30 PM</option>
                  </select>
                  {touched.slot && errors.slot && (
                    <small className="field-error">{errors.slot}</small>
                  )}
                </label>

                <label className="field">
                  <span>Number of Tickets</span>
                  <input
                    type="number"
                    name="ticketQty"
                    min="1"
                    max="10"
                    value={form.ticketQty}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.ticketQty && errors.ticketQty && (
                    <small className="field-error">{errors.ticketQty}</small>
                  )}
                </label>

                <label className="field event-span-full">
                  <span>Ticket Type</span>
                  <select
                    name="ticketType"
                    value={form.ticketType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">Select ticket type</option>
                    <option>Standard</option>
                    <option>Premium</option>
                    <option>VIP</option>
                    <option>Student</option>
                  </select>
                  {touched.ticketType && errors.ticketType && (
                    <small className="field-error">{errors.ticketType}</small>
                  )}
                </label>
              </div>
            </section>

            <section className="event-form-card">
              <h2>Attendee Information</h2>
              <div className="event-form-grid two-col">
                <label className="field">
                  <span>Full Name</span>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Naveen Panwar"
                    value={form.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.fullName && errors.fullName && (
                    <small className="field-error">{errors.fullName}</small>
                  )}
                </label>

                <label className="field">
                  <span>Email Address</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="name@domain.com"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.email && errors.email && (
                    <small className="field-error">{errors.email}</small>
                  )}
                </label>

                <label className="field">
                  <span>Phone Number</span>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 98XXXXXXXX"
                    value={form.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.phone && errors.phone && (
                    <small className="field-error">{errors.phone}</small>
                  )}
                </label>

                <label className="field">
                  <span>Preferred Section</span>
                  <select
                    name="seatSection"
                    value={form.seatSection}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">Select section</option>
                    <option>Front Rows</option>
                    <option>Center Zone</option>
                    <option>Balcony</option>
                    <option>Family Stand</option>
                  </select>
                  {touched.seatSection && errors.seatSection && (
                    <small className="field-error">{errors.seatSection}</small>
                  )}
                </label>
              </div>

              <div className="event-form-checks">
                <label className="check-field">
                  <input
                    type="checkbox"
                    name="needsAccessibility"
                    checked={form.needsAccessibility}
                    onChange={handleChange}
                  />
                  <span>Need accessibility assistance</span>
                </label>
                <label className="check-field">
                  <input
                    type="checkbox"
                    name="adjacentSeats"
                    checked={form.adjacentSeats}
                    onChange={handleChange}
                  />
                  <span>Try to allocate adjacent seats</span>
                </label>
              </div>
            </section>

            <section className="event-form-card">
              <h2>Payment and Billing</h2>
              <div className="event-form-grid two-col">
                <label className="field event-span-full">
                  <span>Payment Method</span>
                  <select
                    name="paymentMethod"
                    value={form.paymentMethod}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">Select payment method</option>
                    <option value="card">Credit / Debit Card</option>
                    <option value="upi">UPI</option>
                    <option value="wallet">Wallet</option>
                  </select>
                  {touched.paymentMethod && errors.paymentMethod && (
                    <small className="field-error">{errors.paymentMethod}</small>
                  )}
                </label>

                {form.paymentMethod === 'card' && (
                  <>
                    <label className="field">
                      <span>Card Holder Name</span>
                      <input
                        type="text"
                        name="cardName"
                        value={form.cardName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.cardName && errors.cardName && (
                        <small className="field-error">{errors.cardName}</small>
                      )}
                    </label>
                    <label className="field">
                      <span>Card Number</span>
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={form.cardNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.cardNumber && errors.cardNumber && (
                        <small className="field-error">{errors.cardNumber}</small>
                      )}
                    </label>
                    <label className="field">
                      <span>Expiry (MM/YY)</span>
                      <input
                        type="text"
                        name="cardExpiry"
                        placeholder="08/28"
                        value={form.cardExpiry}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.cardExpiry && errors.cardExpiry && (
                        <small className="field-error">{errors.cardExpiry}</small>
                      )}
                    </label>
                    <label className="field">
                      <span>CVV</span>
                      <input
                        type="password"
                        name="cardCvv"
                        placeholder="123"
                        value={form.cardCvv}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.cardCvv && errors.cardCvv && (
                        <small className="field-error">{errors.cardCvv}</small>
                      )}
                    </label>
                  </>
                )}

                {form.paymentMethod === 'upi' && (
                  <label className="field event-span-full">
                    <span>UPI ID</span>
                    <input
                      type="text"
                      name="upiId"
                      placeholder="name@bank"
                      value={form.upiId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.upiId && errors.upiId && (
                      <small className="field-error">{errors.upiId}</small>
                    )}
                  </label>
                )}

                {form.paymentMethod === 'wallet' && (
                  <label className="field event-span-full">
                    <span>Wallet</span>
                    <select
                      name="walletProvider"
                      value={form.walletProvider}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="">Select wallet</option>
                      <option>Paytm</option>
                      <option>PhonePe</option>
                      <option>Amazon Pay</option>
                    </select>
                    {touched.walletProvider && errors.walletProvider && (
                      <small className="field-error">{errors.walletProvider}</small>
                    )}
                  </label>
                )}

                <label className="field event-span-full">
                  <span>Billing Address</span>
                  <input
                    type="text"
                    name="billingAddress"
                    value={form.billingAddress}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.billingAddress && errors.billingAddress && (
                    <small className="field-error">{errors.billingAddress}</small>
                  )}
                </label>

                <label className="field">
                  <span>City</span>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.city && errors.city && (
                    <small className="field-error">{errors.city}</small>
                  )}
                </label>

                <label className="field">
                  <span>Country</span>
                  <input
                    type="text"
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.country && errors.country && (
                    <small className="field-error">{errors.country}</small>
                  )}
                </label>

                <label className="field">
                  <span>Postal Code</span>
                  <input
                    type="text"
                    name="postalCode"
                    value={form.postalCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.postalCode && errors.postalCode && (
                    <small className="field-error">{errors.postalCode}</small>
                  )}
                </label>
              </div>
            </section>

            <section className="event-form-card">
              <h2>Delivery Preferences</h2>
              <div className="event-form-checks">
                <label className="check-field">
                  <input
                    type="checkbox"
                    name="sendEmailTicket"
                    checked={form.sendEmailTicket}
                    onChange={handleChange}
                  />
                  <span>Send e-ticket to email</span>
                </label>
                <label className="check-field">
                  <input
                    type="checkbox"
                    name="sendSmsUpdates"
                    checked={form.sendSmsUpdates}
                    onChange={handleChange}
                  />
                  <span>Send SMS event updates</span>
                </label>
                <label className="check-field">
                  <input
                    type="checkbox"
                    name="sendWhatsappUpdates"
                    checked={form.sendWhatsappUpdates}
                    onChange={handleChange}
                  />
                  <span>Send WhatsApp reminders</span>
                </label>
              </div>

              <label className="field" style={{ marginTop: '12px' }}>
                <span>Special Request (Optional)</span>
                <textarea
                  name="specialRequest"
                  rows="3"
                  placeholder="Any seating, accessibility, or assistance notes"
                  value={form.specialRequest}
                  onChange={handleChange}
                />
              </label>

              <label className="check-field" style={{ marginTop: '14px' }}>
                <input
                  type="checkbox"
                  name="acceptedTerms"
                  checked={form.acceptedTerms}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <span>I confirm booking details and accept refund/cancellation policy</span>
              </label>
              {touched.acceptedTerms && errors.acceptedTerms && (
                <small className="field-error">{errors.acceptedTerms}</small>
              )}
            </section>

            <div className="event-form-actions">
              <button className="ghost-btn" type="button" onClick={onBack}>
                Cancel
              </button>
              <button className="primary-btn" type="submit">
                Confirm Booking
              </button>
            </div>

            {isSubmitted && (
              <div className="booking-success" role="status" aria-live="polite">
                Booking captured successfully. Ticket confirmation can now be generated with QR.
              </div>
            )}
          </form>

          <aside className="booking-summary">
            <h2>Booking Summary</h2>
            <div className="summary-block">
              <p className="summary-label">Selected Event</p>
              <h3>{form.eventName || 'Not selected'}</h3>
              <span>{form.eventDate || 'No date selected'}</span>
            </div>

            <div className="summary-block">
              <div className="price-row">
                <span>Ticket Type</span>
                <strong>{form.ticketType || '--'}</strong>
              </div>
              <div className="price-row">
                <span>Unit Price</span>
                <strong>${pricing.basePrice.toFixed(2)}</strong>
              </div>
              <div className="price-row">
                <span>Quantity</span>
                <strong>{pricing.quantity}</strong>
              </div>
              <div className="price-row">
                <span>Subtotal</span>
                <strong>${pricing.subtotal.toFixed(2)}</strong>
              </div>
              <div className="price-row">
                <span>Platform Fee (5%)</span>
                <strong>${pricing.fee.toFixed(2)}</strong>
              </div>
            </div>

            <div className="price-row total">
              <span>Payable Total</span>
              <strong>${pricing.total.toFixed(2)}</strong>
            </div>

            <p className="summary-note">
              Final seat numbers and QR ticket are issued after successful payment.
            </p>
          </aside>
        </div>
      </main>
    </div>
  )
}

export default BookingPage
