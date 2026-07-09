import { useState } from 'react'
import { apiUrl } from '../lib/api'
import logoImg from '../assets/logo.jpg'
import './Admissions.css'

const BRANCH_DATA = {
  engineering: {
    name: 'Engineering College (B.Tech)',
    branches: {
      cse: { name: 'Computer Science & Engineering (CSE)', tuition: 120000, admission: 18000, books: 10000, duration: '4 Years', intake: 180 },
      ece: { name: 'Electronics & Communication Engineering (ECE)', tuition: 95000, admission: 18000, books: 10000, duration: '4 Years', intake: 120 },
      eee: { name: 'Electrical & Electronics Engineering (EEE)', tuition: 85000, admission: 18000, books: 10000, duration: '4 Years', intake: 60 },
      mech: { name: 'Mechanical Engineering (MECH)', tuition: 80000, admission: 18000, books: 10000, duration: '4 Years', intake: 60 },
      civil: { name: 'Civil Engineering (CIVIL)', tuition: 80000, admission: 18000, books: 10000, duration: '4 Years', intake: 60 }
    }
  },
  degree: {
    name: 'Degree College (UG Courses)',
    branches: {
      bsc: { name: 'B.Sc (Maths, Physics, CS)', tuition: 45000, admission: 12000, books: 7000, duration: '3 Years', intake: 100 },
      bcom: { name: 'B.Com (Computer Applications)', tuition: 40000, admission: 10000, books: 7000, duration: '3 Years', intake: 120 },
      bba: { name: 'Bachelor of Business Administration (BBA)', tuition: 50000, admission: 12000, books: 7000, duration: '3 Years', intake: 60 },
      ba: { name: 'B.A (History, Economics, Pol Science)', tuition: 30000, admission: 8000, books: 5000, duration: '3 Years', intake: 50 }
    }
  },
  pg: {
    name: 'Postgraduate College (PG Courses)',
    branches: {
      mca: { name: 'Master of Computer Applications (MCA)', tuition: 80000, admission: 15000, books: 8000, duration: '2 Years', intake: 120 },
      mba: { name: 'Master of Business Administration (MBA)', tuition: 85000, admission: 15000, books: 8000, duration: '2 Years', intake: 120 },
      mtech: { name: 'M.Tech in Software Engineering', tuition: 90000, admission: 15000, books: 8000, duration: '2 Years', intake: 18 },
      msc: { name: 'M.Sc in Computer Science', tuition: 60000, admission: 12000, books: 8000, duration: '2 Years', intake: 40 }
    }
  },
  intermediate: {
    name: 'Intermediate College (Grades 11-12)',
    branches: {
      mpc: { name: 'MPC (Maths, Physics, Chemistry)', tuition: 60000, admission: 10000, books: 6000, duration: '2 Years', intake: 200 },
      bipc: { name: 'BiPC (Biology, Physics, Chemistry)', tuition: 58000, admission: 10000, books: 6000, duration: '2 Years', intake: 120 },
      cec: { name: 'CEC (Civics, Economics, Commerce)', tuition: 45000, admission: 8000, books: 5005, duration: '2 Years', intake: 90 },
      hec: { name: 'HEC (History, Economics, Civics)', tuition: 40000, admission: 8000, books: 5000, duration: '2 Years', intake: 60 }
    }
  }
}

const TRANSPORT_COST = 15000
const HOSTEL_COST = 50000

