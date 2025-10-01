import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { navLinks } from "../constants";
import elationLogo from '../../public/images/elationlogo.jpg';

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (e, link) => {
    if (link.startsWith('/#')) {
      e.preventDefault();
      setMobileMenuOpen(false);
      const id = link.split('#')[1];
      
      // If we are not on the homepage, navigate to it first
      if (window.location.pathname !== '/') {
        navigate('/');
        // Use a timeout to allow the page to change before scrolling
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


  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
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
              {navLinks.map(({ link, name }) => (
                <li key={name}>
                  {link.startsWith('/#') ? (
                    <a 
                      href={link}
                      onClick={(e) => handleNavClick(e, link)}
                      className="group relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent rounded-lg"
                    >
                      <span className="relative z-10 font-medium">{name}</span>
                      <div className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"></div>
                      <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full group-hover:left-0 rounded-full"></div>
                    </a>
                  ) : (
                    <Link 
                      to={link}
                      className="group relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent rounded-lg"
                    >
                      <span className="relative z-10 font-medium">{name}</span>
                      <div className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"></div>
                      <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full group-hover:left-0 rounded-full"></div>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <a
              href="#contact"
              aria-label="Book a call"
              className="group relative inline-flex h-11 lg:h-12 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 hover:scale-105"
            >
              <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_25%,#FF6B6B_50%,#4ECDC4_75%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-black/90 backdrop-blur-xl px-5 lg:px-6 py-1 text-sm lg:text-base font-semibold text-white transition-all duration-300 group-hover:bg-gray-900/90">
                <span className="mr-2">Book a call</span>
                <svg className="w-4 h-4 lg:w-5 lg:h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>

            {/* Mobile Menu Button */}
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
            mobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav 
            className="px-4 py-6 bg-black/90 backdrop-blur-xl border-t border-white/10 rounded-b-2xl shadow-xl"
            role="navigation" 
            aria-label="Mobile navigation"
          >
            <ul className="space-y-3">
              {navLinks.map(({ link, name }) => (
                <li key={name}>
                  {link.startsWith('/#') ? (
                    <a 
                      href={link}
                      onClick={(e) => handleNavClick(e, link)}
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent"
                    >
                      <span className="font-medium">{name}</span>
                    </a>
                  ) : (
                    <Link 
                      to={link}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent"
                    >
                      <span className="font-medium">{name}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavBar;