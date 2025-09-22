import React, { useState } from 'react';
import { Plus, Car, DollarSign, Calendar, MapPin, TrendingUp, Users, Star } from 'lucide-react';
import { User, CarListing } from '../App';
import Swal from 'sweetalert2';

interface DashboardProps {
  onAddCar: (carData: Omit<CarListing, 'id' | 'seller'>) => void;
  currentUser: User | null;
}

export default function Dashboard({ onAddCar, currentUser }: DashboardProps) {
  const [showAddCarForm, setShowAddCarForm] = useState(false);
  const [carData, setCarData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    mileage: 0,
    location: '',
    price: 0
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCarData(prev => ({
      ...prev,
      [name]: name === 'year' || name === 'mileage' || name === 'price' ? Number(value) : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!carData.make.trim()) newErrors.make = 'Make is required';
    if (!carData.model.trim()) newErrors.model = 'Model is required';
    if (carData.year < 1900 || carData.year > new Date().getFullYear() + 1) {
      newErrors.year = 'Please enter a valid year';
    }
    if (carData.mileage < 0) newErrors.mileage = 'Mileage cannot be negative';
    if (!carData.location.trim()) newErrors.location = 'Location is required';
    if (carData.price <= 0) newErrors.price = 'Price must be greater than 0';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onAddCar(carData);
      setCarData({
        make: '',
        model: '',
        year: new Date().getFullYear(),
        mileage: 0,
        location: '',
        price: 0
      });
      setShowAddCarForm(false);
      
      Swal.fire({
        title: 'Car Listed Successfully!',
        text: 'Your vehicle has been added to the marketplace.',
        icon: 'success',
        confirmButtonText: 'View Listings',
        confirmButtonColor: '#0ea5e9',
        background: '#ffffff',
        customClass: {
          popup: 'rounded-2xl shadow-2xl',
          title: 'text-neutral-900 font-bold',
          content: 'text-neutral-600',
          confirmButton: 'rounded-xl px-6 py-3 font-semibold'
        }
      });
    }
  };

  const carMakes = [
    'Tesla', 'BMW', 'Mercedes-Benz', 'Audi', 'Porsche', 'Lamborghini', 'Ferrari',
    'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Volkswagen', 'Nissan', 'Hyundai', 
    'Kia', 'Mazda', 'Lexus', 'Infiniti', 'Acura', 'Cadillac', 'Other'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl shadow-2xl p-8 mb-8 text-white relative overflow-hidden" data-aos="fade-up">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          <div className="relative">
            <h1 className="text-4xl font-bold mb-3">
              Welcome back, {currentUser?.name}! 
            </h1>
            <p className="text-primary-100 text-lg">
              Manage your premium vehicle listings and track your sales performance from your personalized dashboard.
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105" data-aos="fade-up" data-aos-delay="100">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-3 rounded-xl shadow-lg">
                <Car className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-neutral-600 font-medium">Active Listings</p>
                <p className="text-2xl font-bold text-neutral-900">0</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105" data-aos="fade-up" data-aos-delay="150">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-success-500 to-success-600 p-3 rounded-xl shadow-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-neutral-600 font-medium">Total Revenue</p>
                <p className="text-2xl font-bold text-neutral-900">$0</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105" data-aos="fade-up" data-aos-delay="200">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-accent-500 to-accent-600 p-3 rounded-xl shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-neutral-600 font-medium">This Month</p>
                <p className="text-2xl font-bold text-neutral-900">0</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105" data-aos="fade-up" data-aos-delay="250">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 p-3 rounded-xl shadow-lg">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-neutral-600 font-medium">Rating</p>
                <p className="text-2xl font-bold text-neutral-900">5.0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Car Button */}
        <div className="mb-8" data-aos="fade-up" data-aos-delay="300">
          <button
            onClick={() => setShowAddCarForm(!showAddCarForm)}
            className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center space-x-3"
          >
            <Plus className="h-5 w-5" />
            <span>Add New Premium Vehicle</span>
          </button>
        </div>

        {/* Add Car Form */}
        {showAddCarForm && (
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 mb-8 border border-white/20" data-aos="fade-up" data-aos-delay="350">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-700 to-secondary-700 bg-clip-text text-transparent mb-8">
              Add New Vehicle Listing
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div data-aos="fade-up" data-aos-delay="400">
                  <label htmlFor="make" className="block text-sm font-semibold text-neutral-700 mb-2">
                    Make
                  </label>
                  <select
                    id="make"
                    name="make"
                    value={carData.make}
                    onChange={handleInputChange}
                    className={`block w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 ${
                      errors.make ? 'border-red-300 bg-red-50' : 'border-neutral-200 bg-white hover:border-primary-300'
                    }`}
                  >
                    <option value="">Select Make</option>
                    {carMakes.map(make => (
                      <option key={make} value={make}>{make}</option>
                    ))}
                  </select>
                  {errors.make && <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                    <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                    <span>{errors.make}</span>
                  </p>}
                </div>

                <div data-aos="fade-up" data-aos-delay="450">
                  <label htmlFor="model" className="block text-sm font-semibold text-neutral-700 mb-2">
                    Model
                  </label>
                  <input
                    type="text"
                    id="model"
                    name="model"
                    value={carData.model}
                    onChange={handleInputChange}
                    className={`block w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 ${
                      errors.model ? 'border-red-300 bg-red-50' : 'border-neutral-200 bg-white hover:border-primary-300'
                    }`}
                    placeholder="e.g., Model S, M4 Competition"
                  />
                  {errors.model && <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                    <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                    <span>{errors.model}</span>
                  </p>}
                </div>

                <div data-aos="fade-up" data-aos-delay="500">
                  <label htmlFor="year" className="block text-sm font-semibold text-neutral-700 mb-2">
                    Year
                  </label>
                  <input
                    type="number"
                    id="year"
                    name="year"
                    value={carData.year}
                    onChange={handleInputChange}
                    min="1900"
                    max={new Date().getFullYear() + 1}
                    className={`block w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 ${
                      errors.year ? 'border-red-300 bg-red-50' : 'border-neutral-200 bg-white hover:border-primary-300'
                    }`}
                  />
                  {errors.year && <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                    <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                    <span>{errors.year}</span>
                  </p>}
                </div>

                <div data-aos="fade-up" data-aos-delay="550">
                  <label htmlFor="mileage" className="block text-sm font-semibold text-neutral-700 mb-2">
                    Mileage
                  </label>
                  <input
                    type="number"
                    id="mileage"
                    name="mileage"
                    value={carData.mileage}
                    onChange={handleInputChange}
                    min="0"
                    className={`block w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 ${
                      errors.mileage ? 'border-red-300 bg-red-50' : 'border-neutral-200 bg-white hover:border-primary-300'
                    }`}
                    placeholder="e.g., 15000"
                  />
                  {errors.mileage && <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                    <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                    <span>{errors.mileage}</span>
                  </p>}
                </div>

                <div data-aos="fade-up" data-aos-delay="600">
                  <label htmlFor="location" className="block text-sm font-semibold text-neutral-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={carData.location}
                    onChange={handleInputChange}
                    className={`block w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 ${
                      errors.location ? 'border-red-300 bg-red-50' : 'border-neutral-200 bg-white hover:border-primary-300'
                    }`}
                    placeholder="e.g., San Francisco, CA"
                  />
                  {errors.location && <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                    <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                    <span>{errors.location}</span>
                  </p>}
                </div>

                <div data-aos="fade-up" data-aos-delay="650">
                  <label htmlFor="price" className="block text-sm font-semibold text-neutral-700 mb-2">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={carData.price}
                    onChange={handleInputChange}
                    min="1"
                    className={`block w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 ${
                      errors.price ? 'border-red-300 bg-red-50' : 'border-neutral-200 bg-white hover:border-primary-300'
                    }`}
                    placeholder="e.g., 89500"
                  />
                  {errors.price && <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                    <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                    <span>{errors.price}</span>
                  </p>}
                </div>
              </div>

              <div className="flex gap-4 pt-4" data-aos="fade-up" data-aos-delay="700">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-3 rounded-xl hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 font-semibold shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  List Vehicle
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddCarForm(false)}
                  className="bg-neutral-200 text-neutral-700 px-8 py-3 rounded-xl hover:bg-neutral-300 transition-all duration-300 font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Recent Activity */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20" data-aos="fade-up" data-aos-delay="750">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Recent Activity</h2>
          <div className="text-center py-12">
            <div className="bg-gradient-to-r from-primary-100 to-secondary-100 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Car className="h-12 w-12 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">No activity yet</h3>
            <p className="text-neutral-600 mb-6">
              Start by adding your first premium vehicle listing to see activity here.
            </p>
            <button
              onClick={() => setShowAddCarForm(true)}
              className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-3 rounded-xl hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
            >
              Add Your First Vehicle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}