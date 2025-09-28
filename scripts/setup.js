#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Masjid Directory...\n');

// Create .env.local file if it doesn't exist
const envPath = path.join(__dirname, '..', '.env.local');
const envExamplePath = path.join(__dirname, '..', '.env.example');

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ Created .env.local from .env.example');
  } else {
    const envContent = `# Database
MONGODB_URI=mongodb://localhost:27017/masjid-directory

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Cloudinary (for image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Google Maps (for location services)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key`;

    fs.writeFileSync(envPath, envContent);
    console.log('✅ Created .env.local with default values');
  }
} else {
  console.log('✅ .env.local already exists');
}

console.log('\n📋 Next steps:');
console.log('1. Update .env.local with your actual API keys');
console.log('2. Start MongoDB (local or use MongoDB Atlas)');
console.log('3. Run: npm run dev');
console.log('4. Open http://localhost:3000');
console.log('\n🎉 Setup complete!');
