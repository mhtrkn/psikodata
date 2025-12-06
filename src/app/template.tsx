"use client";

import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./globals.css";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 15, scale: 0.975 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="col-span-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
