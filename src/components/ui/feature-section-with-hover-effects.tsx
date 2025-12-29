import { cn } from "@/lib/utils";
import {
    Layers,
    Zap,
    Target,
    Code2,
    Handshake,
    Puzzle,
    TrendingUp,
    HeadphonesIcon,
} from "lucide-react";

export function FeaturesSectionWithHoverEffects() {
    const features = [
        {
            title: "One Partner. End-to-End Execution",
            description:
                "Strategy, design, development, and growth under one roof. No handoffs. No confusion.",
            icon: <Layers className="w-6 h-6" />,
        },
        {
            title: "Built for Speed, Not Bureaucracy",
            description:
                "We move fast and stay lean. Results over paperwork.",
            icon: <Zap className="w-6 h-6" />,
        },
        {
            title: "Business-Focused Development",
            description:
                "Every product is built with clear goals — conversions, retention, and ROI.",
            icon: <Target className="w-6 h-6" />,
        },
        {
            title: "Clean, Modern, Scalable Tech",
            description:
                "Fast, secure, and future-ready — from landing pages to full SaaS platforms.",
            icon: <Code2 className="w-6 h-6" />,
        },
        {
            title: "Transparent & Founder-Friendly",
            description:
                "Honest timelines, clear communication. Partner, not vendor.",
            icon: <Handshake className="w-6 h-6" />,
        },
        {
            title: "Solutions Tailored to Your Stage",
            description:
                "MVP or scale-up — we adapt to your budget and priorities.",
            icon: <Puzzle className="w-6 h-6" />,
        },
        {
            title: "Strategic Growth",
            description:
                "Data-driven marketing to scale your ROI and accelerate growth.",
            icon: <TrendingUp className="w-6 h-6" />,
        },
        {
            title: "24/7 Support",
            description:
                "Your digital infrastructure never sleeps. Neither do we.",
            icon: <HeadphonesIcon className="w-6 h-6" />,
        },
    ];
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
            {features.map((feature, index) => (
                <Feature key={feature.title} {...feature} index={index} />
            ))}
        </div>
    );
}

const Feature = ({
    title,
    description,
    icon,
    index,
}: {
    title: string;
    description: string;
    icon: React.ReactNode;
    index: number;
}) => {
    return (
        <div
            className={cn(
                "flex flex-col lg:border-r py-10 relative group/feature border-white/10 glass-card rounded-none first:rounded-tl-2xl last:rounded-br-2xl",
                (index === 0 || index === 4) && "lg:border-l border-white/10",
                index < 4 && "lg:border-b border-white/10"
            )}
        >
            {index < 4 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />
            )}
            {index >= 4 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
            )}
            <div className="mb-4 relative z-10 px-10 text-blue-100">
                {icon}
            </div>
            <div className="text-lg font-bold mb-2 relative z-10 px-10">
                <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-white/20 group-hover/feature:bg-white transition-all duration-200 origin-center" />
                <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-100">
                    {title}
                </span>
            </div>
            <p className="text-sm text-neutral-300 max-w-xs relative z-10 px-10">
                {description}
            </p>
        </div>
    );
};
