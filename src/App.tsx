import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import AnimatedShaderHero from "@/components/ui/animated-shader-hero";
import { FeaturesSectionWithHoverEffects } from "@/components/ui/feature-section-with-hover-effects";
import ServicesSection from "@/components/ui/services-section";
import StepperFooter from "@/components/StepperFooter";
import OurWorks from "@/pages/OurWorks";
import WebDevelopment from "@/pages/Services/WebDevelopment";
import VideoEditing from "@/pages/Services/VideoEditing";
import AiAds from "@/pages/Services/AiAds";
import AboutUs from "@/pages/AboutUs";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsConditions from "@/pages/TermsConditions";

const HomePage = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-transparent min-h-screen text-foreground font-sans selection:bg-white selection:text-primary">
      <Navbar />

      <AnimatedShaderHero
        trustBadge={{
          text: "Powered by AI + Design",
          icons: ["✨", "🎨"]
        }}
        headline={{
          text: "Built Different.",
          highlightText: "Built Right."
        }}
        subtitle="India's leading AI-powered digital marketing agency crafting viral social media content."
        buttons={{
          primary: {
            text: "Start a Project",
            onClick: () => scrollToSection('contact')
          },
          secondary: {
            text: "View Services",
            onClick: () => scrollToSection('services')
          }
        }}
        className="max-h-[100vh]"
      />

      {/* Black Tint Overlay - This is handled inside animated-shader-hero.tsx now */}

      {/* Feature Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6 mb-12">
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent text-center">
            Why Choose AQRO?
          </h2>
        </div>
        <FeaturesSectionWithHoverEffects />
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-black relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
              <img
                src="/Logo/2.png"
                alt="About AQRO"
                className="rounded-2xl shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                About AQRO
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed">
                AQRO is a technology-driven digital studio specializing in AI-powered marketing, web development, mobile app development, and SaaS product engineering. We help startups and growing businesses design, build, and scale high-performance digital products with speed and clarity.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                What started as an AI-first digital advertising agency has evolved into a full-stack product and growth partner. AQRO combines strategic thinking, clean design, and modern engineering to deliver solutions that are scalable, secure, and conversion-focused.
              </p>
              <div className="pt-4">
                <p className="text-white border-l-4 border-primary pl-4 italic">
                  "We don’t just build products — we solve real business problems using technology, data, and intelligent automation."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services">
        <ServicesSection 
          title="Our Expertise" 
          subtitle="Everything you need to grow your digital presence, under one roof."
        />
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-black relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Ready to Scale?</h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Every solution is designed to be lean, future-ready, and aligned with measurable outcomes.
          </p>

          {/* Stepper Form */}
          <StepperFooter />

          <div className="mt-12 text-gray-500 text-sm">
            Or email us directly at <a href="mailto:ceo@aqro.in" className="text-primary hover:text-white transition-colors">ceo@aqro.in</a>
          </div>

          <div className="mt-20 flex justify-center opacity-50 hover:opacity-100 transition-opacity">
            {/* Logo removed */}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <img src="/Logo/aqro-logo.png" alt="AQRO" className="h-6 opacity-70 grayscale hover:grayscale-0 transition-all" />
            <span className="text-gray-500 text-sm">© 2026 AQRO. All rights reserved.</span>
          </div>
          <div className="flex gap-6 text-gray-500 text-sm">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <Link to="/works" className="hover:text-white transition-colors">Our Works</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/works" element={<OurWorks />} />
        <Route path="/services/web" element={<WebDevelopment />} />
        <Route path="/services/video-editing" element={<VideoEditing />} />
        <Route path="/services/ai-ads" element={<AiAds />} />
        <Route path="/services/creatives" element={<OurWorks />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsConditions />} />
      </Routes>
    </Router>
  );
}

export default App;
