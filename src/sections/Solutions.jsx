import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2, Sparkles } from 'lucide-react';

const processCards = [
  {
    title: "Decoding Your Audience",
    subtitle:
      "We begin by studying, not guessing. Through focus group discussions, audits of client data, competitor research, and social listening across platforms like Reddit, Quora, and X, we decode what your audience truly cares about, laughs at, feels inspired by, and is willing to act on. We supplement this with direct community engagement and feedback loops to capture qualitative insights and validate assumptions.",
    benefits: [
      "Map audience segments, behaviors, and preferences",
      "Analyze competitors to uncover gaps and opportunities",
      "Audit existing campaigns, content, and KPIs",
      "Engage directly with communities to understand motivations",
    ],
    color: "from-blue-400 to-cyan-400",
    bgColor: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-400/30",
    glowColor: "shadow-blue-500/30",
    icon: "🗺️",
  },
  {
    title: "Crafting Your Strategy",
    subtitle:
      "Once we understand the audience intimately, the insights we gather help turn data into a clear growth blueprint. We build content buckets, messaging frameworks, and audience personas that guide all campaigns. Micro-campaigns and long-term initiatives are planned with defined timelines, KPIs, and channel strategies. We also identify opportunities for digital IP and scalable brand products that can add lasting value.",
    benefits: [
      "Build content buckets and communication frameworks",
      "Plan micro-campaigns and long-term roadmap with KPIs",
      "Prioritize channels, tones, and formats for maximum impact",
      "Identify scalable digital IP and product opportunities",
    ],
    color: "from-purple-400 to-pink-400",
    bgColor: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-400/30",
    glowColor: "shadow-purple-500/30",
    icon: "📑",
  },
  {
    title: "Capturing The Content",
    subtitle:
      "With strategy defined, we focus on creative storytelling and capturing content that resonates. Production is planned around two focused shoots spanning seven days, supported by in-house videographers, UGC creators, influencers, and professional models. We cover a spectrum of polished studio setups, lifestyle shots, and multi-format assets aligned with audience insights and campaign objectives.",
    benefits: [
      "Storyboard, script, and produce content for multiple formats",
      "Capture studio-quality and authentic lifestyle content",
      "Set tone of voice and creative style for brand consistency",
      "Collaborate with creators to amplify authenticity",
    ],
    color: "from-green-400 to-emerald-400",
    bgColor: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-400/30",
    glowColor: "shadow-green-500/30",
    icon: "🎥",
  },
  {
    title: "Editing & Distribution",
    subtitle:
      "Raw content is refined, formatted, and optimized for every platform. Our editors convert footage into Reels, Shorts, Carousels, and other formats while our distribution strategy maximizes reach and engagement. Content is scheduled and seeded across brand pages, hyperlocal handles, and collaborator channels, ensuring each asset travels strategically and delivers measurable impact.",
    benefits: [
      "Edit and optimize content for all relevant platforms",
      "Package content for Reels, Shorts, Carousels, and other formats",
      "Schedule and seed content for maximum visibility and recall",
      "Distribute strategically across multiple channels",
    ],
    color: "from-orange-400 to-red-400",
    bgColor: "from-orange-500/20 to-red-500/20",
    borderColor: "border-orange-400/30",
    glowColor: "shadow-orange-500/30",
    icon: "✂️",
  },
  {
    title: "Testing & Scaling",
    subtitle:
      "Campaigns are launched with a focus on learning and iteration. We run A/B tests across awareness, engagement, retargeting, and conversion funnels to identify what resonates best. Successful campaigns are scaled efficiently to improve ROI, reduce CAC, and drive higher engagement while underperforming creatives are reworked or paused for optimization.",
    benefits: [
      "Test creatives, hooks, and formats systematically",
      "Scale high-performing campaigns to maximize impact",
      "Optimize spend to reduce CAC and improve ROAS",
      "Iterate content strategy based on real-time insights",
    ],
    color: "from-pink-400 to-rose-400",
    bgColor: "from-pink-500/20 to-rose-500/20",
    borderColor: "border-pink-400/30",
    glowColor: "shadow-pink-500/30",
    icon: "⚡",
  },
  {
    title: "Learning & Evolving",
    subtitle:
      "Data closes the loop and informs continuous improvement. Beyond CPM, CTR, and engagement metrics, we track conversions, ROI, hook performance, and brand equity impact. These insights guide creative refreshes, budget reallocations, and experiments with new content formats and digital IP, ensuring campaigns evolve over time and deliver compounding growth.",
    benefits: [
      "Analyze campaign performance and audience behavior comprehensively",
      "Refresh creatives and messaging to align with evolving trends",
      "Reallocate budgets and optimize channel strategy continuously",
      "Experiment with new content formats and digital IP initiatives",
    ],
    color: "from-yellow-400 to-amber-400",
    bgColor: "from-yellow-500/20 to-amber-500/20",
    borderColor: "border-yellow-400/30",
    glowColor: "shadow-yellow-500/30",
    icon: "📈",
  },
];

