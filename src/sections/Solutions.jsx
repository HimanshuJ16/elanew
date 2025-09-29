// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// import { expCards } from "../constants";
// import TitleHeader from "../components/TitleHeader";
// import GlowCard from "../components/GlowCard";

// gsap.registerPlugin(ScrollTrigger);

// // Define this array in your component file or import it.
// // Define this array in your component file or import it.
// const offeringCards = [
//   {
//     title: "Digital Marketing Strategy",
//     subtitle: "Data-Driven Strategies for Measurable Growth & ROI.",
//     benefits: [
//       "Comprehensive market analysis and audience segmentation.",
//       "Customized multi-channel marketing roadmaps.",
//       "Performance tracking and continuous optimization.",
//       "Clear, transparent reporting on key metrics.",
//     ],
//     testimonial: "Their strategic approach doubled our lead generation in just one quarter. Invaluable partnership!",
//     clientName: "Sarah Johnson",
//     clientTitle: "CEO, Innovate Co.",
//     clientLogo: "/images/client1.png",
//     timelineLogo: "/images/logo1.png",
//   },
//   {
//     title: "Social Media Management",
//     subtitle: "Engaging Content & Community Building Across Platforms.",
//     benefits: [
//       "Compelling content creation tailored to each platform.",
//       "Active community management and audience interaction.",
//       "Strategic campaign planning and execution.",
//       "Brand awareness and lead generation through social channels.",
//     ],
//     testimonial: "Our social engagement is up 300%. They truly understand our brand voice and our audience.",
//     clientName: "David Lee",
//     clientTitle: "Marketing Director, FusionWear",
//     clientLogo: "/images/client2.png",
//     timelineLogo: "/images/logo2.png",
//   },
//   {
//     title: "Search Engine Optimization (SEO)",
//     subtitle: "Improving Visibility & Driving Organic Traffic to Your Website.",
//     benefits: [
//       "In-depth keyword research and on-page optimization.",
//       "High-quality link building and off-page strategies.",
//       "Technical SEO audits for site health and performance.",
//       "Increased organic search rankings and qualified leads.",
//     ],
//     testimonial: "We hit the first page for our top keywords within six months. The results speak for themselves.",
//     clientName: "Emily Chen",
//     clientTitle: "Founder, Bloom & Stem",
//     clientLogo: "/images/client3.png",
//     timelineLogo: "/images/logo3.png",
//   },
//   {
//     title: "Editing & Distribution",
//     subtitle: "Multi-Platform Content Strategy & Rapid Turnaround.",
//     benefits: [
//       "In-house team of 3 editors, supported by 11 freelance collaborators.",
//       "Turn around 3 months' worth of content within 15 days.",
//       "Multi-platform strategy: main brand page, hyperlocal pages for testing.",
//       "Collaborator reposting content to extend reach and recall.",
//     ],
//     testimonial: "Their editing team transformed our raw content into engaging stories. The turnaround time is incredible!",
//     clientName: "Michael Torres",
//     clientTitle: "Content Director, Brand Studios",
//     clientLogo: "/images/client4.png",
//     timelineLogo: "/images/logo1.png",
//   },
//   {
//     title: "Performance Marketing",
//     subtitle: "A/B Testing Approach for Measurable ROI & ROAS.",
//     benefits: [
//       "Classic A/B testing approach to refine creatives and funnels.",
//       "Scale what works from awareness to engagement and conversions.",
//       "Every rupee spent drives measurable ROI while reducing CAC.",
//       "Continuous optimization to improve ROAS across all campaigns.",
//     ],
//     testimonial: "Our ROAS improved by 250% in just 3 months. They know exactly how to scale what works.",
//     clientName: "Lisa Wang",
//     clientTitle: "Performance Marketing Lead, GrowthTech",
//     clientLogo: "/images/client5.png",
//     timelineLogo: "/images/logo2.png",
//   },
//   {
//     title: "Insights & Optimization",
//     subtitle: "Data-Driven Campaign Refinement & Continuous Improvement.",
//     benefits: [
//       "Track CPM, ROAS, CTR, hook rates, engagement metrics, CPL, and ROI.",
//       "Monitor every relevant KPI for comprehensive performance analysis.",
//       "Refresh creatives and reallocate budgets based on data insights.",
//       "Sharpen campaigns continuously for compounding results.",
//     ],
//     testimonial: "Their insights helped us identify bottlenecks we never knew existed. Our campaign performance is now exceptional.",
//     clientName: "Alex Rodriguez",
//     clientTitle: "Analytics Manager, DataFlow Inc.",
//     clientLogo: "/images/client6.png",
//     timelineLogo: "/images/logo3.png",
//   },
// ];
// const Solutions = () => {
//   useGSAP(() => {
//     // Loop through each timeline card and animate them in
//     // as the user scrolls to each card
//     gsap.utils.toArray(".timeline-card").forEach((card) => {
//       // Animate the card coming in from the left
//       // and fade in
//       gsap.from(card, {
//         // Move the card in from the left
//         xPercent: -100,
//         // Make the card invisible at the start
//         opacity: 0,
//         // Set the origin of the animation to the left side of the card
//         transformOrigin: "left left",
//         // Animate over 1 second
//         duration: 1,
//         // Use a power2 ease-in-out curve
//         ease: "power2.inOut",
//         // Trigger the animation when the card is 80% of the way down the screen
//         scrollTrigger: {
//           // The card is the trigger element
//           trigger: card,
//           // Trigger the animation when the card is 80% down the screen
//           start: "top 80%",
//         },
//       });
//     });

