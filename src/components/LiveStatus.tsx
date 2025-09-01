import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LiveStatusProps {
  className?: string;
}

const LiveStatus: React.FC<LiveStatusProps> = ({ className = "" }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(timer);
  }, []);

  const formatTimestamp = (date: Date) => {
    return date.toISOString().slice(0, 19).replace('T', ' ') + ' UTC';
  };

  return (
    <motion.div
      animate={{ scale: [1, 1.02, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
      className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg sm:rounded-xl ${className}`}
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
          Updated by MARKASCHARAN • {formatTimestamp(currentTime)}
        </p>
      </div>
    </motion.div>
  );
};

export default LiveStatus;