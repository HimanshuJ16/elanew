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
  speed = 2, // Speed multiplier for animation (1 = normal, 2 = double speed, 0.5 = half speed)
}) => {
  const carouselRef = React.useRef(null);
  const containerRef = React.useRef(null);
  const animationRef = React.useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const translateXRef = useRef(0);
  const cardWidth = 300;
  const gap = 16;
  const totalItemWidth = cardWidth + gap;

  // Create infinite items by duplicating the array multiple times
  const infiniteItems = React.useMemo(() => {
    const multiplier = Math.max(6, Math.ceil(3000 / (totalItemWidth * items.length)));
    const repeatedItems = [];
    for (let i = 0; i < multiplier; i++) {
      repeatedItems.push(...items);
    }
    return repeatedItems;
  }, [items, totalItemWidth]);

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

  // Smooth continuous animation using requestAnimationFrame
  const animate = () => {
    if (!isPaused && containerRef.current) {
      translateXRef.current -= speed * 0.5; // Adjust speed here
      
      // Reset position for seamless infinite loop
      const resetPoint = -(items.length * totalItemWidth);
      if (translateXRef.current <= resetPoint) {
        translateXRef.current = 0;
      }
      
      containerRef.current.style.transform = `translateX(${translateXRef.current}px)`;
      
      // Update current index based on position
      const newIndex = Math.floor(Math.abs(translateXRef.current) / totalItemWidth) % items.length;
      setCurrentIndex(newIndex);
    }
    
    animationRef.current = requestAnimationFrame(animate);
  };

  // Start animation
  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused, speed]);

  // Initialize starting position
  useEffect(() => {
    if (containerRef.current && infiniteItems.length > 0) {
      // Start from the middle of the infinite array for seamless looping
      const startPosition = -(items.length * totalItemWidth) + initialScroll;
      translateXRef.current = startPosition;
      containerRef.current.style.transform = `translateX(${startPosition}px)`;
    }
  }, [initialScroll, items.length, infiniteItems.length, totalItemWidth]);

  // Handle mouse enter/leave for pausing animation
  const handleMouseEnter = () => {
    setIsPaused(false);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const memoizedValue = React.useMemo(
    () => ({
      currentIndex: currentIndex,
    }),
    [currentIndex]
  );

  return (
    <CarouselContext.Provider value={memoizedValue}>
      <motion.div 
        className="relative w-full overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ 
          once: true,
          amount: 0.2,
          margin: "-50px"
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: 'grab' }}
      >
        <div
          className="flex w-full py-10 md:py-20"
          ref={carouselRef}
          style={{
            overflow: 'hidden',
          }}
        >
          <div
            className={cn(
              "absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l"
            )}
          ></div>

          <motion.div
            ref={containerRef}
            className={cn(
              "flex flex-row justify-start pl-4",
              "max-w-none"
            )}
            variants={containerVariants}
            style={{
              gap: `${gap}px`,
              willChange: 'transform',
            }}
          >
            <AnimatePresence mode="wait">
              {infiniteItems.map((item, index) => (
                <motion.div
                  key={`infinite-card-${index}`}
                  className="flex-shrink-0 rounded-3xl"
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
                  style={{
                    width: `${cardWidth}px`,
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
