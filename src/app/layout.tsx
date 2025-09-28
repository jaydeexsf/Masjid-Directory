import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Masjid Directory - Find Prayer Times & Mosque Information',
  description: 'Discover local mosques, prayer times, and community events. Connect with your local Muslim community through our comprehensive mosque directory.',
  keywords: 'mosque, prayer times, salah, masjid, islam, community, events',
  authors: [{ name: 'Masjid Directory' }],
  openGraph: {
    title: 'Masjid Directory - Find Prayer Times & Mosque Information',
    description: 'Discover local mosques, prayer times, and community events.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Masjid Directory - Find Prayer Times & Mosque Information',
    description: 'Discover local mosques, prayer times, and community events.',
  },
  robots: {
    index: true,
    follow: true,
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
        <div className="min-h-screen bg-gradient-primary">
          {children}
        </div>
      </body>
    </html>
  )
}
