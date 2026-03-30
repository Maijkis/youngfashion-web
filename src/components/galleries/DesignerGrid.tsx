"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Designer } from "@/lib/mockData";

interface DesignerGridProps {
  designers: Designer[];
}

export default function DesignerGrid({ designers }: DesignerGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
      <AnimatePresence mode="popLayout">
        {designers.map((designer) => (
          <motion.div
            key={designer.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="group relative aspect-[3/4] overflow-hidden cursor-pointer"
          >
            <Image
              src={designer.image}
              alt={designer.name}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Content at bottom */}
            <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">
                {designer.year}
              </p>
              <h3 className="text-sm md:text-base font-bold uppercase tracking-[0.02em] text-white mb-1">
                {designer.name}
              </h3>
              <p className="text-[10px] md:text-xs text-white/50 leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {designer.description}
              </p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
