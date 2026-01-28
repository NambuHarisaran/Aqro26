import { useRef, useEffect, memo } from 'react';
import { motion, Variants } from 'framer-motion';

const FADE_UP_ANIMATION_VARIANTS: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
};

interface ShaderHeroProps {
    trustBadge?: {
        text: string;
        icons?: string[];
    };
    headline: {
        text: string;
        highlightText?: string;
    };
    subtitle: string;
    buttons?: {
        primary?: {
            text: string;
            onClick: () => void;
        };
        secondary?: {
            text: string;
            onClick: () => void;
        };
    };
    height?: string;
    className?: string; // Added className
}

const AnimatedShaderHero = ({
    trustBadge,
    headline,
    subtitle,
    buttons,
    height = '100vh',
    className = "",
}: ShaderHeroProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // Removed interactive mouse state



    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext('webgl2');
        if (!gl) {
            console.error('WebGL 2 not supported');
            return;
        }

        const vertexShaderSource = `#version 300 es
            in vec2 position;
            void main() {
                gl_Position = vec4(position, 0.0, 1.0);
            }
        `;

        const createShader = (gl: WebGL2RenderingContext, type: number, source: string) => {
            const shader = gl.createShader(type);
            if (!shader) return null;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error(gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        };

        const createProgram = (gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) => {
            const program = gl.createProgram();
            if (!program) return null;
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                console.error(gl.getProgramInfoLog(program));
                gl.deleteProgram(program);
                return null;
            }
            return program;
        };

        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, defaultShaderSource);

        if (!vertexShader || !fragmentShader) return;

        const program = createProgram(gl, vertexShader, fragmentShader);
        if (!program) return;

        const positionAttributeLocation = gl.getAttribLocation(program, 'position');
        const resolutionUniformLocation = gl.getUniformLocation(program, 'resolution');
        const timeUniformLocation = gl.getUniformLocation(program, 'time');
        const moveUniformLocation = gl.getUniformLocation(program, 'move');

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        const positions = [
            -1, -1,
            -1, 1,
            1, -1,
            1, -1,
            -1, 1,
            1, 1,
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

        const vertexArray = gl.createVertexArray();
        gl.bindVertexArray(vertexArray);
        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

        // Use cached dimensions to avoid forced reflows
        let canvasWidth = window.innerWidth;
        let canvasHeight = window.innerHeight;
        let resizeScheduled = false;

        const resizeCanvas = () => {
            if (resizeScheduled) return;
            resizeScheduled = true;
            requestAnimationFrame(() => {
                canvasWidth = window.innerWidth;
                canvasHeight = window.innerHeight;
                canvas.width = canvasWidth;
                canvas.height = canvasHeight;
                gl.viewport(0, 0, canvasWidth, canvasHeight);
                resizeScheduled = false;
            });
        };

        window.addEventListener('resize', resizeCanvas, { passive: true });
        // Initial size without causing reflow
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        gl.viewport(0, 0, canvasWidth, canvasHeight);

        gl.useProgram(program);

        let startTime = Date.now();
        // Commented out unused scale variable
        // let scale = 1; 

        // Removed unused updateScale function to fix TS error
        /*
        const updateScale = () => {
            // scale code...
        };
        */

        const render = () => {
            if (!canvas) return; // Add check to prevent error if canvas is unmounted

            const currentTime = (Date.now() - startTime) / 1000;

            gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
            gl.uniform1f(timeUniformLocation, currentTime);
            gl.uniform2f(moveUniformLocation, 0, 0); // fixed at 0,0 for no interaction

            gl.drawArrays(gl.TRIANGLES, 0, 6);
            requestAnimationFrame(render);
        };

        const animationId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationId);
            gl.deleteProgram(program);
            gl.deleteShader(vertexShader);
            gl.deleteShader(fragmentShader);
        };
    }, []);

    return (
        <div className={`relative w-full bg-primary ${className}`} style={{ height, minHeight: height }}>
            {/* Shader Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full block"
            />

            {/* Overlay Gradient for Tinting */}
            <div className="absolute inset-0 bg-black/40 pointer-events-none" />

            {/* Content Content - Centered */}
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none overflow-visible">
                <div className="container mx-auto px-6 text-center pointer-events-auto py-20">
                    <motion.div
                        initial="hidden"
                        animate="show"
                        viewport={{ once: true }}
                        variants={{
                            hidden: {},
                            show: {
                                transition: {
                                    staggerChildren: 0.15
                                }
                            }
                        }}
                    >
                        {/* Trust Badge */}
                        {trustBadge && (
                            <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-white/10 mb-8 mx-auto hover:bg-white/10 transition-colors cursor-default">
                                    {trustBadge.icons && (
                                        <div className="flex -space-x-2 mr-2">
                                            {trustBadge.icons.map((icon, i) => (
                                                <span key={i} className="text-xl">{icon}</span>
                                            ))}
                                        </div>
                                    )}
                                    <span className="text-sm font-medium text-white/90 uppercase tracking-widest">{trustBadge.text}</span>
                                </div>
                            </motion.div>
                        )}

                        {/* Headline */}
                        <motion.h1
                            variants={FADE_UP_ANIMATION_VARIANTS}
                            className="text-5xl md:text-7xl lg:text-9xl font-bold text-white tracking-tight mb-8 leading-[1.1] px-2"
                        >
                            {headline.text}
                            {headline.highlightText && (
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white italic pr-4">
                                    {headline.highlightText}
                                </span>
                            )}
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            variants={FADE_UP_ANIMATION_VARIANTS}
                            className="text-lg md:text-2xl text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed"
                        >
                            {subtitle}
                        </motion.p>

                        {/* CTA Buttons with Animation */}
                        {buttons && (
                            <motion.div
                                className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
                                variants={FADE_UP_ANIMATION_VARIANTS}
                            >
                                {buttons.primary && (
                                    <button
                                        onClick={buttons.primary.onClick}
                                        className="px-8 py-4 glossy-button text-white rounded-full font-semibold text-lg"
                                    >
                                        {buttons.primary.text}
                                    </button>
                                )}
                                {buttons.secondary && (
                                    <button
                                        onClick={buttons.secondary.onClick}
                                        className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                                    >
                                        {buttons.secondary.text}
                                    </button>
                                )}
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

const defaultShaderSource = `#version 300 es
// Squares/Grid Animation - Royal Blue Theme
// Adapted for AQRO by Antigravity

precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
uniform vec2 move;

#define R resolution
#define T time

// Rotation matrix
mat2 rot(float a) {
    float c = cos(a), s = sin(a);
    return mat2(c, -s, s, c);
}

// 2D Noise
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main(void) {
    vec2 uv = (gl_FragCoord.xy - .5 * R) / min(R.x, R.y);
    
    // Camera movement simulation
    vec2 cam = vec2(sin(T * 0.1), cos(T * 0.15)) * 0.5;
    uv += cam + (move * 0.001); // Mouse influence
    
    // Grid Setup
    float scale = 8.0;
    vec2 gv = fract(uv * scale) - 0.5;
    vec2 id = floor(uv * scale);
    
    // Theme Colors - Brighter version
    // Lighter Blue Base for more vibrant look
    // Brighter grid lines and highlights
    vec3 colBase = vec3(0.02, 0.12, 0.35); // Lighter Deep Blue Background
    vec3 colGrid = vec3(0.1, 0.4, 0.85); // Brighter Royal Blue Lines
    vec3 colHighlight = vec3(0.4, 0.75, 1.0); // Vivid Blue Highlight
    
    // Grid Lines
    float thickness = 0.05;
    float glow = 0.0;
    
    if (gv.x > 0.48 || gv.y > 0.48) {
        glow = 1.0;
    }
    
    // Animated Squares
    float rnd = random(id);
    float pulse = sin(T * 2.0 + rnd * 10.0) * 0.5 + 0.5;
    
    // Random highlights
    float sparkle = step(0.95, sin(T * 0.5 + random(id) * 100.0));
    
    // Mixing colors
    vec3 color = colBase;
    
    // Add grid lines
    color += colGrid * smoothstep(0.48, 0.5, max(abs(gv.x), abs(gv.y)));
    
    // Add glowing squares - increased intensity
    if (rnd > 0.65) {
        color = mix(color, colHighlight, pulse * 0.5);
    }
    
    // Add sparkles - brighter
    color += colHighlight * sparkle * pulse * 1.3;
    
    // Vignette - softer for brighter overall look
    float len = length(uv - cam);
    color *= 1.0 - smoothstep(0.8, 2.0, len) * 0.6;

    O = vec4(color, 1.0);
}`;

// Memoize to prevent unnecessary re-renders
export default memo(AnimatedShaderHero);
