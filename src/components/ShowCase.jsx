import { motion } from "framer-motion";
import CircularGallery from "./CircularGallery";
import MobileVideoGrid from "./MobileVideoGrid";
import AppleCardsCarouselDemo from "./AppleCards";

const ShowCase = () => {
  return (
    <div className="relative w-full">
      <div className=" mx-auto px-5">
        <motion.h2 
          className="text-4xl lg:text-5xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100/80 to-pink-100/80 leading-tight lg:mb-[-4rem]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Our Work
        </motion.h2>
        <div className="lg:hidden">
          <MobileVideoGrid />
        </div>
        {/* REMOVED fixed height from this div */}
        <div className="hidden lg:block">
          <AppleCardsCarouselDemo data={data} />
        </div>
      </div>
    </div>
  )
}

export default ShowCase

const data = [
  {
    src: "https://res.cloudinary.com/dexhq5lrp/video/upload/v1759211866/4_kzmzd9.mp4",
  },
  {
    src: "https://res.cloudinary.com/dexhq5lrp/video/upload/v1759211862/2_ync69k.mp4",
  },
  {
    src: "https://res.cloudinary.com/dexhq5lrp/video/upload/v1759211865/3_n0kpa3.mp4",
  },
  {
    src: "https://res.cloudinary.com/dexhq5lrp/video/upload/v1759309821/5_kcj99y.mp4",
  },
  {
    src: "https://res.cloudinary.com/dexhq5lrp/video/upload/v1759211873/6_lhnkno.mp4",
  },
  {
    src: "https://res.cloudinary.com/dexhq5lrp/video/upload/v1759310147/1_hacfcs.mp4",
  },
];