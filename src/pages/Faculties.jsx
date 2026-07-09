import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { apiUrl, getAssetUrl } from '../lib/api'
import './Faculties.css'

const FALLBACK_FACULTY_MEMBERS = [
  {
    name: 'Dr. S. Veerabhadra Jr.',
    role: 'Principal & Correspondent',
    department: 'Administration',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150',
    bio: 'Ph.D in Education Administration. Over 20 years guiding collegiate excellence and society expansion.'
  },
  {
    name: 'Mrs. V. Saraswathi',
    role: 'Academic Director',
    department: 'Administration',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    bio: 'Post Graduate in Engineering (CSE). Directs educational curriculum, teacher integrations, and branch standards.'
  },
  {
    name: 'Mr. S. Krishna',
    role: 'Head of CSE & IT',
    department: 'Engineering Faculty',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    bio: 'M.Tech in CS. Specialized in Robotics, Web Standards, and Distributed Database Architectures.'
  },
  {
    name: 'Mrs. K. Suma',
    role: 'Senior English Literature Faculty',
    department: 'Degree Faculty',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    bio: 'M.A in English Literature. Promotes communication programs, debate societies, and inter-collegiate public speaking.'
  },
  {
    name: 'Coach B. R. Prasad',
    role: 'Physical Education Director',
    department: 'Intermediate Faculty',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    bio: 'Master of Physical Education (M.P.Ed). Trains district-level track teams and leads indoor basketball coaching.'
  },
  {
    name: 'Mrs. H. Nalini',
    role: 'Fine Arts Coordinator',
    department: 'PG Faculty',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    bio: 'Graduate in Fine Arts. Coordinates annual design displays, crafts seminars, and stage setup layouts.'
  }
]

const DEFAULT_AVATAR = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23a0aec0'><rect width='100%' height='100%' fill='%23e2e8f0'/><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/></svg>";

const handleImageError = (e) => {
  e.target.src = DEFAULT_AVATAR;
};

export default function Faculties() {
  const { hash } = useLocation()
  const [faculties, setFaculties] = useState(FALLBACK_FACULTY_MEMBERS)

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await fetch(apiUrl('/employees'))
        if (response.ok) {
          const data = await response.json()
          if (data && data.length > 0) {
            // Filter to show only faculties/academic/administration staff
            const filtered = data.filter(emp => 
              emp.department && 
              (emp.department.includes('Faculty') || emp.department === 'Administration')
            )
            // Sort by SVES ID or role to match a logical ordering
            filtered.sort((a, b) => a.id.localeCompare(b.id))
            setFaculties(filtered)
          }
        }
      } catch (err) {
        console.error('Error fetching dynamic faculties, falling back to static roster:', err)
      }
    }
    fetchFaculties()
  }, [])

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''))
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }
  }, [hash, faculties])

  // Group faculties by department
  const groupFacultiesByDept = (facultyList) => {
    const groups = {};
    const deptMapping = {
      'Administration': 'Administration & Leadership',
      'Engineering Faculty': 'Engineering Faculty',
      'SVES Engineering College Faculty': 'Engineering Faculty',
      'Degree Faculty': 'Degree College Faculty',
      'SVES Degree College Faculty': 'Degree College Faculty',
      'Intermediate Faculty': 'Intermediate Faculty',
      'SVES Intermediate College Faculty': 'Intermediate Faculty',
      'PG Faculty': 'Postgraduate Faculty',
      'SVES Postgraduate College Faculty': 'Postgraduate Faculty',
      'SVES Medical College Faculty': 'Medical College Faculty',
      'SVES Medical college Faculty': 'Medical College Faculty',
      'SVES Polytechnic College Faculty': 'Polytechnic College Faculty',
      'Polytechnic Faculty': 'Polytechnic College Faculty'
    };

    facultyList.forEach(fac => {
      const dept = fac.department || fac.dept || 'Other Faculty';
      const mapped = deptMapping[dept] || dept;
      if (!groups[mapped]) {
        groups[mapped] = [];
      }
      groups[mapped].push(fac);
    });
    return groups;
  };

  const DEPARTMENT_ORDER = [
    'Administration & Leadership',
    'Engineering Faculty',
    'Postgraduate Faculty',
    'Degree College Faculty',
    'Medical College Faculty',
    'Intermediate Faculty',
    'Polytechnic College Faculty'
  ];

  const groupedFaculties = groupFacultiesByDept(faculties);
  const sortedDepts = Object.keys(groupedFaculties).sort((a, b) => {
    const indexA = DEPARTMENT_ORDER.indexOf(a);
    const indexB = DEPARTMENT_ORDER.indexOf(b);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.localeCompare(b);
  });

  const [activeDeptTab, setActiveDeptTab] = useState('');

  useEffect(() => {
    if (sortedDepts.length > 0 && !activeDeptTab) {
      setActiveDeptTab(sortedDepts[0]);
    }
  }, [sortedDepts, activeDeptTab]);

  return (
    <main className="faculty-page">
      {/* Hero */}
      <section className="faculty-hero">
        <div className="container">
          <h1>Expert Faculty & Leadership</h1>
          <p>Meet our leading academic minds and coordinators committed to shaping SVES institutions as benchmarks of educational distinction.</p>
        </div>
      </section>

      {/* Faculty Directory */}
      <section id="directory" className="section-padding">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title center">Academic Leaders & Coordinators</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto 3.5rem auto', color: 'var(--text-muted)' }}>
              SVES brings together veteran doctorates, subject matter experts, and research leaders across our pre-university and higher collegiate channels.
            </p>
          </div>

          {/* Tab Navigation */}
          {sortedDepts.length > 0 && (
            <div className="records-tabs">
              {sortedDepts.map((deptName) => (
                <button
                  key={deptName}
                  className={`record-tab-btn ${activeDeptTab === deptName ? 'active' : ''}`}
                  onClick={() => setActiveDeptTab(deptName)}
                >
                  {deptName}
                </button>
              ))}
            </div>
          )}

          {/* Active Department Grid */}
          {activeDeptTab && groupedFaculties[activeDeptTab] && (
            <div className="dept-section">
              <h3 className="dept-title">{activeDeptTab}</h3>
              <div className="faculty-members-grid">
                {groupedFaculties[activeDeptTab].map((fac, idx) => (
                  <div key={idx} className="faculty-member-card">
                    <div className="fac-avatar-wrapper">
                      <img 
                        src={fac.avatar ? getAssetUrl(fac.avatar) : DEFAULT_AVATAR} 
                        alt={fac.name} 
                        className="fac-avatar" 
                        onError={handleImageError}
                      />
                      <span className="fac-dept-badge">{fac.department || fac.dept}</span>
                    </div>
                    <div className="fac-details">
                      <h3>{fac.name}</h3>
                      <div className="fac-role">{fac.role}</div>
                      <p className="fac-bio">{fac.bio || `${fac.name} serves as ${fac.role} in the ${fac.department || fac.dept} department.`}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

    </main>
  )
}
