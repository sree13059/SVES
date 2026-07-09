import './About.css'

const LEADERS = [
  {
    name: 'Sri S. Veerabhadra',
    role: 'Founder & Chairman',
    bio: 'A visionary educationalist with over 30 years of commitment to social development and raising academic standards across rural and urban communities.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300'
  },
  {
    name: 'Mrs. V. Saraswathi',
    role: 'Academic Director',
    bio: 'An expert administrator holds a Master\'s in Child Psychology. She pioneers interactive training methods and student-centric academic plans.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300'
  },
  {
    name: 'Dr. S. Veerabhadra Jr.',
    role: 'Principal & Correspondent',
    bio: 'Dedicated scientist and educational manager, directing the integration of scientific inquiry, lab practicals, and ethical values in institution culture.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300'
  }
]

const FACILITIES = [
  {
    title: 'Modern Science Lab',
    desc: 'Equipped with chemical stations, physical setups, and biology tools to inspire exploration and laboratory safety.',
    image: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=300'
  },
  {
    title: 'Digital Smart Classrooms',
    desc: 'Fitted with visual screens, collaborative boards, and high-speed connections for interactive modern lectures.',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=300'
  },
  {
    title: 'Centralized Library',
    desc: 'Home to thousands of encyclopedias, children literature, research volumes, and silent online study terminals.',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=300'
  },
  {
    title: 'Indoor & Outdoor Sports',
    desc: 'Basketball courts, athletics fields, and indoor chess/gymnastic rooms directed by trained coach staff.',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=300'
  }
]

export default function About() {
  return (
    <main>
      {/* Page Header Banner */}
      <section className="about-hero">
        <div className="container">
          <h1>About SVES</h1>
          <p>Discover our heritage, core philosophy, leaders, and the campus environment built for growth.</p>
        </div>
      </section>

      {/* History / Founding Story */}
      <section className="section-padding">
        <div className="container">
          <div className="history-grid">
            <div className="history-content">
              <span className="hero-tagline" style={{ color: 'var(--accent-dark)', margin: 0 }}>Our History</span>
              <h2 className="section-title">The Journey of Sri Veerabhadra Educational Society</h2>
              <p>
                Sri Veerabhadra Educational Society (SVES) was established with a singular, noble mission: to democratize high-quality education, making modern learning facilities accessible and affordable. Founded on principles of community empowerment, the society began its journey with a small classroom cluster and has since grown into a premier educational hub.
              </p>
              <p>
                Over the decades, SVES has consistently adapted to global educational advancements. By combining conventional moral values with modern computer-aided instruction, we have successfully nurtured generations of scholars, innovators, and leaders who excel worldwide.
              </p>
            </div>
            <div className="history-img-wrapper">
              <img
                src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80"
                alt="University Campus"
                className="history-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Statements */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-cream)' }}>
        <div className="container">
          <div className="vision-mission-grid">
            <div className="vision-card">
              <span className="card-icon">👁️</span>
              <h3 className="section-title">Our Vision</h3>
              <p>
                To emerge as a benchmark institution of global repute, where young minds are nurtured into competent, socially sensitive, and morally upright citizens who lead with compassion and scientific temper.
              </p>
            </div>
            <div className="mission-card">
              <span className="card-icon">🎯</span>
              <h3 className="section-title">Our Mission</h3>
              <p>
                To offer a dynamic, safe, and collaborative learning environment that combines academic vigor with practical problem-solving. We strive to provide equal opportunities for holistic growth in academics, technology, leadership, arts, and physical education.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Profile */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title center">Leadership & Administration</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>
              Meet the educational guides and visionary leaders steering Sri Veerabhadra Educational Society towards new frontiers.
            </p>
          </div>

          <div className="leaders-grid">
            {LEADERS.map((leader, idx) => (
              <div key={idx} className="leader-card">
                <div className="leader-img-wrapper">
                  <img src={leader.image} alt={leader.name} className="leader-img" />
                </div>
                <div className="leader-info">
                  <h3 className="leader-name">{leader.name}</h3>
                  <div className="leader-role">{leader.role}</div>
                  <p className="leader-bio">{leader.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Infrastructure */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-cream)' }}>
        <div className="container">
          <div className="text-center">
            <h2 className="section-title center">World-Class Infrastructure</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>
              We provide a safe, modern, and inspiring environment designed to facilitate interactive learning and experimentation.
            </p>
          </div>

          <div className="facilities-grid">
            {FACILITIES.map((facility, idx) => (
              <div key={idx} className="facility-card">
                <div className="facility-img-wrapper">
                  <img src={facility.image} alt={facility.title} className="facility-img" />
                </div>
                <div className="facility-info">
                  <h3>{facility.title}</h3>
                  <p>{facility.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
