import { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const PrivacyPolicy = () => {
    useSEO({
        title: "Privacy Policy",
        description: "Read AQRO's privacy policy. Learn how we collect, use, and protect your personal information when you use our digital services.",
        canonical: "https://aqro.in/privacy"
    });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className="bg-black min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <div className="pt-32 pb-16 container mx-auto px-6 text-center relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
                <h1 className="relative text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent mb-6">
                    Privacy Policy
                </h1>
                <p className="relative text-xl text-gray-400 max-w-2xl mx-auto">
                    Last updated: December 29, 2025
                </p>
            </div>

            {/* Content */}
            <section className="py-16 container mx-auto px-6 max-w-4xl">
                <div className="prose prose-invert prose-lg max-w-none space-y-8">
                    <div className="p-8 glass-card rounded-2xl border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
                        <p className="text-gray-400 leading-relaxed">
                            We collect information you provide directly to us, such as when you fill out our contact form, request a quote, or communicate with us. This may include your name, email address, phone number, and any other information you choose to provide.
                        </p>
                    </div>

                    <div className="p-8 glass-card rounded-2xl border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
                        <p className="text-gray-400 leading-relaxed mb-4">We use the information we collect to:</p>
                        <ul className="list-disc list-inside text-gray-400 space-y-2">
                            <li>Respond to your inquiries and provide customer support</li>
                            <li>Send you project updates and relevant communications</li>
                            <li>Improve our services and website experience</li>
                            <li>Comply with legal obligations</li>
                        </ul>
                    </div>

                    <div className="p-8 glass-card rounded-2xl border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4">3. Information Sharing</h2>
                        <p className="text-gray-400 leading-relaxed">
                            We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as necessary to provide our services or as required by law. We may share information with trusted service providers who assist us in operating our website and conducting our business.
                        </p>
                    </div>

                    <div className="p-8 glass-card rounded-2xl border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
                        <p className="text-gray-400 leading-relaxed">
                            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
                        </p>
                    </div>

                    <div className="p-8 glass-card rounded-2xl border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4">5. Cookies</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Our website may use cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, though this may affect some functionality of our website.
                        </p>
                    </div>

                    <div className="p-8 glass-card rounded-2xl border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights</h2>
                        <p className="text-gray-400 leading-relaxed mb-4">You have the right to:</p>
                        <ul className="list-disc list-inside text-gray-400 space-y-2">
                            <li>Access the personal information we hold about you</li>
                            <li>Request correction of inaccurate information</li>
                            <li>Request deletion of your personal information</li>
                            <li>Opt-out of marketing communications</li>
                        </ul>
                    </div>

                    <div className="p-8 glass-card rounded-2xl border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4">7. Contact Us</h2>
                        <p className="text-gray-400 leading-relaxed">
                            If you have any questions about this Privacy Policy, please contact us at{' '}
                            <a href="mailto:ceo@aqro.in" className="text-primary hover:text-white transition-colors">ceo@aqro.in</a>
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 bg-black border-t border-white/5 mt-auto">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <img src="/Logo/aqro-logo.png" alt="AQRO" className="h-6 opacity-70 grayscale hover:grayscale-0 transition-all" />
                        <span className="text-gray-500 text-sm">© 2026 AQRO. All rights reserved.</span>
                    </div>
                    <div className="flex gap-6 text-gray-500 text-sm">
                        <Link to="/" className="hover:text-white transition-colors">Home</Link>
                        <Link to="/about" className="hover:text-white transition-colors">About</Link>
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PrivacyPolicy;
