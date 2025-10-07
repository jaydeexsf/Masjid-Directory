# Masjid Directory & Salah Times Platform

A comprehensive web application built with Next.js and MongoDB that connects Muslims with local mosques by providing accurate prayer times, mosque information, and community events.

## Features

### For Users
- **Search & Discovery**: Find mosques by name, location, or city
- **Prayer Times**: View accurate Salah times for Fajr, Dhuhr, Asr, Maghrib, Isha, and Jumuah
- **Community Events**: Stay updated with mosque events and activities
- **Location Services**: Get directions to nearby mosques
- **Mobile-Friendly**: Responsive design for all devices

### For Mosque Administrators
- **Self-Registration**: Mosques can register and manage their information
- **Prayer Times Management**: Update Salah times for different dates
- **Events Management**: Create and manage community events
- **Admin Dashboard**: Comprehensive control panel for mosque management
- **Contact Information**: Manage mosque contact details and Imam information

## Technology Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB, Mongoose
- **Authentication**: NextAuth.js (planned)
- **Image Storage**: Cloudinary (planned)
- **Maps**: Google Maps API (planned)
- **Deployment**: Vercel (recommended)

## Color Scheme

The application uses a carefully selected color palette inspired by Islamic design principles:

- **Primary Background**: `#E6E5E1` (Light warm gray)
- **Secondary Accent**: `#409891` (Deep teal)
- **Muted Accent**: `#BAD0CC` (Soft mint)
- **Primary Action**: `#48ADB7` (Bright teal)

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd masjid-directory
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # MongoDB Connection String
   MONGODB_URI=mongodb://localhost:27017/masjid-directory
   # For production, use MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/masjid-directory?retryWrites=true&w=majority
   
   # JWT Secret for session management
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   
   # Next.js Environment
   NODE_ENV=development
   
   # Optional: Cloudinary for image uploads (planned)
   # NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
   # CLOUDINARY_API_KEY=your-api-key
   # CLOUDINARY_API_SECRET=your-api-secret
   
   # Optional: Google Maps API (planned)
   # NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
masjid-directory/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   ├── admin/             # Admin dashboard
│   │   ├── mosque/            # Mosque detail pages
│   │   ├── register/          # Mosque registration
│   │   └── search/            # Search functionality
│   ├── components/            # Reusable components
│   ├── lib/                   # Utility functions
│   ├── models/                # MongoDB models
│   └── types/                 # TypeScript type definitions
├── public/                    # Static assets
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Mosques
- `GET /api/mosques` - Search mosques
- `POST /api/mosques` - Register new mosque (creates user account)
- `GET /api/mosques/[id]` - Get mosque details
- `PUT /api/mosques/[id]` - Update mosque information

### Prayer Times
- `GET /api/salah-times` - Get prayer times
- `POST /api/salah-times` - Update prayer times

### Events
- `GET /api/events` - Get mosque events
- `POST /api/events` - Create new event

### Database Testing
- `GET /api/test-db` - Test database connection

## Database Schema

### Mosque
```typescript
{
  name: string
  address: string
  city: string
  state: string
  country: string
  postalCode: string
  latitude: number
  longitude: number
  contactInfo: {
    phone?: string
    email?: string
    website?: string
  }
  imam: {
    name: string
    photo?: string
  }
  images: string[]
  isApproved: boolean
  adminId: string
}
```

### Prayer Times
```typescript
{
  masjidId: string
  date: Date
  fajr: string
  dhuhr: string
  asr: string
  maghrib: string
  isha: string
  jumuah?: string
}
```

### Events
```typescript
{
  masjidId: string
  title: string
  description: string
  date: Date
  time: string
  image?: string
  isRecurring: boolean
  recurringPattern?: 'weekly' | 'monthly' | 'yearly'
}
```

## Features Implementation Status

- ✅ **Project Setup**: Next.js with TypeScript and Tailwind CSS
- ✅ **Database Models**: MongoDB schemas for all entities
- ✅ **UI Components**: Responsive design with custom color scheme
- ✅ **Search Functionality**: Mosque search and filtering
- ✅ **Mosque Registration**: Multi-step registration form with user account creation
- ✅ **Admin Dashboard**: Prayer times and events management
- ✅ **API Routes**: Complete backend API implementation
- ✅ **Authentication**: JWT-based authentication system
- ✅ **User Management**: Secure user registration and login
- ✅ **Password Security**: Strong password validation and bcrypt hashing
- ✅ **Session Management**: JWT tokens with middleware protection
- 🔄 **Image Upload**: Cloudinary integration (planned)
- 🔄 **Maps Integration**: Google Maps API (planned)
- 🔄 **SEO Optimization**: Meta tags and structured data (planned)

## Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Set environment variables in Vercel dashboard**
3. **Deploy automatically on push to main branch**

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## Roadmap

- [ ] User authentication and authorization
- [ ] Image upload and management
- [ ] Google Maps integration
- [ ] Push notifications for events
- [ ] Multi-language support
- [ ] Review and rating system
- [ ] Export prayer times (PDF/ICS)
- [ ] Mobile app (React Native)

---

Built with ❤️ for the Muslim community
