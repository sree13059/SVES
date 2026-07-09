import { useState } from 'react'
import { Link } from 'react-router-dom'
import logoImg from '../assets/logo.jpg'
import './Footer.css'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
      setEmail('')
      setTimeout(() => setSubmitted(false), 5000)
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Brand & Logo */}
          <div className="footer-col">
            <Link to="/" className="footer-logo">
              <img src={logoImg} alt="SVES Logo" className="footer-logo-img" />
              <div>
                <div className="footer-logo-title">SVES</div>
                <div className="footer-logo-subtitle">Sri Veerabhadra Educational Society</div>
              </div>
            </Link>
            <p className="footer-desc">
              Dedicated to academic excellence, moral integrity, and holistic growth. SVES institutions nurture and empower future-ready citizens to lead and succeed in a dynamic world.
            </p>
            <div className="footer-socials">
              <a href="#" className="footer-social-link" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="footer-social-link" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" className="footer-social-link" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" className="footer-social-link" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/academics">Academics</Link></li>
              <li><Link to="/admissions">Admissions</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="footer-col">
            <h4 className="footer-title">Get in Touch</h4>
            <div className="footer-info">
              <div className="footer-info-item">
                <span className="footer-info-icon">📍</span>
                <span>SVES Campus, Education Street, Near Shiva Temple, India</span>
              </div>
              <div className="footer-info-item">
                <span className="footer-info-icon">📞</span>
                <span>+91 98765 43210<br />+91 80 1234 5678</span>
              </div>
              <div className="footer-info-item">
                <span className="footer-info-icon">✉️</span>
                <span>info@sves.edu.in<br />admissions@sves.edu.in</span>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="footer-col">
            <h4 className="footer-title">Newsletter</h4>
            <p className="footer-newsletter-text">
              Subscribe to stay updated on institution events, admissions timelines, and announcements.
            </p>
            <form onSubmit={handleSubscribe} className="footer-form">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="footer-input"
                required
              />
              <button type="submit" className="footer-btn">Go</button>
            </form>
            {submitted && (
              <p className="footer-newsletter-msg">
                🎉 Thank you for subscribing to SVES updates!
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Sri Veerabhadra Educational Society. All Rights Reserved.</p>
          <p>Designed with Excellence</p>
        </div>
      </div>
    </footer>
  )
}
