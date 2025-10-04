import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, Flip } from "gsap/all";

import { counterItems } from "../constants";

gsap.registerPlugin(ScrollTrigger, Flip);

const isImage = icon => typeof icon === "string" && icon.startsWith("/images/");

const AnimatedCounter = () => {
  const containerRef = useRef(null);
  const counterRefs = useRef([]);
  const overlayRefs = useRef([]);
  const iconRefs = useRef([]);

  useGSAP(() => {
    // Pre-set initial states
    counterRefs.current.forEach((counter) => {
      const numberElement = counter.querySelector(".counter-number");
      if (numberElement) {
        gsap.set(numberElement, { innerText: "0" });
      }
    });

    // Create individual counter animations with separate ScrollTriggers for better control
    counterRefs.current.forEach((counter, index) => {
      const numberElement = counter.querySelector(".counter-number");
      const overlay = overlayRefs.current[index];
      const icon = iconRefs.current[index];
      const item = counterItems[index];

      if (!numberElement || !overlay || !icon) return;

      // Create a timeline for this specific counter
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.out" }
      });

      tl.fromTo(icon, 
        { scale: 0, rotation: -180, opacity: 0 }, 
        { scale: 1, rotation: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
      )
      .fromTo(overlay, 
        { y: "100%", opacity: 0.8 }, 
        { y: 0, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.6"
      )
      .to(numberElement, {
        innerText: item.value,
        duration: 2.5,
        ease: "power2.out",
        snap: { innerText: 1 },
        onUpdate: () => {
          const value = Math.round(parseFloat(numberElement.innerText));
          numberElement.innerText = value.toLocaleString();
        },
        onComplete: () => {
          numberElement.innerText = `${item.value.toLocaleString()}${item.suffix}`;
          createSparkleEffect(numberElement);
        }
      }, "-=1.4"); // Overlap with overlay animation

      // Attach ScrollTrigger to the timeline with stagger
      ScrollTrigger.create({
        trigger: counter,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none reverse",
        animation: tl,
        onEnter: () => {
          tl.play();
        },
        onLeave: () => {
          tl.reverse();
        },
        onEnterBack: () => {
          tl.play();
        },
        onLeaveBack: () => {
          tl.reverse();
        }
      });
    });
  }, { scope: containerRef });

  // Create sparkle effect
  const createSparkleEffect = (target) => {
    const sparkles = 8;
    for (let i = 0; i < sparkles; i++) {
      const sparkle = document.createElement("div");
      sparkle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: radial-gradient(circle, #fbbf24, #f59e0b);
        border-radius: 50%;
        pointer-events: none;
        z-index: 20;
      `;
      
      const rect = target.getBoundingClientRect();
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      
      target.parentNode.appendChild(sparkle);
      sparkle.style.left = `${x}px`;
      sparkle.style.top = `${y}px`;

      gsap.fromTo(sparkle, 
        { scale: 0, opacity: 1, rotation: 0 }, 
        {
          scale: 2,
          opacity: 0,
          rotation: 180,
          duration: 0.6,
          delay: i * 0.05,
          ease: "power2.out",
          onComplete: () => sparkle.remove()
        }
      );
    }
  };

  const getIconForItem = (index) => {
    const icons = [
      "/images/impressions.png", // Projects
      "👥",  // Clients
      "/images/creatives.png",  // Campaigns
      "🌍"   // Growth
    ];
    return icons[index % icons.length];
  };

  // Enhanced counter items with icons
  const enhancedCounterItems = counterItems.map((item, index) => ({
    ...item,
    icon: getIconForItem(index)
  }));

  return (
    <section 
      ref={containerRef}
      id="counter" 
      className="relative overflow-hidden py-10 lg:py-16 bg-gradient-to-b from-gray-950 via-black/50 to-gray-900"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

      <div className="relative z-10 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-24">      
          <motion.h2 
            className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100/80 to-pink-100/80 mb-4 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            By The Numbers
          </motion.h2>
          
          <motion.p 
            className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Real results from real partnerships. Here's what we've achieved together.
          </motion.p>
        </div>

        {/* Simple Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {enhancedCounterItems.map((item, index) => (
            <motion.div
              key={index}
              ref={(el) => el && (counterRefs.current[index] = el)}
              className="group text-center relative"
              initial={{ 
                opacity: 0, 
                y: 50
              }}
              whileInView={{ 
                opacity: 1, 
                y: 0
              }}
              transition={{ 
                duration: 0.8,
                delay: index * 0.1,
                ease: "backOut"
              }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{
                y: -8,
                transition: { 
                  duration: 0.4,
                  y: { type: "spring", stiffness: 300, damping: 20 }
                }
              }}
            >
              {/* Gradient overlay for reveal effect */}
              <div 
                ref={(el) => el && (overlayRefs.current[index] = el)}
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
              ></div>

              {/* Icon */}
              <div ref={el => el && (iconRefs.current[index] = el)}
                className="relative z-10 mb-6 flex justify-center items-center" style={{ minHeight: "52px" }}>
                {isImage(item.icon) ? (
                  <img src={item.icon}
                    alt={item.label + " icon"}
                    className="w-16 h-16 mx-auto"
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                ) : (
                  <span className="text-5xl lg:text-6xl"
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {item.icon}
                  </span>
                )}
              </div>

              {/* Counter number */}
              <div className="mb-4 relative z-10">
                <div className="counter-number text-white text-4xl lg:text-6xl font-black mb-2
                  bg-gradient-to-r from-white via-purple-100/90 to-pink-100/90 bg-clip-text
                  group-hover:from-purple-400/90 group-hover:via-purple-500/90 group-hover:to-pink-400/90">
                  0
                </div>
              </div>

              {/* Label */}
              <motion.p 
                className="text-gray-300 text-base lg:text-lg font-medium
                  group-hover:text-white/90 transition-colors duration-300"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {item.label}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
        
        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default AnimatedCounter;