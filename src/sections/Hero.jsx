import AnimatedCounter from "../components/AnimatedCounter";
import HeroLanding from "../components/HeroLanding";
import ServiceSlider from '../components/ServerSlider';
import ShowCase from "../components/ShowCase";

const Hero = () => {
  return (
    <section id="hero" className="relative overflow-hidden">
      <HeroLanding />
      <ShowCase />
      <AnimatedCounter />
      <ServiceSlider />

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        /* Custom scrollbar for modern look */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
        }  
      `}</style>
    </section>
  );
};

export default Hero;
 