import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import TitleHeader from "../components/TitleHeader";

const faqData = [
  {
    id: 1,
    question: "What's 'risk-free' about your offer?",
    answer: [
      "We don't believe in asking for blind trust.",
      "Before any retainer, we run FOC pilot rounds so you know exactly what you're signing up for.",
      "We back our work with payback guarantees: if you don't see value, you don't pay.",
      "This means you can test our approach with zero financial risk upfront."
    ],
    icon: "🛡️",
    color: "blue",
    gradient: "from-blue-600/10 to-blue-900/10"
  },
  {
    id: 2,
    question: "What all can you not offer me?",
    answer: [
      "We're very clear on our strengths and specialize in digital-first marketing.",
      "We don't handle: influencer marketing, studio setup space, offline event management, ad spends of ₹85L+ per month, packaging/POSM production, celebrity partnerships, Amazon ads, or quick commerce growth.",
      "But we've partnered with top outsourced teams for these services.",
      "You get access to quality work without the hassle, or bring your own vendors—we'll focus on quality control."
    ],
    icon: "🎯",
    color: "orange",
    gradient: "from-orange-600/10 to-orange-900/10"
  },
  { 
    id: 3,
    question: "Do you only work on retainers?",
    answer: [
      "Not at all—we're flexible based on your needs.",
      "Retainers for dedicated teams and consistent growth.",
      "Sprints for testing new approaches.",
      "Consultancy to sharpen your in-house team's output.",
      "We'll help you choose what fits your stage best."
    ],
    icon: "⚙️",
    color: "purple",
    gradient: "from-purple-600/10 to-purple-900/10"
  },
  {
    id: 4,
    question: "How soon can I expect results?",
    answer: [
      "Performance marketing: signals within weeks (lower CPMs, higher CTRs, leads).",
      "Content & brand recall: steady growth that compounds over time.",
      "We recommend 3–6 months for building consistency, trust, and recall.",
      "Quick wins in weeks, sustainable lift in months."
    ],
    icon: "📈",
    color: "green",
    gradient: "from-green-600/10 to-green-900/10"
  },
  {
    id: 5,
    question: "Is there a fixed investment?",
    answer: [
      "Retainers: ₹1,15,000 – ₹4,50,000/month (billed every 30 days).",
      "Covers strategy, content, distribution, ads, and insights.",
      "Ad spend scales with your revenue and goals—start lean or go aggressive.",
      "We'll guide you to the right investment for impact without stretching."
    ],
    icon: "💎",
    color: "yellow",
    gradient: "from-yellow-500/10 to-yellow-900/10"
  },
  {
    id: 6,
    question: "Can you help if I'm not ready to collaborate?",
    answer: [
      "Absolutely—we believe in earning goodwill first.",
      "Free resources, playbooks, and webinars (coming soon!) for founders and creators.",
      "If we're not the right fit now, we'll connect you with someone who is.",
      "You'll always walk away with clarity and value."
    ],
    icon: "🌱",
    color: "indigo",
    gradient: "from-indigo-600/10 to-indigo-900/10"
  },
  {
    id: 7,
    question: "Can you work with my in-house team?",
    answer: [
      "Yes, and we love doing it—collaboration is our strength.",
      "We plug in as your strategic and execution partner.",
      "Handle content/ads while your team manages community/PR, or build systems and train your team.",
      "Think of us as an extension of your department with more firepower."
    ],
    icon: "🔗",
    color: "teal",
    gradient: "from-teal-600/10 to-teal-900/10"
  }
];

