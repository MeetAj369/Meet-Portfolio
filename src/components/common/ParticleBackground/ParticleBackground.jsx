import React, { useEffect, useRef } from 'react';
import styles from './ParticleBackground.module.css';

const ParticleBackground = ({ theme }) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const isDark = theme !== 'light';

    // Particle styling
    const P_COLOR = isDark ? '99,102,241' : '79,70,229';
    const COUNT = window.innerWidth < 768 ? 28 : 50;
    const MAX_DIST = 110;
    const P_OPACITY = isDark ? 0.35 : 0.2;
    const L_OPACITY = isDark ? 0.05 : 0.04;

    // Liquid Aurora Orbs parameters
    const orbs = [
      {
        baseX: 0.2, baseY: 0.25,
        radius: 450,
        speed: 0.0006,
        color: isDark ? [99, 102, 241] : [99, 102, 241], // Indigo
        alpha: isDark ? 0.16 : 0.09,
        phase: 0
      },
      {
        baseX: 0.8, baseY: 0.35,
        radius: 400,
        speed: 0.0008,
        color: isDark ? [34, 211, 238] : [6, 182, 212], // Cyan
        alpha: isDark ? 0.13 : 0.08,
        phase: Math.PI * 0.5
      },
      {
        baseX: 0.5, baseY: 0.75,
        radius: 480,
        speed: 0.0005,
        color: isDark ? [168, 85, 247] : [147, 51, 234], // Violet
        alpha: isDark ? 0.12 : 0.07,
        phase: Math.PI
      },
      {
        baseX: 0.15, baseY: 0.85,
        radius: 380,
        speed: 0.0007,
        color: isDark ? [236, 72, 153] : [244, 63, 94], // Rose / Pink
        alpha: isDark ? 0.09 : 0.05,
        phase: Math.PI * 1.5
      }
    ];

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let time = 0;
    let particles = [];

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const init = () => {
      particles = Array.from({ length: COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.3 + 0.4,
        o: Math.random() * P_OPACITY + 0.06,
      }));
    };

    const handleMouseMove = (e) => {
      mouseRef.current.targetX = (e.clientX / width - 0.5) * 45;
      mouseRef.current.targetY = (e.clientY / height - 0.5) * 45;
    };

    const draw = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // 1. Draw Liquid Aurora Glowing Orbs (ambient fluid backdrop for glass refraction)
      orbs.forEach((orb) => {
        const t = time * orb.speed + orb.phase;
        // Organic Lissajous figure motion
        const ox = (orb.baseX + Math.sin(t) * 0.12) * width + mx;
        const oy = (orb.baseY + Math.cos(t * 0.8) * 0.14) * height + my;
        const rad = orb.radius * (0.92 + Math.sin(t * 1.2) * 0.08);

        const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, rad);
        const [r, g, b] = orb.color;
        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${orb.alpha})`);
        grad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${orb.alpha * 0.45})`);
        grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(ox, oy, rad, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw Subtle Tech Constellation Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${P_COLOR}, ${p.o})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_DIST) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${P_COLOR}, ${L_OPACITY * (1 - d / MAX_DIST)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    resize();
    init();
    draw();

    const onResize = () => {
      resize();
      init();
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className={styles.particleCanvas} aria-hidden="true" />;
};

export default ParticleBackground;
