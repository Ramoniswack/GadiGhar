import React from 'react';
import { Car, Shield, Award, Users, ArrowRight, Star, Zap, Globe } from 'lucide-react';
import { Page } from '../App';

interface HomepageProps {
  onPageChange: (page: Page) => void;
}

export default function Homepage({ onPageChange }: HomepageProps) {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-800"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-accent-400/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-success-400/20 rounded-full animate-float delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-secondary-400/20 rounded-full animate-float delay-2000"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div data-aos="fade-up" data-aos-duration="1000">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white leading-tight">
              Discover Your
              <span className="block bg-gradient-to-r from-accent-400 to-success-400 bg-clip-text text-transparent">
                Dream Car
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-primary-100 max-w-3xl mx-auto leading-relaxed">
              Experience luxury automotive excellence with our curated collection of premium vehicles from trusted sellers worldwide
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => onPageChange('search')}
                className="group bg-white text-primary-700 px-8 py-4 rounded-2xl font-semibold hover:bg-primary-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Explore Collection</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => onPageChange('dashboard')}
                className="group border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                <span>List Your Vehicle</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Why Choose 
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"> AutoDealer Pro</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              We revolutionize the automotive marketplace with cutting-edge technology and unparalleled service excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group text-center" data-aos="fade-up" data-aos-delay="100">
              <div className="relative mb-6">
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                  <Car className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-success-500 rounded-full flex items-center justify-center">
                  <Star className="h-3 w-3 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-neutral-900">Premium Vehicles</h3>
              <p className="text-neutral-600 leading-relaxed">
                Handpicked luxury and performance vehicles with verified authenticity and detailed histories
              </p>
            </div>

            <div className="group text-center" data-aos="fade-up" data-aos-delay="200">
              <div className="relative mb-6">
                <div className="bg-gradient-to-r from-success-500 to-success-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                  <Zap className="h-3 w-3 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-neutral-900">Secure Transactions</h3>
              <p className="text-neutral-600 leading-relaxed">
                Bank-level security with escrow services and comprehensive buyer protection programs
              </p>
            </div>

            <div className="group text-center" data-aos="fade-up" data-aos-delay="300">
              <div className="relative mb-6">
                <div className="bg-gradient-to-r from-accent-500 to-accent-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                  <Award className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-secondary-500 rounded-full flex items-center justify-center">
                  <Globe className="h-3 w-3 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-neutral-900">Best Value</h3>
              <p className="text-neutral-600 leading-relaxed">
                Competitive pricing with transparent fees and exclusive member benefits
              </p>
            </div>

            <div className="group text-center" data-aos="fade-up" data-aos-delay="400">
              <div className="relative mb-6">
                <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center">
                  <Star className="h-3 w-3 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-neutral-900">Expert Support</h3>
              <p className="text-neutral-600 leading-relaxed">
                24/7 concierge service with automotive specialists and personalized assistance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/30 to-secondary-900/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div data-aos="fade-up" data-aos-delay="100">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="text-5xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent mb-3">
                  25,000+
                </div>
                <div className="text-xl text-white font-medium">Premium Cars Sold</div>
                <div className="text-primary-300 text-sm mt-2">Trusted by luxury car enthusiasts</div>
              </div>
            </div>
            <div data-aos="fade-up" data-aos-delay="200">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="text-5xl font-bold bg-gradient-to-r from-success-400 to-accent-400 bg-clip-text text-transparent mb-3">
                  150,000+
                </div>
                <div className="text-xl text-white font-medium">Satisfied Customers</div>
                <div className="text-success-300 text-sm mt-2">5-star average rating</div>
              </div>
            </div>
            <div data-aos="fade-up" data-aos-delay="300">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="text-5xl font-bold bg-gradient-to-r from-accent-400 to-secondary-400 bg-clip-text text-transparent mb-3">
                  12,500+
                </div>
                <div className="text-xl text-white font-medium">Active Listings</div>
                <div className="text-accent-300 text-sm mt-2">Updated daily</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-accent-400/10 rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-success-400/10 rounded-full animate-bounce-gentle"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div data-aos="fade-up" data-aos-duration="1000">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Begin Your
              <span className="block bg-gradient-to-r from-accent-400 to-success-400 bg-clip-text text-transparent">
                Automotive Journey?
              </span>
            </h2>
            <p className="text-xl mb-12 text-primary-100 max-w-3xl mx-auto leading-relaxed">
              Join our exclusive community of automotive enthusiasts and discover the future of luxury car trading
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="group bg-white text-primary-700 px-10 py-4 rounded-2xl font-bold hover:bg-primary-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center space-x-2">
                <span>Start Exploring</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group border-2 border-white/30 text-white px-10 py-4 rounded-2xl font-bold hover:bg-white/10 backdrop-blur-sm transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
                <span>Become a Seller</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}