# Wellness Subscription Manager

A modern wellness platform for managing fitness subscriptions, class bookings, and nutrition plans.

## 🚀 Features

- **Calendar Integration**: Functional calendar modal with date selection and booking display
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Authentication**: Clerk integration with secure user management
- **Demo Mode**: Full functionality without backend dependencies
- **Booking System**: Class scheduling and management
- **Subscription Plans**: Multiple tiers with feature comparison
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS

## 🛠 Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- React Router for navigation
- Clerk for authentication
- Lucide React for icons

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT authentication
- RESTful API design

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Touch-friendly interfaces
- Adaptive layouts for all screen sizes
- Optimized performance

## 🗓 Calendar Features

- Interactive monthly calendar view
- Date selection functionality
- Visual indicators for booked dates
- Detailed booking information display
- Navigation between months

## 🔧 Demo Mode

The application includes a fully functional demo mode that:
- Uses localStorage for data persistence
- Simulates booking and subscription management
- Requires no backend setup
- Perfect for demonstrations

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Sumit3754/WellnessSubscriptionManager.git
cd WellnessSubscriptionManager
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

4. Set up environment variables:
```bash
# Frontend (frontend/.env.local)
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key

# Backend (backend/.env)
MONGODB_URI=your_mongodb_uri
```

5. Run the application:
```bash
# Frontend (port 5173)
cd frontend && npm run dev

# Backend (port 5000)
cd backend && npm start
```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.