const FAQItem = ({ faq, isOpen, onToggle, index }) => {
  const contentRef = useRef(null);
  const { ref: itemRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const getColorClasses = (color) => {
    const colors = {
      blue: { accent: "text-blue-400", border: "border-blue-500/20", glow: "from-blue-500/20" },
      orange: { accent: "text-orange-400", border: "border-orange-500/20", glow: "from-orange-500/20" },
      purple: { accent: "text-purple-400", border: "border-purple-500/20", glow: "from-purple-500/20" },
      green: { accent: "text-green-400", border: "border-green-500/20", glow: "from-green-500/20" },
      yellow: { accent: "text-yellow-400", border: "border-yellow-500/20", glow: "from-yellow-500/20" },
      indigo: { accent: "text-indigo-400", border: "border-indigo-500/20", glow: "from-indigo-500/20" },
      teal: { accent: "text-teal-400", border: "border-teal-500/20", glow: "from-teal-500/20" }
    };
    return colors[color] || colors.blue;
  };

  const colors = getColorClasses(faq.color);

  return (
    <motion.div
      ref={itemRef}
      className={`
        faq-item relative overflow-hidden rounded-2xl mb-4 last:mb-0
        bg-gradient-to-r ${faq.gradient} border border-white/5
        backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-${faq.color}-500/10
        transition-all duration-500 group
        ${inView ? 'animate-slideInUp' : ''}
      `}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: `0 20px 40px -10px rgba(var(--color-${faq.color}-500/0.2))`
      }}
    >
      {/* Header */}
      <motion.button
        onClick={() => onToggle(faq.id)}
        className={`
          w-full py-6 px-6 text-left flex justify-between items-center
          hover:bg-white/5 transition-all duration-400 relative
          focus:outline-none focus:ring-2 focus:ring-${faq.color}-400/30 focus:ring-offset-0
        `}
        whileTap={{ scale: 0.98 }}
        whileHover={{ paddingLeft: 28, paddingRight: 28 }}
      >
        {/* Icon */}
        <motion.div 
          className={`
            flex items-center justify-center w-12 h-12 rounded-xl
            bg-gradient-to-br from-${faq.color}-500 to-${faq.color}-600
            text-white shadow-lg group-hover:scale-110 group-hover:rotate-6
            transition-all duration-300 mr-4
          `}
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-xl">{faq.icon}</span>
        </motion.div>

        {/* Question */}
        <div className="flex-1 min-w-0">
          <motion.h3 
            className={`
              text-lg md:text-xl font-semibold text-white pr-6
              group-hover:text-gray-100 transition-all duration-300
              line-clamp-2
            `}
            whileHover={{ color: "#f8fafc" }}
          >
            {faq.question}
          </motion.h3>
        </div>

        {/* Expand Icon */}
        <motion.div 
          className={`
            flex items-center justify-center w-10 h-10 rounded-lg
            bg-white/10 backdrop-blur-sm text-white
            group-hover:bg-${faq.color}-500/20 group-hover:scale-110
            transition-all duration-300
            ${isOpen ? 'rotate-45' : ''}
          `}
          animate={{ 
            rotate: isOpen ? 45 : 0,
            scale: isOpen ? 1.1 : 1
          }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span className="text-lg font-light">+</span>
        </motion.div>
      </motion.button>

      {/* Answer Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ 
              opacity: 0, 
              height: 0, 
              paddingTop: 0, 
              paddingBottom: 0,
              scaleY: 0.8
            }}
            animate={{ 
              opacity: 1, 
              height: "auto", 
              paddingTop: 24, 
              paddingBottom: 24,
              scaleY: 1
            }}
            exit={{ 
              opacity: 0, 
              height: 0, 
              paddingTop: 0, 
              paddingBottom: 0,
              scaleY: 0.8
            }}
            transition={{ 
              duration: 0.5, 
              ease: [0.25, 0.1, 0.25, 1]
            }}
            className={`
              overflow-hidden bg-white/2 backdrop-blur-sm
              border-t border-${faq.color}-500/10
            `}
          >
            <div className="px-6 space-y-4">
              {/* Answer Lines */}
              <div className="space-y-3">
                {faq.answer.map((line, i) => (
                  <motion.p
                    key={i}
                    className="text-gray-200 leading-relaxed text-sm md:text-base lg:text-lg font-light pl-2 border-l-2 border-gray-700/50"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              {/* Subtle accent element */}
              <div className={`
                h-px w-16 mx-auto bg-gradient-to-r from-${faq.color}-400 to-transparent
                opacity-30 rounded-full
              `}></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover glow effect */}
      <div className={`
        absolute inset-0 bg-gradient-to-r ${faq.gradient}
        opacity-0 group-hover:opacity-100 transition-opacity duration-500
        rounded-2xl -z-10 blur-xl
      `}></div>
    </motion.div>
  );
};

const Testimonials = () => {
  const [openItems, setOpenItems] = useState({});
  const containerRef = useRef(null);
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <motion.section 
      ref={sectionRef}
      id="testimonials" 
      className="relative py-10 lg:py-16 overflow-hidden"
      // style={{ 
      //   background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)'
      // }}
      initial={false}
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.8 }}
    >
      {/* Subtle background texture */}
      <div 
        className="absolute inset-0 opacity-2"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(168, 85, 247, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 25% 75%, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 75% 25%, rgba(16, 185, 129, 0.03) 0%, transparent 50%)
          `
        }}
      />

      {/* Decorative elements */}
      <motion.div 
        className="absolute top-16 left-8 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
        animate={{ 
          y: [0, -8, 0],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className="absolute bottom-16 right-8 w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
        animate={{ 
          y: [0, 6, 0],
          opacity: [0.2, 0.6, 0.2]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 1
        }}
      />

      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16 lg:mb-24 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="lg:hidden">
            <TitleHeader
              title="FAQs"
              subtitle="Clear answers to help you understand how we work and what to expect"
              titleClassName="text-4xl lg:text-5xl xl:text-6xl font-bold"
              subtitleClassName="text-gray-400 text-lg lg:text-xl mt-4 max-w-2xl mx-auto"
            />
          </div>
          <div className="hidden lg:block">
            <TitleHeader
              title="Frequently Asked Questions"
              subtitle="Clear answers to help you understand how we work and what to expect"
              titleClassName="text-4xl lg:text-5xl xl:text-6xl font-bold"
              subtitleClassName="text-gray-400 text-lg lg:text-xl mt-4 max-w-2xl mx-auto"
            />
          </div>
        </motion.div>

        {/* FAQ Grid */}
        <motion.div 
          ref={containerRef}
          className="max-w-6xl mx-auto grid gap-4 lg:gap-6"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >          
          <div className="lg:col-span-2">
            {faqData.map((faq) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openItems[faq.id]}
                onToggle={toggleItem}
                index={faq.id - 1}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out forwards;
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .faq-item {
            margin-bottom: 1rem !important;
          }
          
          .faq-item .px-6 {
            padding-left: 1.25rem !important;
            padding-right: 1.25rem !important;
          }
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </motion.section>
  );
};

export default Testimonials;