"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { bottombarLinks } from "@/constants";

const Bottombar = () => {
  const pathname = usePathname();
  const router = useRouter();

  // Prefetch all bottom bar routes on mount
  useEffect(() => {
    bottombarLinks.forEach(link => {
      router.prefetch(link.route);
    });
  }, [router]);

  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        const isCreateButton = link.route === "/create-post";
        
        // Special styling for center Create button
        if (isCreateButton) {
          return (
            <Link
              key={`bottombar-${link.label}`}
              href={link.route}
              className="flex-center flex-col -mt-5 transition-all duration-200">
              <div className={`p-3 rounded-full bg-primary-500 shadow-lg shadow-primary-500/40 transition-all duration-200 hover:scale-110 hover:shadow-primary-500/60 ${isActive ? 'ring-2 ring-primary-400 ring-offset-2 ring-offset-dark-2' : ''}`}>
                <img
                  src={link.imgURL}
                  alt={link.label}
                  width={20}
                  height={20}
                  className="brightness-0 invert"
                />
              </div>
            </Link>
          );
        }
        
        return (
          <Link
            key={`bottombar-${link.label}`}
            href={link.route}
            className="flex-center flex-col p-2 transition-all duration-200">
            <div className={`p-2 rounded-xl transition-all duration-200 ${isActive ? 'bg-primary-500/20' : ''}`}>
              <img
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
                className={`transition-all duration-200 ${isActive ? 'brightness-0 invert-0 sepia saturate-[10000%] hue-rotate-[335deg]' : 'opacity-70'}`}
                style={isActive ? { filter: 'brightness(0) saturate(100%) invert(21%) sepia(96%) saturate(4949%) hue-rotate(342deg) brightness(91%) contrast(94%)' } : {}}
              />
            </div>
          </Link>
        );
      })}
    </section>
  );
};

export default Bottombar;
