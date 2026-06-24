# 🎨 Premium Portfolio - Setup & Customization Guide

A professional, animated portfolio built with **react-kino** and **Framer Motion**, featuring:

- 🚀 Smooth scroll-driven animations
- ✨ Premium UI with glassmorphism effects
- 🎭 Micro-interactions with Framer Motion
- 📱 Fully responsive design
- ♿ Accessibility-first (respects prefers-reduced-motion)
- 🎯 SEO-ready structure

---

## 📦 Installation

1. **Install dependencies:**
   ```bash
   cd apps/test
   pnpm install
   ```

2. **Run development server:**
   ```bash
   pnpm dev
   ```

3. **Open browser:**
   Navigate to `http://localhost:5173`

---

## 🎯 Customization Guide

### **1. Personal Information**

Edit `PremiumPortfolio.tsx` lines 16-25:

```tsx
<h1 style={styles.name}>Your Name</h1>
<h2 style={styles.title}>Full-Stack Developer & Creative Technologist</h2>
<p style={styles.subtitle}>Crafting exceptional digital experiences...</p>
```

**Replace with:**
- Your actual name
- Your professional title
- Your tagline/mission statement

---

### **2. Projects Data**

Update the `projects` array (lines 28-61):

```tsx
const projects = [
  {
    id: 1,
    title: "Your Project Name",
    description: "Brief description of what you built",
    year: "2024",
    tags: ["React", "Node.js", "MongoDB"], // Your tech stack
    image: "https://your-image-url.com/image.jpg", // Project screenshot
    metrics: { 
      users: "50K+",      // Key metric 1
      performance: "99.9%", // Key metric 2
      rating: "4.9/5"     // Key metric 3
    },
  },
  // Add more projects...
];
```

**Tips for project images:**
- Use high-quality screenshots (1600x1200px recommended)
- Optimize images (use services like TinyPNG)
- Consider using Unsplash for placeholder images during development

---

### **3. Skills**

Update the `skills` array (lines 63-74):

```tsx
const skills = [
  "React & Next.js",
  "TypeScript",
  "Your Skill Here",
  // Add all your skills...
];
```

---

### **4. Stats/Metrics**

Update the `stats` array (lines 76-81):

```tsx
const stats = [
  { 
    value: 4, 
    label: "Years Experience", 
    format: (n: number) => `${n}+` 
  },
  { 
    value: 50, 
    label: "Projects Completed", 
    format: (n: number) => `${n}+` 
  },
  // Add your own stats...
];
```

---

### **5. About Section**

Find the TextReveal component (around line 200) and update the biography:

```tsx
<TextReveal ...>
  I'm a passionate full-stack developer...
  [Replace with your personal story]
</TextReveal>
```

**Writing tips:**
- Keep it conversational and authentic
- Highlight your unique value proposition
- Mention what drives you professionally
- Keep it under 100 words

---

### **6. Contact Information**

Update contact methods (around line 280):

```tsx
const contactMethods = [
  { 
    label: "Email", 
    value: "your.email@example.com", // Your actual email
    icon: "✉️" 
  },
  { 
    label: "LinkedIn", 
    value: "/in/yourhandle", // Your LinkedIn username
    icon: "💼" 
  },
  { 
    label: "GitHub", 
    value: "@yourhandle", // Your GitHub username
    icon: "🐙" 
  },
];
```

---

### **7. Social Links (Footer)**

Update footer links (around line 320):

```tsx
{["Twitter", "LinkedIn", "GitHub", "Dribbble"].map((social) => (
  <a href="#" ...> {/* Update href to your actual profile */}
    {social}
  </a>
))}
```

---

## 🎨 Design Customization

### **Color Scheme**

The portfolio uses a purple-blue gradient theme. To change colors:

1. **Primary accent color** - Find and replace `#6366f1` with your brand color
2. **Secondary accent** - Replace `#8b5cf6` with complementary color
3. **Background** - Change `#0a0a0f` in `styles.container.background`

**Example color schemes:**
```tsx
// Emerald Green Theme
Primary: #10b981
Secondary: #34d399

// Orange Theme
Primary: #f97316
Secondary: #fb923c

// Pink Theme
Primary: #ec4899
Secondary: #f472b6
```

