import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface CounterAnimationProps {
  end: number;
  duration?: number;
  className?: string;
}

const CounterAnimation: React.FC<CounterAnimationProps> = ({ 
  end, 
  duration = 2, 
  className = "" 
}) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (inView && !hasAnimated.current) {
      hasAnimated.current = true;
      let startTime: number;
      let animationFrame: number;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }
  }, [inView, end, duration]);

  return (
    <span ref={ref} className={className}>
      {count.toLocaleString()}
    </span>
  );
};

export default CounterAnimation;
