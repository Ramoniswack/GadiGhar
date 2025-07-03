import React, { useState } from 'react';
import { LogIn as LoginIcon, Lock, User, Eye, EyeOff } from 'lucide-react';
import Swal from 'sweetalert2';

interface LoginProps {
  onLogin: (username: string, password: string) => Promise<boolean>;
}

export default function Login({ onLogin }: LoginProps) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentials.username || !credentials.password) {
      setError('Please enter both username and password');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      // Call the actual backend through App.tsx handler
      const success = await onLogin(credentials.username, credentials.password);
      
      if (success) {
        // Login successful - App.tsx handles the user state
        // SweetAlert is already shown in App.tsx, so we don't need to show it here
      } else {
        // Login failed - error handling is done in App.tsx
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Unable to connect to server. Please check if the backend is running.');
      
      Swal.fire({
        title: 'Connection Error',
        text: 'Unable to connect to the server. Please make sure the PHP backend is running on port 8000.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ef4444',
        background: '#ffffff',
        customClass: {
          popup: 'rounded-2xl shadow-2xl',
          title: 'text-neutral-900 font-bold',
          confirmButton: 'rounded-xl px-6 py-3 font-semibold'
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20" data-aos="fade-up">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <LoginIcon className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-700 to-secondary-700 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-neutral-600 mt-3 leading-relaxed">
              Sign in to your seller account and manage your listings
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div data-aos="fade-up" data-aos-delay="100">
              <label htmlFor="username" className="block text-sm font-semibold text-neutral-700 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={credentials.username}
                  onChange={handleInputChange}
                  className="block w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white hover:border-primary-300 transition-all duration-300"
                  placeholder="Enter your username"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div data-aos="fade-up" data-aos-delay="150">
              <label htmlFor="password" className="block text-sm font-semibold text-neutral-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  className="block w-full pl-12 pr-12 py-3 border border-neutral-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white hover:border-primary-300 transition-all duration-300"
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4" data-aos="fade-up" data-aos-delay="200">
                <p className="text-sm text-red-600 flex items-center space-x-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  <span>{error}</span>
                </p>
              </div>
            )}

            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 rounded-xl p-4" data-aos="fade-up" data-aos-delay="250">
              <p className="text-sm text-primary-700 flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                <span><strong>Demo Access:</strong> Use "demo" for both username and password</span>
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-4 px-6 rounded-xl hover:from-primary-700 hover:to-secondary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-300 font-semibold shadow-xl hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              data-aos="fade-up" 
              data-aos-delay="300"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-8 text-center" data-aos="fade-up" data-aos-delay="350">
            <p className="text-sm text-neutral-600">
              Don't have an account?{' '}
              <span className="text-primary-600 hover:text-primary-500 cursor-pointer font-semibold transition-colors">
                Register here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}