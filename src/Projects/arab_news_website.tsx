import { useState, useRef, useEffect, type CSSProperties } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useIsMobile } from "../hooks/useIsMobile";

interface PageProps {
  onBack?: () => void;
}

/* ------------------------------------------------------------------ */
/*  CAROUSEL                                                           */
/* ------------------------------------------------------------------ */

function Carousel({
  screenshots,
  accentColor,
}: {
  screenshots: { src: string; label: string }[];
  accentColor: string;
}) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const thumbRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = (to: number) => {
    setDirection(to > current ? 1 : -1);
    setCurrent(to);
  };
  const next = () => go((current + 1) % screenshots.length);
  const prev = () => go((current - 1 + screenshots.length) % screenshots.length);

  useEffect(() => {
    autoRef.current = setInterval(next, 5000);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [current]);

  useEffect(() => {
    const container = thumbRef.current;
    const el = container?.children[current] as HTMLElement | undefined;
    if (container && el) {
      const scrollLeft = el.offsetLeft - container.offsetWidth / 2 + el.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [current]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0, scale: 0.95 }),
  };

  return (
    <div style={s.carousel}>
      <div style={s.carouselStage}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.img
            key={screenshots[current].src}
            src={screenshots[current].src}
            alt={screenshots[current].label}
            style={s.carouselImg}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            draggable={false}
          />
        </AnimatePresence>
        <div style={s.carouselGradient} />
        <div style={s.carouselControls}>
          <motion.button whileHover={{ scale: 1.12, backgroundColor: "rgba(0,0,0,0.7)" }} whileTap={{ scale: 0.92 }} onClick={(e) => { e.stopPropagation(); prev(); }} style={s.carouselArrow} aria-label="Previous">‹</motion.button>
          <motion.button whileHover={{ scale: 1.12, backgroundColor: "rgba(0,0,0,0.7)" }} whileTap={{ scale: 0.92 }} onClick={(e) => { e.stopPropagation(); next(); }} style={s.carouselArrow} aria-label="Next">›</motion.button>
        </div>
        <div style={s.carouselCounter}>{current + 1} / {screenshots.length}</div>
      </div>
      <motion.div key={`cap-${current}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} style={s.carouselCaption}>
        {screenshots[current].label}
      </motion.div>
      <div ref={thumbRef} style={s.thumbStrip}>
        {screenshots.map((shot, idx) => (
          <motion.div key={shot.src} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.96 }} onClick={() => go(idx)} style={{ ...s.thumb, borderColor: idx === current ? accentColor : "rgba(255,255,255,0.08)", boxShadow: idx === current ? `0 4px 20px ${accentColor}40` : "none", opacity: idx === current ? 1 : 0.55 }}>
            <img src={shot.src} alt={shot.label} style={s.thumbImg} />
          </motion.div>
        ))}
      </div>
      <div style={s.dotRow}>
        {screenshots.map((_, idx) => (
          <div key={idx} onClick={() => go(idx)} style={{ ...s.dot, width: idx === current ? 24 : 8, background: idx === current ? accentColor : "rgba(255,255,255,0.2)" }} />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FEATURE CARD                                                       */
/* ------------------------------------------------------------------ */

function FeatureCard({ feature, index, accentColor, accentBg }: { feature: { icon: string; title: string; description: string }; index: number; accentColor: string; accentBg: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }} whileHover={{ y: -6, boxShadow: `0 20px 50px ${accentColor}25`, borderColor: `${accentColor}50` }} style={s.featureCard}>
      <div style={{ ...s.featureIcon, background: accentBg }}>{feature.icon}</div>
      <div style={s.featureTitle}>{feature.title}</div>
      <div style={s.featureDesc}>{feature.description}</div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN                                                               */
/* ------------------------------------------------------------------ */

export default function ArabNewsWebsite({ onBack }: PageProps) {
  const assetBase = (import.meta as any)?.env?.BASE_URL || "/";
  const makeSrc = (file: string) => `${assetBase}images/Arab_new_images/${file}`;

  const screenshots = [
    { src: makeSrc("Main_page.png"), label: "Homepage — Hero Carousel, Ticker & Latest Stories" },
    { src: makeSrc("admin_controlled_ads_placement.png"), label: "Ad Placements — Admin-Controlled Layout & Slots" },
    { src: makeSrc("dynamic_bottom.png"), label: "Dynamic Feed — Paginated Stories & Bottom Section" },
  ];

  const features = [
    { icon: "🌐", title: "Multi-Language Delivery", description: "Full Arabic/English support with RTL-aware layouts, dynamic breadcrumbs, and localized UI" },
    { icon: "📰", title: "Homepage Experience", description: "Hero carousel, headline ticker, latest/featured story grids with lazy-loaded pagination" },
    { icon: "🔍", title: "Search & Discovery", description: "Paginated feeds, category/tag pages, ellipsis pagination, and RTL-aware search functionality" },
    { icon: "📄", title: "Article Pages", description: "Structured metadata, related articles sidebar, social share buttons, and rich media rendering" },
    { icon: "📊", title: "SEO & Metadata", description: "Full SEO/OG/article schemas via Helmet, structured data, and social media optimization" },
    { icon: "📢", title: "Ad Slot Integration", description: "Admin-controlled ad placements — header, sidebar, in-article, and footer positions" },
  ];

  const techStack = ["React", "i18n + RTL", "Helmet SEO", "Axios", "Context API", "Ad Slots"];
  const accentColor = "#22d3ee";
  const accentBg = "rgba(34, 211, 238, 0.15)";

  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const isMobile = useIsMobile();

  return (
    <div style={s.page as any}>
      <div style={s.grain} />
      <motion.div style={{ ...s.orbA, background: "radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)" }} animate={{ y: [0, -40, 0], scale: [1, 1.15, 1] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div style={{ ...s.orbB, background: "radial-gradient(circle, rgba(103,232,249,0.10) 0%, transparent 70%)" }} animate={{ y: [0, 50, 0], scale: [1, 1.2, 1] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} />

      {onBack && (
        <motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} whileHover={{ scale: 1.04, x: -4, backgroundColor: "rgba(255,255,255,0.08)" }} whileTap={{ scale: 0.96 }} onClick={onBack} style={{ ...s.backBtn, ...(isMobile ? { top: 16, left: 16, padding: "8px 14px", fontSize: "0.85rem" } : {}) }}>
          <span style={{ fontSize: "1.2em" }}>←</span> Back
        </motion.button>
      )}

      <header ref={heroRef} style={s.hero}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} style={s.heroInner}>
          <motion.div initial={{ opacity: 0, scale: 0 }} animate={heroInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.2, type: "spring", stiffness: 200 }} style={{ ...s.heroBadge, background: "rgba(34,211,238,0.12)", border: "1px solid rgba(34,211,238,0.25)", color: accentColor }}>
            🌍 News Platform
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3, duration: 0.8 }} style={s.heroTitle}>
            Arab Times{" "}
            <span style={{ background: "linear-gradient(135deg, #06b6d4 0%, #22d3ee 50%, #67e8f9 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              News
            </span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5, duration: 0.6 }} style={s.heroSub}>
            A real-time newsroom with Arabic/English delivery, RTL-aware layouts, SEO-ready metadata, admin-controlled ad placements, and rich media storytelling tailored for regional audiences.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.7, duration: 0.6 }} style={s.quickStats}>
            {[
              { value: "AR/EN", label: "Bilingual" },
              { value: "RTL", label: "Aware Layout" },
              { value: "SEO", label: "Optimized" },
            ].map((stat) => (
              <div key={stat.label} style={s.quickStat}>
                <div style={{ ...s.quickStatValue, background: "linear-gradient(135deg, #06b6d4, #22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{stat.value}</div>
                <div style={s.quickStatLabel}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </header>

      <section style={s.section}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h3 style={s.sectionLabel}><span style={{ color: accentColor }}>●</span> Screenshots</h3>
          <Carousel screenshots={screenshots} accentColor={accentColor} />
        </motion.div>

        <div style={{ marginTop: 56 }}>
          <h3 style={s.sectionLabel}><span style={{ color: accentColor }}>●</span> Key Features</h3>
          <div style={{ ...s.featuresGrid, ...(isMobile ? { gridTemplateColumns: "1fr" } : {}) }}>
            {features.map((f, i) => <FeatureCard key={f.title} feature={f} index={i} accentColor={accentColor} accentBg={accentBg} />)}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginTop: 48 }}>
          <h3 style={s.sectionLabel}><span style={{ color: accentColor }}>●</span> Tech Stack</h3>
          <div style={s.techRow}>
            {techStack.map((t) => (
              <motion.span key={t} whileHover={{ scale: 1.08, borderColor: accentColor }} style={{ ...s.techTag, borderColor: `${accentColor}40`, background: "rgba(34,211,238,0.08)" }}>{t}</motion.span>
            ))}
          </div>
        </motion.div>
      </section>

      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={s.footerCta}>
        {onBack && (
          <motion.button whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(34, 211, 238, 0.4)" }} whileTap={{ scale: 0.95 }} onClick={onBack} style={{ ...s.footerCtaBtn, background: "linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)" }}>
            ← Return to Websites
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  STYLES                                                             */
/* ------------------------------------------------------------------ */

const s: Record<string, CSSProperties> = {
  page: { minHeight: "100vh", background: "#06080d", color: "#f5f5f7", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "SF Pro Display", Roboto, sans-serif', position: "relative", overflowX: "clip" },
  grain: { position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.03, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat", backgroundSize: "128px 128px" },
  orbA: { position: "fixed", top: "15%", left: "5%", width: 500, height: 500, borderRadius: "50%", filter: "blur(90px)", pointerEvents: "none", zIndex: 0 },
  orbB: { position: "fixed", bottom: "10%", right: "8%", width: 450, height: 450, borderRadius: "50%", filter: "blur(90px)", pointerEvents: "none", zIndex: 0 },
  backBtn: { position: "fixed", top: 28, left: 28, zIndex: 100, display: "inline-flex", alignItems: "center", gap: 10, padding: "10px 20px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(10,10,15,0.7)", backdropFilter: "blur(16px)", color: "#f5f5f7", fontSize: "0.9375rem", fontWeight: 600, cursor: "pointer", transition: "all 0.3s" },
  hero: { position: "relative", minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "120px clamp(24px, 6vw, 80px) 40px", zIndex: 1 },
  heroInner: { maxWidth: 820 },
  heroBadge: { display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 20px", borderRadius: 999, fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.04em", marginBottom: 28 },
  heroTitle: { fontSize: "clamp(2.5rem, 7vw, 4.5rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.1, margin: "0 0 24px", color: "#fff" },
  heroSub: { fontSize: "clamp(1.05rem, 2vw, 1.3rem)", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 680, margin: "0 auto 40px" },
  quickStats: { display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap" },
  quickStat: { padding: "20px 28px", borderRadius: 16, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(8px)", minWidth: 120 },
  quickStatValue: { fontSize: "1.75rem", fontWeight: 800, marginBottom: 4 },
  quickStatLabel: { fontSize: "0.85rem", color: "rgba(255,255,255,0.45)", fontWeight: 500 },
  section: { position: "relative", zIndex: 1, padding: "40px clamp(24px, 6vw, 80px) 40px", maxWidth: 1100, margin: "0 auto" },
  sectionLabel: { fontSize: "1rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 },
  carousel: { borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", boxShadow: "0 24px 64px rgba(0,0,0,0.4)", backdropFilter: "blur(6px)" },
  carouselStage: { position: "relative", width: "100%", aspectRatio: "16/9.5", overflow: "hidden", background: "radial-gradient(ellipse at center, rgba(20,20,30,0.9), #08090e)", display: "flex", alignItems: "center", justifyContent: "center" },
  carouselImg: { width: "100%", height: "100%", objectFit: "contain", display: "block" },
  carouselGradient: { position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(transparent, rgba(8,9,14,0.8))", pointerEvents: "none" },
  carouselControls: { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 14px", pointerEvents: "none" },
  carouselArrow: { pointerEvents: "auto", width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", color: "#fff", fontSize: "1.5rem", display: "grid", placeItems: "center", cursor: "pointer", transition: "all 0.2s" },
  carouselCounter: { position: "absolute", top: 14, right: 16, padding: "5px 14px", borderRadius: 10, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", fontSize: "0.8rem", fontWeight: 700, color: "rgba(255,255,255,0.7)", letterSpacing: "0.05em" },
  carouselCaption: { padding: "14px 20px", fontSize: "0.95rem", fontWeight: 500, color: "rgba(255,255,255,0.8)", borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.3)", letterSpacing: "0.01em" },
  thumbStrip: { display: "flex", gap: 8, overflowX: "auto", padding: "10px 12px 6px", scrollBehavior: "smooth", scrollbarWidth: "none" },
  thumb: { flex: "0 0 110px", height: 68, borderRadius: 10, overflow: "hidden", border: "2px solid rgba(255,255,255,0.08)", cursor: "pointer", transition: "all 0.25s" },
  thumbImg: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  dotRow: { display: "flex", gap: 6, justifyContent: "center", padding: "10px 0 14px" },
  dot: { height: 6, borderRadius: 3, cursor: "pointer", transition: "all 0.25s" },
  featuresGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 },
  featureCard: { padding: "22px 20px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", backdropFilter: "blur(6px)", transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)", cursor: "default" },
  featureIcon: { width: 44, height: 44, borderRadius: 12, display: "grid", placeItems: "center", fontSize: "1.3rem", marginBottom: 14 },
  featureTitle: { fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: 6, letterSpacing: "-0.01em" },
  featureDesc: { fontSize: "0.87rem", lineHeight: 1.6, color: "rgba(255,255,255,0.5)" },
  techRow: { display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 48 },
  techTag: { padding: "7px 16px", borderRadius: 10, border: "1px solid rgba(34,211,238,0.3)", fontSize: "0.85rem", fontWeight: 600, color: "#cffafe", transition: "all 0.25s", cursor: "default" },
  footerCta: { position: "relative", zIndex: 1, textAlign: "center", padding: "40px clamp(24px, 6vw, 80px) 80px" },
  footerCtaBtn: { padding: "16px 40px", fontSize: "1rem", fontWeight: 700, color: "#0a0a0f", border: "none", borderRadius: 14, cursor: "pointer", transition: "all 0.3s" },
};
