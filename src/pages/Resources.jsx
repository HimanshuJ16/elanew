import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Resources = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Set target date to exactly 60 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 60);
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-xl bg-gray-800/60 backdrop-blur-md border border-gray-700/50 flex items-center justify-center">
        <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-400 mt-2 font-medium">
        {label}
      </span>
    </div>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    // Handle email submission logic here
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4 sm:px-6 py-28 sm:py-16 md:py-24 relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] sm:bg-[size:50px_50px]"></div>
      
      {/* Subtle gradient orbs - hidden on mobile for performance */}
      <div className="hidden sm:block absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="hidden sm:block absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto relative z-10">
        {/* Main Content - Compact Card */}
        <div className="relative">
          {/* Glassmorphism Container - Smaller and Mobile Optimized */}
          <div className="relative p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-gray-900/20 backdrop-blur-xl border border-gray-700/30 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
                Join the <span className="text-blue-400">waitlist</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
                
We’re launching free webinars, videos, case studies and toolkits to teach what we do before you join the company, either as a client or a team member
              </p>
            </div>

            {/* Countdown Timer - Responsive Spacing */}
            <div className="mb-6 sm:mb-8">
              <div className="flex justify-center items-center gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
                <TimeUnit value={timeLeft.days} label="DAYS" />
                <TimeUnit value={timeLeft.hours} label="HOURS" />
                <TimeUnit value={timeLeft.minutes} label="MINUTES" />
                <TimeUnit value={timeLeft.seconds} label="SECONDS" />
              </div>
              
              {/* Calendar Icon and Text */}
              <div className="flex items-center justify-center gap-2 text-gray-400 text-xs sm:text-sm">
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span className="uppercase tracking-wider font-medium">LEFT UNTIL FULL RELEASE</span>
              </div>
            </div>

            {/* Email Signup Form - Mobile Optimized */}
            <form onSubmit={handleSubmit} className="mb-6 sm:mb-8">
              <div className="mb-3 sm:mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-3 sm:px-5 sm:py-3.5 rounded-lg sm:rounded-xl bg-gray-800/40 backdrop-blur-md border border-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 text-sm sm:text-base"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-3 sm:px-5 sm:py-3.5 rounded-lg sm:rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2 focus:ring-offset-transparent text-sm sm:text-base"
              >
                Join waitlist
              </button>
            </form>

            {/* User Avatars and Stats - Mobile Responsive */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-gray-400">
              <div className="flex -space-x-2 sm:-space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`images/${i}.jpg`}
                    alt={`Avatar ${i}`}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-gray-800"
                  />
                ))}
              </div>
              <span className="text-xs sm:text-sm text-center">
                Join <span className="text-white font-semibold">578</span> + others on the waitlist
              </span>
            </div>
          </div>
        </div>

        {/* Navigation - Mobile Optimized */}
        <div className="flex justify-center mt-8 sm:mt-12">
          <button
            onClick={() => navigate('/')}
            className="group inline-flex items-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-gray-800/40 backdrop-blur-md border border-gray-700/50 text-gray-300 font-medium hover:bg-gray-800/60 hover:border-gray-600/50 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 text-sm sm:text-base"
            aria-label="Back to Home"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:-translate-x-1 transition-transform duration-300"
            >
              <path fillRule="evenodd" d="M19.5 10.5a.75.75 0 01-.75.75h-9.69l3.22 3.22a.75.75 0 11-1.06 1.06l-4.5-4.5a.75.75 0 010-1.06l4.5-4.5a.75.75 0 111.06 1.06L9.06 9.75h9.69a.75.75 0 01.75.75z" clipRule="evenodd" />
            </svg>
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Resources;
