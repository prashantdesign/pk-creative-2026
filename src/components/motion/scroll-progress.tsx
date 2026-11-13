'use client';

import { motion, useScroll } from 'framer-motion';
import { usePathname } from 'next/navigation';

/** Thin brand-coloured reading progress bar pinned to the top of the viewport. */
export default function ScrollProgress() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();

  if (pathname?.startsWith('/pk-admin')) return null;

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: scrollYProgress }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-primary via-purple-400 to-sky-400"
    />
  );
}
