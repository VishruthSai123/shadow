'use client';

import { useEffect, useState } from 'react';
import { QueryProvider } from '../../src/lib/react-query/QueryProvider';
import { AuthProvider, useUserContext } from '../../src/context/SupabaseAuthContext';
import Topbar from '../../src/components/shared/Topbar';
import LeftSidebar from '../../src/components/shared/LeftSidebar';
import Bottombar from '../../src/components/shared/Bottombar';
import Loader from '../../src/components/shared/Loader';
import { Toaster } from '../../src/components/ui/toaster';
import { useRouter } from 'next/navigation';

// Hook to detect if we're on desktop
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    // Check on mount
    checkIsDesktop();
    
    // Listen for resize
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  return isDesktop;
}

function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useUserContext();
  const router = useRouter();
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/sign-in');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex-center w-full h-screen bg-dark-1">
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="w-full md:flex">
      <Topbar />
      {/* Only render sidebar on desktop to prevent mobile interference */}
      {isDesktop && <LeftSidebar />}

      <section className="flex flex-1 h-full">
        {children}
      </section>

      <Bottombar />
    </div>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex-center w-full h-screen bg-dark-1">
        <Loader />
      </div>
    );
  }

  return (
    <QueryProvider>
      <AuthProvider>
        <AuthenticatedLayout>
          {children}
        </AuthenticatedLayout>
        <Toaster />
      </AuthProvider>
    </QueryProvider>
  );
}
