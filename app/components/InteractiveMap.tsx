// components/InteractiveMap.tsx
'use client';

import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SimpleGoogleMap() {
  const storeLocation = {
    lat: 31.3807, // Your latitude
    lng: 73.0792, // Your longitude
    address: "D-type goal near bilali masjid, faisalabad, punjab, country: Pakistan 38000" // Your address
  };

  const googleMapsUrl = `https://www.google.com/maps?q=${storeLocation.lat},${storeLocation.lng}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${storeLocation.lat},${storeLocation.lng}`;

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Visit Our Store
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Come see us in person and experience our products firsthand
          </p>
        </motion.div>

        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl shadow-gray-200/50 overflow-hidden">
          <div className="h-64 sm:h-80 md:h-96 relative">
            {/* Simple Google Maps Embed */}
            <iframe
              src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=${storeLocation.lat},${storeLocation.lng}&zoom=15&maptype=roadmap`}
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '0' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="RS-LEGACY Store Location"
              className="min-h-[200px]"
            />
          </div>
          
          <div className="p-4 sm:p-6 bg-white border-t border-gray-100">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6">
              <div className="text-left w-full lg:w-auto">
                <div className="flex items-start gap-3 mb-2 sm:mb-3">
                  <MapPin className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">RS-LEGACY Flagship Store</h3>
                    <p className="text-sm sm:text-base text-gray-600 mt-1">{storeLocation.address}</p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">Open Mon-Sun: 9:00 AM - 9:00 PM</p>
                  </div>
                </div>
              </div>
              
              {/* BUTTONS SECTION - SINGLE VERSION */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full lg:w-auto">
                <a 
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  <Navigation className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">Get Directions</span>
                </a>
                <a 
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  <ExternalLink className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">Open in Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* REMOVED THE DUPLICATE MOBILE-ONLY SECTION */}
      </div>
    </section>
  );
}