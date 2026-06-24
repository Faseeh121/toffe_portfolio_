import { type CSSProperties, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaUtensils, FaTools, FaCar, FaComments } from "react-icons/fa";
import { useIsMobile } from "../hooks/useIsMobile";

/* ─── Colors (matching food_app / portfolio) ─── */
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

/* ─── App Data ─── */
const apps = [
  {
    id: "food-app",
    title: "Food Delivery App",
    description:
      "A modern food ordering platform with multi-restaurant browse, calorie tracking, and real-time order tracking.",
    icon: FaUtensils,
    gradient: "linear-gradient(135deg, #f97316, #ef4444)",
    tags: ["Flutter", "Firebase", "Stripe"],
  },
  {
    id: "service-provider-app",
    title: "Service Provider App",
    description:
      "A service booking platform connecting customers with local providers — real-time tracking & payments.",
    icon: FaTools,
    gradient: "linear-gradient(135deg, #22d3ee, #6366f1)",
    tags: ["Flutter", "Firebase", "Google Maps"],
  },
  {
    id: null, // not yet built
    title: "Ride Sharing App",
    description:
      "Real-time ride matching with live GPS tracking, fare estimation, and driver-rider chat.",
    icon: FaCar,
    gradient: "linear-gradient(135deg, #10b981, #059669)",
    tags: ["Flutter", "Firebase", "Maps SDK"],
    comingSoon: true,
  },
  {
    id: "social-media-app",
    title: "Social Media App",
    description:
      "A content-driven social platform with stories, real-time messaging, and community features.",
    icon: FaComments,
    gradient: "linear-gradient(135deg, #a855f7, #ec4899)",
    tags: ["Flutter", "Supabase", "WebSocket"],
  },
];

/* ─── Props ─── */
interface AppNavProps {
  onBack?: () => void;
  onNavigate?: (page: string) => void;
}

/* ─── App Card ─── */
function AppCard({
  app,
  index,
  onNavigate,
}: {
  app: (typeof apps)[0];
  index: number;
  onNavigate?: (page: string) => void;
}) {
  const Icon = app.icon;
  const isClickable = !!app.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
      whileHover={isClickable ? { y: -8, scale: 1.02 } : undefined}
      whileTap={isClickable ? { scale: 0.98 } : undefined}
      onClick={() => isClickable && onNavigate?.(app.id!)}
      style={{
        ...glass,
        padding: "0",
        cursor: isClickable ? "pointer" : "default",
        overflow: "hidden",
        position: "relative",
        opacity: app.comingSoon ? 0.55 : 1,
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* Gradient header strip */}
      <div
        style={{
          height: "6px",
          width: "100%",
          background: app.gradient,
        }}
      />

      <div style={{ padding: "32px 28px 28px" }}>
        {/* Icon circle */}
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "16px",
            background: app.gradient,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <Icon size={24} color="#fff" />
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: "1.25rem",
            fontWeight: 700,
            color: colors.text,
            marginBottom: "10px",
          }}
        >
          {app.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: "0.9rem",
            color: colors.textDim,
            lineHeight: 1.65,
            marginBottom: "20px",
          }}
        >
          {app.description}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
          {app.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: "4px 12px",
                borderRadius: "100px",
                background: colors.accentDim,
                color: colors.accent,
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.3px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        {app.comingSoon ? (
          <span
            style={{
              fontSize: "0.82rem",
              color: colors.textMuted,
              fontWeight: 600,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            Coming Soon
          </span>
        ) : (
          <span
            style={{
              fontSize: "0.85rem",
              color: colors.accent,
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            View Case Study →
          </span>
        )}
      </div>

      {/* Hover glow */}
      {isClickable && (
        <div
          style={{
            position: "absolute",
            top: "-50%",
            right: "-30%",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${colors.accentGlow} 0%, transparent 70%)`,
            pointerEvents: "none",
            opacity: 0,
            transition: "opacity 0.3s ease",
          }}
          className="card-glow"
        />
      )}
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════════════════ */
export default function AppNav({ onBack, onNavigate }: AppNavProps) {
  const isMobile = useIsMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      style={{
        background: colors.bg,
        color: colors.text,
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background orbs */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-15%",
          left: "-10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* Back button */}
      {onBack && (
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          style={{
            position: "fixed",
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

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "120px clamp(24px, 5vw, 80px) 80px",
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 18px",
              borderRadius: "100px",
              background: colors.accentDim,
              border: "1px solid rgba(34, 211, 238, 0.2)",
              color: colors.accent,
              fontSize: "0.8rem",
              fontWeight: 600,
              marginBottom: "24px",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            📱 Mobile Applications
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: "16px",
              background: `linear-gradient(135deg, ${colors.accent} 0%, #818cf8 50%, #c084fc 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Cross-Platform Apps
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            style={{
              fontSize: "1.05rem",
              color: colors.textDim,
              lineHeight: 1.7,
              maxWidth: "550px",
              margin: "0 auto",
            }}
          >
            Built with Flutter & Dart — each app designed for performance,
            scalability, and beautiful user experience.
          </motion.p>
        </motion.div>

        {/* Card Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {apps.map((app, i) => (
            <AppCard key={app.title} app={app} index={i} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    </div>
  );
}
