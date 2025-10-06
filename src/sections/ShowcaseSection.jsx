// import { useRef } from "react";
// import { gsap } from "gsap";
// import { useGSAP } from "@gsap/react";

// // Icon components
// const IndustryIcon = ({ type }) => {
//   const icons = {
//     alcobev: (
//       <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
//         <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V4z"/>
//       </svg>
//     ),
//     restaurant: (
//       <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
//         <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
//       </svg>
//     ),
//     d2c: (
//       <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
//         <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM6 10a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" clipRule="evenodd"/>
//       </svg>
//     ),
//     legacy: (
//       <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
//         <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 011.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 011.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd"/>
//       </svg>
//     ),
//     authors: (
//       <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
//         <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V4.804z"/>
//       </svg>
//     ),
//     doctors: (
//       <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
//         <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
//       </svg>
//     ),
//   };
//   return icons[type] || icons.d2c;
// };

// const AppShowcase = () => {
//   const sectionRef = useRef(null);

//   useGSAP(() => {
//     // Only keep hover interactions - no loading animations
//     const cards = gsap.utils.toArray('.industry-card');
    
//     cards.forEach((card) => {
//       const icon = card.querySelector('.industry-icon');
//       const badge = card.querySelector('.industry-badge');
//       const contentSections = card.querySelectorAll('.content-section');
//       const accentLine = card.querySelector('.accent-line');
//       const glowEffect = card.querySelector('.glow-effect');

//       // Magnetic hover effect
//       let xTo = gsap.quickTo(card, "x", { duration: 0.6, ease: "power3" });
//       let yTo = gsap.quickTo(card, "y", { duration: 0.6, ease: "power3" });
      
//       card.addEventListener('mousemove', (e) => {
//         const rect = card.getBoundingClientRect();
//         const x = e.clientX - rect.left - rect.width / 2;
//         const y = e.clientY - rect.top - rect.height / 2;
        
//         xTo(x * 0.05);
//         yTo(y * 0.05);
//       });
      
//       card.addEventListener('mouseleave', () => {
//         xTo(0);
//         yTo(0);
//       });

//       // Hover interactions
//       card.addEventListener('mouseenter', () => {
//         gsap.to(card, {
//           z: 50,
//           scale: 1.05,
//           rotationX: 2,
//           rotationY: 2,
//           duration: 0.5,
//           ease: "power2.out"
//         });
        
//         if (icon) {
//           gsap.to(icon, {
//             rotation: 360,
//             scale: 1.2,
//             duration: 0.6,
//             ease: "back.out(2)"
//           });
//         }

//         if (badge) {
//           gsap.to(badge, {
//             scale: 1.1,
//             duration: 0.3,
//             ease: "power2.out"
//           });
//         }

//         if (contentSections.length) {
//           gsap.to(contentSections, {
//             x: 5,
//             backgroundColor: "rgba(31, 41, 55, 0.9)",
//             duration: 0.4,
//             stagger: 0.1,
//             ease: "power2.out"
//           });
//         }

//         if (accentLine) {
//           gsap.to(accentLine, {
//             scaleX: 1,
//             duration: 0.5,
//             ease: "power2.out"
//           });
//         }

//         if (glowEffect) {
//           gsap.to(glowEffect, {
//             opacity: 1,
//             scale: 1.5,
//             duration: 0.6,
//             ease: "power2.out"
//           });
//         }
//       });
      
//       card.addEventListener('mouseleave', () => {
//         gsap.to(card, {
//           z: 0,
//           scale: 1,
//           rotationX: 0,
//           rotationY: 0,
//           duration: 0.5,
//           ease: "power2.out"
//         });
        
//         if (icon) {
//           gsap.to(icon, {
//             rotation: 0,
//             scale: 1,
//             duration: 0.5,
//             ease: "power2.out"
//           });
//         }

//         if (badge) {
//           gsap.to(badge, {
//             scale: 1,
//             duration: 0.3,
//             ease: "power2.out"
//           });
//         }

