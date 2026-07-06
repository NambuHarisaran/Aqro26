import { Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import AuroraBackdrop from './components/AuroraBackdrop.jsx'
import Starfield from './components/Starfield.jsx'
import SmoothScroll from './components/SmoothScroll.jsx'
import Cursor from './components/Cursor.jsx'
import Preloader from './components/Preloader.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Projects from './pages/Projects.jsx'
import Apps from './pages/Apps.jsx'
import Webpages from './pages/Webpages.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import Terms from './pages/Terms.jsx'
import NotFound from './pages/NotFound.jsx'
import TimeWalletPrivacyPolicy from './pages/TimeWalletPrivacyPolicy.jsx'
import TimeWalletDeleteAccount from './pages/TimeWalletDeleteAccount.jsx'

// Remotion (~video player) only loads when someone opens /timewallet
const TimeWalletShowcase = lazy(() => import('./pages/TimeWalletShowcase.jsx'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  const location = useLocation()

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen grain">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <AuroraBackdrop />
        <Starfield />
        <SmoothScroll />
        <Cursor />
        <Preloader />
        <ScrollProgress />
        <ScrollToTop />
        <Navbar />
        <main id="main-content" className="relative z-10">
          <AnimatePresence mode="wait">
            <Suspense fallback={null}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/apps" element={<Apps />} />
                <Route path="/webpages" element={<Webpages />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/timewallet/privacy-policy" element={<TimeWalletPrivacyPolicy />} />
                <Route path="/timewallet/delete-account" element={<TimeWalletDeleteAccount />} />
                <Route path="/timewallet" element={<TimeWalletShowcase />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
