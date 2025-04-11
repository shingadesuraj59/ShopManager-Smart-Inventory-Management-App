import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-md shadow-lg py-3 z-10 border-b border-purple-900/30">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-2 justify-center items-center">
            <img 
              className="rounded-full animate-spin-slow" 
              src="logo.gif" 
              width={30} 
              height={30} 
              alt="logo" 
            />
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-2xl tracking-widest hover:from-pink-500 hover:to-purple-500 transition-all duration-500">
              ShopMananager
            </span>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleLogin}
              className="relative px-6 py-2 font-medium text-white group"
            >
              <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-purple-700 group-hover:bg-purple-600 group-hover:skew-x-12"></span>
              <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-purple-900 group-hover:bg-purple-700 group-hover:-skew-x-12"></span>
              <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-pink-600 -rotate-12 group-hover:block"></span>
              <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-purple-400 -rotate-12 group-hover:block"></span>
              <span className="relative">Log in</span>
            </button>
            <button
              onClick={handleSignup}
              className="relative px-6 py-2 font-medium text-white group"
            >
              <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 skew-x-12 bg-pink-600 group-hover:bg-pink-500 group-hover:-skew-x-12"></span>
              <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform -skew-x-12 bg-pink-800 group-hover:bg-pink-600 group-hover:skew-x-12"></span>
              <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-purple-600 -rotate-12 group-hover:block"></span>
              <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-pink-400 -rotate-12 group-hover:block"></span>
              <span className="relative">Sign Up</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-purple-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Revolutionize Your Inventory
          </h1>
          <h2 className="mt-6 text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            The most <span className="font-bold text-purple-300">powerful</span>, yet <span className="font-bold text-pink-300">simple</span> inventory management system you'll ever use
          </h2>
          <div className="mt-10 relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Discover inventory features..."
              className="w-full px-6 py-4 rounded-full bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
            />
            <button className="absolute right-2 top-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg">
              <i className="fas fa-search"></i> Search
            </button>
          </div>
          <div className="mt-8 flex justify-center gap-4">
            <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              Get Started Free
            </button>
            <button className="px-8 py-3 bg-gray-800 text-white rounded-full font-medium hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:border-gray-600">
              Watch Demo
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-64 -left-64 w-96 h-96 bg-purple-600 rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Powerful Features
            </h2>
            <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to manage your inventory efficiently
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-purple-500/20">
              <div className="w-14 h-14 bg-purple-900/30 rounded-lg flex items-center justify-center mb-4 border border-purple-500/30">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Real-time Tracking</h3>
              <p className="text-gray-300">Monitor your inventory levels in real-time with our intuitive dashboard.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-pink-500 transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-pink-500/20">
              <div className="w-14 h-14 bg-pink-900/30 rounded-lg flex items-center justify-center mb-4 border border-pink-500/30">
                <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Smart Analytics</h3>
              <p className="text-gray-300">Get actionable insights with our advanced reporting and analytics tools.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-purple-500/20">
              <div className="w-14 h-14 bg-purple-900/30 rounded-lg flex items-center justify-center mb-4 border border-purple-500/30">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Automated Alerts</h3>
              <p className="text-gray-300">Never run out of stock with our smart low-stock notifications.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Design Cards Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -bottom-64 -right-64 w-96 h-96 bg-pink-600 rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-blob animation-delay-6000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
              Stunning Visualizations
            </h2>
            <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
              Beautiful dashboards that make data easy to understand
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 h-96">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt="Dashboard"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-2xl font-bold text-white">Interactive Dashboards</h3>
                  <p className="mt-2 text-gray-300 group-hover:text-white transition-colors duration-300">
                    Real-time data visualization
                  </p>
                </div>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 h-96">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt="Analytics"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-2xl font-bold text-white">Advanced Analytics</h3>
                  <p className="mt-2 text-gray-300 group-hover:text-white transition-colors duration-300">
                    Deep insights into your business
                  </p>
                </div>
              </div>
            </div>
            
            {/* Card 3 */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 h-96">
              <img
                src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt="Reports"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-2xl font-bold text-white">Custom Reports</h3>
                  <p className="mt-2 text-gray-300 group-hover:text-white transition-colors duration-300">
                    Tailored to your business needs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900 to-pink-900 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to transform your inventory management?
          </h2>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto mb-10">
            Join thousands of businesses that trust Vyapar for their inventory needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={handleSignup}
              className="px-8 py-4 bg-white text-purple-900 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Start Free Trial
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl">
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex gap-2 justify-center items-center mb-6 md:mb-0">
              <img 
                className="rounded-full animate-spin-slow" 
                src="logo.gif" 
                width={30} 
                height={30} 
                alt="logo" 
              />
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-2xl tracking-widest">
                ShopManager
              </span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                <span className="sr-only">Facebook</span>
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors duration-300">
                <span className="sr-only">Twitter</span>
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                <span className="sr-only">Instagram</span>
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors duration-300">
                <span className="sr-only">LinkedIn</span>
                <i className="fab fa-linkedin-in text-xl"></i>
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 ShaopManager. All rights reserved.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;