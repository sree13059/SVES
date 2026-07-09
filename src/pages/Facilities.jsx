import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { apiUrl } from '../lib/api'
import logoImg from '../assets/logo.jpg'
import busImg from '../assets/bus.png'
import './Facilities.css'

const FACILITIES_DATA = [
{
  id: 'classrooms',
  name: 'Smart Classrooms',
  image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
  desc: 'SVES campus features air-conditioned digital lecture halls equipped with premium overhead smart-boards, audio systems, and high-speed Wi-Fi, fostering an interactive learning workspace.'
},
  {
    id: 'library',
    name: 'Central Library',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800',
    desc: 'Our expansive 3-story central library houses over 50,000 reference volumes, premium research journals, international periodicals, and offers access to digital library databases like IEEE and Springer.'
  },
  {
    id: 'labs',
    name: 'Advanced Laboratories',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&q=80&w=800',
    desc: 'Dedicated branch-specific lab spaces (Engineering Robotics, PG Advanced Server labs, Degree Biology & Chemistry spaces) designed to provide thorough hands-on practical education.'
  },
  {
    id: 'sports',
    name: 'Sports Complex & Courts',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800',
    desc: 'We promote physical fitness via our massive sports field including turf running tracks, professional basketball courts, cricket nets, indoor gymnasium, and badminton halls.'
  },
  {
    id: 'cafeteria',
    name: 'Modern Dining Cafeteria',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800',
    desc: 'The campus canteen hosts multiple food kiosks serving highly hygienic, fresh, and nutritious vegetarian and multi-cuisine dishes for students and staff at subsidized costs.'
  },
  {
    id: 'transportation',
    name: 'College Bus Fleet',
    image: busImg,
    desc: 'SVES operates a wide network of over 30 GPS-enabled yellow buses connecting all residential sectors, suburbs, and railway stations to the campus for safe student transit.'
  },
  {
    id: 'medical',
    name: 'Hospital & Medical Cell',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
    desc: 'A dedicated 6-bed health clinic operates 24/7 on campus, staffed by a resident medical doctor, trained nurses, first aid stations, and an emergency vehicle/ambulance.'
  },
  {
    id: 'anti-ragging',
    name: 'Anti-Ragging Cell & Student Helpdesk',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800',
    desc: 'We maintain a strict zero-tolerance policy towards ragging. The Anti-Ragging Cell consists of professors, local administrators, and student representatives ensuring 24/7 campus safety, counseling support, and emergency helpline monitoring.'
  }
]

export default function Facilities() {
  const { hash } = useLocation()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    facilityType: 'Hostel',
    query: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const element = document.getElementById(id)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }
  }, [hash])

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
    setIsSubmitting(true)
    setFormError('')
    setFormSuccess(false)

    try {
      // Post query to generic contact endpoints as it is an enquiry
      const response = await fetch(apiUrl('/contacts'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: `Facility Enquiry: ${formData.facilityType}`,
          message: `Phone: ${formData.phone} | Query: ${formData.query}`
        })
      })

      if (response.ok) {
        setFormSuccess(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          facilityType: 'Hostel',
          query: ''
        })
      } else {
        const errData = await response.json()
        setFormError(errData.error || 'Failed to submit enquiry.')
      }
    } catch (err) {
      setFormError('Failed to connect to the backend server. Verify your backend is running.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="facilities-page">
      {/* Centered red title */}
      <h1 className="page-title">Campus Facilities</h1>

      {/* Textured Split Banner */}
      <section className="custom-banner">
        <div className="split-grid">
          {/* Left Welcome panel */}
          <div className="banner-welcome">
            <img src={logoImg} alt="SVES logo" className="banner-logo" />
            <h3>SVES Infrastructure Cell</h3>
            <span className="welcome-text-blue">Welcomes You !!!</span>
          </div>

          {/* Right active announcements list */}
          <div className="banner-announcements">
            <a href="#classrooms" className="banner-announcement-item">
              <span className="bell-icon">🔔</span>
              <div className="ann-details">
                <h4>Smart Classrooms & Library</h4>
                <p>Equipped with overhead smart-boards, audio channels, and 50,000+ volumes library.</p>
              </div>
            </a>
            
            <a href="#transportation" className="banner-announcement-item">
              <span className="bell-icon">🔔</span>
              <div className="ann-details">
                <h4>GPS-Enabled Bus Fleet</h4>
                <p>30+ secure yellow school buses connecting suburban corridors to main campuses.</p>
              </div>
            </a>

            <a href="#booking" className="banner-announcement-item">
              <span className="bell-icon">🔔</span>
              <div className="ann-details">
                <h4>Facility Enquiries & Bookings</h4>
                <p>File online requests for hostel placement, transit bus pass, and sports registrations.</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Facilities List Grid */}
      <section className="section-padding">
        <div className="container">
          {FACILITIES_DATA.map((fac, idx) => (
            <div key={fac.id} id={fac.id} className={`facility-block-row ${idx % 2 === 1 ? 'reverse' : ''}`}>
              <div className="facility-img-box animate-scale">
                <img src={fac.image} alt={fac.name} className="facility-img" />
              </div>
              <div className="facility-desc-box">
                <span className="facility-num">0{idx + 1}</span>
                <h2>{fac.name}</h2>
                <p>{fac.desc}</p>
                <a href="#booking" className="btn btn-secondary btn-sm">Enquire & Book</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="booking" className="section-padding bg-cream-section">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title center">Facility Booking & Service Enquiry</h2>
            <p className="form-sub">Request hostel allocations, transit bus bookings, laboratory permissions, or general amenities inquiries online.</p>
          </div>

          <div className="facility-form-wrapper">
            <form onSubmit={handleSubmit} className="premium-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@gmail.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Contact Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="10-digit mobile number"
                    pattern="[0-9]{10}"
                    maxLength="10"
                    minLength="10"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="facilityType">Select Facility Service</label>
                  <select
                    id="facilityType"
                    name="facilityType"
                    value={formData.facilityType}
                    onChange={handleInputChange}
                  >
                    <option value="Hostel Allocation">Hostel Accommodation</option>
                    <option value="Transportation Route">Bus Transit Enrollment</option>
                    <option value="Library Membership">Central Library Access</option>
                    <option value="Lab Project Perm">Research Lab Permissions</option>
                    <option value="Sports Coaching">Sports Complex Registration</option>
                    <option value="Anti-Ragging Support">Anti-Ragging Helpdesk</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="query">Enquiry details / Specifications</label>
                  <textarea
                    id="query"
                    name="query"
                    rows="3"
                    value={formData.query}
                    onChange={handleInputChange}
                    placeholder="Please mention specific bus route details, hostel sharing type, or laboratory schedule queries..."
                    required
                  ></textarea>
                </div>
              </div>

              <div className="form-action">
                <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-wide">
                  {isSubmitting ? 'Sending Request...' : 'Submit Facility Request'}
                </button>
              </div>

              {formSuccess && (
                <div className="form-alert success">
                  ✔ Facility request logged successfully in society database! Respective caretakers will reach out shortly.
                </div>
              )}

              {formError && (
                <div className="form-alert error">
                  ✖ {formError}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
