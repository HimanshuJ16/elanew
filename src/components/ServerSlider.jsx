import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Memoized Icon Components
const ChartIcon = React.memo(({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 3v18h18v-2H5V3H3zm4 14h2V9H7v8zm4-4h2V7h-2v6zm4-3h2V5h-2v5z"/>
  </svg>
));

const CreativeIcon = React.memo(({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
));

const DistributionIcon = React.memo(({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2L2 12h3v8h14v-8h3L12 2zm0 2.84L18.16 11H16v7H8v-7H5.84L12 4.84z"/>
  </svg>
));

const PerformanceIcon = React.memo(({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>
));

const InsightsIcon = React.memo(({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 11H7v6h2v-6zm4-4h-2v10h2V7zm4-3h-2v13h2V4zm2 18H5V4H3v16c0 1.1.9 2 2 2h14v-2z"/>
  </svg>
));

// Individual Service Card Component
const ServiceCard = React.memo(({ service, onClick }) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const IconComponent = service.icon;

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
  };

  return (
    <motion.div
      ref={cardRef}
      className="service-grid-card group relative"
      variants={cardVariants}
      whileHover={{ 
        scale: 1.03,
        y: -10,
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
    >
      <div className="relative overflow-hidden bg-gradient-to-br from-white/[0.09] to-white/[0.06] backdrop-blur-xl border border-white/[0.15] rounded-3xl p-5 lg:p-6 h-full cursor-pointer transition-all duration-500 hover:border-white/30 shadow-lg hover:shadow-2xl">
        
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-3xl pointer-events-none`}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.1 }}
          transition={{ duration: 0.4 }}
        />
        
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(${service.glowColor}, 0.12), transparent 40%)`,
          }}
        />

        <motion.div
          className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${service.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`}
        />
        
        <div className="relative z-10">
          <div className="flex items-start mb-5">
            <motion.div 
              className={`relative w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0 overflow-hidden`}
              whileHover={{ 
                scale: 1.1,
                rotate: [0, -8, 8, 0],
                transition: { duration: 0.5 }
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} blur-md opacity-50`} />
              <IconComponent className="relative w-6 h-6 lg:w-7 lg:h-7 text-white drop-shadow-lg" />
            </motion.div>
            
            <div className="ml-3 flex-1 min-w-0">
              <h3 className="text-base lg:text-lg font-bold text-white mb-1 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-200 transition-all duration-300">
                {service.title}
              </h3>
              <p className="text-gray-400 text-xs lg:text-sm font-medium group-hover:text-gray-300 transition-colors">
                {service.subtitle}
              </p>
            </div>
          </div>
          
          <div className="space-y-2.5">
            {service.items.slice(0, 3).map((item, idx) => (
              <motion.div 
                key={idx} 
                className="flex items-start text-xs lg:text-sm text-gray-300 bg-white/[0.03] rounded-lg p-2 border border-white/[0.05] group-hover:border-white/10 transition-all duration-300"
                initial={{ opacity: 0.9 }}
                whileHover={{ 
                  opacity: 1, 
                  x: 6,
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  transition: { duration: 0.2 }
                }}
              >
                <motion.span 
                  className="text-lg mr-2.5 flex-shrink-0 mt-0.5"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {item.icon}
                </motion.span>
                <span className="leading-relaxed mt-[5px]">{item.title}</span>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="mt-5 pt-4 border-t border-white/10 group-hover:border-white/20 transition-colors"
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1 }}
          >
            <span className="text-xs lg:text-sm text-gray-400 group-hover:text-gray-200 transition-colors inline-flex items-center gap-2 font-medium">
              Learn More
              <motion.span
                animate={{ 
                  x: [0, 5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="inline-block"
              >
                →
              </motion.span>
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
});

ServiceCard.displayName = 'ServiceCard';

const ServiceShowcase = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const services = useMemo(() => [
    {
      id: 1,
      title: "Marketing Strategy",
      subtitle: "Strategic Planning & Analysis",
      icon: ChartIcon,
      gradient: "from-blue-500 via-blue-600 to-indigo-700",
      glowColor: "59, 130, 246",
      items: [
        { title: "Audience Mapping & Market Research", desc: "Conduct competitor scans, surveys, focus groups, and social listening to map behavior, motivations, and preferences.", icon: "👥" },
        { title: "Brand Positioning & Strategy", desc: "Define unique brand proposition, messaging frameworks, tone of voice, and identity for consistent resonance.", icon: "🎯" },
        { title: "MicroCampaign Development", desc: "Design high-impact, short-term campaigns with clear objectives, hooks, and CTAs to drive measurable results.", icon: "💡" },
        { title: "Channel & Touchpoint Strategy", desc: "Identify and prioritize key digital/offline channels, mapping journeys for maximum engagement.", icon: "📡" },
        { title: "KPI Setting & Success Metrics", desc: "Establish performance indicators including engagement, conversions, ROI, and growth metrics.", icon: "📊" },
      ],
    },
    {
      id: 2,
      title: "Content Creation",
      subtitle: "Creative Production & Design",
      icon: CreativeIcon,
      gradient: "from-emerald-500 via-green-500 to-teal-600",
      glowColor: "16, 185, 129",
      items: [
        { title: "Content Writing & Ideation", desc: "Craft scripts, captions, ad copy, and storytelling frameworks aligned with brand voice and platforms.", icon: "✍️" },
        { title: "Videography & Photography", desc: "Plan and execute studio + lifestyle shoots capturing high-quality visuals for campaigns.", icon: "🎬" },
        { title: "UGC & Influencer Collaboration", desc: "Partner with creators and influencers for authentic, shareable, and trust-building content.", icon: "🤝" },
        { title: "Creative Storyboarding & Planning", desc: "Develop detailed storyboards ensuring narrative clarity and campaign alignment.", icon: "🗂️" },
        { title: "Tone & Brand Consistency", desc: "Maintain consistent voice, style, and messaging across all creative assets.", icon: "🎨" },
      ],
    },
    {
      id: 3,
      title: "Editing & Distribution",
      subtitle: "Content Delivery & Optimization",
      icon: DistributionIcon,
      gradient: "from-purple-500 via-violet-600 to-purple-700",
      glowColor: "168, 85, 247",
      items: [
        { title: "Video Editing (SFX + VFX)", desc: "Refine footage with graphics, effects, sound design, and post-production polish.", icon: "✂️" },
        { title: "Platform-Specific Formatting", desc: "Adapt content to meet specifications for Instagram, YouTube, LinkedIn, X, and more.", icon: "📱" },
        { title: "Cross-Platform Publishing", desc: "Publish across brand pages, hyperlocal handles, and partners to maximize reach.", icon: "🌐" },
        { title: "Scheduling & Campaign Seeding", desc: "Plan and seed content at optimal times for visibility, engagement, and recall.", icon: "⏰" },
        { title: "Content Repurposing & Adaptation", desc: "Transform raw content into Reels, Shorts, Carousels, and Stories for extended ROI.", icon: "♻️" },
      ],
    },
    {
      id: 4,
      title: "Performance Marketing",
      subtitle: "Paid Advertising & Growth",
      icon: PerformanceIcon,
      gradient: "from-orange-500 via-red-500 to-pink-600",
      glowColor: "249, 115, 22",
      items: [
        { title: "Paid Media Planning & Execution", desc: "Launch and optimize campaigns across Meta, YouTube, LinkedIn, targeting precise audiences.", icon: "📢" },
        { title: "Retargeting & Engagement Optimization", desc: "Re-engage warm audiences, nurture leads, and drive conversions while reducing ad waste.", icon: "🔄" },
        { title: "Performance Tracking & Optimization", desc: "Monitor CPM, CTR, ROAS, and conversions to refine targeting and improve ROI.", icon: "📈" },
        { title: "A/B Testing & Funnel Refinement", desc: "Test creatives, hooks, and landing pages to identify high-performing variants.", icon: "🧪" },
        { title: "Full-Funnel Campaign Management", desc: "Manage awareness, consideration, and conversion campaigns end-to-end.", icon: "🛠️" },
      ],
    },
    {
      id: 5,
      title: "Community Building",
      subtitle: "Audience Engagement & Loyalty",
      icon: CreativeIcon,
      gradient: "from-pink-500 via-rose-500 to-red-600",
      glowColor: "236, 72, 153",
      items: [
        { title: "Social Community Engagement", desc: "Manage brand communities across Discord, WhatsApp, Telegram, and social platforms.", icon: "💬" },
        { title: "Customer Advocacy Programs", desc: "Turn loyal users into brand advocates for amplified reach and credibility.", icon: "🙌" },
        { title: "Engagement Workshop Management", desc: "Host webinars, live workshops, and interactive sessions for audience bonding.", icon: "🎤" },
        { title: "Content & Discussion Moderation", desc: "Guide community discussions to ensure relevance, alignment, and positivity.", icon: "🛡️" },
        { title: "Feedback & Insights Loops", desc: "Capture community sentiment to inform campaigns, products, and strategies.", icon: "🔍" },
      ],
    },
    {
      id: 6,
      title: "Digital Brand IP Creation",
      subtitle: "Evergreen Content & Monetization",
      icon: InsightsIcon,
      gradient: "from-cyan-500 via-sky-500 to-blue-600",
      glowColor: "6, 182, 212",
      items: [
        { title: "Branded Podcasts & Web Series", desc: "Develop recurring storytelling formats that drive retention and engagement.", icon: "🎙️" },
        { title: "Scalable Content Products", desc: "Build reusable assets and templates for efficient multi-format content output.", icon: "📦" },
        { title: "IP Strategy & Long-Term Planning", desc: "Establish evergreen initiatives and flagship content for sustained impact.", icon: "📑" },
        { title: "Format & Series Optimization", desc: "Test and refine formats, approaches, and structures for better scalability.", icon: "⚙️" },
        { title: "Monetization & Brand Extension", desc: "Turn digital IP into revenue-generating products, subscriptions, and extensions.", icon: "💰" },
      ],
    },
  ], []);

  useGSAP(() => {
    if (!prefersReducedMotion) {
      const cards = containerRef.current?.querySelectorAll('.service-grid-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { 
            opacity: 0, 
            y: 40,
            scale: 0.96
          },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            clearProps: 'all'
          }
        );
      }
    }
  }, { scope: containerRef, dependencies: [] });

  const handleCloseModal = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setSelectedCard(null);
  }, []);

  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  }, [handleCloseModal]);

  const handleCardClick = useCallback((service) => {
    setSelectedCard(service);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedCard) {
        handleCloseModal();
      }
    };

    if (selectedCard) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedCard, handleCloseModal]);

  const modalVariants = useMemo(() => ({
    hidden: { 
      opacity: 0,
      scale: 0.95,
      y: 20
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.96,
      y: 10,
      transition: { duration: 0.2, ease: 'easeIn' }
    }
  }), []);

  const backdropVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.25 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.25 }
    }
  }), []);

  return (
    <section 
      ref={containerRef}
      className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-b from-[#0a0a0a] via-gray-950 to-black"
    >
      {/* Animated background layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-48 -right-48 w-[600px] h-[600px] bg-purple-500/[0.08] rounded-full blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.08, 0.12, 0.08],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-48 -left-48 w-[600px] h-[600px] bg-blue-500/[0.08] rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.12, 0.08],
            x: [0, -30, 0],
            y: [0, 20, 0]
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, margin: "-100px" }}
        >        
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-200 animate-gradient">
              Our Services
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Comprehensive digital solutions designed to accelerate your brand's growth
          </motion.p>
        </motion.div>

        {/* Service grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onClick={() => handleCardClick(service)}
            />
          ))}
        </motion.div>

        {/* COMPACT MODAL */}
        <AnimatePresence mode="wait">
          {selectedCard && (
            <motion.div 
              className="fixed inset-0 bg-black/75 backdrop-blur-lg flex items-center justify-center p-3 sm:p-4 z-[9999]"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={handleBackdropClick}
            >
              <motion.div
                className="relative w-full max-w-xl max-h-[70vh] bg-gradient-to-br from-white/[0.10] to-white/[0.05] backdrop-blur-2xl border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden"
                variants={modalVariants}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button - FIXED */}
<motion.button
  className="absolute top-2 right-2 sm:top-3 sm:right-3 w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-full flex items-center justify-center cursor-pointer shadow-2xl z-[100] border-2 border-white/10"
  onClick={handleCloseModal}
  whileHover={{ 
    scale: 1.15, 
    rotate: 90,
    boxShadow: "0 0 30px rgba(239, 68, 68, 0.6)"
  }}
  whileTap={{ scale: 0.95 }}
  aria-label="Close modal"
>
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
</motion.button>


                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${selectedCard.gradient} opacity-[0.12] rounded-2xl sm:rounded-3xl pointer-events-none`} />

                {/* Animated corner */}
                <motion.div
                  className={`absolute top-0 left-0 w-40 h-40 bg-gradient-to-br ${selectedCard.gradient} opacity-20 blur-3xl`}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Scrollable content */}
                <div className="relative z-10 p-4 sm:p-5 overflow-y-auto max-h-[70vh] custom-scrollbar">
                  {/* Header */}
                  <motion.div 
                    className="flex items-center mb-4 pb-3 border-b border-white/20"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <motion.div 
                      className={`relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${selectedCard.gradient} rounded-xl flex items-center justify-center shadow-2xl flex-shrink-0 overflow-hidden`}
                      whileHover={{ 
                        rotate: [0, -10, 10, 0],
                        scale: 1.05
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${selectedCard.gradient} blur-xl opacity-70`} />
                      <selectedCard.icon className="relative w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-2xl" />
                    </motion.div>
                    
                    <div className="ml-3 flex-1">
                      <h3 className="text-lg sm:text-xl font-black text-white mb-0.5 tracking-tight leading-tight">
                        {selectedCard.title}
                      </h3>
                      <p className="text-gray-300 text-xs font-medium">{selectedCard.subtitle}</p>
                    </div>
                  </motion.div>

                  {/* Services list */}
                  <div className="space-y-2.5">
                    <motion.h4 
                      className="text-xs sm:text-sm font-bold text-white/90 mb-3 flex items-center gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      <span className="inline-block w-1 h-4 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
                      What we deliver:
                    </motion.h4>
                    
                    {selectedCard.items.map((item, idx) => (
                      <motion.div
                        key={idx}
                        className="group flex items-start p-2.5 sm:p-3 bg-gradient-to-br from-white/[0.08] to-white/[0.04] hover:from-white/[0.12] hover:to-white/[0.08] rounded-xl border border-white/10 hover:border-white/25 transition-all duration-300 cursor-pointer"
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          delay: 0.2 + idx * 0.05,
                          duration: 0.4,
                          ease: 'easeOut'
                        }}
                        whileHover={{ 
                          scale: 1.01,
                          x: 3,
                          boxShadow: `0 6px 25px rgba(${selectedCard.glowColor}, 0.15)`
                        }}
                      >
                        <motion.span 
                          className="text-xl mr-2.5 flex-shrink-0 mt-0.5"
                          whileHover={{ 
                            scale: 1.2,
                            rotate: [0, -10, 10, 0]
                          }}
                          transition={{ 
                            type: "spring",
                            stiffness: 300,
                            damping: 10
                          }}
                        >
                          {item.icon}
                        </motion.span>
                        
                        <div className="flex-1 min-w-0">
                          <h5 className="text-white text-xs sm:text-sm font-semibold mb-1 leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-200 transition-all">
                            {item.title}
                          </h5>
                          <p className="text-gray-300 text-xs leading-relaxed group-hover:text-gray-200 transition-colors">
                            {item.desc}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.04);
          border-radius: 10px;
          margin: 8px 0;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(168, 85, 247, 0.6), rgba(236, 72, 153, 0.6));
          border-radius: 10px;
          border: 2px solid rgba(255, 255, 255, 0.1);
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, rgba(168, 85, 247, 0.8), rgba(236, 72, 153, 0.8));
        }

        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }

        @supports not (backdrop-filter: blur(10px)) {
          .backdrop-blur-xl,
          .backdrop-blur-2xl,
          .backdrop-blur-lg {
            background: rgba(0, 0, 0, 0.85);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ServiceShowcase;
