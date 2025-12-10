import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../src/globals.css'
import { QueryProvider } from '../src/lib/react-query/QueryProvider'
import { AuthProvider } from '../src/context/SupabaseAuthContext'
import { NotificationProvider } from '../src/context/NotificationContext'
import NotificationManager from '../src/components/NotificationManager'
import { Toaster } from '../src/components/ui/toaster'
import NavigationLoader from '../src/components/shared/NavigationLoader'
import { Suspense } from 'react'
import '../src/lib/utils/suppressAuthWarnings'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shadow',
  description: 'A social media application powered by Next.js and Supabase',
  icons: {
    icon: '/assets/images/shadow-icon.png',
    apple: '/assets/images/shadow-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <AuthProvider>
            <NotificationProvider>
              <Suspense fallback={null}>
                <NavigationLoader />
              </Suspense>
              {children}
              <NotificationManager />
              <Toaster />
            </NotificationProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
