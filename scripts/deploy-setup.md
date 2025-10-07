# Deployment Setup Guide

## For Vercel Deployment

### 1. Set up MongoDB Atlas (Recommended)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for all IPs in development)
5. Get your connection string

### 2. Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Go to Project Settings > Environment Variables
3. Add the following variables:
   - `MONGODB_URI`: `mongodb+srv://username:password@cluster.mongodb.net/masjid-directory?retryWrites=true&w=majority`
   - `JWT_SECRET`: Generate a secure random string (you can use: `openssl rand -base64 32`)

### 3. Test the deployment
1. Visit your deployed URL
2. Try registering a new mosque
3. Test the login functionality

## For Local Development

### 1. Set up MongoDB locally
1. Install MongoDB Community Server
2. Start the MongoDB service
3. The default connection string is: `mongodb://localhost:27017/masjid-directory`

### 2. Set up environment variables
Create a `.env.local` file in your project root:
```env
MONGODB_URI=mongodb://localhost:27017/masjid-directory
JWT_SECRET=your-local-development-secret-key
```

### 3. Run the application
```bash
npm run dev
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check your connection string format
- Verify network access (for Atlas)
- Check firewall settings

### Build Issues
- Make sure all environment variables are set
- Check that all dependencies are installed
- Verify TypeScript compilation

### Authentication Issues
- Ensure JWT_SECRET is set
- Check that bcryptjs is properly installed
- Verify user data is being saved to database
