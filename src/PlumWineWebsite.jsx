import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const DotPattern = () => (
  <div className="fixed inset-0 z-0 opacity-10">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <pattern id="dotPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="currentColor">
          <animate attributeName="r" values="1;2;1" dur="3s" repeatCount="indefinite" />
        </circle>
      </pattern>
      <rect width="100%" height="100%" fill="url(#dotPattern)">
        <animate attributeName="opacity" values="0.5;1.0;0.5" dur="5s" repeatCount="indefinite" />
      </rect>
    </svg>
  </div>
);

const PopupMessage = ({ isVisible }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.8 }}
        className="fixed top-1/4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-800 to-purple-600 text-white px-6 py-3 rounded-lg shadow-lg z-50"
      >
        wow! you must really like plums...
      </motion.div>
    )}
  </AnimatePresence>
);

const MusicPage = () => (
  <div className="container mx-auto px-6 pt-32">
    <h2 className="text-4xl font-bold mb-6 text-purple-900">listen to this sh*t</h2>
    <div className="w-full max-w-2xl mx-auto bg-purple-100/50 p-6 rounded-2xl shadow-lg">
      <div className="rounded-xl overflow-hidden">
        <iframe 
          width="100%" 
          height="450" 
          scrolling="no" 
          frameBorder="no" 
          allow="autoplay" 
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1952882187%3Fsecret_token%3Ds-A6iIzH7enVX&color=%23663399&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false"
        ></iframe>
      </div>
    </div>
  </div>
);

const ContactPage = () => (
  <div className="container mx-auto px-[40%] pt-[30%]">
    <h2 className="text-3xl font-bold mb-4"></h2>
    <div className="space-y-4">
      <p>contact@plumwine.co</p>
      <ul className="list-disc list-inside pl-4">
      </ul>
    </div>
  </div>
);

const PlumWineWebsite = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [showMessage, setShowMessage] = useState(false);
  const [clickCount, setClickCount] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const springConfig = { stiffness: 100, damping: 10 };
  const springX = useSpring(0, springConfig);
  const springY = useSpring(0, springConfig);

  useEffect(() => {
    springX.set(mousePosition.x);
    springY.set(mousePosition.y);
  }, [mousePosition]);

  const handlePlumClick = () => {
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);
    if(newClickCount >=3) {
    setShowMessage(true);
    setClickCount(0);
    setTimeout(() => setShowMessage(false), 2000);
    }
  };

  const calculateRotation = (index) => {
    if (!mousePosition || !containerRef.current) return 0;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const deltaX = mousePosition.x - centerX;
    const deltaY = mousePosition.y - centerY;
    const angle = Math.atan2(deltaY, deltaX);
    return (angle * 180 / Math.PI) + 180;
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const element = containerRef.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      return () => {
        element.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  return (
    <div 
    className="relative min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-purple-100 text-purple-900 font-['Space_Grotesk'] overflow-hidden"
    ref={containerRef}
    >
      <DotPattern />
      <PopupMessage isVisible={showMessage} />

      <nav className="fixed w-full px-6 py-6 flex justify-between items-start z-10">
        <motion.h1 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentPage('home')}
          className="text-4xl font-bold tracking-wider cursor-pointer hover:text-purple-700 transition-colors"
        >
          PLUMWINE
        </motion.h1>
        
        <div className="flex flex-col space-y-4 text-right">
          {['music', 'contact'].map((page) => (
            <motion.button 
              key={page}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage(page)}
              className="text-xl hover:text-purple-700 transition-colors"
            >
              {page.toUpperCase()}
            </motion.button>
          ))}
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {currentPage === 'home' && (
          <motion.div 
            className="relative h-[80vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[0].map((index) => (
              <motion.div
                key={index}
                className="absolute left-[15%] top-[25%] -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                animate={{
                  rotate: calculateRotation(index),
                  scale: showMessage ? 1.1 : 1,
                }}
                whileHover={{ scale: 1.3 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 100,
                  scale: { duration: 0.2 }
                }}
                onClick={handlePlumClick}
              >
                <motion.div 
                  className="w-96 h-96"
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src="/plum for web.png"
                    alt="Plum"
                    className="w-full h-full object-contain drop-shadow-lg"
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
        {currentPage === 'music' && <MusicPage />}
        {currentPage === 'contact' && <ContactPage />}
      </AnimatePresence>
    </div>
  );
};

export default PlumWineWebsite;