//         if (contentSections.length) {
//           gsap.to(contentSections, {
//             x: 0,
//             backgroundColor: "rgba(31, 41, 55, 0.5)",
//             duration: 0.4,
//             stagger: 0.05,
//             ease: "power2.out"
//           });
//         }

//         if (accentLine) {
//           gsap.to(accentLine, {
//             scaleX: 0,
//             duration: 0.5,
//             ease: "power2.out"
//           });
//         }

//         if (glowEffect) {
//           gsap.to(glowEffect, {
//             opacity: 0,
//             scale: 1,
//             duration: 0.6,
//             ease: "power2.out"
//           });
//         }
//       });
//     });
//   }, { scope: sectionRef });

//   const industries = [
//     { type: "d2c", title: "D2C Brands", tag: "Consultancy", color: "purple", challenge: "Connecting with Gen Z through content, distribution, and ad funnels.", solution: "End-to-end marketing strategy, sharp creatives, influencer/UGC integration, and performance campaigns." },
//     { type: "alcobev", title: "Alcobev Brands", tag: "Project-Based", color: "orange", challenge: "Crowded markets where creating buzz and loyalty is difficult.", solution: "Creative campaigns, cultural activations, UGC integration, and performance marketing." },
//     { type: "authors", title: "Authors & Thought Leaders", tag: "Retainer", color: "indigo", challenge: "Building recall and credibility beyond a book launch.", solution: "Brand positioning, brand engines, content buckets, high-converting video content, and full-funnel campaigns." },
//     { type: "restaurant", title: "Restaurants", tag: "Sprint", color: "green", challenge: "Generating awareness and repeat customers in competitive spaces.", solution: "Campaign-led storytelling, localized activations, video/photo content, and targeted awareness ads." },    
//     { type: "doctors", title: "Doctors", tag: "Retainer", color: "teal", challenge: "Turning medical expertise into trust and consistent patient acquisition.", solution: "Audience mapping, positioning frameworks, credibility-led content, ad funnels, and continuous optimization." },
//     { type: "legacy", title: "Legacy Brands", tag: "Retainer", color: "red", challenge: "Shifting from distribution-led growth to relevance with younger audiences.", solution: "Refreshed communication strategy, recall-first campaigns, content distribution, and micro-campaigns." },
//   ];

