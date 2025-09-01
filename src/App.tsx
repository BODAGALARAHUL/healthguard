import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CommunityUses from './pages/CommunityUses';
import HealthAuthorities from './pages/HealthAuthorities';
import Awareness from './pages/Awareness';
import Contact from './pages/Contact';
import { ThemeProvider } from './hooks/useTheme';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-3 border-white/30 border-t-white rounded-full mx-auto mb-4"
          />
          <h2 className="text-white text-xl font-bold mb-1">HealthGuard AI</h2>
          <p className="text-white/80 text-sm">Initializing system...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <Header />
          <main className="pt-16">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/community-uses" element={<CommunityUses />} />
                <Route path="/health-authorities" element={<HealthAuthorities />} />
                {/* <Route path="/awareness" element={<Awareness />} /> */}
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;