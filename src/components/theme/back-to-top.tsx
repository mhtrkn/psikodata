"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          whileTap={{ scale: 0.90 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            variant="outline"
            onClick={scrollTop}
            className="cursor-pointer w-12 h-12 rounded-full p-0 flex items-center justify-center drop-shadow-xs shadow-card-foreground bg-card!"
          >
            <ChevronUp className="w-5! h-5!" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