---

### **Typography**

The portfolio uses SF Pro Display. To change fonts:

```tsx
// In styles.container.fontFamily:
fontFamily: '-apple-system, BlinkMacSystemFont, "Your Font", sans-serif'
```

**Premium font pairings:**
- **Modern:** Inter + JetBrains Mono
- **Elegant:** Playfair Display + Source Sans Pro
- **Tech:** Space Grotesk + Fira Code

---

### **Animation Speed**

Adjust animation timings:

```tsx
// Slow down animations:
duration={1200} // instead of 800

// Speed up animations:
duration={400} // instead of 600

// Adjust Framer Motion transitions:
transition={{ duration: 1.5 }} // slower
transition={{ duration: 0.3 }} // faster
```

---

## 📱 Responsive Design

The portfolio is responsive out of the box using:
- `clamp()` for fluid typography
- CSS Grid with `auto-fit`
- Flexible flexbox layouts

**To further customize mobile:**

Add media queries in the styles object:

```tsx
// Example responsive adjustment
projectContent: {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  // On mobile, this will stack to single column automatically
}
```

---

## 🚀 Performance Tips

1. **Optimize images:**
   - Use WebP format
   - Implement lazy loading
   - Consider using a CDN

2. **Code splitting:**
   ```tsx
   const HeavyComponent = lazy(() => import('./HeavyComponent'));
   ```

3. **Reduce bundle size:**
   - Import only needed Framer Motion features
   - Use tree-shaking friendly imports

---

## 🎬 Adding More Sections

### Example: Testimonials Section

```tsx
<Scene duration="200vh">
  <section style={styles.testimonialsSection}>
    <h2 style={styles.sectionTitle}>Client Testimonials</h2>
    {testimonials.map((testimonial, i) => (
      <Reveal key={i} animation="fade-up" at={0.2 + i * 0.2}>
        <div style={styles.testimonialCard}>
          <p>"{testimonial.quote}"</p>
          <span>{testimonial.author}</span>
        </div>
      </Reveal>
    ))}
  </section>
</Scene>
```

---

## 📦 Deployment

### **Vercel (Recommended)**

1. Push code to GitHub
2. Import repository in Vercel
3. Set build command: `pnpm build`
4. Deploy!

### **Netlify**

1. Connect GitHub repository
2. Build command: `pnpm build`
3. Publish directory: `dist`
4. Deploy

### **Custom Domain**

After deployment, add your custom domain in your hosting provider's settings.

---

## 🐛 Troubleshooting

### **Framer Motion not working?**
```bash
pnpm install framer-motion@latest
```

### **Scroll animations not triggering?**
- Check that `<Kino>` wraps all animated components
- Ensure scroll containers have proper height

### **Images not loading?**
- Check image URLs are valid
- Consider using placeholder images during development

---

## 🎨 Design Resources

- **Colors:** [Coolors.co](https://coolors.co/)
- **Fonts:** [Google Fonts](https://fonts.google.com/)
- **Icons:** [Heroicons](https://heroicons.com/)
- **Images:** [Unsplash](https://unsplash.com/)
- **Inspiration:** [Awwwards](https://www.awwwards.com/)

---

## 📚 Tech Stack

- **Framework:** React 19
- **Animation:** react-kino + Framer Motion
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** CSS-in-JS (inline styles)

---

## 🤝 Support

If you need help customizing your portfolio:

1. Check the [react-kino documentation](https://react-kino.dev)
2. Review [Framer Motion docs](https://www.framer.com/motion/)
3. Explore the commented code in `PremiumPortfolio.tsx`

---

## 📝 License

This template is open source. Feel free to customize and use it for your personal portfolio!

---

## 🌟 Features Checklist

Before launching your portfolio, ensure:

- [ ] All personal information updated
- [ ] Real project data and images added
- [ ] Contact links work correctly
- [ ] Social media links updated
- [ ] Custom domain configured
- [ ] SEO metadata added
- [ ] Analytics integrated (Google Analytics, Plausible, etc.)
- [ ] Favicon added
- [ ] Tested on mobile devices
- [ ] Tested accessibility with screen readers
- [ ] Performance optimized (Lighthouse score > 90)

---

**Built with ❤️ using react-kino**
