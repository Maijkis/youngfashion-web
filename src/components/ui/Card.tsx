"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

interface CardProps {
  image: string;
  alt: string;
  href?: string;
  children?: ReactNode;
  className?: string;
  aspectRatio?: string;
}

export default function Card({
  image,
  alt,
  href,
  children,
  className = "",
  aspectRatio = "aspect-[3/4]",
}: CardProps) {
  const content = (
    <motion.div
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`relative overflow-hidden group cursor-pointer glass-card rounded-sm ${aspectRatio} ${className}`}
    >
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors duration-500" />
      {children && (
        <div className="absolute inset-0 flex items-end p-4 md:p-6">
          {children}
        </div>
      )}
    </motion.div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
