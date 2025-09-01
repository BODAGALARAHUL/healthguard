import React from 'react';
import { motion } from 'framer-motion';

const Awareness: React.FC = () => {
  return (
    <div className="pt-16">
      <section className="section-padding bg-gradient-to-br from-accent-600 to-accent-800 text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Health Awareness
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-red-100">
              Empowering communities with knowledge to prevent water-borne diseases 
              and promote better health practices.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Awareness;
