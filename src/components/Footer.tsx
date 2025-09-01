import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Heart,
  MapPin,
  Phone,
  Mail,
  Globe,
  Twitter,
  Linkedin,
  Github,
  Instagram,
  ArrowRight,
  ExternalLink,
  Zap,
  Shield,
  Users,
  Activity,
  Star,
  Award,
  Clock
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { name: 'Dashboard', path: '/', icon: <Activity className="w-4 h-4" /> },
    { name: 'Community Health', path: '/community-uses', icon: <Users className="w-4 h-4" /> },
    { name: 'Health Authorities', path: '/health-authorities', icon: <Shield className="w-4 h-4" /> },
    { name: 'Early Warning', path: '/awareness', icon: <Zap className="w-4 h-4" /> },
    { name: 'Contact Us', path: '/contact', icon: <Mail className="w-4 h-4" /> }
  ];

  const solutions = [
    { name: 'Water Quality Monitoring', path: '/solutions/water' },
    { name: 'Disease Prediction AI', path: '/solutions/ai' },
    { name: 'Community Dashboard', path: '/solutions/dashboard' },
    { name: 'Emergency Response', path: '/solutions/emergency' }
  ];

  const resources = [
    { name: 'Documentation', path: '/docs', external: true },
    { name: 'API Reference', path: '/api', external: true },
    { name: 'Case Studies', path: '/cases' },
    { name: 'Research Papers', path: '/research' },
    { name: 'Developer Tools', path: '/tools', external: true }
  ];

  const socialLinks = [
    { icon: <Twitter className="w-5 h-5" />, href: '#', label: 'Twitter', color: 'hover:text-blue-400' },
    { icon: <Linkedin className="w-5 h-5" />, href: '#', label: 'LinkedIn', color: 'hover:text-blue-600' },
    { icon: <Github className="w-5 h-5" />, href: '#', label: 'GitHub', color: 'hover:text-gray-400' },
    { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram', color: 'hover:text-pink-500' }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white overflow-hidden">
      
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.1),transparent_50%)] animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.1),transparent_50%)]" />
        
        {/* Floating particles - fewer on mobile */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full hidden sm:block"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10">
        
        {/* Top Section */}
        <div className="border-b border-gray-800/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              
              {/* Brand Section - Full width on mobile, 5 cols on desktop */}
              <div className="lg:col-span-5">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-8"
                >
                  <div className="flex items-center gap-3 sm:gap-4 mb-6">
                    <motion.div 
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.8 }}
                      className="relative"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 via-cyan-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl">
                        <Heart className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl blur-lg opacity-50 -z-10" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
                        HealthGuard AI
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 font-medium">
                        Protecting Lives Through Intelligence
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6 sm:mb-8 max-w-none lg:max-w-md">
                    Revolutionary AI-powered health monitoring system safeguarding rural communities across Northeast India through predictive analytics and real-time water quality monitoring.
                  </p>

                  {/* Live Stats - Side by side on mobile, grid on larger screens */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                    {[
                      { label: 'Lives Protected', value: '125K+', icon: <Shield className="w-4 h-4" /> },
                      { label: 'Active Sensors', value: '1,247', icon: <Activity className="w-4 h-4" /> }
                    ].map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="p-3 sm:p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg sm:rounded-xl hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="flex items-center gap-2 mb-1 sm:mb-2">
                          <div className="text-cyan-400">
                            {stat.icon}
                          </div>
                          <span className="text-xs text-gray-400 uppercase tracking-wide">
                            {stat.label}
                          </span>
                        </div>
                        <div className="text-lg sm:text-xl font-bold text-white">
                          {stat.value}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Live Status - Updated with current timestamp */}
                  <motion.div
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg sm:rounded-xl"
                  >
                    <div className="relative">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-400 rounded-full animate-pulse" />
                      <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-75" />
                    </div>
                    <div>
                      <span className="text-emerald-400 font-semibold text-xs sm:text-sm">
                        SYSTEM STATUS: ALL OPERATIONAL
                      </span>
                      <p className="text-xs text-gray-400">
                        Updated by NARANDRA MODI • 2025-08-31 12:01:26 UTC
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Links Grid - Stack on mobile, side by side on desktop */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
                
                {/* Quick Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <h4 className="text-lg font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    Platform
                  </h4>
                  <ul className="space-y-3 sm:space-y-4">
                    {quickLinks.map((link) => (
                      <li key={link.name}>
                        <Link
                          to={link.path}
                          className="group flex items-center gap-2 sm:gap-3 text-gray-300 hover:text-white transition-all duration-300"
                        >
                          <div className="text-gray-500 group-hover:text-cyan-400 transition-colors">
                            {link.icon}
                          </div>
                          <span className="group-hover:translate-x-1 transition-transform duration-300 text-sm sm:text-base">
                            {link.name}
                          </span>
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Resources */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <h4 className="text-lg font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    Resources
                  </h4>
                  <ul className="space-y-3 sm:space-y-4">
                    {resources.map((resource) => (
                      <li key={resource.name}>
                        <Link
                          to={resource.path}
                          className="group flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300"
                        >
                          <span className="group-hover:translate-x-1 transition-transform duration-300 text-sm sm:text-base">
                            {resource.name}
                          </span>
                          {resource.external && (
                            <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Solutions - Show on larger screens only */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="hidden lg:block lg:col-span-2"
                >
                  <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-400" />
                    Solutions
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {solutions.map((solution) => (
                      <Link
                        key={solution.name}
                        to={solution.path}
                        className="group text-gray-300 hover:text-white transition-all duration-300 block p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-white/20"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block text-sm font-medium">
                          {solution.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
            <div className="flex flex-col items-center gap-4 sm:gap-6 lg:flex-row lg:justify-between">
              
              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 sm:gap-4 order-2 lg:order-1"
              >
                <span className="text-xs sm:text-sm text-gray-400 mr-1 sm:mr-2">Follow us:</span>
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-8 h-8 sm:w-10 sm:h-10 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg sm:rounded-xl flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300`}
                    aria-label={social.label}
                  >
                    <div className="w-4 h-4 sm:w-5 sm:h-5">
                      {social.icon}
                    </div>
                  </motion.a>
                ))}
              </motion.div>

              {/* Copyright */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center lg:text-right order-1 lg:order-2"
              >
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400 mb-2 sm:mb-0">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span>© {currentYear} HealthGuard AI. All rights reserved.</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>Made with</span>
                    <Heart className="w-3 h-3 text-red-400 animate-pulse" />
                    <span>for humanity</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-center lg:justify-end gap-3 sm:gap-4 text-xs sm:text-sm">
                  <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                  <span className="text-gray-600">•</span>
                  <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
                  <span className="text-gray-600">•</span>
                  <Link to="/security" className="hover:text-white transition-colors">Security</Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;