"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import styles from "./VerticalWarpSlideshow.module.css";

const SLIDES = [
  {
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80",
    lines: ["YOUNG", "FASHION"],
    title: "Vilnius — Est. 2022",
    desc: "A creative platform empowering emerging designers in Lithuania.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920&q=80",
    lines: ["EMERGING", "DESIGNERS"],
    title: "New Voices",
    desc: "Bold new perspectives from the next generation of creators.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1920&q=80",
    lines: ["RUNWAY", "COLLECTION"],
    title: "Spring 2025",
    desc: "Four runway shows featuring 30+ original collections.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80",
    lines: ["CRAFTED WITH", "PURPOSE"],
    title: "Craftsmanship",
    desc: "Every stitch tells a story of passion and precision.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1920&q=80",
    lines: ["BEYOND THE", "FABRIC"],
    title: "Looking Forward",
    desc: "Building a sustainable creative community in Vilnius and beyond.",
  },
];

const TOTAL = String(SLIDES.length).padStart(2, "0");

export default function Hero() {
  const slideshowRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const counterStripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create("slideInOut", "0.25, 1, 0.5, 1");
    CustomEase.create("textReveal", "0.77, 0, 0.175, 1");
    CustomEase.create("imageWarp", "0.22, 1, 0.36, 1");

    const slideshow = slideshowRef.current;
    const cursor = cursorRef.current;
    const counterStrip = counterStripRef.current;
    if (!slideshow) return;

    const slides = Array.from(
      slideshow.querySelectorAll<HTMLElement>(`.${styles.slide}`)
    );
    const slideImages = Array.from(
      slideshow.querySelectorAll<HTMLElement>(`.${styles.slideImg}`)
    );

    let currentIndex = 0;
    let isAnimating = false;
    let mouseX = 0;
    const NEXT = 1;
    const PREV = -1;
    const SLIDE_DURATION = 1.5;

    // Set initial counter position
    gsap.set(counterStrip, { y: 0 });

    // Animate in the first slide's text
    const firstTextLines = slides[0]?.querySelectorAll<HTMLElement>(
      `.${styles.slideTextLine}`
    );
    if (firstTextLines) {
      gsap.to(firstTextLines, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        delay: 0.5,
        ease: "textReveal",
      });
    }

    function animateCounter(
      targetIndex: number,
      tl: gsap.core.Timeline
    ) {
      if (!counterStrip) return;
      const targetY = -targetIndex * 1.2;
      tl.to(
        counterStrip,
        { y: `${targetY}em`, duration: SLIDE_DURATION, ease: "slideInOut" },
        0.2
      );
    }

    function navigate(direction: number) {
      if (isAnimating) return;
      const prevIndex = currentIndex;
      currentIndex =
        direction === NEXT
          ? currentIndex < slides.length - 1
            ? currentIndex + 1
            : 0
          : currentIndex > 0
          ? currentIndex - 1
          : slides.length - 1;
      performNavigation(prevIndex, currentIndex, direction);
    }

    function performNavigation(
      prevIndex: number,
      nextIndex: number,
      direction: number
    ) {
      isAnimating = true;

      const currentSlide = slides[prevIndex];
      const currentImage = slideImages[prevIndex];
      const currentTextLines = currentSlide.querySelectorAll<HTMLElement>(
        `.${styles.slideTextLine}`
      );

      const nextSlide = slides[nextIndex];
      const nextImage = slideImages[nextIndex];
      const nextTextLines = nextSlide.querySelectorAll<HTMLElement>(
        `.${styles.slideTextLine}`
      );

      gsap.set(nextSlide, {
        visibility: "visible",
        y: direction * 100 + "%",
      });

      gsap.set(nextImage, {
        y: -direction * 40 + "%",
        scale: 1.4,
        scaleY: 1.8,
        rotation: -direction * 8,
        transformOrigin: direction === NEXT ? "0% 0%" : "100% 100%",
      });

      gsap.set(nextTextLines, { y: "100%", opacity: 0 });

      const tl = gsap.timeline({
        defaults: { duration: SLIDE_DURATION, ease: "slideInOut" },
        onComplete: () => {
          gsap.set(currentSlide, { visibility: "hidden" });
          currentSlide.classList.remove(styles.active);
          nextSlide.classList.add(styles.active);
          isAnimating = false;
        },
      });

      animateCounter(nextIndex, tl);

      tl.to(
        currentTextLines,
        {
          y: "-80%",
          opacity: 0,
          duration: 0.7,
          stagger: 0.05,
          ease: "power2.in",
        },
        0
      );

      tl.to(currentSlide, { y: -direction * 100 + "%" }, 0.2);

      tl.to(
        currentImage,
        {
          y: direction * 40 + "%",
          scale: 1.4,
          scaleY: 1.8,
          rotation: direction * 8,
          ease: "imageWarp",
          transformOrigin:
            direction === NEXT ? "0% 100%" : "100% 0%",
        },
        0.2
      );

      tl.to(nextSlide, { y: "0%" }, 0.2);

      tl.to(
        nextImage,
        {
          y: "0%",
          scale: 1,
          scaleY: 1,
          rotation: 0,
          ease: "imageWarp",
        },
        0.2
      );

      tl.to(
        nextTextLines,
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "textReveal",
          delay: 0.6,
        },
        0.9
      );
    }

    // ─── Event handlers ──────────────────────────────────────

    const onMouseMove = (e: MouseEvent) => {
      if (!cursor) return;
      gsap.to(cursor, { left: e.clientX, top: e.clientY, duration: 0.1 });
      mouseX = e.clientX;
      cursor.classList.add(styles.cursorActive);

      if (e.clientX < window.innerWidth / 2) {
        cursor.classList.remove(styles.cursorNext);
        cursor.classList.add(styles.cursorPrev);
      } else {
        cursor.classList.remove(styles.cursorPrev);
        cursor.classList.add(styles.cursorNext);
      }

      clearTimeout(
        (window as Window & { _yfCursorTimer?: ReturnType<typeof setTimeout> })
          ._yfCursorTimer
      );
      (
        window as Window & { _yfCursorTimer?: ReturnType<typeof setTimeout> }
      )._yfCursorTimer = setTimeout(
        () => cursor.classList.remove(styles.cursorActive),
        2000
      );
    };

    const onMouseLeave = () => cursor?.classList.remove(styles.cursorActive);

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      navigate(e.deltaY > 0 ? NEXT : PREV);
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.changedTouches[0].screenY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const endY = e.changedTouches[0].screenY;
      if (touchStartY > endY + 5) navigate(NEXT);
      else if (touchStartY < endY - 5) navigate(PREV);
    };

    const onClick = (e: MouseEvent) => {
      // Ignore clicks on the scroll-down hint
      if ((e.target as HTMLElement).closest(`.${styles.scrollHint}`)) return;
      navigate(mouseX < window.innerWidth / 2 ? PREV : NEXT);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") navigate(NEXT);
      else if (e.key === "ArrowUp" || e.key === "ArrowLeft") navigate(PREV);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    slideshow.addEventListener("wheel", onWheel, { passive: false });
    slideshow.addEventListener("touchstart", onTouchStart);
    slideshow.addEventListener("touchend", onTouchEnd);
    slideshow.addEventListener("click", onClick);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      slideshow.removeEventListener("wheel", onWheel);
      slideshow.removeEventListener("touchstart", onTouchStart);
      slideshow.removeEventListener("touchend", onTouchEnd);
      slideshow.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const scrollPast = () => {
    const slideshow = slideshowRef.current;
    if (!slideshow) return;
    const next = slideshow.nextElementSibling as HTMLElement | null;
    if (next) {
      next.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <>
      <div ref={slideshowRef} className={styles.slideshow}>
        {/* Slides */}
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`${styles.slide}${i === 0 ? ` ${styles.active}` : ""}`}
          >
            <div
              className={styles.slideImg}
              style={{ backgroundImage: `url('${slide.image}')` }}
            />
            <div className={styles.slideText}>
              {slide.lines.map((line, j) => (
                <span key={j} className={styles.slideTextLine}>
                  {line}
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* Controls hint — top right */}
        <div className={styles.controls}>
          <span className={styles.controlsText}>scroll / drag</span>
        </div>

        {/* Counter — bottom center */}
        <div className={styles.slideCounter}>
          <div className={styles.counterContainer}>
            <div ref={counterStripRef} className={styles.counterStrip}>
              {SLIDES.map((_, i) => (
                <div key={i} className={styles.counterNumber}>
                  {String(i + 1).padStart(2, "0")}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.counterSeparator} />
          <div className={styles.counterTotal}>{TOTAL}</div>
        </div>

        {/* Slide info — top left (below navbar) */}
        <div className={styles.slideInfo}>
          <div className={styles.slideInfoTitle}>Young Fashion</div>
          Vilnius — a creative platform for emerging designers.
        </div>

        {/* Scroll-down hint — bottom right */}
        <button
          className={styles.scrollHint}
          onClick={scrollPast}
          aria-label="Scroll past slideshow"
        >
          <span className={styles.scrollHintText}>explore</span>
          <span className={styles.scrollHintLine} />
        </button>
      </div>

      {/* Custom cursor (fixed, outside section to avoid stacking context issues) */}
      <div ref={cursorRef} className={styles.cursor}>
        <span className={`${styles.cursorArrow} ${styles.cursorArrowPrev}`}>
          ←
        </span>
        <span className={`${styles.cursorArrow} ${styles.cursorArrowNext}`}>
          →
        </span>
      </div>
    </>
  );
}