//   const getColorClasses = (color) => {
//     const colors = {
//       orange: { 
//         border: "hover:border-orange-500/70", 
//         shadow: "hover:shadow-orange-500/30", 
//         icon: "from-orange-500 via-orange-600 to-orange-700", 
//         text: "group-hover:text-orange-50", 
//         accent: "text-orange-400",
//         glow: "bg-orange-500/30",
//         badgeBorder: "border-orange-500/30 group-hover:border-orange-500/60",
//         badgeBg: "group-hover:bg-orange-500/20",
//         leftBorder: "from-orange-500 via-orange-600 to-orange-700"
//       },
//       blue: { 
//         border: "hover:border-blue-500/70", 
//         shadow: "hover:shadow-blue-500/30", 
//         icon: "from-blue-500 via-blue-600 to-blue-700", 
//         text: "group-hover:text-blue-50", 
//         accent: "text-blue-400",
//         glow: "bg-blue-500/30",
//         badgeBorder: "border-blue-500/30 group-hover:border-blue-500/60",
//         badgeBg: "group-hover:bg-blue-500/20",
//         leftBorder: "from-blue-500 via-blue-600 to-blue-700"
//       },
//       green: { 
//         border: "hover:border-green-500/70", 
//         shadow: "hover:shadow-green-500/30", 
//         icon: "from-green-500 via-green-600 to-green-700", 
//         text: "group-hover:text-green-50", 
//         accent: "text-green-400",
//         glow: "bg-green-500/30",
//         badgeBorder: "border-green-500/30 group-hover:border-green-500/60",
//         badgeBg: "group-hover:bg-green-500/20",
//         leftBorder: "from-green-500 via-green-600 to-green-700"
//       },
//       purple: { 
//         border: "hover:border-purple-500/70", 
//         shadow: "hover:shadow-purple-500/30", 
//         icon: "from-purple-500 via-purple-600 to-purple-700", 
//         text: "group-hover:text-purple-50", 
//         accent: "text-purple-400",
//         glow: "bg-purple-500/30",
//         badgeBorder: "border-purple-500/30 group-hover:border-purple-500/60",
//         badgeBg: "group-hover:bg-purple-500/20",
//         leftBorder: "from-purple-500 via-purple-600 to-purple-700"
//       },
//       red: { 
//         border: "hover:border-red-500/70", 
//         shadow: "hover:shadow-red-500/30", 
//         icon: "from-red-500 via-red-600 to-red-700", 
//         text: "group-hover:text-red-50", 
//         accent: "text-red-400",
//         glow: "bg-red-500/30",
//         badgeBorder: "border-red-500/30 group-hover:border-red-500/60",
//         badgeBg: "group-hover:bg-red-500/20",
//         leftBorder: "from-red-500 via-red-600 to-red-700"
//       },
//       indigo: { 
//         border: "hover:border-indigo-500/70", 
//         shadow: "hover:shadow-indigo-500/30", 
//         icon: "from-indigo-500 via-indigo-600 to-indigo-700", 
//         text: "group-hover:text-indigo-50", 
//         accent: "text-indigo-400",
//         glow: "bg-indigo-500/30",
//         badgeBorder: "border-indigo-500/30 group-hover:border-indigo-500/60",
//         badgeBg: "group-hover:bg-indigo-500/20",
//         leftBorder: "from-indigo-500 via-indigo-600 to-indigo-700"
//       },
//       teal: { 
//         border: "hover:border-teal-500/70", 
//         shadow: "hover:shadow-teal-500/30", 
//         icon: "from-teal-500 via-teal-600 to-teal-700", 
//         text: "group-hover:text-teal-50", 
//         accent: "text-teal-400",
//         glow: "bg-teal-500/30",
//         badgeBorder: "border-teal-500/30 group-hover:border-teal-500/60",
//         badgeBg: "group-hover:bg-teal-500/20",
//         leftBorder: "from-teal-500 via-teal-600 to-teal-700"
//       },
//       yellow: { 
//         border: "hover:border-yellow-500/70", 
//         shadow: "hover:shadow-yellow-500/30", 
//         icon: "from-yellow-500 via-yellow-600 to-yellow-700", 
//         text: "group-hover:text-yellow-50", 
//         accent: "text-yellow-400",
//         glow: "bg-yellow-500/30",
//         badgeBorder: "border-yellow-500/30 group-hover:border-yellow-500/60",
//         badgeBg: "group-hover:bg-yellow-500/20",
//         leftBorder: "from-yellow-500 via-yellow-600 to-yellow-700"
//       }
//     };
//     return colors[color] || colors.orange;
//   };

//   const IndustryCard = ({ industry, index }) => {
//     const { type, title, tag, color, challenge, solution } = industry;
//     const colorClasses = getColorClasses(color);
    
//     return (
//       <div 
//         className={`industry-card group relative overflow-hidden bg-gradient-to-br from-gray-900/90 via-gray-800/60 to-gray-900/90 backdrop-blur-2xl border border-gray-700/50 rounded-3xl p-7 h-full transition-all duration-500 ${colorClasses.border} ${colorClasses.shadow} cursor-pointer`}
//         style={{ 
//           transformStyle: "preserve-3d",
//           perspective: "1000px"
//         }}
//       >
//         <div className={`glow-effect absolute inset-0 ${colorClasses.glow} blur-3xl opacity-0 transition-all duration-500`}></div>
        
//         <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
        
//         <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
//           <div className={`absolute inset-0 bg-gradient-to-r ${colorClasses.icon} opacity-20 blur-xl`}></div>
//         </div>
        
