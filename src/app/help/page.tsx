import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-primary">
      <Header />
      <main className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Help & Support</h1>
            
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h2>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-primary-600 pl-4">
                    <h3 className="font-semibold text-gray-800">How do I register my mosque?</h3>
                    <p className="text-gray-600 mt-2">Click on "Register Your Masjid" and fill out the multi-step form with your mosque's information, contact details, and create an admin account.</p>
                  </div>
                  
                  <div className="border-l-4 border-primary-600 pl-4">
                    <h3 className="font-semibold text-gray-800">How do I update prayer times?</h3>
                    <p className="text-gray-600 mt-2">Log in to your admin dashboard and use the Prayer Times Manager to set and update daily prayer schedules.</p>
                  </div>
                  
                  <div className="border-l-4 border-primary-600 pl-4">
                    <h3 className="font-semibold text-gray-800">Can I add events to my mosque?</h3>
                    <p className="text-gray-600 mt-2">Yes! Use the Events Manager in your admin dashboard to create and manage community events.</p>
                  </div>
                  
                  <div className="border-l-4 border-primary-600 pl-4">
                    <h3 className="font-semibold text-gray-800">How do I find nearby mosques?</h3>
                    <p className="text-gray-600 mt-2">Use the search feature on the homepage to find mosques by name, city, or location.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Support</h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-600 mb-4">
                    Need additional help? We're here to assist you with any questions or issues.
                  </p>
                  <div className="space-y-2">
                    <p><strong>Email:</strong> support@masjid-directory.com</p>
                    <p><strong>Phone:</strong> (555) 123-4567</p>
                    <p><strong>Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Technical Issues</h2>
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-800 mb-2">Location Services</h3>
                  <p className="text-blue-700 mb-3">
                    If you're having trouble with location services:
                  </p>
                  <ul className="list-disc list-inside text-blue-700 space-y-1">
                    <li>Make sure your browser has permission to access your location</li>
                    <li>Check that location services are enabled on your device</li>
                    <li>Try refreshing the page and allowing location access when prompted</li>
                    <li>You can always enter coordinates manually if needed</li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
