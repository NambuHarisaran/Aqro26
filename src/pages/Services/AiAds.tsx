import { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import StepperFooter from "@/components/StepperFooter";
import { TrendingUp, Target, BarChart, Bot, Sparkles } from "lucide-react";
import { VideoPlayer } from "@/components/ui/video-thumbnail-player";

const AiAds = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const videos = [
        {
            url: "https://www.youtube.com/embed/8zqjhLhIlZU",
            title: "Global Commerce Solution",
            desc: "AI-driven precision for international markets.",
            thumb: "https://img.youtube.com/vi/8zqjhLhIlZU/maxresdefault.jpg"
        },
        {
            url: "https://www.youtube.com/embed/MXMXieBWdlo",
            title: "Dynamic Creative Optimization",
            desc: "Real-time asset testing and scaling.",
            thumb: "https://img.youtube.com/vi/MXMXieBWdlo/maxresdefault.jpg"
        },
        {
            url: "https://www.youtube.com/embed/EDGoruMwI9M",
            title: "Predictive Audience Mapping",
            desc: "Finding high-intent users before they search.",
            thumb: "https://img.youtube.com/vi/EDGoruMwI9M/maxresdefault.jpg"
        },
        {
            url: "https://www.youtube.com/embed/4WV_TG1ZvHg",
            title: "ROAS Engine v2.0",
            desc: "Machine learning applied to performance bidding.",
            thumb: "https://img.youtube.com/vi/4WV_TG1ZvHg/maxresdefault.jpg"
        }
    ];

    return (
        <div className="bg-transparent min-h-screen">
            <Navbar />

            <div className="relative pt-40 pb-20 container mx-auto px-6 text-center">
                {/* Decorative Blurs */}
                <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-white/10 mb-8 mx-auto hover:bg-white/10 transition-colors cursor-default">
                        <Sparkles className="w-4 h-4 text-accent" />
                        <span className="text-xs font-medium text-white/90 uppercase tracking-widest">AI Performance Marketing</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">AI ADS</span>
                        <span className="block">GENIUS</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-16 leading-relaxed">
                        Scale your brand at the speed of light. We don't just run ads; we engineer high-converting <span className="text-white font-bold">digital profit machines</span>.
                    </p>
                </div>
            </div>

            {/* Video Showcase Section */}
            <div className="container mx-auto px-6 py-20 relative">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="text-left">
                        <h2 className="text-4xl font-bold text-white mb-4">Ad Showcase</h2>
                        <div className="h-1.5 w-24 bg-gradient-to-r from-primary to-accent rounded-full" />
                    </div>
                    <p className="text-gray-400 max-w-md text-left md:text-right">
                        Explore our successful AI-driven campaigns that delivered 10x ROI across diverse verticals.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {videos.map((video, i) => (
                        <div key={i} className="flex flex-col gap-4">
                            <VideoPlayer
                                videoUrl={video.url}
                                thumbnailUrl={video.thumb}
                                title={video.title}
                                description={video.desc}
                                className="shadow-primary/5 border border-white/5 hover:border-primary/20 transition-all duration-500"
                            />
                            <div className="px-2">
                                <h3 className="text-xl font-bold text-white mb-2">{video.title}</h3>
                                <p className="text-gray-400 text-sm">{video.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Features Stats Section */}
            <div className="container mx-auto px-6 py-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { icon: <Bot className="w-8 h-8 text-primary" />, title: "Automated Bidding", desc: "AI-powered bid management for max efficiency." },
                        { icon: <Target className="w-8 h-8 text-accent" />, title: "Precision Targeting", desc: "Reach the right audience at the right time." },
                        { icon: <BarChart className="w-8 h-8 text-primary" />, title: "Real-time Analytics", desc: "Live dashboards and performance tracking." },
                        { icon: <TrendingUp className="w-8 h-8 text-accent" />, title: "Scale Rapidly", desc: "Strategies designed for aggressive growth." }
                    ].map((item, i) => (
                        <div key={i} className="glass-card p-8 rounded-3xl hover:bg-white/10 transition-all duration-300 group">
                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{item.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="border-t border-white/5 pt-12">
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

export default AiAds;
