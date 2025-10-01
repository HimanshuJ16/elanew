// import React, {
//   useEffect,
//   useRef,
//   useState,
//   createContext,
//   useContext,
// } from "react";
// import { createPortal } from "react-dom";
// import { cn } from "../lib/utils";
// import { motion, AnimatePresence, useMotionValue, useVelocity, useSpring } from "motion/react";

// export const CarouselContext = createContext({
//   currentIndex: 0,
// });

// export const Carousel = ({
//   items,
//   initialScroll = 0,
//   speed = 3,
// }) => {
//   const carouselRef = React.useRef(null);
//   const containerRef = React.useRef(null);
//   const animationRef = React.useRef(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);
//   const translateXRef = useRef(0);
//   const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
//   const cardWidth = 300;
//   const gap = 16;
//   const totalItemWidth = cardWidth + gap;

//   // Motion values for smooth velocity-based dragging
//   const x = useMotionValue(0);
//   const xVelocity = useVelocity(x);
//   const smoothVelocity = useSpring(xVelocity, {
//     damping: 50,
//     stiffness: 400
//   });

//   // Create infinite items by duplicating the array multiple times
//   const infiniteItems = React.useMemo(() => {
//     const multiplier = Math.max(6, Math.ceil(3000 / (totalItemWidth * items.length)));
//     const repeatedItems = [];
//     for (let i = 0; i < multiplier; i++) {
//       repeatedItems.push(...items);
//     }
//     return repeatedItems;
//   }, [items, totalItemWidth]);

//   // Enhanced animation variants for the carousel container
//   const containerVariants = {
//     hidden: {
//       opacity: 0,
//       y: 50,
//     },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.8,
//         ease: [0.25, 0.1, 0.25, 1],
//         staggerChildren: 0.1,
//       }
//     }
//   };

//   // Enhanced animation variants for individual cards
//   const cardVariants = {
//     hidden: {
//       opacity: 0,
//       y: 40,
//       scale: 0.9,
//       rotateX: 15,
//     },
//     visible: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       rotateX: 0,
//       transition: {
//         duration: 0.6,
//         ease: [0.25, 0.1, 0.25, 1],
//       }
//     }
//   };

//   // Calculate drag constraints
//   useEffect(() => {
//     if (carouselRef.current && containerRef.current) {
//       const containerWidth = containerRef.current.scrollWidth;
//       const viewportWidth = carouselRef.current.offsetWidth;
//       const maxDrag = -(containerWidth - viewportWidth);
      
//       setDragConstraints({
//         left: maxDrag,
//         right: 0,
//       });
//     }
//   }, [infiniteItems]);

//   // Smooth continuous animation using requestAnimationFrame
//   const animate = () => {
//     if (!isPaused && !isDragging && containerRef.current) {
//       translateXRef.current -= speed * 0.5;
      
//       // Reset position for seamless infinite loop
//       const resetPoint = -(items.length * totalItemWidth);
//       if (translateXRef.current <= resetPoint) {
//         translateXRef.current = 0;
//       }
      
//       containerRef.current.style.transform = `translateX(${translateXRef.current}px)`;
      
//       // Update current index based on position
//       const newIndex = Math.floor(Math.abs(translateXRef.current) / totalItemWidth) % items.length;
//       setCurrentIndex(newIndex);
//     }
    
//     animationRef.current = requestAnimationFrame(animate);
//   };

//   // Start animation
//   useEffect(() => {
//     animationRef.current = requestAnimationFrame(animate);
    
//     return () => {
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//     };
//   }, [isPaused, isDragging, speed]);

//   // Initialize starting position
//   useEffect(() => {
//     if (containerRef.current && infiniteItems.length > 0) {
//       const startPosition = -(items.length * totalItemWidth) + initialScroll;
//       translateXRef.current = startPosition;
//       x.set(startPosition);
//       containerRef.current.style.transform = `translateX(${startPosition}px)`;
//     }
//   }, [initialScroll, items.length, infiniteItems.length, totalItemWidth]);

//   // Handle mouse enter/leave for pausing animation
//   const handleMouseEnter = () => {
//     setIsPaused(false);
//   };

//   const handleMouseLeave = () => {
//     setIsPaused(false);
//   };

//   // Handle drag start
//   const handleDragStart = () => {
//     setIsDragging(true);
//   };

//   // Handle drag end with momentum
//   const handleDragEnd = (event, info) => {
//     setIsDragging(false);
    
//     // Update the translateXRef based on final drag position
//     if (containerRef.current) {
//       const transform = containerRef.current.style.transform;
//       const match = transform.match(/translateX\(([-\d.]+)px\)/);
//       if (match) {
//         translateXRef.current = parseFloat(match[1]);
//         x.set(translateXRef.current);
//       }
//     }
//   };

