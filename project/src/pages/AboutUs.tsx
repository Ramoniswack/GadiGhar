import React from 'react';
import { MapPin, Phone, Mail, Users, Award, Shield, Clock, Star, Globe, Zap } from 'lucide-react';
import ramohanPhoto from '../assets/ramohan.png'; // Adjust extension as needed
import namrataPhoto from '../assets/namrata.jpeg'; // Adjust extension as needed

export default function AboutUs() {
  const staffMembers = [
    {
      name: 'R.A.Mohan Tiwari',
      position: 'Chief Executive Officer',
      experience: '20+ years in luxury automotive excellence',
      specialty: 'Strategic Leadership & Vision',
      photo: ramohanPhoto
    },
    {
      name: 'Namrata Bastola',
      position: 'Director of Sales',
      experience: '15+ years connecting clients with dream cars',
      specialty: 'Premium Vehicle Curation',
      photo: namrataPhoto
    }
  ];

  const achievements = [
    { icon: Award, title: 'Industry Leader', desc: 'Top-rated luxury car marketplace' },
    { icon: Shield, title: 'Trusted Platform', desc: 'Bank-level security & protection' },
    { icon: Globe, title: 'Global Reach', desc: 'Serving clients worldwide' },
    { icon: Zap, title: 'Innovation First', desc: 'Cutting-edge technology' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative py-12 md:py-24 overflow-hidden mt-24 sm:mt-28">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-800"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-16 sm:w-24 h-16 sm:h-24 bg-accent-400/20 rounded-full animate-float"></div>
        <div className="absolute top-20 sm:top-40 right-5 sm:right-20 w-12 sm:w-20 h-12 sm:h-20 bg-success-400/20 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-12 sm:w-16 h-12 sm:h-16 bg-secondary-400/20 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div data-aos="fade-up" data-aos-duration="1000">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-8 leading-tight">
              About 
              <span className="block bg-gradient-to-r from-accent-400 to-success-400 bg-clip-text text-transparent">
                GadiGhar
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-primary-100 max-w-4xl mx-auto leading-relaxed px-4">
              Pioneering the future of luxury automotive excellence in Nepal since 2023, connecting discerning enthusiasts 
              with the world's most exceptional vehicles through innovation and trust.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-12 md:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <div data-aos="fade-right">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">
                <span className="bg-gradient-to-r from-primary-700 to-secondary-700 bg-clip-text text-transparent">
                  Our Legacy of Excellence
                </span>
              </h2>
              <p className="text-base sm:text-lg text-neutral-600 mb-6 leading-relaxed">
                Founded in 2023 with a vision to revolutionize the automotive marketplace in Nepal, GadiGhar 
                has emerged as the premier platform for exceptional vehicles. Our journey began with a simple 
                belief: every automotive enthusiast deserves access to extraordinary machines.
              </p>
              <p className="text-base sm:text-lg text-neutral-600 mb-8 leading-relaxed">
                Today, we stand as the bridge between passionate collectors, discerning buyers, and trusted sellers, 
                creating an ecosystem where automotive dreams become reality through transparency, innovation, and 
                uncompromising service excellence.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="text-center" data-aos="fade-up" data-aos-delay="100">
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">2+</div>
                  <div className="text-xs sm:text-sm text-neutral-600 font-medium">Years Excellence</div>
                </div>
                <div className="text-center" data-aos="fade-up" data-aos-delay="200">
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-success-600 to-accent-600 bg-clip-text text-transparent">500+</div>
                  <div className="text-xs sm:text-sm text-neutral-600 font-medium">Premium Sales</div>
                </div>
                <div className="text-center" data-aos="fade-up" data-aos-delay="300">
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-accent-600 to-secondary-600 bg-clip-text text-transparent">1000+</div>
                  <div className="text-xs sm:text-sm text-neutral-600 font-medium">Satisfied Clients</div>
                </div>
              </div>
            </div>
            
            {/* Achievements Section */}
            <div className="relative mt-8 lg:mt-0" data-aos="fade-left">
              <div className="bg-gradient-to-br from-primary-100 via-secondary-100 to-accent-100 rounded-3xl p-6 sm:p-12 shadow-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="text-center group" data-aos="fade-up" data-aos-delay={100 + (index * 100)}>
                      <div className="bg-white w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                        <achievement.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary-600" />
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-neutral-900 mb-1">{achievement.title}</h3>
                      <p className="text-xs sm:text-sm text-neutral-600">{achievement.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 md:py-24 bg-gradient-to-br from-neutral-100 to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-16" data-aos="fade-up">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-primary-700 to-secondary-700 bg-clip-text text-transparent">
                Visit Our Flagship Location
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto">
              Experience luxury automotive excellence at our state-of-the-art showroom in Nepal
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12">
            {/* Contact Info Card */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/20" 
                 data-aos="fade-up" data-aos-delay="100">
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-6 sm:mb-8">Contact Information</h3>
              
              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-start group">
                  <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-3 sm:p-4 rounded-2xl mr-4 sm:mr-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-neutral-900 mb-2">Flagship Showroom</h4>
                    <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                      Pokhara-02<br />
                      Kaski, Nepal<br />
                      Gandaki Province
                    </p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="bg-gradient-to-r from-success-500 to-success-600 p-3 sm:p-4 rounded-2xl mr-4 sm:mr-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-neutral-900 mb-2">Phone Numbers</h4>
                    <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                      Main: (977) 98110201021<br />
                      Sales: (977) 98110201022<br />
                      Service: (977) 98110201023
                    </p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="bg-gradient-to-r from-accent-500 to-accent-600 p-3 sm:p-4 rounded-2xl mr-4 sm:mr-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-neutral-900 mb-2">Email Addresses</h4>
                    <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                      General: info@gadighar.com<br />
                      Sales: sales@gadighar.com<br />
                      Support: support@gadighar.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours Card */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/20" 
                 data-aos="fade-up" data-aos-delay="200">
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-6 sm:mb-8">Business Hours</h3>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex justify-between items-center py-3 border-b border-neutral-200">
                  <span className="text-sm sm:text-base font-semibold text-neutral-900">Monday - Friday</span>
                  <span className="text-sm sm:text-base text-primary-600 font-medium">9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-neutral-200">
                  <span className="text-sm sm:text-base font-semibold text-neutral-900">Saturday</span>
                  <span className="text-sm sm:text-base text-primary-600 font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-neutral-200">
                  <span className="text-sm sm:text-base font-semibold text-neutral-900">Sunday</span>
                  <span className="text-sm sm:text-base text-primary-600 font-medium">11:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-sm sm:text-base font-semibold text-neutral-900">Special Appointments</span>
                  <span className="text-sm sm:text-base text-secondary-600 font-medium">24/7 Available</span>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl border border-primary-200">
                <div className="flex items-center mb-3">
                  <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 mr-3" />
                  <span className="text-sm sm:text-base font-bold text-primary-900">Premium Safety Standards</span>
                </div>
                <p className="text-xs sm:text-sm text-primary-800 leading-relaxed">
                  We maintain the highest safety and hygiene protocols to ensure a premium, secure environment 
                  for all our distinguished clients and team members.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-12 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-16" data-aos="fade-up">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-primary-700 to-secondary-700 bg-clip-text text-transparent">
                Meet Our Leadership Team
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto">
              Visionary leaders with decades of combined experience in automotive excellence
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {staffMembers.map((member, index) => (
              <div key={index} className="text-center group mx-auto w-full max-w-sm" 
                   data-aos="fade-up" data-aos-delay={100 + (index * 100)}>
                <div className="relative mb-6">
                  <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto">
                    <img 
                      src={member.photo} 
                      alt={member.name}
                      className="w-full h-full object-cover rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-3xl"></div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-success-500 to-success-600 rounded-full flex items-center justify-center shadow-lg">
                    <Star className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-2">{member.name}</h3>
                <p className="text-sm sm:text-base text-primary-600 font-semibold mb-3">{member.position}</p>
                <p className="text-xs sm:text-sm text-neutral-600 mb-2">{member.experience}</p>
                <p className="text-xs text-secondary-600 font-medium">{member.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-24 bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-5 sm:top-10 right-5 sm:right-10 w-24 sm:w-32 h-24 sm:h-32 bg-accent-400/10 rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-5 sm:bottom-10 left-5 sm:left-10 w-16 sm:w-24 h-16 sm:h-24 bg-success-400/10 rounded-full animate-bounce-gentle"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div data-aos="fade-up" data-aos-duration="1000">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Ready to Experience
              <span className="block bg-gradient-to-r from-accent-400 to-success-400 bg-clip-text text-transparent">
                Automotive Excellence?
              </span>
            </h2>
            <p className="text-base sm:text-xl mb-8 sm:mb-12 text-primary-100 max-w-3xl mx-auto leading-relaxed">
              Join our exclusive community and discover why GadiGhar is the preferred choice 
              for luxury automotive enthusiasts in Nepal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <button className="group bg-white text-primary-700 px-8 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold hover:bg-primary-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center space-x-2">
                <span>Schedule Visit</span>
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-12 transition-transform" />
              </button>
              <button className="group border-2 border-white/30 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold hover:bg-white/10 backdrop-blur-sm transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
                <span>Contact Our Team</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}