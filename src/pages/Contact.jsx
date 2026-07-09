import { useState } from 'react'
import { apiUrl } from '../lib/api'
import './Contact.css'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '')
      if (numericValue.length <= 10) {
        setFormData((prev) => ({ ...prev, [name]: numericValue }))
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(apiUrl('/contacts'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        console.log('Contact Message Submitted:', formData)
        setSubmitted(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        })
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        const errorData = await response.json()
        alert('Failed to submit message: ' + errorData.error)
      }
    } catch (err) {
      console.error('Submission error:', err)
      alert('Could not submit message. Please verify that the backend is running.')
    }
  }

  return (
    <main>
      {/* Page Header Banner */}
      <section className="contact-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Get in touch with our administrative staff, schedule a campus visit, or send us a query.</p>
        </div>
      </section>

      {/* Info Cards and Contact Form */}
      <section className="section-padding">
        <div className="container">
          <div className="contact-grid">
            {/* Info Cards Column */}
            <div className="contact-info-col">
              <div className="contact-info-card">
                <span className="contact-card-icon">📍</span>
                <div className="contact-card-details">
                  <h3>Campus Address</h3>
                  <p>SVES Campus, Education Street, Near Shiva Temple, Bangalore, Karnataka - 560001, India</p>
                </div>
              </div>

              <div className="contact-info-card">
                <span className="contact-card-icon">📞</span>
                <div className="contact-card-details">
                  <h3>Contact Numbers</h3>
                  <p>
                    <strong>Primary Reception:</strong> +91 98765 43210<br />
                    <strong>Admissions Office:</strong> +91 80 1234 5678
                  </p>
                </div>
              </div>

              <div className="contact-info-card">
                <span className="contact-card-icon">✉️</span>
                <div className="contact-card-details">
                  <h3>Email Addresses</h3>
                  <p>
                    <strong>General Queries:</strong> info@sves.edu.in<br />
                    <strong>Admissions Desk:</strong> admissions@sves.edu.in
                  </p>
                </div>
              </div>

              <div className="contact-info-card">
                <span className="contact-card-icon">⏰</span>
                <div className="contact-card-details">
                  <h3>Visiting Hours</h3>
                  <p>
                    <strong>Monday – Friday:</strong> 8:30 AM – 4:00 PM<br />
                    <strong>Saturday:</strong> 8:30 AM – 12:30 PM (Sunday Closed)
                  </p>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="contact-form-panel">
              <h2 className="section-title">Send a Message</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="you@domain.com"
                    required
                  />
                </div>

                 <div className="form-group">
                   <label className="form-label" htmlFor="phone">Phone Number</label>
                   <input
                     type="tel"
                     id="phone"
                     name="phone"
                     value={formData.phone}
                     onChange={handleInputChange}
                     className="form-input"
                     placeholder="10-digit mobile number"
                     pattern="[0-9]{10}"
                     maxLength="10"
                     minLength="10"
                     required
                   />
                 </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Admission enquiry, feedback, job application, etc."
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">Message Details</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-textarea"
                    rows="5"
                    placeholder="Write your message here..."
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Send Message
                </button>

                {submitted && (
                  <div className="form-msg form-msg-success">
                    🎉 Message sent successfully! We will write back to you shortly.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Styled Campus Map Section */}
      <section className="section-padding map-section" style={{ backgroundColor: 'var(--bg-cream)' }}>
        <div className="container">
          <div className="text-center">
            <h2 className="section-title center">Find Us on Campus</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto 3rem auto' }}>
              We are located in a peaceful, lush-green, student-friendly suburb. Review our proximity map below.
            </p>
          </div>

          <div className="vector-map-container">
            {/* Custom Interactive Vector Map */}
            <div className="map-grid-bg"></div>
            
            {/* Roads */}
            <div className="map-road road-h1"></div>
            <div className="map-road road-v1"></div>
            <div className="map-road road-v2"></div>
            
            {/* Regional Landmarks */}
            <div className="map-landmark landmark-temple">
              Shiva Temple Complex
            </div>
            
            <div className="map-landmark landmark-hospital">
              City Suburb Health Clinic
            </div>
            
            {/* School Campus Block */}
            <div className="map-campus-block">
              <span className="map-campus-title">SVES INSTITUTION</span>
              <span className="map-campus-subtitle">Sri Veerabhadra Educational Society</span>
              <span className="map-pin-glowing"></span>
            </div>

            {/* Map label floating card */}
            <div className="map-label-card">
              <h4>SVES Educational Academy</h4>
              <p>📍 Suburb Road, Block 4</p>
              <p>📞 +91 98765 43210</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
