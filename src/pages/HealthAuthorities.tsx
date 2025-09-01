import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  MapPin,
  AlertTriangle,
  Shield,
  Users,
  Activity,
  Bell,
  TrendingUp,
  TrendingDown,
  Minus,
  Phone,
  Truck,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  Filter,
  Search,
  Plus,
  Zap,
  Navigation,
  Calendar,
  BarChart3,
  PieChart,
  LineChart,
  Globe,
  Settings,
  FileText,
  Heart,
  Target,
  Layers,
  Building,
  Info,
  Car // Using Car instead of Ambulance
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Line, 
  Area, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';

// Remove react-simple-maps import and replace with a simple SVG map implementation

// Animated counter component
const AnimatedCounter: React.FC<{
  value: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}> = ({ value, suffix = '', decimals = 0, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = value;
      const totalFrames = Math.max(1, Math.floor(duration * 60));
      const increment = end / totalFrames;
      
      let frame = 0;
      const counter = setInterval(() => {
        frame++;
        const current = Math.min(start + increment * frame, end);
        setCount(current);
        
        if (frame === totalFrames) {
          clearInterval(counter);
        }
      }, duration * 1000 / totalFrames);
      
      return () => clearInterval(counter);
    }
  }, [inView, value, duration]);

  return (
    <span ref={nodeRef}>
      {count.toFixed(decimals)}{suffix}
    </span>
  );
};

