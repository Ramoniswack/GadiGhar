import React, { useState, useMemo } from 'react';
import { Search, MapPin, Calendar, DollarSign, Car, Filter, X } from 'lucide-react';
import { CarListing } from '../App';
import { CarDetails, getCarDetails } from '../services/api';
import Swal from 'sweetalert2';

interface SearchPageProps {
  carListings: CarListing[];
}

export default function SearchPage({ carListings }: SearchPageProps) {
  const [searchFilters, setSearchFilters] = useState({
    model: '',
    location: '',
    maxPrice: '',
    minYear: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  const filteredCars = useMemo(() => {
    return carListings.filter(car => {
      const matchesModel = !searchFilters.model || 
        car.model.toLowerCase().includes(searchFilters.model.toLowerCase()) ||
        car.make.toLowerCase().includes(searchFilters.model.toLowerCase());
      
      const matchesLocation = !searchFilters.location || 
        car.location.toLowerCase().includes(searchFilters.location.toLowerCase());
      
      const matchesPrice = !searchFilters.maxPrice || 
        car.price <= Number(searchFilters.maxPrice);
      
      const matchesYear = !searchFilters.minYear || 
        car.year >= Number(searchFilters.minYear);

      return matchesModel && matchesLocation && matchesPrice && matchesYear;
    });
  }, [carListings, searchFilters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setSearchFilters({
      model: '',
      location: '',
      maxPrice: '',
      minYear: ''
    });
  };

  const handleViewDetails = async (carId: string) => {
    try {
      const result = await getCarDetails(carId);
      if (result.success && result.car) {
        await Swal.fire({
          title: `${result.car.year} ${result.car.make} ${result.car.model}`,
          html: `
            <div class="space-y-4 text-left">
              <div class="flex items-center space-x-2">
                <span class="text-neutral-500"><i class="fas fa-map-marker-alt"></i></span>
                <span>${result.car.location}</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-neutral-500"><i class="fas fa-tachometer-alt"></i></span>
                <span>${result.car.mileage.toLocaleString()} miles</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-neutral-500"><i class="fas fa-dollar-sign"></i></span>
                <span>$${result.car.price.toLocaleString()}</span>
              </div>
              <hr class="my-4">
              <h3 class="font-semibold text-lg mb-2">Seller Information</h3>
              <div class="space-y-2">
                <div class="flex items-center space-x-2">
                  <span class="text-neutral-500"><i class="fas fa-user"></i></span>
                  <span>${result.car.seller_name}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="text-neutral-500"><i class="fas fa-phone"></i></span>
                  <span>${result.car.seller_phone}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="text-neutral-500"><i class="fas fa-envelope"></i></span>
                  <span>${result.car.seller_email}</span>
                </div>
              </div>
            </div>
          `,
          showCloseButton: true,
          showConfirmButton: false,
          customClass: {
            popup: 'rounded-3xl shadow-2xl',
            title: 'text-2xl font-bold text-neutral-900',
            htmlContainer: 'text-neutral-700'
          }
        });
      } else {
        throw new Error(result.message || 'Failed to fetch car details');
      }
    } catch (error) {
      console.error('Error viewing car details:', error);
      await Swal.fire({
        title: 'Error',
        text: error instanceof Error ? error.message : 'Failed to load car details',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ef4444',
        customClass: {
          popup: 'rounded-2xl shadow-2xl',
          title: 'text-neutral-900 font-bold',
          htmlContainer: 'text-neutral-600',
          confirmButton: 'rounded-xl px-6 py-3 font-semibold'
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary-700 to-secondary-700 bg-clip-text text-transparent">
              Discover Premium Vehicles
            </span>
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Explore our curated collection of luxury and performance vehicles from trusted sellers worldwide
          </p>
        </div>

        {/* Search Filters */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-6 mb-8 border border-white/20" data-aos="fade-up" data-aos-delay="100">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-4 py-2 rounded-xl font-semibold"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>
          </div>

          <div className={`grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4 ${showFilters ? 'block' : 'hidden lg:grid'}`}>
            <div data-aos="fade-up" data-aos-delay="150">
              <label htmlFor="model" className="block text-sm font-semibold text-neutral-700 mb-2">
                Make or Model
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={searchFilters.model}
                  onChange={handleFilterChange}
                  className="block w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white hover:border-primary-300 transition-all duration-300"
                  placeholder="e.g., Tesla, BMW M4"
                />
              </div>
            </div>

            <div data-aos="fade-up" data-aos-delay="200">
              <label htmlFor="location" className="block text-sm font-semibold text-neutral-700 mb-2">
                Location
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={searchFilters.location}
                  onChange={handleFilterChange}
                  className="block w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white hover:border-primary-300 transition-all duration-300"
                  placeholder="e.g., San Francisco, CA"
                />
              </div>
            </div>

            <div data-aos="fade-up" data-aos-delay="250">
              <label htmlFor="maxPrice" className="block text-sm font-semibold text-neutral-700 mb-2">
                Max Price
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="number"
                  id="maxPrice"
                  name="maxPrice"
                  value={searchFilters.maxPrice}
                  onChange={handleFilterChange}
                  className="block w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white hover:border-primary-300 transition-all duration-300"
                  placeholder="200000"
                />
              </div>
            </div>

            <div data-aos="fade-up" data-aos-delay="300">
              <label htmlFor="minYear" className="block text-sm font-semibold text-neutral-700 mb-2">
                Min Year
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="number"
                  id="minYear"
                  name="minYear"
                  value={searchFilters.minYear}
                  onChange={handleFilterChange}
                  className="block w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white hover:border-primary-300 transition-all duration-300"
                  placeholder="2020"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm text-neutral-600 font-medium">
              <span className="text-primary-600 font-bold">{filteredCars.length}</span> premium vehicle{filteredCars.length !== 1 ? 's' : ''} found
            </p>
            <button
              onClick={clearFilters}
              className="text-primary-600 hover:text-primary-800 text-sm font-semibold transition-colors flex items-center space-x-1"
            >
              <X className="h-4 w-4" />
              <span>Clear Filters</span>
            </button>
          </div>
        </div>

        {/* Results */}
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car) => (
              <div 
                key={car.id}
                className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 hover:scale-105 border border-white/20 group"
              >
                <div className="h-48 bg-gradient-to-br from-primary-100 via-secondary-100 to-accent-100 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 group-hover:from-primary-500/30 group-hover:to-secondary-500/30 transition-all duration-500"></div>
                  <Car className="h-20 w-20 text-primary-600 relative z-10 group-hover:scale-110 transition-transform duration-500" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-4 group-hover:text-primary-700 transition-colors">
                    {car.year} {car.make} {car.model}
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-neutral-600">
                      <Calendar className="h-4 w-4 mr-3 text-primary-500" />
                      <span className="text-sm font-medium">{car.year} Model Year</span>
                    </div>
                    <div className="flex items-center text-neutral-600">
                      <MapPin className="h-4 w-4 mr-3 text-secondary-500" />
                      <span className="text-sm font-medium">{car.location}</span>
                    </div>
                    <div className="flex items-center text-neutral-600">
                      <Car className="h-4 w-4 mr-3 text-accent-500" />
                      <span className="text-sm font-medium">{car.mileage.toLocaleString()} miles</span>
                    </div>
                    <div className="flex items-center text-neutral-600">
                      <DollarSign className="h-4 w-4 mr-3 text-accent-500" />
                      <span className="text-xl font-bold">${car.price.toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleViewDetails(car.id)}
                    className="mt-6 w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-16 text-center border border-white/20" data-aos="fade-up" data-aos-delay="200">
            <div className="bg-gradient-to-r from-primary-100 to-secondary-100 w-32 h-32 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Search className="h-16 w-16 text-primary-600" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">
              No vehicles found
            </h3>
            <p className="text-neutral-600 mb-8 text-lg">
              Try adjusting your search filters to discover more premium vehicles
            </p>
            <button
              onClick={clearFilters}
              className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-4 rounded-xl hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 font-semibold shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}