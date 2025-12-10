"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const NavigationLoader = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Reset when navigation completes
    setIsLoading(false);
    setProgress(100);
    
    const timeout = setTimeout(() => {
      setProgress(0);
    }, 200);

    return () => clearTimeout(timeout);
  }, [pathname, searchParams]);

  // Listen for navigation start
  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
      setProgress(30);
      
      // Simulate progress
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      return () => clearInterval(interval);
    };

    // Listen for link clicks
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link && link.href && !link.href.includes('#') && !link.target) {
        const url = new URL(link.href);
        if (url.origin === window.location.origin && url.pathname !== pathname) {
          handleStart();
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [pathname]);

  if (progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-1">
      <div
        className="h-full bg-gradient-to-r from-primary-500 to-primary-400 transition-all duration-200 ease-out"
        style={{ 
          width: `${progress}%`,
          boxShadow: '0 0 10px rgba(220, 20, 60, 0.5), 0 0 5px rgba(220, 20, 60, 0.3)'
        }}
      />
    </div>
  );
};

export default NavigationLoader;
