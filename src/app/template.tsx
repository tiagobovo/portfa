"use client";

import { motion } from "framer-motion";

/**
 * Transição entre páginas: o App Router remonta o template a cada navegação,
 * disparando esta animação de entrada.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
