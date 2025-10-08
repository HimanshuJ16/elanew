import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { navLinks } from "../constants";
import elationLogo from '../../public/images/elationlogo.jpg';

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (e, link) => {
    if (link.startsWith('/#')) {
      e.preventDefault();
      setMobileMenuOpen(false);
      const id = link.split('#')[1];
      
      if (window.location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
        setMobileMenuOpen(false);
    }
  };

  const handleBookCallClick = (e) => {
    e.preventDefault();
    setIsDialogOpen(true);
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:info@elation.digital';
    setIsDialogOpen(false);
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/+919097290982', '_blank');
    setIsDialogOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('.navbar-container')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  return (
    <>
      <header 
        className={`
          fixed top-0 left-0 right-0 z-100 transition-all duration-300 ease-in-out
          ${scrolled 
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/25' 
            : 'bg-transparent'
          }
        `}
        role="banner"
      >
        <div className="navbar-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo Section */}
            <div className="flex-shrink-0">
              <Link 
                to="/#hero" 
                onClick={(e) => handleNavClick(e, '/#hero')}
                className="group flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent rounded-xl transition-all duration-300"
                aria-label="Elation - Home"
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <img 
                    src={elationLogo} 
                    alt="Elation Logo" 
                    className="h-12 w-12 lg:h-14 lg:w-14 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <span className="sm:block text-xl lg:text-2xl font-bold text-white group-hover:text-purple-200 transition-colors duration-300">
                  Elation
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1" role="navigation" aria-label="Main navigation">
              <ul className="flex items-center space-x-1">
                {navLinks.map(({ link, name, badge }) => (
                  <li key={name}>
                    {link.startsWith('/#') ? (
                      <a 
                        href={link}
                        onClick={(e) => handleNavClick(e, link)}
                        className="group relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent rounded-lg"
                      >
                        <span className="relative z-10 font-medium">{name}</span>
                        {badge && (
                          <span className="absolute -top-2 right-0 min-w-[20px] h-5 px-1.5 flex items-center justify-center text-[10px] font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-lg shadow-blue-500/50 animate-pulse border-2 border-black/20">
                            {badge}
                          </span>
                        )}
                        <div className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"></div>
                        <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full group-hover:left-0 rounded-full"></div>
                      </a>
                    ) : (
                      <Link 
                        to={link}
                        className="group relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent rounded-lg"
                      >
                        <span className="relative z-10 font-medium">{name}</span>
                        {badge && (
                          <span className="z-10 absolute -top-2 -right-3 min-w-[20px] h-5 px-1.5 flex items-center justify-center text-[10px] font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-lg shadow-blue-500/50 animate-pulse border-2 border-black/20">
                            {badge}
                          </span>
                        )}
                        <div className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"></div>
                        <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full group-hover:left-0 rounded-full"></div>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* CTA Button and Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBookCallClick}
                aria-label="Book a call"
                className="hidden lg:block group relative h-11 lg:h-12 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 hover:scale-105"
              >
                <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_25%,#FF6B6B_50%,#4ECDC4_75%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-black/90 backdrop-blur-xl px-5 lg:px-6 py-1 text-sm lg:text-base font-semibold text-white transition-all duration-300 group-hover:bg-gray-900/90">
                  <span className="mr-2">Book a call</span>
                  <svg className="w-4 h-4 lg:w-5 lg:h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>

              <div className="lg:hidden">
                <Link 
                  to="/careers"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex justify-between items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent"
                >
                  <span className="font-medium relative">
                    Careers
                    <span className="absolute -top-3 -right-6 min-w-[20px] h-5 px-1.5 flex items-center justify-center text-[10px] font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-lg shadow-blue-500/50 animate-pulse border-2 border-black/20">
                      Hiring
                    </span>
                  </span>
                </Link>
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden relative p-2 text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent rounded-lg transition-colors duration-300"
                aria-label="Toggle mobile menu"
                aria-expanded={mobileMenuOpen}
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
                  <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                  <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div 
            className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <nav 
              className="px-4 py-6 bg-black/90 backdrop-blur-xl border-t border-white/10 rounded-b-2xl shadow-xl"
              role="navigation" 
              aria-label="Mobile navigation"
            >
              <ul className="space-y-3">
                {navLinks.map(({ link, name, badge }) => (
                  <li key={name}>
                    {link.startsWith('/#') ? (
                      <a 
                        href={link}
                        onClick={(e) => handleNavClick(e, link)}
                        className="flex justify-between items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent"
                      >
                        <span className="font-medium">{name}</span>
                        {badge && (
                          <span className="min-w-[24px] h-6 px-2 flex items-center justify-center text-[10px] font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-lg shadow-blue-500/30 border-2 border-white/10">
                            {badge}
                          </span>
                        )}
                      </a>
                    ) : (
                      <Link 
                        to={link}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex justify-between items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent"
                      >
                        <span className="font-medium">{name}</span>
                        {badge && (
                          <span className="min-w-[24px] h-6 px-2 flex items-center justify-center text-[10px] font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-lg shadow-blue-500/30 border-2 border-white/10">
                            {badge}
                          </span>
                        )}
                      </Link>
                    )}
                  </li>
                ))}
                <button
                  onClick={handleBookCallClick}
                  aria-label="Book a call"
                  className="group relative inline-flex h-11 lg:h-12 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 hover:scale-105 w-full"
                >
                  <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_25%,#FF6B6B_50%,#4ECDC4_75%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-black/90 backdrop-blur-xl px-5 lg:px-6 py-1 text-sm lg:text-base font-semibold text-white transition-all duration-300 group-hover:bg-gray-900/90">
                    <span className="mr-2">Book a call</span>
                    <svg className="w-4 h-4 lg:w-5 lg:h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </button>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Dialog Modal */}
      {isDialogOpen && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          onClick={() => setIsDialogOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
          
          {/* Dialog Content */}
          <div 
            className="relative bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-[scale-in_0.2s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsDialogOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-lg p-1"
              aria-label="Close dialog"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Get in Touch</h2>
              <p className="text-gray-400">Choose your preferred way to contact us</p>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              {/* Email Button */}
              <button
                onClick={handleEmailClick}
                className="group w-full flex items-center justify-between px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black transform hover:scale-105"
              >
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-white font-semibold">Email Us</span>
                </div>
                <svg className="w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* WhatsApp Button */}
              <button
                onClick={handleWhatsAppClick}
                className="group w-full flex items-center justify-between px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-black transform hover:scale-105"
              >
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span className="text-white font-semibold">WhatsApp</span>
                </div>
                <svg className="w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;