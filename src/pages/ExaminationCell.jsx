import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { apiUrl } from '../lib/api'
import logoImg from '../assets/logo.jpg'
import './ExaminationCell.css'

const COLLEGE_LABELS = {
  engineering: 'Engineering College',
  postgraduate: 'PG College',
  pg: 'PG College',
  degree: 'Degree College',
  intermediate: 'Intermediate College',
  iti: 'ITI College',
  medical: 'Medical College',
  polytechnic: 'Polytechnic College'
}

const semesterMap = {
  '1st Semester': ['Semester I', '1st Semester', '1st Sem'],
  '2nd Semester': ['Semester II', '2nd Semester', '2nd Sem'],
  '3rd Semester': ['Semester III', '3rd Semester', '3rd Sem'],
  '4th Semester': ['Semester IV', '4th Semester', '4th Sem']
}

export default function ExaminationCell() {
  const { hash } = useLocation()
  
  // Registration Form state
  const [formData, setFormData] = useState({
    studentName: '',
    rollNo: '',
    college: 'engineering',
    group: '',
    semester: '1st Semester',
    examType: 'Regular',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formError, setFormError] = useState('')

  // Results search mock state
  const [searchRoll, setSearchRoll] = useState('')
  const [searchSem, setSearchSem] = useState('1st Semester')
  const [searchResult, setSearchResult] = useState(null)
  const [searchError, setSearchError] = useState('')

  // Exam Schedules state
  const [schedules, setSchedules] = useState([])
  const [loadingSchedules, setLoadingSchedules] = useState(true)
  const [errorSchedules, setErrorSchedules] = useState('')

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setLoadingSchedules(true)
        setErrorSchedules('')
        const response = await fetch(apiUrl('/exam-schedules'))
        if (response.ok) {
          const data = await response.json()
          setSchedules(data)
        } else {
          setErrorSchedules('Failed to fetch active examination timetables.')
        }
      } catch (err) {
        console.error('Error fetching schedules:', err)
        setErrorSchedules('Could not connect to backend server to load timetables.')
      } finally {
        setLoadingSchedules(false)
      }
    }
    fetchSchedules()
  }, [])

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
      const response = await fetch(apiUrl('/examinations'), {
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
          group: '',
          semester: '1st Semester',
          examType: 'Regular',
          email: '',
          phone: '',
          message: ''
        })
      } else {
        const errData = await response.json()
        setFormError(errData.error || 'Failed to submit registration.')
      }
    } catch (err) {
      setFormError('Failed to connect to the backend server. Verify your backend is running.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResultSearch = async (e) => {
    e.preventDefault()
    setSearchResult(null)
    setSearchError('')

    if (!searchRoll.trim()) {
      setSearchError('Please enter a valid hall ticket number.')
      return
    }

    try {
      const response = await fetch(apiUrl('/exam-results?rollNo=' + encodeURIComponent(searchRoll.trim())))
      if (!response.ok) {
        setSearchError('Failed to retrieve results. Server error.')
        return
      }

      const allResults = await response.json()
      if (!allResults || allResults.length === 0) {
        setSearchError('No grade records found for the entered Roll Number.')
        return
      }

      // Map semesters to normalized keys
      const semKeys = semesterMap[searchSem] || [searchSem]

      // Filter results matching the selected semester
      const filtered = allResults.filter(res => {
        const schedSem = res.examinationId?.semester || '';
        const examNameVal = res.examName || '';
        
        // Match if normalized schedule semester is in semKeys, or examName contains searchSem/schedSem
        const semMatches = semKeys.some(key => 
          schedSem.toLowerCase() === key.toLowerCase() || 
          examNameVal.toLowerCase().includes(key.toLowerCase())
        );
        return semMatches;
      })

      if (filtered.length === 0) {
        setSearchError(`No grade records found for this student in ${searchSem}.`);
        return;
      }

      // Calculate GPA
      // Let's map marks to grade and points
      const getGrade = (marks, max) => {
        const pct = (marks / max) * 100;
        if (pct >= 90) return 'O';
        if (pct >= 80) return 'A+';
        if (pct >= 70) return 'A';
        if (pct >= 60) return 'B+';
        if (pct >= 50) return 'B';
        if (pct >= 40) return 'C';
        return 'F';
      };

      const getGradePoints = (grade) => {
        switch (grade) {
          case 'O': return 10;
          case 'A+': return 9;
          case 'A': return 8;
          case 'B+': return 7;
          case 'B': return 6;
          case 'C': return 5;
          default: return 0;
        }
      };

      const grades = filtered.map((res, index) => {
        const grade = getGrade(res.marksObtained, res.maxMarks);
        return {
          code: res.examinationId?.subjects?.[index] || `SUB-${index + 1}`,
          subject: res.subject,
          grade: grade,
          points: getGradePoints(grade)
        };
      });

      const totalPoints = grades.reduce((sum, g) => sum + g.points, 0);
      const avgGPA = (totalPoints / grades.length).toFixed(2);
      
      const overallStatus = grades.some(g => g.grade === 'F') ? 'FAILED' : 'PASSED';

      setSearchResult({
        studentName: filtered[0].studentName,
        rollNo: searchRoll.toUpperCase(),
        semester: searchSem,
        gpa: avgGPA,
        status: overallStatus,
        grades: grades
      });

    } catch (err) {
      console.error(err)
      setSearchError('Error connecting to examination server. Please verify your connection.')
    }
  }

  return (
    <main className="exam-page">
      {/* Red centered title */}
      <h1 className="exam-page-title">Examination Cell</h1>

      {/* Textured Split Banner */}
      <section className="exam-custom-banner">
        <div className="exam-split-grid">
          {/* Left Welcome panel */}
          <div className="exam-banner-welcome">
            <img src={logoImg} alt="SVES logo" className="exam-banner-logo" />
            <h3>SVES Examination Branch</h3>
            <span className="welcome-text-blue">Welcomes You !!!</span>
          </div>

          {/* Right active announcements list */}
          <div className="exam-banner-announcements">
            <a href="#results" className="banner-announcement-item">
              <span className="ann-bell-icon">🔔</span>
              <div className="ann-details">
                <h4>B.Tech IV-II (R13) Reg Results</h4>
                <p>Click above link to check B.Tech IV-II R13 Regular Examination Results April 2026</p>
              </div>
            </a>
            
            <a href="#results" className="banner-announcement-item">
              <span className="ann-bell-icon">🔔</span>
              <div className="ann-details">
                <h4>B.Tech III-II (R13) Reg & Supple Results</h4>
                <p>Click above link to check B.Tech III-II R13 Regular & Supple Examination Results May/June 2026</p>
              </div>
            </a>

            <a href="#results" className="banner-announcement-item">
              <span className="ann-bell-icon">🔔</span>
              <div className="ann-details">
                <h4>B.Tech IV-II (R13) Advanced Supple Results</h4>
                <p>Click above link to check B.Tech IV-II R13 Advanced Supple Examination Results July 2026</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* About Exam Cell */}
      <section id="about" className="section-padding">
        <div className="container">
          <div className="exam-layout-grid">
            <div className="exam-text-column">
              <span className="section-badge">Establishment</span>
              <h2>About the Examination Cell</h2>
              <p>The SVES Centralized Examination Cell is headed by the Controller of Examinations and coordinates with college deans to manage the planning, execution, and grade assessment processes for all affiliated divisions.</p>
              <p>We are dedicated to upholding the highest standards of integrity, security, and timeliness in issuing grade cards, certificates, and recounting assessments.</p>
              
              <div className="exam-officers">
                <div className="officer-card">
                  <strong>Dr. G. Venkat Rao</strong>
                  <span>Controller of Examinations, SVES</span>
                </div>
                <div className="officer-card">
                  <strong>Mrs. R. Sumathi</strong>
                  <span>Additional CoE (Engineering & PG)</span>
                </div>
              </div>
            </div>
            
            <div className="exam-guide-column">
              <h3>Academic Regulations & Rules</h3>
              <ul className="guide-check-list">
                <li><strong>Attendance:</strong> Minimum 75% class attendance is mandatory in each block.</li>
                <li><strong>Eligibility:</strong> Clearance of tuition fees and laboratory dues is required to retrieve hall tickets.</li>
                <li><strong>Revaluation:</strong> Applications for paper recounting or photocopy inspection must be filed within 10 days of grade publication.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Notifications & Circulars */}
      <section id="notifications" className="section-padding bg-light-cream">
        <div className="container">
          <div className="notification-grid">
            {/* Notifications Column */}
            <div className="notif-column">
              <h2 className="title-left-line">Cell Notifications</h2>
              <div className="notif-list">
                <div className="notif-item animate-hover">
                  <span className="notif-tag info">Important</span>
                  <span className="notif-date">July 01, 2026</span>
                  <h4>Revaluation results for Sem III B.Tech released</h4>
                  <p>Students can query revised scores at the cell counter or online results panel.</p>
                </div>
                <div className="notif-item animate-hover">
                  <span className="notif-tag warning">Alert</span>
                  <span className="notif-date">June 28, 2026</span>
                  <h4>Hall Ticket collection dates for CBCS Degree Sem IV</h4>
                  <p>No-dues forms must be signed by respective HODs prior to collection.</p>
                </div>
              </div>
            </div>

            {/* Circulars Column */}
            <div id="circulars" className="circulars-column">
              <h2 className="title-left-line">Circulars & Announcements</h2>
              <ul className="circulars-list">
                <li>
                  <a href="#downloads" className="circular-link">
                    📄 Ref No: SVES-EC/2026/04 - Code of Conduct during Final Exams (PDF)
                  </a>
                </li>
                <li>
                  <a href="#downloads" className="circular-link">
                    📄 Ref No: SVES-EC/2026/03 - Revaluation / Recounting Application Guidelines
                  </a>
                </li>
                <li>
                  <a href="#downloads" className="circular-link">
                    📄 Ref No: SVES-EC/2026/02 - Grading System Structure and GPA Conversion Table
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Time Tables */}
      <section id="timetable" className="section-padding">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title center">Examination Time Tables</h2>
            <p className="section-sub">Download active schedules for upcoming theory and practical tests.</p>
          </div>

          {loadingSchedules ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              <p>Loading active examination timetables...</p>
            </div>
          ) : errorSchedules ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#e74c3c' }}>
              <p>⚠ {errorSchedules}</p>
            </div>
          ) : schedules.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)', backgroundColor: '#fff', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <p>No active examination schedules published at the moment.</p>
            </div>
          ) : (
            <div className="timetable-cards-grid">
              {schedules.map((ex, idx) => (
                <div key={ex._id || idx} className="timetable-card animate-hover">
                  <span className="t-badge">{COLLEGE_LABELS[ex.college] || ex.college.toUpperCase()}</span>
                  <h3>{ex.name}</h3>
                  <p className="t-meta"><strong>Branch:</strong> {ex.group} | <strong>Sem:</strong> {ex.semester}</p>
                  <p className="t-date">📅 Commencement: {ex.date}</p>
                  {ex.subjects && ex.subjects.length > 0 && (
                    <div className="t-subject-tags">
                      {ex.subjects.map((sub, i) => (
                        <span key={i} className="t-subject-tag">{sub}</span>
                      ))}
                    </div>
                  )}
                  <button onClick={() => alert(`Syllabus and schedule details for ${ex.name} downloaded!`)} className="btn btn-secondary btn-sm" style={{ marginTop: 'auto' }}>
                    Download Schedule
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Online Results Portal */}
      <section id="results" className="section-padding bg-light-cream">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title center">Online Results Inquiry</h2>
            <p className="section-sub">Enter student credentials to retrieve temporary grade reports directly from the central cell directory.</p>
          </div>

          <div className="results-lookup-box">
            <form onSubmit={handleResultSearch} className="result-search-form">
              <div className="search-row">
                <div className="search-group">
                  <label htmlFor="searchRoll">Hall Ticket Number</label>
                  <input
                    type="text"
                    id="searchRoll"
                    value={searchRoll}
                    onChange={(e) => setSearchRoll(e.target.value)}
                    placeholder="E.g., 23SV5A0501"
                    required
                  />
                </div>
                
                <div className="search-group">
                  <label htmlFor="searchSem">Semester / Year</label>
                  <select
                    id="searchSem"
                    value={searchSem}
                    onChange={(e) => setSearchSem(e.target.value)}
                  >
                    <option value="1st Semester">1st Semester</option>
                    <option value="2nd Semester">2nd Semester</option>
                    <option value="3rd Semester">3rd Semester</option>
                    <option value="4th Semester">4th Semester</option>
                  </select>
                </div>

                <div className="search-action">
                  <button type="submit" className="btn btn-primary">Query Grade Card</button>
                </div>
              </div>

              {searchError && <div className="result-alert error">⚠ {searchError}</div>}
            </form>

            {searchResult && (
              <div className="result-card-display animate-fade-in">
                <div className="result-header">
                  <div>
                    <h4>{searchResult.studentName}</h4>
                    <span className="sub">Roll No: {searchResult.rollNo} | {searchResult.semester}</span>
                  </div>
                  <div className={`status-badge ${searchResult.status.toLowerCase()}`}>
                    {searchResult.status}
                  </div>
                </div>

                <table className="result-table">
                  <thead>
                    <tr>
                      <th>Subject Code</th>
                      <th>Subject Name</th>
                      <th>Grade Secured</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResult.grades.map((g, idx) => (
                      <tr key={idx}>
                        <td>{g.code}</td>
                        <td>{g.subject}</td>
                        <td style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{g.grade}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="result-footer">
                  <span><strong>Aggregate SGPA:</strong> {searchResult.gpa}</span>
                  <button onClick={() => alert('Official PDF grade card downloaded!')} className="btn btn-outline-primary btn-sm">Export Report</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Downloads Section */}
      <section id="downloads" className="section-padding">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title center">Cell Downloads & Forms</h2>
            <p className="section-sub">Download PDF applications and files for direct submission at the administration office.</p>
          </div>

          <div className="downloads-grid">
            <div className="download-item">
              <span className="dl-icon">📄</span>
              <div className="dl-details">
                <h4>Revaluation Application Form</h4>
                <p>Format: PDF | Size: 180 KB</p>
              </div>
              <button onClick={() => alert('Downloading Revaluation Form...')} className="btn btn-accent btn-sm">Download</button>
            </div>

            <div className="download-item">
              <span className="dl-icon">📄</span>
              <div className="dl-details">
                <h4>No Objection Certificate (NOC) Template</h4>
                <p>Format: PDF | Size: 120 KB</p>
              </div>
              <button onClick={() => alert('Downloading NOC Template...')} className="btn btn-accent btn-sm">Download</button>
            </div>

            <div className="download-item">
              <span className="dl-icon">📄</span>
              <div className="dl-details">
                <h4>Hall Ticket Request Form</h4>
                <p>Format: PDF | Size: 220 KB</p>
              </div>
              <button onClick={() => alert('Downloading Hall Ticket Request...')} className="btn btn-accent btn-sm">Download</button>
            </div>

            <div className="download-item">
              <span className="dl-icon">📄</span>
              <div className="dl-details">
                <h4>Transcript Issuing Application</h4>
                <p>Format: PDF | Size: 310 KB</p>
              </div>
              <button onClick={() => alert('Downloading Transcript Application...')} className="btn btn-accent btn-sm">Download</button>
            </div>
          </div>
        </div>
      </section>

      {/* Registration/Enquiry Form */}
      <section id="registration" className="section-padding bg-light-cream">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title center">Enquiry & Supplementary Registration</h2>
            <p className="section-sub">Submit your query directly to the Examination Cell officials.</p>
          </div>

          <div className="exam-form-container">
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
                  <label htmlFor="rollNo">Hall Ticket / Roll Number</label>
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
                    <option value="intermediate">SVES Intermediate College</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="group">Branch / Group / Division</label>
                  <input
                    type="text"
                    id="group"
                    name="group"
                    value={formData.group}
                    onChange={handleInputChange}
                    placeholder="E.g., CSE, MCA, MPC, B.Sc"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="semester">Academic Semester / Year</label>
                  <select
                    id="semester"
                    name="semester"
                    value={formData.semester}
                    onChange={handleInputChange}
                  >
                    <option value="1st Semester">1st Semester</option>
                    <option value="2nd Semester">2nd Semester</option>
                    <option value="3rd Semester">3rd Semester</option>
                    <option value="4th Semester">4th Semester</option>
                    <option value="1st Year (Inter)">1st Year (Intermediate)</option>
                    <option value="2nd Year (Inter)">2nd Year (Intermediate)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="examType">Application Type</label>
                  <select
                    id="examType"
                    name="examType"
                    value={formData.examType}
                    onChange={handleInputChange}
                  >
                    <option value="Regular">Regular Examination Fee</option>
                    <option value="Supply">Supplementary Fee Payment</option>
                    <option value="Revaluation">Paper Revaluation / Recounting</option>
                  </select>
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
                  <label htmlFor="phone">Mobile Number</label>
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
                  <label htmlFor="message">Subject Codes & Description</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="3"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Provide the subject names or codes..."
                    required
                  ></textarea>
                </div>
              </div>

              <div className="form-action">
                <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-wide">
                  {isSubmitting ? 'Submitting Details...' : 'Submit Application to Cell'}
                </button>
              </div>

              {formSuccess && (
                <div className="form-alert success">
                  ✔ Application submitted successfully! Please present details at the central office counter to settle balance sheets.
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
