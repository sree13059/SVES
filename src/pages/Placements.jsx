import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { apiUrl } from '../lib/api'
import logoImg from '../assets/logo.jpg'
import './Placements.css'

const KEY_RECRUITERS = [
  { name: 'TCS (Tata Consultancy Services)', logo: '💻', package: '₹3.8 - ₹7.5 LPA' },
  { name: 'Wipro Technologies', logo: '🌐', package: '₹4.0 - ₹6.5 LPA' },
  { name: 'Infosys Limited', logo: '⚙️', package: '₹3.6 - ₹8.0 LPA' },
  { name: 'Cognizant', logo: '📊', package: '₹4.0 - ₹7.0 LPA' },
  { name: 'Tech Mahindra', logo: '📱', package: '₹3.5 - ₹6.0 LPA' },
  { name: 'Accenture', logo: '🛡️', package: '₹4.5 - ₹9.5 LPA' },
  { name: 'IBM India', logo: '💾', package: '₹4.8 - ₹11.0 LPA' },
  { name: 'HCL Technologies', logo: '☁️', package: '₹3.8 - ₹6.8 LPA' }
]

const STATS_DATA = [
  { value: '94.6%', label: 'Placement Success Rate' },
  { value: '₹18.5 LPA', label: 'Highest Package Offered' },
  { value: '₹5.2 LPA', label: 'Average Package' },
  { value: '140+', label: 'Recruiters Visited' }
]

const COLLEGE_GROUPS = {
  engineering: ['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL'],
  postgraduate: ['MCA', 'MBA', 'M.Sc', 'M.Tech'],
  degree: ['B.Sc', 'B.Com', 'BBA', 'B.A']
}

const DEPT_PLACEMENTS = {
  engineering: [
    { dept: 'Computer Science & Eng (CSE)', registered: 120, placed: 118, rate: '98.3%', highest: '18.5 LPA', avg: '6.4 LPA' },
    { dept: 'Electronics & Comm Eng (ECE)', registered: 90, placed: 86, rate: '95.5%', highest: '12.0 LPA', avg: '5.2 LPA' },
    { dept: 'Electrical & Electronics (EEE)', registered: 55, placed: 49, rate: '89.0%', highest: '8.5 LPA', avg: '4.8 LPA' },
    { dept: 'Mechanical Engineering (MECH)', registered: 60, placed: 48, rate: '80.0%', highest: '7.0 LPA', avg: '4.2 LPA' },
    { dept: 'Civil Engineering (CIVIL)', registered: 50, placed: 38, rate: '76.0%', highest: '6.5 LPA', avg: '4.0 LPA' }
  ],
  postgraduate: [
    { dept: 'Master of Comp Applications (MCA)', registered: 60, placed: 58, rate: '96.6%', highest: '10.0 LPA', avg: '5.5 LPA' },
    { dept: 'Master of Business Admin (MBA)', registered: 80, placed: 74, rate: '92.5%', highest: '9.0 LPA', avg: '5.0 LPA' },
    { dept: 'Master of Science (M.Sc)', registered: 40, placed: 32, rate: '80.0%', highest: '6.0 LPA', avg: '4.2 LPA' },
    { dept: 'Master of Technology (M.Tech)', registered: 30, placed: 26, rate: '86.7%', highest: '8.0 LPA', avg: '4.8 LPA' }
  ],
  degree: [
    { dept: 'Bachelor of Science (B.Sc)', registered: 100, placed: 78, rate: '78.0%', highest: '5.5 LPA', avg: '3.8 LPA' },
    { dept: 'Bachelor of Commerce (B.Com)', registered: 120, placed: 96, rate: '80.0%', highest: '6.0 LPA', avg: '4.0 LPA' },
    { dept: 'Bachelor of Business Admin (BBA)', registered: 80, placed: 68, rate: '85.0%', highest: '7.0 LPA', avg: '4.5 LPA' },
    { dept: 'Bachelor of Arts (B.A)', registered: 50, placed: 30, rate: '60.0%', highest: '4.5 LPA', avg: '3.2 LPA' }
  ]
}