//         <div className="relative z-10 h-full flex flex-col" style={{ transform: "translateZ(20px)" }}>
//           <div className="flex items-center justify-between mb-5">
//             <div className={`industry-icon relative flex items-center justify-center w-14 h-14 bg-gradient-to-br ${colorClasses.icon} rounded-2xl shadow-2xl transform transition-all duration-500 group-hover:shadow-2xl`}>
//               <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <IndustryIcon type={type} />
//             </div>
//             <span className={`industry-badge px-4 py-1.5 bg-gray-800/80 border ${colorClasses.badgeBorder} ${colorClasses.accent} text-xs font-semibold rounded-full backdrop-blur-sm transition-all duration-300 ${colorClasses.badgeBg}`}>
//               {tag}
//             </span>
//           </div>

//           <h3 className={`text-xl font-bold text-white mb-5 transition-all duration-500 ${colorClasses.text} leading-tight`}>
//             {title}
//           </h3>

//           <div className="space-y-4 flex-1">
//             <div className="content-section relative p-5 bg-gray-800/50 rounded-2xl border border-gray-700/40 transition-all duration-500 group-hover:border-gray-600/60 overflow-hidden">
//               <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${colorClasses.leftBorder} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
//               <div className="flex items-start space-x-3">
//                 <div className={`w-1.5 h-1.5 mt-2 ${colorClasses.glow} rounded-full flex-shrink-0 animate-pulse`}></div>
//                 <div>
//                   <span className={`block mb-2.5 font-bold text-xs uppercase tracking-wider ${colorClasses.accent}`}>
//                     Challenge
//                   </span>
//                   <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
//                     {challenge}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="content-section relative p-5 bg-gray-800/50 rounded-2xl border border-gray-700/40 transition-all duration-500 group-hover:border-gray-600/60 overflow-hidden">
//               <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${colorClasses.leftBorder} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
//               <div className="flex items-start space-x-3">
//                 <div className={`w-1.5 h-1.5 mt-2 ${colorClasses.glow} rounded-full flex-shrink-0 animate-pulse`}></div>
//                 <div>
//                   <span className={`block mb-2.5 font-bold text-xs uppercase tracking-wider ${colorClasses.accent}`}>
//                     Solution
//                   </span>
//                   <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
//                     {solution}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="relative h-2 mt-6 overflow-hidden rounded-full bg-gray-800/50">
//             <div className={`accent-line absolute inset-0 bg-gradient-to-r ${colorClasses.icon} rounded-full origin-left scale-x-0 transition-transform duration-700`}></div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <section 
//       id="work" 
//       ref={sectionRef} 
//       className="app-showcase relative overflow-hidden bg-gradient-to-b from-black via-gray-950 to-black py-20 lg:py-32"
//     >
//       {/* Static background - no animations */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-purple-600/15 to-pink-600/15 rounded-full blur-3xl"></div>
//         <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-br from-blue-600/15 to-cyan-600/15 rounded-full blur-3xl"></div>
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
        
//         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Title section - no animations */}
//         <div className="text-center mb-20 lg:mb-28">
//           <h2 className="section-title text-5xl md:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent leading-tight">
//             Who We Do It For
//           </h2>
//           <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
//             Tailored solutions for diverse industries, driving growth through innovative marketing strategies.
//           </p>
//         </div>

//         {/* Card grid - loads instantly */}
//         <div className="grid-container">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
//             {industries.map((industry, index) => (
//               <IndustryCard 
//                 key={`${industry.type}-${index}`}
//                 industry={industry} 
//                 index={index}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AppShowcase;

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

