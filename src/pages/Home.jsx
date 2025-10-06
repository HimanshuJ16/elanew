import { useState } from "react";
import Testimonials from "../sections/Testimonials";
import Solutions from "../sections/Solutions";
import Hero from "../sections/Hero";
import ShowcaseSection from "../sections/ShowcaseSection";
import LogoShowcase from "../sections/LogoShowcase";
import LoadingScreen from "../sections/LoadingScreen";

function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      <>
        <Hero />
        <ShowcaseSection />
        {/* <LogoShowcase /> */}
        <Solutions />
        <Testimonials />
      </>
    </>
  );
}

export default Home;