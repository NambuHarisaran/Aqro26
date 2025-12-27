import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import AnimatedShaderHero from "@/components/ui/animated-shader-hero";
import { FeaturesSectionWithHoverEffects } from "@/components/ui/feature-section-with-hover-effects";
import StepperFooter from "@/components/StepperFooter";
import OurWorks from "@/pages/OurWorks";
import WebDevelopment from "@/pages/Services/WebDevelopment";
import VideoEditing from "@/pages/Services/VideoEditing";
import AiAds from "@/pages/Services/AiAds";

const SERVICE_ICONS = {
  marketing: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
    </svg>
  ),
  web: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  mobile: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  saas: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
  design: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
  automation: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
};

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
          text: "We Build for",
          highlightText: "Attention"
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
      <section id="services" className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Our Expertise</h2>
            <p className="text-gray-400">Everything you need to grow your digital presence, under one roof.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "AI-driven Marketing", desc: "Performance advertising and intelligent marketing automation.", icon: SERVICE_ICONS.marketing },
              { title: "Web Development", desc: "Modern websites and web applications built for speed.", icon: SERVICE_ICONS.web },
              { title: "Mobile Apps", desc: "Native and cross-platform Android & iOS applications.", icon: SERVICE_ICONS.mobile },
              { title: "SaaS Engineering", desc: "Custom product development for scalable solutions.", icon: SERVICE_ICONS.saas },
              { title: "UI/UX Design", desc: "User-centric design focused on experience and conversion.", icon: SERVICE_ICONS.design },
              { title: "Tech Automation", desc: "Growth-focused technology solutions and process automation.", icon: SERVICE_ICONS.automation },
            ].map((service, idx) => (
              <div key={idx} className="group p-8 glass-card rounded-2xl border border-white/10 hover:border-primary/50 transition-all duration-300">
                <div className="mb-6 p-3 bg-white/10 rounded-lg w-fit group-hover:bg-primary/20 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
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
            <Link to="/works" className="hover:text-white transition-colors">Our Works</Link>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
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
        <Route path="/works" element={<OurWorks />} />
        <Route path="/services/web" element={<WebDevelopment />} />
        <Route path="/services/video-editing" element={<VideoEditing />} />
        <Route path="/services/ai-ads" element={<AiAds />} />
        <Route path="/services/creatives" element={<OurWorks />} />
      </Routes>
    </Router>
  );
}

export default App;