const ProcessCard = ({ card, index, setActiveIndex, innerRef }) => {
  const viewRef = useRef(null);
  const isInView = useInView(viewRef, { margin: "-50% 0px -50% 0px" });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isInView) {
      setActiveIndex(index);
    }
  }, [isInView, index, setActiveIndex]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <motion.div
      ref={(el) => {
        viewRef.current = el;
        if (innerRef) innerRef(el);
      }}
      className={`group relative mb-16 rounded-2xl border-2 backdrop-blur-sm ${card.borderColor}`}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { 
          duration: 0.7,
          type: "spring",
          stiffness: 100,
          damping: 15
        } 
      }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${card.bgColor} -z-10`}
        animate={{
          opacity: isHovered ? 0.4 : 0.2,
        }}
        transition={{ duration: 0.4 }}
      />

      <div
        className={`absolute inset-0 bg-gradient-to-br ${card.bgColor} -z-10 opacity-30`}
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }}
      />

      <motion.div
        className={`absolute -inset-1 bg-gradient-to-r ${card.color} rounded-2xl blur-xl -z-20 opacity-0 group-hover:opacity-20`}
        animate={{
          opacity: isHovered ? 0.3 : 0,
        }}
        transition={{ duration: 0.4 }}
      />

      <div className="relative p-8 md:p-10">
        <motion.div 
          className="mb-6 flex items-center gap-4"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.div
            className="relative"
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? [0, -10, 10, -10, 0] : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-5xl drop-shadow-lg">{card.icon}</span>
            {isHovered && (
              <motion.div
                className="absolute -top-1 -right-1"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
              >
                <Sparkles className="w-5 h-5 text-yellow-400" />
              </motion.div>
            )}
          </motion.div>
          
          <div className="flex-1">
            <motion.h3 
              className={`bg-gradient-to-r ${card.color} bg-clip-text text-3xl font-bold text-transparent mb-1`}
            >
              {card.title}
            </motion.h3>
            <motion.div
              className={`h-1 rounded-full bg-gradient-to-r ${card.color}`}
              initial={{ width: 0 }}
              whileInView={{ width: isHovered ? "100%" : "40%" }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
          </div>
        </motion.div>

        <motion.p 
          className="mb-8 text-neutral-300 text-md leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {card.subtitle}
        </motion.p>

        <motion.ul 
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {card.benefits.map((benefit, i) => (
            <motion.li 
              key={i} 
              className="flex items-start gap-4 group/item"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle2 className="mt-1 h-6 w-6 flex-shrink-0 text-green-400 drop-shadow-lg" />
              </motion.div>
              <span className="text-neutral-200 text-base leading-relaxed group-hover/item:text-white transition-colors duration-300">
                {benefit}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <motion.div
        className={`absolute top-6 right-6 w-12 h-12 rounded-full bg-gradient-to-br ${card.color} flex items-center justify-center font-bold text-white text-lg shadow-lg`}
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
        whileHover={{ scale: 1.15, rotate: 360 }}
      >
        {index + 1}
      </motion.div>
    </motion.div>
  );
};

export default function Solutions() {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef({});

  // Handle navigation click with scroll offset
  const handleNavClick = (index) => {
    setActiveIndex(index);
    const element = cardRefs.current[index];
    if (element) {
      const yOffset = -100; // Adjust this value for spacing from top
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="solutions" className="relative py-24 text-white">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-86 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Header section */}
        <motion.div 
          className="mx-auto max-w-3xl text-center mb-20"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 text-sm text-blue-300 font-medium">
              <Sparkles className="w-4 h-4" />
              Our Process
            </span>
          </motion.div>

          <motion.h2 
            className="mb-6 text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Our Process
          </motion.h2>

          <motion.p 
            className="text-xl text-neutral-400 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            From audience insights to optimized results, we follow a structured
            path to guarantee your success.
          </motion.p>

          {/* Progress indicator */}
          <motion.div 
            className="mt-8 h-1 w-full bg-neutral-800 rounded-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
              style={{
                width: `${((activeIndex + 1) / processCards.length) * 100}%`,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </motion.div>
        </motion.div>

        <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Sticky Navigation with Click Functionality */}
          <div className="hidden lg:col-span-4 lg:block">
            <div 
              className="sticky top-28 self-start"
              style={{ 
                position: 'sticky',
                top: '7rem'
              }}
            >
              <motion.div
                className="relative space-y-2 bg-neutral-800/30 backdrop-blur-sm rounded-2xl p-4 border border-neutral-700/50"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {processCards.map((card, index) => (
                  <motion.div
                    key={card.title}
                    className={`relative flex items-center gap-4 rounded-xl px-5 py-4 cursor-pointer transition-all duration-300 ${
                      activeIndex === index
                        ? 'scale-105 text-white'
                        : 'scale-100 opacity-50 hover:opacity-75'
                    }`}
                    whileHover={{ x: activeIndex !== index ? 5 : 0 }}
                    onClick={() => handleNavClick(index)}
                  >
                    <motion.span 
                      className="text-3xl"
                      animate={{
                        scale: activeIndex === index ? [1, 1.2, 1] : 1,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {card.icon}
                    </motion.span>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{card.title}</p>
                      {activeIndex === index && (
                        <motion.div
                          className={`mt-1 h-0.5 rounded-full bg-gradient-to-r ${card.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 0.4 }}
                        />
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Animated background indicator */}
                <motion.div
                  className={`absolute left-4 top-4 -z-10 w-[calc(100%-2rem)] h-[68px] rounded-xl border-2 bg-gradient-to-br ${processCards[activeIndex].bgColor} ${processCards[activeIndex].borderColor}`}
                  animate={{ 
                    y: activeIndex * 76,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              </motion.div>
            </div>
          </div>

          {/* Right Column: Content Cards */}
          <div className="lg:col-span-8">
            {processCards.map((card, index) => (
              <ProcessCard
                key={card.title}
                card={card}
                index={index}
                setActiveIndex={setActiveIndex}
                innerRef={(el) => {
                  if (el) {
                    cardRefs.current[index] = el;
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}