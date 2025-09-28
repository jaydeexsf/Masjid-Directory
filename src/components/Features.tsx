import { Clock, MapPin, Calendar, Users, Shield, Smartphone } from 'lucide-react'

const features = [
  {
    icon: Clock,
    title: 'Accurate Prayer Times',
    description: 'Get precise Salah times for Fajr, Dhuhr, Asr, Maghrib, and Isha with Jumuah timings.',
  },
  {
    icon: MapPin,
    title: 'Location-Based Search',
    description: 'Find nearby masjids using your current location or search by city and address.',
  },
  {
    icon: Calendar,
    title: 'Community Events',
    description: 'Stay updated with mosque events, lectures, and community gatherings.',
  },
  {
    icon: Users,
    title: 'Community Connection',
    description: 'Connect with your local Muslim community and stay informed about activities.',
  },
  {
    icon: Shield,
    title: 'Verified Information',
    description: 'All mosque information is verified and updated by mosque administrators.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Friendly',
    description: 'Access prayer times and mosque information on any device, anywhere.',
  },
]

export default function Features() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide a comprehensive solution for connecting Muslims with their local communities 
            through accurate prayer times, mosque information, and community events.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-accent rounded-2xl p-8 text-white">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Ready to Find Your Local Masjid?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of Muslims who use our platform to stay connected with their community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/search" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Search Now
              </a>
              <a href="/register" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
                Register Masjid
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
