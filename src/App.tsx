import { useState, useCallback } from 'react'
import { LoadingScreen } from './components/loading/LoadingScreen'
import { Navbar } from './components/layout/Navbar'
import { HeroSection } from './components/sections/HeroSection'
import { ImmersiveDemo } from './components/sections/ImmersiveDemo'
import { TerminalPowerSection } from './components/sections/TerminalPowerSection'
import { LayoutsSection } from './components/sections/LayoutsSection'
import { FocusModeSection } from './components/sections/FocusModeSection'
import { FeaturesGrid } from './components/sections/FeaturesGrid'
import { CTASection } from './components/sections/CTASection'
import { Footer } from './components/sections/Footer'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const onComplete = useCallback(() => setLoaded(true), [])

  return (
    <>
      <LoadingScreen onComplete={onComplete} />
      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s ease' }}>
        <Navbar />
        <main>
          <HeroSection />
          <ImmersiveDemo />
          <TerminalPowerSection />
          <LayoutsSection />
          <FocusModeSection />
          <FeaturesGrid />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  )
}
