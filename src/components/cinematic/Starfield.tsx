import React, { useEffect, useRef } from 'react';

interface StarfieldProps {
  warpSpeed?: boolean;
}

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
  twinklePhase: number;
}

export const Starfield: React.FC<StarfieldProps> = ({ warpSpeed = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const numStars = Math.min(280, Math.floor((width * height) / 4500));
    const stars: Star[] = [];
    const colors = ['#FFFFFF', '#D8B45A', '#F5D98A', '#CAE9FF', '#FFE81F', '#F5F5F5'];

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * width,
        size: Math.random() * 1.6 + 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    let speed = warpSpeed ? 35 : 0.6;

    const render = () => {
      const targetSpeed = warpSpeed ? 35 : 0.6;
      // Smooth interpolation for speed
      speed += (targetSpeed - speed) * 0.08;

      ctx.fillStyle = warpSpeed ? 'rgba(5, 5, 5, 0.28)' : 'rgba(5, 5, 5, 0.95)';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.z -= speed;

        if (star.z <= 0) {
          star.z = width;
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
        }

        const k = 250 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const size = Math.max(0.3, star.size * k * 0.9);
          star.twinklePhase += 0.04;
          const alpha = warpSpeed ? 0.9 : 0.35 + 0.45 * Math.sin(star.twinklePhase);

          ctx.save();
          ctx.beginPath();
          ctx.fillStyle = star.color;
          ctx.globalAlpha = Math.min(1, Math.max(0.1, alpha));

          if (warpSpeed) {
            // Draw hyperspace streak
            const prevK = 250 / (star.z + speed * 1.5);
            const prevPx = star.x * prevK + cx;
            const prevPy = star.y * prevK + cy;

            ctx.lineWidth = size * 1.5;
            ctx.strokeStyle = star.color;
            ctx.moveTo(prevPx, prevPy);
            ctx.lineTo(px, py);
            ctx.stroke();
          } else {
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fill();

            // Symmetrical subtle glow for bright stars
            if (size > 1.8) {
              ctx.shadowColor = star.color;
              ctx.shadowBlur = 8;
              ctx.stroke();
            }
          }
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [warpSpeed]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
