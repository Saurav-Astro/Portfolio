"use client";

import { useRef, useEffect } from 'react';
import type { MousePosition, Particle } from '@/lib/types';

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if(canvasRef.current){
        const rect = canvasRef.current.getBoundingClientRect();
        mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const particles: Particle[] = [];
    const particleCount = 120; // Increased particle count

    const initParticles = () => {
        particles.length = 0;
        for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2.5 + 1, // Slightly smaller base size
            speedX: Math.random() * 0.6 - 0.3,
            speedY: Math.random() * 0.6 - 0.3,
            opacity: Math.random() * 0.6 + 0.4, // Increased opacity
            hue: Math.random() * 50 + 200,
        });
        }
    }
    initParticles();


    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, i) => {
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.x -= (dx / distance) * force * 1.5;
          particle.y -= (dy / distance) * force * 1.5;
        }

        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.hue += 0.2;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);

        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2.5
        );
        gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 80%, ${particle.opacity})`); // Increased lightness
        gradient.addColorStop(1, `hsla(${particle.hue}, 100%, 60%, 0)`);

        ctx.fillStyle = gradient;
        ctx.fill();

        particles.slice(i + 1).forEach(p2 => {
          const dx = particle.x - p2.x;
          const dy = particle.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            const lineOpacity = 0.5 * (1 - distance / 120);
            const lineGradient = ctx.createLinearGradient(particle.x, particle.y, p2.x, p2.y);
            lineGradient.addColorStop(0, `hsla(${particle.hue}, 100%, 80%, ${lineOpacity})`);
            lineGradient.addColorStop(1, `hsla(${p2.hue}, 100%, 80%, ${lineOpacity})`);
            ctx.strokeStyle = lineGradient;
            ctx.lineWidth = 0.5; // Thinner lines
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-20" />;
}
