"use client";

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
    <div
      className={`relative overflow-hidden group cursor-pointer ${aspectRatio} ${className}`}
    >
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      {children && (
        <div className="absolute inset-0 flex items-end p-4 md:p-6">
          {children}
        </div>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