// Animated Progress Bar
const AnimatedProgressBar: React.FC<{
  progress: number;
  color?: string;
  height?: number;
}> = ({ progress, color = "bg-blue-500", height = 6 }) => {
  return (
    <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full h-${height}`}>
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1, type: "spring", bounce: 0.2 }}
        className={`h-${height} ${color} rounded-full`}
      />
    </div>
  );
};

// Simple SVG Map Component to replace react-simple-maps
const SimpleMap: React.FC<{
  hotspots: Array<{
    id: number;
    coordinates: { lat: number; lng: number };
    severity: string;
  }>;
  selectedHotspot: number | null;
  onHotspotClick: (id: number) => void;
}> = ({ hotspots, selectedHotspot, onHotspotClick }) => {
  // Simple map coordinates for Northeast India region
  const mapBounds = {
    minLat: 23.5,
    maxLat: 28.5,
    minLng: 89.5,
    maxLng: 96.5
  };

  const scaleCoords = (lat: number, lng: number) => {
    const x = ((lng - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) * 300;
    const y = 200 - ((lat - mapBounds.minLat) / (mapBounds.maxLat - mapBounds.minLat)) * 200;
    return { x, y };
  };

  return (
    <svg width="100%" height="100%" viewBox="0 0 300 200" className="bg-gray-100 dark:bg-gray-700">
      {/* Simple outline of Northeast India region */}
      <path
        d="M50,50 L100,30 L150,60 L200,40 L250,70 L220,120 L180,150 L120,140 L80,120 L50,100 Z"
        fill="#a78bfa"
        stroke="#FFFFFF"
        strokeWidth="2"
      />
      
      {/* Hotspot markers */}
      {hotspots.map((hotspot) => {
        const { x, y } = scaleCoords(hotspot.coordinates.lat, hotspot.coordinates.lng);
        const severityColor = hotspot.severity === 'High' ? '#EF4444' : 
                             hotspot.severity === 'Medium' ? '#F59E0B' : '#10B981';
        
        return (
          <g key={hotspot.id} onClick={() => onHotspotClick(hotspot.id)} style={{ cursor: 'pointer' }}>
            <circle
              cx={x}
              cy={y}
              r={selectedHotspot === hotspot.id ? 8 : 6}
              fill={severityColor}
              stroke="#fff"
              strokeWidth={2}
            />
            {selectedHotspot === hotspot.id && (
              <motion.circle
                cx={x}
                cy={y}
                r={16}
                fill={severityColor}
                opacity={0.3}
                animate={{ 
                  r: [16, 24, 16],
                  opacity: [0.3, 0.1, 0.3]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
};

const HealthAuthorities: React.FC = () => {
  const [activeTab, setActiveTab] = useState('disease-maps');
  const [selectedRegion, setSelectedRegion] = useState('assam');
  const [selectedDisease, setSelectedDisease] = useState('cholera');
  const [showEmergencyResponse, setShowEmergencyResponse] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<number | null>(null);
  const [selectedResource, setSelectedResource] = useState<string | null>('ambulances');
  const [view, setView] = useState('map'); // 'map' or 'list'
  const [chartTimeframe, setChartTimeframe] = useState('week'); // 'day', 'week', 'month'

  // Mock disease hotspot data
  const diseaseHotspots = [
    {
      id: 1,
      name: 'Guwahati Central',
      district: 'Kamrup Metro',
      disease: 'Cholera',
      severity: 'High',
      cases: 45,
      trend: 'increasing',
      coordinates: { lat: 26.1445, lng: 91.7362 },
      affectedArea: '4.5 km radius'
    },
    {
      id: 2,
      name: 'Dibrugarh Town',
      district: 'Dibrugarh',
      disease: 'Typhoid',
      severity: 'Medium',
      cases: 23,
      trend: 'stable',
      coordinates: { lat: 27.4728, lng: 94.9120 },
      affectedArea: '2.5 km radius'
    },
    {
      id: 3,
      name: 'Silchar',
      district: 'Cachar',
      disease: 'Diarrhea',
      severity: 'Medium',
      cases: 89,
      trend: 'decreasing',
      coordinates: { lat: 24.8333, lng: 92.7789 },
      affectedArea: '3.8 km radius'
    },
    {
      id: 4,
      name: 'Jorhat',
      district: 'Jorhat',
      disease: 'Hepatitis A',
      severity: 'Low',
      cases: 12,
      trend: 'stable',
      coordinates: { lat: 26.7509, lng: 94.2037 },
      affectedArea: '1.2 km radius'
    }
  ];

  // Notifications data
  const notifications = [
    {
      id: 1,
      type: 'critical',
      title: 'Cholera Outbreak Alert',
      message: 'New cholera cases reported in Guwahati Central. Immediate intervention required.',
      location: 'Guwahati Central',
      timestamp: '2025-09-01 15:45:22',
      status: 'unread',
      affected: 5000
    },
    {
      id: 2,
      type: 'warning',
      title: 'Water Quality Deterioration',
      message: 'pH levels dropping below safe range in Dibrugarh water supply.',
      location: 'Dibrugarh',
      timestamp: '2025-09-01 14:30:15',
      status: 'read',
      affected: 3200
    },
    {
      id: 3,
      type: 'info',
      title: 'Resource Delivery Complete',
      message: 'Medical supplies successfully delivered to Silchar health center.',
      location: 'Silchar',
      timestamp: '2025-09-01 12:15:33',
      status: 'read',
      affected: 2500
    }
  ];

  // Intervention tracking data
  const interventions = [
    {
      id: 1,
      title: 'Emergency Water Treatment',
      location: 'Guwahati Central',
      status: 'active',
      progress: 65,
      startDate: '2025-09-01',
      estimatedCompletion: '2025-09-03',
      personnel: 24,
      resources: ['Water treatment units', 'Testing kits', 'Medical staff'],
      route: [
        { lat: 26.1445, lng: 91.7362, status: 'completed' },
        { lat: 26.1480, lng: 91.7420, status: 'completed' },
        { lat: 26.1520, lng: 91.7480, status: 'active' },
        { lat: 26.1560, lng: 91.7540, status: 'pending' },
        { lat: 26.1600, lng: 91.7600, status: 'pending' }
      ]
    },
    {
      id: 2,
      title: 'Medical Supply Distribution',
      location: 'Dibrugarh',
      status: 'completed',
      progress: 100,
      startDate: '2025-08-30',
      estimatedCompletion: '2025-08-31',
      personnel: 18,
      resources: ['Medicine kits', 'Vaccines', 'Medical staff'],
      route: [
        { lat: 27.4728, lng: 94.9120, status: 'completed' },
        { lat: 27.4760, lng: 94.9180, status: 'completed' },
        { lat: 27.4800, lng: 94.9240, status: 'completed' },
        { lat: 27.4840, lng: 94.9300, status: 'completed' }
      ]
    },
    {
      id: 3,
      title: 'Community Awareness Campaign',
      location: 'Silchar',
      status: 'planned',
      progress: 0,
      startDate: '2025-09-02',
      estimatedCompletion: '2025-09-05',
      personnel: 12,
      resources: ['Education materials', 'Mobile announcement units', 'Community volunteers'],
      route: [
        { lat: 24.8333, lng: 92.7789, status: 'pending' },
        { lat: 24.8370, lng: 92.7850, status: 'pending' },
        { lat: 24.8410, lng: 92.7910, status: 'pending' },
        { lat: 24.8450, lng: 92.7970, status: 'pending' }
      ]
    }
  ];

  // Resource management data - using Car instead of Ambulance
  const resources = [
    {
      id: 'ambulances',
      name: 'Emergency Vehicles',
      icon: <Car className="w-5 h-5" />,
      total: 45,
      available: 27,
      deployed: 18,
      status: 'adequate',
      locations: ['Guwahati', 'Dibrugarh', 'Silchar', 'Jorhat', 'Tezpur'],
      chart: [
        { date: '09/01', available: 27, deployed: 18 },
        { date: '09/02', available: 29, deployed: 16 },
        { date: '09/03', available: 30, deployed: 15 },
        { date: '09/04', available: 25, deployed: 20 },
        { date: '09/05', available: 23, deployed: 22 },
        { date: '09/06', available: 26, deployed: 19 },
        { date: '09/07', available: 28, deployed: 17 }
      ]
    },
    {
      id: 'medical-teams',
      name: 'Medical Teams',
      icon: <Users className="w-5 h-5" />,
      total: 32,
      available: 14,
      deployed: 18,
      status: 'limited',
      locations: ['Guwahati', 'Dibrugarh', 'Silchar', 'Nagaon'],
      chart: [
        { date: '09/01', available: 14, deployed: 18 },
        { date: '09/02', available: 15, deployed: 17 },
        { date: '09/03', available: 13, deployed: 19 },
        { date: '09/04', available: 10, deployed: 22 },
        { date: '09/05', available: 8, deployed: 24 },
        { date: '09/06', available: 11, deployed: 21 },
        { date: '09/07', available: 14, deployed: 18 }
      ]
    },
    {
      id: 'treatment-kits',
      name: 'Water Treatment Kits',
      icon: <Package className="w-5 h-5" />,
      total: 1500,
      available: 850,
      deployed: 650,
      status: 'adequate',
      locations: ['Central Warehouse', 'Regional Depots'],
      chart: [
        { date: '09/01', available: 850, deployed: 650 },
        { date: '09/02', available: 820, deployed: 680 },
        { date: '09/03', available: 900, deployed: 600 },
        { date: '09/04', available: 880, deployed: 620 },
        { date: '09/05', available: 830, deployed: 670 },
        { date: '09/06', available: 840, deployed: 660 },
        { date: '09/07', available: 850, deployed: 650 }
      ]
    },
    {
      id: 'vaccines',
      name: 'Vaccine Doses',
      icon: <Shield className="w-5 h-5" />,
      total: 25000,
      available: 18500,
      deployed: 6500,
      status: 'adequate',
      locations: ['Cold Storage Facilities', 'Health Centers'],
      chart: [
        { date: '09/01', available: 18500, deployed: 6500 },
        { date: '09/02', available: 18000, deployed: 7000 },
        { date: '09/03', available: 17800, deployed: 7200 },
        { date: '09/04', available: 17200, deployed: 7800 },
        { date: '09/05', available: 16800, deployed: 8200 },
        { date: '09/06', available: 18000, deployed: 7000 },
        { date: '09/07', available: 18500, deployed: 6500 }
      ]
    }
  ];

  // Time series data for disease trends
  const diseaseTrendData = [
    { date: '08/25', cholera: 15, typhoid: 18, diarrhea: 45, hepatitis: 8 },
    { date: '08/26', cholera: 18, typhoid: 19, diarrhea: 50, hepatitis: 9 },
    { date: '08/27', cholera: 22, typhoid: 20, diarrhea: 55, hepatitis: 10 },
    { date: '08/28', cholera: 28, typhoid: 22, diarrhea: 60, hepatitis: 9 },
    { date: '08/29', cholera: 35, typhoid: 21, diarrhea: 70, hepatitis: 11 },
    { date: '08/30', cholera: 40, typhoid: 22, diarrhea: 80, hepatitis: 12 },
    { date: '08/31', cholera: 43, typhoid: 23, diarrhea: 85, hepatitis: 12 },
    { date: '09/01', cholera: 45, typhoid: 23, diarrhea: 89, hepatitis: 12 }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-700';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-700';
      case 'low': return 'text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700';
      default: return 'text-gray-600 bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700';
      case 'completed': return 'text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700';
      case 'planned': return 'text-purple-600 bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-700';
      default: return 'text-gray-600 bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-700';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-700';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-700';
      case 'info': return 'text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700';
      case 'success': return 'text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700';
      default: return 'text-gray-600 bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-700';
    }
  };

  const getResourceStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'adequate': return 'text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700';
      case 'limited': return 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-700';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-700';
      default: return 'text-gray-600 bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-700';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend.toLowerCase()) {
      case 'increasing': return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'decreasing': return <TrendingDown className="w-4 h-4 text-green-500" />;
      case 'stable': return <Minus className="w-4 h-4 text-yellow-500" />;
      default: return null;
    }
  };

  const getSeverityMapColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'rgba(239, 68, 68, 1)';  // red-500
      case 'medium': return 'rgba(245, 158, 11, 1)';  // yellow-500
      case 'low': return 'rgba(34, 197, 94, 1)';  // green-500
      default: return 'rgba(107, 114, 128, 1)';  // gray-500
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-gray-900 dark:to-blue-950 pt-16">
      {/* Hero Section */}
      <section className="py-12 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            {/* Status Badge */}
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-purple-200/50 dark:border-purple-700/50 rounded-full mb-8 shadow-sm"
            >
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-purple-500 rounded-full"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Health Command Center • Updated by NARANDRA MODI • 2025-09-01 17:27:34 UTC
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 dark:text-white mb-6 leading-tight">
              Health
              <span className="font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Authorities
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed font-light">
              Advanced monitoring, intervention tracking, and resource management for public health officials
            </p>
          </motion.div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {[
              { id: 'disease-maps', label: 'Disease Hotspot Maps', icon: <MapPin className="w-5 h-5" /> },
              { id: 'notifications', label: 'Public Notifications', icon: <Bell className="w-5 h-5" /> },
              { id: 'interventions', label: 'Tracking Interventions', icon: <Activity className="w-5 h-5" /> },
              { id: 'resources', label: 'Resource Management', icon: <Package className="w-5 h-5" /> }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700 shadow'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Emergency Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowEmergencyResponse(!showEmergencyResponse)}
            className="mx-auto flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Zap className="w-5 h-5" />
            Emergency Response
          </motion.button>
        </div>
      </section>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {/* Disease Maps Tab */}
        {activeTab === 'disease-maps' && (
          <motion.section
            key="disease-maps"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="py-10 sm:py-16"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              {/* Map Controls */}
              <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
                
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Disease Hotspot Maps
                </h2>
                
                <div className="flex flex-wrap gap-3">
                
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200"
                  >
                    <option value="assam">Assam</option>
                    <option value="manipur">Manipur</option>
                    <option value="meghalaya">Meghalaya</option>
                    <option value="tripura">Tripura</option>
                  </select>
                  
                  <select
                    value={selectedDisease}
                    onChange={(e) => setSelectedDisease(e.target.value)}
                    className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200"
                  >
                    <option value="cholera">Cholera</option>
                    <option value="typhoid">Typhoid</option>
                    <option value="diarrhea">Diarrhea</option>
                    <option value="hepatitis">Hepatitis A</option>
                  </select>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
                  >
                    <Filter className="w-4 h-4" />
                    Filter
                  </motion.button>

                  <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                    <button 
                      onClick={() => setView('map')} 
                      className={`px-3 py-2 ${view === 'map' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200' : 'text-gray-600 dark:text-gray-400'}`}
                    >
                      <Globe className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setView('list')} 
                      className={`px-3 py-2 ${view === 'list' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200' : 'text-gray-600 dark:text-gray-400'}`}
                    >
                      <Layers className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Map and List View */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Interactive Map */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-xl">
                  
                  <div className="aspect-[16/9] bg-gray-100 dark:bg-gray-700 rounded-xl mb-4 overflow-hidden relative">
                    {view === 'map' ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full"
                      >
                        <SimpleMap
                          hotspots={diseaseHotspots}
                          selectedHotspot={selectedHotspot}
                          onHotspotClick={(id) => setSelectedHotspot(id === selectedHotspot ? null : id)}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full overflow-auto p-4"
                      >
                        {/* Disease Trend Chart */}
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Disease Trends</h3>
                        <ResponsiveContainer width="100%" height={300}>
                          <ComposedChart data={diseaseTrendData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="date" stroke="#6B7280" />
                            <YAxis stroke="#6B7280" />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: "#1F2937", 
                                borderColor: "#374151",
                                color: "#F9FAFB"
                              }}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="cholera" stroke="#EF4444" strokeWidth={2} />
                            <Line type="monotone" dataKey="typhoid" stroke="#F59E0B" strokeWidth={2} />
                            <Line type="monotone" dataKey="diarrhea" stroke="#3B82F6" strokeWidth={2} />
                            <Line type="monotone" dataKey="hepatitis" stroke="#10B981" strokeWidth={2} />
                          </ComposedChart>
                        </ResponsiveContainer>
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Map Legend */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Disease Hotspots</h4>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-xs text-gray-700 dark:text-gray-300">High Severity</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-xs text-gray-700 dark:text-gray-300">Medium Severity</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-700 dark:text-gray-300">Low Severity</span>
                    </div>
                  </div>
                </div>
                
                {/* Hotspot List */}
                <div className="lg:col-span-1">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-xl h-full">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                      Active Hotspots
                    </h3>
                    
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="w-4 h-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search locations..."
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white mb-4" 
                      />
                    </div>
                    
                    <div className="space-y-3 overflow-auto max-h-[400px] pr-2">
                      {diseaseHotspots.map((hotspot) => (
                        <motion.div
                          key={hotspot.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          whileHover={{ scale: 1.02 }}
                          className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 cursor-pointer"
                          onClick={() => setSelectedHotspot(hotspot.id === selectedHotspot ? null : hotspot.id)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {hotspot.name}
                            </h4>
                            <span className={`px-2 py-1 rounded-full text-xs ${getSeverityColor(hotspot.severity)}`}>
                              {hotspot.severity}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {hotspot.district} • {hotspot.disease}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-medium">
                              <span className="text-purple-600 dark:text-purple-400">{hotspot.cases}</span> cases
                            </div>
                            <div className="flex items-center gap-1">
                              {getTrendIcon(hotspot.trend)}
                              <span className="text-xs">
                                {hotspot.trend === 'increasing' ? 'Rising' : 
                                 hotspot.trend === 'decreasing' ? 'Falling' : 'Stable'}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}
        
        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <motion.section
            key="notifications"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="py-10 sm:py-16"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                
                {/* Notifications List */}
                <div className="lg:flex-1">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                      Public Notifications
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors duration-200 flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span className="hidden sm:inline">New Alert</span>
                    </motion.button>
                  </div>
                  
                  <div className="space-y-4">
                    {notifications.map((notification, i) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -2, scale: 1.01 }}
                        className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start gap-3 flex-1">
                            <div className={`w-3 h-3 rounded-full mt-2 ${getNotificationColor(notification.type)} border-0`} />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                {notification.title}
                              </h4>
                              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                                {notification.message}
                              </p>
                            </div>
                          </div>
                          <motion.div 
                            className={`px-2 py-1 rounded-full text-xs font-medium border ${getNotificationColor(notification.type)}`}
                            whileHover={{ scale: 1.05 }}
                          >
                            {notification.status.toUpperCase()}
                          </motion.div>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-4">
                            <span>Affected: <AnimatedCounter value={notification.affected} /></span>
                            <span>{notification.timestamp}</span>
                          </div>
                          <div className="flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                            >
                              <Eye className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                            >
                              <Settings className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Notification Controls */}
                <div className="lg:w-80">
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 sticky top-24"
                  >
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                      Quick Actions
                    </h4>
                    
                    <div className="space-y-4">
                      {[
                        {
                          title: "Send Emergency Alert",
                          description: "Immediate outbreak warning",
                          icon: <AlertTriangle className="w-5 h-5" />,
                          color: "red"
                        },
                        {
                          title: "Health Advisory",
                          description: "General health guidelines",
                          icon: <Heart className="w-5 h-5" />,
                          color: "blue"
                        },
                        {
                          title: "Resource Update",
                          description: "Service availability notice",
                          icon: <Info className="w-5 h-5" />,
                          color: "green"
                        }
                      ].map((action, i) => (
                        <motion.button
                          key={action.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full flex items-center gap-3 p-4 bg-${action.color}-50 dark:bg-${action.color}-950/20 border border-${action.color}-200 dark:border-${action.color}-800 rounded-lg text-${action.color}-700 dark:text-${action.color}-300 hover:shadow-md transition-all duration-200`}
                        >
                          <div className={`w-10 h-10 bg-${action.color}-100 dark:bg-${action.color}-900/30 rounded-lg flex items-center justify-center`}>
                            {action.icon}
                          </div>
                          <div className="text-left">
                            <div className="font-semibold text-sm">{action.title}</div>
                            <div className="text-xs opacity-80">{action.description}</div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Interventions Tab */}
        {activeTab === 'interventions' && (
          <motion.section
            key="interventions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="py-10 sm:py-16"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              {/* Intervention List */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Tracking Interventions
                </h2>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 flex items-center gap-2"
                  onClick={() => {/* Handle new intervention */}}
                >
                  <Plus className="w-4 h-4" />
                  New Intervention
                </motion.button>
              </div>

              {/* Interventions Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {interventions.map((intervention, i) => (
                  <motion.div
                    key={intervention.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {intervention.title}
                      </h3>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(intervention.status)}`}>
                        {intervention.status.toUpperCase()}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Location: {intervention.location}
                    </p>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Progress</span>
                        <span className="text-blue-600 dark:text-blue-400">{intervention.progress}%</span>
                      </div>
                      <AnimatedProgressBar progress={intervention.progress} />
                    </div>
                    
                    {/* Timeline */}
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                      <div>Started: {intervention.startDate}</div>
                      <div>Completion: {intervention.estimatedCompletion}</div>
                    </div>
                    
                    {/* Route Map Preview - Simplified */}
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg h-28 mb-4 relative overflow-hidden">
                      {/* Route Visualization */}
                      {intervention.route.map((point, idx) => {
                        // Create position based on index
                        const left = 10 + (idx * 20) + '%';
                        const top = 30 + (Math.sin(idx) * 15) + '%';
                        const isCompleted = point.status === 'completed';
                        const isActive = point.status === 'active';
                        
                        return (
                          <React.Fragment key={`point-${idx}`}>
                            {/* Connection Line */}
                            {idx > 0 && (
                              <div 
                                className={`absolute h-0.5 ${
                                  isCompleted || (idx > 0 && intervention.route[idx-1].status === 'completed')
                                    ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                                }`}
                                style={{
                                  left: `calc(${10 + ((idx-1) * 20)}% + 4px)`,
                                  top: `calc(${30 + (Math.sin(idx-1) * 15)}% + 4px)`,
                                  width: `calc(${left} - ${10 + ((idx-1) * 20)}%)`,
                                  transform: `rotate(${Math.atan2(
                                    (30 + (Math.sin(idx) * 15)) - (30 + (Math.sin(idx-1) * 15)),
                                    (10 + (idx * 20)) - (10 + ((idx-1) * 20))
                                  ) * 180/Math.PI}deg)`,
                                  transformOrigin: 'left center'
                                }}
                              />
                            )}
                            
                            {/* Point Marker */}
                            <div 
                              className={`absolute w-4 h-4 rounded-full border-2 ${
                                isCompleted ? 'bg-green-500 border-green-300' : 
                                isActive ? 'bg-blue-500 border-blue-300' : 
                                'bg-gray-300 dark:bg-gray-600 border-gray-200 dark:border-gray-500'
                              }`}
                              style={{ left, top }}
                            >
                              {isActive && (
                                <motion.div
                                  className="absolute -inset-1 rounded-full bg-blue-500/30"
                                  animate={{ scale: [1, 1.5, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                />
                              )}
                            </div>
                          </React.Fragment>
                        );
                      })}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex justify-between">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Details
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center gap-1"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        Update
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Intervention Analytics */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-10 bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Intervention Analytics
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 text-center">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Active Interventions</div>
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      <AnimatedCounter value={1} />
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 text-center">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Personnel Deployed</div>
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                      <AnimatedCounter value={interventions.reduce((acc, curr) => acc + curr.personnel, 0)} />
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 text-center">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Completion Rate</div>
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                      <AnimatedCounter value={55} suffix="%" />
                    </div>
                  </div>
                </div>

                {/* Response Time Analysis Chart */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Response Time Analysis
                  </h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <ComposedChart data={[
                      { month: "Jan", responseTime: 24, target: 20 },
                      { month: "Feb", responseTime: 22, target: 20 },
                      { month: "Mar", responseTime: 19, target: 20 },
                      { month: "Apr", responseTime: 18, target: 20 },
                      { month: "May", responseTime: 20, target: 20 },
                      { month: "Jun", responseTime: 17, target: 15 },
                      { month: "Jul", responseTime: 16, target: 15 },
                      { month: "Aug", responseTime: 14, target: 15 },
                      { month: "Sep", responseTime: 12, target: 15 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "#1F2937", 
                          borderColor: "#374151",
                          color: "#F9FAFB"
                        }}
                      />
                      <Legend />
                      <Bar dataKey="responseTime" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                      <Line type="monotone" dataKey="target" stroke="#EF4444" strokeWidth={2} dot={false} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </div>
          </motion.section>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <motion.section
            key="resources"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="py-10 sm:py-16"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
                
                {/* Resources List */}
                <div className="lg:col-span-1">
                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6"
                  >
                    Available Resources
                  </motion.h3>
                  <div className="space-y-3 sm:space-y-4">
                    {resources.map((resource, i) => (
                      <motion.button
                        key={resource.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedResource(resource.id)}
                        className={`w-full p-3 sm:p-4 rounded-xl border text-left transition-all duration-300 ${
                          selectedResource === resource.id
                            ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800 shadow-lg'
                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <motion.div 
                            className="text-green-600 dark:text-green-400"
                            animate={selectedResource === resource.id ? { rotate: 360 } : {}}
                            transition={{ duration: 0.5 }}
                          >
                            {resource.icon}
                          </motion.div>
                          <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                            {resource.name}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 text-xs sm:text-sm">
                          <div>
                            <div className="text-gray-500 dark:text-gray-400">Total</div>
                            <div className="font-bold text-gray-900 dark:text-white">
                              <AnimatedCounter value={resource.total} />
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-500 dark:text-gray-400">Available</div>
                            <div className="font-bold text-green-600">
                              <AnimatedCounter value={resource.available} />
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-500 dark:text-gray-400">Deployed</div>
                            <div className="font-bold text-orange-600">
                              <AnimatedCounter value={resource.deployed} />
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                          <span className={`px-2 py-0.5 rounded-full ${getResourceStatusColor(resource.status)}`}>
                            {resource.status.toUpperCase()}
                          </span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Resource Details */}
                <div className="lg:col-span-2">
                  <AnimatePresence mode="wait">
                    {selectedResource && (
                      <motion.div
                        key={selectedResource}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 shadow-lg"
                      >
                        <div className="mb-6 sm:mb-8">
                          <motion.h3 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4"
                          >
                            {resources.find(r => r.id === selectedResource)?.name}
                          </motion.h3>
                          <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-gray-600 dark:text-gray-400 leading-relaxed"
                          >
                            Real-time resource management and deployment coordination
                          </motion.p>
                        </div>

                        {/* Resource Status Chart */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 }}
                          className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 sm:p-6 mb-6 overflow-hidden relative"
                        >
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                            Resource Allocation
                          </h4>
                          
                          {/* Visual resource bar */}
                          <div className="space-y-4">
                            {['Available', 'Deployed', 'Maintenance'].map((status, i) => {
                              const resource = resources.find(r => r.id === selectedResource);
                              const values = [resource?.available || 0, resource?.deployed || 0, (resource?.total || 0) - (resource?.available || 0) - (resource?.deployed || 0)];
                              const colors = ['bg-green-500', 'bg-orange-500', 'bg-gray-400'];
                              const percentage = ((values[i] / (resource?.total || 1)) * 100);
                              
                              return (
                                <div key={status}>
                                  <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-600 dark:text-gray-400">{status}</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                      <AnimatedCounter value={values[i]} /> ({percentage.toFixed(0)}%)
                                    </span>
                                  </div>
                                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <motion.div
                                      initial={{ width: "0%" }}
                                      animate={{ width: `${percentage}%` }}
                                      transition={{ delay: i * 0.2 + 0.5, duration: 1 }}
                                      className={`h-2 ${colors[i]} rounded-full`}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>

                        {/* Location Distribution */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="mb-6"
                        >
                          <h5 className="font-semibold text-gray-900 dark:text-white mb-3">
                            Deployment Locations
                          </h5>
                          <div className="grid grid-cols-2 gap-3">
                            {resources.find(r => r.id === selectedResource)?.locations.map((location, idx) => (
                              <motion.div
                                key={location}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
                              >
                                <MapPin className="w-4 h-4 text-green-500" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{location}</span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                        >
                          <motion.button
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors duration-200"
                          >
                            <Navigation className="w-4 h-4" />
                            Deploy Now
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
                          >
                            <Calendar className="w-4 h-4" />
                            Schedule
                          </motion.button>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Emergency Contact Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-2xl p-8"
          >
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Emergency Response Center
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              For critical health emergencies requiring immediate attention and resource deployment.
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
                Deploy Emergency Team
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HealthAuthorities;