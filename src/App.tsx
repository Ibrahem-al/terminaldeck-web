import { useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import { DonationModal } from './components/donation/DonationModal'
import { useDonationModal } from './hooks/useDonationModal'
import { PrivacyPolicy } from './pages/PrivacyPolicy'
import { TermsOfService } from './pages/TermsOfService'
import { Eula } from './pages/Eula'
import { DonatePage } from './pages/DonatePage'

function LandingPage() {
  const [loaded, setLoaded] = useState(false)
  const onComplete = useCallback(() => setLoaded(true), [])
  const { isOpen, interceptDownload, dismiss, closeForDonation } = useDonationModal()

  return (
    <>
      <LoadingScreen onComplete={onComplete} />
      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s ease' }}>
        <Navbar />
        <main>
          <HeroSection onDownloadClick={interceptDownload} />
          <ImmersiveDemo />
          <TerminalPowerSection />
          <LayoutsSection />
          <FocusModeSection />
          <FeaturesGrid />
          <CTASection onDownloadClick={interceptDownload} />
        </main>
        <Footer />
      </div>
      <DonationModal isOpen={isOpen} onDismiss={dismiss} onDonate={closeForDonation} />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/eula" element={<Eula />} />
        <Route path="/donate" element={<DonatePage />} />
      </Routes>
    </BrowserRouter>
  )
}
