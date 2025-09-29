'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-primary">
      <Header />
      <main className="py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 mb-6">Last updated: {new Date().getFullYear()}</p>

          <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Information We Collect</h2>
          <p className="text-gray-700 mb-4">We collect account details you provide, masjid information submitted by admins, and usage data (e.g., pages viewed) to improve the service.</p>

          <h2 className="text-xl font-semibold text-gray-900 mb-2">2. How We Use Information</h2>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
            <li>Provide and improve the directory and search features</li>
            <li>Display accurate salah times and community events</li>
            <li>Communicate with you about updates and support</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Data Sharing</h2>
          <p className="text-gray-700 mb-4">We do not sell your personal data. We may share limited information with service providers strictly to operate our application.</p>

          <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Cookies</h2>
          <p className="text-gray-700 mb-4">We use cookies to keep you signed in and remember preferences. You can manage cookies via your browser settings.</p>

          <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Your Rights</h2>
          <p className="text-gray-700 mb-4">You may request access, correction, or deletion of your data. Contact us at support@masjid.directory.</p>

          <h2 className="text-xl font-semibold text-gray-900 mb-2">6. Security</h2>
          <p className="text-gray-700 mb-4">We apply reasonable safeguards to protect data. No method of transmission is 100% secure.</p>

          <h2 className="text-xl font-semibold text-gray-900 mb-2">7. Children’s Privacy</h2>
          <p className="text-gray-700 mb-4">Our service is not directed to children under 13. We do not knowingly collect data from children.</p>

          <h2 className="text-xl font-semibold text-gray-900 mb-2">8. Changes</h2>
          <p className="text-gray-700 mb-4">We may update this policy. We will post the updated policy on this page.</p>

          <h2 className="text-xl font-semibold text-gray-900 mb-2">9. Contact</h2>
          <p className="text-gray-700">For questions, email <a href="mailto:support@masjid.directory" className="text-primary-600">support@masjid.directory</a>.</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
