import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import DebugPanel from '@/components/DebugPanel'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Masjid Directory - Congregational Salah Times, Prayer Times & Mosque Information',
  description: 'Find local masjids and accurate congregational salah times, especially for small mosjids that don\'t have websites. View adhan and iqamah schedules (adhan typically 15 minutes before salah; Maghrib salah begins after adhan at sunset). Discover events and connect with your community.',
  keywords: [
    'masjid directory',
    'mosque finder',
    'congregation times',
    'iqamah times',
    'adhan times',
    'prayer times',
    'salah times',
    'jumuah time',
    'Islamic center',
    'mosque events',
    'small masjid without website',
  ],
  authors: [{ name: 'Masjid Directory' }],
  openGraph: {
    title: 'Masjid Directory – Find Congregational Salah Times Near You',
    description: 'Accurate congregational salah times and masjid details—built to serve small masjids without websites. Adhan is typically 15 minutes before salah (Maghrib salah starts after adhan at sunset).',
    type: 'website',
    locale: 'en_US',
    url: 'https://masjid.directory',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Masjid Directory – Congregational Salah & Community Events',
    description: 'Discover local masjids and reliable congregational salah times (adhan usually 15 minutes before; Maghrib salah follows adhan at sunset).',
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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Masjid Directory',
    url: 'https://masjid.directory',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://masjid.directory/search?q={query}',
      'query-input': 'required name=query',
    },
    description:
      "Find local masjids and accurate congregational salah times. Built for small masjids without websites. Adhan typically 15 minutes before salah; Maghrib salah begins after adhan at sunset.",
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-gradient-primary">
            {children}
          </div>
          <DebugPanel />
        </AuthProvider>
      </body>
    </html>
  )
}
