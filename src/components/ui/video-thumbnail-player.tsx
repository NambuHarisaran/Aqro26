import * as React from "react";
import { cn } from "@/lib/utils";
import { Play, X } from "lucide-react";

// Interface for component props
interface VideoPlayerProps extends React.HTMLAttributes<HTMLDivElement> {
    thumbnailUrl: string;
    videoUrl: string;
    title: string;
    description?: string;
    aspectRatio?: "16/9" | "4/3" | "1/1";
}

const VideoPlayer = React.forwardRef<HTMLDivElement, VideoPlayerProps>(
    (
        {
            className,
            thumbnailUrl,
            videoUrl,
            title,
            description,
            aspectRatio = "16/9",
            ...props
        },
        ref
    ) => {
        // State to manage the visibility of the video modal
        const [isModalOpen, setIsModalOpen] = React.useState(false);

        // Effect to handle the 'Escape' key press for closing the modal
        React.useEffect(() => {
            const handleEsc = (event: KeyboardEvent) => {
                if (event.key === "Escape") {
                    setIsModalOpen(false);
                }
            };
            window.addEventListener("keydown", handleEsc);
            return () => {
                window.removeEventListener("keydown", handleEsc);
            };
        }, []);

        // Prevent body scroll when modal is open
        React.useEffect(() => {
            if (isModalOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        }, [isModalOpen]);


        return (
            <>
                <div
                    ref={ref}
                    className={cn(
                        "group relative cursor-pointer overflow-hidden rounded-2xl shadow-2xl glass-card",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                        className
                    )}
                    style={{ aspectRatio: aspectRatio === "16/9" ? "16/9" : aspectRatio === "4/3" ? "4/3" : "1/1" }}
                    onClick={() => setIsModalOpen(true)}
                    onKeyDown={(e) => e.key === "Enter" && setIsModalOpen(true)}
                    tabIndex={0}
                    aria-label={`Play video: ${title}`}
                    {...props}
                >
                    {/* Thumbnail Image */}
                    <img
                        src={thumbnailUrl}
                        alt={`Thumbnail for ${title}`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-500 group-hover:scale-125 group-hover:bg-gradient-to-br group-hover:from-primary/60 group-hover:to-accent/60 group-hover:border-white/40 shadow-xl group-hover:shadow-primary/20">
                            <Play className="h-8 w-8 fill-white text-white translate-x-0.5" />
                        </div>
                    </div>

                    {/* Title and Description */}
                    <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-xl font-bold text-white tracking-tight drop-shadow-md">{title}</h3>
                        {description && (
                            <p className="mt-2 text-sm text-white/70 line-clamp-2 max-w-[90%] font-medium">{description}</p>
                        )}
                    </div>
                </div>

                {/* Video Modal */}
                {isModalOpen && (
                    <div
                        className="fixed inset-0 z-[100] flex animate-in fade-in-0 items-center justify-center bg-black/90 backdrop-blur-md"
                        aria-modal="true"
                        role="dialog"
                        onClick={() => setIsModalOpen(false)}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute right-6 top-6 z-[110] rounded-full bg-white/5 p-3 text-white transition-all hover:bg-white/10 hover:rotate-90 border border-white/10"
                            aria-label="Close video player"
                        >
                            <X className="h-6 w-6" />
                        </button>

                        {/* Video Iframe Container */}
                        <div
                            className="w-full max-w-5xl aspect-video p-4 relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <iframe
                                src={videoUrl}
                                title={title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="h-full w-full rounded-2xl shadow-[0_0_50px_rgba(0,113,227,0.3)] border border-white/10"
                            ></iframe>
                        </div>
                    </div>
                )}
            </>
        );
    }
);
VideoPlayer.displayName = "VideoPlayer";

export { VideoPlayer };
