import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Icon components
const ChartIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 3v18h18v-2H5V3H3zm4 14h2V9H7v8zm4-4h2V7h-2v6zm4-3h2V5h-2v5z"/>
  </svg>
);

const CreativeIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const DistributionIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2L2 12h3v8h14v-8h3L12 2zm0 2.84L18.16 11H16v7H8v-7H5.84L12 4.84z"/>
  </svg>
);

const PerformanceIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>
);

const InsightsIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 11H7v6h2v-6zm4-4h-2v10h2V7zm4-3h-2v13h2V4zm2 18H5V4H3v16c0 1.1.9 2 2 2h14v-2z"/>
  </svg>
);

const ServiceShowcase = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".service-grid-card",
      { opacity: 0, y: 60, scale: 0.9 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      }
    );
  }, { scope: containerRef });

  // Enhanced close function
  const handleCloseModal = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setSelectedCard(null);
  };

  // Handle escape key and body scroll
  React.useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setSelectedCard(null);
      }
    };

    if (selectedCard) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedCard]);

  // Your provided services data
  const services = [
    {
      id: 1,
      title: "Marketing Strategy",
      subtitle: "Strategic Planning & Analysis",
      icon: ChartIcon,
      color: "blue",
      gradient: "from-blue-500 via-blue-600 to-blue-700",
      items: [
        { title: "Audience Mapping", desc: "identify segments and uncover digital opportunities to win attention.", icon: "👥" },
        { title: "Campaign Ideation", desc: "plan micro-campaigns and activations aligned with growth.", icon: "💡" },
        { title: "Brand Positioning", desc: "define how your brand communicates and builds recall.", icon: "🎯" },
        { title: "Competitor Analysis", desc: "scan messaging, hooks, and funnels to spot market gaps.", icon: "🔍" },
      ]
    },
    {
      id: 2,
      title: "Content Creation",
      subtitle: "Creative Production & Design",
      icon: CreativeIcon,
      color: "emerald",
      gradient: "from-emerald-500 via-green-600 to-teal-700",
      items: [
        { title: "Scripts & Copy", desc: "craft stories, captions, and ad copy that convert attention into action.", icon: "✍️" },
        { title: "Video Production", desc: "produce Reels, Shorts, UGC, and founder-led content tailored to your audience.", icon: "🎬" },
        { title: "Design & Carousels", desc: "deliver graphics and visual assets that stand out in crowded feeds.", icon: "🎨" },
        { title: "Creative Testing", desc: "generate multiple hooks and variations to find what performs best.", icon: "🧪" }
      ]
    },
    {
      id: 3,
      title: "Editing & Distribution",
      subtitle: "Content Delivery & Optimization",
      icon: DistributionIcon,
      color: "purple",
      gradient: "from-purple-500 via-violet-600 to-indigo-700",
      items: [
        { title: "Video Editing", desc: "turn raw footage into scroll-stopping content with sharp cuts and motion graphics.", icon: "✂️" },
        { title: "Platform Packaging", desc: "adapt content into native formats for Instagram, YouTube, LinkedIn, and TikTok.", icon: "📱" },
        { title: "Multi-Account Publishing", desc: "distribute across founder, brand, and partner handles for reach.", icon: "📡" },
        { title: "Strategic Scheduling", desc: "optimize timing and seed content with creators to drive recall.", icon: "⏰" }
      ]
    },
    {
      id: 4,
      title: "Performance Marketing",
      subtitle: "Paid Advertising & Growth",
      icon: PerformanceIcon,
      color: "orange",
      gradient: "from-orange-500 via-red-600 to-pink-700",
      items: [
        { title: "Awareness Ads", desc: "capture attention and grow brand recall on Meta, YouTube, and LinkedIn with efficient CPM.", icon: "👁️" },
        { title: "Engagement Ads", desc: "deliver value through saves, shares, and interactions to lift engagement rates.", icon: "❤️" },
        { title: "Retargeting Ads", desc: "re-engage warm audiences, improving CTR and lowering CPL.", icon: "🔄" },
        { title: "Conversion Ads", desc: "lead audiences to purchase or inquiry, delivering positive ROAS and revenue.", icon: "💰" }
      ]
    },
    {
      id: 5,
      title: "Insights & Optimization",
      subtitle: "Data Analytics & Reporting",
      icon: InsightsIcon,
      color: "cyan",
      gradient: "from-cyan-500 via-sky-600 to-blue-700",
      items: [
        { title: "Competitor Reports", desc: "deliver bi-weekly scans of trends, hooks, and opportunities in your category.", icon: "📊" },
        { title: "Performance Tracking", desc: "we measure CPM, ROAS, hook rate, engagement metrics, CPL, ROI, and any other given KPI to refine output.", icon: "📈" },
        { title: "Audience Feedback", desc: "turn comments, polls, and DMs into actionable creative inputs.", icon: "💬" },
        { title: "Continuous Refresh", desc: "update ads, reallocate budgets, and sharpen content for compounding ROI.", icon: "🔄" }
      ]
    },
    {
      id: 6,
      title: "Insights & Optimization",
      subtitle: "Data Analytics & Reporting",
      icon: InsightsIcon,
      color: "cyan",
      gradient: "from-cyan-500 via-sky-600 to-blue-700",
      items: [
        { title: "Competitor Reports", desc: "deliver bi-weekly scans of trends, hooks, and opportunities in your category.", icon: "📊" },
        { title: "Performance Tracking", desc: "we measure CPM, ROAS, hook rate, engagement metrics, CPL, ROI, and any other given KPI to refine output.", icon: "📈" },
        { title: "Audience Feedback", desc: "turn comments, polls, and DMs into actionable creative inputs.", icon: "💬" },
        { title: "Continuous Refresh", desc: "update ads, reallocate budgets, and sharpen content for compounding ROI.", icon: "🔄" }
      ]
    },
  ];

  return (
    <section 
      ref={containerRef}
      className="relative py-24 lg:py-36 overflow-hidden bg-gradient-to-b from-[#0a0a0a] via-gray-950 to-black"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 -right-48 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-200 mb-8 leading-tight">
            Our Services
          </h2>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
            Comprehensive digital solutions designed to accelerate your brand's growth
          </p>
        </motion.div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.id}
                className="service-grid-card group relative"
                onClick={() => setSelectedCard(service)}
                whileHover={{ scale: 1.02, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`relative overflow-hidden bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-6 h-full cursor-pointer transition-all duration-500 hover:bg-white/15 hover:backdrop-blur-xl hover:border-white/20 group-hover:shadow-[0_0_20px_rgba(${service.color === 'blue' ? '59,130,246' : service.color === 'emerald' ? '16,185,129' : service.color === 'purple' ? '168,85,247' : service.color === 'orange' ? '249,115,22' : '6,182,212'},0.2)]`}>
                  
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-bold text-white group-hover:text-gray-100 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-gray-400 text-sm font-medium">{service.subtitle}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {service.items.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-400">
                          <span className="text-lg mr-3 flex-shrink-0">{item.icon}</span>
                          <span>{item.title}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10">
                      <span className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                        Click to learn more →
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Modal Dialog */}
        <AnimatePresence>
          {selectedCard && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[999]">
              <motion.div
                className="relative w-full max-w-lg bg-white/10 backdrop-blur-lg border border-white/15 rounded-2xl p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Close Button */}
                <button
                  className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-200 shadow-lg z-10"
                  onClick={handleCloseModal}
                  onMouseDown={handleCloseModal}
                  onTouchStart={handleCloseModal}
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${selectedCard.gradient} opacity-20 rounded-2xl`}></div>

                {/* Modal Content */}
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${selectedCard.gradient} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <selectedCard.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-xl font-bold text-white">
                        {selectedCard.title}
                      </h3>
                      <p className="text-gray-400 text-sm">{selectedCard.subtitle}</p>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-white mb-3">What we deliver:</h4>
                    {selectedCard.items.map((item, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-start p-3 bg-white/5 rounded-lg border border-white/10"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <span className="text-xl mr-3 flex-shrink-0 mt-0.5">{item.icon}</span>
                        <div className="flex-1">
                          <h5 className="text-white text-sm font-semibold mb-1">{item.title}</h5>
                          <p className="text-gray-300 text-xs leading-relaxed">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .backdrop-blur-lg {
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .backdrop-blur-xl {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        @supports not (backdrop-filter: blur(10px)) {
          .backdrop-blur-lg,
          .backdrop-blur-xl {
            background: rgba(255, 255, 255, 0.15);
          }
        }
      `}</style>
    </section>
  );
};

export default ServiceShowcase;