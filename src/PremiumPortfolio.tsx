import { type CSSProperties, useState, useRef, type FormEvent } from "react";
import { useIsMobile } from "./hooks/useIsMobile";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import {
  Kino,
  Scene,
  Reveal,
  Parallax,
  Counter,
  Progress,
  StickyHeader,
  ScrollTransform,
  TextReveal,
  Marquee,
  HorizontalScroll,
  Panel,
} from "react-kino";

// Premium Portfolio with Enhanced Animations
// testing vercel
interface PremiumPortfolioProps {
  onNavigate?: (page: string) => void;
}

export function PremiumPortfolio({ onNavigate }: PremiumPortfolioProps) {
  const isMobile = useIsMobile();
  const projectsSectionRef = useRef<HTMLElement>(null);
  const contactSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: projectsSectionRef,
    offset: ["start start", "end end"],
  });

  // Pre-calculate all transform values at component level


  const timelineOpacity = useTransform(scrollYProgress, [0, 0.05, 0.92, 1], [0, 1, 1, 0]);
  const progressOpacity = useTransform(scrollYProgress, [0, 0.05, 0.92, 1], [0, 1, 1, 0]);

  // Track which project is currently active based on scroll position
  const [activeProject, setActiveProject] = useState(-1);
  const [forceShowContact, setForceShowContact] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<"idle" | "success" | "error">("idle");
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // 5 panels total: title(0) + 4 projects
    const idx = Math.floor(latest * 5) - 1;
    setActiveProject(Math.max(-1, Math.min(idx, 3)));
  });

  const handleContactClick = () => {
    setForceShowContact(true);
    contactSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => setForceShowContact(false), 1200);
  };

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSending) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    setSendStatus("idle");
    setIsSending(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.error || "Failed to send message");
      }

      setSendStatus("success");
      form.reset();
    } catch (error) {
      console.error("Contact request failed", error);
      setSendStatus("error");
    } finally {
      setIsSending(false);
    }
  };
  // Sample project data - you'll replace this with your actual projects
  const projects: Array<{
    id: number;
    title: string;
    description: string;
    year: string;
    tags: string[];
    image: string;
    metrics: Record<string, string>;
    caseStudy?: string;
  }> = [
      {
        id: 1,
        title: "Websites",
        description: "Full-stack MERN application with real-time inventory and payment integration",
        year: "2024",
        tags: ["React", "Node.js", "MongoDB", "Stripe"],
        image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&h=600&fit=crop",
        metrics: { users: "50K+", performance: "99.9%", rating: "4.9/5" },
        caseStudy: "websites",
      },
      {
        id: 2,
        title: "Web Based Admin Panels For Mobile Apps",
        description: "Data visualization platform To Monitors and Analyze Business Metrics",
        year: "2024",
        tags: ["React", "RAG", "Python", "TensorFlow"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        metrics: { accuracy: "94%", speed: "2.3s", datasets: "100+" },
        caseStudy: "admin-panels",
      },
      {
        id: 3,
        title: "Mobile Apps",
        description: "Cross-platform Food Delivery Apps,Service Provider Apps,Ride Sharing Apps,Social Media Apps,",
        year: "2023",
        tags: ["Flutter", "Dart", "Firebase", "Supabase", "Redux", "MongoDB"],
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop",
        metrics: { downloads: "100K+", retention: "78%", rating: "4.8/5" },
        caseStudy: "mobile-apps",
      },
      // {
      //   id: 4,
      //   title: "SaaS Analytics Tool",
      //   description: "Business Automation Agents Development and custom dashboards",
      //   year: "2023",
      //   tags: ["React.js", "RAG", "PostgreSQL", "Docker"],
      //   image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      //   metrics: { clients: "250+", uptime: "99.98%", reports: "1M+" },
      // },
    ];

  const skills = [
    "React & Flutter",
    "Dart ,MYSQL",
    "Node.js",
    "Python",
    "MongoDB & PostgreSQL",
    "GraphQL & REST APIs",
    "Docker",
    "UI/UX Design",
    "Framer Motion",
  ];

  const stats = [
    { value: 2, label: "Years Experience", format: (n: number) => `${n}+` },
    { value: 20, label: "Projects Completed", format: (n: number) => `${n}+` },
    { value: 15, label: "Happy Clients", format: (n: number) => `${n}+` },
    { value: 99, label: "Client Satisfaction", format: (n: number) => `${n}%` },
  ];

  return (
    <div style={styles.container}>
      <Kino>
        <Progress color="#6366f1" position="top" />

        {/* Premium Sticky Header */}
        <StickyHeader
          threshold={50}
          background="rgba(10, 10, 15, 0.85)"
          blur
          style={styles.header}
        >
          <div style={styles.headerContent}>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              style={styles.logo}
            >
              Portfolio
            </motion.span>
            <nav style={styles.nav}>
              {["Work", "About", "Contact"].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -2 }}
                  style={styles.navLink}
                >
                  {item}
                </motion.a>
              ))}
            </nav>
          </div>
        </StickyHeader>

        {/* Hero Section with Gradient Orbs */}
        <Scene duration="85vh">
          {(progress) => (
            <section style={styles.hero}>
              {/* Animated Background Orbs */}
              <div style={styles.orbContainer}>
                <motion.div
                  style={{
                    ...styles.orb,
                    background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
                    top: "20%",
                    left: "10%",
                  }}
                  animate={{
                    y: [0, -30, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  style={{
                    ...styles.orb,
                    background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
                    top: "60%",
                    right: "15%",
                  }}
                  animate={{
                    y: [0, 40, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>

              <Parallax speed={0.5}>
                <div style={styles.gridPattern} />
              </Parallax>

              <div style={styles.heroContent}>
                <ScrollTransform
                  from={{ scale: 1, y: 0, opacity: 1 }}
                  to={{ scale: 0.9, y: -80, opacity: 0 }}
                  span={0.7}
                  easing="ease-out-cubic"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                  >
                    <motion.p
                      style={styles.greeting}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      Hello, I'm
                    </motion.p>
                    <h1 style={styles.name}>
                      <motion.span
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                      >
                        Muhammad Faseeh Anjum
                      </motion.span>
                    </h1>
                    <motion.h2
                      style={styles.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                    >
                      Full-Stack Developer & Creative Technologist
                    </motion.h2>
                    <motion.p
                      style={styles.subtitle}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                    >
                      Crafting exceptional digital experiences with modern technologies
                    </motion.p>
                  </motion.div>

                  <motion.div
                    style={styles.ctaGroup}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 }}
                  >
                    <motion.button
                      style={styles.primaryBtn}
                      whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(99, 102, 241, 0.4)" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      View Work
                    </motion.button>
                    <motion.button
                      style={styles.secondaryBtn}
                      whileHover={{ scale: 1.05, borderColor: "#6366f1" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleContactClick}
                    >
                      Get in Touch
                    </motion.button>
                  </motion.div>
                </ScrollTransform>

                {/* Scroll Indicator */}
                <motion.div
                  style={{
                    ...styles.scrollIndicator,
                    opacity: Math.max(0, 1 - progress * 3),
                  }}
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div style={styles.mouse}>
                    <motion.div
                      style={styles.wheel}
                      animate={{ y: [0, 8, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </div>
                  <span style={styles.scrollText}>Scroll</span>
                </motion.div>
              </div>
            </section>
          )}
        </Scene>

        {/* Stats Section with Counters */}
        <Scene duration="65vh">
          <section style={styles.statsSection}>
            <div style={{ ...styles.statsGrid, ...(isMobile ? { gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" } : {}) }}>
              {stats.map((stat, i) => (
                <Reveal key={i} animation="fade-up" at={0.1 + i * 0.2} duration={800}>
                  <motion.div
                    style={styles.statCard}
                    whileHover={{
                      y: -4,
                      boxShadow: "0 20px 60px rgba(99, 102, 241, 0.2)",
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div style={styles.statValue}>
                      <Counter
                        from={0}
                        to={stat.value}
                        at={0.1 + i * 0.2}
                        span={0.6}
                        format={stat.format}
                        easing="ease-out-cubic"
                      />
                    </div>
                    <div style={styles.statLabel}>{stat.label}</div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </section>
        </Scene>

        {/* About Section with Text Reveal */}
        <Scene duration="80vh">
          <section style={styles.aboutSection}>
            <Reveal animation="fade-up" at={0.05} duration={4000}>
              <motion.h2
                style={styles.sectionTitle}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                About Me
              </motion.h2>
            </Reveal>
            <div style={styles.aboutContent}>
              <TextReveal
                mode="word"
                at={0.1}
                span={0.8}
                color="#ffffff"
                dimColor="rgba(229, 207, 207, 0.86)"
              >
                I'm a passionate full-stack developer with a keen eye for design and a love for creating seamless digital experiences. With over 2 years of experience, I specialize in building scalable web applications, implementing complex UI animations, and transforming ideas into reality. My approach combines technical excellence with creative problem-solving to deliver products that users love.
              </TextReveal>
            </div>
          </section>
        </Scene>

        {/* Skills Marquee */}
        <Scene duration="65vh" pin={false}>
          <section style={styles.skillsSection}>
            <motion.h3
              style={styles.skillsTitle}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Technical Expertise
            </motion.h3>
            <Marquee speed={50} gap={48} pauseOnHover>
              {skills.map((skill, i) => (
                <motion.div
                  key={i}
                  style={styles.skillChip}
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {skill}
                </motion.div>
              ))}
            </Marquee>
          </section>
        </Scene>

        {/* Projects Section */}
        <section id="work" ref={projectsSectionRef} style={{ position: "relative", background: "linear-gradient(180deg, #0a0a0f 0%, rgba(99, 102, 241, 0.03) 30%, #0a0a0f 100%)" }}>
          {/* Fixed Timeline Navigation — desktop only */}
          {!isMobile && (
            <motion.div style={{ ...styles.timelineNav, opacity: timelineOpacity }}>
              <div style={styles.timelineTitle}>SELECTED WORK</div>
              <div style={styles.timelineItems}>
                <div style={styles.timelineTrack} />
                <motion.div
                  style={{
                    ...styles.timelineProgressLine,
                    scaleY: scrollYProgress,
                  }}
                />
                {[
                  { year: "2024", label: "Websites" },
                  { year: "2024", label: "Dashboards" },
                  { year: "2023", label: "Mobile App" },
                ].map((item, index) => (
                  <div key={index} style={styles.timelineItem}>
                    <motion.div
                      style={styles.timelineDot}
                      animate={{
                        scale: activeProject === index ? 1.5 : 1,
                        backgroundColor:
                          activeProject === index
                            ? "#6366f1"
                            : activeProject > index
                              ? "rgba(99,102,241,0.4)"
                              : "rgba(255,255,255,0.15)",
                        boxShadow:
                          activeProject === index
                            ? "0 0 16px rgba(99,102,241,0.8), 0 0 40px rgba(99,102,241,0.3)"
                            : "0 0 0px rgba(99,102,241,0)",
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                    <motion.div
                      style={styles.timelineContent}
                      animate={{
                        opacity: activeProject === index ? 1 : 0.3,
                        x: activeProject === index ? 6 : 0,
                      }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      <div
                        style={{
                          ...styles.timelineYear,
                          fontWeight: activeProject === index ? 800 : 600,
                          color: activeProject === index ? "#fff" : "rgba(255,255,255,0.5)",
                        }}
                      >
                        {item.year}
                      </div>
                      <div style={styles.timelineLabel}>{item.label}</div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Scroll Progress Indicator — desktop only */}
          {!isMobile && (
            <motion.div style={{ ...styles.scrollProgress, opacity: progressOpacity }}>
              <div style={styles.scrollProgressText}>Scroll to explore</div>
              <div style={styles.scrollProgressBar}>
                <motion.div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                    borderRadius: "2px",
                    scaleX: scrollYProgress,
                    transformOrigin: "left",
                    boxShadow: "0 0 8px rgba(99,102,241,0.5)",
                  }}
                />
              </div>
            </motion.div>
          )}

          {/* === DESKTOP: Horizontal Scroll === */}
          {!isMobile && (
            <HorizontalScroll panelHeight="100vh">
              {/* Title Panel with Parallax */}
              <Panel>
                <div style={styles.projectsTitlePanel}>
                  <motion.div
                    style={{ position: "relative", zIndex: 1 }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <motion.div
                      style={styles.projectsEyebrow}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: false }}
                      transition={{ delay: 0.2 }}
                    >
                      PORTFOLIO 2024
                    </motion.div>
                    <motion.h2
                      style={styles.projectsTitle}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                      Selected
                      <br />
                      <span style={{ color: "#6366f1" }}>Work</span>
                    </motion.h2>
                    <motion.p
                      style={styles.projectsSubtitle}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: false }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    >
                      A showcase of projects I've brought to life.
                      <br />
                      <span style={{ fontSize: "0.9rem", opacity: 0.6 }}>
                        ← Scroll horizontally to explore →
                      </span>
                    </motion.p>
                  </motion.div>
                  <motion.div
                    style={{
                      position: "absolute",
                      top: "20%",
                      right: "15%",
                      width: "400px",
                      height: "400px",
                      background: "radial-gradient(circle, rgba(99, 102, 241, 0.15), transparent 70%)",
                      borderRadius: "50%",
                      filter: "blur(80px)",
                      pointerEvents: "none",
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </Panel>

              {/* Project Panels */}
              {projects.map((project, index) => (
                <Panel key={project.id}>
                  <div
                    style={{
                      ...styles.projectPanel,
                      background:
                        index % 2 === 0
                          ? "linear-gradient(160deg, rgba(99,102,241,0.04) 0%, transparent 50%)"
                          : "linear-gradient(160deg, transparent 50%, rgba(139,92,246,0.04) 100%)",
                    }}
                  >
                    <div style={styles.projectContent}>
                      <div style={styles.projectInfo}>
                        <span style={styles.projectNumber}>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 style={styles.projectTitle}>{project.title}</h3>
                        <p style={styles.projectDescription}>
                          {project.description}
                        </p>
                        <div style={styles.projectTags}>
                          {project.tags.map((tag) => (
                            <motion.span
                              key={tag}
                              style={styles.projectTag}
                              whileHover={{
                                scale: 1.08,
                                backgroundColor: "rgba(99,102,241,0.3)",
                                borderColor: "#6366f1",
                              }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 15,
                              }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                        <div style={styles.projectMetrics}>
                          {Object.entries(project.metrics).map(
                            ([key, value]) => (
                              <div key={key} style={styles.metric}>
                                <span style={styles.metricValue}>{value}</span>
                                <span style={styles.metricLabel}>{key}</span>
                              </div>
                            )
                          )}
                        </div>
                        <motion.button
                          style={styles.projectBtn}
                          whileHover={{
                            scale: 1.05,
                            x: 8,
                            borderColor: "#6366f1",
                            boxShadow: "0 0 20px rgba(99,102,241,0.3)",
                          }}
                          whileTap={{ scale: 0.95 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 15,
                          }}
                          onClick={() => project.caseStudy && onNavigate?.(project.caseStudy)}
                        >
                          View Case Study →
                        </motion.button>
                      </div>
                      <motion.div
                        style={styles.projectImageContainer}
                        whileHover={{ scale: 1.03, y: -4 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 20,
                        }}
                      >
                        <div style={styles.projectImageWrapper}>
                          <img
                            src={project.image}
                            alt={project.title}
                            style={styles.projectImage}
                          />
                          <div style={styles.projectImageOverlay} />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </Panel>
              ))}
            </HorizontalScroll>
          )}

          {/* === MOBILE: Vertical Cards === */}
          {isMobile && (
            <div style={{ padding: "60px 20px 40px" }}>
              {/* Section Title */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ marginBottom: "40px" }}
              >
                <div style={{ ...styles.projectsEyebrow, marginBottom: "16px" }}>
                  PORTFOLIO 2024
                </div>
                <h2 style={{ ...styles.projectsTitle, fontSize: "clamp(2.2rem, 8vw, 3.5rem)" }}>
                  Selected <span style={{ color: "#6366f1" }}>Work</span>
                </h2>
                <p style={{ ...styles.projectsSubtitle, fontSize: "1rem", marginTop: "12px" }}>
                  A showcase of projects I've brought to life.
                </p>
              </motion.div>

              {/* Project Cards */}
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{
                    marginBottom: "28px",
                    padding: "28px 24px",
                    borderRadius: "20px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <span style={{ ...styles.projectNumber, fontSize: "0.85rem" }}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 style={{ ...styles.projectTitle, fontSize: "1.5rem", marginBottom: "12px" }}>
                    {project.title}
                  </h3>
                  <p style={{ ...styles.projectDescription, fontSize: "0.95rem", marginBottom: "20px" }}>
                    {project.description}
                  </p>

                  <div style={{ ...styles.projectTags, marginBottom: "20px" }}>
                    {project.tags.map((tag) => (
                      <span key={tag} style={{ ...styles.projectTag, fontSize: "0.75rem", padding: "6px 12px" }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div style={{ ...styles.projectMetrics, gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "20px" }}>
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} style={styles.metric}>
                        <span style={{ ...styles.metricValue, fontSize: "1.15rem" }}>{value}</span>
                        <span style={{ ...styles.metricLabel, fontSize: "0.75rem" }}>{key}</span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    style={{ ...styles.projectBtn, width: "100%", textAlign: "center", padding: "14px 24px" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => project.caseStudy && onNavigate?.(project.caseStudy)}
                  >
                    View Case Study →
                  </motion.button>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Contact Section with 3D Transform */}
        <Scene duration="98vh">
          {() => (
            <section id="contact" ref={contactSectionRef} style={styles.contactSection}>
              <ScrollTransform
                from={forceShowContact ? { y: 0, opacity: 1 } : { y: 30, opacity: 0.3 }}
                to={forceShowContact ? { y: 0, opacity: 1 } : { y: 0, opacity: 1 }}
                perspective={1200}
                span={forceShowContact ? 0 : 0.7}
                easing="ease-out-cubic"
              >
                <motion.div
                  style={styles.contactCard}
                  whileHover={{ boxShadow: "0 30px 120px rgba(99, 102, 241, 0.35)" }}
                >
                  <div style={{ ...styles.contactContent, ...(isMobile ? { gridTemplateColumns: "1fr", gap: "24px" } : {}) }}>
                    <div style={styles.contactInfo}>
                      <h2 style={styles.contactTitle}>Let's Work Together</h2>
                      <p style={styles.contactText}>
                        Have a project in mind? Let's create something memorable. I respond within 24 hours.
                      </p>

                      <div style={styles.contactMethods}>
                        {[
                          { label: "Email", value: "faseehj11@gmail.com", icon: "✉️", href: "mailto:faseehj11@gmail.com" },
                          { label: "LinkedIn", value: "M Faseeh", icon: "💼", href: "https://www.linkedin.com/in/m-faseeh-b02a05361" },
                          { label: "GitHub", value: "FaseehAnjum", icon: "🐙", href: "https://github.com/FaseehAnjum" },
                        ].map((method, i) => (
                          <motion.a
                            key={i}
                            href={method.href}
                            target={method.label !== "Email" ? "_blank" : undefined}
                            rel={method.label !== "Email" ? "noopener noreferrer" : undefined}
                            style={{ ...styles.contactMethod, textDecoration: "none", cursor: "pointer", color: "inherit" }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ x: 10, backgroundColor: "rgba(99, 102, 241, 0.1)" }}
                          >
                            <span style={styles.contactIcon}>{method.icon}</span>
                            <div>
                              <div style={styles.contactMethodLabel}>{method.label}</div>
                              <div style={styles.contactMethodValue}>{method.value}</div>
                            </div>
                          </motion.a>
                        ))}
                      </div>
                    </div>

                    <form style={styles.contactForm} onSubmit={handleContactSubmit}>
                      <div style={styles.contactFieldRow}>
                        <div style={styles.contactField}>
                          <label htmlFor="name" style={styles.contactLabel}>
                            Name
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Your name"
                            required
                            style={styles.contactInput}
                          />
                        </div>
                        <div style={styles.contactField}>
                          <label htmlFor="email" style={styles.contactLabel}>
                            Email
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            required
                            style={styles.contactInput}
                          />
                        </div>
                      </div>
                      <div style={styles.contactField}>
                        <label htmlFor="message" style={styles.contactLabel}>
                          Project details
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          placeholder="Tell me about your project, goals, and timeline..."
                          required
                          style={styles.contactTextarea}
                        />
                      </div>
                      <motion.button
                        type="submit"
                        disabled={isSending}
                        style={{
                          ...styles.contactBtn,
                          opacity: isSending ? 0.85 : 1,
                          cursor: isSending ? "not-allowed" : "pointer",
                        }}
                        whileHover={
                          isSending
                            ? undefined
                            : { scale: 1.05, boxShadow: "0 10px 40px rgba(99, 102, 241, 0.5)" }
                        }
                        whileTap={isSending ? undefined : { scale: 0.95 }}
                      >
                        {isSending ? "Sending..." : "Send Message"}
                      </motion.button>
                      <div
                        style={{
                          minHeight: "20px",
                          fontSize: "0.95rem",
                          color: sendStatus === "error" ? "#f87171" : "#34d399",
                        }}
                        role="status"
                        aria-live="polite"
                      >
                        {sendStatus === "success" && "Thanks! I received your message and will reply soon."}
                        {sendStatus === "error" && "Could not send right now. Please try again."}
                      </div>
                    </form>
                  </div>
                </motion.div>
              </ScrollTransform>
            </section>
          )}
        </Scene>

        {/* Footer */}
        <footer style={styles.footer}>
          <div style={styles.footerContent}>
            <p style={styles.footerText}>© 2024 Your Name. All rights reserved.</p>
            <div style={{ ...styles.footerLinks, ...(isMobile ? { gap: "16px", flexWrap: "wrap" as const, justifyContent: "center" } : {}) }}>
              {["Twitter", "LinkedIn", "GitHub", "Dribbble"].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  style={styles.footerLink}
                  whileHover={{ y: -3, color: "#6366f1" }}
                >
                  {social}
                </motion.a>
              ))}
            </div>
          </div>
        </footer>
      </Kino>
    </div>
  );
}

// Premium Styling
const styles: Record<string, CSSProperties> = {
  container: {
    margin: 0,
    padding: 0,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "SF Pro Display", Roboto, sans-serif',
    color: "#ffffff",
    background: "#0a0a0f",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    overflowX: "clip",
  },

  // Header
  header: {
    borderBottom: "0.5px solid rgba(255,255,255,0.05)",
    backdropFilter: "blur(20px)",
  },
  headerContent: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 clamp(24px, 5vw, 80px)",
    height: "72px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    fontSize: "1.125rem",
    fontWeight: 700,
    letterSpacing: "-0.02em",
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  nav: {
    display: "flex",
    gap: "clamp(24px, 3vw, 48px)",
    alignItems: "center",
  },
  navLink: {
    fontSize: "0.9375rem",
    fontWeight: 500,
    color: "rgba(255,255,255,0.7)",
    textDecoration: "none",
    transition: "color 0.3s",
    cursor: "pointer",
  },

  // Hero
  hero: {
    position: "relative",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  orbContainer: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    zIndex: 0,
  },
  orb: {
    position: "absolute",
    width: "600px",
    height: "600px",
    borderRadius: "50%",
    filter: "blur(100px)",
    opacity: 0.3,
  },
  gridPattern: {
    position: "absolute",
    inset: "-20%",
    backgroundImage: `
      linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px)
    `,
    backgroundSize: "60px 60px",
  },
  heroContent: {
    position: "relative",
    zIndex: 1,
    textAlign: "center",
    padding: "0 clamp(24px, 5vw, 80px)",
    maxWidth: "1200px",
  },
  greeting: {
    fontSize: "clamp(1rem, 2vw, 1.25rem)",
    color: "rgba(255,255,255,0.6)",
    marginBottom: "16px",
    fontWeight: 400,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  },
  name: {
    fontSize: "clamp(3.5rem, 10vw, 8rem)",
    fontWeight: 900,
    letterSpacing: "-0.04em",
    lineHeight: 0.95,
    margin: "0 0 24px 0",
    background: "linear-gradient(135deg, #ffffff 0%, #a5a5ff 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  title: {
    fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
    fontWeight: 600,
    color: "#ffffff",
    marginBottom: "24px",
    letterSpacing: "-0.02em",
    lineHeight: 1.3,
  },
  subtitle: {
    fontSize: "clamp(1rem, 2vw, 1.25rem)",
    color: "rgba(255,255,255,0.5)",
    maxWidth: "700px",
    margin: "0 auto 48px",
    lineHeight: 1.6,
  },
  ctaGroup: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  primaryBtn: {
    padding: "16px 40px",
    fontSize: "1rem",
    fontWeight: 600,
    color: "#ffffff",
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s",
  },
  secondaryBtn: {
    padding: "16px 40px",
    fontSize: "1rem",
    fontWeight: 600,
    color: "#ffffff",
    background: "transparent",
    border: "2px solid rgba(255,255,255,0.2)",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s",
  },
  scrollIndicator: {
    position: "absolute",
    bottom: "40px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
  },
  mouse: {
    width: "24px",
    height: "40px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "center",
    paddingTop: "8px",
  },
  wheel: {
    width: "3px",
    height: "8px",
    background: "rgba(255,255,255,0.5)",
    borderRadius: "2px",
  },
  scrollText: {
    fontSize: "0.75rem",
    color: "rgba(255,255,255,0.4)",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
  },

  // Stats
  statsSection: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 clamp(24px, 5vw, 80px)",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "32px",
    maxWidth: "1200px",
    width: "100%",
  },
  statCard: {
    padding: "48px 32px",
    background: "rgba(255, 255, 255, 0.02)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderRadius: "20px",
    textAlign: "center",
    backdropFilter: "blur(10px)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  statValue: {
    fontSize: "clamp(2.5rem, 5vw, 4rem)",
    fontWeight: 800,
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: "12px",
  },
  statLabel: {
    fontSize: "1rem",
    color: "rgba(255,255,255,0.6)",
    fontWeight: 500,
  },

  // About
  aboutSection: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 clamp(24px, 5vw, 80px)",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: "clamp(2rem, 5vw, 3.5rem)",
    fontWeight: 800,
    marginBottom: "48px",
    letterSpacing: "-0.03em",
  },
  aboutContent: {
    maxWidth: "900px",
    fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
    lineHeight: 1.8,
    fontWeight: 400,
  },

  // Skills
  skillsSection: {
    padding: "80px clamp(24px, 5vw, 80px)",
    background: "rgba(255, 255, 255, 0.01)",
  },
  skillsTitle: {
    fontSize: "1rem",
    textAlign: "center",
    color: "rgba(255,255,255,0.4)",
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    marginBottom: "48px",
    fontWeight: 600,
  },
  skillChip: {
    padding: "16px 32px",
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(99, 102, 241, 0.2)",
    borderRadius: "50px",
    fontSize: "1.125rem",
    fontWeight: 600,
    color: "#ffffff",
    whiteSpace: "nowrap",
    backdropFilter: "blur(10px)",
  },

  // Projects
  projectsTitlePanel: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "0 clamp(24px, 5vw, 80px)",
    background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, transparent 100%)",
  },
  projectsTitle: {
    fontSize: "clamp(3rem, 8vw, 6rem)",
    fontWeight: 900,
    letterSpacing: "-0.04em",
    marginBottom: "24px",
    background: "linear-gradient(135deg, #ffffff 0%, #8b5cf6 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  projectsSubtitle: {
    fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
    color: "rgba(255,255,255,0.5)",
    maxWidth: "600px",
  },
  projectPanel: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 clamp(24px, 5vw, 80px)",
  },
  projectContent: {
    display: "grid",
    gridTemplateColumns: "1fr 1.2fr",
    gap: "clamp(40px, 6vw, 100px)",
    maxWidth: "1400px",
    width: "100%",
    alignItems: "center",
  },
  projectInfo: {
    maxWidth: "500px",
  },
  projectNumber: {
    fontSize: "1rem",
    color: "#6366f1",
    fontWeight: 700,
    letterSpacing: "0.1em",
    marginBottom: "16px",
    display: "block",
  },
  projectTitle: {
    fontSize: "clamp(2rem, 4vw, 3rem)",
    fontWeight: 800,
    marginBottom: "24px",
    letterSpacing: "-0.02em",
    lineHeight: 1.2,
    color: "#ffffff",
  },
  projectDescription: {
    fontSize: "1.125rem",
    color: "rgba(255,255,255,0.6)",
    lineHeight: 1.7,
    marginBottom: "32px",
  },
  projectTags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginBottom: "32px",
  },
  projectTag: {
    padding: "8px 16px",
    background: "rgba(99, 102, 241, 0.1)",
    border: "1px solid rgba(99, 102, 241, 0.3)",
    borderRadius: "8px",
    fontSize: "0.875rem",
    fontWeight: 500,
    transition: "all 0.3s",
  },
  projectMetrics: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "24px",
    marginBottom: "32px",
  },
  metric: {
    display: "flex",
    flexDirection: "column",
  },
  metricValue: {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "#6366f1",
    marginBottom: "4px",
  },
  metricLabel: {
    fontSize: "0.875rem",
    color: "rgba(255,255,255,0.5)",
    textTransform: "capitalize",
  },
  projectBtn: {
    padding: "14px 32px",
    background: "transparent",
    border: "2px solid rgba(99, 102, 241, 0.5)",
    borderRadius: "10px",
    color: "#ffffff",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.3s",
  },
  projectImageContainer: {
    position: "relative",
  },
  projectImageWrapper: {
    position: "relative",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
    transition: "box-shadow 0.4s ease",
  },
  projectImage: {
    width: "100%",
    height: "auto",
    display: "block",
  },
  projectImageOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, transparent 100%)",
    pointerEvents: "none",
  },

  // Contact
  contactSection: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 clamp(24px, 5vw, 80px)",
  },
  contactCard: {
    width: "min(1240px, 100%)",
    padding: "clamp(40px, 5vw, 72px)",
    background: "radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.12), transparent 35%), radial-gradient(circle at 80% 0%, rgba(139, 92, 246, 0.12), transparent 30%), rgba(12, 12, 22, 0.75)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "28px",
    backdropFilter: "blur(18px)",
    textAlign: "left",
    transition: "all 0.4s",
  },
  contactContent: {
    display: "grid",
    gridTemplateColumns: "minmax(360px, 1.05fr) minmax(380px, 0.95fr)",
    gap: "32px",
    alignItems: "stretch",
    width: "100%",
  },
  contactInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  contactTitle: {
    fontSize: "clamp(2rem, 5vw, 3.5rem)",
    fontWeight: 800,
    marginBottom: "12px",
    letterSpacing: "-0.02em",
  },
  contactText: {
    fontSize: "1.25rem",
    color: "rgba(255,255,255,0.6)",
    marginBottom: "12px",
    lineHeight: 1.6,
  },
  contactMethods: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "8px",
  },
  contactMethod: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: "20px",
    background: "rgba(255, 255, 255, 0.02)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderRadius: "12px",
    transition: "all 0.3s",
  },
  contactIcon: {
    fontSize: "2rem",
  },
  contactMethodLabel: {
    fontSize: "0.875rem",
    color: "rgba(255,255,255,0.5)",
    marginBottom: "4px",
  },
  contactMethodValue: {
    fontSize: "1.125rem",
    fontWeight: 600,
    color: "#ffffff",
  },
  contactForm: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    padding: "18px",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    background: "rgba(255, 255, 255, 0.03)",
    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.015)",
    alignSelf: "stretch",
    justifyContent: "space-between",
  },
  contactFieldRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
  },
  contactField: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  contactLabel: {
    fontSize: "0.9rem",
    color: "rgba(255,255,255,0.7)",
    fontWeight: 600,
    letterSpacing: "0.3px",
  },
  contactInput: {
    padding: "14px 16px",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    background: "rgba(255, 255, 255, 0.05)",
    color: "#fff",
    fontSize: "1rem",
    outline: "none",
  },
  contactTextarea: {
    padding: "14px 16px",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    background: "rgba(255, 255, 255, 0.05)",
    color: "#fff",
    fontSize: "1rem",
    outline: "none",
    resize: "vertical",
    minHeight: "140px",
  },
  contactBtn: {
    width: "100%",
    padding: "18px",
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    border: "none",
    borderRadius: "12px",
    color: "#ffffff",
    fontSize: "1.125rem",
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.3s",
  },

  // Footer
  footer: {
    padding: "60px clamp(24px, 5vw, 80px)",
    borderTop: "1px solid rgba(255, 255, 255, 0.05)",
    background: "rgba(0, 0, 0, 0.3)",
  },
  footerContent: {
    maxWidth: "1400px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "24px",
  },
  footerText: {
    color: "rgba(255,255,255,0.4)",
    fontSize: "0.9375rem",
  },
  footerLinks: {
    display: "flex",
    gap: "32px",
  },
  footerLink: {
    color: "rgba(255,255,255,0.6)",
    textDecoration: "none",
    fontSize: "0.9375rem",
    fontWeight: 500,
    transition: "all 0.3s",
  },

  // Timeline Navigation (Fixed on left side)
  timelineNav: {
    position: "fixed",
    left: "clamp(24px, 4vw, 60px)",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 10,
    display: "flex",
    flexDirection: "column",
    gap: "32px",
  } as CSSProperties,
  timelineTitle: {
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "0.15em",
    color: "rgba(255,255,255,0.3)",
    writingMode: "vertical-rl" as const,
    transform: "rotate(180deg)",
    marginBottom: "16px",
  },
  timelineItems: {
    display: "flex",
    flexDirection: "column",
    gap: "40px",
    position: "relative",
  },
  timelineItem: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    position: "relative",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    opacity: 1,
  },
  timelineDot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "rgba(255,255,255,0.15)",
    flexShrink: 0,
    position: "relative",
    zIndex: 2,
  } as CSSProperties,
  timelineContent: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  timelineYear: {
    fontSize: "1.125rem",
    fontWeight: 700,
    color: "#ffffff",
  },
  timelineLabel: {
    fontSize: "0.8125rem",
    color: "rgba(255,255,255,0.4)",
  },
  timelineTrack: {
    position: "absolute",
    left: "5px",
    top: "6px",
    bottom: "6px",
    width: "2px",
    background: "rgba(255,255,255,0.06)",
    borderRadius: "2px",
    zIndex: 0,
  },
  timelineProgressLine: {
    position: "absolute",
    left: "5px",
    top: "6px",
    bottom: "6px",
    width: "2px",
    background: "linear-gradient(180deg, #6366f1 0%, #8b5cf6 100%)",
    transformOrigin: "top",
    borderRadius: "2px",
    zIndex: 1,
  } as CSSProperties,

  // Scroll Progress Indicator (Bottom center)
  scrollProgress: {
    position: "fixed",
    bottom: "40px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
  } as CSSProperties,
  scrollProgressText: {
    fontSize: "0.75rem",
    fontWeight: 600,
    letterSpacing: "0.1em",
    color: "rgba(255,255,255,0.4)",
    textTransform: "uppercase",
  },
  scrollProgressBar: {
    width: "160px",
    height: "3px",
    background: "rgba(255,255,255,0.08)",
    borderRadius: "3px",
    position: "relative",
    overflow: "hidden",
  } as CSSProperties,

  // Projects eyebrow text
  projectsEyebrow: {
    fontSize: "0.875rem",
    fontWeight: 700,
    letterSpacing: "0.15em",
    color: "rgba(99, 102, 241, 0.8)",
    textTransform: "uppercase",
    marginBottom: "24px",
  },
};
