import { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const TermsConditions = () => {
    useSEO({
        title: "Terms & Conditions",
        description: "Review AQRO's terms and conditions for using our digital services including web development, video editing, and AI advertising.",
        canonical: "https://aqro.in/terms"
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
                    Terms & Conditions
                </h1>
                <p className="relative text-xl text-gray-400 max-w-2xl mx-auto">
                    Last updated: December 29, 2025
                </p>
            </div>

            {/* Content */}
            <section className="py-16 container mx-auto px-6 max-w-4xl">
                <div className="prose prose-invert prose-lg max-w-none space-y-8">
                    <div className="p-8 glass-card rounded-2xl border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                        <p className="text-gray-400 leading-relaxed">
                            By accessing and using the AQRO website and services, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
                        </p>
                    </div>

                    <div className="p-8 glass-card rounded-2xl border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4">2. Services</h2>
                        <p className="text-gray-400 leading-relaxed">
                            AQRO provides digital marketing, web development, mobile app development, SaaS engineering, UI/UX design, and related technology services. The specific scope, deliverables, and timelines for each project will be outlined in a separate service agreement or proposal.
                        </p>
                    </div>

                    <div className="p-8 glass-card rounded-2xl border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4">3. Intellectual Property</h2>
                        <p className="text-gray-400 leading-relaxed">
                            All content on this website, including text, graphics, logos, and software, is the property of AQRO or its content suppliers and is protected by intellectual property laws. Upon full payment, clients receive ownership rights to the deliverables as specified in the project agreement.
                        </p>
                    </div>

                    <div className="p-8 glass-card rounded-2xl border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4">4. Payment Terms</h2>
                        <p className="text-gray-400 leading-relaxed mb-4">Payment terms are outlined in individual project proposals. Generally:</p>
                        <ul className="list-disc list-inside text-gray-400 space-y-2">
                            <li>A deposit is required before work begins</li>
                            <li>Milestone payments may be required for larger projects</li>
                            <li>Final payment is due upon project completion</li>
                            <li>Late payments may incur additional charges</li>
                        </ul>
                    </div>

                    <div className="p-8 glass-card rounded-2xl border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4">5. Client Responsibilities</h2>
                        <p className="text-gray-400 leading-relaxed mb-4">Clients agree to:</p>
                        <ul className="list-disc list-inside text-gray-400 space-y-2">
                            <li>Provide accurate and complete information</li>
                            <li>Provide timely feedback and approvals</li>
                            <li>Ensure they have rights to any content provided</li>
                            <li>Respect project timelines and communication schedules</li>
                        </ul>
                    </div>

                    <div className="p-8 glass-card rounded-2xl border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4">6. Limitation of Liability</h2>
                        <p className="text-gray-400 leading-relaxed">
                            AQRO shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services. Our total liability shall not exceed the amount paid by you for the specific service in question.
                        </p>
                    </div>

                    <div className="p-8 glass-card rounded-2xl border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4">7. Confidentiality</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Both parties agree to keep confidential any proprietary or sensitive information shared during the course of the project. This obligation survives the termination of any agreement.
                        </p>
                    </div>

                    <div className="p-8 glass-card rounded-2xl border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4">8. Termination</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Either party may terminate a project with written notice. In case of termination, the client is responsible for payment for all work completed up to the termination date.
                        </p>
                    </div>

                    <div className="p-8 glass-card rounded-2xl border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4">9. Changes to Terms</h2>
                        <p className="text-gray-400 leading-relaxed">
                            We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on this website. Continued use of our services constitutes acceptance of the modified terms.
                        </p>
                    </div>

                    <div className="p-8 glass-card rounded-2xl border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4">10. Contact Us</h2>
                        <p className="text-gray-400 leading-relaxed">
                            For questions about these Terms & Conditions, please contact us at{' '}
                            <a href="mailto:ceo@aqro.in" className="text-blue-400 hover:text-white transition-colors">ceo@aqro.in</a>
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 bg-black border-t border-white/5 mt-auto">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <img src="/Logo/aqro-logo.png" alt="AQRO" width={24} height={24} loading="lazy" decoding="async" className="h-6 w-auto opacity-70 grayscale hover:grayscale-0 transition-all" />
                        <span className="text-gray-400 text-sm">© 2026 AQRO. All rights reserved.</span>
                    </div>
                    <div className="flex gap-6 text-gray-400 text-sm">
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

export default TermsConditions;