//     // Animate the timeline height as the user scrolls
//     // from the top of the timeline to 70% down the screen
//     // The timeline height should scale down from 1 to 0
//     // as the user scrolls up the screen
//     gsap.to(".timeline", {
//       // Set the origin of the animation to the bottom of the timeline
//       transformOrigin: "bottom bottom",
//       // Animate the timeline height over 1 second
//       ease: "power1.inOut",
//       // Trigger the animation when the timeline is at the top of the screen
//       // and end it when the timeline is at 70% down the screen
//       scrollTrigger: {
//         trigger: ".timeline",
//         start: "top center",
//         end: "70% center",
//         // Update the animation as the user scrolls
//         onUpdate: (self) => {
//           // Scale the timeline height as the user scrolls
//           // from 1 to 0 as the user scrolls up the screen
//           gsap.to(".timeline", {
//             scaleY: 1 - self.progress,
//           });
//         },
//       },
//     });

//     // Loop through each expText element and animate them in
//     // as the user scrolls to each text element
//     gsap.utils.toArray(".expText").forEach((text) => {
//       // Animate the text opacity from 0 to 1
//       // and move it from the left to its final position
//       // over 1 second with a power2 ease-in-out curve
//       gsap.from(text, {
//         // Set the opacity of the text to 0
//         opacity: 0,
//         // Move the text from the left to its final position
//         // (xPercent: 0 means the text is at its final position)
//         xPercent: 0,
//         // Animate over 1 second
//         duration: 1,
//         // Use a power2 ease-in-out curve
//         ease: "power2.inOut",
//         // Trigger the animation when the text is 60% down the screen
//         scrollTrigger: {
//           // The text is the trigger element
//           trigger: text,
//           // Trigger the animation when the text is 60% down the screen
//           start: "top 60%",
//         },
//       });
//     }, "<"); // position parameter - insert at the start of the animation
//   }, []);

//   return (
//     <section
//       id="solutions"
//       className="flex-center md:mt-40 mt-20 section-padding xl:px-0"
//     >
//       <div className="w-full h-full md:px-20 px-5">
//         {/* FIX 1: Added a flex container to prevent overlap and manage spacing */}
//         <div className="flex flex-col items-center gap-16">
//           <TitleHeader
//             title=" Our Process"
//           />

//           <div className="relative z-50 w-full">
//             <div className="xl:space-y-32 space-y-20">
//               {offeringCards.map((card) => (
//                 <div key={card.title} className="exp-card-wrapper">
//                   <div className="xl:w-4/6">
//                     <div className="flex items-start">
//                       <div className="timeline-wrapper">
//                         <div className="timeline" />
//                         <div className="gradient-line w-1 h-full" />
//                       </div>
//                       <div className="expText flex xl:gap-20 md:gap-10 gap-5 relative z-20">
//                         <div className="timeline-logo">
//                           {/* This is your company's logo for the timeline */}
//                           <img src={card.timelineLogo} alt="logo" />
//                         </div>
//                         <div>
//                           <h1 className="font-semibold text-3xl text-white">{card.title}</h1>
//                           <p className="my-5 text-white-50">
//                             📈&nbsp;{card.subtitle}
//                           </p>
//                           <p className="text-[#839CB5] italic">Key Benefits</p>
//                           <ul className="list-disc ms-5 mt-5 flex flex-col gap-5 text-white-50">
//                             {card.benefits.map((benefit, index) => (
//                               <li key={index} className="text-lg">
//                                 {benefit}
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//     </section>
//   );
// };

// export default Solutions;

import TitleHeader from "../components/TitleHeader";

