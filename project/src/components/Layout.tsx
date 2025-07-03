import React from 'react';
import { LogOut, Menu, X } from 'lucide-react';
import { Page, User } from '../App';
import gadiBazaarLogo from '../assets/image.png';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  navigationItems: NavigationItem[];
  onPageChange: (page: Page) => void;
  isLoggedIn: boolean;
  currentUser: User | null;
  onLogout: () => void;
}

export default function Layout({
  children,
  currentPage,
  navigationItems,
  onPageChange,
  isLoggedIn,
  currentUser,
  onLogout
}: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50 flex flex-col">
      {/* Floating Header */}
      <header className="fixed top-0 left-0 right-0 z-50 sm:top-4 sm:left-4 sm:right-4">
        <div className="bg-white/90 backdrop-blur-md shadow-2xl sm:rounded-3xl border border-white/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
            
              {/* Logo - Much Larger */}
              <div 
                className="flex items-center cursor-pointer group flex-shrink-0"
                onClick={() => onPageChange('home')}
              >
                <img 
                  src={gadiBazaarLogo} 
                  alt="GadiBazaar" 
                  className="h-24 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Desktop Navigation - Center */}
              <nav className="hidden md:flex items-center space-x-3 flex-1 justify-center">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onPageChange(item.id as Page)}
                      className={`flex items-center space-x-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                        currentPage === item.id
                          ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg scale-105'
                          : 'text-neutral-600 hover:bg-primary-50 hover:text-primary-700 hover:shadow-md hover:scale-105'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* User Section - Right */}
              <div className="flex items-center space-x-4">
                {isLoggedIn && (
                  <>
                    <div className="hidden lg:flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white text-sm font-semibold">
                          {currentUser?.name.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm text-neutral-700 font-medium">
                        {currentUser?.name}
                      </span>
                    </div>
                    <button
                      onClick={onLogout}
                      className="hidden md:flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 hover:shadow-md transition-all duration-300"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </>
                )}

                {/* Mobile menu button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-3 rounded-xl text-neutral-600 hover:bg-primary-50 hover:text-primary-700 transition-all duration-300"
                >
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
              <div className="md:hidden py-4 border-t border-neutral-200 animate-slide-down">
                <div className="space-y-2">
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          onPageChange(item.id as Page);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                          currentPage === item.id
                            ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                            : 'text-neutral-600 hover:bg-primary-50 hover:text-primary-700'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                  
                  {isLoggedIn && (
                    <div className="pt-4 border-t border-neutral-200">
                      <div className="px-4 py-2 text-sm text-neutral-600 font-medium">
                        Hello, {currentUser?.name}
                      </div>
                      <button
                        onClick={() => {
                          onLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-300"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-20 sm:pt-28">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/20 to-secondary-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
           <div data-aos="fade-up" data-aos-delay="100">
  <div className="flex items-center justify-center sm:justify-start mb-6">
    <div className="h-24 w-auto sm:w-48 sm:h-20 relative">
      <img 
        src={gadiBazaarLogo} 
        alt="GadiBazaar" 
                  className="h-24 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
      />
    </div>
  </div>
  <p className="text-neutral-300 leading-relaxed">
                Your trusted partner in automotive excellence, connecting buyers with premium vehicles across Nepal.
              </p>
            </div>
            
            <div data-aos="fade-up" data-aos-delay="200">
              <h3 className="text-lg font-semibold mb-6 text-white">Contact Info</h3>
              <div className="space-y-3 text-neutral-300">
                <p className="flex items-center space-x-2">
                  <span>📍</span>
                  <span>Pokhara-02, Nepal</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span>📞</span>
                  <span>(977) 98110201021</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span>✉️</span>
                  <span>info@gadibazaar.com</span>
                </p>
              </div>
            </div>
            
            <div data-aos="fade-up" data-aos-delay="300">
              <h3 className="text-lg font-semibold mb-6 text-white">Business Hours</h3>
              <div className="space-y-3 text-neutral-300">
                <p className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="text-primary-400">9:00 AM - 7:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="text-primary-400">9:00 AM - 6:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="text-primary-400">11:00 AM - 5:00 PM</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-neutral-700 mt-12 pt-8 text-center">
            <p className="text-neutral-400">
              &copy; 2024 GadiBazaar. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}