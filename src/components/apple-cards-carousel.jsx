import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";

export const CarouselContext = createContext({
  currentIndex: 0,
});

export const Carousel = ({
  items,
  initialScroll = 0,
  speed = 3,
}) => {
  const carouselRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const translateXRef = useRef(0);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
  const cardWidth = 300;
  const gap = 16;
  const totalItemWidth = cardWidth + gap;

  // Reduce multiplier for fewer DOM elements
  const infiniteItems = useMemo(() => {
    const multiplier = Math.max(3, Math.ceil(2000 / (totalItemWidth * items.length)));
    const repeatedItems = [];
    for (let i = 0; i < multiplier; i++) {
      repeatedItems.push(...items);
    }
    return repeatedItems;
  }, [items, totalItemWidth]);

  // Simplified animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.05,
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      }
    }
  };

  // Calculate drag constraints
  useEffect(() => {
    if (carouselRef.current && containerRef.current) {
      const containerWidth = containerRef.current.scrollWidth;
      const viewportWidth = carouselRef.current.offsetWidth;
      const maxDrag = -(containerWidth - viewportWidth);
      
      setDragConstraints({
        left: maxDrag,
        right: 0,
      });
    }
  }, [infiniteItems]);

  // Optimized animation loop
  const animate = useCallback(() => {
    if (!isPaused && !isDragging && containerRef.current) {
      translateXRef.current -= speed * 0.5;
      
      const resetPoint = -(items.length * totalItemWidth);
      if (translateXRef.current <= resetPoint) {
        translateXRef.current = 0;
      }
      
      containerRef.current.style.transform = `translate3d(${translateXRef.current}px, 0, 0)`;
      
      const newIndex = Math.floor(Math.abs(translateXRef.current) / totalItemWidth) % items.length;
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    }
    
    animationRef.current = requestAnimationFrame(animate);
  }, [isPaused, isDragging, speed, items.length, totalItemWidth, currentIndex]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  useEffect(() => {
    if (containerRef.current && infiniteItems.length > 0) {
      const startPosition = -(items.length * totalItemWidth) + initialScroll;
      translateXRef.current = startPosition;
      containerRef.current.style.transform = `translate3d(${startPosition}px, 0, 0)`;
    }
  }, [initialScroll, items.length, infiniteItems.length, totalItemWidth]);

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleDragEnd = useCallback((event, info) => {
    setIsDragging(false);
    
    if (containerRef.current) {
      const transform = containerRef.current.style.transform;
      const match = transform.match(/translate3d\(([-\d.]+)px/);
      if (match) {
        translateXRef.current = parseFloat(match[1]);
      }
    }
  }, []);

  const memoizedValue = useMemo(
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
        }}
      >
        <div
          className="flex w-full py-10 md:py-20"
          ref={carouselRef}
          style={{
            overflow: 'hidden',
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
        >
          <motion.div
            ref={containerRef}
            className={cn(
              "flex flex-row justify-start pl-4",
              "max-w-none"
            )}
            drag="x"
            dragConstraints={dragConstraints}
            dragElastic={0.1}
            dragMomentum={true}
            dragTransition={{ 
              power: 0.5,
              timeConstant: 300,
            }}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            style={{
              gap: `${gap}px`,
              willChange: isDragging ? 'transform' : 'auto',
            }}
          >
            {infiniteItems.map((item, index) => (
              <motion.div
                key={`infinite-card-${index}`}
                className="flex-shrink-0 rounded-3xl"
                variants={cardVariants}
                style={{
                  width: `${cardWidth}px`,
                  pointerEvents: isDragging ? 'none' : 'auto',
                }}
              >
                {React.cloneElement(item, { 
                  card: item.props.card,
                  index: index,
                  layout: false
                })}
              </motion.div>
            ))}
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  // Intersection Observer for lazy loading videos
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      {
        threshold: 0.1,
        rootMargin: '200px',
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const handleCardClick = useCallback((e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <motion.div
        ref={cardRef}
        className="rounded-3xl bg-gray-100 dark:bg-neutral-900 h-80 w-56 md:h-[30rem] md:w-72 overflow-hidden flex flex-col items-start justify-start relative z-10 shadow-lg cursor-pointer"
        onClick={handleCardClick}
        whileHover={{ 
          scale: 1.03,
          transition: { 
            duration: 0.3, 
          }
        }}
        initial={{ opacity: 0.7 }}
        whileInView={{ 
          opacity: 1,
          transition: {
            duration: 0.5,
            delay: (index % 10) * 0.05
          }
        }}
        viewport={{ once: true, amount: 0.3 }}
        style={{
          willChange: 'auto',
        }}
      >
        <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/60 via-transparent to-transparent z-30 pointer-events-none" />
        <div className="relative z-40 p-8">
          <motion.p
            className="text-white text-sm md:text-base font-medium font-sans text-left backdrop-blur-sm"
            initial={{ opacity: 0 }}
            whileInView={{ 
              opacity: 1,
              transition: { 
                delay: 0.2, 
                duration: 0.4,
              }
            }}
            viewport={{ once: true }}
          >
            {card.category}
          </motion.p>
          <motion.p
            className="text-white text-xl md:text-3xl font-semibold max-w-xs text-left [text-wrap:balance] font-sans mt-2 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            whileInView={{ 
              opacity: 1,
              transition: { 
                delay: 0.3, 
                duration: 0.4,
              }
            }}
            viewport={{ once: true }}
          >
            {card.title}
          </motion.p>
        </div>
        {isInView && (
          <VideoBackground 
            src={card.src} 
            onLoad={() => setImageLoaded(true)} 
          />
        )}
        
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-neutral-800 dark:to-neutral-900" />
        )}
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <VideoModal 
            card={card} 
            handleClose={handleCloseModal} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

const Backdrop = ({ children, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{ 
        zIndex: 9999,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      {children}
    </motion.div>
  );
};

const VideoModal = ({ card, handleClose }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }

    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [handleClose]);

  const modalVariants = {
    hidden: {
      scale: 0.9,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      scale: 0.9,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  const modalContent = (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-7xl mx-auto bg-black rounded-2xl overflow-hidden shadow-2xl"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        style={{
          maxHeight: '90vh',
        }}
      >
        <motion.button
          onClick={handleClose}
          className="absolute top-4 right-4 z-50 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </motion.button>

        <div className="relative w-full bg-black" style={{ paddingBottom: '56.25%' }}>
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-contain"
            controls
            autoPlay
            controlsList="nodownload"
            preload="metadata"
            src={card.src}
          />
        </div>

        <motion.div
          className="p-6 md:p-8 bg-gradient-to-t from-black via-black/95 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-sm md:text-base text-gray-400 mb-2">{card.category}</p>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
            {card.title}
          </h2>
          {card.description && (
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              {card.description}
            </p>
          )}
        </motion.div>
      </motion.div>
    </Backdrop>
  );

  return createPortal(modalContent, document.body);
};

export const VideoBackground = ({
  src,
  className,
  onLoad,
  ...rest
}) => {
  const [isLoading, setLoading] = useState(true);
  const videoRef = useRef(null);

  const handleLoadedData = () => {
    setLoading(false);
    onLoad?.();
  };

  return (
    <motion.video
      ref={videoRef}
      className={cn(
        "object-cover absolute z-10 inset-0 h-full w-full transition-opacity duration-500",
        isLoading ? "opacity-0" : "opacity-100",
        className
      )}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      onLoadedData={handleLoadedData}
      src={src}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: isLoading ? 0 : 1,
      }}
      transition={{ 
        duration: 0.5,
      }}
      style={{
        willChange: 'auto',
      }}
      {...rest}
    />
  );
};
