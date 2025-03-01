
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Search, Users, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import BookingConfirmation from './BookingConfirmation';

type LocationOption = {
  id: string;
  name: string;
  address: string;
};

// Sample data
const popularLocations: LocationOption[] = [
  { id: 'loc1', name: 'Downtown Center', address: '123 Main St, Downtown' },
  { id: 'loc2', name: 'Airport Terminal', address: '456 Airport Way' },
  { id: 'loc3', name: 'Beach Resort', address: '789 Coastal Rd, Beachside' },
  { id: 'loc4', name: 'Mountain Retreat', address: '101 Alpine Way, Highlands' },
  { id: 'loc5', name: 'Shopping Mall', address: '202 Commerce Blvd' },
];

const BookingForm = () => {
  const [formState, setFormState] = useState({
    pickup: '',
    destination: '',
    date: '',
    time: '',
    passengers: 1,
  });
  
  const [showPickupOptions, setShowPickupOptions] = useState(false);
  const [showDestOptions, setShowDestOptions] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [queuePosition, setQueuePosition] = useState(0);

  const handleInputChange = (field: string, value: string | number) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const handlePickupSelect = (location: LocationOption) => {
    setFormState(prev => ({ ...prev, pickup: location.name }));
    setShowPickupOptions(false);
  };

  const handleDestinationSelect = (location: LocationOption) => {
    setFormState(prev => ({ ...prev, destination: location.name }));
    setShowDestOptions(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate adding to queue
    const randomQueuePosition = Math.floor(Math.random() * 5) + 1;
    setQueuePosition(randomQueuePosition);
    
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setFormState({
      pickup: '',
      destination: '',
      date: '',
      time: '',
      passengers: 1,
    });
    setIsSubmitted(false);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  if (isSubmitted) {
    return (
      <BookingConfirmation 
        bookingDetails={formState} 
        queuePosition={queuePosition}
        onReset={resetForm}
      />
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="glass-effect w-full rounded-2xl overflow-hidden"
    >
      <div className="p-6 bg-black/5">
        <h2 className="text-xl font-semibold text-gray-900">Book Your Ride</h2>
        <p className="text-sm text-gray-600 mt-1">Fast, reliable transportation to your destination</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        {/* Pickup Location */}
        <motion.div variants={itemVariants} className="relative">
          <label htmlFor="pickup" className="block text-sm font-medium text-gray-700 mb-1">
            Pickup Location
          </label>
          <div className="relative">
            <input
              id="pickup"
              type="text"
              value={formState.pickup}
              onChange={(e) => handleInputChange('pickup', e.target.value)}
              onFocus={() => setShowPickupOptions(true)}
              className="pl-10 pr-4 py-3 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/10 focus:border-black/20 outline-none transition-all"
              placeholder="Enter pickup location"
              required
            />
            <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
          </div>
          
          {/* Pickup location suggestions */}
          {showPickupOptions && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden"
            >
              <div className="py-2">
                <div className="px-3 py-1.5 text-xs font-medium text-gray-500">Popular Locations</div>
                {popularLocations.map(location => (
                  <div
                    key={location.id}
                    onClick={() => handlePickupSelect(location)}
                    className="px-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="font-medium text-gray-800">{location.name}</div>
                    <div className="text-xs text-gray-500">{location.address}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
        
        {/* Destination */}
        <motion.div variants={itemVariants} className="relative">
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
            Destination
          </label>
          <div className="relative">
            <input
              id="destination"
              type="text"
              value={formState.destination}
              onChange={(e) => handleInputChange('destination', e.target.value)}
              onFocus={() => setShowDestOptions(true)}
              className="pl-10 pr-4 py-3 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/10 focus:border-black/20 outline-none transition-all"
              placeholder="Enter destination"
              required
            />
            <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
          </div>
          
          {/* Destination suggestions */}
          {showDestOptions && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden"
            >
              <div className="py-2">
                <div className="px-3 py-1.5 text-xs font-medium text-gray-500">Popular Destinations</div>
                {popularLocations.map(location => (
                  <div
                    key={location.id}
                    onClick={() => handleDestinationSelect(location)}
                    className="px-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="font-medium text-gray-800">{location.name}</div>
                    <div className="text-xs text-gray-500">{location.address}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
        
        {/* Date and Time */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <div className="relative">
              <input
                id="date"
                type="date"
                value={formState.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="pl-10 pr-4 py-3 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/10 focus:border-black/20 outline-none transition-all"
                required
              />
              <Calendar className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
            </div>
          </div>
          
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <div className="relative">
              <input
                id="time"
                type="time"
                value={formState.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                className="pl-10 pr-4 py-3 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/10 focus:border-black/20 outline-none transition-all"
                required
              />
              <Clock className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
            </div>
          </div>
        </motion.div>
        
        {/* Passengers */}
        <motion.div variants={itemVariants}>
          <label htmlFor="passengers" className="block text-sm font-medium text-gray-700 mb-1">
            Passengers
          </label>
          <div className="relative">
            <select
              id="passengers"
              value={formState.passengers}
              onChange={(e) => handleInputChange('passengers', parseInt(e.target.value))}
              className="pl-10 pr-10 py-3 w-full appearance-none border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/10 focus:border-black/20 outline-none transition-all"
              required
            >
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Passenger' : 'Passengers'}
                </option>
              ))}
            </select>
            <Users className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
            <ChevronDown className="absolute right-3 top-3.5 h-4 w-4 text-gray-500" />
          </div>
        </motion.div>
        
        {/* Submit Button */}
        <motion.button
          variants={itemVariants}
          type="submit"
          className={cn(
            "w-full flex items-center justify-center py-3.5 rounded-lg font-medium transition-all btn-pulse",
            "bg-black text-white hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          )}
        >
          <Search className="h-4 w-4 mr-2" />
          Search Rides
        </motion.button>
      </form>
    </motion.div>
  );
};

export default BookingForm;
