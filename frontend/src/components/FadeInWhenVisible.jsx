import React from "react";
import { motion } from "framer-motion";

const FadeInWhenVisible = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }} // triggers when 20% is visible
    >
      {children}
    </motion.div>
  );
};

export default FadeInWhenVisible;
