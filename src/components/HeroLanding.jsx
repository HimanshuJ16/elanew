import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

function HeroLanding({ isLoadingComplete = true }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax effects
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

  const words = ["Revenue.", "Attention.", "Recall."];
  const [index, setIndex] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Start word animation only after loading is complete
  useEffect(() => {
    if (isLoadingComplete) {
      // Small delay to ensure smooth transition from loader
      const startDelay = setTimeout(() => {
        setShouldAnimate(true);
      }, 300);
      return () => clearTimeout(startDelay);
    }
  }, [isLoadingComplete]);

  useEffect(() => {
    if (!shouldAnimate) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500); // Increased from 2000ms for better readability

    return () => clearInterval(interval);
  }, [shouldAnimate]);

  return (
    <section ref={containerRef} className="relative lg:mt-[4rem] h-[100vh] flex items-center justify-center overflow-hidden">
      <motion.div
        className="container relative z-10 px-6 mx-auto max-w-7xl"
        variants={containerAnimation}
        initial="initial"
        animate={isLoadingComplete ? "animate" : "initial"}
        style={{ y: textY }}
      >
        <div className="flex flex-col items-center text-center space-y-12">
          {/* Enhanced Badge */}
          {/* <motion.div variants={headingAnimation} className="group">
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
                We turn interest into income
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
          </motion.div> */}

          {/* Enhanced Word Animation */}
          <motion.div variants={headingAnimation} className="space-y-6 max-w-5xl">
            <h1 className="text-[4rem] md:text-[10rem] lg:text-[12rem] font-bold text-white leading-[0.9] tracking-tight">
              <span className="relative inline-block" style={{ perspective: "1000px" }}>
                <AnimatePresence mode="wait">
                  {shouldAnimate && (
                    <motion.span
                      key={`${words[index]}-${index}`}
                      initial={{
                        y: 80,
                        opacity: 0,
                        rotateX: 90,
                        scale: 0.8,
                        filter: "blur(10px)",
                      }}
                      animate={{
                        y: 0,
                        opacity: 1,
                        rotateX: 0,
                        scale: 1,
                        filter: "blur(0px)",
                      }}
                      exit={{
                        y: -80,
                        opacity: 0,
                        rotateX: -90,
                        scale: 0.8,
                        filter: "blur(10px)",
                      }}
                      transition={{
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1], // Custom ease for smoother motion
                        opacity: { duration: 0.4 },
                        filter: { duration: 0.3 },
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent font-black italic"
                      style={{ 
                        transformOrigin: "center",
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {words[index]}
                    </motion.span>
                  )}
                </AnimatePresence>
                <span className="invisible font-black italic">Attention.</span>
              </span>
            </h1>
          </motion.div>

          <p className="text-sm md:text-md lg:text-[1rem] text-white/70 max-w-2xl leading-relaxed font-light mt-5 hidden lg:block">
            We drive results across the funnel, capturing attention, boosting recall, and converting revenue.{" "}
            <span className="text-white/90 font-medium bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text">
              We blend high-impact ads with authentic UGC and micro-campaigns to deliver strong ROAS, loyalty, and long-term growth.
            </span>
          </p>

          <p className="text-sm md:text-md lg:text-[1rem] text-white/70 max-w-2xl leading-relaxed font-light mt-5 lg:hidden">
            We drive results—capturing attention, boosting recall, and converting revenue.{" "}
            <span className="text-white/90 font-medium bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text">
              Blending powerful ads with real UGC for results that last.
            </span>
          </p>


          {/* Enhanced CTA Section */}
          <motion.div variants={buttonAnimation} className="flex flex-col sm:flex-row items-center gap-6">
            <a
              href="https://wa.me/+919097290982"
              aria-label="Book a call"
              className="group relative inline-flex h-12 lg:h-14 overflow-hidden rounded-2xl p-[1px] focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#fbbf24_0%,#f59e0b_25%,#ea580c_50%,#fb923c_75%,#fbbf24_100%)]" />

              <span className="relative inline-flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-r from-gray-900 via-black to-gray-900 backdrop-blur-xl px-6 lg:px-8 py-3 text-base lg:text-lg font-semibold text-white transition-all duration-500 group-hover:from-gray-800 group-hover:via-gray-900 group-hover:to-gray-800 group-hover:shadow-2xl group-hover:shadow-orange-500/25">
                <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-orange-200/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <span className="relative flex items-center gap-3">
                  <span className="font-medium tracking-wide">Talk with us</span>

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
