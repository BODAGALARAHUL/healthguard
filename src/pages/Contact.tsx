import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Shield,
  Users,
  Heart,
  Send,
  CheckCircle,
  AlertTriangle,
  Headphones,
  MessageSquare,
  Calendar,
  ExternalLink
} from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    subject: '',
    message: '',
    category: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        organization: '',
        subject: '',
        message: '',
        category: 'general'
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Headquarters",
      subtitle: "Main Operations Center",
      details: ["Parul University Campus", "Vadodara, Gujarat 391760", "Western India"],
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20",
      badge: "HQ",
      stats: "500+ Communities"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Emergency Hotline",
      subtitle: "24/7 Critical Response",
      details: ["+91-361-2582-999", "24/7 Health Emergency", "Toll-free for communities"],
      gradient: "from-emerald-500 to-teal-500",
      bgColor: "from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20",
      badge: "URGENT",
      stats: "< 30s Response"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Support",
      subtitle: "Expert Technical Assistance",
      details: ["support@healthguard.ai", "emergency@healthguard.ai", "partnerships@healthguard.ai"],
      gradient: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20",
      badge: "24/7",
      stats: "< 4h Response"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Web Platform",
      subtitle: "Real-time Dashboard Access",
      details: ["dashboard.healthguard.ai", "API access available", "Real-time monitoring"],
      gradient: "from-orange-500 to-red-500",
      bgColor: "from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20",
      badge: "LIVE",
      stats: "99.9% Uptime"
    }
  ];

  const supportCategories = [
    { 
      value: 'general', 
      label: 'General Inquiry', 
      icon: <MessageSquare className="w-4 h-4" />,
      gradient: "from-blue-500 to-cyan-500",
      description: "General questions and information"
    },
    { 
      value: 'emergency', 
      label: 'Health Emergency', 
      icon: <AlertTriangle className="w-4 h-4" />,
      gradient: "from-red-500 to-pink-500",
      description: "Urgent health-related incidents"
    },
    { 
      value: 'technical', 
      label: 'Technical Support', 
      icon: <Headphones className="w-4 h-4" />,
      gradient: "from-purple-500 to-violet-500",
      description: "System and technical assistance"
    },
    { 
      value: 'partnership', 
      label: 'Partnership', 
      icon: <Users className="w-4 h-4" />,
      gradient: "from-emerald-500 to-teal-500",
      description: "Collaboration opportunities"
    },
    { 
      value: 'demo', 
      label: 'Request Demo', 
      icon: <Calendar className="w-4 h-4" />,
      gradient: "from-orange-500 to-yellow-500",
      description: "Schedule a personalized demo"
    }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/50 dark:from-slate-900 dark:via-gray-900 dark:to-black pt-16">
      
      {/* Enhanced Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.1),transparent_50%)]" />
          
          {/* Floating geometric shapes */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, Math.sin(i) * 15, 0],
                rotate: [0, 180, 360],
                scale: [0.8, 1.1, 0.8],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 6 + (i * 0.5),
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            >
              <div className="w-4 h-4 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-lg backdrop-blur-sm border border-white/10" />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            {/* Enhanced Status Badge */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-flex items-center gap-3 px-6 py-3 mb-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-full shadow-lg"
            >
              <div className="relative">
                <Heart className="w-5 h-5 text-red-500" />
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-red-500/30 rounded-full blur-sm"
                />
              </div>
              <span className="text-sm font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                AVAILABLE 24/7 FOR HEALTH EMERGENCIES
              </span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
              <span className="block text-gray-900 dark:text-white mb-2">Get in</span>
              <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Connect with our team of health technology experts. Whether it's an emergency, technical support, or partnership inquiry - we're here to help save lives together.
            </p>
          </motion.div>
          
          {/* Enhanced Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
          >
            {[
              { icon: <Clock className="w-5 h-5" />, label: "24/7 Support", value: "Always Available", gradient: "from-blue-500 to-cyan-500" },
              { icon: <Users className="w-5 h-5" />, label: "Communities Served", value: "500+", gradient: "from-emerald-500 to-teal-500" },
              { icon: <Shield className="w-5 h-5" />, label: "Response Time", value: "< 8 min", gradient: "from-purple-500 to-pink-500" },
              { icon: <CheckCircle className="w-5 h-5" />, label: "Success Rate", value: "99.7%", gradient: "from-orange-500 to-red-500" }
            ].map((stat, i) => (
              <motion.div 
                key={stat.label} 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`flex items-center justify-center w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl mx-auto mb-3 shadow-lg`}>
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
                <div className={`text-2xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}>{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Contact Information */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Multiple Ways to 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Connect</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Choose the communication method that works best for your needs. Our team is ready to assist you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                onHoverStart={() => setHoveredCard(i)}
                onHoverEnd={() => setHoveredCard(null)}
                className="group relative"
              >
                {/* Main Card */}
                <div className={`relative h-full p-8 bg-gradient-to-br ${info.bgColor} backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-3xl overflow-hidden transition-all duration-500 ${hoveredCard === i ? 'shadow-2xl' : 'shadow-lg'}`}>
                  
                  {/* Animated Gradient Background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${info.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />
                  
                  {/* Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-2 py-1 text-xs font-bold rounded-full bg-gradient-to-r ${info.gradient} text-white shadow-lg`}>
                      {info.badge}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.8 }}
                      className={`w-16 h-16 bg-gradient-to-br ${info.gradient} rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300`}
                    >
                      {info.icon}
                    </motion.div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {info.title}
                    </h3>
                    
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4">
                      {info.subtitle}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          {detail}
                        </p>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className={`text-sm font-bold bg-gradient-to-r ${info.gradient} bg-clip-text text-transparent`}>
                      {info.stats}
                    </div>
                  </div>

                  {/* Glow Effect */}
                  <motion.div
                    className={`absolute -inset-0.5 bg-gradient-to-r ${info.gradient} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Form */}
      <section className="py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Send Us a Message
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Fill out the form below and we'll get back to you within 24 hours. For emergencies, please use the hotline above.
            </p>
          </motion.div>

          <div className="relative">
            {/* Success Animation */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl flex items-center justify-center"
                >
                  <div className="text-center">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                      transition={{ duration: 1 }}
                      className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Message Sent Successfully! wh

                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      We'll get back to you within 24 hours. Thank you for reaching out!
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-3xl p-8 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Enhanced Category Selection */}
                <div>
                  <label className="block text-lg font-bold text-gray-900 dark:text-white mb-6">
                    What can we help you with?
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {supportCategories.map((category) => (
                      <motion.button
                        key={category.value}
                        type="button"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFormData(prev => ({ ...prev, category: category.value }))}
                        className={`group relative p-6 rounded-2xl border-2 text-center transition-all duration-300 ${
                          formData.category === category.value
                            ? `bg-gradient-to-br ${category.gradient} text-white border-transparent shadow-lg`
                            : 'bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-3">
                          <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${
                            formData.category === category.value 
                              ? 'bg-white/20' 
                              : `bg-gradient-to-br ${category.gradient} text-white`
                          }`}>
                            {category.icon}
                          </div>
                          <span className="font-semibold text-sm">{category.label}</span>
                          <span className="text-xs opacity-75">{category.description}</span>
                        </div>
                        
                        {/* Glow effect for active state */}
                        {formData.category === category.value && (
                          <motion.div
                            className={`absolute -inset-0.5 bg-gradient-to-r ${category.gradient} rounded-2xl opacity-30 blur-lg -z-10`}
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Enhanced Form Fields */}
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { name: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'Enter your full name' },
                    { name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'Enter your email' }
                  ].map((field) => (
                    <motion.div
                      key={field.name}
                      whileHover={{ scale: 1.01 }}
                      className="relative"
                    >
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </label>
                      <motion.input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleChange}
                        onFocus={() => setFocusedField(field.name)}
                        onBlur={() => setFocusedField(null)}
                        required={field.required}
                        className={`w-full px-4 py-4 bg-white/80 dark:bg-gray-800/80 border-2 rounded-xl transition-all duration-300 ${
                          focusedField === field.name
                            ? 'border-blue-500 ring-4 ring-blue-500/20 transform scale-[1.02]'
                            : 'border-gray-300 dark:border-gray-600'
                        } focus:outline-none`}
                        placeholder={field.placeholder}
                      />
                    </motion.div>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { name: 'organization', label: 'Organization', type: 'text', required: false, placeholder: 'Your organization' },
                    { name: 'subject', label: 'Subject', type: 'text', required: true, placeholder: 'Brief subject' }
                  ].map((field) => (
                    <motion.div
                      key={field.name}
                      whileHover={{ scale: 1.01 }}
                      className="relative"
                    >
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </label>
                      <motion.input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleChange}
                        onFocus={() => setFocusedField(field.name)}
                        onBlur={() => setFocusedField(null)}
                        required={field.required}
                        className={`w-full px-4 py-4 bg-white/80 dark:bg-gray-800/80 border-2 rounded-xl transition-all duration-300 ${
                          focusedField === field.name
                            ? 'border-blue-500 ring-4 ring-blue-500/20 transform scale-[1.01]'
                            : 'border-gray-300 dark:border-gray-600'
                        } focus:outline-none`}
                        placeholder={field.placeholder}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Enhanced Message Field */}
                <motion.div whileHover={{ scale: 1.01 }} className="relative">
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={6}
                    className={`w-full px-4 py-4 bg-white/80 dark:bg-gray-800/80 border-2 rounded-xl transition-all duration-300 ${
                      focusedField === 'message'
                        ? 'border-blue-500 ring-4 ring-blue-500/20 transform scale-[1.01]'
                        : 'border-gray-300 dark:border-gray-600'
                    } focus:outline-none resize-none`}
                    placeholder="Please provide detailed information about your inquiry, including any specific requirements or questions you may have..."
                  />
                </motion.div>

                {/* Enhanced Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  whileHover={{ scale: 1.02, boxShadow: "0 20px 40px -10px rgba(59, 130, 246, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-5 px-8 rounded-2xl font-bold text-lg transition-all duration-300 relative overflow-hidden ${
                    isSubmitted
                      ? 'bg-green-500 text-white cursor-default'
                      : isSubmitting
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 text-white shadow-xl hover:shadow-2xl'
                  }`}
                >
                  {/* Button shimmer effect */}
                  {!isSubmitting && !isSubmitted && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: [-100, 400] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                  )}
                  
                  <span className="relative flex items-center justify-center gap-3">
                    {isSubmitted ? (
                      <>
                        <CheckCircle className="w-6 h-6" />
                        Message Sent Successfully!
                      </>
                    ) : isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-6 h-6" />
                        Send Message
                      </>
                    )}
                  </span>
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Emergency Contact */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-pink-500/10 to-orange-500/10 rounded-3xl blur-3xl" />
            
            <div className="relative p-12 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl border border-red-200/50 dark:border-red-800/50 text-center shadow-2xl">
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <AlertTriangle className="w-20 h-20 text-red-500 mx-auto mb-6" />
              </motion.div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Health Emergency?
              </h3>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                If you're experiencing a water-borne disease outbreak or health emergency, contact us immediately. Our AI-powered triage system will connect you with the right expert instantly.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.a
                  href="tel:+913612582999"
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(239, 68, 68, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-2xl shadow-xl transition-all duration-300 relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    animate={{ x: [-100, 300] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                  />
                  <span className="relative flex items-center gap-3">
                    <Phone className="w-6 h-6" />
                    Call Emergency Hotline
                  </span>
                </motion.a>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-2 border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 font-bold rounded-2xl hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span className="flex items-center gap-3">
                    <MessageSquare className="w-6 h-6" />
                    Live Chat Support
                  </span>
                </motion.button>
              </div>

              {/* Real-time status */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-600 dark:text-gray-400"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-green-500 rounded-full"
                />
                <span>Emergency response team online • Last updated by MARKASCHARAN • 2025-08-31 12:11:11 UTC</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;