//   // Handle drag movement
//   const handleDrag = (event, info) => {
//     // Update motion value for velocity tracking
//     x.set(translateXRef.current + info.offset.x);
    
//     // Update current index based on drag position
//     const currentTranslate = translateXRef.current + info.offset.x;
//     const newIndex = Math.floor(Math.abs(currentTranslate) / totalItemWidth) % items.length;
//     setCurrentIndex(newIndex);
//   };

//   const memoizedValue = React.useMemo(
//     () => ({
//       currentIndex: currentIndex,
//     }),
//     [currentIndex]
//   );

//   return (
//     <CarouselContext.Provider value={memoizedValue}>
//       <motion.div 
//         className="relative w-full overflow-hidden"
//         variants={containerVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ 
//           once: true,
//           amount: 0.2,
//           margin: "-50px"
//         }}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//       >
//         <div
//           className="flex w-full py-10 md:py-20"
//           ref={carouselRef}
//           style={{
//             overflow: 'hidden',
//             cursor: isDragging ? 'grabbing' : 'grab',
//           }}
//         >
//           <div
//             className={cn(
//               "absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l"
//             )}
//           ></div>

//           <motion.div
//             ref={containerRef}
//             className={cn(
//               "flex flex-row justify-start pl-4",
//               "max-w-none"
//             )}
//             variants={containerVariants}
//             drag="x"
//             dragConstraints={dragConstraints}
//             dragElastic={0.2}
//             dragMomentum={true}
//             dragTransition={{ 
//               power: 0.8,
//               timeConstant: 400,
//               bounceStiffness: 400,
//               bounceDamping: 20,
//               modifyTarget: (target) => {
//                 return target;
//               }
//             }}
//             onDragStart={handleDragStart}
//             onDragEnd={handleDragEnd}
//             onDrag={handleDrag}
//             style={{
//               gap: `${gap}px`,
//               willChange: 'transform',
//               x: isDragging ? x : translateXRef.current,
//             }}
//             whileTap={{ 
//               cursor: 'grabbing',
//               scale: 0.995,
//             }}
//           >
//             <AnimatePresence mode="wait">
//               {infiniteItems.map((item, index) => (
//                 <motion.div
//                   key={`infinite-card-${index}`}
//                   className="flex-shrink-0 rounded-3xl"
//                   variants={cardVariants}
//                   whileHover={{ 
//                     scale: 1.06,
//                     y: -12,
//                     rotateY: 5,
//                     transition: { 
//                       duration: 0.4, 
//                       ease: [0.25, 0.1, 0.25, 1],
//                       type: "spring",
//                       stiffness: 300,
//                       damping: 20
//                     }
//                   }}
//                   whileTap={{
//                     scale: 0.98,
//                     transition: { duration: 0.1 }
//                   }}
//                   style={{
//                     width: `${cardWidth}px`,
//                     pointerEvents: isDragging ? 'none' : 'auto',
//                   }}
//                 >
//                   {React.cloneElement(item, { 
//                     card: item.props.card,
//                     index: index,
//                     layout: item.props.layout 
//                   })}
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </motion.div>
//         </div>
//       </motion.div>
//     </CarouselContext.Provider>
//   );
// };

