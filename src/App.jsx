import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Academics from './pages/Academics'
import Admissions from './pages/Admissions'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Departments from './pages/Departments'
import ExaminationCell from './pages/ExaminationCell'
import Placements from './pages/Placements'
import Facilities from './pages/Facilities'
import Faculties from './pages/Faculties'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/examination-cell" element={<ExaminationCell />} />
        <Route path="/placements" element={<Placements />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/faculties" element={<Faculties />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
