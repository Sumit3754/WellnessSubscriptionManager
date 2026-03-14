import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { Clipboard, Calendar, CreditCard, ArrowRight } from 'lucide-react';

// Import pages
import Plans from './pages/Plans';
import Dashboard from './pages/Dashboard';
import Schedule from './pages/Schedule';
import About from './pages/About';
import Admin from './pages/Admin';

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section 
        className="pt-24 pb-16 px-4 bg-gradient-to-br from-emerald-50 to-blue-50 relative overflow-hidden"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/3822719/pexels-photo-3822719.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-emerald-800/80"></div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            Simplify Your Wellness Journey
          </h1>
          <p className="text-lg sm:text-xl text-emerald-50 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Manage your fitness and diet plans all in one place
          </p>
          <Link to="/plans">
            <button className="bg-white text-emerald-700 px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-emerald-50 transition-all duration-300 shadow-lg hover:shadow-xl group">
              Get Started
              <ArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-12 sm:py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Subscription Plan Manager */}
            <div className="group bg-white rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                style={{
                  backgroundImage: `url('https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=800')`
                }}
              ></div>
              <div className="bg-emerald-100 w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clipboard className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                Subscription Plan Manager
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Create and edit your wellness plans with our intuitive subscription manager.
              </p>
            </div>

            {/* Session Scheduler */}
            <div className="group bg-white rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                style={{
                  backgroundImage: `url('https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?auto=compress&cs=tinysrgb&w=800')`
                }}
              ></div>
              <div className="bg-blue-100 w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                Session Scheduler
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Book classes and events with ease using our streamlined scheduling system.
              </p>
            </div>

            {/* Payment Gateway */}
            <div className="group bg-white rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                style={{
                  backgroundImage: `url('https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800')`
                }}
              ></div>
              <div className="bg-purple-100 w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <CreditCard className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                Payment Gateway
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Track and manage your payments securely with our integrated payment system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-12 sm:py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.pexels.com/photos/8436741/pexels-photo-8436741.jpeg?auto=compress&cs=tinysrgb&w=1920')`
              }}
            ></div>
            <div className="absolute inset-0 bg-emerald-900/80"></div>
            <div className="relative z-10 py-12 sm:py-16 px-6 sm:px-8 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8">
                "Vitalcore has transformed how I manage my wellness routine"
              </h2>
              <p className="text-lg sm:text-xl text-emerald-50 mb-4 sm:mb-6 max-w-3xl mx-auto">
                The all-in-one platform that makes tracking fitness subscriptions and scheduling wellness sessions effortless.
              </p>
              <p className="text-emerald-200 font-medium text-sm sm:text-base">Sarah Johnson, Fitness Enthusiast</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/about" element={<About />} />
            <Route path="/coreadmin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;