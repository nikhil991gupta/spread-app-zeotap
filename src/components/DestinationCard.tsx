
import { motion } from 'framer-motion';

type DestinationCardProps = {
  image: string;
  name: string;
  description: string;
  rating: number;
  price: string;
  index: number;
};

const DestinationCard = ({ image, name, description, rating, price, index }: DestinationCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-2xl overflow-hidden hover-lift"
    >
      {/* Image */}
      <div className="aspect-[3/4] w-full overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80" />
      </div>
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex items-center space-x-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`h-4 w-4 ${i < rating ? 'text-yellow-400' : 'text-gray-400'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-xs font-medium text-white">{rating.toFixed(1)}</span>
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-1">{name}</h3>
        <p className="text-sm text-white/80 mb-3">{description}</p>
        
        <div className="flex items-center justify-between">
          <div className="text-white font-semibold">
            <span className="text-lg">{price}</span>
            <span className="text-sm opacity-70"> / person</span>
          </div>
          
          <button className="px-4 py-1.5 bg-white rounded-full text-sm font-medium text-black hover:bg-gray-100 transition-colors">
            Book Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default DestinationCard;