// export const Card = ({
//   card,
//   index,
//   layout = false,
// }) => {
//   const { currentIndex } = useContext(CarouselContext);
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleCardClick = (e) => {
//     // Prevent opening modal during drag
//     e.stopPropagation();
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <>
//       <motion.div
//         layoutId={layout ? `card-${card.title}` : undefined}
//         className="rounded-3xl bg-gray-100 dark:bg-neutral-900 h-80 w-56 md:h-[30rem] md:w-72 overflow-hidden flex flex-col items-start justify-start relative z-10 shadow-lg cursor-pointer"
//         onClick={handleCardClick}
//         whileHover={{ 
//           scale: 1.03,
//           rotateY: 8,
//           rotateX: 2,
//           transition: { 
//             duration: 0.4, 
//             ease: [0.25, 0.1, 0.25, 1],
//             type: "spring",
//             stiffness: 400,
//             damping: 25
//           }
//         }}
//         initial={{ rotateX: 20, opacity: 0.7, scale: 0.95 }}
//         whileInView={{ 
//           rotateX: 0, 
//           opacity: 1, 
//           scale: 1,
//           transition: {
//             duration: 0.8,
//             ease: [0.25, 0.1, 0.25, 1],
//             delay: (index % 10) * 0.1
//           }
//         }}
//         viewport={{ once: true, amount: 0.3 }}
//         style={{
//           transformStyle: "preserve-3d",
//           transformOrigin: "center center",
//         }}
//       >
//         <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/60 via-transparent to-transparent z-30 pointer-events-none" />
//         <div className="relative z-40 p-8">
//           <motion.p
//             layoutId={layout ? `category-${card.category}` : undefined}
//             className="text-white text-sm md:text-base font-medium font-sans text-left backdrop-blur-sm"
//             initial={{ opacity: 0, y: 25, filter: "blur(4px)" }}
//             whileInView={{ 
//               opacity: 1, 
//               y: 0, 
//               filter: "blur(0px)",
//               transition: { 
//                 delay: 0.3, 
//                 duration: 0.6,
//                 ease: [0.25, 0.1, 0.25, 1]
//               }
//             }}
//             viewport={{ once: true }}
//           >
//             {card.category}
//           </motion.p>
//           <motion.p
//             layoutId={layout ? `title-${card.title}` : undefined}
//             className="text-white text-xl md:text-3xl font-semibold max-w-xs text-left [text-wrap:balance] font-sans mt-2 backdrop-blur-sm"
//             initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
//             whileInView={{ 
//               opacity: 1, 
//               y: 0, 
//               filter: "blur(0px)",
//               transition: { 
//                 delay: 0.5, 
//                 duration: 0.6,
//                 ease: [0.25, 0.1, 0.25, 1]
//               }
//             }}
//             viewport={{ once: true }}
//           >
//             {card.title}
//           </motion.p>
//         </div>
//         <VideoBackground src={card.src} onLoad={() => setImageLoaded(true)} />
        
//         {!imageLoaded && (
//           <motion.div 
//             className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-neutral-800 dark:to-neutral-900"
//             initial={{ opacity: 1 }}
//             animate={{ opacity: imageLoaded ? 0 : 1 }}
//             transition={{ duration: 0.3 }}
//           />
//         )}
//       </motion.div>

//       {/* Video Modal using Portal */}
//       <AnimatePresence>
//         {isModalOpen && (
//           <VideoModal 
//             card={card} 
//             handleClose={handleCloseModal} 
//           />
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// // Backdrop Component
// const Backdrop = ({ children, onClick }) => {
//   return (
//     <motion.div
//       onClick={onClick}
//       className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.3 }}
//       style={{ 
//         zIndex: 9999,
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//       }}
//     >
//       {children}
//     </motion.div>
//   );
// };

// // Video Modal Component with Portal
// const VideoModal = ({ card, handleClose }) => {
//   const videoRef = useRef(null);

//   // Restart video from beginning when modal opens
//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.currentTime = 0;
//       videoRef.current.play();
//     }

//     // Prevent body scroll when modal is open
//     document.body.style.overflow = 'hidden';
    
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, []);

//   // Handle escape key to close modal
//   useEffect(() => {
//     const handleEscape = (e) => {
//       if (e.key === 'Escape') {
//         handleClose();
//       }
//     };

//     window.addEventListener('keydown', handleEscape);
//     return () => window.removeEventListener('keydown', handleEscape);
//   }, [handleClose]);

//   const modalVariants = {
//     hidden: {
//       y: "-100vh",
//       opacity: 0,
//       scale: 0.5,
//     },
//     visible: {
//       y: 0,
//       opacity: 1,
//       scale: 1,
//       transition: {
//         type: "spring",
//         damping: 25,
//         stiffness: 300,
//         duration: 0.5,
//       },
//     },
//     exit: {
//       y: "100vh",
//       opacity: 0,
//       scale: 0.5,
//       transition: {
//         duration: 0.3,
//         ease: "easeInOut",
//       },
//     },
//   };

//   const modalContent = (
//     <Backdrop onClick={handleClose}>
//       <motion.div
//         onClick={(e) => e.stopPropagation()}
//         className="relative w-full max-w-7xl mx-auto bg-black rounded-2xl overflow-hidden shadow-2xl"
//         variants={modalVariants}
//         initial="hidden"
//         animate="visible"
//         exit="exit"
//         style={{
//           maxHeight: '90vh',
//         }}
//       >
//         {/* Close Button */}
//         <motion.button
//           onClick={handleClose}
//           className="absolute top-4 right-4 z-50 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-colors"
//           whileHover={{ scale: 1.1, rotate: 90 }}
//           whileTap={{ scale: 0.9 }}
//           aria-label="Close modal"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6 text-white"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         </motion.button>

