"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Designer } from "@/lib/mockData";

interface DesignerGridProps {
  designers: Designer[];
}

export default function DesignerGrid({ designers }: DesignerGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
      <AnimatePresence mode="popLayout">
        {designers.map((designer) => (
          <motion.div
            key={designer.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="group relative aspect-[3/4] overflow-hidden cursor-pointer glass-card rounded-sm"
          >
            <Image
              src={designer.image}
              alt={designer.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/60 transition-colors duration-500" />

            {/* Hover content — glass pane at bottom */}
            <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
              <div className="glass-light rounded-sm p-3 md:p-4">
                <h3 className="text-sm md:text-base font-light uppercase tracking-[0.08em] text-white mb-1">
                  {designer.name}
                </h3>
                <p className="text-[10px] md:text-xs text-white/60 leading-relaxed line-clamp-2">
                  {designer.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
