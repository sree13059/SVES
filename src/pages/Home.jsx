import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiUrl } from '../lib/api'
import './Home.css'

const HERO_SLIDES = [
  {
    tagline: 'Welcome to SVES Institutions',
    title: 'Nurturing Minds, Shaping Bright Futures',
    desc: 'Empowering students to achieve academic excellence, moral integrity, and leadership values across the SVES network of institutions.',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1600',
  },
  {
    tagline: 'Academic Excellence',
    title: 'Inspiring Innovation & Practical Learning',
    desc: 'State-of-the-art laboratory facilities, smart classrooms, and personalized mentorship to bring out the best in every student.',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1600',
  },
  {
    tagline: 'Holistic Development',
    title: 'Beyond Classrooms: Sports, Arts & Leadership',
    desc: 'Encouraging physical health, creative expression, and teamwork through championship-grade sports and cultural programs.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1600',
  }
]

const STATS = [
  { value: '1500+', label: 'Students Enrolled' },
  { value: '95+', label: 'Expert Educators' },
  { value: '25+', label: 'Co-Curricular Clubs' },
  { value: '100%', label: 'Academic Success' }
]

const VALUES = [
  {
    icon: '✨',
    title: 'Academic Excellence',
    desc: 'Rigorous curriculum designed to build deep critical thinking, scientific inquiry, and creative problem-solving skills.'
  },
  {
    icon: '🤝',
    title: 'Moral Integrity',
    desc: 'Instilling strong values of honesty, respect, empathy, and social responsibility in our future leaders.'
  },
  {
    icon: '🚀',
    title: 'Holistic Development',
    desc: 'Fostering growth in sports, music, visual arts, and literary pursuits alongside traditional education.'
  },
  {
    icon: '👑',
    title: 'Leadership Qualities',
    desc: 'Providing platforms for students to lead initiatives, take responsibilities, and drive positive changes.'
  }
]

const TESTIMONIALS = [
  {
    quote: 'SVES has been instrumental in shaping my child\'s confidence and academic growth. The teachers go above and beyond to support individual learning needs. The holistic environment is truly outstanding.',
    name: 'Mrs. Priya Sharma',
    role: 'Parent of Grade 9 Student',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150'
  },
  {
    quote: 'The scientific exposure, advanced computer labs, and debate clubs at SVES helped me discover my true potential. The values I learned here continue to guide my career path in software engineering.',
    name: 'Rahul Hegde',
    role: 'Alumnus (Batch of 2021)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
  },
  {
    quote: 'As a parent, I am highly impressed by how SVES balances sports training with academic rigor. The campus is vibrant, safe, and modern, and the values taught are exemplary.',
    name: 'Mr. Rajesh Kumar',
    role: 'Parent of Grade 6 Athlete',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
  }
]

