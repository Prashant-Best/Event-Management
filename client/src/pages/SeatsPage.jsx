import { useMemo, useState } from 'react'
import Sidebar from '../components/Sidebar'

const sectionRows = {
  VIP: ['A', 'B', 'C'],
  Premium: ['D', 'E', 'F', 'G'],
  Standard: ['H', 'I', 'J', 'K', 'L'],
}

const sectionPrices = {
  VIP: 129,
  Premium: 69,
  Standard: 39,
}

const sectionOrder = ['VIP', 'Premium', 'Standard']

const generateSeats = () => {
  const rows = Object.values(sectionRows).flat()
  const seats = []

  rows.forEach((row, rowIndex) => {
    const section = Object.keys(sectionRows).find((key) => sectionRows[key].includes(row))

    for (let number = 1; number <= 14; number += 1) {
      const id = `${row}-${String(number).padStart(2, '0')}`
      let status = 'available'

      if ((rowIndex + number) % 11 === 0) {
        status = 'booked'
      } else if ((rowIndex + number * 2) % 13 === 0) {
        status = 'blocked'
      }

      seats.push({
        id,
        row,
        number,
        label: `${row}${number}`,
        section,
        price: sectionPrices[section],
        status,
      })
    }
  })

  return seats
}

function SeatsPage({ onBack, onOpenCreateEvent, onOpenBookings }) {
  const [seats, setSeats] = useState(generateSeats)
  const [eventName, setEventName] = useState('Global Tech Summit 2026')
  const [ticketQty, setTicketQty] = useState('2')
  const [sectionFilter, setSectionFilter] = useState('all')
  const [rowFilter, setRowFilter] = useState('all')
  const [seatStatusFilter, setSeatStatusFilter] = useState('all')
  const [message, setMessage] = useState('')

  const selectedSeats = useMemo(
    () => seats.filter((seat) => seat.status === 'selected'),
    [seats],
  )

  const heldSeats = useMemo(() => seats.filter((seat) => seat.status === 'held'), [seats])

  const occupancy = useMemo(
    () => ({
      total: seats.length,
      available: seats.filter((seat) => seat.status === 'available').length,
      selected: selectedSeats.length,
      held: heldSeats.length,
      booked: seats.filter((seat) => seat.status === 'booked').length,
      blocked: seats.filter((seat) => seat.status === 'blocked').length,
    }),
    [heldSeats.length, seats, selectedSeats.length],
  )

  const visibleSeats = useMemo(
    () =>
      seats.filter((seat) => {
        const matchesSection = sectionFilter === 'all' || seat.section === sectionFilter
        const matchesRow = rowFilter === 'all' || seat.row === rowFilter
        const matchesStatus = seatStatusFilter === 'all' || seat.status === seatStatusFilter
        return matchesSection && matchesRow && matchesStatus
      }),
    [rowFilter, seatStatusFilter, seats, sectionFilter],
  )

  const selectedTotal = useMemo(
    () => selectedSeats.reduce((total, seat) => total + seat.price, 0),
    [selectedSeats],
  )

  const heldTotal = useMemo(
    () => heldSeats.reduce((total, seat) => total + seat.price, 0),
    [heldSeats],
  )

  const clearMessage = () => setMessage('')

  const toggleSeatSelection = (seatId) => {
    clearMessage()
    setSeats((prev) =>
      prev.map((seat) => {
        if (seat.id !== seatId) {
          return seat
        }

        if (seat.status === 'available') {
          return { ...seat, status: 'selected' }
        }

        if (seat.status === 'selected') {
          return { ...seat, status: 'available' }
        }

        return seat
      }),
    )
  }

  const autoPickAdjacentSeats = () => {
    const requiredQty = Math.max(1, Math.min(8, Number(ticketQty) || 1))
    clearMessage()

    const selectedIds = new Set()
    const rows = Object.values(sectionRows).flat()

    for (const row of rows) {
      const rowSeats = seats
        .filter((seat) => {
          const sectionMatches = sectionFilter === 'all' || seat.section === sectionFilter
          const rowMatches = rowFilter === 'all' || seat.row === rowFilter
          return sectionMatches && rowMatches && seat.row === row && seat.status === 'available'
        })
        .sort((a, b) => a.number - b.number)

      for (let index = 0; index <= rowSeats.length - requiredQty; index += 1) {
        const block = rowSeats.slice(index, index + requiredQty)
        const isAdjacent = block.every((seat, blockIndex) =>
          blockIndex === 0 ? true : seat.number - block[blockIndex - 1].number === 1,
        )

        if (isAdjacent) {
          block.forEach((seat) => selectedIds.add(seat.id))
          break
        }
      }

      if (selectedIds.size === requiredQty) {
        break
      }
    }

    if (selectedIds.size !== requiredQty) {
      const fallbacks = seats.filter((seat) => {
        const sectionMatches = sectionFilter === 'all' || seat.section === sectionFilter
        const rowMatches = rowFilter === 'all' || seat.row === rowFilter
        return sectionMatches && rowMatches && seat.status === 'available'
      })

      for (const seat of fallbacks) {
        if (selectedIds.size === requiredQty) {
          break
        }
        selectedIds.add(seat.id)
      }
    }

    if (selectedIds.size === 0) {
      setMessage('No available seats match the current filters.')
      return
    }

    setSeats((prev) =>
      prev.map((seat) => {
        if (seat.status === 'selected') {
          return { ...seat, status: 'available' }
        }
        if (selectedIds.has(seat.id)) {
          return { ...seat, status: 'selected' }
        }
        return seat
      }),
    )

    if (selectedIds.size < requiredQty) {
      setMessage(`Only ${selectedIds.size} seat(s) were available for auto-pick.`)
    } else {
      setMessage(`${selectedIds.size} seat(s) auto-selected.`)
    }
  }

  const holdSelectedSeats = () => {
    if (selectedSeats.length === 0) {
      setMessage('Select at least one seat before placing hold.')
      return
    }

    setSeats((prev) =>
      prev.map((seat) =>
        seat.status === 'selected'
          ? {
              ...seat,
              status: 'held',
            }
          : seat,
      ),
    )
    setMessage(`${selectedSeats.length} seat(s) are now on hold.`)
  }

  const releaseHeldSeats = () => {
    if (heldSeats.length === 0) {
      setMessage('No held seats to release.')
      return
    }

    setSeats((prev) =>
      prev.map((seat) =>
        seat.status === 'held'
          ? {
              ...seat,
              status: 'available',
            }
          : seat,
      ),
    )
    setMessage(`${heldSeats.length} held seat(s) released.`)
  }

  const confirmBooking = () => {
    if (heldSeats.length === 0) {
      setMessage('Place selected seats on hold before confirming booking.')
      return
    }

    setSeats((prev) =>
      prev.map((seat) =>
        seat.status === 'held'
          ? {
              ...seat,
              status: 'booked',
            }
          : seat,
      ),
    )
    setMessage(`Booking confirmed for ${heldSeats.length} seat(s).`)
  }

  const clearSelected = () => {
    if (selectedSeats.length === 0) {
      setMessage('No selected seats to clear.')
      return
    }

    setSeats((prev) =>
      prev.map((seat) =>
        seat.status === 'selected'
          ? {
              ...seat,
              status: 'available',
            }
          : seat,
      ),
    )
    setMessage('Selected seats were cleared.')
  }

  return (
    <div className="dashboard-shell">
      <Sidebar
        active="seats"
        onOpenDashboard={onBack}
        onOpenCreateEvent={onOpenCreateEvent}
        onOpenBookings={onOpenBookings}
        onOpenSeats={() => {}}
      />

      <main className="main-panel">
        <header className="topbar">
          <div>
            <h1>Seat Management</h1>
            <p>Live seat availability, section filters, and booking controls</p>
          </div>
          <button className="ghost-btn" type="button" onClick={onBack}>
            Back to Dashboard
          </button>
        </header>

        <div className="seats-layout">
          <section className="event-form-card">
            <h2>Allocation Controls</h2>
            <div className="event-form-grid three-col">
              <label className="field">
                <span>Event</span>
                <select value={eventName} onChange={(event) => setEventName(event.target.value)}>
                  <option>Global Tech Summit 2026</option>
                  <option>Night Beats Concert</option>
                  <option>Startup Connect Expo</option>
                </select>
              </label>

              <label className="field">
                <span>Section Filter</span>
                <select
                  value={sectionFilter}
                  onChange={(event) => {
                    setSectionFilter(event.target.value)
                    clearMessage()
                  }}
                >
                  <option value="all">All Sections</option>
                  {sectionOrder.map((section) => (
                    <option key={section} value={section}>
                      {section}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field">
                <span>Row Filter</span>
                <select
                  value={rowFilter}
                  onChange={(event) => {
                    setRowFilter(event.target.value)
                    clearMessage()
                  }}
                >
                  <option value="all">All Rows</option>
                  {Object.values(sectionRows)
                    .flat()
                    .map((row) => (
                      <option key={row} value={row}>
                        Row {row}
                      </option>
                    ))}
                </select>
              </label>

              <label className="field">
                <span>Status Filter</span>
                <select
                  value={seatStatusFilter}
                  onChange={(event) => {
                    setSeatStatusFilter(event.target.value)
                    clearMessage()
                  }}
                >
                  <option value="all">All Statuses</option>
                  <option value="available">Available</option>
                  <option value="selected">Selected</option>
                  <option value="held">Held</option>
                  <option value="booked">Booked</option>
                  <option value="blocked">Blocked</option>
                </select>
              </label>

              <label className="field">
                <span>Auto-Pick Seats</span>
                <input
                  type="number"
                  min="1"
                  max="8"
                  value={ticketQty}
                  onChange={(event) => {
                    setTicketQty(event.target.value)
                    clearMessage()
                  }}
                />
              </label>
            </div>

            <div className="seats-actions">
              <button className="ghost-btn" type="button" onClick={autoPickAdjacentSeats}>
                Auto Pick Adjacent
              </button>
              <button className="ghost-btn" type="button" onClick={clearSelected}>
                Clear Selected
              </button>
              <button className="ghost-btn" type="button" onClick={holdSelectedSeats}>
                Hold Selected
              </button>
              <button className="ghost-btn" type="button" onClick={releaseHeldSeats}>
                Release Holds
              </button>
              <button className="primary-btn" type="button" onClick={confirmBooking}>
                Confirm Booking
              </button>
            </div>

            <div className="seats-legend">
              <span className="legend-item">
                <span className="seat-dot available" /> Available
              </span>
              <span className="legend-item">
                <span className="seat-dot selected" /> Selected
              </span>
              <span className="legend-item">
                <span className="seat-dot held" /> Held
              </span>
              <span className="legend-item">
                <span className="seat-dot booked" /> Booked
              </span>
              <span className="legend-item">
                <span className="seat-dot blocked" /> Blocked
              </span>
            </div>
          </section>

          <section className="event-form-card">
            <h2>Venue Seat Map</h2>
            <p className="summary-note" style={{ marginTop: '-6px', marginBottom: '12px' }}>
              Event: {eventName}
            </p>
            <div className="seat-map-grid">
              {visibleSeats.map((seat) => (
                <button
                  key={seat.id}
                  type="button"
                  className={`seat-cell ${seat.status}`}
                  onClick={() => toggleSeatSelection(seat.id)}
                  disabled={seat.status !== 'available' && seat.status !== 'selected'}
                >
                  <strong>{seat.label}</strong>
                  <span>{seat.section}</span>
                </button>
              ))}
            </div>
            {visibleSeats.length === 0 && (
              <p className="summary-note">No seats found for the selected filters.</p>
            )}
          </section>
        </div>

        <aside className="seats-summary">
          <div className="summary-block">
            <p className="summary-label">Occupancy Snapshot</p>
            <div className="price-row">
              <span>Total Seats</span>
              <strong>{occupancy.total}</strong>
            </div>
            <div className="price-row">
              <span>Available</span>
              <strong>{occupancy.available}</strong>
            </div>
            <div className="price-row">
              <span>Selected</span>
              <strong>{occupancy.selected}</strong>
            </div>
            <div className="price-row">
              <span>Held</span>
              <strong>{occupancy.held}</strong>
            </div>
            <div className="price-row">
              <span>Booked</span>
              <strong>{occupancy.booked}</strong>
            </div>
            <div className="price-row">
              <span>Blocked</span>
              <strong>{occupancy.blocked}</strong>
            </div>
          </div>

          <div className="summary-block">
            <p className="summary-label">Current Selection</p>
            {selectedSeats.length > 0 ? (
              <>
                <h3>{selectedSeats.map((seat) => seat.label).join(', ')}</h3>
                <span>Total: ${selectedTotal.toFixed(2)}</span>
              </>
            ) : (
              <span>No seats selected.</span>
            )}
          </div>

          <div className="summary-block">
            <p className="summary-label">Held Seats</p>
            {heldSeats.length > 0 ? (
              <>
                <h3>{heldSeats.map((seat) => seat.label).join(', ')}</h3>
                <span>Hold Value: ${heldTotal.toFixed(2)}</span>
              </>
            ) : (
              <span>No held seats.</span>
            )}
          </div>

          {message && (
            <div className="booking-success" role="status" aria-live="polite">
              {message}
            </div>
          )}
        </aside>
      </main>
    </div>
  )
}

export default SeatsPage
