import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';
import {
  Shield,
  Users,
  BarChart3,
  AlertTriangle,
  Heart,
  Droplets,
  Brain,
  Activity,
  ArrowRight,
  Play,
  CheckCircle,
  Zap,
  Globe,
  Award,
  TrendingUp,
  Eye,
  Sparkles,
  Target,
  Layers,
  Cpu
} from 'lucide-react';

// Type definitions for features
interface FeatureItem {
  text: string;
  hasNumber: boolean;
  number?: number;
  suffix?: string;
}

// Animated Counter Component
const AnimatedCounter: React.FC<{ 
  value: number; 
  suffix?: string; 
  prefix?: string; 
  duration?: number;
  decimals?: number;
}> = ({ value, suffix = '', prefix = '', duration = 2, decimals = 0 }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { 
    damping: 25, 
    stiffness: 100,
    duration: duration * 1000 
  });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    return springValue.on('change', (latest) => {
      setDisplayValue(latest);
    });
  }, [springValue]);

  return (
    <span ref={nodeRef}>
      {prefix}{displayValue.toFixed(decimals)}{suffix}
    </span>
  );
};

// Animated Text Component for special values
const AnimatedText: React.FC<{ 
  children: string; 
  delay?: number;
}> = ({ children, delay = 0 }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true });

  return (
    <motion.span
      ref={nodeRef}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ 
        delay, 
        duration: 0.8,
        type: "spring",
        bounce: 0.4
      }}
    >
      {children}
    </motion.span>
  );
};

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Transform values for parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:from-slate-900 dark:via-gray-900 dark:to-black">
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 relative overflow-hidden">
        {/* Elegant Background Elements */}
        <div className="absolute inset-0">
          <motion.div 
            style={{ y: y1 }}
            className="absolute top-20 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"
          />
          <motion.div 
            style={{ y: y2 }}
            className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl"
          />
          
          {/* Subtle geometric patterns */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 4 + (i * 0.5),
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            >
              <div className="w-2 h-2 bg-gray-400/20 dark:bg-gray-600/20 rounded-full" />
            </motion.div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center">
            
            {/* Elegant Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-full mb-8 shadow-sm"
            >
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-emerald-500 rounded-full"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                System Active • <AnimatedCounter value={500} suffix="+" /> Communities • Updated by NARANDRA MODI • 2025-08-31 12:36:57 UTC
              </span>
            </motion.div>

            {/* Majestic Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <h1 className="text-5xl md:text-7xl font-light text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
                Smart Health
                <br />
                <span className="font-bold bg-gradient-to-r from-slate-600 via-gray-700 to-slate-800 dark:from-slate-200 dark:via-white dark:to-gray-200 bg-clip-text text-transparent">
                  Monitoring System
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed font-light">
                AI-powered water quality monitoring and early warning system for water-borne diseases in rural Northeast India
              </p>
            </motion.div>

            {/* Sleek CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  Launch Dashboard
                  <ArrowRight className="w-4 h-4" />
                </span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Watch Demo
                </span>
              </motion.button>
            </motion.div>

            {/* Elegant Stats with Animated Numbers */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
            >
              {[
                { label: 'Lives Protected', value: 125000, suffix: 'K+', icon: <Shield className="w-5 h-5" />, duration: 2.5 },
                { label: 'Active Sensors', value: 1247, icon: <Activity className="w-5 h-5" />, duration: 2 },
                { label: 'Accuracy Rate', value: 99.7, suffix: '%', icon: <Brain className="w-5 h-5" />, decimals: 1, duration: 2.2 },
                { label: 'Communities', value: 500, suffix: '+', icon: <Users className="w-5 h-5" />, duration: 1.8 }
              ].map((stat, i) => (
                <motion.div 
                  key={stat.label} 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/30 dark:border-gray-700/30 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl mx-auto mb-3">
                    <div className="text-gray-600 dark:text-gray-400">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.label === 'Lives Protected' ? (
                      <AnimatedCounter 
                        value={125} 
                        suffix="K+" 
                        duration={stat.duration}
                        decimals={stat.decimals || 0}
                      />
                    ) : (
                      <AnimatedCounter 
                        value={stat.value} 
                        suffix={stat.suffix || ''} 
                        duration={stat.duration}
                        decimals={stat.decimals || 0}
                      />
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Intelligence Section */}
      <AIIntelligenceSection />

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-light text-gray-900 dark:text-white mb-4"
            >
              How It <span className="font-bold">Works</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
            >
              Our AI-powered system combines IoT sensors, machine learning, and community data to predict and prevent water-borne disease outbreaks
            </motion.p>
          </div>

          {/* Elegant Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Droplets className="w-7 h-7" />,
                title: "Real-time Monitoring",
                description: "IoT sensors continuously monitor water quality parameters including pH, turbidity, and bacterial presence across rural communities.",
                features: [
                  { text: "24/7 Water Quality Tracking", hasNumber: true, number: 24 },
                  { text: "Multi-parameter Analysis", hasNumber: false },
                  { text: "Remote Connectivity", hasNumber: false }
                ] as FeatureItem[]
              },
              {
                icon: <Brain className="w-7 h-7" />,
                title: "AI Prediction Engine",
                description: "Advanced machine learning algorithms analyze patterns and predict potential disease outbreaks 72 hours before symptoms appear.",
                features: [
                  { text: "Predictive Analytics", hasNumber: false },
                  { text: "Pattern Recognition", hasNumber: false },
                  { text: "99.7% Accuracy Rate", hasNumber: true, number: 99.7, suffix: "%" }
                ] as FeatureItem[]
              },
              {
                icon: <AlertTriangle className="w-7 h-7" />,
                title: "Early Warning System",
                description: "Automated alerts sent to health authorities and communities enable rapid response and prevention of disease spread.",
                features: [
                  { text: "Instant Notifications", hasNumber: false },
                  { text: "Multi-channel Alerts", hasNumber: false },
                  { text: "Community Dashboard", hasNumber: false }
                ] as FeatureItem[]
              }
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="group p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl hover:shadow-lg transition-all duration-500 border border-gray-100 dark:border-gray-800"
              >
                <div className="w-14 h-14 bg-gray-900 dark:bg-white rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white dark:text-gray-900">
                    {feature.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {feature.description.includes('72 hours') ? (
                    <>
                      Advanced machine learning algorithms analyze patterns and predict potential disease outbreaks{' '}
                      <span className="font-semibold">
                        <AnimatedCounter value={72} /> hours
                      </span>{' '}
                      before symptoms appear.
                    </>
                  ) : (
                    feature.description
                  )}
                </p>

                <ul className="space-y-3">
                  {feature.features.map((feat, idx) => (
                    <motion.li 
                      key={idx} 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.2 + idx * 0.1 }}
                      className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400"
                    >
                      <div className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full" />
                      {feat.hasNumber && feat.number ? (
                        <span>
                          {feat.number === 99.7 ? (
                            <>
                              <span className="font-semibold">
                                <AnimatedCounter 
                                  value={feat.number} 
                                  suffix={feat.suffix || ''} 
                                  duration={1.5}
                                  decimals={1}
                                />
                              </span>{' '}
                              Accuracy Rate
                            </>
                          ) : (
                            feat.text.split(feat.number.toString())[0] + feat.number + feat.text.split(feat.number.toString())[1]
                          )}
                        </span>
                      ) : feat.text.includes('24/7') ? (
                        <span>
                          <span className="font-semibold">
                            <AnimatedCounter value={24} />/<AnimatedCounter value={7} />
                          </span>{' '}
                          Water Quality Tracking
                        </span>
                      ) : (
                        feat.text
                      )}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Excellence Section */}
      <TechnologySection />

      {/* Impact Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-gradient-to-r from-gray-900 to-slate-800 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 md:p-12 text-center text-white overflow-hidden"
          >
            {/* Subtle patterns */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-8 right-8 w-32 h-32 border border-white/20 rounded-full" />
              <div className="absolute bottom-8 left-8 w-24 h-24 border border-white/20 rounded-full" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Heart className="w-16 h-16 mx-auto mb-6 opacity-80" />
              
              <h2 className="text-3xl md:text-5xl font-light mb-6">
                Protecting Lives Through <span className="font-bold">Technology</span>
              </h2>
              
              <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90 font-light">
                Our system has successfully prevented multiple disease outbreaks, protecting over{' '}
                <span className="font-bold">
                  <AnimatedCounter value={125} suffix="K" duration={2.5} />
                </span>{' '}
                lives across rural Northeast India
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { number: 0, label: "Outbreaks This Year", isSpecial: true },
                  { number: 72, label: "Early Warning Time", suffix: "hrs" },
                  { number: 500, label: "Communities Protected", suffix: "+" },
                  { number: 99.7, label: "Prediction Accuracy", suffix: "%", decimals: 1 }
                ].map((stat, i) => (
                  <motion.div 
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-3xl font-bold mb-2">
                      {stat.isSpecial ? (
                        <AnimatedText delay={i * 0.2}>0</AnimatedText>
                      ) : (
                        <AnimatedCounter 
                          value={stat.number} 
                          suffix={stat.suffix || ''} 
                          duration={2 + i * 0.3}
                          decimals={stat.decimals || 0}
                        />
                      )}
                    </div>
                    <div className="text-sm opacity-80 font-light">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 dark:text-white mb-6">
              Ready to <span className="font-bold">Save Lives</span>?
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 font-light">
              Join the fight against water-borne diseases. Deploy our AI-powered monitoring system in your community today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started Now
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// Enhanced AI Intelligence Section with Animated Numbers
const AIIntelligenceSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full mb-6"
            >
              <Brain className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Powered by Advanced AI</span>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-light text-gray-900 dark:text-white mb-6 leading-tight">
              Intelligence That
              <span className="block font-bold text-gray-800 dark:text-gray-200">
                Saves Lives
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed font-light">
              Our neural network processes over{' '}
              <span className="font-semibold">
                <AnimatedCounter value={50} suffix="K" duration={2} />
              </span>{' '}
              data points per second, identifying patterns invisible to the human eye and predicting health risks with unprecedented accuracy.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              {[
                { label: "Data Points/sec", value: 50, suffix: "K+", icon: <BarChart3 className="w-4 h-4" /> },
                { label: "ML Models", value: 12, icon: <Cpu className="w-4 h-4" /> },
                { label: "Prediction Speed", value: 0.3, suffix: "s", icon: <Zap className="w-4 h-4" />, decimals: 1 },
                { label: "Accuracy Rate", value: 99.7, suffix: "%", icon: <Target className="w-4 h-4" />, decimals: 1 }
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-gray-600 dark:text-gray-400">{stat.icon}</div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    <AnimatedCounter 
                      value={stat.value} 
                      suffix={stat.suffix} 
                      duration={1.5 + i * 0.2}
                      decimals={stat.decimals || 0}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Explore AI Models
            </motion.button>
          </motion.div>

          {/* Elegant Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <ElegantVisualization />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Sleek Visualization Component
const ElegantVisualization: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % 6);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-80 h-80 mx-auto">
      {/* Central core */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gray-900 dark:bg-white rounded-2xl flex items-center justify-center shadow-lg"
      >
        <Brain className="w-8 h-8 text-white dark:text-gray-900" />
      </motion.div>

      {/* Elegant orbital elements */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * 60) * (Math.PI / 180);
        const radius = 120;
        const x = Math.cos(angle) * radius + 150;
        const y = Math.sin(angle) * radius + 150;

        return (
          <motion.div
            key={i}
            className={`absolute w-4 h-4 rounded-full transition-all duration-500 ${
              activeIndex === i 
                ? 'bg-gray-800 dark:bg-gray-200 scale-125' 
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
            style={{
              left: x - 8,
              top: y - 8,
            }}
            animate={{
              scale: activeIndex === i ? 1.25 : 1,
              opacity: activeIndex === i ? 1 : 0.6,
            }}
          />
        );
      })}

      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full">
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i * 60) * (Math.PI / 180);
          const radius = 120;
          const x = Math.cos(angle) * radius + 150;
          const y = Math.sin(angle) * radius + 150;

          return (
            <motion.line
              key={`line-${i}`}
              x1={150}
              y1={150}
              x2={x}
              y2={y}
              stroke={activeIndex === i ? "#374151" : "#d1d5db"}
              strokeWidth={activeIndex === i ? "2" : "1"}
              opacity={activeIndex === i ? 0.8 : 0.3}
              className="dark:stroke-gray-400 dark:opacity-60"
            />
          );
        })}
      </svg>
    </div>
  );
};

// Enhanced Technology Section with Animated Progress
const TechnologySection: React.FC = () => {
  const technologies = [
    { name: "Machine Learning", icon: <Brain className="w-6 h-6" />, progress: 95 },
    { name: "IoT Sensors", icon: <Activity className="w-6 h-6" />, progress: 92 },
    { name: "Edge Computing", icon: <Cpu className="w-6 h-6" />, progress: 88 },
    { name: "Cloud Infrastructure", icon: <Globe className="w-6 h-6" />, progress: 98 },
    { name: "Real-time Analytics", icon: <TrendingUp className="w-6 h-6" />, progress: 94 },
    { name: "Computer Vision", icon: <Eye className="w-6 h-6" />, progress: 90 },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6">
            Technology <span className="font-bold">Excellence</span>
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-light">
            Built with cutting-edge technologies to ensure reliability, accuracy, and scalability across all deployments.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group p-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-500"
            >
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 mb-6 group-hover:bg-gray-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-gray-900 transition-all duration-300">
                {tech.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {tech.name}
              </h3>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Integration</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  <AnimatedCounter value={tech.progress} suffix="%" duration={1.5} />
                </span>
              </div>
              
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: `${tech.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 + 0.5, duration: 1.5 }}
                  className="h-1 bg-gray-900 dark:bg-white rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;