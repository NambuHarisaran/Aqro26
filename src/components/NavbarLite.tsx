import { useState, useEffect, useRef } from "react";
import { Menu, X, MessageCircle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useNavigate, useLocation } from "react-router-dom";

const NavbarLite = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setMounted(true);
    }, []);

    // Handle hash navigation
    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
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
            const element = document.getElementById(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            navigate(`/#${hash}`);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const serviceLinks = [
        { name: "Web Development", href: "/services/web" },
        { name: "Video Editing", href: "/services/video-editing" },
        { name: "AI Ads", href: "/services/ai-ads" },
    ];

    return (
        <div 
            className={cn(
                "fixed top-6 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-500",
                mounted ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
            )}
        >
            <nav
                className={cn(
                    "flex items-center justify-between w-full max-w-5xl px-6 py-3 rounded-full border border-white/10 transition-all duration-500",
                    scrolled
                        ? "bg-black/50 backdrop-blur-2xl shadow-2xl shadow-black/40"
                        : "bg-black/30 backdrop-blur-xl"
                )}
            >
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <img 
                        src="/Logo/logo.png" 
                        alt="AQRO"
                        width={32}
                        height={32}
                        className="h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-110"
                    />
                    <span className="text-white font-bold text-lg tracking-wide hidden sm:block transition-transform duration-200 group-hover:scale-105">
                        AQRO
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-1">
                    {/* Services Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-full hover:bg-white/5"
                        >
                            Services
                            <ChevronDown className={cn(
                                "w-4 h-4 transition-transform duration-200",
                                dropdownOpen ? "rotate-180" : ""
                            )} />
                        </button>
                        
                        {/* Dropdown Menu */}
                        <div className={cn(
                            "absolute top-full mt-2 left-0 min-w-[200px] bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden transition-all duration-200 origin-top",
                            dropdownOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
                        )}>
                            {serviceLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <button 
                        onClick={() => handleHashLink('about')} 
                        className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-full hover:bg-white/5"
                    >
                        About
                    </button>

                    <Link to="/works" className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-full hover:bg-white/5">
                        Works
                    </Link>

                    <button 
                        onClick={() => handleHashLink('contact')} 
                        className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-full hover:bg-white/5"
                    >
                        Contact
                    </button>
                </div>

                {/* CTA Button */}
                <div className="hidden md:flex items-center">
                    <a
                        href="https://wa.me/919787721111"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:shadow-lg hover:shadow-green-500/30 hover:scale-105 transition-all duration-200"
                    >
                        <MessageCircle className="w-4 h-4" />
                        <span className="hidden lg:inline">Let's Talk</span>
                        <span className="lg:hidden">Chat</span>
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors active:scale-95"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isOpen}
                >
                    <div className="relative w-6 h-6">
                        <X className={cn(
                            "absolute inset-0 transition-all duration-200",
                            isOpen ? "opacity-100 rotate-0" : "opacity-0 rotate-90"
                        )} />
                        <Menu className={cn(
                            "absolute inset-0 transition-all duration-200",
                            isOpen ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"
                        )} />
                    </div>
                </button>

                {/* Mobile Dropdown */}
                <div className={cn(
                    "absolute top-full mt-4 left-0 right-0 mx-4 p-6 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl flex flex-col gap-4 md:hidden transition-all duration-300 origin-top",
                    isOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible pointer-events-none"
                )}>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2 border-b border-white/10 pb-4">
                            <span className="text-gray-500 text-xs uppercase tracking-widest pl-2">Services</span>
                            {serviceLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="block text-gray-300 hover:text-white text-lg font-medium pl-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <Link 
                            to="/about" 
                            onClick={() => setIsOpen(false)}
                            className="text-gray-300 hover:text-white text-lg font-medium py-2 px-2 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            About
                        </Link>
                        <button 
                            onClick={() => handleHashLink('contact')} 
                            className="text-gray-300 hover:text-white text-lg font-medium py-2 text-left px-2 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            Contact
                        </button>
                    </div>

                    <div className="flex gap-4 mt-4 pt-4 border-t border-white/10">
                        <a
                            href="https://wa.me/919787721111"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-3 rounded-xl bg-[#25D366] text-white flex justify-center items-center gap-2 font-bold shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transition-shadow active:scale-98"
                            onClick={() => setIsOpen(false)}
                        >
                            <MessageCircle className="w-5 h-5" /> Chat
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavbarLite;
