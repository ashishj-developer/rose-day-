import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface EnvelopeProps {
  isOpen: boolean;
  onClick: () => void;
}

const Envelope = ({ isOpen, onClick }: EnvelopeProps) => {
  return (
    <motion.div
      className="relative cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Envelope Body with Roses on Sides */}
      <div className="relative w-80 h-52 sm:w-96 sm:h-60">
        {/* Left side roses */}
        <motion.div
          className="absolute -left-8 sm:-left-12 top-1/2 -translate-y-1/2 flex flex-col gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <span className="text-2xl sm:text-3xl animate-sway" style={{ animationDelay: "0s" }}>🌹</span>
          <span className="text-xl sm:text-2xl animate-sway" style={{ animationDelay: "0.3s" }}>🌹</span>
          <span className="text-2xl sm:text-3xl animate-sway" style={{ animationDelay: "0.6s" }}>🌹</span>
        </motion.div>

        {/* Right side roses */}
        <motion.div
          className="absolute -right-8 sm:-right-12 top-1/2 -translate-y-1/2 flex flex-col gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <span className="text-2xl sm:text-3xl animate-sway" style={{ animationDelay: "0.2s" }}>🌹</span>
          <span className="text-xl sm:text-2xl animate-sway" style={{ animationDelay: "0.5s" }}>🌹</span>
          <span className="text-2xl sm:text-3xl animate-sway" style={{ animationDelay: "0.8s" }}>🌹</span>
        </motion.div>

        {/* Back of envelope */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-petal to-primary rounded-lg shadow-card" />
        
        {/* Envelope pocket */}
        <div className="absolute bottom-0 left-0 right-0 h-36 sm:h-44 bg-gradient-to-b from-rose-deep to-primary rounded-b-lg" />
        
        {/* Envelope flap */}
        <motion.div
          className="absolute top-0 left-0 right-0 origin-top"
          style={{ perspective: "1000px" }}
          animate={{
            rotateX: isOpen ? 180 : 0,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div
            className="w-full h-28 sm:h-32"
            style={{
              background: "linear-gradient(135deg, hsl(350, 65%, 75%) 0%, hsl(350, 70%, 50%) 100%)",
              clipPath: "polygon(0 0, 50% 100%, 100% 0)",
            }}
          />
        </motion.div>

        {/* Heart seal */}
        <motion.div
          className="absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 z-10"
          animate={{
            scale: isOpen ? 0 : 1,
            opacity: isOpen ? 0 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-gold-accent p-3 rounded-full shadow-lg animate-heartbeat">
            <Heart className="w-6 h-6 text-primary-foreground fill-current" />
          </div>
        </motion.div>

        {/* Decorative pattern */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-primary-foreground/30"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      </div>

      {/* Click hint */}
      {!isOpen && (
        <motion.p
          className="text-center mt-6 font-romantic text-2xl text-primary"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          Tap to open your surprise 💕
        </motion.p>
      )}
    </motion.div>
  );
};

export default Envelope;
