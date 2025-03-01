
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BookingForm from './BookingForm';

const backgroundImages = [
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
  'https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80'
];

const Hero = () => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  
  useEffect(() => {
    // Change background image every 8 seconds
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background images with crossfade effect */}
      <AnimatePresence>
        <motion.div
          key={`bg-${currentBgIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${backgroundImages[currentBgIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      </AnimatePresence>
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col justify-center items-center md:items-start">
        <div className="w-full flex flex-col md:flex-row justify-between items-center">
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white text-xs font-medium mb-6"
            >
              Experience The Journey
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
            >
              Your Destination,<br />Our Priority
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-white/90 mb-8 max-w-md"
            >
              Book your premium ride experience to anywhere you desire. No waiting, no hassle.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <a 
                href="#booking" 
                className="bg-white text-black px-8 py-3 rounded-full font-medium transition-all hover:shadow-lg btn-pulse w-full sm:w-auto text-center"
              >
                Book Now
              </a>
              <a 
                href="#how-it-works" 
                className="px-8 py-3 rounded-full border border-white/30 text-white font-medium backdrop-blur-sm hover:bg-white/10 transition-all w-full sm:w-auto text-center"
              >
                Learn More
              </a>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:w-1/2 w-full max-w-md"
          >
            <BookingForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
