import { socialImgs } from "../constants";
import elationLogo from "../../public/images/elationlogo.jpg";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-gray-950 via-black to-gray-950">
      {/* Glassmorphism Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -right-32 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 mb-16">
          
          {/* Company Info - Enhanced */}
          <div className="lg:col-span-1 lg:order-1">
            <div className="group">
              {/* Logo Section */}
              <div className="flex items-center gap-4 mb-8">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                  <img
                    src={elationLogo}
                    alt="Elation Logo"
                    className="h-16 w-14 lg:h-20 lg:w-16 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div>
                  <h3 className="text-2xl lg:text-3xl font-black text-white mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    Elation
                  </h3>
                  <p className="text-gray-400 text-sm font-medium">Digital Marketing Excellence</p>
                </div>
              </div>

              {/* Company Description */}
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-md">
                Driving growth through innovative marketing strategies and cutting-edge digital solutions for modern businesses.
              </p>
            </div>
          </div>

          {/* Contact Information - Enhanced - Moved to middle column on large screens */}
          <div className="lg:col-span-1 lg:order-2">
            <div className="space-y-2">
              {/* Location */}
              <div className="group flex items-center gap-4 p-3 rounded-xl transition-all duration-300">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 21s7-4.438 7-10a7 7 0 1 0-14 0c0 5.562 7 10 7 10z" />
                    <circle cx="12" cy="11" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm font-medium">Location</p>
                  <p className="text-white font-semibold">New Delhi, India</p>
                </div>
              </div>

              {/* Email */}
              <a
                href="mailto:info@elation.digital"
                className="group flex items-center gap-4 p-3 rounded-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M4 6h16v12H4z" />
                    <path d="m4 7 8 6 8-6" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm font-medium">Email</p>
                  <p className="text-white font-semibold group-hover:text-blue-300 transition-colors duration-300">hi@elation.agency</p>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+919097290982"
                className="group flex items-center gap-4 p-3 rounded-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M22 16.92v2a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h2a2 2 0 0 1 2 1.72c.12.9.32 1.77.59 2.61a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.47-1.11a2 2 0 0 1 2.11-.45c.84.27 1.71.47 2.61.59A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm font-medium">Phone</p>
                  <p className="text-white font-semibold group-hover:text-green-300 transition-colors duration-300">+91-90972 90982</p>
                </div>
              </a>
            </div>
          </div>

          {/* Social Media Section - Enhanced - Moved to right column */}
          <div className="lg:col-span-1 lg:order-3">
            <div className="flex flex-col items-center lg:items-end h-full justify-center">
              <h4 className="text-xl font-bold text-white mb-6 relative">
                Connect With Us
                <div className="absolute -bottom-2 left-1/2 lg:right-0 lg:left-auto w-8 h-1 bg-gradient-to-r from-pink-500 to-red-500 rounded-full transform -translate-x-1/2 lg:translate-x-0"></div>
              </h4>
              
              {/* Enhanced Social Icons */}
              <div className="flex justify-center lg:justify-end gap-4">
                {socialImgs.map((socialImg, index) => (
                  socialImg.link ? (
                    <a
                      key={index}
                      href={socialImg.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 hover:scale-110 transition-all duration-300 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <img 
                        src={socialImg.imgPath} 
                        alt="social icon" 
                        className="w-6 h-6 relative z-10 filter brightness-75 group-hover:brightness-100 transition-all duration-300"
                      />
                    </a>
                  ) : (
                    <div key={index} className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                      <img src={socialImg.imgPath} alt="social icon" className="w-6 h-6 opacity-50" />
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Glassmorphism Divider */}
        <div className="relative mb-12">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-px bg-gradient-to-r from-purple-500 to-pink-500"></div>
        </div>

        {/* Bottom Section - Enhanced */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 text-sm">
          {/* Copyright */}
          <div className="flex items-center gap-2">
            <p className="text-gray-400">
              © {new Date().getFullYear()} <span className="text-white font-semibold">Elation</span>. All rights reserved.
            </p>
          </div>
          
          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { name: "Privacy Policy", href: "#privacy" },
              { name: "Terms of Service", href: "#terms" },
              { name: "Refund Policy", href: "#refund" }
            ].map((link, index) => (
              <a 
                key={index}
                href={link.href} 
                className="text-gray-400 hover:text-white transition-colors duration-300 relative group"
              >
                {link.name}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></div>
              </a>
            ))}
          </div>
          <div className="text-center lg:text-right">
            <p className="text-gray-400 mb-3 justify-center align-middle text-center">
              Made with <span className="text-red-500 animate-pulse">❤</span> by
            </p>

            <div className="flex items-center justify-center lg:justify-end gap-6">
              {/* Developer 1 - Himanshu Jangir */}
              <div className="flex flex-col items-center gap-2">
                <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-semibold text-md">
                  Himanshu Jangir
                </span>
                <div className="flex gap-1">
                  <a
                    href="https://www.linkedin.com/in/himanshujangir16"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2 rounded-lg transition-all duration-300 hover:scale-110"
                    aria-label="Himanshu LinkedIn"
                  >
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0H5C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zM7.119 20.452H3.558V9.039h3.561v11.413zM5.339 7.557a2.063 2.063 0 1 1 0-4.126 2.063 2.063 0 0 1 0 4.126zM20.452 20.452h-3.559v-5.556c0-1.326-.024-3.03-1.848-3.03-1.85 0-2.133 1.446-2.133 2.939v5.647h-3.558V9.039h3.414v1.561h.049c.476-.9 1.637-1.848 3.37-1.848 3.606 0 4.271 2.373 4.271 5.457v6.243z"/>
                    </svg>
                  </a>
                  {/* <a
                    href="https://wa.me/+919990339096"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2 rounded-lg transition-all duration-300 hover:scale-110"
                    aria-label="Himanshu WhatsApp"
                  >
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-green-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </a> */}
                  <a
                    href="https://himanshuj16.github.io/portfolio/about"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2 rounded-lg transition-all duration-300 hover:scale-110"
                    aria-label="Himanshu Website"
                  >
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Divider */}
              <div className="h-12 w-px bg-gradient-to-b from-transparent via-gray-600 to-transparent"></div>

              {/* Developer 2 - Yash Chopra */}
              <div className="flex flex-col items-center gap-2">
                <span className="text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text font-semibold text-md">
                  Yash Chopra
                </span>
                <div className="flex gap-1">
                  <a
                    href="https://www.linkedin.com/in/yash-chopra-3b6416303"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2 rounded-lg transition-all duration-300 hover:scale-110"
                    aria-label="Yash LinkedIn"
                  >
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0H5C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zM7.119 20.452H3.558V9.039h3.561v11.413zM5.339 7.557a2.063 2.063 0 1 1 0-4.126 2.063 2.063 0 0 1 0 4.126zM20.452 20.452h-3.559v-5.556c0-1.326-.024-3.03-1.848-3.03-1.85 0-2.133 1.446-2.133 2.939v5.647h-3.558V9.039h3.414v1.561h.049c.476-.9 1.637-1.848 3.37-1.848 3.606 0 4.271 2.373 4.271 5.457v6.243z"/>
                    </svg>
                  </a>
                  {/* <a
                    href="https://wa.me/+919205061898"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2 rounded-lg transition-all duration-300 hover:scale-110"
                    aria-label="Yash WhatsApp"
                  >
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-green-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-110 group"
        aria-label="Scroll to top"
      >
        <svg className="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;
