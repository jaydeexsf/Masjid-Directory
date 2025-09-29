import Header from '@/components/Header'
import Hero from '@/components/Hero'
import SearchSection from '@/components/SearchSection'
import Features from '@/components/Features'
import Footer from '@/components/Footer'
import AnnouncementsStrip from '@/components/AnnouncementsStrip'
import NextPrayerCard from '@/components/NextPrayerCard'
import FeaturedMosques from '@/components/FeaturedMosques'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <AnnouncementsStrip />
      <Hero />
      <NextPrayerCard />
      <SearchSection />
      <FeaturedMosques />
      <Features />
      <Footer />
    </main>
  )
}
