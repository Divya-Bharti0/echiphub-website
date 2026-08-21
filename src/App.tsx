import { useState } from 'react'
import CourseCatalog from './components/CourseCatalog.tsx'
import DisclaimerModal from './components/DisclaimerModal.tsx'
import Footer from './components/Footer.tsx'
import { Hero } from './components/Hero.tsx'
import LearningPaths from './components/LearningPaths.tsx'
import Marquee from './components/Marquee.tsx'
import Navbar from './components/Navbar.tsx'
import { Collaborations, Gallery, Highlights, OpenSource, Programs, Stats } from './components/Sections.tsx'

export default function App() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="min-h-screen antialiased bg-[#f6f8fc]">
      <Navbar onRegister={() => setModalOpen(true)} />

      <main>
        <Marquee />
        <Hero />
        <Stats />
        <CourseCatalog modalOpen={modalOpen} />
        <LearningPaths />
        <Highlights />
        <OpenSource />
        <Programs />
        <Collaborations />
        <Gallery />
      </main>

      <Footer />
      <DisclaimerModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}