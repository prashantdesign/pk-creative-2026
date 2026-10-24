'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

/** Floating WhatsApp shortcut (appears after the first scroll) to turn visitors into leads. */
export default function FloatingContact({ whatsapp }: { whatsapp?: string }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!whatsapp || pathname?.startsWith('/pk-admin')) return null;

  const href = whatsapp.startsWith('http')
    ? whatsapp
    : `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi PK Creative, I would like to discuss a project.')}`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with PK Creative on WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="fixed right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-5px_rgba(37,211,102,0.6)] sm:right-6"
          style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom))' }}
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40" aria-hidden />
          <MessageCircle className="relative h-7 w-7" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
