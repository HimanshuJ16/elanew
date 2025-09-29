import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    "Unlocking Digital Marketing Excellence",
    "Crafting Strategies for Your Success",
    "Elevating Brands with Innovative Solutions",
    "Loading Your Path to Marketing Mastery"
  ];

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setIsLoading(false);
        if (onLoadingComplete) {
          onLoadingComplete();
        }
      }, 500); // Match CSS transition
    }, 3000);

    // Cycle messages every second
    const messageTimer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(messageTimer);
    };
  }, [onLoadingComplete, messages.length]);

  if (!isLoading) {
    return null;
  }

  return (
    <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="loading-content">
        <div className="logo-container">
          <div className="elation-logo">
            <img src="/images/full-logo.jpg" alt="Elation" className='w-100'/>
          </div>
          {/* <p className="loading-message animated-fade">{messages[messageIndex]}</p> */}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;