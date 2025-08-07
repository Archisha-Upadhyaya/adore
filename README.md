# Rural Access Platform

A comprehensive web platform connecting rural communities with essential products and services. Built with Next.js, Supabase, and modern web technologies.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Authentication System**: Secure user registration and login
- **Product Catalog**: Browse and search essential products
- **Booking System**: Add products to cart and manage bookings
- **User Dashboard**: Profile management and booking history
- **Contact System**: Contact form with database storage
- **Service Listings**: Information about available services

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (Supabase)
- **Authentication**: JWT tokens with bcrypt password hashing
- **Deployment**: Vercel

## 📦 Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/rural-access-platform.git
cd rural-access-platform
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
Create a \`.env.local\` file in the root directory:
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
JWT_SECRET=your_jwt_secret_key
\`\`\`

4. Set up the database:
- Create a new Supabase project
- Run the SQL commands from \`scripts/create-tables.sql\` in your Supabase SQL editor

5. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🗄️ Database Schema

### Users Table
- \`id\`: Primary key
- \`name\`: User's full name
- \`email\`: Unique email address
- \`password\`: Hashed password
- \`phone\`: Optional phone number
- \`created_at\`, \`updated_at\`: Timestamps

### Bookings Table
- \`id\`: Primary key
- \`user_id\`: Foreign key to users table
- \`product_id\`: Product identifier
- \`product_name\`: Product name
- \`quantity\`: Number of items
- \`price\`: Product price
- \`created_at\`: Timestamp

### Contact Submissions Table
- \`id\`: Primary key
- \`name\`: Contact person's name
- \`email\`: Contact email
- \`message\`: Contact message
- \`created_at\`: Timestamp

## 🔐 Demo Credentials

For testing purposes, use these credentials:
- **Email**: admin@rural.com
- **Password**: password123

## 🚀 Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Environment Variables for Production

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
JWT_SECRET=your_strong_jwt_secret
\`\`\`

## 📱 Features Overview

### Homepage
- Hero section with call-to-action
- Services showcase (5 key services)
- Product catalog (8+ products)
- News & updates section
- Contact form with database integration

### Authentication
- User registration with validation
- Secure login system
- JWT token-based sessions
- Protected routes

### User Dashboard
- Profile management
- Booking history
- Edit profile functionality
- Responsive design

### Product System
- Product search and filtering
- Add to cart functionality
- Category-based organization
- Price display and management

## 🎨 Design System

### Color Palette [with mode toggle implementation]
- **Primary**: Black background
- **Accent**: Deep green (#1f7a1f)
- **Contrast**: Deep red (#a01c1c)
- **Text**: White
- **Font**: Inter (system fallback)

### Components
- Built with shadcn/ui components
- Consistent spacing and typography
- Mobile-responsive design
- Accessible form controls

## 🔧 API Endpoints

- \`GET /api/products\` - Fetch all products
- \`GET /api/services\` - Fetch all services
- \`POST /api/auth/register\` - User registration
- \`POST /api/auth/login\` - User login
- \`POST /api/contact\` - Submit contact form
- \`POST /api/bookings\` - Create booking
- \`GET /api/bookings?userId=X\` - Get user bookings
- \`PUT /api/user/[id]\` - Update user profile

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Email: support@ruralaccess.com
- Phone: 1-800-RURAL-HELP
- Create an issue on GitHub

## 🔮 Future Enhancements

- Real-time notifications
- Payment integration
- Advanced search filters
- Mobile app development
- Multi-language support
- Inventory management
- Order tracking system
