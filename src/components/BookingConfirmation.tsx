
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, CheckCircle, ArrowRight } from 'lucide-react';
import QueueStatus from './QueueStatus';
import { cn } from '@/lib/utils';

type BookingDetails = {
  pickup: string;
  destination: string;
  date: string;
  time: string;
  passengers: number;
};

type BookingConfirmationProps = {
  bookingDetails: BookingDetails;
  queuePosition: number;
  onReset: () => void;
};

const BookingConfirmation = ({ bookingDetails, queuePosition, onReset }: BookingConfirmationProps) => {
  const [step, setStep] = useState(1);
  
  useEffect(() => {
    // Automatically move to step 2 after animation completes
    const timer = setTimeout(() => {
      setStep(2);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full glass-effect rounded-2xl overflow-hidden"
    >
      <div className="p-6 bg-black/5">
        <h2 className="text-xl font-semibold text-gray-900">Booking Confirmation</h2>
        <p className="text-sm text-gray-600 mt-1">Your ride is being processed</p>
      </div>
      
      <div className="p-6">
        {step === 1 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-8"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center mb-6"
            >
              <div className="rounded-full bg-green-100 p-4">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </motion.div>
            
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-2xl font-semibold text-gray-900 mb-3"
            >
              Booking Received!
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-gray-600 mb-8"
            >
              We're processing your ride request...
            </motion.p>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="h-1 bg-green-500 rounded-full mx-auto"
            />
          </motion.div>
        ) : (
          <div className="space-y-6">
            {/* Route Preview */}
            <div className="bg-gray-50 rounded-xl p-5 relative overflow-hidden">
              <div className="flex justify-between items-center mb-5">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-500">From</div>
                  <div className="font-semibold">{bookingDetails.pickup}</div>
                </div>
                
                <div className="px-6 py-2">
                  <div className="relative w-full h-0.5 bg-gray-200 rounded-full">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 text-right">
                  <div className="text-sm font-medium text-gray-500">To</div>
                  <div className="font-semibold">{bookingDetails.destination}</div>
                </div>
              </div>
              
              <div className="absolute left-0 right-0 bottom-0 h-1">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                  className="h-full bg-black"
                />
              </div>
            </div>
            
            {/* Booking Details */}
            <div className="space-y-4">
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                <div>
                  <div className="text-sm font-medium text-gray-500">Date</div>
                  <div className="font-medium">{formatDate(bookingDetails.date)}</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                <div>
                  <div className="text-sm font-medium text-gray-500">Time</div>
                  <div className="font-medium">{bookingDetails.time}</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <Users className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                <div>
                  <div className="text-sm font-medium text-gray-500">Passengers</div>
                  <div className="font-medium">{bookingDetails.passengers} {bookingDetails.passengers === 1 ? 'Person' : 'People'}</div>
                </div>
              </div>
            </div>
            
            {/* Queue Status */}
            <QueueStatus position={queuePosition} />
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-3">
              <button
                onClick={onReset}
                className={cn(
                  "flex-1 py-3 rounded-lg font-medium transition-all text-center btn-pulse",
                  "bg-black text-white hover:bg-black/90"
                )}
              >
                New Booking
              </button>
              
              <button
                className={cn(
                  "flex-1 py-3 rounded-lg font-medium transition-all text-center",
                  "border border-gray-200 text-gray-800 hover:bg-gray-50"
                )}
              >
                View Details
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BookingConfirmation;
