import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "../hooks/useIsMobile";

interface ImageCarouselProps {
  images: string[];
  accentColor?: string;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 400 : -400,
    opacity: 0,
    scale: 0.92,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -400 : 400,
    opacity: 0,
    scale: 0.92,
  }),
};

export default function ImageCarousel({
  images,
  accentColor = "#22d3ee",
}: ImageCarouselProps) {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();

  const imageIndex = ((page % images.length) + images.length) % images.length;

  const paginate = useCallback(
    (newDirection: number) => {
      setPage(([prev]) => [prev + newDirection, newDirection]);
    },
    []
  );

  // Auto-play when not hovered
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => paginate(1), 4000);
    return () => clearInterval(timer);
  }, [isHovered, paginate]);

  const accentDim = accentColor + "26"; // ~15% opacity

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      {/* Main image container */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "4 / 3",
          maxHeight: "720px",
          margin: "0 auto",
          borderRadius: isMobile ? "16px" : "24px",
          overflow: "hidden",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: `0 0 80px ${accentColor}15, 0 20px 60px rgba(0,0,0,0.4)`,
        }}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={page}
            src={images[imageIndex]}
            alt={`App screen ${imageIndex + 1}`}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
            }}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "contain",
              borderRadius: isMobile ? "16px" : "24px",
              cursor: "grab",
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_e, { offset, velocity }) => {
              const swipe =
                Math.abs(offset.x) * velocity.x > 0 ? offset.x : 0;
              if (swipe < -50) paginate(1);
              else if (swipe > 50) paginate(-1);
            }}
          />
        </AnimatePresence>

        {/* Gradient overlay at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "80px",
            background:
              "linear-gradient(to top, rgba(6,8,13,0.7) 0%, transparent 100%)",
            pointerEvents: "none",
            borderRadius: isMobile ? "0 0 16px 16px" : "0 0 24px 24px",
          }}
        />

        {/* Prev / Next arrows */}
        <button
          onClick={() => paginate(-1)}
          aria-label="Previous screen"
          style={{
            position: "absolute",
            left: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(8px)",
            color: "#fff",
            fontSize: "1.1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: isMobile ? 0.85 : (isHovered ? 1 : 0),
            transition: "opacity 0.3s",
            zIndex: 2,
          }}
        >
          ‹
        </button>
        <button
          onClick={() => paginate(1)}
          aria-label="Next screen"
          style={{
            position: "absolute",
            right: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(8px)",
            color: "#fff",
            fontSize: "1.1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: isMobile ? 0.85 : (isHovered ? 1 : 0),
            transition: "opacity 0.3s",
            zIndex: 2,
          }}
        >
          ›
        </button>

        {/* Counter badge */}
        <div
          style={{
            position: "absolute",
            bottom: "16px",
            right: "16px",
            padding: "6px 14px",
            borderRadius: "100px",
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.8)",
            fontSize: "0.78rem",
            fontWeight: 600,
            letterSpacing: "0.5px",
            zIndex: 2,
          }}
        >
          {imageIndex + 1} / {images.length}
        </div>
      </div>

      {/* Dot indicators */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "8px",
          marginTop: "28px",
          flexWrap: "wrap",
        }}
      >
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setPage([i, i > imageIndex ? 1 : -1])}
            aria-label={`Go to screen ${i + 1}`}
            style={{
              width: i === imageIndex ? "28px" : "10px",
              height: "10px",
              borderRadius: "100px",
              border: "none",
              background:
                i === imageIndex ? accentColor : "rgba(255,255,255,0.15)",
              cursor: "pointer",
              transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
              boxShadow:
                i === imageIndex ? `0 0 12px ${accentDim}` : "none",
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Thumbnail strip */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          marginTop: "24px",
          flexWrap: "wrap",
        }}
      >
        {images.map((src, i) => (
          <motion.button
            key={i}
            onClick={() => setPage([i, i > imageIndex ? 1 : -1])}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: isMobile ? "44px" : "56px",
              height: isMobile ? "44px" : "56px",
              borderRadius: isMobile ? "10px" : "12px",
              overflow: "hidden",
              border:
                i === imageIndex
                  ? `2px solid ${accentColor}`
                  : "2px solid rgba(255,255,255,0.08)",
              cursor: "pointer",
              padding: 0,
              background: "transparent",
              opacity: i === imageIndex ? 1 : 0.5,
              transition: "all 0.3s",
              boxShadow:
                i === imageIndex ? `0 0 16px ${accentDim}` : "none",
            }}
          >
            <img
              src={src}
              alt={`Thumbnail ${i + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
