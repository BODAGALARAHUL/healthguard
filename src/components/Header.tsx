import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Shield,
  Users,
  BarChart3,
  Bell,
  User,
  Heart,
  Activity,
  AlertTriangle,
  LogOut,
  Mail,
  MessageSquare
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fixed navItems array with Contact included
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <BarChart3 className="w-4 h-4" /> },
    { name: 'Community', path: '/community-uses', icon: <Users className="w-4 h-4" /> },
    { name: 'Authorities', path: '/health-authorities', icon: <Shield className="w-4 h-4" /> },
    // { name: 'Alerts', path: '/awareness', icon: <AlertTriangle className="w-4 h-4" /> },
    { name: 'Contact', path: '/contact', icon: <MessageSquare className="w-4 h-4" /> } // Fixed: Added Contact with proper icon
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Main Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/70 dark:bg-gray-950/70 backdrop-blur-2xl border-b border-gray-200/30 dark:border-gray-800/30'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-sm">
                  <Heart className="w-4 h-4 text-white" />
                </div>
              </motion.div>
              <div>
                <h1 className="text-base font-semibold text-gray-900 dark:text-white">
                  HealthGuard
                </h1>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/40'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/30'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              
              {/* Status */}
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50/80 dark:bg-emerald-950/30 rounded-lg">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                  Live
                </span>
              </div>

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100/50 dark:hover:bg-gray-800/30 rounded-lg transition-all duration-200"
              >
                <AnimatePresence mode="wait">
                  {isDark ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Sun className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Moon className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Notifications */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100/50 dark:hover:bg-gray-800/30 rounded-lg transition-all duration-200"
              >
                <Bell className="w-4 h-4" />
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full" />
              </motion.button>

              {/* Profile */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowProfile(!showProfile)}
                  className="flex items-center gap-2 p-1 hover:bg-gray-100/50 dark:hover:bg-gray-800/30 rounded-lg transition-all duration-200"
                >
                  <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-md flex items-center justify-center text-white font-semibold text-xs">
                    M
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-xs font-semibold text-gray-900 dark:text-white leading-tight">
                      NARANDRA MODI
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
                      Officer
                    </p>
                  </div>
                </motion.button>

                <AnimatePresence>
                  {showProfile && (
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 mt-2 w-56 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-800/50 p-1"
                    >
                      <div className="p-3 border-b border-gray-200/50 dark:border-gray-800/50">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                            M
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">
                              NARANDRA MODI
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
                              Health Officer
                            </p>
                            <div className="flex items-center gap-1 mt-0.5">
                              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                              <span className="text-xs text-emerald-600 dark:text-emerald-400">
                                Online
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-1">
                        {[
                          { icon: <User className="w-4 h-4" />, text: 'Profile' },
                          { icon: <BarChart3 className="w-4 h-4" />, text: 'Analytics' },
                          { icon: <Activity className="w-4 h-4" />, text: 'Settings' }
                        ].map((item) => (
                          <button
                            key={item.text}
                            className="w-full flex items-center gap-2.5 p-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/30 transition-all duration-200 group"
                          >
                            <div className="text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                              {item.icon}
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                              {item.text}
                            </span>
                          </button>
                        ))}
                        
                        <div className="border-t border-gray-200/50 dark:border-gray-800/50 mt-1 pt-1">
                          <button className="w-full flex items-center gap-2.5 p-2 rounded-lg hover:bg-red-50/50 dark:hover:bg-red-950/20 transition-all duration-200 group">
                            <LogOut className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                              Sign Out
                            </span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100/50 dark:hover:bg-gray-800/30 rounded-lg transition-all duration-200"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div 
              className="fixed inset-0 bg-black/10 dark:bg-black/20 backdrop-blur-sm" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="fixed top-0 left-0 right-0 bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl border-b border-gray-200/30 dark:border-gray-800/30"
            >
              <div className="p-4 pt-16">
                <nav className="space-y-1">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                          isActive(item.path)
                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/40'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/30'
                        }`}
                      >
                        {item.icon}
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;