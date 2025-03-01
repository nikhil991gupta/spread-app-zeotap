
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Menu, Save, FileText, Download, Upload, Settings, HelpCircle } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-2 px-4 bg-white border-b border-neutral-200',
        scrolled && 'shadow-sm'
      )}
    >
      <div className="max-w-full mx-auto flex items-center justify-between">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center"
        >
          <a href="/" className="text-xl font-medium flex items-center">
            <FileText className="mr-2 text-green-600" />
            <span>SpreadApp</span>
          </a>
          <div className="ml-8 hidden md:flex items-center space-x-4">
            <button className="text-sm hover:bg-neutral-100 px-3 py-1 rounded">File</button>
            <button className="text-sm hover:bg-neutral-100 px-3 py-1 rounded">Edit</button>
            <button className="text-sm hover:bg-neutral-100 px-3 py-1 rounded">View</button>
            <button className="text-sm hover:bg-neutral-100 px-3 py-1 rounded">Insert</button>
            <button className="text-sm hover:bg-neutral-100 px-3 py-1 rounded">Format</button>
            <button className="text-sm hover:bg-neutral-100 px-3 py-1 rounded">Data</button>
            <button className="text-sm hover:bg-neutral-100 px-3 py-1 rounded">Tools</button>
            <button className="text-sm hover:bg-neutral-100 px-3 py-1 rounded">Help</button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center space-x-3"
        >
          <button className="p-1.5 rounded-full hover:bg-neutral-100" title="Save">
            <Save size={18} />
          </button>
          <button className="p-1.5 rounded-full hover:bg-neutral-100" title="Download">
            <Download size={18} />
          </button>
          <button className="p-1.5 rounded-full hover:bg-neutral-100" title="Upload">
            <Upload size={18} />
          </button>
          <button className="p-1.5 rounded-full hover:bg-neutral-100" title="Settings">
            <Settings size={18} />
          </button>
          <button className="p-1.5 rounded-full hover:bg-neutral-100" title="Help">
            <HelpCircle size={18} />
          </button>
          <div className="h-6 border-l border-neutral-300 mx-1"></div>
          <button className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded text-sm hover:bg-blue-200 transition-colors">
            Share
          </button>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Navbar;
