import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

const LoveMessage = () => {
  return (
    <motion.div
      className="text-center px-6 py-8 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {/* Rose Day Badge */}
      <motion.div
        className="inline-flex items-center gap-2 bg-gradient-romantic text-primary-foreground px-6 py-2 rounded-full mb-6 shadow-romantic"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.5 }}
      >
        <Sparkles className="w-4 h-4" />
        <span className="font-elegant text-sm tracking-widest uppercase">Rose Day 2026</span>
        <Sparkles className="w-4 h-4" />
      </motion.div>

      {/* Main Title */}
      <motion.h1
        className="font-romantic text-5xl sm:text-6xl md:text-7xl text-gradient-romantic mb-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        Happy Rose Day
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="font-elegant text-xl sm:text-2xl text-muted-foreground mb-8 italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        To the most beautiful flower in my garden
      </motion.p>

      {/* Love Message */}
      <motion.div
        className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-card border border-border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
      >
        <div className="flex justify-center mb-4">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Heart className="w-8 h-8 text-primary fill-current" />
          </motion.div>
        </div>

        <p className="font-elegant text-lg sm:text-xl leading-relaxed text-foreground mb-6">
          Every rose has its thorns, but loving you has been nothing but sweetness. 
          You are the fragrance that fills my days with joy, the color that paints my world beautiful, 
          and the warmth that makes every moment special.
        </p>

        <p className="font-elegant text-lg sm:text-xl leading-relaxed text-foreground mb-6">
          On this Rose Day, I want you to know that my love for you blooms stronger with each passing day. 
          Like a rose that stands tall and beautiful, you inspire me to be better, love deeper, and cherish every moment with you.
        </p>

        <p className="font-romantic text-2xl sm:text-3xl text-primary mt-6">
          I love you more than words could ever express 🌹
        </p>

        {/* Signature */}
        <motion.div
          className="mt-8 pt-6 border-t border-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <p className="font-romantic text-xl text-muted-foreground">
            Forever Yours
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Heart className="w-4 h-4 text-primary fill-current" />
            <span className="font-elegant text-lg text-foreground">Your Love</span>
            <Heart className="w-4 h-4 text-primary fill-current" />
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative hearts */}
      <div className="flex justify-center gap-4 mt-8">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity,
            }}
          >
            <Heart className="w-4 h-4 text-rose-petal fill-current" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default LoveMessage;
