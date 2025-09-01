import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Users,
  Droplets,
  Activity,
  AlertTriangle,
  Shield,
  Heart,
  MapPin,
  Clock,
  Phone,
  Download,
  Play,
  CheckCircle,
  Eye,
  Thermometer,
  Beaker,
  Info,
  BookOpen,
  Package,
  Cpu,
  Wifi,
  Battery,
  Settings,
  BarChart3,
  TrendingUp,
  Globe,
  Zap,
  FileText,
  Video,
  Headphones,
  XCircle,
  Wrench
} from 'lucide-react';

const CommunityUses: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedWaterParam, setSelectedWaterParam] = useState('ph');
  const [selectedKit, setSelectedKit] = useState('basic');
  const [selectedManual, setSelectedManual] = useState<string | null>(null);

  // Water Quality Parameters
  const waterParameters = [
    {
      id: 'ph',
      name: 'pH Level',
      value: 7.2,
      unit: '',
      status: 'good',
      icon: <Beaker className="w-5 h-5" />,
      range: '6.5 - 8.5',
      description: 'Measures acidity/alkalinity of water'
    },
    {
      id: 'turbidity',
      name: 'Turbidity',
      value: 0.8,
      unit: 'NTU',
      status: 'excellent',
      icon: <Eye className="w-5 h-5" />,
      range: '< 1 NTU',
      description: 'Water clarity and suspended particles'
    },
    {
      id: 'temperature',
      name: 'Temperature',
      value: 24.5,
      unit: '°C',
      status: 'good',
      icon: <Thermometer className="w-5 h-5" />,
      range: '15 - 25°C',
      description: 'Water temperature affects bacterial growth'
    },
    {
      id: 'chlorine',
      name: 'Free Chlorine',
      value: 0.4,
      unit: 'mg/L',
      status: 'good',
      icon: <Shield className="w-5 h-5" />,
      range: '0.2 - 0.5 mg/L',
      description: 'Disinfectant residual level'
    }
  ];

  // IoT Kit Types
  const kitTypes = [
    {
      id: 'basic',
      name: 'Basic Monitoring Kit',
      price: '₹12,000',
      description: 'Essential water quality monitoring for small communities',
      features: ['pH Sensor', 'Turbidity Sensor', 'Temperature Sensor', 'WiFi Module'],
      coverage: 'Up to 500 people',
      batteryLife: '6 months'
    },
    {
      id: 'advanced',
      name: 'Advanced Monitoring Kit',
      price: '₹25,000',
      description: 'Comprehensive monitoring with AI-powered analytics',
      features: ['All Basic Sensors', 'Chlorine Sensor', 'Dissolved Oxygen', 'Edge AI Module', 'Solar Panel'],
      coverage: 'Up to 2000 people',
      batteryLife: '12 months'
    },
    {
      id: 'professional',
      name: 'Professional Kit',
      price: '₹45,000',
      description: 'Full-featured kit for health authorities and large communities',
      features: ['All Advanced Sensors', 'Bacterial Detection', 'Real-time Alerts', 'Data Analytics', 'Remote Management'],
      coverage: 'Up to 5000 people',
      batteryLife: '18 months'
    }
  ];

  // Safety Manuals
  const safetyManuals = [
    {
      id: 'water-safety-basics',
      title: 'Basic Water Safety Guidelines',
      category: 'Water Safety',
      description: 'Essential water safety practices for daily life',
      type: 'PDF Guide',
      duration: '15 min read',
      level: 'Beginner',
      languages: ['English', 'Assamese', 'Bengali', 'Hindi'],
      topics: ['Water Storage', 'Boiling Guidelines', 'Filtration Methods', 'Container Cleaning']
    },
    {
      id: 'waterborne-diseases',
      title: 'Waterborne Disease Prevention',
      category: 'Health Prevention',
      description: 'Preventing cholera, diarrhea, and other waterborne illnesses',
      type: 'Comprehensive Guide',
      duration: '25 min read',
      level: 'Essential',
      languages: ['English', 'Assamese', 'Bengali', 'Hindi'],
      topics: ['Disease Recognition', 'Prevention Methods', 'Treatment Steps', 'When to Seek Help']
    },
    {
      id: 'emergency-protocols',
      title: 'Community Emergency Response',
      category: 'Community Response',
      description: 'Step-by-step emergency response procedures',
      type: 'Emergency Protocol',
      duration: '20 min read',
      level: 'Advanced',
      languages: ['English', 'Assamese'],
      topics: ['Alert Systems', 'Evacuation Plans', 'Resource Distribution', 'Communication']
    }
  ];

  // Common Waterborne Diseases
  const diseases = [
    {
      name: 'Cholera',
      severity: 'High',
      symptoms: ['Severe diarrhea', 'Vomiting', 'Dehydration'],
      prevention: ['Clean water', 'Proper sanitation', 'Hand hygiene'],
      color: 'red'
    },
    {
      name: 'Typhoid',
      severity: 'High',
      symptoms: ['High fever', 'Headache', 'Abdominal pain'],
      prevention: ['Boiled water', 'Cooked food', 'Vaccination'],
      color: 'orange'
    },
    {
      name: 'Diarrhea',
      severity: 'Medium',
      symptoms: ['Loose stools', 'Cramping', 'Nausea'],
      prevention: ['Safe water', 'Food hygiene', 'Handwashing'],
      color: 'yellow'
    },
    {
      name: 'Hepatitis A',
      severity: 'Medium',
      symptoms: ['Fatigue', 'Nausea', 'Jaundice'],
      prevention: ['Clean water', 'Proper sanitation', 'Vaccination'],
      color: 'blue'
    }
  ];

  const sections = [
    { id: 'overview', label: 'Overview', icon: <Users className="w-4 h-4" /> },
    { id: 'water-info', label: 'Water Information', icon: <Droplets className="w-4 h-4" /> },
    { id: 'safety-manuals', label: 'Safety Manuals', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'iot-kits', label: 'IoT Kits', icon: <Package className="w-4 h-4" /> },
    { id: 'diseases', label: 'Disease Information', icon: <Heart className="w-4 h-4" /> }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'good': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'danger': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="w-4 h-4" />;
      case 'good': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'danger': return <XCircle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 border-red-200';
      case 'Essential': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-gray-900 dark:to-blue-950 pt-16">
      
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            {/* Status Badge */}
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50 rounded-full mb-8 shadow-sm"
            >
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-blue-500 rounded-full"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Community Resources • Updated by NARANDRA MODI • 2025-09-01 17:00:07 UTC
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-light text-gray-900 dark:text-white mb-6 leading-tight">
              Community
              <span className="block font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Resources
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed font-light">
              Empowering communities with comprehensive water safety information, monitoring tools, safety guidelines, and disease prevention resources
            </p>
          </motion.div>

          {/* Navigation Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {sections.map((section) => (
              <motion.button
                key={section.id}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveSection(section.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeSection === section.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
                }`}
              >
                {section.icon}
                {section.label}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      {activeSection === 'overview' && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {[
                { title: 'Real-time Water Monitoring', description: 'Live water quality data from IoT sensors', icon: <Activity className="w-8 h-8" />, color: 'blue' },
                { title: 'Safety Guidelines', description: 'Comprehensive safety manuals and protocols', icon: <Shield className="w-8 h-8" />, color: 'green' },
                { title: 'IoT Monitoring Kits', description: 'Advanced sensor kits for community deployment', icon: <Cpu className="w-8 h-8" />, color: 'purple' },
                { title: 'Disease Prevention', description: 'Information about waterborne diseases and prevention', icon: <Heart className="w-8 h-8" />, color: 'red' }
              ].map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
                >
                  <div className={`w-16 h-16 bg-${feature.color}-100 dark:bg-${feature.color}-900/30 rounded-2xl flex items-center justify-center mb-6 text-${feature.color}-600 dark:text-${feature.color}-400`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Community Impact Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 text-white"
            >
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-4">Community Impact</h3>
                <p className="text-blue-100">Our technology is making a real difference in Northeast India</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { number: "500+", label: "Communities Protected" },
                  { number: "125K", label: "Lives Safeguarded" },
                  { number: "1,247", label: "Active Sensors" },
                  { number: "99.7%", label: "Prediction Accuracy" }
                ].map((stat, i) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl font-bold mb-2">{stat.number}</div>
                    <div className="text-sm text-blue-100">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Water Information Section */}
      {activeSection === 'water-info' && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Parameters List */}
              <div className="lg:col-span-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Quality Parameters
                </h3>
                <div className="space-y-4">
                  {waterParameters.map((param) => (
                    <motion.button
                      key={param.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedWaterParam(param.id)}
                      className={`w-full p-4 rounded-xl border text-left transition-all duration-300 ${
                        selectedWaterParam === param.id
                          ? 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800'
                          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="text-blue-600 dark:text-blue-400">
                            {param.icon}
                          </div>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {param.name}
                          </span>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(param.status)}`}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(param.status)}
                            {param.status.toUpperCase()}
                          </div>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {param.value} {param.unit}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Safe range: {param.range}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Parameter Details */}
              <div className="lg:col-span-2">
                {waterParameters.find(p => p.id === selectedWaterParam) && (
                  <motion.div
                    key={selectedWaterParam}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        {waterParameters.find(p => p.id === selectedWaterParam)?.name} Details
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {waterParameters.find(p => p.id === selectedWaterParam)?.description}
                      </p>
                    </div>

                    {/* Mock Chart Area */}
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          24-Hour Trend
                        </h4>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Last updated: 2 minutes ago
                        </div>
                      </div>
                      
                      {/* Simple trend visualization */}
                      <div className="h-32 flex items-end gap-2">
                        {Array.from({ length: 24 }).map((_, i) => {
                          const height = Math.random() * 80 + 20;
                          return (
                            <motion.div
                              key={i}
                              initial={{ height: 0 }}
                              animate={{ height: `${height}%` }}
                              transition={{ delay: i * 0.05, duration: 0.5 }}
                              className="flex-1 bg-blue-500/20 hover:bg-blue-500/40 rounded-t transition-colors duration-200"
                            />
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors duration-200"
                      >
                        Download Report
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
                      >
                        Set Alert
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ENHANCED MOBILE-RESPONSIVE Safety Manuals Section */}
      {activeSection === 'safety-manuals' && (
        <section className="py-8 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Mobile-first grid layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              
              {/* Manuals List - Full width on mobile, 2/3 on desktop */}
              <div className="lg:col-span-2 order-2 lg:order-1">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
                  Safety Resources
                </h3>
                
                <div className="space-y-4 sm:space-y-6">
                  {safetyManuals.map((manual, i) => (
                    <motion.div
                      key={manual.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
                    >
                      {/* Mobile-optimized header */}
                      <div className="space-y-4">
                        {/* Title and Icon Row */}
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gray-100 dark:bg-gray-700 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                            <FileText className="w-5 sm:w-6 h-5 sm:h-6" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                              {manual.title}
                            </h4>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                              {manual.description}
                            </p>
                          </div>
                        </div>
                        
                        {/* Mobile-responsive badges */}
                        <div className="flex flex-wrap gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getLevelColor(manual.level)}`}>
                            {manual.level}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                            {manual.type}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {manual.duration}
                          </span>
                        </div>
                        
                        {/* Mobile-responsive action buttons */}
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedManual(selectedManual === manual.id ? null : manual.id)}
                            className="flex-1 sm:flex-none px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                          >
                            <Eye className="w-4 h-4" />
                            <span>Preview</span>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 sm:flex-none px-4 py-2.5 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                          >
                            <Download className="w-4 h-4" />
                            <span>Download</span>
                          </motion.button>
                        </div>
                      </div>

                      {/* Enhanced Mobile-responsive Manual Details */}
                      {selectedManual === manual.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 overflow-hidden"
                        >
                          <div className="space-y-4 sm:space-y-6">
                            {/* Topics Section */}
                            <div>
                              <h5 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm sm:text-base">
                                Topics Covered
                              </h5>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {manual.topics.map((topic, idx) => (
                                  <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 p-2 bg-gray-50 dark:bg-gray-900 rounded-lg"
                                  >
                                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                    <span className="leading-tight">{topic}</span>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                            
                            {/* Languages Section */}
                            <div>
                              <h5 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm sm:text-base">
                                Available Languages
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                {manual.languages.map((lang, idx) => (
                                  <motion.span 
                                    key={lang}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-xs sm:text-sm font-medium"
                                  >
                                    {lang}
                                  </motion.span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Mobile-responsive Quick Access Sidebar */}
              <div className="lg:col-span-1 order-1 lg:order-2">
                <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 lg:sticky lg:top-24 shadow-sm">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                    Quick Access
                  </h4>
                  
                  <div className="space-y-3 sm:space-y-4">
                    <motion.a
                      href="tel:+913612582999"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-3 p-3 sm:p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg sm:rounded-xl text-red-700 dark:text-red-300 transition-all duration-200 hover:shadow-md"
                    >
                      <Phone className="w-5 h-5 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="font-semibold text-sm sm:text-base">Emergency Hotline</div>
                        <div className="text-xs sm:text-sm">+91-361-2582-999</div>
                      </div>
                    </motion.a>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center gap-3 p-3 sm:p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg sm:rounded-xl text-blue-700 dark:text-blue-300 transition-all duration-200 hover:shadow-md"
                    >
                      <Headphones className="w-5 h-5 flex-shrink-0" />
                      <div className="text-left min-w-0">
                        <div className="font-semibold text-sm sm:text-base">Audio Guides</div>
                        <div className="text-xs sm:text-sm">Listen to safety tips</div>
                      </div>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center gap-3 p-3 sm:p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg sm:rounded-xl text-green-700 dark:text-green-300 transition-all duration-200 hover:shadow-md"
                    >
                      <Globe className="w-5 h-5 flex-shrink-0" />
                      <div className="text-left min-w-0">
                        <div className="font-semibold text-sm sm:text-base">Local Resources</div>
                        <div className="text-xs sm:text-sm">Community centers</div>
                      </div>
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* IoT Kits Section */}
      {activeSection === 'iot-kits' && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {kitTypes.map((kit, i) => (
                <motion.div
                  key={kit.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onClick={() => setSelectedKit(kit.id)}
                  className={`relative p-8 rounded-2xl border cursor-pointer transition-all duration-300 ${
                    selectedKit === kit.id
                      ? 'bg-white dark:bg-gray-800 border-purple-300 dark:border-purple-600 shadow-xl'
                      : 'bg-white/70 dark:bg-gray-800/70 border-gray-200 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-700'
                  }`}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Package className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {kit.name}
                  </h3>
                  
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {kit.price}
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {kit.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    {kit.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Coverage:</span>
                      <div className="font-semibold text-gray-900 dark:text-white">{kit.coverage}</div>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Battery:</span>
                      <div className="font-semibold text-gray-900 dark:text-white">{kit.batteryLife}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Installation Guide */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                Installation Process
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { step: 1, title: 'Site Selection', duration: '30 min', icon: <MapPin className="w-6 h-6" /> },
                  { step: 2, title: 'Hardware Setup', duration: '2 hours', icon: <Wrench className="w-6 h-6" /> },
                  { step: 3, title: 'Network Config', duration: '45 min', icon: <Wifi className="w-6 h-6" /> },
                  { step: 4, title: 'Testing', duration: '1 hour', icon: <Activity className="w-6 h-6" /> }
                ].map((step, i) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="text-center p-6 bg-gray-50 dark:bg-gray-900 rounded-xl"
                  >
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 text-purple-600 dark:text-purple-400">
                      {step.icon}
                    </div>
                    <div className="text-sm text-purple-600 dark:text-purple-400 font-semibold mb-2">
                      STEP {step.step}
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                      {step.title}
                    </h4>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {step.duration}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Diseases Section */}
      {activeSection === 'diseases' && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-8">
              {diseases.map((disease, i) => (
                <motion.div
                  key={disease.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {disease.name}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getSeverityColor(disease.severity)}`}>
                      {disease.severity} Risk
                    </span>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                        Common Symptoms
                      </h4>
                      <ul className="space-y-2">
                        {disease.symptoms.map((symptom, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                            {symptom}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                        Prevention Methods
                      </h4>
                      <ul className="space-y-2">
                        {disease.prevention.map((method, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Shield className="w-4 h-4 text-green-500 flex-shrink-0" />
                            {method}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Emergency Contact Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-2xl p-8"
          >
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-6" />
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Health Emergency Support
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              If you notice water quality issues or health symptoms related to water consumption, contact our emergency response team immediately.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="tel:+913612582999"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors duration-200 flex items-center gap-2 justify-center"
              >
                <Phone className="w-5 h-5" />
                Emergency Hotline: +91-361-2582-999
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white dark:bg-gray-700 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 font-semibold rounded-xl hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors duration-200"
              >
                Report Water Issue
              </motion.button>
            </div>
            
            <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center justify-center gap-2 mb-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-green-500 rounded-full"
                />
                <span>Emergency response team online • Last updated by MARKASCHARAN • 2025-09-01 17:00:07 UTC</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CommunityUses;