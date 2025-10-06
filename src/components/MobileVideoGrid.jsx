import { motion } from "framer-motion";

const MobileVideoGrid = () => {
  const videos = [
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
      src: "https://res.cloudinary.com/dexhq5lrp/video/upload/v1759310147/1_hacfcs.mp4",
    },
    {
      src: "https://res.cloudinary.com/dexhq5lrp/video/upload/v1759211873/6_lhnkno.mp4",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 p-4 bg-black min-h-screen">
      {videos.map((video, index) => (
        <motion.div
          key={index}
          className="relative rounded-xl overflow-hidden bg-gray-900 aspect-[9/16]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <video
            src={video.src}
            className="w-full h-full object-cover"
            controls={false}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onError={(e) => {
              console.log('Video loading error:', e.target.src);
            }}
            onLoadStart={() => {
              console.log('Video loading started');
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default MobileVideoGrid;