const Solutions = () => {
  const processCards = [
    {
      title: "Audience Mapping",
      subtitle:
        "We don't guess, we study. Using focus group discussions, client data, competitor research, social listening on Reddit, Quora, X, and community engagement.",
      benefits: [
        "Identify what your audience actually wants, laughs at, feels inspired by, and buys into",
        "Gather insights from multiple platforms and discussions",
        "Understand behaviors that drive action and loyalty",
      ],
      color: "from-blue-400 to-cyan-400",
      bgColor: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-400/30",
      icon: "🗺️",
    },
    {
      title: "Content Strategy",
      subtitle:
        "Define 'what great looks like' by mapping formats, tones, messages, and ideas that drive recall, laughter, inspiration, and sharing.",
      benefits: [
        "Map out effective content formats and tones",
        "Create content buckets rooted in audience behavior",
        "Develop communication frameworks based on insights",
      ],
      color: "from-purple-400 to-pink-400",
      bgColor: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-400/30",
      icon: "📑",
    },
    {
      title: "Content Creation",
      subtitle:
        "Two production shoots over 7 days, powered by in-house videographers and partnerships with UGC creators, influencers, and professional models.",
      benefits: [
        "Studio setups and lifestyle shoots for multiple styles",
        "In-house and external talent collaboration",
        "Content aligned with defined strategy",
      ],
      color: "from-green-400 to-emerald-400",
      bgColor: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-400/30",
      icon: "🎥",
    },
    {
      title: "Editing & Distribution",
      subtitle:
        "In-house editors + freelancers deliver 3 months of content in 15 days. Multi-platform strategy extends reach through brand pages, hyperlocal pages, and collaborators.",
      benefits: [
        "Fast content turnaround with scalable team",
        "Multi-platform distribution for reach and recall",
        "Testing and niche targeting through hyperlocal pages",
      ],
      color: "from-orange-400 to-red-400",
      bgColor: "from-orange-500/20 to-red-500/20",
      borderColor: "border-orange-400/30",
      icon: "✂️",
    },
    {
      title: "Performance Marketing",
      subtitle:
        "Classic A/B testing approach to refine creatives and funnels, then scale what works. Ensuring every rupee drives measurable ROI.",
      benefits: [
        "A/B test creatives and funnels for refinement",
        "Scale campaigns from awareness to conversions",
        "Reduce CAC and improve ROAS",
      ],
      color: "from-pink-400 to-rose-400",
      bgColor: "from-pink-500/20 to-rose-500/20",
      borderColor: "border-pink-400/30",
      icon: "⚡",
    },
    {
      title: "Insights & Optimization",
      subtitle:
        "Track CPM, ROAS, CTR, hook rates, CPL, ROI, and more. Refresh creatives, reallocate budgets, and sharpen campaigns continuously.",
      benefits: [
        "Monitor all key KPIs across campaigns",
        "Continuously optimize creatives and budgets",
        "Sharpen strategies for maximum performance",
      ],
      color: "from-yellow-400 to-amber-400",
      bgColor: "from-yellow-500/20 to-amber-500/20",
      borderColor: "border-yellow-400/30",
      icon: "📈",
    },
  ];

  return (
    <section
      id="solutions"
      className="relative flex flex-col items-center py-10 md:py-16 px-4 md:px-8 overflow-hidden bg-black min-h-screen"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/20 to-black" />

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <TitleHeader
          title="Our Process"
          subtitle="A systematic approach to digital transformation that delivers measurable results"
        />
        {/* Static vertical timeline */}
        <div className="relative mt-16">
          {/* Timeline container for dynamic height */}
          <div className="relative flex flex-col gap-32 w-full">
            {/* Dynamic vertical line */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-400 via-purple-400 via-green-400 via-orange-400 via-pink-400 to-yellow-400 opacity-60"
              style={{
                top: "40px",
                height: `calc(100% - 80px)`,
              }}
            />
            {processCards.map((card, i) => (
              <div
                key={card.title}
                className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"} relative md:items-center`}
              >
                {/* Center dot, top-aligned on mobile */}
                <div
                  className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-lg border-4 border-black flex items-center justify-center z-10 md:top-1/2 md:-translate-y-1/2 top-[-17px]"
                >
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-gray-800 to-gray-600" />
                </div>
                {/* Card content */}
                <div
                  className={`relative w-full md:w-[45%] p-6 bg-gradient-to-br ${card.bgColor} border-2 ${card.borderColor} backdrop-blur-sm rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-r ${card.color} flex items-center justify-center text-lg`}
                    >
                      {card.icon}
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                        {card.title}
                      </h3>
                      <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80">
                        Step {i + 1}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">{card.subtitle}</p>
                  <ul className="space-y-2">
                    {card.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-200">
                        <div
                          className={`w-1 h-1 rounded-full bg-gradient-to-r ${card.color} mt-2 flex-shrink-0`}
                        />
                        <span className="text-xs leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
