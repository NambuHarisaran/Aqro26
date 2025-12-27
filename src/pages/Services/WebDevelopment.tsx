import { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import StepperFooter from "@/components/StepperFooter";
import { Monitor, Globe } from "lucide-react";

const WebDevelopment = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-transparent min-h-screen">
            <Navbar />

            {/* Hero */}
            <div className="pt-32 pb-16 container mx-auto px-6 text-center relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
                <h1 className="relative text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent mb-6 animate-fade-in-up">
                    Web Engineering
                </h1>
                <p className="relative text-xl text-gray-400 max-w-2xl mx-auto mb-12 animate-fade-in-up animation-delay-200">
                    We build lightning-fast, scalable, and SEO-optimized web applications using modern stacks like React, Next.js, and Tailwind CSS.
                </p>
            </div>

            {/* Live Portfolio Showcase */}
            <div className="container mx-auto px-6 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">Live Showcase</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Explore our high-performance digital solutions in action. We don't just build websites; we engineer digital experiences.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { title: "OnPitch", url: "https://onpitch.in/", img: "/Previews/onpitch.png", desc: "Business Innovation Platform" },
                        { title: "skyloan", url: "https://skyloan.in/", img: "/Previews/Skyloan.png", desc: "Loan Service" },
                        { title: "Pandam Store", url: "https://pandam.store/", img: "/Previews/pandam.png", desc: "E-commerce Experience" },
                        { title: "Zliqit", url: "https://zliqit.com/", img: "/Previews/zliqit.png", desc: "Software Development Hub" },
                        { title: "GrowMate", url: "https://sunny-choux-3d4d32.netlify.app/", img: "/Previews/sunny_choux.png", desc: "SaaS Dashboard Solution" },
                        { title: "ThinkLoop AI", url: "https://clinquant-pixie-163e09.netlify.app/", img: "/Previews/clinquant_pixie.png", desc: "AI Command Interface" },
                        { title: "zeMaps", url: "https://zemaps.zliqit.com/", img: "/Previews/zemaps.png", desc: "Resource Availability Map" },
                        { title: "Aqro for Students", url: "https://student.aqro.in/", img: "/Previews/student_aqro.png", desc: "Educational Ecosystem" }
                    ].map((site, i) => (
                        <a
                            key={i}
                            href={site.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative block aspect-[16/10] rounded-3xl overflow-hidden glass-card border border-white/5 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl"
                        >
                            <img
                                src={site.img}
                                alt={site.title}
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                            <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                <h3 className="text-white text-2xl font-bold mb-1 tracking-tight">{site.title}</h3>
                                <p className="text-gray-400 text-sm font-medium tracking-widest uppercase mb-4">{site.desc}</p>
                                <div className="inline-flex items-center gap-2 text-primary font-bold text-sm">
                                    Visit Site <Globe className="w-4 h-4" />
                                </div>
                            </div>

                            {/* Visit Badge */}
                            <div className="absolute top-6 right-6 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
                                <Monitor className="w-5 h-5 text-white" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-white/10 pt-12">
                <StepperFooter />
            </div>
            <footer className="py-12 bg-black border-t border-white/5 mt-auto">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-gray-500">© 2026 AQRO. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default WebDevelopment;