//         {/* Video Player */}
//         <div className="relative w-full bg-black" style={{ paddingBottom: '56.25%' }}>
//           <video
//             ref={videoRef}
//             className="absolute inset-0 w-full h-full object-contain"
//             controls
//             autoPlay
//             controlsList="nodownload"
//             src={card.src}
//           />
//         </div>

//         {/* Video Info */}
//         <motion.div
//           className="p-6 md:p-8 bg-gradient-to-t from-black via-black/95 to-transparent"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//         >
//           <p className="text-sm md:text-base text-gray-400 mb-2">{card.category}</p>
//           <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
//             {card.title}
//           </h2>
//           {card.description && (
//             <p className="text-gray-300 text-sm md:text-base leading-relaxed">
//               {card.description}
//             </p>
//           )}
//         </motion.div>
//       </motion.div>
//     </Backdrop>
//   );

//   // Render modal using Portal to document.body
//   return createPortal(
//     modalContent,
//     document.body
//   );
// };

// export const VideoBackground = ({
//   src,
//   className,
//   onLoad,
//   ...rest
// }) => {
//   const [isLoading, setLoading] = useState(true);

//   const handleLoadedData = () => {
//     setLoading(false);
//     onLoad?.();
//   };

//   return (
//     <motion.video
//       className={cn(
//         "object-cover absolute z-10 inset-0 h-full w-full transition-all duration-700",
//         isLoading ? "blur-md scale-110" : "blur-0 scale-100",
//         className
//       )}
//       autoPlay
//       loop
//       muted
//       playsInline
//       onLoadedData={handleLoadedData}
//       src={src}
//       initial={{ scale: 1.2, opacity: 0, filter: "blur(8px)" }}
//       animate={{ 
//         scale: isLoading ? 1.2 : 1, 
//         opacity: isLoading ? 0.7 : 1,
//         filter: isLoading ? "blur(8px)" : "blur(0px)"
//       }}
//       transition={{ 
//         duration: 0.8, 
//         ease: [0.25, 0.1, 0.25, 1],
//         opacity: { duration: 1.2 }
//       }}
//       viewport={{ once: true }}
//       {...rest}
//     />
//   );
// };

import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../lib/utils";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";

export const CarouselContext = createContext({
  currentIndex: 0,
});

export const Carousel = ({
  items,
  initialScroll = 0,
}) => {
  const targetRef = useRef(null);
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardWidth = 300;
  const gap = 16;

  // Scroll-linked animation with target ref
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Transform scroll progress to horizontal movement (percentage-based for responsiveness)
  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-30%"]);

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

  const memoizedValue = React.useMemo(
    () => ({
      currentIndex: currentIndex,
    }),
    [currentIndex]
  );

  return (
    <CarouselContext.Provider value={memoizedValue}>
      {/* Tall section to enable vertical scrolling - this creates the scroll area */}
      <section ref={targetRef} className="relative h-[300vh]">
        {/* Sticky container that stays in viewport */}
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
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
          >
            <div
              className="flex w-full py-10 md:py-20"
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
                style={{
                  gap: `${gap}px`,
                  x: x,
                }}
              >
                <AnimatePresence mode="wait">
                  {items.map((item, index) => (
                    <motion.div
                      key={`card-${index}`}
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
        </div>
      </section>
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

  const handleCardClick = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <motion.div
        layoutId={layout ? `card-${card.title}` : undefined}
        className="rounded-3xl bg-gray-100 dark:bg-neutral-900 h-80 w-56 md:h-[30rem] md:w-72 overflow-hidden flex flex-col items-start justify-start relative z-10 shadow-lg cursor-pointer"
        onClick={handleCardClick}
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

      {/* Video Modal using Portal */}
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

// Backdrop Component
const Backdrop = ({ children, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
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

// Video Modal Component with Portal
const VideoModal = ({ card, handleClose }) => {
  const videoRef = useRef(null);

  // Restart video from beginning when modal opens
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Handle escape key to close modal
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
      y: "-100vh",
      opacity: 0,
      scale: 0.5,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.5,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
      scale: 0.5,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
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
        {/* Close Button */}
        <motion.button
          onClick={handleClose}
          className="absolute top-4 right-4 z-50 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-colors"
          whileHover={{ scale: 1.1, rotate: 90 }}
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

        {/* Video Player */}
        <div className="relative w-full bg-black" style={{ paddingBottom: '56.25%' }}>
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-contain"
            controls
            autoPlay
            controlsList="nodownload"
            src={card.src}
          />
        </div>

        {/* Video Info */}
        <motion.div
          className="p-6 md:p-8 bg-gradient-to-t from-black via-black/95 to-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
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

  // Render modal using Portal to document.body
  return createPortal(
    modalContent,
    document.body
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