export default function Admissions() {
  // Calculator States
  const [grade, setGrade] = useState('intermediate')
  const [branch, setBranch] = useState('mpc')
  const [transport, setTransport] = useState('no')
  const [hostel, setHostel] = useState('no')

  // Explore Tab State
  const [activeExploreTab, setActiveExploreTab] = useState('engineering')

  // Form States
  const [formData, setFormData] = useState({
    studentName: '',
    gradeLevel: 'intermediate',
    courseApplied: 'mpc',
    parentName: '',
    email: '',
    phone: '',
    message: ''
  })
  const [formSuccess, setFormSuccess] = useState(false)

  // Calculations
  const selectedFee = BRANCH_DATA[grade].branches[branch]
  const tuitionFee = selectedFee.tuition
  const admissionFee = selectedFee.admission
  const booksFee = selectedFee.books
  const transportFee = transport === 'yes' ? TRANSPORT_COST : 0
  const hostelFee = hostel === 'yes' ? HOSTEL_COST : 0
  const totalFee = tuitionFee + admissionFee + booksFee + transportFee + hostelFee

  // Calculator Handlers
  const handleGradeChange = (newGrade) => {
    setGrade(newGrade)
    const firstBranch = Object.keys(BRANCH_DATA[newGrade].branches)[0]
    setBranch(firstBranch)
  }

  const handleSelectBranchForEstimator = (divKey, branchKey) => {
    setGrade(divKey)
    setBranch(branchKey)
    const element = document.getElementById('fee-estimator')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Form Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '')
      if (numericValue.length <= 10) {
        setFormData((prev) => ({ ...prev, [name]: numericValue }))
      }
    } else if (name === 'gradeLevel') {
      const firstBranch = Object.keys(BRANCH_DATA[value].branches)[0]
      setFormData((prev) => ({ 
        ...prev, 
        [name]: value,
        courseApplied: firstBranch
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const courseName = BRANCH_DATA[formData.gradeLevel].branches[formData.courseApplied].name
      const updatedMessage = `[Selected Program/Specialization: ${courseName}]\n\n${formData.message}`
      
      const payload = {
        studentName: formData.studentName,
        gradeLevel: formData.gradeLevel,
        parentName: formData.parentName,
        email: formData.email,
        phone: formData.phone,
        message: updatedMessage
      }

      const response = await fetch(apiUrl('/admissions'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      if (response.ok) {
        console.log('Admission Enquiry Submitted:', payload)
        setFormSuccess(true)
        setFormData({
          studentName: '',
          gradeLevel: 'intermediate',
          courseApplied: 'mpc',
          parentName: '',
          email: '',
          phone: '',
          message: ''
        })
        setTimeout(() => setFormSuccess(false), 6000)
      } else {
        const errorData = await response.json()
        alert('Failed to submit enquiry: ' + errorData.error)
      }
    } catch (err) {
      console.error('Submission error:', err)
      alert('Could not submit enquiry. Please verify that the backend is running.')
    }
  }

  return (
    <main>
      {/* Centered red title */}
      <h1 className="page-title">Admissions</h1>

      {/* Textured Split Banner */}
      <section className="custom-banner">
        <div className="split-grid">
          {/* Left Welcome panel */}
          <div className="banner-welcome">
            <img src={logoImg} alt="SVES logo" className="banner-logo" />
            <h3>SVES Admission Office</h3>
            <span className="welcome-text-blue">Welcomes You !!!</span>
          </div>

          {/* Right active announcements list */}
          <div className="banner-announcements">
            <a href="#enquiry-form" className="banner-announcement-item">
              <span className="bell-icon">🔔</span>
              <div className="ann-details">
                <h4>Online Enquiry Form</h4>
                <p>Register student profile, academic logs, and query details instantly.</p>
              </div>
            </a>
            
            <a href="#fee-estimator" className="banner-announcement-item">
              <span className="bell-icon">🔔</span>
              <div className="ann-details">
                <h4>Term Fee Estimator Tool</h4>
                <p>Calculate branch-wise tuition, registration, books, and hostel estimates.</p>
              </div>
            </a>

            <a href="#booking" className="banner-announcement-item">
              <span className="bell-icon">🔔</span>
              <div className="ann-details">
                <h4>Important Intake Guidelines</h4>
                <p>Verify seat allocations, reservation rosters, and payment date circulars.</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Steps/Timeline Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title center">Admission Process</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>
              We strive to keep our registration process transparent, fast, and structured for parent comfort.
            </p>
          </div>

          <div className="timeline">
            <div className="timeline-item left-item">
              <div className="timeline-badge">Step 1</div>
              <div className="timeline-card">
                <h3>Online Enquiry</h3>
                <p>Submit the Enquiry Form below with student details, academic history, and contact numbers.</p>
              </div>
            </div>

            <div className="timeline-item right-item">
              <div className="timeline-badge">Step 2</div>
              <div className="timeline-card">
                <h3>Campus Interaction</h3>
                <p>Visit the campus for a physical tour, followed by an interaction with our Principal and counselors.</p>
              </div>
            </div>

            <div className="timeline-item left-item">
              <div className="timeline-badge">Step 3</div>
              <div className="timeline-card">
                <h3>Document Submission</h3>
                <p>Submit the required reports, birth records, previous institution certificates, and student ID photos.</p>
              </div>
            </div>

            <div className="timeline-item right-item">
              <div className="timeline-badge">Step 4</div>
              <div className="timeline-card">
                <h3>Admission Confirmation</h3>
                <p>Receive admission confirmation slip and pay the initial fees to secure the student's seat.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Groups & Branches Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-white)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="text-center">
            <h2 className="section-title center">Explore Branches & Courses</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
              Select a college to view the available branches, intake capacity, and duration of courses.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="college-tabs">
            {Object.keys(BRANCH_DATA).map((key) => (
              <button
                key={key}
                className={`college-tab-btn ${activeExploreTab === key ? 'active' : ''}`}
                onClick={() => setActiveExploreTab(key)}
              >
                {BRANCH_DATA[key].name}
              </button>
            ))}
          </div>

          {/* Branches Grid */}
          <div className="branches-grid">
            {Object.keys(BRANCH_DATA[activeExploreTab].branches).map((branchKey) => {
              const b = BRANCH_DATA[activeExploreTab].branches[branchKey]
              return (
                <div key={branchKey} className="branch-card">
                  <div className="branch-card-header">
                    <h4>{b.name}</h4>
                  </div>
                  <div className="branch-card-body">
                    <div className="branch-meta-item">
                      <span>📅 Duration:</span>
                      <strong>{b.duration}</strong>
                    </div>
                    <div className="branch-meta-item">
                      <span>👥 Annual Intake:</span>
                      <strong>{b.intake} Seats</strong>
                    </div>
                    <div className="branch-meta-item">
                      <span>💰 Base Tuition:</span>
                      <strong>₹{b.tuition.toLocaleString()} / Yr</strong>
                    </div>
                  </div>
                  <div className="branch-card-footer">
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleSelectBranchForEstimator(activeExploreTab, branchKey)}
                    >
                      Estimate Total Fee
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Interactive Fees Calculator */}
      <section id="fee-estimator" className="section-padding" style={{ backgroundColor: 'var(--bg-cream)' }}>
        <div className="container">
          <div className="text-center">
            <h2 className="section-title center">Fee Estimator</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>
              Estimate the academic year fees for your child instantly based on class divisions, selected branch, and additional services.
            </p>
          </div>

          <div className="calc-container">
            {/* Inputs Panel */}
            <div className="calc-panel">
              <h3 className="section-title">Select Options</h3>
              <div className="calc-inputs">

                <div className="form-group">
                  <label className="form-label">Institute Division</label>
                  <select 
                    className="form-select" 
                    value={grade}
                    onChange={(e) => handleGradeChange(e.target.value)}
                  >
                    <option value="intermediate">Intermediate College (Grades 11-12)</option>
                    <option value="degree">Degree College (UG Courses)</option>
                    <option value="pg">Postgraduate College (PG Courses)</option>
                    <option value="engineering">Engineering College (B.Tech)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Select Branch / Course</label>
                  <select 
                    className="form-select" 
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                  >
                    {Object.keys(BRANCH_DATA[grade].branches).map((branchKey) => (
                      <option key={branchKey} value={branchKey}>
                        {BRANCH_DATA[grade].branches[branchKey].name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Transport (Bus Service)</label>
                  <div className="radio-group">
                    <label className="radio-option">
                      <input 
                        type="radio" 
                        name="transport" 
                        value="yes" 
                        checked={transport === 'yes'}
                        onChange={() => setTransport('yes')}
                      />
                      Required (+₹{TRANSPORT_COST.toLocaleString()})
                    </label>
                    <label className="radio-option">
                      <input 
                        type="radio" 
                        name="transport" 
                        value="no" 
                        checked={transport === 'no'}
                        onChange={() => setTransport('no')}
                      />
                      Self Arrangement
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Hostel & Boarding Facility</label>
                  <div className="radio-group">
                    <label className="radio-option">
                      <input 
                        type="radio" 
                        name="hostel" 
                        value="yes" 
                        checked={hostel === 'yes'}
                        onChange={() => setHostel('yes')}
                      />
                      Required (+₹{HOSTEL_COST.toLocaleString()})
                    </label>
                    <label className="radio-option">
                      <input 
                        type="radio" 
                        name="hostel" 
                        value="no" 
                        checked={hostel === 'no'}
                        onChange={() => setHostel('no')}
                      />
                      Day Scholar
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Invoice Panel */}
            <div className="invoice-panel">
              <h3 className="invoice-title">Fee Summary (Annual)</h3>
              <div className="invoice-rows">
                <div className="invoice-row">
                  <span>Institute Division:</span>
                  <span style={{ fontWeight: '600' }}>{BRANCH_DATA[grade].name}</span>
                </div>
                <div className="invoice-row">
                  <span>Selected Branch:</span>
                  <span style={{ fontWeight: '600', color: 'var(--accent)' }}>{selectedFee.name}</span>
                </div>
                <div className="invoice-row">
                  <span>Base Tuition Fee:</span>
                  <span>₹{tuitionFee.toLocaleString()}</span>
                </div>
                <div className="invoice-row">
                  <span>One-time Admission Fee:</span>
                  <span>₹{admissionFee.toLocaleString()}</span>
                </div>
                <div className="invoice-row">
                  <span>Uniform & Books Deposit:</span>
                  <span>₹{booksFee.toLocaleString()}</span>
                </div>
                <div className="invoice-row">
                  <span>Transportation Fee:</span>
                  <span>₹{transportFee.toLocaleString()}</span>
                </div>
                <div className="invoice-row">
                  <span>Hostel & Boarding Fee:</span>
                  <span>₹{hostelFee.toLocaleString()}</span>
                </div>
                <div className="invoice-row total">
                  <span>Estimated Total:</span>
                  <span>₹{totalFee.toLocaleString()}</span>
                </div>
              </div>
              <p className="invoice-note">
                * Note: This is an estimated breakdown for planning purposes. Laboratory charges, activity fees, and specific subject charges may apply during enrollment.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Why Choose SVES Section */}
      <section className="section-padding bg-cream-section" style={{ backgroundColor: 'var(--bg-white)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="text-center">
            <h2 className="section-title center">Why Choose SVES Institutions?</h2>
            <p style={{ maxWidth: '700px', margin: '0 auto 3rem auto', fontSize: '1.05rem', color: 'var(--text-muted)' }}>
              Sri Veerabhadra Educational Society (SVES) is dedicated to cultivating academic excellence, practical skill acquisition, and professional leadership across all collegiate streams.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginTop: '2rem'
          }}>
            <div style={{ backgroundColor: 'var(--bg-light)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)', transition: 'transform 0.3s' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🏆</div>
              <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '1.25rem' }}>Proven Placement Record</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Our dedicated placement cells partner with top MNCs and corporations globally, maintaining a 100% placement record for all eligible engineering and graduate students.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--bg-light)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)', transition: 'transform 0.3s' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔬</div>
              <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '1.25rem' }}>Advanced Infrastructure & Labs</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Students learn in state-of-the-art laboratory systems, research centres, computing hubs, and visual smart classrooms equipped with modern digital tools.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--bg-light)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)', transition: 'transform 0.3s' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎓</div>
              <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '1.25rem' }}>Distinguished PhD Faculty</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Instruction is led by highly qualified professor panels, doctorates, and industry veterans committed to mentoring, research publications, and career development.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--bg-light)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)', transition: 'transform 0.3s' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🚀</div>
              <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '1.25rem' }}>Holistic Student Grooming</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Beyond academics, our clubs, sports arenas, robotics leagues, NSS/NCC units, and seminars develop leadership, presentation skills, and physical wellness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Form Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title center">Online Enquiry Form</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>
              Fill out this enquiry form, and our admissions team will get in touch with you within 24 working hours.
            </p>
          </div>

          <div className="form-panel">
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="studentName">Student Full Name</label>
                  <input
                    type="text"
                    id="studentName"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter student's name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="gradeLevel">Institute Division Applied For</label>
                  <select
                    id="gradeLevel"
                    name="gradeLevel"
                    value={formData.gradeLevel}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="intermediate">Intermediate College (Grades 11-12)</option>
                    <option value="degree">Degree College (Undergraduate)</option>
                    <option value="pg">Postgraduate College (PG)</option>
                    <option value="engineering">Engineering College (B.Tech)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="courseApplied">Specialization / Course</label>
                  <select
                    id="courseApplied"
                    name="courseApplied"
                    value={formData.courseApplied}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    {Object.keys(BRANCH_DATA[formData.gradeLevel].branches).map((branchKey) => (
                      <option key={branchKey} value={branchKey}>
                        {BRANCH_DATA[formData.gradeLevel].branches[branchKey].name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="parentName">Parent / Guardian Name</label>
                  <input
                    type="text"
                    id="parentName"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter parent's name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Contact Number</label>
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

                <div className="form-group form-col-span-2">
                  <label className="form-label" htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="parent@domain.com"
                    required
                  />
                </div>

                <div className="form-group form-col-span-2">
                  <label className="form-label" htmlFor="message">Academic History / Enquiries</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-textarea"
                    rows="4"
                    placeholder="Detail previous institution name, board, and any specific questions you have..."
                    required
                  ></textarea>
                </div>
              </div>

              <div className="text-center" style={{ marginTop: '1.5rem' }}>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', maxWidth: '300px' }}>
                  Submit Admission Enquiry
                </button>
              </div>

              {formSuccess && (
                <div className="form-msg form-msg-success">
                  🎉 Inquiry successfully received! Our representative will call you shortly.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
