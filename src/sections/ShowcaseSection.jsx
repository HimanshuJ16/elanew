import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(Draggable, ScrollTrigger);

// Icon components (keeping your existing icons)
const IndustryIcon = ({ type }) => {
  const icons = {
    alcobev: (
      <img 
        src="/images/8.png" 
        alt="img8" 
        className="w-10 h-10 invert"
      />
    ),
    restaurant: (
      <img 
        src="/images/4.png" 
        alt="img8" 
        className="w-7 h-7 lg:w-10 lg:h-10 invert"
      />
    ),
    d2c: (
      <img 
        src="/images/6.png" 
        alt="img8" 
        className="w-7 h-7 lg:w-10 lg:h-10 invert"
      />
    ),
    legacy: (
      <img 
        src="/images/5.png" 
        alt="img8" 
        className="w-7 h-7 lg:w-10 lg:h-10 invert"
      />
    ),
    authors: (
      <img 
        src="/images/7.png" 
        alt="img8" 
        className="w-7 h-7 lg:w-10 lg:h-10 invert"
      />
    ),
    doctors: (
      <img 
        src="/images/3.png" 
        alt="img8" 
        className="w-7 h-7 lg:w-10 lg:h-10 invert"
      />
    ),
  };
  return icons[type] || icons.d2c;
};

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const cardsRef = useRef([]);
  const scrollTweenRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useGSAP(() => {
    const carousel = carouselRef.current;
    const cards = cardsRef.current;
    const section = sectionRef.current;
    
    if (!carousel || cards.length === 0) return;

    const isMobile = window.innerWidth < 1024;

    // Calculate carousel boundaries
    const getMaxX = () => {
      const carouselWidth = carousel.scrollWidth;
      const containerWidth = carousel.parentElement.offsetWidth;
      return -(carouselWidth - containerWidth);
    };

    // ============ DESKTOP ONLY: Horizontal Scroll on Wheel ============
    if (!isMobile) {
      // Create ScrollTrigger for horizontal scroll
      scrollTweenRef.current = gsap.to(carousel, {
        x: getMaxX(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "center center",
          end: () => `+=${Math.abs(getMaxX()) * 2}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      // Individual card hover interactions (desktop only)
      cards.forEach((card) => {
        const icon = card.querySelector('.industry-icon');
        const badge = card.querySelector('.industry-badge');
        const contentSections = card.querySelectorAll('.content-section');
        const accentLine = card.querySelector('.accent-line');
        const glowEffect = card.querySelector('.glow-effect');

        const handleCardMouseEnter = () => {
          gsap.to(card, {
            y: -10,
            scale: 1.05,
            rotationY: 2,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto"
          });
          
          if (icon) {
            gsap.to(icon, {
              rotation: 360,
              scale: 1.2,
              duration: 0.6,
              ease: "back.out(2)",
              overwrite: "auto"
            });
          }

          if (badge) {
            gsap.to(badge, {
              scale: 1.1,
              duration: 0.3,
              ease: "power2.out",
              overwrite: "auto"
            });
          }

          if (contentSections.length) {
            gsap.to(contentSections, {
              x: 5,
              backgroundColor: "rgba(31, 41, 55, 0.9)",
              duration: 0.4,
              stagger: 0.1,
              ease: "power2.out",
              overwrite: "auto"
            });
          }

          if (accentLine) {
            gsap.to(accentLine, {
              scaleX: 1,
              duration: 0.5,
              ease: "power2.out",
              overwrite: "auto"
            });
          }

          if (glowEffect) {
            gsap.to(glowEffect, {
              opacity: 1,
              scale: 1.5,
              duration: 0.6,
              ease: "power2.out",
              overwrite: "auto"
            });
          }
        };
        
        const handleCardMouseLeave = () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto"
          });
          
          if (icon) {
            gsap.to(icon, {
              rotation: 0,
              scale: 1,
              duration: 0.5,
              ease: "power2.out",
              overwrite: "auto"
            });
          }

          if (badge) {
            gsap.to(badge, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
              overwrite: "auto"
            });
          }

          if (contentSections.length) {
            gsap.to(contentSections, {
              x: 0,
              backgroundColor: "rgba(31, 41, 55, 0.5)",
              duration: 0.4,
              stagger: 0.05,
              ease: "power2.out",
              overwrite: "auto"
            });
          }

          if (accentLine) {
            gsap.to(accentLine, {
              scaleX: 0,
              duration: 0.5,
              ease: "power2.out",
              overwrite: "auto"
            });
          }

          if (glowEffect) {
            gsap.to(glowEffect, {
              opacity: 0,
              scale: 1,
              duration: 0.6,
              ease: "power2.out",
              overwrite: "auto"
            });
          }
        };

        card.addEventListener('mouseenter', handleCardMouseEnter);
        card.addEventListener('mouseleave', handleCardMouseLeave);
      });
    } else {
      // ============ MOBILE: Center first card on load ============
      const centerCard = () => {
        if (cards.length === 0) return;
        const containerWidth = carousel.parentElement.offsetWidth;
        const cardWidth = cards[0].offsetWidth;
        const offset = (containerWidth - cardWidth) / 2;
        gsap.set(carousel, { x: offset });
      };
      
      centerCard();
    }

    // Update bounds on window resize
    const handleResize = () => {
      if (scrollTweenRef.current && scrollTweenRef.current.scrollTrigger) {
        scrollTweenRef.current.scrollTrigger.refresh();
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
      
      if (scrollTweenRef.current && scrollTweenRef.current.scrollTrigger) {
        scrollTweenRef.current.scrollTrigger.kill();
      }
    };
  }, { scope: sectionRef });

  // Mobile arrow navigation handlers with centering
  const handlePrevCard = () => {
    const carousel = carouselRef.current;
    const cards = cardsRef.current;
    
    if (!carousel || cards.length === 0 || currentIndex === 0) return;
    
    const containerWidth = carousel.parentElement.offsetWidth;
    const cardWidth = cards[0].offsetWidth + 16; // card width + gap
    const offset = (containerWidth - cards[0].offsetWidth) / 2; // Center offset
    const newIndex = currentIndex - 1;
    const targetX = offset - (newIndex * cardWidth);
    
    // Animate cards scale effect
    gsap.to(cards, {
      scale: 0.95,
      duration: 0.2,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(cards, {
          scale: 1,
          duration: 0.4,
          ease: "back.out(1.4)"
        });
      }
    });
    
    gsap.to(carousel, {
      x: targetX,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        setCurrentIndex(newIndex);
      }
    });
  };

  const handleNextCard = () => {
    const carousel = carouselRef.current;
    const cards = cardsRef.current;
    
    if (!carousel || cards.length === 0) return;
    
    // Calculate max index
    const containerWidth = carousel.parentElement.offsetWidth;
    const cardWidth = cards[0].offsetWidth + 16;
    const carouselWidth = carousel.scrollWidth;
    const offset = (containerWidth - cards[0].offsetWidth) / 2; // Center offset
    const maxScroll = carouselWidth - containerWidth + offset;
    const maxIndex = Math.floor(maxScroll / cardWidth);
    
    if (currentIndex >= industries.length - 1) return;
    
    const newIndex = currentIndex + 1;
    const targetX = offset - (newIndex * cardWidth);
    
    // Animate cards scale effect
    gsap.to(cards, {
      scale: 0.95,
      duration: 0.2,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(cards, {
          scale: 1,
          duration: 0.4,
          ease: "back.out(1.4)"
        });
      }
    });
    
    gsap.to(carousel, {
      x: targetX,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        setCurrentIndex(newIndex);
      }
    });
  };

  const industries = [
    { type: "d2c", title: "D2C Brands", tag: "Consultancy", color: "purple", challenge: "Connecting with Gen Z through content, distribution, and ad funnels.", solution: "End-to-end marketing strategy, sharp creatives, influencer/UGC integration, and performance campaigns." },
    { type: "alcobev", title: "Alcobev Brands", tag: "Project-Based", color: "orange", challenge: "Crowded markets where creating buzz and loyalty is difficult.", solution: "Creative campaigns, cultural activations, UGC integration, and performance marketing." },
    { type: "authors", title: "Authors & Thought Leaders", tag: "Retainer", color: "indigo", challenge: "Building recall and credibility beyond a book launch.", solution: "Brand positioning, brand engines, content buckets, high-converting video content, and full-funnel campaigns." },
    { type: "restaurant", title: "Restaurants", tag: "Sprint", color: "green", challenge: "Generating awareness and repeat customers in competitive spaces.", solution: "Campaign-led storytelling, localized activations, video/photo content, and targeted awareness ads." },    
    { type: "doctors", title: "Doctors", tag: "Retainer", color: "teal", challenge: "Turning medical expertise into trust and consistent patient acquisition.", solution: "Audience mapping, positioning frameworks, credibility-led content, ad funnels, and continuous optimization." },
    { type: "legacy", title: "Legacy Brands", tag: "Retainer", color: "red", challenge: "Shifting from distribution-led growth to relevance with younger audiences.", solution: "Refreshed communication strategy, recall-first campaigns, content distribution, and micro-campaigns." },
  ];

  const getColorClasses = (color) => {
    const colors = {
      orange: { 
        border: "lg:hover:border-orange-500/70", 
        shadow: "lg:hover:shadow-orange-500/30", 
        icon: "from-orange-500 via-orange-600 to-orange-700", 
        text: "lg:group-hover:text-orange-50", 
        accent: "text-orange-400",
        glow: "bg-orange-500/30",
        badgeBorder: "border-orange-500/30 lg:group-hover:border-orange-500/60",
        badgeBg: "lg:group-hover:bg-orange-500/20",
        leftBorder: "from-orange-500 via-orange-600 to-orange-700"
      },
      blue: { 
        border: "lg:hover:border-blue-500/70", 
        shadow: "lg:hover:shadow-blue-500/30", 
        icon: "from-blue-500 via-blue-600 to-blue-700", 
        text: "lg:group-hover:text-blue-50", 
        accent: "text-blue-400",
        glow: "bg-blue-500/30",
        badgeBorder: "border-blue-500/30 lg:group-hover:border-blue-500/60",
        badgeBg: "lg:group-hover:bg-blue-500/20",
        leftBorder: "from-blue-500 via-blue-600 to-blue-700"
      },
      green: { 
        border: "lg:hover:border-green-500/70", 
        shadow: "lg:hover:shadow-green-500/30", 
        icon: "from-green-500 via-green-600 to-green-700", 
        text: "lg:group-hover:text-green-50", 
        accent: "text-green-400",
        glow: "bg-green-500/30",
        badgeBorder: "border-green-500/30 lg:group-hover:border-green-500/60",
        badgeBg: "lg:group-hover:bg-green-500/20",
        leftBorder: "from-green-500 via-green-600 to-green-700"
      },
      purple: { 
        border: "lg:hover:border-purple-500/70", 
        shadow: "lg:hover:shadow-purple-500/30", 
        icon: "from-purple-500 via-purple-600 to-purple-700", 
        text: "lg:group-hover:text-purple-50", 
        accent: "text-purple-400",
        glow: "bg-purple-500/30",
        badgeBorder: "border-purple-500/30 lg:group-hover:border-purple-500/60",
        badgeBg: "lg:group-hover:bg-purple-500/20",
        leftBorder: "from-purple-500 via-purple-600 to-purple-700"
      },
      red: { 
        border: "lg:hover:border-red-500/70", 
        shadow: "lg:hover:shadow-red-500/30", 
        icon: "from-red-500 via-red-600 to-red-700", 
        text: "lg:group-hover:text-red-50", 
        accent: "text-red-400",
        glow: "bg-red-500/30",
        badgeBorder: "border-red-500/30 lg:group-hover:border-red-500/60",
        badgeBg: "lg:group-hover:bg-red-500/20",
        leftBorder: "from-red-500 via-red-600 to-red-700"
      },
      indigo: { 
        border: "lg:hover:border-indigo-500/70", 
        shadow: "lg:hover:shadow-indigo-500/30", 
        icon: "from-indigo-500 via-indigo-600 to-indigo-700", 
        text: "lg:group-hover:text-indigo-50", 
        accent: "text-indigo-400",
        glow: "bg-indigo-500/30",
        badgeBorder: "border-indigo-500/30 lg:group-hover:border-indigo-500/60",
        badgeBg: "lg:group-hover:bg-indigo-500/20",
        leftBorder: "from-indigo-500 via-indigo-600 to-indigo-700"
      },
      teal: { 
        border: "lg:hover:border-teal-500/70", 
        shadow: "lg:hover:shadow-teal-500/30", 
        icon: "from-teal-500 via-teal-600 to-teal-700", 
        text: "lg:group-hover:text-teal-50", 
        accent: "text-teal-400",
        glow: "bg-teal-500/30",
        badgeBorder: "border-teal-500/30 lg:group-hover:border-teal-500/60",
        badgeBg: "lg:group-hover:bg-teal-500/20",
        leftBorder: "from-teal-500 via-teal-600 to-teal-700"
      },
      yellow: { 
        border: "lg:hover:border-yellow-500/70", 
        shadow: "lg:hover:shadow-yellow-500/30", 
        icon: "from-yellow-500 via-yellow-600 to-yellow-700", 
        text: "lg:group-hover:text-yellow-50", 
        accent: "text-yellow-400",
        glow: "bg-yellow-500/30",
        badgeBorder: "border-yellow-500/30 lg:group-hover:border-yellow-500/60",
        badgeBg: "lg:group-hover:bg-yellow-500/20",
        leftBorder: "from-yellow-500 via-yellow-600 to-yellow-700"
      }
    };
    return colors[color] || colors.orange;
  };

  const IndustryCard = ({ industry, index }) => {
    const { type, title, tag, color, challenge, solution } = industry;
    const colorClasses = getColorClasses(color);
    
    return (
      <div 
        ref={(el) => (cardsRef.current[index] = el)}
        className={`industry-card group relative overflow-hidden bg-gradient-to-br from-gray-900/90 via-gray-800/60 to-gray-900/90 backdrop-blur-2xl border border-gray-700/50 rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-7 transition-all duration-500 ${colorClasses.border} ${colorClasses.shadow} lg:cursor-grab lg:active:cursor-grabbing flex-shrink-0 w-[280px] sm:w-[320px] md:w-[350px] lg:w-[400px]`}
        style={{ 
          transformStyle: "preserve-3d",
          perspective: "1000px"
        }}
      >
        <div className={`glow-effect absolute inset-0 ${colorClasses.glow} blur-3xl opacity-0 transition-all duration-500`}></div>
        
        <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
        
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className={`absolute inset-0 bg-gradient-to-r ${colorClasses.icon} opacity-20 blur-xl`}></div>
        </div>
        
        <div className="relative z-10 h-full flex flex-col" style={{ transform: "translateZ(20px)" }}>
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <div className={`industry-icon relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br ${colorClasses.icon} rounded-xl sm:rounded-2xl shadow-2xl transform transition-all duration-500 lg:group-hover:shadow-2xl`}>
              <div className="absolute inset-0 bg-white/20 rounded-xl sm:rounded-2xl opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300"></div>
              <IndustryIcon type={type} />
            </div>
            <span className={`industry-badge px-3 py-1 sm:px-4 sm:py-1.5 bg-gray-800/80 border ${colorClasses.badgeBorder} ${colorClasses.accent} text-[10px] sm:text-xs font-semibold rounded-full backdrop-blur-sm transition-all duration-300 ${colorClasses.badgeBg}`}>
              {tag}
            </span>
          </div>

          <h3 className={`text-lg sm:text-xl font-bold text-white mb-4 sm:mb-5 transition-all duration-500 ${colorClasses.text} leading-tight`}>
            {title}
          </h3>

          <div className="space-y-3 sm:space-y-4 flex-1">
            <div className="content-section relative p-3 sm:p-4 lg:p-5 bg-gray-800/50 rounded-xl sm:rounded-2xl border border-gray-700/40 transition-all duration-500 lg:group-hover:border-gray-600/60 overflow-hidden">
              <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${colorClasses.leftBorder} opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500`}></div>
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className={`w-1.5 h-1.5 mt-1.5 sm:mt-2 ${colorClasses.glow} rounded-full flex-shrink-0 animate-pulse`}></div>
                <div>
                  <span className={`block mb-1.5 sm:mb-2.5 font-bold text-[10px] sm:text-xs uppercase tracking-wider ${colorClasses.accent}`}>
                    Challenge
                  </span>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed lg:group-hover:text-gray-200 transition-colors duration-300">
                    {challenge}
                  </p>
                </div>
              </div>
            </div>

            <div className="content-section relative p-3 sm:p-4 lg:p-5 bg-gray-800/50 rounded-xl sm:rounded-2xl border border-gray-700/40 transition-all duration-500 lg:group-hover:border-gray-600/60 overflow-hidden">
              <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${colorClasses.leftBorder} opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500`}></div>
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className={`w-1.5 h-1.5 mt-1.5 sm:mt-2 ${colorClasses.glow} rounded-full flex-shrink-0 animate-pulse`}></div>
                <div>
                  <span className={`block mb-1.5 sm:mb-2.5 font-bold text-[10px] sm:text-xs uppercase tracking-wider ${colorClasses.accent}`}>
                    Solution
                  </span>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed lg:group-hover:text-gray-200 transition-colors duration-300">
                    {solution}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-1.5 sm:h-2 mt-4 sm:mt-6 overflow-hidden rounded-full bg-gray-800/50">
            <div className={`accent-line absolute inset-0 bg-gradient-to-r ${colorClasses.icon} rounded-full origin-left scale-x-0 transition-transform duration-700`}></div>
          </div>
        </div>
      </div>
    );
  };

  // Calculate if we're at the boundaries for button states
  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex >= industries.length - 1;

  return (
    <section 
      id="work" 
      ref={sectionRef} 
      className="app-showcase relative overflow-hidden bg-gradient-to-b from-black via-gray-950 to-black py-12 sm:py-16 md:py-20 lg:py-2"
    >
      {/* Static background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-purple-600/15 to-pink-600/15 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-blue-600/15 to-cyan-600/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
        
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] sm:bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title section */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-8">
          <h2 className="section-title text-4xl lg:text-5xl xl:text-7xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent leading-tight px-4">
            Industries We Serve
          </h2>
          <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-4 hidden md:block">
            Tailored solutions for diverse industries, driving growth through innovative marketing strategies.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="carousel-container relative overflow-hidden touch-pan-y">
          <div 
            ref={carouselRef}
            className="carousel-track flex gap-4 sm:gap-6 lg:gap-8 py-4"
          >
            {industries.map((industry, index) => (
              <IndustryCard 
                key={`${industry.type}-${index}`}
                industry={industry} 
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Mobile Arrow Buttons */}
        <div className="lg:hidden flex justify-center items-center gap-8 mt-8">
          <button
            onClick={handlePrevCard}
            disabled={isAtStart}
            className={`w-14 h-14 bg-gradient-to-br from-gray-800 to-gray-900 backdrop-blur-md border-2 ${
              isAtStart ? 'border-gray-700/30' : 'border-purple-500/50'
            } rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl ${
              isAtStart
                ? 'opacity-40 cursor-not-allowed' 
                : 'opacity-100 hover:scale-110 hover:shadow-purple-500/50 active:scale-95'
            }`}
            style={{ 
              boxShadow: isAtStart ? 'none' : '0 0 30px rgba(168, 85, 247, 0.4)' 
            }}
            aria-label="Previous card"
          >
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNextCard}
            disabled={isAtEnd}
            className={`w-14 h-14 bg-gradient-to-br from-gray-800 to-gray-900 backdrop-blur-md border-2 ${
              isAtEnd ? 'border-gray-700/30' : 'border-purple-500/50'
            } rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl ${
              isAtEnd
                ? 'opacity-40 cursor-not-allowed' 
                : 'opacity-100 hover:scale-110 hover:shadow-purple-500/50 active:scale-95'
            }`}
            style={{ 
              boxShadow: isAtEnd ? 'none' : '0 0 30px rgba(168, 85, 247, 0.4)' 
            }}
            aria-label="Next card"
          >
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Interaction hint */}
        <div className="text-center mt-6 sm:mt-8">
          <p className="text-gray-500 text-xs sm:text-sm flex items-center justify-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="lg:hidden">Use arrows to explore</span>
            <span className="hidden lg:inline">Scroll to explore</span>
            <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AppShowcase;