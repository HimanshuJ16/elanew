import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

function HeroLanding() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax effects (softened for smoother feel)
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const containerAnimation = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 1.2,
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const headingAnimation = {
    initial: { y: 60, opacity: 0, scale: 0.95 },
    animate: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const subtextAnimation = {
    initial: { y: 40, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const buttonAnimation = {
    initial: { y: 40, opacity: 0, scale: 0.9 },
    animate: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 120,
        damping: 12,
      },
    },
  };

  const words = ["Attention.", "Recall.", "Revenue."];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Reduced particles for better performance
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 4 + Math.random() * 2,
  }));

  return (
    <section ref={containerRef} className="relative h-[80vh] lg:h-screen flex items-center justify-center overflow-hidden">
      <motion.div className="absolute inset-0 -z-10" style={{ y: backgroundY }}>
        {/* Black background */}
        <div className="absolute inset-0 bg-black"></div>

        {/* Enhanced grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,165,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,165,0,0.1)_1px,transparent_1px)] bg-[size:60px_60px] opacity-30"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,215,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,215,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px] opacity-50"></div>

        {/* Animated gradient orbs with warm colors */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-orange-500/15 to-red-500/15 rounded-full filter blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.3, 0.15],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.25, 0.1],
            x: [0, 30, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />

        {/* Floating particles with warm glow */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-yellow-400/30 rounded-full shadow-[0_0_6px_rgba(255,215,0,0.6)]"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      <motion.div
        className="container relative z-10 px-6 mx-auto max-w-7xl"
        variants={containerAnimation}
        initial="initial"
        animate="animate"
        style={{ y: textY }}
      >
        <div className="flex flex-col items-center text-center space-y-12">
          {/* Enhanced Badge */}
          <motion.div variants={headingAnimation} className="group">
            <motion.div
              className="inline-flex items-center px-6 py-3 bg-white/5 backdrop-blur-md border border-orange-500/20 rounded-full text-sm font-medium text-white/90 shadow-2xl"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,165,0,0.1)",
                borderColor: "rgba(255,165,0,0.3)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.span
                className="w-2 h-2 bg-yellow-400 rounded-full mr-3 shadow-[0_0_8px_rgba(255,215,0,0.8)]"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span className="bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
                Transforming Digital Marketing
              </span>
              <motion.svg
                className="w-4 h-4 ml-2 text-orange-300/60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </motion.svg>
            </motion.div>
          </motion.div>

          <motion.div variants={headingAnimation} className="space-y-6 max-w-5xl">
            <h1 className="text-[4rem] md:text-[10rem] lg:text-[12rem] font-bold text-white leading-[0.9] tracking-tight">
              <span className="relative inline-block">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`${words[index]}-${index}`} // Unique key to ensure proper animation triggering
                    initial={{
                      y: 30,
                      opacity: 0,
                      rotateX: -45,
                      scale: 0.9,
                    }}
                    animate={{
                      y: 0,
                      opacity: 1,
                      rotateX: 0,
                      scale: 1,
                    }}
                    exit={{
                      y: -30,
                      opacity: 0,
                      rotateX: 45,
                      scale: 0.9,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      type: "spring",
                      stiffness: 150,
                      damping: 10,
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent font-black italic"
                    style={{ transformOrigin: "center" }}
                  >
                    {words[index]}
                  </motion.span>
                </AnimatePresence>
                <span className="invisible font-black italic">Attention.</span> {/* Fixed invisible span to longest word to prevent layout shift */}
              </span>
            </h1>
          </motion.div>

          <p className="text-sm md:text-md lg:text-lg text-white/70 max-w-2xl leading-relaxed font-light mt-5">
            At Elation, we listen to your audience, craft engaging content, and place it where it matters most.{" "}
            <span className="text-white/90 font-medium bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text">
              Ads drive sales while micro-campaigns and UGC build loyalty for lasting growth.
            </span>
          </p>

          {/* Enhanced CTA Section with warm gradient */}
          <motion.div variants={buttonAnimation} className="flex flex-col sm:flex-row items-center gap-6">
            <a
  href="#contact"
  aria-label="Book a call"
  className="group relative inline-flex h-12 lg:h-14 overflow-hidden rounded-2xl p-[1px] focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 hover:scale-105 active:scale-95"
>
  {/* Animated gradient border - yellowish/orangish */}
  <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#fbbf24_0%,#f59e0b_25%,#ea580c_50%,#fb923c_75%,#fbbf24_100%)]" />
  
  {/* Inner button with improved styling */}
  <span className="relative inline-flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-r from-gray-900 via-black to-gray-900 backdrop-blur-xl px-6 lg:px-8 py-3 text-base lg:text-lg font-semibold text-white transition-all duration-500 group-hover:from-gray-800 group-hover:via-gray-900 group-hover:to-gray-800 group-hover:shadow-2xl group-hover:shadow-orange-500/25">
    
    {/* Subtle inner glow effect - orange tinted */}
    <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-orange-200/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    {/* Button content */}
    <span className="relative flex items-center gap-3">
      <span className="font-medium tracking-wide">Talk with us</span>
      
      {/* Enhanced arrow icon */}
      <svg 
        className="w-5 h-5 lg:w-6 lg:h-6 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </span>
    
    {/* Pulse effect on hover - yellow/orange gradient */}
    <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-600/20 via-orange-600/20 to-amber-600/20 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-700" />
  </span>
</a>

          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default HeroLanding;
