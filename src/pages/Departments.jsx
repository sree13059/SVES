import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import logoImg from '../assets/logo.jpg'
import './Departments.css'

const DEPARTMENTS_DATA = [
  {
    id: 'engineering',
    name: 'SVES Engineering College',
    code: 'SVES-EC',
    established: '2008',
    principal: 'Dr. S. Veerabhadra Jr.',
    email: 'principal@sves.edu.in',
    phone: '9848022337',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&q=80&w=800',
    description: 'Offering state-of-the-art technical education with emphasis on modern laboratory sessions, robotics, AI, and industry standard programming methodologies.',
    courses: [
      { name: 'Computer Science & Engineering (CSE)', duration: '4 Years', intake: 180 },
      { name: 'Electronics & Communication Engineering (ECE)', duration: '4 Years', intake: 120 },
      { name: 'Electrical & Electronics Engineering (EEE)', duration: '4 Years', intake: 60 },
      { name: 'Mechanical Engineering (MECH)', duration: '4 Years', intake: 60 },
      { name: 'Civil Engineering (CIVIL)', duration: '4 Years', intake: 60 }
    ],
    facilities: ['Advanced Computing Lab', 'Robotics Innovation Cell', 'Smart Seminar Hall', 'Digital Central Library']
  },
  {
    id: 'postgraduate',
    name: 'SVES Postgraduate College',
    code: 'SVES-PG',
    established: '2018',
    principal: 'Mrs. V. Saraswathi',
    email: 'director@sves.edu.in',
    phone: '9848022340',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800',
    description: 'Nurturing advanced professionals in fields of computer applications and business administration, equipped with managerial acumen and analytical skills.',
    courses: [
      { name: 'Master of Computer Applications (MCA)', duration: '2 Years', intake: 120 },
      { name: 'Master of Business Administration (MBA)', duration: '2 Years', intake: 120 },
      { name: 'M.Tech in Software Engineering', duration: '2 Years', intake: 18 },
      { name: 'M.Sc in Computer Science', duration: '2 Years', intake: 40 }
    ],
    facilities: ['PG Seminar Lounge', 'Case Study Discussion Room', 'High-End Server Lab', 'Placement Incubation Hub']
  },
  {
    id: 'degree',
    name: 'SVES Degree College',
    code: 'SVES-DC',
    established: '2015',
    principal: 'Dr. M. S. Prasad',
    email: 'degree.principal@sves.edu.in',
    phone: '9848022339',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800',
    description: 'Providing comprehensive arts, commerce, and science programs designed to instil strong fundamental understanding and prepare students for competitive examinations.',
    courses: [
      { name: 'Bachelor of Science (B.Sc - Maths, Physics, CS)', duration: '3 Years', intake: 100 },
      { name: 'Bachelor of Commerce (B.Com - Computer Applications)', duration: '3 Years', intake: 120 },
      { name: 'Bachelor of Business Administration (BBA)', duration: '3 Years', intake: 60 },
      { name: 'Bachelor of Arts (B.A - History, Economics, Pol Science)', duration: '3 Years', intake: 50 }
    ],
    facilities: ['Physics & Chemistry Lab', 'Language Communication Lab', 'Sports Complex', 'NSS & NCC Units']
  },
  {
    id: 'intermediate',
    name: 'SVES Intermediate College',
    code: 'SVES-IC',
    established: '2012',
    principal: 'Dr. A. Raghavendra',
    email: 'inter.principal@sves.edu.in',
    phone: '9848022338',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800',
    description: 'Pre-university coaching focusing on national-level competitive tests (JEE, NEET, EAPCET) alongside standard intermediate state board curricula.',
    courses: [
      { name: 'MPC (Maths, Physics, Chemistry)', duration: '2 Years', intake: 200 },
      { name: 'BiPC (Biology, Physics, Chemistry)', duration: '2 Years', intake: 120 },
      { name: 'CEC (Civics, Economics, Commerce)', duration: '2 Years', intake: 90 },
      { name: 'HEC (History, Economics, Civics)', duration: '2 Years', intake: 60 }
    ],
    facilities: ['NEET & JEE Smart Coaching Center', 'Dedicated Physics Lab', 'Eco-friendly Classroom Blocks', 'Mentorship Program']
  }
]

export default function Departments() {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''))
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }
  }, [hash])

  return (
    <main className="departments-page">
      {/* Centered red title */}
      <h1 className="page-title">Departments & Colleges</h1>

      {/* Textured Split Banner */}
      <section className="custom-banner">
        <div className="split-grid">
          {/* Left Welcome panel */}
          <div className="banner-welcome">
            <img src={logoImg} alt="SVES logo" className="banner-logo" />
            <h3>SVES Academic Branches</h3>
            <span className="welcome-text-blue">Welcomes You !!!</span>
          </div>

          {/* Right active announcements list */}
          <div className="banner-announcements">
            <a href="#engineering" className="banner-announcement-item">
              <span className="bell-icon">🔔</span>
              <div className="ann-details">
                <h4>SVES Engineering College (SVES-EC)</h4>
                <p>Learn more about B.Tech streams, laboratory facilities, and intake details.</p>
              </div>
            </a>
            
            <a href="#postgraduate" className="banner-announcement-item">
              <span className="bell-icon">🔔</span>
              <div className="ann-details">
                <h4>SVES Postgraduate College (SVES-PGC)</h4>
                <p>Click here to check MCA and MBA curricula and postgrad profiles.</p>
              </div>
            </a>

            <a href="#degree" className="banner-announcement-item">
              <span className="bell-icon">🔔</span>
              <div className="ann-details">
                <h4>SVES Degree College (SVES-DC) & Intermediate (SVES-IC)</h4>
                <p>Explore Science, Arts, Commerce, and Intermediate MPC coaching blocks.</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* List of departments */}
      <section className="section-padding">
        <div className="container">
          {DEPARTMENTS_DATA.map((dept, idx) => (
            <div key={dept.id} id={dept.id} className={`department-section ${idx % 2 === 1 ? 'reverse' : ''}`}>
              <div className="dept-image-block">
                <img src={dept.image} alt={dept.name} className="dept-image" />
                <div className="dept-badge">{dept.code}</div>
              </div>
              <div className="dept-info-block">
                <span className="dept-meta">ESTD: {dept.established}</span>
                <h2>{dept.name}</h2>
                <p className="dept-desc">{dept.description}</p>
                
                <div className="dept-details-row">
                  <div className="dept-detail-item">
                    <strong>Principal:</strong> {dept.principal}
                  </div>
                  <div className="dept-detail-item">
                    <strong>Email:</strong> {dept.email}
                  </div>
                </div>

                <div className="facilities-tags">
                  {dept.facilities.map((fac, i) => (
                    <span key={i} className="facility-tag">🏫 {fac}</span>
                  ))}
                </div>

                <h3 className="courses-title">Offered Courses & Intake</h3>
                <div className="courses-list-wrapper">
                  <table className="courses-table">
                    <thead>
                      <tr>
                        <th>Course Specialization</th>
                        <th>Duration</th>
                        <th>Annual Seats</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dept.courses.map((course, j) => (
                        <tr key={j}>
                          <td>{course.name}</td>
                          <td>{course.duration}</td>
                          <td>{course.intake}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
