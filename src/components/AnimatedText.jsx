import { motion } from "framer-motion";

const letterVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04, duration: 0.5, ease: "easeOut" },
  }),
};

export default function AnimatedText({ text, className }) {
  return (
    <div className={className}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="letter"
          custom={i}
          variants={letterVariants}
          initial="hidden"
          animate="visible"
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </div>
  );
}
