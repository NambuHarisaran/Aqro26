import { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import StepperFooter from "@/components/StepperFooter";
import { Link } from "react-router-dom";
import { Target, Users, Award, Heart, Zap } from "lucide-react";

const AboutUs = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const values = [
        {
            icon: <Target className="w-6 h-6" />,
            title: "Results-Driven",
            description: "Every decision is tied to measurable business outcomes."
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Speed & Agility",
            description: "We move fast without compromising quality."
        },
        {
            icon: <Heart className="w-6 h-6" />,
            title: "Client-First",
            description: "Your success is our success. We're partners, not vendors."
        },
        {
            icon: <Award className="w-6 h-6" />,
            title: "Excellence",
            description: "We set high standards and consistently exceed them."
        },
    ];

    const stats = [
        { number: "50+", label: "Projects Delivered" },
        { number: "30+", label: "Happy Clients" },
        { number: "3+", label: "Years Experience" },
        { number: "24/7", label: "Support Available" },
    ];

    return (
        <div className="bg-black min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <div className="pt-32 pb-16 container mx-auto px-6 text-center relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
                <h1 className="relative text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent mb-6">
                    About AQRO
                </h1>
                <p className="relative text-xl text-gray-400 max-w-2xl mx-auto">
                    Building digital excellence through innovation, strategy, and relentless execution.
                </p>
            </div>

            {/* Mission Section */}
            <section className="py-24 container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="w-full lg:w-1/2">
                        <img
                            src="/Logo/2.png"
                            alt="AQRO Team"
                            className="rounded-2xl shadow-2xl shadow-primary/20"
                        />
                    </div>
                    <div className="w-full lg:w-1/2 space-y-6">
                        <h2 className="text-3xl md:text-5xl font-bold text-white">
                            Our Mission
                        </h2>
                        <p className="text-lg text-gray-400 leading-relaxed">
                            AQRO is a technology-driven digital studio specializing in AI-powered marketing, web development, mobile app development, and SaaS product engineering.
                        </p>
                        <p className="text-lg text-gray-400 leading-relaxed">
                            We help startups and growing businesses design, build, and scale high-performance digital products with speed and clarity. What started as an AI-first digital advertising agency has evolved into a full-stack product and growth partner.
                        </p>
                        <p className="text-lg text-gray-400 leading-relaxed">
                            AQRO combines strategic thinking, clean design, and modern engineering to deliver solutions that are scalable, secure, and conversion-focused.
                        </p>
                        <div className="pt-4">
                            <p className="text-white border-l-4 border-primary pl-4 italic text-lg">
                                "We don't just build products — we solve real business problems using technology, data, and intelligent automation."
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 border-y border-white/10">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.number}</div>
                                <div className="text-gray-400">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Our Values</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        The principles that guide everything we do.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, idx) => (
                        <div key={idx} className="p-8 glass-card rounded-2xl border border-white/10 hover:border-primary/50 transition-all duration-300 text-center">
                            <div className="mb-6 p-4 bg-primary/20 rounded-full w-fit mx-auto text-primary">
                                {value.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                            <p className="text-gray-400 text-sm">{value.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Team Section */}
            <section className="py-24 container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Leadership</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        A passionate team dedicated to your success.
                    </p>
                </div>
                <div className="flex justify-center">
                    <div className="p-8 glass-card rounded-2xl border border-white/10 max-w-md text-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-primary to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                            <Users className="w-12 h-12 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">AQRO Team</h3>
                        <p className="text-primary mb-4">Founders & Digital Experts</p>
                        <p className="text-gray-400 text-sm">
                            A collective of designers, developers, and strategists united by a passion for building exceptional digital experiences.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Ready to Work Together?</h2>
                <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                    Let's build something extraordinary.
                </p>
                <StepperFooter />
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

export default AboutUs;
