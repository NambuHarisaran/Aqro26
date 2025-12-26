import { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, useMotionValue, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

const CircularGallery = () => {
    const [width, setWidth] = useState(0);
    const [selectedImage, setSelectedImage] = useState<{ src: string, title: string, desc: string } | null>(null);
    const carousel = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const controls = useAnimation();

    const portfolioItems = [
        { src: "/Media/App Creative.png", title: "Social App Interface", desc: "Premium UI/UX Design" },
        { src: "/Media/Acne Creative.png", title: "Skincare Campaign", desc: "Digital Brand Identity" },
        { src: "/Media/App Creative2.png", title: "Luxury App Concept", desc: "Mobile Engineering" },
        { src: "/Media/Hima App 11 creative_20250715_121044_0000.png", title: "Automotive Dashboard", desc: "Smart Interface Design" },
        { src: "/Media/Marketing Insta post 1.jpg", title: "Instagram Growth", desc: "Performance Marketing" },
        { src: "/Media/Satyam steels 18th jul_20250717_162440_0000.png", title: "B2B Steel E-commerce", desc: "Enterprise Web Solution" },
        { src: "/Media/Skincare creative.png", title: "Beauty Product Launch", desc: "Creative Ad Design" },
        { src: "/Media/VRA Creative.png", title: "Real Estate Portal", desc: "Interactive Web Experience" },
        { src: "/Media/lembas creative 3.png", title: "SaaS Branding", desc: "Modern Product Design" }
    ];

    // Triplicate for a very long seamless scroll
    const displayItems = [...portfolioItems, ...portfolioItems, ...portfolioItems];

    useEffect(() => {
        if (carousel.current) {
            // We want to loop halfway
            const scrollWidth = carousel.current.scrollWidth;
            const singleSetWidth = scrollWidth / 3;
            setWidth(singleSetWidth);
        }
    }, []);

    const startAnimation = () => {
        controls.start({
            x: -width,
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 50, // Slower: was 20
                    ease: "linear",
                },
            },
        });
    };

    useEffect(() => {
        if (width > 0) {
            startAnimation();
        }
    }, [width, controls]);

    // Handle ESC to close modal
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedImage(null);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    return (
        <div className="py-20 overflow-hidden bg-transparent relative">
            <div className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none bg-gradient-to-r from-black to-transparent" />
            <div className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none bg-gradient-to-l from-black to-transparent" />

            <motion.div
                ref={carousel}
                className="cursor-default"
            >
                <motion.div
                    className="flex gap-6 md:gap-10"
                    animate={controls}
                    style={{ x }}
                    onHoverStart={() => controls.stop()}
                    onHoverEnd={() => startAnimation()}
                >
                    {displayItems.map((item, i) => (
                        <motion.div
                            key={i}
                            className="min-w-[70vw] h-[350px] md:min-w-[450px] md:h-[550px] rounded-3xl overflow-hidden relative group border border-white/5 bg-white/[0.02] backdrop-blur-sm cursor-pointer"
                            whileHover={{ scale: 1.02, y: -10 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            onClick={() => setSelectedImage(item)}
                        >
                            <img
                                src={item.src}
                                alt={item.title}
                                className="w-full h-full object-cover pointer-events-none group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                            />

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                                <div className="flex justify-between items-end">
                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <h3 className="text-white text-2xl font-bold tracking-tight mb-1">{item.title}</h3>
                                        <p className="text-primary font-medium text-sm uppercase tracking-widest">{item.desc}</p>
                                    </div>
                                    <div className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                                        <ZoomIn className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Preview Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.button
                            className="absolute top-8 right-8 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors z-[110]"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X className="w-6 h-6" />
                        </motion.button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative max-w-6xl w-full aspect-auto max-h-[85vh] rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage.src}
                                alt={selectedImage.title}
                                className="w-full h-full object-contain bg-neutral-900"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/50 to-transparent">
                                <h2 className="text-white text-3xl font-bold mb-2">{selectedImage.title}</h2>
                                <p className="text-gray-400 text-lg">{selectedImage.desc}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CircularGallery;
