"use client";

import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";

export const CarouselContext = createContext({
  currentIndex: 0,
});

export const Carousel = ({
  items,
  initialScroll = 0,
}) => {
  const carouselRef = React.useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardWidth = 300;
  const lastScrollTimeRef = useRef(0);
  const scrollCooldownRef = useRef(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Create infinite items by duplicating the array multiple times
  const infiniteItems = React.useMemo(() => {
    const multiplier = Math.max(3, Math.ceil(2000 / (cardWidth * items.length)));
    const repeatedItems = [];
    for (let i = 0; i < multiplier; i++) {
      repeatedItems.push(...items);
    }
    return repeatedItems;
  }, [items, cardWidth]);

  // Enhanced animation variants for the carousel container
  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        staggerChildren: 0.1,
      }
    }
  };

  // Enhanced animation variants for individual cards
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.9,
      rotateX: 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      }
    }
  };

  // Smooth throttle function
  const throttle = (func, delay) => {
    return (...args) => {
      if (!scrollCooldownRef.current) {
        func.apply(null, args);
        scrollCooldownRef.current = true;
        setTimeout(() => {
          scrollCooldownRef.current = false;
        }, delay);
      }
    };
  };

  // Enhanced navigation functions with smooth infinite scrolling
  const scrollToNext = () => {
    if (carouselRef.current && !isTransitioning) {
      setIsTransitioning(true);
      const nextIndex = currentIndex + 1;
      const nextScrollPosition = nextIndex * cardWidth;
      
      carouselRef.current.scrollTo({
        left: nextScrollPosition,
        behavior: "smooth",
      });
      
      setCurrentIndex(nextIndex);
      
      setTimeout(() => {
        setIsTransitioning(false);
        // Reset position if we've scrolled too far
        if (nextIndex >= infiniteItems.length - items.length) {
          const resetPosition = items.length * cardWidth;
          carouselRef.current.scrollTo({
            left: resetPosition,
            behavior: "auto",
          });
          setCurrentIndex(items.length);
        }
      }, 300);
    }
  };

  const scrollToPrevious = () => {
    if (carouselRef.current && !isTransitioning) {
      setIsTransitioning(true);
      const prevIndex = currentIndex - 1;
      const prevScrollPosition = prevIndex * cardWidth;
      
      // Handle infinite scroll backwards
      if (currentIndex <= 0) {
        const jumpPosition = (infiniteItems.length - items.length * 2) * cardWidth;
        carouselRef.current.scrollTo({
          left: jumpPosition,
          behavior: "auto",
        });
        setCurrentIndex(infiniteItems.length - items.length * 2);
        
        setTimeout(() => {
          const targetPosition = jumpPosition - cardWidth;
          carouselRef.current.scrollTo({
            left: targetPosition,
            behavior: "smooth",
          });
          setCurrentIndex(infiniteItems.length - items.length * 2 - 1);
          setIsTransitioning(false);
        }, 50);
      } else {
        carouselRef.current.scrollTo({
          left: prevScrollPosition,
          behavior: "smooth",
        });
        setCurrentIndex(prevIndex);
        setTimeout(() => setIsTransitioning(false), 300);
      }
    }
  };

  // Enhanced wheel event handler with momentum
  const handleWheel = throttle((event) => {
    event.preventDefault();
    
    const now = Date.now();
    const timeDiff = now - lastScrollTimeRef.current;
    
    if (timeDiff > 100 && !isTransitioning) {
      const intensity = Math.abs(event.deltaY);
      const threshold = 50;
      
      if (intensity > threshold) {
        if (event.deltaY > 0) {
          scrollToNext();
        } else if (event.deltaY < 0) {
          scrollToPrevious();
        }
        lastScrollTimeRef.current = now;
      }
    }
  }, 100);

  // Initialize with proper starting position for infinite scroll
  useEffect(() => {
    if (carouselRef.current && infiniteItems.length > 0) {
      const startPosition = items.length * cardWidth + initialScroll;
      carouselRef.current.scrollLeft = startPosition;
      setCurrentIndex(items.length);
    }
  }, [initialScroll, items.length, infiniteItems.length]);

  // Enhanced scroll handler with infinite loop detection
  const handleScroll = () => {
    if (carouselRef.current && !isTransitioning) {
      const { scrollLeft } = carouselRef.current;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(newIndex);
      
      // Auto-reset position for seamless infinite scrolling
      if (newIndex >= infiniteItems.length - items.length) {
        setTimeout(() => {
          const resetPosition = items.length * cardWidth;
          carouselRef.current.scrollTo({
            left: resetPosition,
            behavior: "auto",
          });
          setCurrentIndex(items.length);
        }, 100);
      } else if (newIndex < items.length) {
        setTimeout(() => {
          const resetPosition = (infiniteItems.length - items.length * 2) * cardWidth;
          carouselRef.current.scrollTo({
            left: resetPosition,
            behavior: "auto",
          });
          setCurrentIndex(infiniteItems.length - items.length * 2);
        }, 100);
      }
    }
  };

  const memoizedValue = React.useMemo(
    () => ({
      currentIndex: currentIndex % items.length,
    }),
    [currentIndex, items.length]
  );

  return (
    <CarouselContext.Provider value={memoizedValue}>
      <motion.div 
        className="relative w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ 
          once: true,
          amount: 0.2,
          margin: "-50px"
        }}
        onWheel={handleWheel}
        style={{ cursor: 'grab' }}
      >
        <div
          className={cn(
            "flex w-full overflow-x-scroll overscroll-x-auto py-10 md:py-20 scroll-smooth [scrollbar-width:none]"
          )}
          ref={carouselRef}
          onScroll={handleScroll}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitScrollbar: "none",
            scrollBehavior: "smooth",
          }}
        >
          <div
            className={cn(
              "absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l"
            )}
          ></div>

          <motion.div
            className={cn(
              "flex flex-row justify-start gap-4 pl-4",
              "max-w-none"
            )}
            variants={containerVariants}
          >
            <AnimatePresence mode="wait">
              {infiniteItems.map((item, index) => (
                <motion.div
                  key={`infinite-card-${index}`}
                  className="last:pr-[5%] md:last:pr-[33%] rounded-3xl"
                  variants={cardVariants}
                  whileHover={{ 
                    scale: 1.06,
                    y: -12,
                    rotateY: 5,
                    transition: { 
                      duration: 0.4, 
                      ease: [0.25, 0.1, 0.25, 1],
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }
                  }}
                  whileTap={{
                    scale: 0.98,
                    transition: { duration: 0.1 }
                  }}
                >
                  {/* Clone the item with updated props for infinite scroll */}
                  {React.cloneElement(item, { 
                    card: item.props.card,
                    index: index,
                    layout: item.props.layout 
                  })}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}) => {
  const { currentIndex } = useContext(CarouselContext);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      layoutId={layout ? `card-${card.title}` : undefined}
      className="rounded-3xl bg-gray-100 dark:bg-neutral-900 h-80 w-56 md:h-[30rem] md:w-72 overflow-hidden flex flex-col items-start justify-start relative z-10 shadow-lg"
      whileHover={{ 
        scale: 1.03,
        rotateY: 8,
        rotateX: 2,
        transition: { 
          duration: 0.4, 
          ease: [0.25, 0.1, 0.25, 1],
          type: "spring",
          stiffness: 400,
          damping: 25
        }
      }}
      initial={{ rotateX: 20, opacity: 0.7, scale: 0.95 }}
      whileInView={{ 
        rotateX: 0, 
        opacity: 1, 
        scale: 1,
        transition: {
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1],
          delay: (index % 10) * 0.1
        }
      }}
      viewport={{ once: true, amount: 0.3 }}
      style={{
        transformStyle: "preserve-3d",
        transformOrigin: "center center",
      }}
    >
      <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/60 via-transparent to-transparent z-30 pointer-events-none" />
      <div className="relative z-40 p-8">
        <motion.p
          layoutId={layout ? `category-${card.category}` : undefined}
          className="text-white text-sm md:text-base font-medium font-sans text-left backdrop-blur-sm"
          initial={{ opacity: 0, y: 25, filter: "blur(4px)" }}
          whileInView={{ 
            opacity: 1, 
            y: 0, 
            filter: "blur(0px)",
            transition: { 
              delay: 0.3, 
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1]
            }
          }}
          viewport={{ once: true }}
        >
          {card.category}
        </motion.p>
        <motion.p
          layoutId={layout ? `title-${card.title}` : undefined}
          className="text-white text-xl md:text-3xl font-semibold max-w-xs text-left [text-wrap:balance] font-sans mt-2 backdrop-blur-sm"
          initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
          whileInView={{ 
            opacity: 1, 
            y: 0, 
            filter: "blur(0px)",
            transition: { 
              delay: 0.5, 
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1]
            }
          }}
          viewport={{ once: true }}
        >
          {card.title}
        </motion.p>
      </div>
      <VideoBackground src={card.src} onLoad={() => setImageLoaded(true)} />
      
      {!imageLoaded && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-neutral-800 dark:to-neutral-900"
          initial={{ opacity: 1 }}
          animate={{ opacity: imageLoaded ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
};

export const VideoBackground = ({
  src,
  className,
  onLoad,
  ...rest
}) => {
  const [isLoading, setLoading] = useState(true);

  const handleLoadedData = () => {
    setLoading(false);
    onLoad?.();
  };

  return (
    <motion.video
      className={cn(
        "object-cover absolute z-10 inset-0 h-full w-full transition-all duration-700",
        isLoading ? "blur-md scale-110" : "blur-0 scale-100",
        className
      )}
      autoPlay
      loop
      muted
      playsInline
      onLoadedData={handleLoadedData}
      src={src}
      initial={{ scale: 1.2, opacity: 0, filter: "blur(8px)" }}
      animate={{ 
        scale: isLoading ? 1.2 : 1, 
        opacity: isLoading ? 0.7 : 1,
        filter: isLoading ? "blur(8px)" : "blur(0px)"
      }}
      transition={{ 
        duration: 0.8, 
        ease: [0.25, 0.1, 0.25, 1],
        opacity: { duration: 1.2 }
      }}
      viewport={{ once: true }}
      {...rest}
    />
  );
};
