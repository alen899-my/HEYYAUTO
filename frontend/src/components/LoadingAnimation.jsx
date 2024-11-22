import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../styles/LoadingAnimation.css";

const LoadingAnimation = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading (e.g., fetching data)
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 3000); // Adjust the duration as needed
    return () => clearTimeout(timer);
  }, []);

  if (isLoaded) {
    return null; // Once loading is complete, don't render the loader
  }

  return (
    <div className="loading-container">
      <motion.div
        className="loading-circle"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        Loading...
      </motion.h1>
    </div>
  );
};

export default LoadingAnimation;
