import React, { useEffect, useRef } from 'react';

const BackgroundAnimation: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        // Particles configuration
        const particlesArray: Particle[] = [];
        const numberOfParticles = 50;
        const colors = ['rgba(59, 130, 246, 0.5)', 'rgba(236, 72, 153, 0.3)', 'rgba(16, 185, 129, 0.3)', 'rgba(245, 158, 11, 0.3)'];

        // Handle window resize
        const handleResize = (): void => {
            width = window.innerWidth;
            height = window.innerHeight;
            if (canvas) {
                canvas.width = width;
                canvas.height = height;
            }

            // Recreate particles on resize
            initParticles();
        };

        window.addEventListener('resize', handleResize);

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            color: string;
            opacity: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 15 + 5;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.opacity = Math.random() * 0.5 + 0.1;
            }

            update(): void {
                this.x += this.speedX;
                this.y += this.speedY;

                // Bounce off edges
                if (this.x > width || this.x < 0) {
                    this.speedX = -this.speedX;
                }
                if (this.y > height || this.y < 0) {
                    this.speedY = -this.speedY;
                }
            }

            draw(): void {
                if (!ctx) return;
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Initialize particles
        const initParticles = (): void => {
            particlesArray.length = 0;
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        };

        // Animation loop
        const animate = (): void => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }

            // Connect particles with lines when they are close
            connectParticles();

            requestAnimationFrame(animate);
        };

        // Draw lines between particles that are close to each other
        const connectParticles = (): void => {
            if (!ctx) return;
            for (let i = 0; i < particlesArray.length; i++) {
                for (let j = i; j < particlesArray.length; j++) {
                    const dx = particlesArray[i].x - particlesArray[j].x;
                    const dy = particlesArray[i].y - particlesArray[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = 'rgba(150, 150, 150, 0.1)';
                        ctx.lineWidth = 1;
                        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                        ctx.stroke();
                    }
                }
            }
        };

        initParticles();
        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
            aria-hidden="true"
        />
    );
};

export default BackgroundAnimation;