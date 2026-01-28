import React from 'react';

interface ServiceItem {
  title: string;
  description: string;
  image: string;
  overlayImage: string;
  link?: string;
}

interface ServicesSectionProps {
  services?: ServiceItem[];
  title?: string;
  subtitle?: string;
}

// Default services for AQRO
const defaultServices: ServiceItem[] = [
  {
    title: "Web Development",
    description: "Modern, fast, SEO-optimized",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=512&h=512&fit=crop",
    overlayImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=512&h=512&fit=crop",
    link: "/services/web"
  },
  {
    title: "AI-Driven Marketing",
    description: "Scale your ROI exponentially",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=512&h=512&fit=crop",
    overlayImage: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=512&h=512&fit=crop",
    link: "/services/ai-ads"
  },
  {
    title: "Video Production",
    description: "Viral content that converts",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=512&h=512&fit=crop",
    overlayImage: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=512&h=512&fit=crop",
    link: "/services/video-editing"
  },
  {
    title: "Creative Design",
    description: "Eye-catching brand assets",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=512&h=512&fit=crop",
    overlayImage: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=512&h=512&fit=crop",
    link: "/services/creatives"
  }
];

const ServicesSection: React.FC<ServicesSectionProps> = ({ 
  services = defaultServices,
  title = "Our Services",
  subtitle = "Everything you need to grow your digital presence."
}) => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 w-full bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 tracking-tight">
            {title}
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 font-light">
            {subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <a
              key={index}
              href={service.link || "#"}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 flex flex-col h-[320px] transition-all duration-300 hover:bg-white/10 hover:border-primary/50 hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative flex-grow flex items-center justify-center mb-4 overflow-hidden">
                {/* Back Image */}
                <img
                  src={service.image}
                  alt={`${service.title} showcase`}
                  loading="lazy"
                  decoding="async"
                  width={160}
                  height={160}
                  className="absolute w-40 h-auto rounded-xl shadow-md shadow-black/50 transform -rotate-6 transition-all duration-400 ease-out group-hover:rotate-[-12deg] group-hover:scale-110 group-hover:-translate-x-2"
                  onError={(e) => { 
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; 
                    target.src='https://placehold.co/512x512/1a1a2e/4a5568?text=AQRO'; 
                  }}
                />
                {/* Front Image */}
                <img
                  src={service.overlayImage}
                  alt={`${service.title} example`}
                  loading="lazy"
                  decoding="async"
                  width={160}
                  height={160}
                  className="absolute w-40 h-auto rounded-xl shadow-xl shadow-primary/20 transform rotate-3 transition-all duration-400 ease-out group-hover:rotate-[8deg] group-hover:scale-110 group-hover:translate-x-2"
                  onError={(e) => { 
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; 
                    target.src='https://placehold.co/512x512/0a0a1a/6366f1?text=AQRO'; 
                  }}
                />
              </div>

              {/* Service Info */}
              <div className="mt-auto">
                <h3 className="text-left text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-left text-sm text-gray-400">
                  {service.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
