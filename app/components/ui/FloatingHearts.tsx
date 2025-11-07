'use client';

import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

export function FloatingHearts() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="absolute inset-0 pointer-events-none overflow-hidden" />;
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(8)].map((_, i) => {
        const left = 10 + Math.random() * 80;
        const duration = 8 + Math.random() * 4;
        const delay = i * 2;

        return (
          <div
            key={i}
            className="absolute text-rose-300/30 animate-float-heart"
            style={{
              left: `${left}%`,
              bottom: '-50px',
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              '--x-movement': `${Math.random() * 50 - 25}px`,
            } as React.CSSProperties}
          >
            <Heart size={24} fill="currentColor" />
          </div>
        );
      })}
    </div>
  );
}