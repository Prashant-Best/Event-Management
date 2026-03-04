import Sidebar from '../components/Sidebar'

function CreateEventPage({ onBack, onOpenBookings }) {
  return (
    <div className="dashboard-shell">
      <Sidebar
        active="create-event"
        onOpenDashboard={onBack}
        onOpenCreateEvent={() => {}}
        onOpenBookings={onOpenBookings}
      />

      <main className="main-panel">
        <header className="topbar">
          <div>
            <h1>Create New Event</h1>
            <p>Set schedule, venue, tickets, and publication settings</p>
          </div>
          <button className="ghost-btn" type="button" onClick={onBack}>
            Back to Dashboard
          </button>
        </header>

        <form className="event-form" noValidate>
          <section className="event-form-card">
            <h2>Event Details</h2>
            <div className="event-form-grid two-col">
              <label className="field">
                <span>Event Name</span>
                <input type="text" placeholder="Global Tech Summit 2026" />
              </label>
              <label className="field">
                <span>Category</span>
                <select defaultValue="">
                  <option value="" disabled>
                    Select category
                  </option>
                  <option>Conference</option>
                  <option>Music Concert</option>
                  <option>Workshop</option>
                  <option>Sports</option>
                  <option>Webinar</option>
                </select>
              </label>
              <label className="field event-span-full">
                <span>Description</span>
                <textarea
                  rows="4"
                  placeholder="Describe the event agenda, highlights, and audience."
                />
              </label>
              <label className="field">
                <span>Organizer Name</span>
                <input type="text" placeholder="EventOps Pvt Ltd" />
              </label>
              <label className="field">
                <span>Support Email</span>
                <input type="email" placeholder="support@eventops.com" />
              </label>
            </div>
          </section>

          <section className="event-form-card">
            <h2>Schedule and Venue</h2>
            <div className="event-form-grid two-col">
              <label className="field">
                <span>Start Date</span>
                <input type="date" />
              </label>
              <label className="field">
                <span>End Date</span>
                <input type="date" />
              </label>
              <label className="field">
                <span>Start Time</span>
                <input type="time" />
              </label>
              <label className="field">
                <span>End Time</span>
                <input type="time" />
              </label>
              <label className="field">
                <span>Timezone</span>
                <select defaultValue="Asia/Kolkata">
                  <option>Asia/Kolkata</option>
                  <option>UTC</option>
                  <option>America/New_York</option>
                  <option>Europe/London</option>
                </select>
              </label>
              <label className="field">
                <span>Venue Type</span>
                <select defaultValue="">
                  <option value="" disabled>
                    Select venue type
                  </option>
                  <option>On-site</option>
                  <option>Online</option>
                  <option>Hybrid</option>
                </select>
              </label>
              <label className="field event-span-full">
                <span>Venue Address / Meeting Link</span>
                <input type="text" placeholder="Venue address or online meeting URL" />
              </label>
            </div>
          </section>

          <section className="event-form-card">
            <h2>Tickets and Capacity</h2>
            <div className="event-form-grid three-col">
              <label className="field">
                <span>Total Capacity</span>
                <input type="number" min="1" placeholder="500" />
              </label>
              <label className="field">
                <span>Ticket Sale Start</span>
                <input type="datetime-local" />
              </label>
              <label className="field">
                <span>Ticket Sale End</span>
                <input type="datetime-local" />
              </label>
              <label className="field">
                <span>Base Ticket Price ($)</span>
                <input type="number" min="0" step="0.01" placeholder="49.99" />
              </label>
              <label className="field">
                <span>VIP Price ($)</span>
                <input type="number" min="0" step="0.01" placeholder="129.99" />
              </label>
              <label className="field">
                <span>Discount Code</span>
                <input type="text" placeholder="EARLYBIRD20" />
              </label>
            </div>
          </section>

          <section className="event-form-card">
            <h2>Media and Publishing</h2>
            <div className="event-form-grid two-col">
              <label className="field">
                <span>Poster/Banner URL</span>
                <input type="url" placeholder="https://..." />
              </label>
              <label className="field">
                <span>Event Tags</span>
                <input type="text" placeholder="technology, startup, keynote" />
              </label>
              <label className="field">
                <span>Registration Deadline</span>
                <input type="date" />
              </label>
              <label className="field">
                <span>Status</span>
                <select defaultValue="draft">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="private">Private</option>
                </select>
              </label>
            </div>

            <div className="event-form-checks">
              <label className="check-field">
                <input type="checkbox" />
                <span>Enable online booking</span>
              </label>
              <label className="check-field">
                <input type="checkbox" />
                <span>Generate QR tickets automatically</span>
              </label>
              <label className="check-field">
                <input type="checkbox" />
                <span>Send attendee notifications</span>
              </label>
              <label className="check-field">
                <input type="checkbox" />
                <span>Feature this event on homepage</span>
              </label>
            </div>
          </section>

          <div className="event-form-actions">
            <button className="ghost-btn" type="button">
              Save as Draft
            </button>
            <button className="primary-btn" type="submit">
              Publish Event
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default CreateEventPage
