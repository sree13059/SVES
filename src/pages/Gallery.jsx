import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { apiUrl } from '../lib/api'
import './Gallery.css'

const GALLERY_IMAGES = [
  // College Gallery
  {
    id: 1,
    category: 'college',
    title: 'Sri Veerabhadra Engineering Main Block',
    src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    category: 'college',
    title: 'SVES Degree Campus Courtyard',
    src: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    category: 'college',
    title: 'Central Library Study Corridor',
    src: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 4,
    category: 'college',
    title: 'SVES PG Block & Seminar Plaza',
    src: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=800'
  },
  
  // Lab Gallery
  {
    id: 5,
    category: 'labs',
    title: 'Advanced Robotics & Machine Learning Lab',
    src: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 6,
    category: 'labs',
    title: 'Chemistry Organic Analysis Lab',
    src: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 7,
    category: 'labs',
    title: 'Computer Science Programming Terminal',
    src: 'https://images.unsplash.com/photo-1564951434112-64d74cc2a2d7?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 8,
    category: 'labs',
    title: 'Biology Microscope Research Room',
    src: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=800'
  },

  // Sports Gallery
  {
    id: 9,
    category: 'sports',
    title: 'Inter-Institution Basketball Finals',
    src: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 10,
    category: 'sports',
    title: 'Annual Track & Field Sprint Meet',
    src: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 11,
    category: 'sports',
    title: 'NSS Outdoor Athletics Training',
    src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800'
  },

  // Cultural Gallery
  {
    id: 12,
    category: 'cultural',
    title: 'Annual Stage Play Drama Fest',
    src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 13,
    category: 'cultural',
    title: 'Acoustic Guitar & Band Performance',
    src: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 14,
    category: 'cultural',
    title: 'Fine Arts & Painting Exhibition',
    src: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800'
  }
]

export default function Gallery() {
  const { hash } = useLocation()
  const [activeTab, setActiveTab] = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [images, setImages] = useState(GALLERY_IMAGES)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(apiUrl('/gallery'))
        if (res.ok) {
          const data = await res.json()
          if (data && data.length > 0) {
            setImages(data)
          }
        }
      } catch (err) {
        console.error('Error fetching dynamic gallery images, falling back to static roster:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchGallery()
  }, [])

  // Listen to hash routes to set filter tab dynamically
  useEffect(() => {
    if (hash) {
      const category = hash.replace('#', '')
      if (['college', 'labs', 'sports', 'cultural'].includes(category)) {
        setActiveTab(category)
        closeLightbox()
      }
    }
  }, [hash])

  // Filter logic
  const filteredImages = activeTab === 'all' 
    ? images 
    : images.filter((img) => img.category === activeTab)

  const openLightbox = (index) => {
    setLightboxIndex(index)
  }

  const closeLightbox = () => {
    setLightboxIndex(null)
  }

  const nextImage = (e) => {
    e.stopPropagation()
    setLightboxIndex((prevIndex) => (prevIndex + 1) % filteredImages.length)
  }

  const prevImage = (e) => {
    e.stopPropagation()
    setLightboxIndex((prevIndex) => (prevIndex - 1 + filteredImages.length) % filteredImages.length)
  }

  return (
    <main>
      {/* Page Header Banner */}
      <section className="gallery-hero">
        <div className="container">
          <h1>Campus Gallery</h1>
          <p>Explore SVES society campus activities, technical laboratories, national track meets, and cultural exhibitions.</p>
        </div>
      </section>

      {/* Gallery Filter & Grid */}
      <section className="section-padding">
        <div className="container">
          {/* Tab buttons */}
          <div className="gallery-tabs">
            <button 
              className={`gallery-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => { setActiveTab('all'); closeLightbox(); }}
            >
              All Images
            </button>
            <button 
              className={`gallery-tab-btn ${activeTab === 'college' ? 'active' : ''}`}
              onClick={() => { setActiveTab('college'); closeLightbox(); }}
            >
              College Gallery
            </button>
            <button 
              className={`gallery-tab-btn ${activeTab === 'labs' ? 'active' : ''}`}
              onClick={() => { setActiveTab('labs'); closeLightbox(); }}
            >
              Lab Gallery
            </button>
            <button 
              className={`gallery-tab-btn ${activeTab === 'sports' ? 'active' : ''}`}
              onClick={() => { setActiveTab('sports'); closeLightbox(); }}
            >
              Sports Gallery
            </button>
            <button 
              className={`gallery-tab-btn ${activeTab === 'cultural' ? 'active' : ''}`}
              onClick={() => { setActiveTab('cultural'); closeLightbox(); }}
            >
              Cultural Gallery
            </button>
          </div>

          {/* Grid display */}
          <div className="gallery-grid">
            {filteredImages.map((img, idx) => (
              <div 
                key={img._id || img.id} 
                className="gallery-card animate-fade-in-item"
                onClick={() => openLightbox(idx)}
              >
                <div className="gallery-img-wrapper">
                  <img src={img.src} alt={img.title} className="gallery-img" loading="lazy" />
                  <div className="gallery-overlay">
                    <h3 className="gallery-card-title">{img.title}</h3>
                    <span className="gallery-card-category">{img.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Lightbox Overlay */}
      {lightboxIndex !== null && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox} aria-label="Close viewer">×</button>
            
            <button className="lightbox-arrow lightbox-prev" onClick={prevImage} aria-label="Previous image">◀</button>
            <img 
              src={filteredImages[lightboxIndex].src} 
              alt={filteredImages[lightboxIndex].title} 
              className="lightbox-img" 
            />
            <button className="lightbox-arrow lightbox-next" onClick={nextImage} aria-label="Next image">▶</button>
            
            <p className="lightbox-caption">{filteredImages[lightboxIndex].title}</p>
          </div>
        </div>
      )}
    </main>
  )
}
