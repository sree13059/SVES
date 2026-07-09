import { useState } from 'react'
import './Academics.css'

const CURRICULUM = [
  {
    icon: '🏫',
    title: 'Primary Academy',
    grades: 'Grades 1 – 5',
    desc: 'Focuses on building fundamental literacy, numeracy, social skills, and creative imagination in a supportive, play-active atmosphere.',
    subjects: ['English & Language Arts', 'Mathematics Foundations', 'Environmental Science', 'Art & Craft', 'Physical Education']
  },
  {
    icon: '📚',
    title: 'Secondary School',
    grades: 'Grades 6 – 10',
    desc: 'Cultivates scientific temper, mathematical skill, historical context, and deep analytical reading to build competitive foundations.',
    subjects: ['Advanced Physics & Chemistry', 'Algebra & Geometry', 'History & Civics', 'Computer Programming Basics', 'Foreign Language Electives']
  },
  {
    icon: '🎓',
    title: 'Senior Secondary',
    grades: 'Grades 11 – 12',
    desc: 'Specialized streams offering intensive preparing for college entries and national board exams in Science and Commerce sections.',
    subjects: ['Physics, Chemistry & Math', 'Biology & Biochemistry', 'Accountancy & Business Studies', 'Computer Science & AI', 'English Literature & Communications']
  }
]

const METHODS = [
  {
    num: '01',
    title: 'Experiential Learning in Labs',
    desc: 'Instead of memorizing definitions, students perform actual scientific experiments and write codes to solve real problems.'
  },
  {
    num: '02',
    title: 'Smart Tech Integration',
    desc: 'Classrooms are powered by visual screens to explain complex geometric formulas or structural operations in history.'
  },
  {
    num: '03',
    title: 'Project-Based Assessments',
    desc: 'Evaluations are designed to measure teamwork, design skills, research capabilities, and presentation confidence.'
  },
  {
    num: '04',
    title: 'Individualized Mentoring',
    desc: 'With a tight student-teacher ratio, teachers regularly run remedial sessions to clear difficult topics for every scholar.'
  }
]

const CLUBS = [
  {
    id: 'club-1',
    emoji: '🤖',
    title: 'Robotics & AI Club',
    desc: 'Introduces scholars to circuit wiring, microcontrollers (Arduino/Raspberry Pi), mechanical joints, and python programming. Students assemble small robots and participate in regional tech fests.',
    lead: 'Mr. S. Krishna (CS Head)',
    schedule: 'Wednesdays & Fridays, 3:30 PM - 5:00 PM',
    members: '45+ Active Students'
  },
  {
    id: 'club-2',
    emoji: '⚽',
    title: 'Athletics & Sports Academy',
    desc: 'Coordinates rigorous coaching schedules in basketball, football, volleyball, and track events. Leads teams to municipal, state, and national institution championships.',
    lead: 'Coach B. R. Prasad (P.E. Director)',
    schedule: 'Mondays, Tuesdays & Thursdays, 7:00 AM - 8:30 AM',
    members: '80+ Enrolled Athletes'
  },
  {
    id: 'club-3',
    emoji: '🎨',
    title: 'Creative Arts & Music Ensemble',
    desc: 'Supports charcoal drawing, clay sculpting, oil painting, and vocal/instrumental training. Hosts the Annual Art Gallery and cultural stage plays during institution festivals.',
    lead: 'Mrs. H. Nalini (Art & Drama Lead)',
    schedule: 'Tuesdays & Wednesdays, 3:30 PM - 4:45 PM',
    members: '50+ Young Creators'
  },
  {
    id: 'club-4',
    emoji: '🗣️',
    title: 'Literary & Debating Society',
    desc: 'Enhances public speaking, logical structuring, content writing, and analytical reading. Conducts mock parliaments, spelling bee contests, and edits the annual SVES magazine.',
    lead: 'Mrs. K. Suma (English Faculty)',
    schedule: 'Thursdays, 3:30 PM - 5:00 PM',
    members: '30+ Speech Scholars'
  }
]

export default function Academics() {
  const [activeClub, setActiveClub] = useState(null)

  const toggleClub = (id) => {
    if (activeClub === id) {
      setActiveClub(null)
    } else {
      setActiveClub(id)
    }
  }

  return (
    <main>
      {/* Page Header Banner */}
      <section className="academics-hero">
        <div className="container">
          <h1>Academics at SVES</h1>
          <p>Explore our curriculum structure, interactive teaching methods, and active co-curricular clubs.</p>
        </div>
      </section>

      {/* Curriculum Divisions */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title center">Our Curricular Divisions</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>
              We follow a comprehensive academic structure that aligns with modern learning standards, preparing students for board exams and global universities.
            </p>
          </div>

          <div className="curriculum-grid">
            {CURRICULUM.map((curr, idx) => (
              <div key={idx} className="curriculum-card">
                <span className="curriculum-icon">{curr.icon}</span>
                <h3>{curr.title}</h3>
                <div className="curriculum-grades">{curr.grades}</div>
                <p>{curr.desc}</p>
                <ul className="curriculum-subjects">
                  {curr.subjects.map((sub, sIdx) => (
                    <li key={sIdx}>{sub}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching Methodology */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-cream)' }}>
        <div className="container">
          <div className="text-center">
            <h2 className="section-title center">Interactive Teaching Methodology</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto 3rem auto' }}>
              Our pedagogical philosophy is centered around active engagement, scientific inquiry, and developing real-world skills.
            </p>
          </div>

          <div className="method-grid">
            {METHODS.map((method, idx) => (
              <div key={idx} className="method-card">
                <div className="method-num">{method.num}</div>
                <div className="method-info">
                  <h3>{method.title}</h3>
                  <p>{method.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Co-Curricular Clubs Accordion */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title center">Co-Curricular Clubs</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>
              Education at SVES extends beyond the classroom. Click on any club below to explore the student-run initiatives and schedules.
            </p>
          </div>

          <div className="accordion-wrapper">
            {CLUBS.map((club) => (
              <div 
                key={club.id} 
                className={`accordion-item ${activeClub === club.id ? 'active' : ''}`}
              >
                <button 
                  className="accordion-header"
                  onClick={() => toggleClub(club.id)}
                  aria-expanded={activeClub === club.id}
                >
                  <div className="accordion-title-block">
                    <span className="accordion-title-icon">{club.emoji}</span>
                    <span className="accordion-title">{club.title}</span>
                  </div>
                  <span className="accordion-chevron">▼</span>
                </button>
                <div className="accordion-content">
                  <div className="accordion-content-inner">
                    <div className="accordion-details">
                      <p>{club.desc}</p>
                    </div>
                    <div className="accordion-meta">
                      <div className="meta-row">
                        <span className="meta-label">Club Advisor:</span>
                        <span className="meta-value">{club.lead}</span>
                      </div>
                      <div className="meta-row">
                        <span className="meta-label">Schedule:</span>
                        <span className="meta-value">{club.schedule}</span>
                      </div>
                      <div className="meta-row">
                        <span className="meta-label">Enrollment:</span>
                        <span className="meta-value">{club.members}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
