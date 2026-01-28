import { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import StepperFooter from "@/components/StepperFooter";
import { Play, Film, Scissors, Music } from "lucide-react";
import useSEO from "@/hooks/useSEO";

const VideoEditing = () => {
    useSEO({
        title: "Professional Video Editing Services - Reels, Shorts & Cinematic Content",
        description: "Professional video editing services for Reels, TikToks, YouTube Shorts, and cinematic brand videos. Transform raw footage into captivating stories with AQRO.",
        canonical: "https://aqro.in/services/video-editing"
    });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className="bg-transparent min-h-screen">
            <Navbar />

            <div className="pt-32 pb-16 container mx-auto px-6 text-center relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/20 blur-[100px] rounded-full pointer-events-none" />
                <h1 className="relative text-5xl md:text-7xl font-bold bg-gradient-to-r from-red-400 to-white bg-clip-text text-transparent mb-6 animate-fade-in-up">
                    Video Editing
                </h1>
                <p className="relative text-xl text-gray-400 max-w-2xl mx-auto mb-12 animate-fade-in-up animation-delay-200">
                    Transform raw footage into captivating stories. From high-retention Reels to corporate documentaries, we edit for impact.
                </p>
            </div>

            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        { icon: <Play className="w-8 h-8 text-red-500" />, title: "Short Form Content", desc: "Reels, TikToks, and Shorts optimized for retention." },
                        { icon: <Film className="w-8 h-8 text-red-500" />, title: "Cinematic Storytelling", desc: "Color grading and narrative flow for brands." },
                        { icon: <Scissors className="w-8 h-8 text-red-500" />, title: "Dynamic Transitions", desc: "Seamless cuts and VFX integration." },
                        { icon: <Music className="w-8 h-8 text-red-500" />, title: "Sound Design", desc: "Immersive audio mixing and SFX." }
                    ].map((item, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors">
                            <div className="mb-4">{item.icon}</div>
                            <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-gray-400">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="border-t border-white/10 pt-12">
                <StepperFooter />
            </div>
            <footer className="py-12 bg-black border-t border-white/5 mt-auto">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-gray-400">© 2026 AQRO. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default VideoEditing;
