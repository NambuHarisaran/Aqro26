import { cn } from "@/lib/utils";
import {
    Terminal,
    ArrowRightLeft,
    Smartphone,
    Cloud,
    DollarSign,
    HelpCircle,
    Settings,
    Heart,
} from "lucide-react";

export function FeaturesSectionWithHoverEffects() {
    const features = [
        {
            title: "AI & Automation",
            description:
                "Leverage intelligent algorithms to automate workflows and optimize decision-making.",
            icon: <Terminal className="w-6 h-6" />,
        },
        {
            title: "Web Engineering",
            description:
                "High-performance, SEO-optimized web applications built on modern stacks.",
            icon: <ArrowRightLeft className="w-6 h-6" />,
        },
        {
            title: "Mobile Development",
            description:
                "Native and cross-platform apps that deliver seamless user experiences on iOS and Android.",
            icon: <Smartphone className="w-6 h-6" />,
        },
        {
            title: "SaaS Products",
            description: "Scalable, secure, and multi-tenant architectures for your next big product.",
            icon: <Cloud className="w-6 h-6" />,
        },
        {
            title: "Strategic Growth",
            description: "Data-driven marketing strategies designed to scale your ROI exponentially.",
            icon: <DollarSign className="w-6 h-6" />,
        },
        {
            title: "24/7 Support",
            description:
                "Dedicated support teams ensuring your digital infrastructure never sleeps.",
            icon: <HelpCircle className="w-6 h-6" />,
        },
        {
            title: "UI/UX Design",
            description:
                "Award-winning interfaces that convert visitors into loyal customers.",
            icon: <Settings className="w-6 h-6" />,
        },
        {
            title: "Cloud Infrastructure",
            description: "Robust, auto-scaling cloud solutions powered by AWS and Google Cloud.",
            icon: <Heart className="w-6 h-6" />,
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