// Icon components (keeping your existing icons)
const IndustryIcon = ({ type }) => {
  const icons = {
    alcobev: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V4z"/>
      </svg>
    ),
    restaurant: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
      </svg>
    ),
    d2c: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM6 10a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" clipRule="evenodd"/>
      </svg>
    ),
    legacy: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 011.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 011.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd"/>
      </svg>
    ),
    authors: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V4.804z"/>
      </svg>
    ),
    doctors: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
      </svg>
    ),
  };
  return icons[type] || icons.d2c;
};

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    const carousel = carouselRef.current;
    const cards = cardsRef.current;
    
    if (!carousel || cards.length === 0) return;

    // Calculate carousel boundaries
    const getMaxX = () => {
      const carouselWidth = carousel.scrollWidth;
      const containerWidth = carousel.parentElement.offsetWidth;
      return -(carouselWidth - containerWidth);
    };

    // Create draggable carousel with inertia
    const draggableInstance = Draggable.create(carousel, {
      type: "x",
      bounds: {
        minX: getMaxX(),
        maxX: 0
      },
      inertia: true,
      edgeResistance: 0.65,
      throwProps: true,
      snap: {
        x: (endValue) => {
          // Snap to nearest card
          const cardWidth = cards[0].offsetWidth + 32; // card width + gap
          return Math.round(endValue / cardWidth) * cardWidth;
        }
      },
      onDrag: function() {
        // Add subtle scale effect while dragging
        gsap.to(cards, {
          scale: 0.95,
          duration: 0.3
        });
      },
      onDragEnd: function() {
        gsap.to(cards, {
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.2)"
        });
      }
    })[0];

    // Auto-play carousel (optional - remove if you don't want auto-scroll)
    let autoplayTween = gsap.to(carousel, {
      x: getMaxX(),
      duration: 30,
      ease: "none",
      repeat: -1,
      yoyo: true,
      paused: true
    });

    // Pause autoplay on hover
    carousel.addEventListener("mouseenter", () => autoplayTween.pause());
    carousel.addEventListener("mouseleave", () => autoplayTween.play());

    // Individual card hover interactions
    cards.forEach((card) => {
      const icon = card.querySelector('.industry-icon');
      const badge = card.querySelector('.industry-badge');
      const contentSections = card.querySelectorAll('.content-section');
      const accentLine = card.querySelector('.accent-line');
      const glowEffect = card.querySelector('.glow-effect');

      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -10,
          scale: 1.05,
          rotationY: 2,
          duration: 0.5,
          ease: "power2.out"
        });
        
        if (icon) {
          gsap.to(icon, {
            rotation: 360,
            scale: 1.2,
            duration: 0.6,
            ease: "back.out(2)"
          });
        }

        if (badge) {
          gsap.to(badge, {
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out"
          });
        }

        if (contentSections.length) {
          gsap.to(contentSections, {
            x: 5,
            backgroundColor: "rgba(31, 41, 55, 0.9)",
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.out"
          });
        }

        if (accentLine) {
          gsap.to(accentLine, {
            scaleX: 1,
            duration: 0.5,
            ease: "power2.out"
          });
        }

        if (glowEffect) {
          gsap.to(glowEffect, {
            opacity: 1,
            scale: 1.5,
            duration: 0.6,
            ease: "power2.out"
          });
        }
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 0.5,
          ease: "power2.out"
        });
        
        if (icon) {
          gsap.to(icon, {
            rotation: 0,
            scale: 1,
            duration: 0.5,
            ease: "power2.out"
          });
        }

        if (badge) {
          gsap.to(badge, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        }

        if (contentSections.length) {
          gsap.to(contentSections, {
            x: 0,
            backgroundColor: "rgba(31, 41, 55, 0.5)",
            duration: 0.4,
            stagger: 0.05,
            ease: "power2.out"
          });
        }

        if (accentLine) {
          gsap.to(accentLine, {
            scaleX: 0,
            duration: 0.5,
            ease: "power2.out"
          });
        }

        if (glowEffect) {
          gsap.to(glowEffect, {
            opacity: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out"
          });
        }
      });
    });

    // Update bounds on window resize
    const handleResize = () => {
      draggableInstance.applyBounds({
        minX: getMaxX(),
        maxX: 0
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      draggableInstance.kill();
      autoplayTween.kill();
    };
  }, { scope: sectionRef });

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
        border: "hover:border-orange-500/70", 
        shadow: "hover:shadow-orange-500/30", 
        icon: "from-orange-500 via-orange-600 to-orange-700", 
        text: "group-hover:text-orange-50", 
        accent: "text-orange-400",
        glow: "bg-orange-500/30",
        badgeBorder: "border-orange-500/30 group-hover:border-orange-500/60",
        badgeBg: "group-hover:bg-orange-500/20",
        leftBorder: "from-orange-500 via-orange-600 to-orange-700"
      },
      blue: { 
        border: "hover:border-blue-500/70", 
        shadow: "hover:shadow-blue-500/30", 
        icon: "from-blue-500 via-blue-600 to-blue-700", 
        text: "group-hover:text-blue-50", 
        accent: "text-blue-400",
        glow: "bg-blue-500/30",
        badgeBorder: "border-blue-500/30 group-hover:border-blue-500/60",
        badgeBg: "group-hover:bg-blue-500/20",
        leftBorder: "from-blue-500 via-blue-600 to-blue-700"
      },
      green: { 
        border: "hover:border-green-500/70", 
        shadow: "hover:shadow-green-500/30", 
        icon: "from-green-500 via-green-600 to-green-700", 
        text: "group-hover:text-green-50", 
        accent: "text-green-400",
        glow: "bg-green-500/30",
        badgeBorder: "border-green-500/30 group-hover:border-green-500/60",
        badgeBg: "group-hover:bg-green-500/20",
        leftBorder: "from-green-500 via-green-600 to-green-700"
      },
      purple: { 
        border: "hover:border-purple-500/70", 
        shadow: "hover:shadow-purple-500/30", 
        icon: "from-purple-500 via-purple-600 to-purple-700", 
        text: "group-hover:text-purple-50", 
        accent: "text-purple-400",
        glow: "bg-purple-500/30",
        badgeBorder: "border-purple-500/30 group-hover:border-purple-500/60",
        badgeBg: "group-hover:bg-purple-500/20",
        leftBorder: "from-purple-500 via-purple-600 to-purple-700"
      },
      red: { 
        border: "hover:border-red-500/70", 
        shadow: "hover:shadow-red-500/30", 
        icon: "from-red-500 via-red-600 to-red-700", 
        text: "group-hover:text-red-50", 
        accent: "text-red-400",
        glow: "bg-red-500/30",
        badgeBorder: "border-red-500/30 group-hover:border-red-500/60",
        badgeBg: "group-hover:bg-red-500/20",
        leftBorder: "from-red-500 via-red-600 to-red-700"
      },
      indigo: { 
        border: "hover:border-indigo-500/70", 
        shadow: "hover:shadow-indigo-500/30", 
        icon: "from-indigo-500 via-indigo-600 to-indigo-700", 
        text: "group-hover:text-indigo-50", 
        accent: "text-indigo-400",
        glow: "bg-indigo-500/30",
        badgeBorder: "border-indigo-500/30 group-hover:border-indigo-500/60",
        badgeBg: "group-hover:bg-indigo-500/20",
        leftBorder: "from-indigo-500 via-indigo-600 to-indigo-700"
      },
      teal: { 
        border: "hover:border-teal-500/70", 
        shadow: "hover:shadow-teal-500/30", 
        icon: "from-teal-500 via-teal-600 to-teal-700", 
        text: "group-hover:text-teal-50", 
        accent: "text-teal-400",
        glow: "bg-teal-500/30",
        badgeBorder: "border-teal-500/30 group-hover:border-teal-500/60",
        badgeBg: "group-hover:bg-teal-500/20",
        leftBorder: "from-teal-500 via-teal-600 to-teal-700"
      },
      yellow: { 
        border: "hover:border-yellow-500/70", 
        shadow: "hover:shadow-yellow-500/30", 
        icon: "from-yellow-500 via-yellow-600 to-yellow-700", 
        text: "group-hover:text-yellow-50", 
        accent: "text-yellow-400",
        glow: "bg-yellow-500/30",
        badgeBorder: "border-yellow-500/30 group-hover:border-yellow-500/60",
        badgeBg: "group-hover:bg-yellow-500/20",
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
        className={`industry-card group relative overflow-hidden bg-gradient-to-br from-gray-900/90 via-gray-800/60 to-gray-900/90 backdrop-blur-2xl border border-gray-700/50 rounded-3xl p-7 transition-all duration-500 ${colorClasses.border} ${colorClasses.shadow} cursor-grab active:cursor-grabbing flex-shrink-0 w-[350px] lg:w-[400px]`}
        style={{ 
          transformStyle: "preserve-3d",
          perspective: "1000px"
        }}
      >
        <div className={`glow-effect absolute inset-0 ${colorClasses.glow} blur-3xl opacity-0 transition-all duration-500`}></div>
        
        <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
        
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className={`absolute inset-0 bg-gradient-to-r ${colorClasses.icon} opacity-20 blur-xl`}></div>
        </div>
        
        <div className="relative z-10 h-full flex flex-col" style={{ transform: "translateZ(20px)" }}>
          <div className="flex items-center justify-between mb-5">
            <div className={`industry-icon relative flex items-center justify-center w-14 h-14 bg-gradient-to-br ${colorClasses.icon} rounded-2xl shadow-2xl transform transition-all duration-500 group-hover:shadow-2xl`}>
              <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <IndustryIcon type={type} />
            </div>
            <span className={`industry-badge px-4 py-1.5 bg-gray-800/80 border ${colorClasses.badgeBorder} ${colorClasses.accent} text-xs font-semibold rounded-full backdrop-blur-sm transition-all duration-300 ${colorClasses.badgeBg}`}>
              {tag}
            </span>
          </div>

          <h3 className={`text-xl font-bold text-white mb-5 transition-all duration-500 ${colorClasses.text} leading-tight`}>
            {title}
          </h3>

          <div className="space-y-4 flex-1">
            <div className="content-section relative p-5 bg-gray-800/50 rounded-2xl border border-gray-700/40 transition-all duration-500 group-hover:border-gray-600/60 overflow-hidden">
              <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${colorClasses.leftBorder} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              <div className="flex items-start space-x-3">
                <div className={`w-1.5 h-1.5 mt-2 ${colorClasses.glow} rounded-full flex-shrink-0 animate-pulse`}></div>
                <div>
                  <span className={`block mb-2.5 font-bold text-xs uppercase tracking-wider ${colorClasses.accent}`}>
                    Challenge
                  </span>
                  <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {challenge}
                  </p>
                </div>
              </div>
            </div>

            <div className="content-section relative p-5 bg-gray-800/50 rounded-2xl border border-gray-700/40 transition-all duration-500 group-hover:border-gray-600/60 overflow-hidden">
              <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${colorClasses.leftBorder} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              <div className="flex items-start space-x-3">
                <div className={`w-1.5 h-1.5 mt-2 ${colorClasses.glow} rounded-full flex-shrink-0 animate-pulse`}></div>
                <div>
                  <span className={`block mb-2.5 font-bold text-xs uppercase tracking-wider ${colorClasses.accent}`}>
                    Solution
                  </span>
                  <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {solution}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-2 mt-6 overflow-hidden rounded-full bg-gray-800/50">
            <div className={`accent-line absolute inset-0 bg-gradient-to-r ${colorClasses.icon} rounded-full origin-left scale-x-0 transition-transform duration-700`}></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section 
      id="work" 
      ref={sectionRef} 
      className="app-showcase relative overflow-hidden bg-gradient-to-b from-black via-gray-950 to-black py-20 lg:py-32"
    >
      {/* Static background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-purple-600/15 to-pink-600/15 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-br from-blue-600/15 to-cyan-600/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
        
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title section */}
        <div className="text-center mb-20 lg:mb-28">
          <h2 className="section-title text-5xl md:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent leading-tight">
            Who We Do It For
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Tailored solutions for diverse industries, driving growth through innovative marketing strategies.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="carousel-container relative overflow-hidden">
          <div 
            ref={carouselRef}
            className="carousel-track flex gap-8 py-4"
          >
            {industries.map((industry, index) => (
              <IndustryCard 
                key={`${industry.type}-${index}`}
                industry={industry} 
                index={index}
              />
            ))}
          </div>
          
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent pointer-events-none z-20"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent pointer-events-none z-20"></div>
        </div>

        {/* Drag hint */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Drag to explore
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AppShowcase;
