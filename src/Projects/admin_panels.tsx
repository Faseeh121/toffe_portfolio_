import { useState, useRef, useEffect, type CSSProperties } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useIsMobile } from "../hooks/useIsMobile";

interface PageProps {
  onBack?: () => void;
}

/* ------------------------------------------------------------------ */
/*  PROJECT DATA                                                       */
/* ------------------------------------------------------------------ */

interface ProjectData {
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
  accentColor: string;
  accentBg: string;
  techStack: string[];
  features: { icon: string; title: string; description: string }[];
  screenshots: { src: string; label: string }[];
}

const buildProjects = (base: string): ProjectData[] => {
  const img = (folder: string, file: string) => `${base}images/${folder}/${file}`;

  return [
    {
      title: "Arab News Admin Panel",
      subtitle: "Web-Based CMS for Arab Times News Network",
      description:
        "A comprehensive content management system built for the Arab Times news network. This admin panel provides full editorial control — from multilingual post management and dynamic page/menu builders to newsletter broadcasting, SEO tooling, WordPress migration, and advanced cache & ad management — all reflected in real-time on the live website.",
      gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)",
      accentColor: "#a78bfa",
      accentBg: "rgba(99, 102, 241, 0.15)",
      techStack: ["React", "Node.js", "MongoDB", "Express", "REST API", "i18n", "Redis Cache", "Nodemailer"],
      features: [
        { icon: "📝", title: "Post Management", description: "Translate, edit, delete posts with rich text editor and media uploads" },
        { icon: "📄", title: "Dynamic Page Builder", description: "Create custom pages (Contact, About, etc.) and inject them into the website menu" },
        { icon: "📰", title: "Newsletter Broadcasting", description: "Broadcast special posts to premium website subscribers via email" },
        { icon: "🔗", title: "Menu Builder", description: "Craft custom header/footer menus, social media links, and content — changes reflect instantly on the live site" },
        { icon: "⚙️", title: "Site Settings", description: "Dynamically update website logo, name, and footer contact information" },
        { icon: "🔍", title: "SEO Settings", description: "Generate sitemaps, robots.txt, SEO verification tags, and analytics integration" },
        { icon: "🔄", title: "WordPress Migration", description: "Seamlessly migrate content from WordPress into the custom-built platform" },
        { icon: "🗄️", title: "Cache Management", description: "Hot-reload cache or clear specific caches: posts, translations, pages, settings" },
        { icon: "📢", title: "Ads Management", description: "Configure ad provider, consent forms, AdSense ID, GAM network code, and ad placements" },
        { icon: "🌍", title: "Bulk Translation", description: "Translate posts in bulk quantity into any language" },
        { icon: "🗣️", title: "Language Manager", description: "Add and manage new languages available for translation" },
      ],
      screenshots: [
        { src: img("Arab_news_admin", "Main Screen.png"), label: "Dashboard — Overview & Quick Actions" },
        { src: img("Arab_news_admin", "Post_add.png"), label: "Post Editor — Rich Content with Translation" },
        { src: img("Arab_news_admin", "Web_Pages.png"), label: "Page Manager — Dynamic Website Pages" },
        { src: img("Arab_news_admin", "Menu_builder.png"), label: "Menu Builder — Header, Footer & Social Links" },
        { src: img("Arab_news_admin", "Seo_settings.png"), label: "SEO Settings — Sitemap, Robots & Analytics" },
        { src: img("Arab_news_admin", "Ads_setting.png"), label: "Ads Management — Provider & Placement Config" },
        { src: img("Arab_news_admin", "Cache_management.png"), label: "Cache Management — Selective Cache Control" },
        { src: img("Arab_news_admin", "WordPress_migration.png"), label: "WordPress Migration — Import Content" },
        { src: img("Arab_news_admin", "translation.png"), label: "Bulk Translation — Multi-Language Support" },
        { src: img("Arab_news_admin", "language.png"), label: "Language Manager — Add New Languages" },
        { src: img("Arab_news_admin", "Media.png"), label: "Media Library — Asset Management" },
      ],
    },
    {
      title: "E-Commerce Admin Panel",
      subtitle: "Full-Featured Store Management Dashboard",
      description:
        "A powerful e-commerce administration dashboard that gives store owners complete control over products, categories, orders, users, analytics, and SEO. Features include multi-image product uploads with color-variant tagging, hierarchical category management, order status tracking, real-time analytics with traffic & sales insights, and integrated AdSense & social media configuration.",
      gradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)",
      accentColor: "#60a5fa",
      accentBg: "rgba(59, 130, 246, 0.15)",
      techStack: ["React", "Node.js", "MongoDB", "Express", "REST API", "AdSense", "Chart.js", "Multer"],
      features: [
        { icon: "📊", title: "Dashboard Overview", description: "At-a-glance stats for orders, products, users, and total revenue" },
        { icon: "🛍️", title: "Product Management", description: "Add products with detailed fields — name, description, price, brand, category, stock, appliance type, use case, discount, and popularity tags" },
        { icon: "🎨", title: "Color Variants & Image Tagging", description: "Upload up to 10 product images, add color variants, and tag each image with its color" },
        { icon: "✅", title: "Product Flags", description: "Mark products as Featured, Smart Technology, or Energy Efficient" },
        { icon: "📁", title: "Category Management", description: "Create, edit, delete categories with descriptions and category images in a grid layout" },
        { icon: "📦", title: "Order Management", description: "View and update order statuses with a centralized order tracking system" },
        { icon: "👥", title: "User Management", description: "View, manage, and monitor registered users" },
        { icon: "📈", title: "Analytics Dashboard", description: "Track page views, unique visitors, orders, revenue, avg order value, and AdSense earnings with date range filters" },
        { icon: "🔎", title: "SEO & AdSense Settings", description: "Configure site title, meta description, keywords, OG image, Twitter handle, Google Analytics, and site verification" },
        { icon: "🔗", title: "Social Media & Business Info", description: "Manage social links (Facebook, Twitter, Instagram, Pinterest, YouTube) and business contact details" },
      ],
      screenshots: [
        { src: img("e-commerce-Admin_panel", "Admin_dashboard.png"), label: "Dashboard — Stats & Quick Navigation" },
        { src: img("e-commerce-Admin_panel", "e-commerce_admin_add2.png"), label: "Add Product — Details, Price, Category & Stock" },
        { src: img("e-commerce-Admin_panel", "e-commerce_admin_add1.png"), label: "Product Colors & Multi-Image Upload with Tagging" },
        { src: img("e-commerce-Admin_panel", "e-commerce_admin_add3.png"), label: "Product Flags — Featured, Smart Tech, Energy Efficient" },
        { src: img("e-commerce-Admin_panel", "admin_manage_catagory2.png"), label: "Category Grid — Browse & Manage Categories" },
        { src: img("e-commerce-Admin_panel", "admin_manage_catagory1.png"), label: "Edit Category — Name, Description & Image" },
        { src: img("e-commerce-Admin_panel", "Admin_analytics.png"), label: "Analytics — Traffic, Revenue & AdSense Performance" },
        { src: img("e-commerce-Admin_panel", "Admin_SEO & Ads1.png"), label: "SEO Settings — Title, Meta, Keywords & Analytics ID" },
        { src: img("e-commerce-Admin_panel", "Admin_SEO & Ads2.png"), label: "AdSense & Social Media Configuration" },
        { src: img("e-commerce-Admin_panel", "Admin_SEO & Ads3.png"), label: "Business Information & Contact Details" },
      ],
    },
  ];
};

