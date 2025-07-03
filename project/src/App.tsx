import React, { useState, useEffect } from 'react';
import { Car, User, Search, Info, Home, LogIn, UserPlus } from 'lucide-react';
import Layout from './components/Layout';
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SearchPage from './pages/SearchPage';
import AboutUs from './pages/AboutUs';
import { registerUser, loginUser, addCarListing } from './services/api';
import AOS from 'aos';
import 'aos/dist/aos.css';

export type Page = 'home' | 'registration' | 'login' | 'dashboard' | 'search' | 'about';

export interface User {
  name: string;
  username: string;
  email: string;
  address: string;
  phone: string;
}

export interface CarListing {
  id: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  location: string;
  price: number;
  seller: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);
  const [carListings, setCarListings] = useState<CarListing[]>([
    {
      id: '1',
      make: 'Tesla',
      model: 'Model S',
      year: 2023,
      mileage: 15000,
      location: 'San Francisco, CA',
      price: 89500,
      seller: 'demo_user'
    },
    {
      id: '2',
      make: 'BMW',
      model: 'M4 Competition',
      year: 2022,
      mileage: 8500,
      location: 'Los Angeles, CA',
      price: 78200,
      seller: 'demo_user'
    },
    {
      id: '3',
      make: 'Mercedes-Benz',
      model: 'AMG GT',
      year: 2023,
      mileage: 5200,
      location: 'Miami, FL',
      price: 142000,
      seller: 'demo_user'
    },
    {
      id: '4',
      make: 'Porsche',
      model: '911 Turbo S',
      year: 2022,
      mileage: 12000,
      location: 'New York, NY',
      price: 198500,
      seller: 'demo_user'
    },
    {
      id: '5',
      make: 'Audi',
      model: 'RS6 Avant',
      year: 2023,
      mileage: 3800,
      location: 'Chicago, IL',
      price: 125000,
      seller: 'demo_user'
    },
    {
      id: '6',
      make: 'Lamborghini',
      model: 'Huracán EVO',
      year: 2022,
      mileage: 2100,
      location: 'Las Vegas, NV',
      price: 285000,
      seller: 'demo_user'
    }
  ]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  // Load saved user data from localStorage on app initialization
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setIsLoggedIn(true);
    }
  }, []);

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search Cars', icon: Search },
    { id: 'about', label: 'About Us', icon: Info },
    ...(isLoggedIn 
      ? [{ id: 'dashboard', label: 'Dashboard', icon: Car }]
      : [
          { id: 'registration', label: 'Register', icon: UserPlus },
          { id: 'login', label: 'Login', icon: LogIn }
        ]
    )
  ];

  const handlePageChange = (page: Page) => {
    setCurrentPage(page);
  };

  const handleRegistration = async (userData: User & { password: string }) => {
    try {
      console.log('Registering user:', { ...userData, password: '[REDACTED]' });
      const result = await registerUser(userData);
      if (result.success) {
        setRegisteredUsers(prev => [...prev, userData]);
        setCurrentPage('login');
      } else {
        console.error('Registration failed:', result.message);
        alert(result.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  const handleLogin = async (username: string, password: string): Promise<boolean> => {
    try {
      console.log('Login attempt for:', username);
      const result = await loginUser(username, password);
      console.log('Login result:', result);
      
      if (result.success && result.user) {
        setIsLoggedIn(true);
        setCurrentUser(result.user);
        // Save user data to localStorage
        localStorage.setItem('currentUser', JSON.stringify(result.user));
        setCurrentPage('dashboard');
        return true;
      } else {
        alert(result.message || 'Login failed');
        return false;
      }
    } catch (error) {
      alert('Login failed. Please try again.');
      return false;
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    // Clear user data from localStorage
    localStorage.removeItem('currentUser');
    setCurrentPage('home');
  };

  const handleAddCar = async (carData: Omit<CarListing, 'id' | 'seller'>) => {
    try {
      const carWithSeller = {
        ...carData,
        seller: currentUser?.username || 'unknown'
      };
      
      const result = await addCarListing(carWithSeller);
      if (result.success && result.car) {
        setCarListings(prev => [...prev, result.car!]);
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert('Failed to add car listing. Please try again.');
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Homepage onPageChange={handlePageChange} />;
      case 'registration':
        return <Registration onRegister={handleRegistration} />;
      case 'login':
        return <Login onLogin={handleLogin} />;
      case 'dashboard':
        return <Dashboard onAddCar={handleAddCar} currentUser={currentUser} />;
      case 'search':
        return <SearchPage carListings={carListings} />;
      case 'about':
        return <AboutUs />;
      default:
        return <Homepage />;
    }
  };

  return (
    <Layout
      currentPage={currentPage}
      navigationItems={navigationItems}
      onPageChange={handlePageChange}
      isLoggedIn={isLoggedIn}
      currentUser={currentUser}
      onLogout={handleLogout}
    >
      {renderCurrentPage()}
    </Layout>
  );
}

export default App;