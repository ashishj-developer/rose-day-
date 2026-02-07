import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X } from "lucide-react";

// Using placeholder colors for photos - you can replace with actual URLs
const photos = [
  { src: "../../public/images/img1.png", fallback: "linear-gradient(135deg, #FFE5EC 0%, #FFC2D1 100%)" },
  { src: "/images/img2.png", fallback: "linear-gradient(135deg, #FFC2D1 0%, #FFB3C6 100%)" },
  { src: "/images/img3.png", fallback: "linear-gradient(135deg, #FFB3C6 0%, #FF8FAB 100%)" },
  { src: "/images/img4.png", fallback: "linear-gradient(135deg, #FF8FAB 0%, #FF758F 100%)" },
  { src: "/images/img5.png", fallback: "linear-gradient(135deg, #FF758F 0%, #FF5C8A 100%)" },
];

const rotations = [-8, 5, -3, 7, -5];
const captions = ["Together 💕", "Us 💗", "Love 💝", "Always 💖", "Forever 💘"];

const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  return (
    <>
      <div className="relative py-8">
        {/* Photo stack with polaroid effect */}
        <div className="relative flex flex-wrap justify-center gap-4 sm:gap-6 px-4">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              className="relative bg-white p-2 sm:p-3 pb-10 sm:pb-12 shadow-card rounded-sm cursor-pointer"
              initial={{ opacity: 0, y: 50, rotate: 0 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                rotate: rotations[index],
              }}
              transition={{ 
                duration: 0.6, 
                delay: 0.3 + index * 0.15,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.08, 
                rotate: 0,
                zIndex: 10,
                transition: { duration: 0.2 }
              }}
              style={{
                transformOrigin: "center bottom",
              }}
              onClick={() => setSelectedPhoto(index)}
            >
              {/* Photo */}
              <div 
                className="w-32 h-44 sm:w-44 sm:h-56 md:w-48 md:h-64 overflow-hidden bg-rose-blush relative"
                style={{ background: photo.fallback }}
              >
                <img
                  src={photo.src}
                  alt={`Our moment ${index + 1}`}
                  className="w-full h-full object-cover absolute inset-0"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                {/* Heart overlay for visual appeal when images load */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <Heart className="w-16 h-16 text-primary fill-current" />
                </div>
              </div>
              
              {/* Heart decoration */}
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  delay: index * 0.2,
                  repeat: Infinity,
                }}
              >
                <Heart className="w-5 h-5 text-primary fill-current" />
              </motion.div>

              {/* Polaroid caption area */}
              <div className="absolute bottom-2 left-0 right-0 text-center">
                <span className="font-romantic text-xs sm:text-sm text-muted-foreground">
                  {captions[index]}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Close button */}
            <motion.button
              className="absolute top-4 right-4 p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedPhoto(null)}
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Full size photo */}
            <motion.div
              className="relative bg-white p-3 sm:p-4 pb-14 sm:pb-16 shadow-2xl rounded-sm max-w-[90vw] max-h-[85vh]"
              initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 10 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                className="w-[70vw] h-[60vh] sm:w-[60vw] sm:h-[65vh] max-w-lg overflow-hidden relative"
                style={{ background: photos[selectedPhoto].fallback }}
              >
                <img
                  src={photos[selectedPhoto].src}
                  alt={`Our moment ${selectedPhoto + 1}`}
                  className="w-full h-full object-cover absolute inset-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                {/* Heart overlay when image not loaded */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <Heart className="w-24 h-24 text-primary fill-current" />
                </div>
              </div>

              {/* Caption */}
              <div className="absolute bottom-3 left-0 right-0 text-center">
                <span className="font-romantic text-lg sm:text-xl text-muted-foreground">
                  {captions[selectedPhoto]}
                </span>
              </div>

              {/* Decorative hearts */}
              <motion.div
                className="absolute -top-3 -right-3"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="w-8 h-8 text-primary fill-current" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PhotoGallery;
