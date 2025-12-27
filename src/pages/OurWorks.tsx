import { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import CircularGallery from "@/components/CircularGallery";

const OurWorks = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-transparent min-h-screen">
            <Navbar />
            <div className="pt-32 pb-16 container mx-auto px-6 text-center">
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent mb-6 animate-fade-in-up">
                    Our Creatives
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 animate-fade-in-up animation-delay-100">
                    A showcase of our recent digital masterpieces. We don't just design; we define brands.
                </p>
            </div>
            <CircularGallery />
            <footer className="py-12 bg-black border-t border-white/5 mt-auto">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-gray-500">© 2026 AQRO. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};
export default OurWorks;
