import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Envelope from "@/components/Envelope";
import RosePetals from "@/components/RosePetals";
import PhotoGallery from "@/components/PhotoGallery";
import LoveMessage from "@/components/LoveMessage";

const Index = () => {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = () => {
    if (!isOpened) {
      setIsOpened(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft overflow-x-hidden">
      {/* Rose petals falling animation - always visible after opening */}
      <AnimatePresence>
        {isOpened && <RosePetals />}
      </AnimatePresence>

      {/* Main content */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {!isOpened ? (
            /* Envelope View */
            <motion.div
              key="envelope"
              className="min-h-screen flex flex-col items-center justify-center px-4"
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              {/* Title before opening */}
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h1 className="font-romantic text-4xl sm:text-5xl text-gradient-romantic mb-2">
                  A Special Surprise
                </h1>
                <p className="font-elegant text-lg text-muted-foreground italic">
                  Just for you, my love
                </p>
              </motion.div>

              <Envelope isOpen={isOpened} onClick={handleOpen} />

              {/* Decorative roses */}
              <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <span className="text-4xl animate-sway" style={{ animationDelay: "0s" }}>🌹</span>
                <span className="text-4xl animate-sway" style={{ animationDelay: "0.5s" }}>🌹</span>
                <span className="text-4xl animate-sway" style={{ animationDelay: "1s" }}>🌹</span>
              </motion.div>
            </motion.div>
          ) : (
            /* Opened Content View */
            <motion.div
              key="content"
              className="min-h-screen py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Love Message */}
              <LoveMessage />

              {/* Photo Gallery */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
              >
                <h2 className="font-romantic text-3xl sm:text-4xl text-center text-gradient-romantic mt-12 mb-8">
                  Our Beautiful Moments
                </h2>
                <PhotoGallery />
              </motion.div>

              {/* Footer */}
              <motion.footer
                className="text-center mt-16 pb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
              >
                <p className="font-romantic text-2xl text-primary">
                  Made with love, just for you 💕
                </p>
                <p className="font-elegant text-sm text-muted-foreground mt-2">
                  Rose Day • February 7, 2026
                </p>
              </motion.footer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