const DEFAULT_UPCOMING_EVENTS = [
  {
    day: '15',
    month: 'JUL',
    title: 'Annual Science Exhibition 2026',
    desc: 'Students showcase working science models, programming projects, and green energy innovations. Open to public.',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=400'
  },
  {
    day: '08',
    month: 'AUG',
    title: 'Inter-Institution Athletics Meet',
    desc: 'SVES hosts the regional athletics tournament featuring track, high jump, basketball, and football championships across its branches.',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=400'
  },
  {
    day: '22',
    month: 'SEP',
    title: 'Admissions Seminar & Campus Tour',
    desc: 'Meet our Principal and academic heads, experience classrooms first-hand, and explore academic scholarships.',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=400'
  }
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [upcomingEvents, setUpcomingEvents] = useState(DEFAULT_UPCOMING_EVENTS)

  // Auto-slide hero
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(apiUrl('/events'))
        if (response.ok) {
          const events = await response.json()
          if (events.length > 0) {
            setUpcomingEvents(events)
          }
        }
      } catch (err) {
          console.error('Error fetching institution events:', err)
        }
    }

    fetchEvents()
  }, [])

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % HERO_SLIDES.length)
  }

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
  }

  const nextTestimonial = () => {
    setCurrentTestimonial((currentTestimonial + 1) % TESTIMONIALS.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((currentTestimonial - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  }

  return (
    <main>
      {/* Hero Banner Slider */}
      <section className="hero-slider">
        {HERO_SLIDES.map((slide, idx) => (
          <div key={idx} className={`hero-slide ${idx === currentSlide ? 'active' : ''}`}>
            <img src={slide.image} alt={slide.title} className="hero-bg" />
            <div className="hero-content">
              <div className="hero-text-col">
                <span className="hero-tagline">{slide.tagline}</span>
                <h1 className="hero-title">{slide.title}</h1>
                <p className="hero-desc">{slide.desc}</p>
                <div className="hero-actions">
                  <Link to="/admissions" className="btn btn-accent">Apply Today</Link>
                  <Link to="/facilities" className="btn btn-outline-white">Explore Campus</Link>
                </div>
              </div>
              
              <div className="hero-poster-col">
                <div className="banner-poster">
                  <div className="poster-badge">Admissions Open 2026-27</div>
                  <h4 className="poster-title">Shaping Leaders of Tomorrow</h4>
                  <p className="poster-tagline">Unlock your potential by joining the SVES network of premier educational institutions.</p>
                  <div className="poster-highlights">
                    <div className="highlight-item">
                      <span className="highlight-icon">🏆</span>
                      <span>Top-tier placements with 100% assistance</span>
                    </div>
                    <div className="highlight-item">
                      <span className="highlight-icon">🔬</span>
                      <span>State-of-the-art labs and smart classrooms</span>
                    </div>
                    <div className="highlight-item">
                      <span className="highlight-icon">🎓</span>
                      <span>Merit-based scholarships up to 50%</span>
                    </div>
                  </div>
                  <Link to="/admissions#enquiry-form" className="btn btn-accent poster-btn">
                    Apply Online Now <span className="btn-arrow">➔</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Controls */}
        <button className="slider-arrow arrow-prev" onClick={prevSlide} aria-label="Previous slide">◀</button>
        <button className="slider-arrow arrow-next" onClick={nextSlide} aria-label="Next slide">▶</button>

        <div className="slider-dots">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              className={`slider-dot ${idx === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Quick Statistics Counter Board */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {STATS.map((stat, idx) => (
              <div key={idx} className="stat-card">
                <div className="stat-number">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Welcome Message Section */}
      <section className="section-padding">
        <div className="container">
          <div className="welcome-grid">
            <div className="welcome-img-wrapper">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
                alt="SVES Principal Welcoming"
                className="welcome-img"
              />
            </div>
            <div className="welcome-content">
              <span className="hero-tagline" style={{ color: 'var(--accent-dark)', margin: 0 }}>Message from the Principal</span>
              <h2 className="welcome-title section-title">Welcome to Sri Veerabhadra Educational Society (SVES)</h2>
              <p className="welcome-text">
                At SVES, we believe that education is not merely the acquisition of knowledge but a lifelong journey of self-discovery and transformation. Guided by our founders' noble visions, our institution network seeks to blend academic rigor with ethical values, preparing learners for a rapidly shifting world. SVES operates multiple institutions and branches across the region, each offering campus-specific programs while maintaining shared values and academic standards.
              </p>
              <div className="welcome-quote">
                "Our mission is to create a dynamic learning environment that inspires curiosity, fosters moral fortitude, and empowers every child to be an empathetic leader."
              </div>
              <div className="welcome-signature">
                <span className="sig-name">Dr. S. Veerabhadra</span>
                <span className="sig-title">Principal, SVES Educational Academy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-cream)' }}>
        <div className="container">
          <div className="text-center">
            <h2 className="section-title center">Our Core Pillars</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto 3rem auto' }}>
              We lay a firm foundation for young learners based on core values that shape balanced characters and competitive minds.
            </p>
          </div>

          <div className="values-grid">
            {VALUES.map((val, idx) => (
              <div key={idx} className="value-card">
                <span className="value-icon">{val.icon}</span>
                <h3>{val.title}</h3>
                <p>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Slideshow */}
      <section className="section-padding testimonials-section">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title center">What Our Community Says</h2>
          </div>

          <div className="testimonial-container">
            {TESTIMONIALS.map((test, idx) => (
              <div key={idx} className={`testimonial-card ${idx === currentTestimonial ? 'active' : ''}`}>
                <p className="testimonial-quote">{test.quote}</p>
                <div className="testimonial-author">
                  <img src={test.avatar} alt={test.name} className="author-img" />
                  <div className="author-info">
                    <div className="author-name">{test.name}</div>
                    <div className="author-role">{test.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="testimonials-arrows">
            <button className="testimonial-btn" onClick={prevTestimonial} aria-label="Previous testimonial">◀</button>
            <button className="testimonial-btn" onClick={nextTestimonial} aria-label="Next testimonial">▶</button>
          </div>
        </div>
      </section>

      {/* Upcoming School Events */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title center">Upcoming Events</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto 3rem auto' }}>
              Explore what is happening on our active campus. Join our open seminars, science exhibitions, and track meets.
            </p>
          </div>

          <div className="home-events-grid">
            {upcomingEvents.map((event, idx) => (
              <div key={idx} className="event-card">
                <div className="event-img-wrapper">
                  <img src={event.image} alt={event.title} className="event-img" />
                  <div className="event-date-badge">
                    <span style={{ display: 'block', fontSize: '1.25rem' }}>{event.day}</span>
                    <span>{event.month}</span>
                  </div>
                </div>
                <div className="event-content">
                  <h3>{event.title}</h3>
                  <p>{event.desc}</p>
                  <Link to="/contact" className="event-link">
                    Register Interest <span>➔</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
