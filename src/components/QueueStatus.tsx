
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Check, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type QueueStatusProps = {
  position: number;
  estimatedWait?: number;
};

const QueueStatus = ({ position, estimatedWait = 2 }: QueueStatusProps) => {
  const [timeRemaining, setTimeRemaining] = useState(estimatedWait * 60); // in seconds
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    // Simulate time passing for the queue
    if (timeRemaining > 0 && !isComplete) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => {
          // Reduce time a bit faster for demo purposes
          const newTime = prev - 2;
          if (newTime <= 0) {
            setIsComplete(true);
            return 0;
          }
          return newTime;
        });
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [timeRemaining, isComplete]);
  
  // Format time remaining to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Calculate progress percentage
  const progress = 100 - (timeRemaining / (estimatedWait * 60)) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 p-6"
    >
      {/* Status header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-gray-900">Queue Status</h3>
        <div 
          className={cn(
            "px-3 py-1 rounded-full text-xs font-medium",
            isComplete 
              ? "bg-green-100 text-green-800" 
              : "bg-amber-100 text-amber-800"
          )}
        >
          {isComplete ? "Ready" : "In Queue"}
        </div>
      </div>
      
      {/* Position */}
      <div className="mb-5">
        <div className="text-sm font-medium text-gray-500 mb-1">Your Position</div>
        <div className="flex items-center">
          <div className="text-3xl font-bold text-gray-900 mr-2">
            {isComplete ? "0" : position}
          </div>
          <div className="text-sm text-gray-500">
            {isComplete 
              ? "Your ride is ready!" 
              : position === 1 
                ? "You're next!" 
                : `${position} bookings ahead of you`}
          </div>
        </div>
      </div>
      
      {/* Time estimate */}
      <div className="mb-5">
        <div className="text-sm font-medium text-gray-500 mb-1">Estimated Wait</div>
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-gray-400 mr-2" />
          <div className="text-xl font-bold text-gray-900">
            {isComplete ? "Ready now" : formatTime(timeRemaining)}
          </div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={cn(
            "h-full rounded-full", 
            isComplete ? "bg-green-500" : "bg-amber-500"
          )}
        />
      </div>
      
      {/* Status message */}
      <div className="mt-5 flex items-start">
        {isComplete ? (
          <div className="flex items-center text-green-600">
            <div className="bg-green-100 p-1.5 rounded-full mr-3">
              <Check className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">Your ride is ready!</p>
              <p className="text-sm text-gray-600">Please proceed to the pickup location.</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center text-amber-600">
            <div className="bg-amber-100 p-1.5 rounded-full mr-3">
              <AlertCircle className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">In queue</p>
              <p className="text-sm text-gray-600">We'll notify you when your ride is ready.</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default QueueStatus;
