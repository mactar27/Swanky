'use client';

import { useEffect, useState } from 'react';

export function SplashScreen() {
  const [show, setShow] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    // Check if the splash screen has already been shown in this session
    const hasSeenSplash = sessionStorage.getItem('swanky_splash_seen');
    
    if (hasSeenSplash) {
      setShow(false);
      return;
    }

    // Mark as seen for this session
    sessionStorage.setItem('swanky_splash_seen', 'true');

    // Trigger fade-out animation after 2 seconds
    const timer1 = setTimeout(() => {
      setAnimateOut(true);
    }, 2000);

    // Remove from DOM entirely after 2.5 seconds
    const timer2 = setTimeout(() => {
      setShow(false);
    }, 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-500 ease-in-out ${
        animateOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="w-48 md:w-64 animate-pulse">
        <img
          src="/images.png"
          alt="Swanky Factory"
          className="w-full h-auto object-contain invert drop-shadow-2xl"
        />
      </div>
    </div>
  );
}
