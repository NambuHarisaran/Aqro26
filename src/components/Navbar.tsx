import { useState, useEffect, useRef } from "react";
import { Menu, X, MessageCircle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [activeItem, setActiveItem] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Animation variants
    const navItemVariants = {
        initial: { scale: 1 },
        hover: { scale: 1.05 },
        tap: { scale: 0.95 }
    };

    const underlineVariants = {
        initial: { width: 0, opacity: 0 },
        hover: { width: "100%", opacity: 1 }
    };

    const mobileMenuVariants = {
        hidden: { opacity: 0, y: -20, scale: 0.95, filter: "blur(10px)" },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            filter: "blur(0px)",
            transition: {
                type: "spring" as const,
                stiffness: 300,
                damping: 25,
                staggerChildren: 0.05,
                delayChildren: 0.1
            }
        },
        exit: { 
            opacity: 0, 
            y: -20, 
            scale: 0.95, 
            filter: "blur(10px)",
            transition: { duration: 0.2 }
        }
    };

    const mobileItemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { type: "spring" as const, stiffness: 300, damping: 25 }
        }
    };

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
        <motion.div 
            className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.2 }}
        >
            <motion.nav
                className={cn(
                    "flex items-center justify-between w-full max-w-5xl px-6 py-3 rounded-full border border-white/10",
                    scrolled
                        ? "bg-black/50 backdrop-blur-2xl shadow-2xl shadow-black/40"
                        : "bg-black/30 backdrop-blur-xl"
                )}
                style={{
                    transition: "background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.5s cubic-bezier(0.4, 0, 0.2, 1), backdrop-filter 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                }}
            >
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <motion.img 
                        src="/Logo/logo.png" 
                        alt="AQRO" 
                        className="h-8 w-auto object-contain"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    />
                    <motion.span 
                        className="text-white font-bold text-lg tracking-wide hidden sm:block"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                        AQRO
                    </motion.span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {/* Services Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <motion.button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="relative flex items-center gap-1 text-gray-300 hover:text-white text-sm font-medium focus:outline-none py-2"
                            variants={navItemVariants}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                            onHoverStart={() => setActiveItem('services')}
                            onHoverEnd={() => setActiveItem(null)}
                        >
                            Services 
                            <motion.div
                                animate={{ rotate: dropdownOpen ? 180 : 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <ChevronDown className="w-4 h-4" />
                            </motion.div>
                            <motion.span
                                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                                variants={underlineVariants}
                                initial="initial"
                                animate={activeItem === 'services' || dropdownOpen ? "hover" : "initial"}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            />
                        </motion.button>

                        <AnimatePresence>
                            {dropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 15, scale: 0.9, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95, filter: "blur(5px)" }}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/40"
                                >
                                    <motion.div 
                                        className="flex flex-col p-2"
                                        initial="hidden"
                                        animate="visible"
                                        variants={{
                                            visible: { transition: { staggerChildren: 0.05 } }
                                        }}
                                    >
                                        {serviceLinks.map((link) => (
                                            <motion.div
                                                key={link.name}
                                                variants={{
                                                    hidden: { opacity: 0, x: -10 },
                                                    visible: { opacity: 1, x: 0 }
                                                }}
                                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                            >
                                                <Link
                                                    to={link.href}
                                                    className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 text-left hover:pl-6"
                                                    onClick={() => setDropdownOpen(false)}
                                                >
                                                    {link.name}
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <Link to="/about">
                        <motion.div
                            className="relative text-gray-300 hover:text-white text-sm font-medium py-2"
                            variants={navItemVariants}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                            onHoverStart={() => setActiveItem('about')}
                            onHoverEnd={() => setActiveItem(null)}
                        >
                            About
                            <motion.span
                                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                                variants={underlineVariants}
                                initial="initial"
                                animate={activeItem === 'about' ? "hover" : "initial"}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            />
                        </motion.div>
                    </Link>
                    <motion.button
                        onClick={() => handleHashLink('contact')}
                        className="relative text-gray-300 hover:text-white text-sm font-medium py-2"
                        variants={navItemVariants}
                        initial="initial"
                        whileHover="hover"
                        whileTap="tap"
                        onHoverStart={() => setActiveItem('contact')}
                        onHoverEnd={() => setActiveItem(null)}
                    >
                        Contact
                        <motion.span
                            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                            variants={underlineVariants}
                            initial="initial"
                            animate={activeItem === 'contact' ? "hover" : "initial"}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        />
                    </motion.button>
                </div>

                {/* Right Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <motion.a
                        href="https://wa.me/919787721111"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-[#25D366] text-white shadow-lg shadow-green-500/20 flex items-center justify-center"
                        whileHover={{ scale: 1.15, boxShadow: "0 0 25px rgba(37, 211, 102, 0.5)" }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                        <MessageCircle className="w-5 h-5 fill-current" />
                    </motion.a>
                </div>

                {/* Mobile Menu Button */}
                <motion.button
                    className="md:hidden text-white p-2 rounded-lg"
                    onClick={() => setIsOpen(!isOpen)}
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <X />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="menu"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <Menu />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>

                {/* Mobile Dropdown */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            variants={mobileMenuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="absolute top-full mt-4 left-0 right-0 mx-4 p-6 bg-black/70 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl shadow-black/40 flex flex-col gap-4 md:hidden"
                        >
                            <div className="flex flex-col gap-4">
                                <motion.div 
                                    className="flex flex-col gap-2 border-b border-white/10 pb-4"
                                    variants={mobileItemVariants}
                                >
                                    <span className="text-gray-500 text-xs uppercase tracking-widest pl-2">Services</span>
                                    {serviceLinks.map((link) => (
                                        <motion.div
                                            key={link.name}
                                            variants={mobileItemVariants}
                                            whileHover={{ x: 8, backgroundColor: "rgba(255,255,255,0.1)" }}
                                            whileTap={{ scale: 0.98 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                        >
                                            <Link
                                                to={link.href}
                                                className="block text-gray-300 hover:text-white text-lg font-medium pl-4 py-2 rounded-lg transition-colors"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {link.name}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </motion.div>

                                <Link to="/about" onClick={() => setIsOpen(false)}>
                                    <motion.div 
                                        className="text-gray-300 hover:text-white text-lg font-medium py-2 text-left rounded-lg px-2"
                                        variants={mobileItemVariants}
                                        whileHover={{ x: 8, backgroundColor: "rgba(255,255,255,0.1)" }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        About
                                    </motion.div>
                                </Link>
                                <motion.button 
                                    onClick={() => handleHashLink('contact')} 
                                    className="text-gray-300 hover:text-white text-lg font-medium py-2 text-left rounded-lg px-2"
                                    variants={mobileItemVariants}
                                    whileHover={{ x: 8, backgroundColor: "rgba(255,255,255,0.1)" }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Contact
                                </motion.button>
                            </div>

                            <motion.div 
                                className="flex gap-4 mt-4 pt-4 border-t border-white/10"
                                variants={mobileItemVariants}
                            >
                                <motion.a
                                    href="https://wa.me/919787721111"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 py-3 rounded-xl bg-[#25D366] text-white flex justify-center items-center gap-2 font-bold shadow-lg shadow-green-500/20"
                                    onClick={() => setIsOpen(false)}
                                    whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(37, 211, 102, 0.4)" }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    <MessageCircle className="w-5 h-5" /> Chat
                                </motion.a>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </motion.div>
    );
};

export default Navbar;
