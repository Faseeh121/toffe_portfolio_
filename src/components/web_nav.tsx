import { type CSSProperties, useEffect } from "react";
import { motion } from "framer-motion";
import { FaBlog, FaNewspaper, FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import { useIsMobile } from "../hooks/useIsMobile";

const colors = {
  accent: "#8b5cf6",
  accentDim: "rgba(139, 92, 246, 0.15)",
  accentGlow: "rgba(139, 92, 246, 0.25)",
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

const websites = [
  {
    id: "blog-website",
    title: "Blog Website",
    description: "Clean publishing experience with SEO, tagging, search, and subscriptions.",
    icon: FaBlog,
    gradient: "linear-gradient(135deg, #ec4899, #8b5cf6)",
    tags: ["Next.js", "MDX", "SEO"],
  },
  {
    id: "arab-news-website",
    title: "Arab News Website",
    description: "Multilingual newsroom with live updates, rich media, and editorial workflows.",
    icon: FaNewspaper,
    gradient: "linear-gradient(135deg, #22d3ee, #0ea5e9)",
    tags: ["Next.js", "i18n", "CMS"],
  },
  {
    id: "ecommerce-website",
    title: "E‑commerce Website",
    description: "High-conversion storefront with payments, analytics, and product discovery.",
    icon: FaShoppingCart,
    gradient: "linear-gradient(135deg, #f59e0b, #ef4444)",
    tags: ["React", "Stripe", "Headless"],
  },
];

interface WebNavProps {
  onBack?: () => void;
  onNavigate?: (page: string) => void;
}

function WebsiteCard({ site, index, onNavigate }: { site: (typeof websites)[0]; index: number; onNavigate?: (page: string) => void }) {
  const Icon = site.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onNavigate?.(site.id)}
      style={{
        ...glass,
        padding: 0,
        cursor: "pointer",
        overflow: "hidden",
        position: "relative",
        transition: "box-shadow 0.3s ease",
      }}
    >
      <div style={{ height: "6px", width: "100%", background: site.gradient }} />
      <div style={{ padding: "28px" }}>
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "16px",
            background: site.gradient,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "18px",
          }}
        >
          <Icon size={24} color="#fff" />
        </div>
        <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: colors.text, marginBottom: "10px" }}>{site.title}</h3>
        <p style={{ fontSize: "0.9rem", color: colors.textDim, lineHeight: 1.6, marginBottom: "16px" }}>{site.description}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {site.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: "4px 12px",
                borderRadius: "999px",
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
      </div>
    </motion.div>
  );
}

export default function WebNav({ onBack, onNavigate }: WebNavProps) {
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
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 65%)",
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
          background: "radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

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

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "120px clamp(24px, 5vw, 80px) 80px",
        }}
      >
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
              border: "1px solid rgba(139, 92, 246, 0.25)",
              color: colors.accent,
              fontSize: "0.8rem",
              fontWeight: 600,
              marginBottom: "24px",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            🌐 Website Case Studies
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
              color: colors.text,
            }}
          >
            Choose a category to explore
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            style={{
              fontSize: "1.05rem",
              color: colors.textDim,
              lineHeight: 1.7,
              maxWidth: "620px",
              margin: "0 auto",
            }}
          >
            Curated website builds across content, news, and commerce. Pick one to see the case study.
          </motion.p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {websites.map((site, i) => (
            <WebsiteCard key={site.id} site={site} index={i} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    </div>
  );
}
