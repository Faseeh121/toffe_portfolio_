import { type CSSProperties, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import {
  Kino,
  Scene,
  Reveal,
} from "react-kino";
import ImageCarousel from "../components/ImageCarousel";
import { useIsMobile } from "../hooks/useIsMobile";

// Generate image paths for bite_buddy folder (1.jpeg – 14.jpeg)
const appImages = Array.from({ length: 14 }, (_, i) => `/images/apps%20images/bite_buddy/${i + 1}.jpeg`);

/* --- Shared Styles --- */
const colors = {
  accent: "#22d3ee",
  accentDim: "rgba(34, 211, 238, 0.15)",
  accentGlow: "rgba(34, 211, 238, 0.25)",
  bg: "#06080d",
  card: "rgba(255,255,255,0.04)",
  cardBorder: "rgba(255,255,255,0.08)",
  text: "#f5f5f7",
  textDim: "rgba(255,255,255,0.5)",
  textMuted: "rgba(255,255,255,0.35)",
};

const glass: CSSProperties = {
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: `1px solid ${colors.cardBorder}`,
  borderRadius: "20px",
};

interface FoodAppProps {
  onBack?: () => void;
}

/* --- Metric Card --- */
function MetricCard({
  value,
  label,
  index,
}: {
  value: string;
  label: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        ...glass,
        padding: "32px 24px",
        textAlign: "center" as const,
        position: "relative" as const,
        overflow: "hidden" as const,
      }}
    >
      <div
        style={{
          position: "absolute" as const,
          top: "-40px",
          right: "-40px",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.accentGlow} 0%, transparent 70%)`,
          pointerEvents: "none" as const,
        }}
      />
      <h3 style={{ fontSize: "2rem", fontWeight: 800, color: colors.accent, marginBottom: "8px" }}>
        {value}
      </h3>
      <p style={{ fontSize: "0.9rem", color: colors.textDim, fontWeight: 500, letterSpacing: "0.5px", textTransform: "uppercase" as const }}>
        {label}
      </p>
    </motion.div>
  );
}

/* --- Tech Badge --- */
function TechBadge({ name, index }: { name: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.05 * index }}
      style={{
        display: "inline-block",
        padding: "8px 20px",
        borderRadius: "100px",
        background: colors.accentDim,
        border: "1px solid rgba(34, 211, 238, 0.25)",
        color: colors.accent,
        fontSize: "0.85rem",
        fontWeight: 600,
        letterSpacing: "0.3px",
      }}
    >
      {name}
    </motion.span>
  );
}

/* --- Feature Row --- */
function FeatureRow({
  icon,
  title,
  desc,
  index,
}: {
  icon: string;
  title: string;
  desc: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      style={{
        display: "flex",
        gap: "20px",
        alignItems: "flex-start",
        padding: "24px",
        borderRadius: "16px",
        background: colors.card,
        border: `1px solid ${colors.cardBorder}`,
      }}
    >
      <span style={{ fontSize: "1.8rem", flexShrink: 0 }}>{icon}</span>
      <div>
        <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: colors.text, marginBottom: "6px" }}>
          {title}
        </h4>
        <p style={{ fontSize: "0.92rem", color: colors.textDim, lineHeight: 1.6 }}>{desc}</p>
      </div>
    </motion.div>
  );
}

/* ================================================================
   MAIN COMPONENT
   ================================================================ */
export default function FoodApp({ onBack }: FoodAppProps) {
  const isMobile = useIsMobile();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const orb1Y = useTransform(scrollYProgress, [0, 0.3], [0, -120]);
  const orb2Y = useTransform(scrollYProgress, [0, 0.3], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

  const techStack = ["Flutter", "Dart", "Firebase", "Firestore", "Google Maps API", "Stripe", "Provider"];
  const features = [
    { icon: "\ud83c\udf54", title: "Multi-Restaurant Browse", desc: "Customers can explore food from multiple local restaurants, with categorized menus and real-time availability." },
    { icon: "\ud83d\udcca", title: "Calories & Ingredients", desc: "Each dish displays detailed nutritional info \u2014 calories, ingredients, and allergen warnings." },
    { icon: "\ud83d\udd14", title: "Real-time Order Tracking", desc: "Live order status updates from preparation to delivery, powered by Firebase Realtime Database." },
    { icon: "\ud83d\udcb3", title: "Secure Payments", desc: "Integrated Stripe payment flow with support for cards and mobile wallets." },
    { icon: "\ud83d\udc68\u200d\ud83c\udf73", title: "Supplier Dashboard", desc: "Restaurant owners manage menus, view orders, and update availability from a dedicated panel." },
    { icon: "\ud83d\udccd", title: "Location-based Search", desc: "Google Maps integration for finding nearby restaurants and live delivery tracking." },
  ];

  const metrics = [
    { value: "10+", label: "Screens" },
    { value: "2", label: "User Roles" },
    { value: "Firebase", label: "Backend" },
    { value: "Realtime", label: "Database" },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
    {isMobile ? (
      <div style={{ background: colors.bg, color: colors.text, minHeight: "100vh", position: "relative" }}>

        {/* BACK BUTTON */}
        {onBack && (
          <motion.button
            onClick={onBack}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{
              position: "fixed" as const,
              top: "16px",
              left: "16px",
              zIndex: 100,
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 16px",
              ...glass,
              borderRadius: "14px",
              color: colors.text,
              fontSize: "0.88rem",
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: "0.3px",
            }}
          >
            <FaArrowLeft size={14} />
            Back
          </motion.button>
        )}

        {/* HERO */}
        <div style={{ position: "relative" as const, minHeight: "85vh", display: "flex", flexDirection: "column" as const, justifyContent: "center", padding: "80px 24px 40px", overflow: "hidden" as const }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 18px", borderRadius: "100px", background: colors.accentDim, border: "1px solid rgba(34, 211, 238, 0.2)", color: colors.accent, fontSize: "0.82rem", fontWeight: 600, marginBottom: "28px", width: "fit-content", letterSpacing: "0.5px", textTransform: "uppercase" as const }}>
            📱 Mobile Application — 2023
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }} style={{ fontSize: "clamp(2.2rem, 8vw, 5rem)", fontWeight: 800, lineHeight: 1.08, marginBottom: "24px", background: `linear-gradient(135deg, ${colors.accent} 0%, #818cf8 50%, #c084fc 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Food Delivery App
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} style={{ fontSize: "1rem", color: colors.textDim, lineHeight: 1.7, marginBottom: "40px" }}>
            A modern mobile food ordering platform where customers browse food from multiple suppliers, view calories and ingredients, and place orders — with real-time tracking from kitchen to doorstep.
          </motion.p>
        </div>

        {/* METRICS */}
        <div style={{ padding: "40px 24px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ fontSize: "0.82rem", fontWeight: 600, color: colors.accent, textTransform: "uppercase" as const, letterSpacing: "3px", marginBottom: "16px", textAlign: "center" as const }}>Project Overview</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, textAlign: "center" as const, marginBottom: "40px", color: colors.text }}>Built for Speed & Scale</motion.h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
              {metrics.map((m, i) => (<MetricCard key={i} value={m.value} label={m.label} index={i} />))}
            </div>
          </div>
        </div>

        {/* TECH STACK */}
        <div style={{ padding: "40px 24px" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" as const }}>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ fontSize: "0.82rem", fontWeight: 600, color: colors.accent, textTransform: "uppercase" as const, letterSpacing: "3px", marginBottom: "16px" }}>Technology</motion.p>
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, marginBottom: "40px", color: colors.text }}>Tech Stack</motion.h2>
            <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "12px", justifyContent: "center" }}>
              {techStack.map((t, i) => (<TechBadge key={t} name={t} index={i} />))}
            </div>
          </div>
        </div>

        {/* FEATURES */}
        <div style={{ padding: "40px 24px" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ fontSize: "0.82rem", fontWeight: 600, color: colors.accent, textTransform: "uppercase" as const, letterSpacing: "3px", marginBottom: "16px", textAlign: "center" as const }}>What It Does</motion.p>
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, textAlign: "center" as const, marginBottom: "40px", color: colors.text }}>Key Features</motion.h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
              {features.map((f, i) => (<FeatureRow key={i} icon={f.icon} title={f.title} desc={f.desc} index={i} />))}
            </div>
          </div>
        </div>

        {/* APP SCREENS */}
        <section style={{ padding: "60px 24px 80px" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: "center" as const, marginBottom: "40px" }}>
              <p style={{ fontSize: "0.82rem", fontWeight: 600, color: colors.accent, textTransform: "uppercase" as const, letterSpacing: "3px", marginBottom: "16px" }}>Visual Walkthrough</p>
              <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: colors.text }}>App Screens</h2>
            </motion.div>
            <ImageCarousel images={appImages} accentColor={colors.accent} />
          </div>
        </section>

        {/* FOOTER CTA */}
        <section style={{ padding: "60px 24px 80px", textAlign: "center" as const, position: "relative" as const }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ position: "relative" as const }}>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800, marginBottom: "20px", color: colors.text }}>Interested in working together?</h2>
            <p style={{ color: colors.textDim, fontSize: "1.05rem", lineHeight: 1.6, maxWidth: "500px", margin: "0 auto 36px" }}>I build high-quality mobile experiences. Let's bring your idea to life.</p>
            <motion.button whileTap={{ scale: 0.97 }} onClick={onBack} style={{ padding: "16px 40px", borderRadius: "14px", background: `linear-gradient(135deg, ${colors.accent}, #6366f1)`, color: "#000", fontWeight: 700, fontSize: "0.95rem", border: "none", cursor: "pointer", letterSpacing: "0.3px" }}>← Back to Portfolio</motion.button>
          </motion.div>
        </section>
      </div>
    ) : (
    <Kino>
      <div style={{ background: colors.bg, color: colors.text, minHeight: "100vh", position: "relative" }}>

        {/* BACK BUTTON */}
        {onBack && (
          <motion.button
            onClick={onBack}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{
              position: "fixed" as const,
              top: isMobile ? "16px" : "28px",
              left: isMobile ? "16px" : "28px",
              zIndex: 100,
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: isMobile ? "10px 16px" : "12px 24px",
              ...glass,
              borderRadius: "14px",
              color: colors.text,
              fontSize: "0.88rem",
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: "0.3px",
            }}
          >
            <FaArrowLeft size={14} />
            Back
          </motion.button>
        )}

        {/* =============================================
            HERO SECTION
            ============================================= */}
        <motion.div
          ref={heroRef}
          style={{
            position: "relative" as const,
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column" as const,
            justifyContent: "center",
            padding: "0 clamp(24px, 5vw, 80px)",
            overflow: "hidden" as const,
            opacity: heroOpacity,
          }}
        >
          {/* Background gradient orbs */}
          <motion.div
            style={{
              position: "absolute" as const,
              top: "-10%",
              right: "-5%",
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 65%)",
              pointerEvents: "none" as const,
              y: orb1Y,
            }}
          />
          <motion.div
            style={{
              position: "absolute" as const,
              bottom: "-15%",
              left: "-10%",
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 65%)",
              pointerEvents: "none" as const,
              y: orb2Y,
            }}
          />

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 18px",
              borderRadius: "100px",
              background: colors.accentDim,
              border: "1px solid rgba(34, 211, 238, 0.2)",
              color: colors.accent,
              fontSize: "0.82rem",
              fontWeight: 600,
              marginBottom: "28px",
              width: "fit-content",
              letterSpacing: "0.5px",
              textTransform: "uppercase" as const,
            }}
          >
            {"\ud83d\udcf1"} Mobile Application {"\u2014"} 2023
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            style={{
              fontSize: "clamp(2.8rem, 6vw, 5rem)",
              fontWeight: 800,
              lineHeight: 1.08,
              marginBottom: "24px",
              background: `linear-gradient(135deg, ${colors.accent} 0%, #818cf8 50%, #c084fc 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              maxWidth: "700px",
            }}
          >
            Food Delivery App
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
              color: colors.textDim,
              lineHeight: 1.7,
              maxWidth: "580px",
              marginBottom: "40px",
            }}
          >
            A modern mobile food ordering platform where customers browse food from multiple suppliers,
            view calories and ingredients, and place orders {"\u2014"} with real-time tracking from kitchen to doorstep.
          </motion.p>

          {/* Action Buttons */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            style={{ display: "flex", gap: "16px", flexWrap: "wrap" as const }}
          >
            <motion.a
              href="#"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 28px",
                borderRadius: "14px",
                background: `linear-gradient(135deg, ${colors.accent}, #6366f1)`,
                color: "#000",
                fontWeight: 700,
                fontSize: "0.92rem",
                textDecoration: "none",
                letterSpacing: "0.3px",
              }}
            >
              <FaExternalLinkAlt size={14} />
              Live Demo
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 28px",
                borderRadius: "14px",
                ...glass,
                color: colors.text,
                fontWeight: 600,
                fontSize: "0.92rem",
                textDecoration: "none",
              }}
            >
              <FaGithub size={16} />
              Source Code
            </motion.a>
          </motion.div> */}

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            style={{
              position: "absolute" as const,
              bottom: "40px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column" as const,
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ fontSize: "0.75rem", color: colors.textMuted, letterSpacing: "2px", textTransform: "uppercase" as const }}>
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              style={{
                width: "24px",
                height: "40px",
                borderRadius: "12px",
                border: `2px solid ${colors.textMuted}`,
                display: "flex",
                justifyContent: "center",
                paddingTop: "8px",
              }}
            >
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                style={{
                  width: "4px",
                  height: "10px",
                  borderRadius: "2px",
                  background: colors.textMuted,
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* =============================================
            METRICS
            ============================================= */}
        <Scene duration="50vh">
          <div style={{ padding: "0 clamp(24px, 5vw, 80px)" }}>
            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
              <Reveal animation="fade-up" at={0.1}>
                <p
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: colors.accent,
                    textTransform: "uppercase" as const,
                    letterSpacing: "3px",
                    marginBottom: "16px",
                    textAlign: "center" as const,
                  }}
                >
                  Project Overview
                </p>
              </Reveal>
              <Reveal animation="fade-up" at={0.15}>
                <h2
                  style={{
                    fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                    fontWeight: 800,
                    textAlign: "center" as const,
                    marginBottom: "60px",
                    color: colors.text,
                  }}
                >
                  Built for Speed & Scale
                </h2>
              </Reveal>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "20px",
                }}
              >
                {metrics.map((m, i) => (
                  <MetricCard key={i} value={m.value} label={m.label} index={i} />
                ))}
              </div>
            </div>
          </div>
        </Scene>

        {/* =============================================
            TECH STACK
            ============================================= */}
        <Scene duration="40vh">
          <div style={{ padding: "80px clamp(24px, 5vw, 80px)" }}>
            <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" as const }}>
              <Reveal animation="fade-up" at={0.1}>
                <p
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: colors.accent,
                    textTransform: "uppercase" as const,
                    letterSpacing: "3px",
                    marginBottom: "16px",
                  }}
                >
                  Technology
                </p>
              </Reveal>
              <Reveal animation="fade-up" at={0.2}>
                <h2
                  style={{
                    fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                    fontWeight: 800,
                    marginBottom: "40px",
                    color: colors.text,
                  }}
                >
                  Tech Stack
                </h2>
              </Reveal>
              <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "12px", justifyContent: "center" }}>
                {techStack.map((t, i) => (
                  <TechBadge key={t} name={t} index={i} />
                ))}
              </div>
            </div>
          </div>
        </Scene>

        {/* =============================================
            FEATURES
            ============================================= */}
        <Scene duration="80vh">
          <div style={{ padding: "60px clamp(24px, 5vw, 80px)" }}>
            <div style={{ maxWidth: "900px", margin: "0 auto" }}>
              <Reveal animation="fade-up" at={0.05}>
                <p
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: colors.accent,
                    textTransform: "uppercase" as const,
                    letterSpacing: "3px",
                    marginBottom: "16px",
                    textAlign: "center" as const,
                  }}
                >
                  What It Does
                </p>
              </Reveal>
              <Reveal animation="fade-up" at={0.08}>
                <h2
                  style={{
                    fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                    fontWeight: 800,
                    textAlign: "center" as const,
                    marginBottom: "50px",
                    color: colors.text,
                  }}
                >
                  Key Features
                </h2>
              </Reveal>
              <div style={{ display: "grid", gridTemplateColumns: `repeat(auto-fit, minmax(${isMobile ? "250px" : "350px"}, 1fr))`, gap: "16px" }}>
                {features.map((f, i) => (
                  <FeatureRow key={i} icon={f.icon} title={f.title} desc={f.desc} index={i} />
                ))}
              </div>
            </div>
          </div>
        </Scene>

        {/* =============================================
            APP SCREENS - PDF (lazy loaded)
            ============================================= */}
        <section style={{ padding: "100px clamp(24px, 5vw, 80px) 120px" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: "center" as const, marginBottom: "50px" }}
            >
              <p
                style={{
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: colors.accent,
                  textTransform: "uppercase" as const,
                  letterSpacing: "3px",
                  marginBottom: "16px",
                }}
              >
                Visual Walkthrough
              </p>
              <h2
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                  fontWeight: 800,
                  color: colors.text,
                }}
              >
                App Screens
              </h2>
            </motion.div>

            <ImageCarousel images={appImages} accentColor={colors.accent} />
          </div>
        </section>

        {/* =============================================
            FOOTER CTA
            ============================================= */}
        <section
          style={{
            padding: "100px clamp(24px, 5vw, 80px)",
            textAlign: "center" as const,
            position: "relative" as const,
          }}
        >
          <div
            style={{
              position: "absolute" as const,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${colors.accentGlow} 0%, transparent 60%)`,
              pointerEvents: "none" as const,
              opacity: 0.4,
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ position: "relative" as const }}
          >
            <h2
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                fontWeight: 800,
                marginBottom: "20px",
                color: colors.text,
              }}
            >
              Interested in working together?
            </h2>
            <p
              style={{
                color: colors.textDim,
                fontSize: "1.05rem",
                lineHeight: 1.6,
                maxWidth: "500px",
                margin: "0 auto 36px",
              }}
            >
              I build high-quality mobile experiences. Let's bring your idea to life.
            </p>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={onBack}
              style={{
                padding: "16px 40px",
                borderRadius: "14px",
                background: `linear-gradient(135deg, ${colors.accent}, #6366f1)`,
                color: "#000",
                fontWeight: 700,
                fontSize: "0.95rem",
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.3px",
              }}
            >
              {"\u2190"} Back to Portfolio
            </motion.button>
          </motion.div>
        </section>
      </div>
    </Kino>
    )}
    </>
  );
}
