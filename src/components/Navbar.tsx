import { useState, useEffect, useRef } from "react";
import { Menu, X, MessageCircle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Handle hash navigation - scroll to section after navigation
    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            // Small delay to ensure the page has rendered
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }, [location]);

    const handleHashLink = (hash: string) => {
        setIsOpen(false);
        setDropdownOpen(false);
        
        if (location.pathname === '/') {
            // Already on home page, just scroll
            const element = document.getElementById(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Navigate to home page with hash
            navigate(`/#${hash}`);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const serviceLinks = [
        { name: "Web Development", href: "/services/web" },
        { name: "Video Editing", href: "/services/video-editing" },
        { name: "AI Ads", href: "/services/ai-ads" },
        { name: "Creatives", href: "/services/creatives" },
    ];

    return (
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
            <nav
                className={cn(
                    "flex items-center justify-between w-full max-w-5xl px-6 py-3 rounded-full transition-all duration-300 border border-white/10",
                    scrolled
                        ? "bg-black/40 backdrop-blur-2xl shadow-2xl shadow-black/30"
                        : "bg-black/30 backdrop-blur-xl"
                )}
            >
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <img src="/Logo/logo.png" alt="AQRO" className="h-8 w-auto object-contain hover:scale-105 transition-transform duration-300" />
                    <span className="text-white font-bold text-lg tracking-wide hidden sm:block">AQRO</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {/* Services Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center gap-1 text-gray-300 hover:text-white text-sm font-medium transition-colors hover:shadow-[0_0_10px_rgba(255,255,255,0.3)] focus:outline-none"
                        >
                            Services <ChevronDown className={cn("w-4 h-4 transition-transform", dropdownOpen ? "rotate-180" : "")} />
                        </button>

                        <AnimatePresence>
                            {dropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95, filter: "blur(10px)" }}
                                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-black/50 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/30"
                                >
                                    <div className="flex flex-col p-2">
                                        {serviceLinks.map((link) => (
                                            <Link
                                                key={link.name}
                                                to={link.href}
                                                className="px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-left"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                {link.name}
                                            </Link>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <button
                        onClick={() => handleHashLink('about')}
                        className="text-gray-300 hover:text-white text-sm font-medium transition-colors hover:shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                    >
                        About
                    </button>
                    <button
                        onClick={() => handleHashLink('contact')}
                        className="text-gray-300 hover:text-white text-sm font-medium transition-colors hover:shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                    >
                        Contact
                    </button>
                </div>

                {/* Right Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <a
                        href="https://wa.me/919787721111"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white transition-all shadow-lg shadow-green-500/20 hover:scale-105 flex items-center justify-center"
                    >
                        <MessageCircle className="w-5 h-5 fill-current" />
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>

                {/* Mobile Dropdown */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -20, scale: 0.95, filter: "blur(10px)" }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="absolute top-full mt-4 left-0 right-0 mx-4 p-6 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl shadow-black/30 flex flex-col gap-4 md:hidden"
                        >
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2 border-b border-white/10 pb-4">
                                    <span className="text-gray-500 text-xs uppercase tracking-widest pl-2">Services</span>
                                    {serviceLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            to={link.href}
                                            className="text-gray-300 hover:text-white text-lg font-medium pl-4 py-2 hover:bg-white/10 rounded-lg transition-colors"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>

                                <button onClick={() => handleHashLink('about')} className="text-gray-300 hover:text-white text-lg font-medium py-2 text-left">About</button>
                                <button onClick={() => handleHashLink('contact')} className="text-gray-300 hover:text-white text-lg font-medium py-2 text-left">Contact</button>
                            </div>

                            <div className="flex gap-4 mt-4 pt-4 border-t border-white/10">
                                <a
                                    href="https://wa.me/919787721111"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 py-3 rounded-lg bg-[#25D366] text-white flex justify-center items-center gap-2 font-bold"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <MessageCircle className="w-5 h-5" /> Chat
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </div>
    );
};

export default Navbar;