/* ------------------------------------------------------------------ */
/*  CAROUSEL COMPONENT                                                 */
/* ------------------------------------------------------------------ */

function Carousel({
  screenshots,
  accentColor,
}: {
  screenshots: ProjectData["screenshots"];
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

  // Auto-advance
  useEffect(() => {
    autoRef.current = setInterval(next, 5000);
    return () => {
      if (autoRef.current) clearInterval(autoRef.current);
    };
  }, [current]);

  // Scroll active thumbnail into view (using scrollLeft to avoid page-level scroll jumps)
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
    <div style={css.carousel}>
      {/* Main Image */}
      <div style={css.carouselStage}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.img
            key={screenshots[current].src}
            src={screenshots[current].src}
            alt={screenshots[current].label}
            style={css.carouselImg}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            draggable={false}
          />
        </AnimatePresence>

        {/* Gradient overlay at bottom */}
        <div style={css.carouselGradient} />

        {/* Navigation Arrows */}
        <div style={css.carouselControls}>
          <motion.button
            whileHover={{ scale: 1.12, backgroundColor: "rgba(0,0,0,0.7)" }}
            whileTap={{ scale: 0.92 }}
            onClick={(e) => { e.stopPropagation(); prev(); }}
            style={css.carouselArrow}
            aria-label="Previous"
          >
            ‹
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.12, backgroundColor: "rgba(0,0,0,0.7)" }}
            whileTap={{ scale: 0.92 }}
            onClick={(e) => { e.stopPropagation(); next(); }}
            style={css.carouselArrow}
            aria-label="Next"
          >
            ›
          </motion.button>
        </div>

        {/* Counter badge */}
        <div style={css.carouselCounter}>
          {current + 1} / {screenshots.length}
        </div>
      </div>

      {/* Caption */}
      <motion.div
        key={`cap-${current}`}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        style={css.carouselCaption}
      >
        {screenshots[current].label}
      </motion.div>

      {/* Thumbnails */}
      <div ref={thumbRef} style={css.thumbStrip}>
        {screenshots.map((shot, idx) => {
          const active = idx === current;
          return (
            <motion.div
              key={shot.src}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => go(idx)}
              style={{
                ...css.thumb,
                borderColor: active ? accentColor : "rgba(255,255,255,0.08)",
                boxShadow: active ? `0 4px 20px ${accentColor}40` : "none",
                opacity: active ? 1 : 0.55,
              }}
            >
              <img src={shot.src} alt={shot.label} style={css.thumbImg} />
            </motion.div>
          );
        })}
      </div>

      {/* Dots */}
      <div style={css.dotRow}>
        {screenshots.map((_, idx) => (
          <div
            key={idx}
            onClick={() => go(idx)}
            style={{
              ...css.dot,
              width: idx === current ? 24 : 8,
              background: idx === current ? accentColor : "rgba(255,255,255,0.2)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FEATURE CARD                                                       */
/* ------------------------------------------------------------------ */

function FeatureCard({
  feature,
  index,
  accentColor,
  accentBg,
}: {
  feature: ProjectData["features"][number];
  index: number;
  accentColor: string;
  accentBg: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{
        y: -6,
        boxShadow: `0 20px 50px ${accentColor}25`,
        borderColor: `${accentColor}50`,
      }}
      style={css.featureCard}
    >
      <div style={{ ...css.featureIcon, background: accentBg }}>{feature.icon}</div>
      <div style={css.featureTitle}>{feature.title}</div>
      <div style={css.featureDesc}>{feature.description}</div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  PROJECT SECTION                                                    */
/* ------------------------------------------------------------------ */

function ProjectSection({ project, index }: { project: ProjectData; index: number }) {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      style={{
        ...css.projectSection,
        background:
          index % 2 === 0
            ? "radial-gradient(ellipse at 20% 0%, rgba(99,102,241,0.06), transparent 60%)"
            : "radial-gradient(ellipse at 80% 0%, rgba(59,130,246,0.06), transparent 60%)",
      }}
    >
      {/* Section Number + Badge */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={css.projectBadge}
      >
        <span style={{ ...css.projectBadgeNum, background: project.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span style={css.projectBadgeSlash}>/</span>
        <span style={css.projectBadgeTotal}>02</span>
      </motion.div>

      {/* Title & Description */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.15 }}
        style={css.projectTitle}
      >
        {project.title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.25 }}
        style={css.projectSubtitle}
      >
        {project.subtitle}
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.35 }}
        style={css.projectDesc}
      >
        {project.description}
      </motion.p>

      {/* Tech Stack */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
        style={css.techRow}
      >
        {project.techStack.map((t) => (
          <motion.span
            key={t}
            whileHover={{ scale: 1.08, borderColor: project.accentColor }}
            style={{ ...css.techTag, borderColor: `${project.accentColor}40` }}
          >
            {t}
          </motion.span>
        ))}
      </motion.div>

      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.45 }}
      >
        <h3 style={css.sectionLabel}>
          <span style={{ color: project.accentColor }}>●</span> Screenshots
        </h3>
        <Carousel screenshots={project.screenshots} accentColor={project.accentColor} />
      </motion.div>

      {/* Features */}
      <div style={{ marginTop: 56 }}>
        <h3 style={css.sectionLabel}>
          <span style={{ color: project.accentColor }}>●</span> Key Features
        </h3>
        <div style={{ ...css.featuresGrid, ...(isMobile ? { gridTemplateColumns: "1fr" } : {}) }}>
          {project.features.map((f, i) => (
            <FeatureCard
              key={f.title}
              feature={f}
              index={i}
              accentColor={project.accentColor}
              accentBg={project.accentBg}
            />
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={css.divider} />
    </motion.section>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN EXPORT                                                        */
/* ------------------------------------------------------------------ */

export default function AdminPanels({ onBack }: PageProps) {
  const isMobile = useIsMobile();
  const assetBase = (import.meta as any)?.env?.BASE_URL || "/";
  const projects = buildProjects(assetBase);

  return (
    <div style={css.page as any}>
      {/* Ambient Noise Grain */}
      <div style={css.grain} />

      {/* Floating Orbs */}
      <motion.div
        style={css.orbA}
        animate={{ y: [0, -40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        style={css.orbB}
        animate={{ y: [0, 50, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Back Button */}
      {onBack && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.04, x: -4, backgroundColor: "rgba(255,255,255,0.08)" }}
          whileTap={{ scale: 0.96 }}
          onClick={onBack}
          style={{ ...css.backBtn, ...(isMobile ? { top: 16, left: 16, padding: "8px 14px", fontSize: "0.85rem" } : {}) }}
        >
          <span style={{ fontSize: "1.2em" }}>←</span> Back to Portfolio
        </motion.button>
      )}

      {/* Hero Header */}
      <header style={css.hero}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={css.heroInner}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            style={css.heroBadge}
          >
            🛠️ Admin Panels
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={css.heroTitle}
          >
            Web-Based{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #3b82f6 50%, #8b5cf6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Admin Panels
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={css.heroSub}
          >
            Comprehensive management dashboards that empower administrators to control
            every aspect of their platforms — from content and SEO to monetization and analytics.
          </motion.p>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            style={css.quickStats}
          >
            {[
              { value: "2", label: "Projects" },
              { value: "21+", label: "Features" },
              { value: "100%", label: "Custom Built" },
            ].map((s) => (
              <div key={s.label} style={css.quickStat}>
                <div style={css.quickStatValue}>{s.value}</div>
                <div style={css.quickStatLabel}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={css.scrollHint}
        >
          <div style={css.scrollMouse}>
            <motion.div
              style={css.scrollWheel}
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
          <span style={css.scrollLabel}>Scroll to explore</span>
        </motion.div>
      </header>

      {/* Project Sections */}
      {projects.map((project, index) => (
        <ProjectSection key={project.title} project={project} index={index} />
      ))}

      {/* Footer CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={css.footerCta}
      >
        <h3 style={css.footerCtaTitle}>Interested in a custom admin panel?</h3>
        <p style={css.footerCtaText}>
          Let's build a powerful management dashboard tailored to your business needs.
        </p>
        {onBack && (
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(99, 102, 241, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            style={css.footerCtaBtn}
          >
            ← Return to Portfolio
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  STYLES                                                             */
/* ------------------------------------------------------------------ */

const css: Record<string, CSSProperties> = {
  /* Page */
  page: {
    minHeight: "100vh",
    background: "#06080d",
    color: "#f5f5f7",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "SF Pro Display", Roboto, sans-serif',
    position: "relative",
    overflowX: "clip",
  },
  grain: {
    position: "fixed",
    inset: 0,
    pointerEvents: "none",
    zIndex: 0,
    opacity: 0.03,
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
    backgroundRepeat: "repeat",
    backgroundSize: "128px 128px",
  },
  orbA: {
    position: "fixed",
    top: "15%",
    left: "5%",
    width: 500,
    height: 500,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
    filter: "blur(90px)",
    pointerEvents: "none",
    zIndex: 0,
  },
  orbB: {
    position: "fixed",
    bottom: "10%",
    right: "8%",
    width: 450,
    height: 450,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 70%)",
    filter: "blur(90px)",
    pointerEvents: "none",
    zIndex: 0,
  },

  /* Back */
  backBtn: {
    position: "fixed",
    top: 28,
    left: 28,
    zIndex: 100,
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 20px",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(10,10,15,0.7)",
    backdropFilter: "blur(16px)",
    color: "#f5f5f7",
    fontSize: "0.9375rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.3s",
  },

  /* Hero */
  hero: {
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "120px clamp(24px, 6vw, 80px) 80px",
    zIndex: 1,
  },
  heroInner: {
    maxWidth: 820,
  },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 20px",
    borderRadius: 999,
    background: "rgba(99,102,241,0.12)",
    border: "1px solid rgba(99,102,241,0.25)",
    fontSize: "0.9rem",
    fontWeight: 700,
    letterSpacing: "0.04em",
    marginBottom: 28,
    color: "#a78bfa",
  },
  heroTitle: {
    fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
    fontWeight: 900,
    letterSpacing: "-0.04em",
    lineHeight: 1.1,
    margin: "0 0 24px",
    color: "#fff",
  },
  heroSub: {
    fontSize: "clamp(1.05rem, 2vw, 1.3rem)",
    color: "rgba(255,255,255,0.55)",
    lineHeight: 1.7,
    maxWidth: 680,
    margin: "0 auto 40px",
  },
  quickStats: {
    display: "flex",
    gap: 32,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  quickStat: {
    padding: "20px 28px",
    borderRadius: 16,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
    backdropFilter: "blur(8px)",
    minWidth: 120,
  },
  quickStatValue: {
    fontSize: "1.75rem",
    fontWeight: 800,
    background: "linear-gradient(135deg, #6366f1, #3b82f6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: 4,
  },
  quickStatLabel: {
    fontSize: "0.85rem",
    color: "rgba(255,255,255,0.45)",
    fontWeight: 500,
  },
  scrollHint: {
    position: "absolute",
    bottom: 40,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  scrollMouse: {
    width: 22,
    height: 36,
    border: "2px solid rgba(255,255,255,0.25)",
    borderRadius: 11,
    display: "flex",
    justifyContent: "center",
    paddingTop: 7,
  },
  scrollWheel: {
    width: 3,
    height: 7,
    background: "rgba(255,255,255,0.4)",
    borderRadius: 2,
  },
  scrollLabel: {
    fontSize: "0.7rem",
    color: "rgba(255,255,255,0.3)",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    fontWeight: 600,
  },

  /* Project Section */
  projectSection: {
    position: "relative",
    zIndex: 1,
    padding: "80px clamp(24px, 6vw, 80px) 40px",
    maxWidth: 1100,
    margin: "0 auto",
  },
  projectBadge: {
    display: "flex",
    alignItems: "baseline",
    gap: 6,
    marginBottom: 20,
  },
  projectBadgeNum: {
    fontSize: "1.5rem",
    fontWeight: 900,
    letterSpacing: "-0.02em",
  },
  projectBadgeSlash: {
    fontSize: "1.2rem",
    color: "rgba(255,255,255,0.15)",
    fontWeight: 300,
  },
  projectBadgeTotal: {
    fontSize: "1rem",
    color: "rgba(255,255,255,0.25)",
    fontWeight: 600,
  },
  projectTitle: {
    fontSize: "clamp(2rem, 5vw, 3.2rem)",
    fontWeight: 900,
    letterSpacing: "-0.03em",
    lineHeight: 1.15,
    margin: "0 0 8px",
    color: "#fff",
  },
  projectSubtitle: {
    fontSize: "1.15rem",
    fontWeight: 600,
    color: "rgba(255,255,255,0.5)",
    marginBottom: 18,
    letterSpacing: "-0.01em",
  },
  projectDesc: {
    fontSize: "1.05rem",
    lineHeight: 1.7,
    color: "rgba(255,255,255,0.6)",
    maxWidth: 800,
    marginBottom: 24,
  },

  /* Tech Tags */
  techRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 48,
  },
  techTag: {
    padding: "7px 16px",
    borderRadius: 10,
    border: "1px solid rgba(99,102,241,0.3)",
    background: "rgba(99,102,241,0.08)",
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "#e0e0ff",
    transition: "all 0.25s",
    cursor: "default",
  },

  /* Section Label */
  sectionLabel: {
    fontSize: "1rem",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.45)",
    marginBottom: 20,
    display: "flex",
    alignItems: "center",
    gap: 10,
  },

  /* Carousel */
  carousel: {
    borderRadius: 20,
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.02)",
    boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
    backdropFilter: "blur(6px)",
  },
  carouselStage: {
    position: "relative",
    width: "100%",
    aspectRatio: "16/9.5",
    overflow: "hidden",
    background: "radial-gradient(ellipse at center, rgba(20,20,30,0.9), #08090e)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  carouselImg: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
  },
  carouselGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    background: "linear-gradient(transparent, rgba(8,9,14,0.8))",
    pointerEvents: "none",
  },
  carouselControls: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 14px",
    pointerEvents: "none",
  },
  carouselArrow: {
    pointerEvents: "auto",
    width: 44,
    height: 44,
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(0,0,0,0.5)",
    backdropFilter: "blur(8px)",
    color: "#fff",
    fontSize: "1.5rem",
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  carouselCounter: {
    position: "absolute",
    top: 14,
    right: 16,
    padding: "5px 14px",
    borderRadius: 10,
    background: "rgba(0,0,0,0.55)",
    backdropFilter: "blur(8px)",
    fontSize: "0.8rem",
    fontWeight: 700,
    color: "rgba(255,255,255,0.7)",
    letterSpacing: "0.05em",
  },
  carouselCaption: {
    padding: "14px 20px",
    fontSize: "0.95rem",
    fontWeight: 500,
    color: "rgba(255,255,255,0.8)",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    background: "rgba(0,0,0,0.3)",
    letterSpacing: "0.01em",
  },
  thumbStrip: {
    display: "flex",
    gap: 8,
    overflowX: "auto",
    padding: "10px 12px 6px",
    scrollBehavior: "smooth",
    scrollbarWidth: "none",
  },
  thumb: {
    flex: "0 0 110px",
    height: 68,
    borderRadius: 10,
    overflow: "hidden",
    border: "2px solid rgba(255,255,255,0.08)",
    cursor: "pointer",
    transition: "all 0.25s",
  },
  thumbImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  dotRow: {
    display: "flex",
    gap: 6,
    justifyContent: "center",
    padding: "10px 0 14px",
  },
  dot: {
    height: 6,
    borderRadius: 3,
    cursor: "pointer",
    transition: "all 0.25s",
  },

  /* Features */
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 16,
  },
  featureCard: {
    padding: "22px 20px",
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.06)",
    background: "rgba(255,255,255,0.02)",
    backdropFilter: "blur(6px)",
    transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
    cursor: "default",
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    display: "grid",
    placeItems: "center",
    fontSize: "1.3rem",
    marginBottom: 14,
  },
  featureTitle: {
    fontSize: "1rem",
    fontWeight: 700,
    color: "#fff",
    marginBottom: 6,
    letterSpacing: "-0.01em",
  },
  featureDesc: {
    fontSize: "0.87rem",
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.5)",
  },

  /* Divider */
  divider: {
    height: 1,
    margin: "64px 0 24px",
    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
  },

  /* Footer CTA */
  footerCta: {
    position: "relative",
    zIndex: 1,
    textAlign: "center",
    padding: "80px clamp(24px, 6vw, 80px) 100px",
  },
  footerCtaTitle: {
    fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    marginBottom: 12,
    color: "#fff",
  },
  footerCtaText: {
    fontSize: "1.1rem",
    color: "rgba(255,255,255,0.45)",
    marginBottom: 32,
    lineHeight: 1.6,
  },
  footerCtaBtn: {
    padding: "16px 40px",
    fontSize: "1rem",
    fontWeight: 700,
    color: "#fff",
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    border: "none",
    borderRadius: 14,
    cursor: "pointer",
    transition: "all 0.3s",
  },
};
