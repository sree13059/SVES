import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logoImg from '../assets/logo.jpg'
import './Header.css'

const DEPARTMENTS_PREVIEW = {
  engineering: {
    name: 'SVES Engineering College',
    code: 'SVES-EC',
    estd: '2008',
    principal: 'Dr. S. Veerabhadra Jr.',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&q=80&w=400',
    description: 'B.Tech programs in CSE, ECE, EEE, MECH, CIVIL.'
  },
  postgraduate: {
    name: 'SVES Postgraduate College',
    code: 'SVES-PG',
    estd: '2018',
    principal: 'Mrs. V. Saraswathi',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400',
    description: 'MCA, MBA, and specialized M.Tech courses.'
  },
  degree: {
    name: 'SVES Degree College',
    code: 'SVES-DC',
    estd: '2015',
    principal: 'Dr. M. S. Prasad',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=400',
    description: 'B.Sc, B.Com, BBA, and B.A divisions.'
  },
  intermediate: {
    name: 'SVES Intermediate College',
    code: 'SVES-IC',
    estd: '2012',
    principal: 'Dr. A. Raghavendra',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=400',
    description: 'Pre-university coaching (MPC, BiPC, CEC, HEC).'
  }
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredDept, setHoveredDept] = useState('engineering')
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null)
  const location = useLocation()

  // Close menus when route changes
  useEffect(() => {
    setIsOpen(false)
    setActiveMobileDropdown(null)
  }, [location])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    setActiveMobileDropdown(null)
  }

  const toggleMobileDropdown = (name, e) => {
    e.preventDefault()
    setActiveMobileDropdown(activeMobileDropdown === name ? null : name)
  }

  const preview = DEPARTMENTS_PREVIEW[hoveredDept]

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo-link">
          <img src={logoImg} alt="Sri Veerabhadra Educational Society Logo" className="logo-img" style={{ marginRight: "50px" }} />

        </Link>

        {/* Hamburger Menu Button */}
        <button
          className={`hamburger ${isOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Links */}
        <nav>
          <ul className={`nav-menu ${isOpen ? 'open' : ''}`}>
            <li className="nav-item">
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
                Home
              </NavLink>
            </li>

            {/* DEPARTMENTS DROPDOWN */}
            <li className="nav-item has-dropdown mega-item">
              <NavLink to="/departments" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Departments
              </NavLink>

              {/* Desktop Mega Menu */}
              <div className="mega-dropdown">
                <div className="mega-dropdown-grid">
                  <div className="mega-links-column">
                    <h4 className="dropdown-section-title">Our SVES Colleges</h4>
                    <ul>
                      <li onMouseEnter={() => setHoveredDept('engineering')}>
                        <Link to="/departments#engineering" className="mega-link-item">
                          <span>SVES Engineering College</span>
                          <span className="mega-link-sub">B.Tech Programs (CSE, ECE, EEE...)</span>
                        </Link>
                      </li>
                      <li onMouseEnter={() => setHoveredDept('postgraduate')}>
                        <Link to="/departments#postgraduate" className="mega-link-item">
                          <span>SVES Postgraduate College</span>
                          <span className="mega-link-sub">MCA, MBA & M.Tech Programs</span>
                        </Link>
                      </li>
                      <li onMouseEnter={() => setHoveredDept('degree')}>
                        <Link to="/departments#degree" className="mega-link-item">
                          <span>SVES Degree College</span>
                          <span className="mega-link-sub">Science, Commerce & Arts</span>
                        </Link>
                      </li>
                      <li onMouseEnter={() => setHoveredDept('intermediate')}>
                        <Link to="/departments#intermediate" className="mega-link-item">
                          <span>SVES Intermediate College</span>
                          <span className="mega-link-sub">MPC, BiPC, CEC Coaching</span>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="mega-preview-column">
                    <div className="preview-card" style={{ backgroundImage: `linear-gradient(rgba(3, 39, 69, 0.4), rgba(3, 39, 69, 0.85)), url(${preview.image})` }}>
                      <div className="preview-badge">{preview.code}</div>
                      <div className="preview-content">
                        <h4>{preview.name}</h4>
                        <p>{preview.description}</p>
                        <div className="preview-info">
                          <span><strong>Estd:</strong> {preview.estd}</span>
                          <span><strong>Principal:</strong> {preview.principal}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Submenu Toggle */}
              <button className="mobile-toggle-btn" onClick={(e) => toggleMobileDropdown('departments', e)} aria-label="Toggle Departments Submenu">
                {activeMobileDropdown === 'departments' ? '▲' : '▼'}
              </button>

              {/* Mobile Submenu Items */}
              <ul className={`mobile-submenu ${activeMobileDropdown === 'departments' ? 'open' : ''}`}>
                <li><Link to="/departments#engineering">SVES Engineering College</Link></li>
                <li><Link to="/departments#postgraduate">SVES Postgraduate College</Link></li>
                <li><Link to="/departments#degree">SVES Degree College</Link></li>
                <li><Link to="/departments#intermediate">SVES Intermediate College</Link></li>
              </ul>
            </li>

            {/* ADMISSIONS DROPDOWN */}
            <li className="nav-item has-dropdown">
              <NavLink to="/admissions" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Admissions
              </NavLink>

              <ul className="dropdown-menu">
                <li><Link to="/admissions">Admissions Info</Link></li>
                <li><Link to="/admissions#fee-estimator">Term Fee</Link></li>
                <li><Link to="/admissions#enquiry-form">Online Enquiry Form</Link></li>
              </ul>

              <button className="mobile-toggle-btn" onClick={(e) => toggleMobileDropdown('admissions', e)} aria-label="Toggle Admissions Submenu">
                {activeMobileDropdown === 'admissions' ? '▲' : '▼'}
              </button>

              <ul className={`mobile-submenu ${activeMobileDropdown === 'admissions' ? 'open' : ''}`}>
                <li><Link to="/admissions">Admissions Info</Link></li>
                <li><Link to="/admissions#fee-estimator">Term Fee</Link></li>
                <li><Link to="/admissions#enquiry-form">Online Enquiry Form</Link></li>
              </ul>
            </li>

            {/* EXAMINATION CELL DROPDOWN */}
            <li className="nav-item has-dropdown">
              <NavLink to="/examination-cell" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Examination Cell
              </NavLink>

              <ul className="dropdown-menu">
                <li><Link to="/examination-cell#about">About Exam Cell</Link></li>
                <li><Link to="/examination-cell#notifications">Notifications</Link></li>
                <li><Link to="/examination-cell#timetable">Time Table</Link></li>
                <li><Link to="/examination-cell#circulars">Circulars</Link></li>
                <li><Link to="/examination-cell#results">Results</Link></li>
                <li><Link to="/examination-cell#downloads">Downloads</Link></li>
              </ul>

              <button className="mobile-toggle-btn" onClick={(e) => toggleMobileDropdown('examinations', e)} aria-label="Toggle Examinations Submenu">
                {activeMobileDropdown === 'examinations' ? '▲' : '▼'}
              </button>

              <ul className={`mobile-submenu ${activeMobileDropdown === 'examinations' ? 'open' : ''}`}>
                <li><Link to="/examination-cell#about">About Exam Cell</Link></li>
                <li><Link to="/examination-cell#notifications">Notifications</Link></li>
                <li><Link to="/examination-cell#timetable">Time Table</Link></li>
                <li><Link to="/examination-cell#circulars">Circulars</Link></li>
                <li><Link to="/examination-cell#results">Results</Link></li>
                <li><Link to="/examination-cell#downloads">Downloads</Link></li>
              </ul>
            </li>

            {/* PLACEMENTS DROPDOWN */}
            <li className="nav-item has-dropdown">
              <NavLink to="/placements" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Placements
              </NavLink>

              <ul className="dropdown-menu">
                <li><Link to="/placements#home">PAT Home</Link></li>
                <li><Link to="/placements#tpo-message">Message From TPO</Link></li>
                <li><Link to="/placements#recruiters">Visited Companies</Link></li>
                <li><Link to="/placements#dept-records">Department Wise Placement Record</Link></li>
                <li><Link to="/placements#records">Placement Record</Link></li>
                <li><Link to="/placements#registration">Contact Us</Link></li>
              </ul>

              <button className="mobile-toggle-btn" onClick={(e) => toggleMobileDropdown('placements', e)} aria-label="Toggle Placements Submenu">
                {activeMobileDropdown === 'placements' ? '▲' : '▼'}
              </button>

              <ul className={`mobile-submenu ${activeMobileDropdown === 'placements' ? 'open' : ''}`}>
                <li><Link to="/placements#home">PAT Home</Link></li>
                <li><Link to="/placements#tpo-message">Message From TPO</Link></li>
                <li><Link to="/placements#recruiters">Visited Companies</Link></li>
                <li><Link to="/placements#dept-records">Department Wise Placement Record</Link></li>
                <li><Link to="/placements#records">Placement Record</Link></li>
                <li><Link to="/placements#registration">Contact Us</Link></li>
              </ul>
            </li>

            {/* FACILITIES DROPDOWN */}
            <li className="nav-item has-dropdown">
              <NavLink to="/facilities" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Facilities
              </NavLink>

              <ul className="dropdown-menu">
                <li><Link to="/facilities#classrooms">Classrooms</Link></li>
                <li><Link to="/facilities#library">Library</Link></li>
                <li><Link to="/facilities#labs">Laboratories</Link></li>
                <li><Link to="/facilities#sports">Sports Complex</Link></li>
                <li><Link to="/facilities#cafeteria">Cafeteria</Link></li>
                <li><Link to="/facilities#transportation">Transportation</Link></li>
                <li><Link to="/facilities#medical">Medical & Hospital</Link></li>
              </ul>

              <button className="mobile-toggle-btn" onClick={(e) => toggleMobileDropdown('facilities', e)} aria-label="Toggle Facilities Submenu">
                {activeMobileDropdown === 'facilities' ? '▲' : '▼'}
              </button>

              <ul className={`mobile-submenu ${activeMobileDropdown === 'facilities' ? 'open' : ''}`}>
                <li><Link to="/facilities#classrooms">Classrooms</Link></li>
                <li><Link to="/facilities#library">Library</Link></li>
                <li><Link to="/facilities#labs">Laboratories</Link></li>
                <li><Link to="/facilities#sports">Sports Complex</Link></li>
                <li><Link to="/facilities#cafeteria">Cafeteria</Link></li>
                <li><Link to="/facilities#transportation">Transportation</Link></li>
                <li><Link to="/facilities#medical">Medical & Hospital</Link></li>
              </ul>
            </li>

            {/* FACULTY DROPDOWN */}
            <li className="nav-item has-dropdown">
              <NavLink to="/faculties" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Faculties
              </NavLink>

              <ul className="dropdown-menu">
                <li><Link to="/faculties#directory">Faculty Directory</Link></li>
                {/* <li><Link to="/faculties#join-us">Join Our Team</Link></li> */}
              </ul>

              {/* <button className="mobile-toggle-btn" onClick={(e) => toggleMobileDropdown('faculties', e)} aria-label="Toggle Faculties Submenu">
                {activeMobileDropdown === 'faculties' ? '▲' : '▼'}
              </button> */}

              <ul className={`mobile-submenu ${activeMobileDropdown === 'faculties' ? 'open' : ''}`}>
                {/* <li><Link to="/faculties#directory">Faculty Directory</Link></li> */}
                {/* <li><Link to="/faculties#join-us">Join Our Team</Link></li> */}
              </ul>
            </li>

            {/* GALLERY DROPDOWN */}
            <li className="nav-item has-dropdown">
              <NavLink to="/gallery" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Gallery
              </NavLink>

              <ul className="dropdown-menu">
                <li><Link to="/gallery#college">College Gallery</Link></li>
                <li><Link to="/gallery#labs">Lab Gallery</Link></li>
                <li><Link to="/gallery#sports">Sports Gallery</Link></li>
                <li><Link to="/gallery#cultural">Cultural Gallery</Link></li>
              </ul>

              <button className="mobile-toggle-btn" onClick={(e) => toggleMobileDropdown('gallery', e)} aria-label="Toggle Gallery Submenu">
                {activeMobileDropdown === 'gallery' ? '▲' : '▼'}
              </button>

              <ul className={`mobile-submenu ${activeMobileDropdown === 'gallery' ? 'open' : ''}`}>
                <li><Link to="/gallery#college">College Gallery</Link></li>
                <li><Link to="/gallery#labs">Lab Gallery</Link></li>
                <li><Link to="/gallery#sports">Sports Gallery</Link></li>
                <li><Link to="/gallery#cultural">Cultural Gallery</Link></li>
              </ul>
            </li>

            <li className="nav-item">
              <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Contact
              </NavLink>
            </li>

            {/* <li className="nav-item header-cta">
              <Link to="/admissions" className="btn btn-accent">
                Apply Now
              </Link>
            </li> */}
          </ul>
        </nav>
      </div>
    </header>
  )
}