const GENERAL_RECORDS = [
  { year: '2025-2026 (Current)', companies: 142, studentsPlaced: 385, successRate: '94.6%', highestPack: '18.5 LPA' },
  { year: '2024-2025', companies: 128, studentsPlaced: 342, successRate: '92.1%', highestPack: '15.0 LPA' },
  { year: '2023-2024', companies: 115, studentsPlaced: 310, successRate: '90.5%', highestPack: '12.5 LPA' }
]

export default function Placements() {
  const { hash } = useLocation()
  const [activeRecordTab, setActiveRecordTab] = useState('engineering')
  const [dbPlacements, setDbPlacements] = useState([])

  useEffect(() => {
    const fetchPlacements = async () => {
      try {
        const response = await fetch(apiUrl('/placements'))
        if (response.ok) {
          const data = await response.json()
          setDbPlacements(data)
        }
      } catch (err) {
        console.error('Error fetching placements for stats calculation:', err)
      }
    }
    fetchPlacements()
  }, [])

  // Calculate dynamic DEPT_PLACEMENTS by merging static base data with database records
  const computedDeptPlacements = {}
  Object.keys(DEPT_PLACEMENTS).forEach((category) => {
    computedDeptPlacements[category] = DEPT_PLACEMENTS[category].map((base) => {
      const match = base.dept.match(/\(([^)]+)\)/)
      const groupCode = match ? match[1] : ''

      const related = dbPlacements.filter(
        (p) =>
          p.college === category &&
          p.group?.toUpperCase() === groupCode.toUpperCase()
      )

      const dbRegisteredCount = related.length
      const placedStudents = related.filter((p) => p.status === 'Placed')
      const dbPlacedCount = placedStudents.length
      const dbPackages = placedStudents.map((p) => p.package).filter((p) => p > 0)

      const registered = base.registered + dbRegisteredCount
      const placed = base.placed + dbPlacedCount
      const rate = registered > 0 ? ((placed / registered) * 100).toFixed(1) + '%' : '0.0%'

      const baseHighest = parseFloat(base.highest) || 0
      const maxDbPackage = dbPackages.length > 0 ? Math.max(...dbPackages) : 0
      const highestValue = Math.max(baseHighest, maxDbPackage)
      const highest = highestValue > 0 ? `${highestValue.toFixed(1)} LPA` : '0.0 LPA'

      const baseAvg = parseFloat(base.avg) || 0
      const baseTotalSum = base.placed * baseAvg
      const dbTotalSum = dbPackages.reduce((sum, val) => sum + val, 0)
      const avgValue = placed > 0 ? (baseTotalSum + dbTotalSum) / placed : 0
      const avg = avgValue > 0 ? `${avgValue.toFixed(1)} LPA` : '0.0 LPA'

      return {
        dept: base.dept,
        registered,
        placed,
        rate,
        highest,
        avg
      }
    })
  })

  // Calculate dynamic STATS_DATA
  let totalRegistered = 0
  let totalPlaced = 0
  let overallMaxPackage = 0
  let overallTotalSum = 0

  Object.keys(computedDeptPlacements).forEach((category) => {
    computedDeptPlacements[category].forEach((dept) => {
      totalRegistered += dept.registered
      totalPlaced += dept.placed

      const hVal = parseFloat(dept.highest) || 0
      if (hVal > overallMaxPackage) {
        overallMaxPackage = hVal
      }

      const aVal = parseFloat(dept.avg) || 0
      overallTotalSum += dept.placed * aVal
    })
  })

  const overallSuccessRate = totalRegistered > 0 ? ((totalPlaced / totalRegistered) * 100).toFixed(1) + '%' : '0.0%'
  const overallAvgPackage = totalPlaced > 0 ? (overallTotalSum / totalPlaced).toFixed(1) + ' LPA' : '0.0 LPA'

  const computedStatsData = [
    { value: overallSuccessRate, label: 'Placement Success Rate' },
    { value: `₹${overallMaxPackage.toFixed(1)} LPA`, label: 'Highest Package Offered' },
    { value: `₹${overallAvgPackage}`, label: 'Average Package' },
    { value: '140+', label: 'Recruiters Visited' }
  ]

  const activePlacedStudents = dbPlacements.filter(
    (p) => p.status === 'Placed' && p.college === activeRecordTab
  )

  const [formData, setFormData] = useState({
    studentName: '',
    rollNo: '',
    college: 'engineering',
    group: 'CSE',
    cgpa: '',
    backlogs: '0',
    resumeLink: '',
    email: '',
    phone: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formError, setFormError] = useState('')
  const [fileInputKey, setFileInputKey] = useState(Date.now())

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      alert('File size exceeds 2MB limit. Please upload a smaller file.')
      e.target.value = ''
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, resumeLink: reader.result }))
    }
    reader.readAsDataURL(file)
  }

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
    } else if (name === 'college') {
      const defaultGroup = COLLEGE_GROUPS[value]?.[0] || ''
      setFormData((prev) => ({ 
        ...prev, 
        college: value, 
        group: defaultGroup 
      }))
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
      const response = await fetch(apiUrl('/placements'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setFormSuccess(true)
        setFormData({
          studentName: '',
          rollNo: '',
          college: 'engineering',
          group: 'CSE',
          cgpa: '',
          backlogs: '0',
          resumeLink: '',
          email: '',
          phone: ''
        })
        setFileInputKey(Date.now())
      } else {
        const errData = await response.json()
        setFormError(errData.error || 'Failed to submit registration. Please verify details.')
      }
    } catch (err) {
      setFormError('Failed to connect to the backend server. Verify your backend is running.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main id="home" className="placements-page">
      {/* Centered red title */}
      <h1 className="page-title">Training & Placements Cell</h1>

      {/* Textured Split Banner */}
      <section className="custom-banner">
        <div className="split-grid">
          {/* Left Welcome panel */}
          <div className="banner-welcome">
            <img src={logoImg} alt="SVES logo" className="banner-logo" />
            <h3>SVES Placement Wing</h3>
            <span className="welcome-text-blue">Welcomes You !!!</span>
          </div>

          {/* Right active announcements list */}
          <div className="banner-announcements">
            <a href="#tpo-message" className="banner-announcement-item">
              <span className="bell-icon">🔔</span>
              <div className="ann-details">
                <h4>Message From TPO</h4>
                <p>Read the guidance address by Mr. K. Raghavan, Head of Corporate Relations.</p>
              </div>
            </a>
            
            <a href="#dept-records" className="banner-announcement-item">
              <span className="bell-icon">🔔</span>
              <div className="ann-details">
                <h4>Department Wise Placement Record</h4>
                <p>Check selection ratios, average packages, and highest offers across CSE, ECE, EEE, and PG courses.</p>
              </div>
            </a>

            <a href="#registration" className="banner-announcement-item">
              <span className="bell-icon">🔔</span>
              <div className="ann-details">
                <h4>Student Placement Enrollment Form</h4>
                <p>Register your profile bio, aggregate CGPA, and resume documents in TPO databases.</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Stats Board */}
      <section className="stats-board-section">
        <div className="container">
          <div className="stats-board-grid">
            {computedStatsData.map((stat, idx) => (
              <div key={idx} className="stat-board-card">
                <div className="stat-board-value">{stat.value}</div>
                <div className="stat-board-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Message from TPO */}
      <section id="tpo-message" className="section-padding">
        <div className="container">
          <div className="tpo-message-box">
            <div className="tpo-avatar-block">
              <img 
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300" 
                alt="SVES TPO Officer" 
                className="tpo-avatar"
              />
              <div className="tpo-meta">
                <strong>Mr. K. Raghavan</strong>
                <span>Head of Placement & Corporate Relations</span>
              </div>
            </div>
            <div className="tpo-text-block">
              <span className="section-badge">Leadership Voice</span>
              <h2>Message from the TPO</h2>
              <p className="tpo-quote">
                "Our primary goal is to empower student careers by bridging academic excellence and industry demands. Through regular bootcamp training, coding hackathons, soft skill grooming, and resume reviews, we make sure that our graduates stand out in front of global selectors. We welcome corporate partners to experience the dedicated talent pool at Sri Veerabhadra Educational Society."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visited Companies */}
      <section id="recruiters" className="section-padding bg-light-cream">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title center">Our Visited Companies</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto 3rem auto', color: 'var(--text-muted)' }}>
              SVES hosting recruitment drives with premier technology, commerce, and advisory agencies.
            </p>
          </div>

          <div className="recruiters-grid">
            {KEY_RECRUITERS.map((rec, idx) => (
              <div key={idx} className="recruiter-card animate-hover">
                <span className="recruiter-logo">{rec.logo}</span>
                <h4>{rec.name}</h4>
                <span className="rec-package">Est. Range: {rec.package}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Department Wise Placement Record */}
      <section id="dept-records" className="section-padding">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title center">Department-Wise Placement Record</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto 2rem auto', color: 'var(--text-muted)' }}>
              Detailed overview of selection metrics, registered counts, placed counts, and packages across active colleges.
            </p>
          </div>

          {/* College-wise tabs */}
          <div className="records-tabs">
            <button 
              className={`record-tab-btn ${activeRecordTab === 'engineering' ? 'active' : ''}`}
              onClick={() => setActiveRecordTab('engineering')}
            >
              Engineering College
            </button>
            <button 
              className={`record-tab-btn ${activeRecordTab === 'postgraduate' ? 'active' : ''}`}
              onClick={() => setActiveRecordTab('postgraduate')}
            >
              Postgraduate College
            </button>
            <button 
              className={`record-tab-btn ${activeRecordTab === 'degree' ? 'active' : ''}`}
              onClick={() => setActiveRecordTab('degree')}
            >
              Degree College
            </button>
          </div>

          <div className="dept-records-wrapper">
            <table className="dept-records-table">
              <thead>
                <tr>
                  <th>Department / Stream</th>
                  <th>Registered Students</th>
                  <th>Placed Students</th>
                  <th>Success Rate</th>
                  <th>Highest Package</th>
                  <th>Average Package</th>
                </tr>
              </thead>
              <tbody>
                {computedDeptPlacements[activeRecordTab].map((row, idx) => (
                  <tr key={idx}>
                    <td><strong>{row.dept}</strong></td>
                    <td>{row.registered}</td>
                    <td>{row.placed}</td>
                    <td style={{ color: '#2ecc71', fontWeight: 'bold' }}>{row.rate}</td>
                    <td><strong>{row.highest}</strong></td>
                    <td>{row.avg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recent Placed Students Spotlight */}
          <div style={{ marginTop: '3.5rem' }}>
            <div className="text-center">
              <h3 style={{ fontSize: '1.6rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                Our Placed Students Spotlight
              </h3>
              <p style={{ maxWidth: '600px', margin: '0 auto 2rem auto', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                SVES students successfully hired by leading enterprises.
              </p>
            </div>

            <div className="placed-students-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.5rem',
              maxWidth: '1000px',
              margin: '0 auto'
            }}>
              {activePlacedStudents.length > 0 ? (
                activePlacedStudents.map((student) => (
                  <div key={student._id} className="placed-student-card" style={{
                    backgroundColor: 'var(--bg-white)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.5rem',
                    boxShadow: 'var(--shadow-md)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}>
                    {/* Subtle accent border at top */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      backgroundColor: 'var(--accent)'
                    }}></div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <h4 style={{ margin: 0, color: 'var(--primary)', fontSize: '1.1rem', fontWeight: '600' }}>
                          {student.studentName}
                        </h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          Roll No: {student.rollNo}
                        </span>
                      </div>
                      <span style={{
                        backgroundColor: 'rgba(46, 204, 113, 0.1)',
                        color: '#27ae60',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: 'bold'
                      }}>
                        Placed
                      </span>
                    </div>

                    <div style={{ borderTop: '1px dashed var(--border-color)', margin: '0.25rem 0' }}></div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.9rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Branch:</span>
                        <strong style={{ color: 'var(--text-main)' }}>{student.group}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Company:</span>
                        <strong style={{ color: 'var(--primary)' }}>{student.company || 'Premier Company'}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Package:</span>
                        <strong style={{ color: '#27ae60' }}>₹{student.package || '0.0'} LPA</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-muted)' }}>CGPA:</span>
                        <strong style={{ color: 'var(--text-main)' }}>{student.cgpa}</strong>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{
                  gridColumn: '1 / -1',
                  textAlign: 'center',
                  padding: '2.5rem',
                  backgroundColor: 'var(--bg-cream)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-muted)',
                  fontSize: '0.95rem'
                }}>
                  No recent database placements recorded under this division.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Placement Record Logs */}
      <section id="records" className="section-padding bg-light-cream">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title center">Annual Placement Records</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto 3rem auto', color: 'var(--text-muted)' }}>
              Historical review of SVES society recruitment trends over the last few academic cycles.
            </p>
          </div>

          <div className="dept-records-wrapper">
            <table className="dept-records-table">
              <thead>
                <tr>
                  <th>Academic Cycle</th>
                  <th>Recruiters Hosted</th>
                  <th>Students Hired</th>
                  <th>Selection Rate</th>
                  <th>Highest Package Logged</th>
                </tr>
              </thead>
              <tbody>
                {GENERAL_RECORDS.map((row, idx) => (
                  <tr key={idx}>
                    <td><strong>{row.year}</strong></td>
                    <td>{row.companies}</td>
                    <td>{row.studentsPlaced}</td>
                    <td style={{ fontWeight: 'bold' }}>{row.successRate}</td>
                    <td style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{row.highestPack}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Student placement enrollment / Contact Us form */}
      <section id="registration" className="section-padding">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title center">Placement Enquiry & Registration</h2>
            <p className="form-sub">Submit your placement enquiry, profile bio, aggregate CGPA, and resume details directly to the placement coordination team. Enrolled students are added to database rosters for upcoming recruitment sessions.</p>
          </div>

          <div className="placement-form-container">
            <form onSubmit={handleSubmit} className="premium-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="studentName">Student Full Name</label>
                  <input
                    type="text"
                    id="studentName"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleInputChange}
                    placeholder="E.g., Srikanth Reddy"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="rollNo">Student Roll Number</label>
                  <input
                    type="text"
                    id="rollNo"
                    name="rollNo"
                    value={formData.rollNo}
                    onChange={handleInputChange}
                    placeholder="E.g., 23SV5A0501"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="college">College Division</label>
                  <select
                    id="college"
                    name="college"
                    value={formData.college}
                    onChange={handleInputChange}
                  >
                    <option value="engineering">SVES Engineering College</option>
                    <option value="postgraduate">SVES Postgraduate College</option>
                    <option value="degree">SVES Degree College</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="group">Branch / Specialization</label>
                  <select
                    id="group"
                    name="group"
                    value={formData.group}
                    onChange={handleInputChange}
                    required
                  >
                    {(COLLEGE_GROUPS[formData.college] || []).map((grp) => (
                      <option key={grp} value={grp}>{grp}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="cgpa">CGPA / Aggregate Percentage</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    id="cgpa"
                    name="cgpa"
                    value={formData.cgpa}
                    onChange={handleInputChange}
                    placeholder="E.g., 8.45"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="backlogs">Active Backlogs (if any)</label>
                  <input
                    type="number"
                    min="0"
                    id="backlogs"
                    name="backlogs"
                    value={formData.backlogs}
                    onChange={handleInputChange}
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
                    placeholder="student@gmail.com"
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
                    placeholder="10-digit number"
                    pattern="[0-9]{10}"
                    maxLength="10"
                    minLength="10"
                    required
                  />
                </div>

                 <div className="form-group full-width">
                  <label htmlFor="resumeFile">Upload Resume (PDF, Doc, Image - Max 2MB)</label>
                  <input
                    key={fileInputKey}
                    type="file"
                    id="resumeFile"
                    accept=".pdf,.doc,.docx,image/*"
                    onChange={handleFileChange}
                    required
                  />
                </div>
              </div>

              <div className="form-action">
                <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-wide">
                  {isSubmitting ? 'Submitting Enquiry...' : 'Submit Enquiry'}
                </button>
              </div>

              {formSuccess && (
                <div className="form-alert success">
                  ✔ Placement registration successfully stored in TPO archives! We will contact you regarding coding rounds and mock interview slots.
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
