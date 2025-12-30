'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function FloatingHearts() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="absolute inset-0 pointer-events-none overflow-hidden" />;
  }

  // Modern geometric shapes and icons
  const shapes = [
    { icon: '◆', color: 'from-cyan-400/20 to-blue-500/20' },
    { icon: '●', color: 'from-purple-400/20 to-pink-500/20' },
    { icon: '▲', color: 'from-emerald-400/20 to-teal-500/20' },
    { icon: '◇', color: 'from-orange-400/20 to-red-500/20' },
    { icon: '■', color: 'from-violet-400/20 to-purple-500/20' },
    { icon: '○', color: 'from-rose-400/20 to-pink-500/20' },
    { icon: '▰', color: 'from-sky-400/20 to-cyan-500/20' },
    { icon: '▱', color: 'from-amber-400/20 to-yellow-500/20' },
  ];

  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 8,
    size: 4 + Math.random() * 8,
    shape: shapes[i % shapes.length],
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
          animate={{
            background: [
              'radial-gradient(circle, rgba(56, 189, 248, 0.3) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(56, 189, 248, 0.3) 0%, transparent 70%)',
            ],
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-10"
          animate={{
            background: [
              'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(56, 189, 248, 0.3) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)',
            ],
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2,
          }}
        />
      </div>

      {/* Floating Geometric Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute bg-gradient-to-br ${particle.shape.color} backdrop-blur-sm rounded-full flex items-center justify-center text-white/60 font-light`}
          style={{
            left: `${particle.left}%`,
            bottom: '-20px',
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [-20, -1200],
            x: [0, Math.random() * 100 - 50],
            rotate: [0, 180],
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 10,
            ease: "easeInOut",
          }}
        >
          <span className="text-xs">{particle.shape.icon}</span>
        </motion.div>
      ))}

      {/* Grid Dots Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Animated Lines */}
      <motion.div
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/20 to-transparent"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      />

      {/* Floating Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <motion.path
          d="M10,100 Q500,50 990,200"
          stroke="url(#gradient1)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.1 }}
          transition={{ duration: 3, delay: 1 }}
        />
        <motion.path
          d="M50,500 Q400,300 950,600"
          stroke="url(#gradient2)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.1 }}
          transition={{ duration: 3, delay: 2 }}
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>

      {/* Pulsing Orbs */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-cyan-400/10 to-blue-500/10 backdrop-blur-sm"
          style={{
            left: `${20 + i * 30}%`,
            top: `${20 + i * 20}%`,
            width: 100 + i * 50,
            height: 100 + i * 50,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4 + i * 2,
            repeat: Infinity,
            delay: i * 1.5,
          }}
        />
      ))}
    </div>
  );
}