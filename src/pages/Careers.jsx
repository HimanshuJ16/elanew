import React, { useState, useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";

const jobCategories = [
  {
    title: "Creative",
    positions: [
      {
        title: "Content Creator Intern",
        department: "Creative",
        type: "Remote",
        employment: "Full Time",
        pdfLink: "/Content_Creator_Intern.pdf",
        applyLink: "https://yourcompany.com/apply/graphic-designer"
      },
    ]
  },
  {
    title: "Operations",
    positions: [
      {
        title: "Founder's Office Intern",
        department: "Operations",
        type: "Remote",
        employment: "Full Time",
        pdfLink: "/Founder's_Office_JD.pdf",
        applyLink: "https://yourcompany.com/apply/meta-ads-specialist"
      },
      {
        title: "Media Buying Intern",
        department: "Operations",
        type: "Hybrid",
        employment: "Full Time",
        pdfLink: "/Media_Buying_Intern.pdf",
        applyLink: "https://yourcompany.com/apply/videographer"
      }
    ]
  }
];

const companyValues = [
  {
    icon: "🎯",
    title: "Customer Focus",
    description: "Our customers are at the heart of everything we do. We listen to their needs and deliver solutions that create value."
  },
  {
    icon: "📈",
    title: "Continuous Improvement", 
    description: "We believe in constant growth and learning, adapting to changes and seeking opportunities for enhancement."
  },
  {
    icon: "✅",
    title: "Accountability",
    description: "We take ownership of our actions and are committed to achieving our goals."
  },
  {
    icon: "💡",
    title: "Innovation",
    description: "We embrace creativity and new ideas to drive progress and stay ahead of industry trends."
  },
  {
    icon: "🤝",
    title: "Integrity", 
    description: "We uphold the highest ethical standards in our business practices and relationships."
  },
  {
    icon: "👥",
    title: "Collaboration",
    description: "We believe in the power of teamwork and foster a collaborative environment where everyone's contributions are valued."
  },
  {
    icon: "💚",
    title: "Employee Well-being",
    description: "We prioritize the health, happiness, and professional growth of our team members in everything we do."
  },
  {
    icon: "🔍",
    title: "Transparency", 
    description: "We maintain open communication and honest practices, building trust through clear and authentic interactions."
  },
  {
    icon: "🔄",
    title: "Adaptability",
    description: "We embrace change and remain flexible in our approach, continuously evolving to meet new challenges and opportunities."
  }
];

const perksAndBenefits = [
  {
    icon: "👥",
    title: "Professional Development Credits",
    description: "Invest in your future with our professional development credits. Expand your skill set and advance your career."
  },
  {
    icon: "🤝",
    title: "Employee Referral Bonus",
    description: "Help us build a top-tier team by referring talented individuals. Your recommendations are highly valued and you'll be rewarded for your efforts."
  },
  {
    icon: "🏠",
    title: "Remote Work Options",
    description: "Experience the flexibility of working remotely and create a productive workspace that suits your style."
  },
  {
    icon: "🎓",
    title: "Mentorship Programs",
    description: "Gain invaluable insights from industry leaders through our mentorship program. Learn, grow, and advance your career with expert guidance."
  },
  {
    icon: "💼",
    title: "Client Portfolio Bonus",
    description: "Demonstrate exceptional client management and be rewarded for your success. Your contributions to client satisfaction are invaluable."
  },
  {
    icon: "⏰",
    title: "Flexible Schedule",
    description: "Achieve optimal work-life integration with our flexible work arrangements. Enjoy the freedom to manage your time effectively."
  },
  {
    icon: "💡",
    title: "New Business Referral",
    description: "Contribute to our growth by referring new business opportunities. You'll be recognized and rewarded for expanding our client base."
  },
  {
    icon: "🏖",
    title: "Paid Time Off",
    description: "Enjoy a healthy work-life balance with our comprehensive paid time off policy. Recharge and return refreshed."
  },
  {
    icon: "🌟",
    title: "Unpaid Time Off",
    description: "Need a longer break? Take advantage of our unpaid leave to focus on personal goals and return with renewed energy."
  }
];

const JobDialog = ({ isOpen, onClose, position }) => {
  if (!isOpen || !position) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Dialog Panel */}
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 border border-yellow-400/30 rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl transform transition-all">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close dialog"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Dialog Content */}
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">{position.title}</h2>
            <div className="flex items-center gap-3 text-gray-300 text-sm">
              <span className="bg-gray-700/50 px-3 py-1 rounded-full">{position.department}</span>
              <span className="bg-gray-700/50 px-3 py-1 rounded-full">{position.type}</span>
              <span className="bg-gray-700/50 px-3 py-1 rounded-full">{position.employment}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Download PDF Button */}
            <a
              href={position.pdfLink}
              download
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Job Description (PDF)
            </a>

            {/* Apply Link Button */}
            {/* <a
              href={position.applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-400 hover:to-yellow-400 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Apply Now
            </a> */}

            {/* Additional Links (Optional) */}
            {/* <div className="pt-4 border-t border-gray-700">
              <p className="text-gray-400 text-sm mb-3">More Information:</p>
              <div className="space-y-2">
                <a
                  href="https://yourcompany.com/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-yellow-400 hover:text-yellow-300 text-sm transition-colors"
                >
                  → Learn more about our company
                </a>
                <a
                  href="https://yourcompany.com/culture"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-yellow-400 hover:text-yellow-300 text-sm transition-colors"
                >
                  → Explore our company culture
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

const JobCard = ({ position, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <button
        className="group relative bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl w-full text-left"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsDialogOpen(true)}
        style={{
          animationDelay: `${index * 150}ms`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-orange-400/5 to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
        
        <div className="relative z-10">
          <h3 className="text-xl font-semibold text-left text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">
            {position.title}
          </h3>
          <div className="flex items-center gap-4 text-gray-300 text-sm">
            <span className="bg-gray-700/50 px-3 py-1 rounded-full">{position.department}</span>
            <span className="bg-gray-700/50 px-3 py-1 rounded-full">{position.type}</span>
            <span className="bg-gray-700/50 px-3 py-1 rounded-full">{position.employment}</span>
          </div>
        </div>

        <div className={`absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full transform transition-all duration-300 ${isHovered ? 'scale-150 opacity-100' : 'scale-0 opacity-0'}`} />
      </button>

      <JobDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        position={position}
      />
    </>
  );
};

const ValueCard = ({ value, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 150);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div 
      className={`group relative bg-gradient-to-br from-gray-900/90 to-black/80 backdrop-blur-sm border border-yellow-400/20 rounded-3xl p-8 hover:border-yellow-400/60 transition-all duration-700 transform hover:-translate-y-4 hover:shadow-2xl hover:shadow-yellow-400/10 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-orange-400/5 to-yellow-300/8 opacity-0 group-hover:opacity-100 transition-opacity duration-600 rounded-3xl" />
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-yellow-400/20 to-transparent rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
      
      <div className="relative z-10">
        <div className="text-5xl mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 filter group-hover:drop-shadow-lg">
          {value.icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors duration-400">
          {value.title}
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-100 transition-colors duration-400">
          {value.description}
        </p>
      </div>

      <div className={`absolute top-6 right-6 w-3 h-3 bg-yellow-400 rounded-full transform transition-all duration-500 ${isHovered ? 'scale-150 opacity-100' : 'scale-0 opacity-0'}`} />
      <div className={`absolute top-10 right-10 w-2 h-2 bg-orange-400 rounded-full transform transition-all duration-700 ${isHovered ? 'scale-125 opacity-80' : 'scale-0 opacity-0'}`} />
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 blur-sm" />
    </div>
  );
};

const PerkCard = ({ perk, index }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 200);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div 
      className={`group relative bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-yellow-400/30 transition-all duration-700 transform hover:-translate-y-3 hover:shadow-2xl ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-orange-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
      
      <div className="relative z-10">
        <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
          {perk.icon}
        </div>
        <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300">
          {perk.title}
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
          {perk.description}
        </p>
      </div>

      <div className="absolute top-4 right-4 w-2 h-2 bg-yellow-400/0 group-hover:bg-yellow-400/70 rounded-full transition-all duration-300" />
    </div>
  );
};

const Careers = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden pt-36 md:pt-40">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-400/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-300/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header Section */}
      <section className="relative z-10 pt-8 pb-16 lg:h-[20vh] text-center">
        <div className="container mx-auto px-4">
          <h1 
            className="text-6xl md:text-8xl mb-8 absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent font-black italic z-999"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          >
            Careers
          </h1>
          
          {/* <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-black bg-yellow-400 rounded-full hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
            <span className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-2">
              Apply Now
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button> */}
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-12">
            {jobCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-6">
                <h3 className="text-3xl font-bold text-white mb-8 animate-fade-in-up" style={{ animationDelay: `${categoryIndex * 300}ms` }}>
                  {category.title}
                </h3>
                
                <div className="grid gap-6">
                  {category.positions.map((position, positionIndex) => (
                    <JobCard 
                      key={positionIndex}
                      position={position}
                      index={positionIndex}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks and Benefits Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Perks and Benefits
          </h2>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {perksAndBenefits.map((perk, index) => (
              <PerkCard key={index} perk={perk} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Our Values
          </h2>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companyValues.map((value, index) => (
              <ValueCard key={index} value={value} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Back to Home Button */}
      <div className="fixed bottom-8 left-8 z-20">
        <button
          onClick={() => navigate("/")}
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm text-white font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all border border-gray-600/30 hover:border-yellow-400/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black"
          aria-label="Back to Home"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300"
          >
            <path
              fillRule="evenodd"
              d="M19.5 10.5a.75.75 0 01-.75.75h-9.69l3.22 3.22a.75.75 0 11-1.06 1.06l-4.5-4.5a.75.75 0 010-1.06l4.5-4.5a.75.75 0 111.06 1.06L9.06 9.75h9.69a.75.75 0 01.75.75z"
              clipRule="evenodd"
            />
          </svg>
          <span className="group-hover:text-yellow-400 transition-colors duration-300">Back to Home</span>
        </button>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Careers;