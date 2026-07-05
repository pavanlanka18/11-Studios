import { useState, useEffect } from 'react'
import './index.css'

/* ============================================================
   PAGE LOADER
   ============================================================ */
function Loader({ onDone }) {
  const [done, setDone] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => {
      setDone(true)
      setTimeout(onDone, 700)
    }, 2400)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div className={`loader${done ? ' done' : ''}`} aria-hidden="true">
      <div className="loader-logo">
        <span className="loader-num">11</span>
        <span className="loader-name">Studio</span>
      </div>
      <div className="loader-bar-wrap">
        <div className="loader-bar" />
      </div>
      <p className="loader-tagline">Creative Media Agency</p>
    </div>
  )
}

/* ============================================================
   SCROLL REVEAL HOOK
   ============================================================ */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  })
}

/* ============================================================
   NAVBAR
   ============================================================ */
function Navbar({ onBookClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Work', id: 'portfolio' },
    { label: 'Clients', id: 'testimonials' },
    { label: 'Contact', id: 'contact' },
  ]

  const goto = id => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} aria-label="Main navigation">
        <a href="#home" className="nav-logo" onClick={e => { e.preventDefault(); goto('home') }}>
          <div className="nav-logo-main">
            <span className="logo-num">11</span>
            <span className="logo-name">Studio</span>
          </div>
          <span className="nav-logo-sub">Creative Media Agency</span>
        </a>

        <div className="nav-links">
          {links.map(l => (
            <a key={l.id} href={`#${l.id}`} onClick={e => { e.preventDefault(); goto(l.id) }}>
              {l.label}
            </a>
          ))}
        </div>

        <button id="nav-book-btn" className="nav-cta" onClick={onBookClick}>Get a Quote</button>

        <button
          className={`hamburger${open ? ' open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu${open ? ' open' : ''}`} aria-hidden={!open}>
        {links.map(l => (
          <a key={l.id} href={`#${l.id}`} onClick={e => { e.preventDefault(); goto(l.id) }}>
            {l.label}
          </a>
        ))}
        <button className="btn-primary" style={{ marginTop: 8 }} onClick={() => { setOpen(false); onBookClick() }}>
          Get a Quote
        </button>
      </div>
    </>
  )
}

/* ============================================================
   HERO
   ============================================================ */
function Hero({ onWorkClick, onProjectClick }) {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      {/* Left: Content */}
      <div className="hero-content">
        <div className="hero-eyebrow">
          <div className="hero-eyebrow-line" />
          Creative Media Agency
        </div>

        <h1 id="hero-title" className="hero-title">
          Creating Content<br />
          That <em>Moves People.</em>
        </h1>

        <p className="hero-sub">
          Premium content for creators, businesses, and brands
          ready to stand out. We turn ideas into impact.
        </p>

        <div className="hero-btns">
          <button id="hero-work-btn" className="btn-primary" onClick={onWorkClick}>
            View Our Work
          </button>
          <button id="hero-project-btn" className="btn-outline" onClick={onProjectClick}>
            Get a Quote
          </button>
        </div>
      </div>

      {/* Right: Visual */}
      <div className="hero-right">
        <div className="hero-visual">
          <div className="hero-visual-frame">
            <div className="hero-visual-inner">
              <div className="hero-visual-text">11</div>
            </div>
            <div className="hero-visual-tag">
              <div className="hero-visual-tag-label">Specializing in</div>
              <div className="hero-visual-tag-value">Cinematic Storytelling</div>
            </div>
          </div>

          <div className="hero-badge">
            <div className="hero-badge-num">∞</div>
            <div className="hero-badge-text">Creative<br />Ideas</div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-label" aria-hidden="true">
        <div className="hero-scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  )
}

/* ============================================================
   MARQUEE
   ============================================================ */
function Marquee() {
  const items = [
    'Video Production',
    'Video Editing',
    'Content Creation',
    'Brand Storytelling',
    'Creative Direction',
    'Social Media Content',
    'Personal Branding',
    'Brand Growth',
  ]
  const doubled = [...items, ...items]
  return (
    <div className="marquee-section" aria-hidden="true">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div className="marquee-item" key={i}>
            <span>{item}</span>
            <span className="marquee-dot" />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ============================================================
   ABOUT
   ============================================================ */
function About() {
  useReveal()

  const values = [
    'Quality Over Quantity',
    'Creativity With Purpose',
    'Story Before Effects',
    'Consistency Builds Brands',
    'Client Success Comes First',
  ]

  return (
    <section id="about" className="about-section">
      <div className="about-grid">
        {/* Left: Visual panel */}
        <div className="about-visual reveal">
          <div className="about-visual-bg-num">11</div>
          <div className="about-visual-content">
            <div className="about-visual-badge">
              <span>Founded 2025 — Built from Zero</span>
            </div>

            <div className="eyebrow">11 Studio</div>
            <h2 className="display" style={{ fontSize: 'clamp(36px,4vw,60px)', marginBottom: 20 }}>
              Creativity<br />meets <em>strategy.</em>
            </h2>
            <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.85, maxWidth: 380 }}>
              At 11 Studio, we create cinematic content that captures attention,
              builds trust, and helps brands grow in the digital world.
            </p>

            <div className="about-visual-stat">
              {[
                { num: '100%', label: 'Dedication' },
                { num: '24h', label: 'Response Time' },
                { num: '∞', label: 'Creative Ideas' },
                { num: 'IN', label: 'Made in India' },
              ].map(s => (
                <div className="about-visual-stat-item" key={s.label}>
                  <div className="about-stat-num">{s.num}</div>
                  <div className="about-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Story text */}
        <div className="about-text-side reveal reveal-delay-2">
          <div className="eyebrow">Our Story</div>
          <h2 className="display" style={{ fontSize: 'clamp(40px,4.5vw,68px)', marginBottom: 28 }}>
            Built with <em>passion,</em><br />grown with purpose.
          </h2>
          <p>
            I started 11 Studio with one laptop, an iPhone 15, and a belief that every brand
            deserves content that looks and feels world-class — no matter the size.
          </p>
          <p>
            Every project begins with an idea and ends with a story people remember.
            We don&apos;t just create content — we build brands people remember.
          </p>
          <p>
            Right now we&apos;re building this one client at a time — improving every day,
            documenting the journey, and growing toward one of India&apos;s leading creative
            media agencies.
          </p>

          <div className="about-values-row">
            <div className="eyebrow" style={{ marginTop: 40, marginBottom: 0 }}>Core Values</div>
            {values.map((v, i) => (
              <div className="about-value-item" key={v}>
                <span className="about-value-num">0{i + 1}</span>
                <span className="about-value-text">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   SERVICES
   ============================================================ */
const SERVICES = [
  {
    icon: '🎬',
    title: 'Video Production',
    desc: 'End-to-end cinematic production that brings your brand vision to life. From concept to final cut — crafted for maximum impact.',
    tags: ['Brand Films', 'Ads', 'Documentaries', 'BTS'],
  },
  {
    icon: '✂️',
    title: 'Professional Video Editing',
    desc: 'Cinematic edits that stop the scroll. Reels, brand films, ads, and YouTube content — color graded, music-synced, and delivered fast.',
    tags: ['Reels', 'YouTube', 'Color Grade', 'Motion'],
  },
  {
    icon: '📱',
    title: 'Social Media Content',
    desc: 'Platform-native content built for Instagram, YouTube, and TikTok. Consistent, on-brand, and engineered to grow your audience.',
    tags: ['Instagram', 'YouTube', 'TikTok', 'Strategy'],
  },
  {
    icon: '📸',
    title: 'Product & Brand Shoots',
    desc: 'Product, lifestyle, and portrait shoots that make your brand look premium. Shot with professional lighting and composition.',
    tags: ['Product', 'Lifestyle', 'Portrait', 'Commercial'],
  },
  {
    icon: '🎨',
    title: 'Creative Direction',
    desc: 'Strategic creative vision that makes every piece of content feel cohesive, on-brand, and unmistakably yours.',
    tags: ['Art Direction', 'Brand Identity', 'Visual Style', 'Concepts'],
  },
  {
    icon: '🚀',
    title: 'Brand Growth',
    desc: 'We build and manage your digital presence with consistent posting, engagement strategy, and data-backed monthly reviews.',
    tags: ['Analytics', 'Strategy', 'Engagement', 'Growth'],
  },
]

function Services() {
  useReveal()
  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="services-header reveal">
          <div>
            <div className="eyebrow">What We Do</div>
            <h2 className="display" style={{ fontSize: 'clamp(44px,5.5vw,80px)' }}>
              Our <em>Services</em>
            </h2>
          </div>
          <p className="services-header-desc">
            From raw footage to scroll-stopping content — we handle every step
            of your brand&apos;s visual story. Premium quality, every time.
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <div key={s.title} className={`service-item reveal reveal-delay-${(i % 3) + 1}`}>
              <div className="service-num">0{i + 1}</div>
              <span className="service-icon">{s.icon}</span>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
              <div className="service-tags">
                {s.tags.map(t => <span key={t} className="service-tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   WHY CHOOSE 11 STUDIO
   ============================================================ */
const WHY_FEATURES = [
  { icon: '🎯', title: 'Creative Strategy', desc: 'Every piece of content starts with a plan, not just a camera.' },
  { icon: '💎', title: 'Premium Quality', desc: 'Cinematic production value at every price point.' },
  { icon: '⚡', title: 'Fast Delivery', desc: 'Lightning-fast turnarounds without compromising on craft.' },
  { icon: '🏆', title: 'Brand-Focused Content', desc: 'We build content that reflects your brand identity, not generic templates.' },
  { icon: '🤝', title: 'Long-Term Partnerships', desc: 'We grow with you — tracking results and evolving your strategy.' },
]

function WhyChoose() {
  useReveal()
  return (
    <section id="why" className="why-section">
      <div className="container">
        <div className="why-grid">
          {/* Left */}
          <div className="why-text-side reveal">
            <div className="eyebrow">Why 11 Studio</div>
            <h2 className="display" style={{ fontSize: 'clamp(40px,4.5vw,68px)', marginBottom: 20 }}>
              We don&apos;t just create content.<br />
              We build brands people <em>remember.</em>
            </h2>
            <p>
              11 Studio is a premium creative media agency specializing in visual storytelling
              that inspires, connects, and drives real growth for your business.
            </p>

            <div className="why-features">
              {WHY_FEATURES.map((f, i) => (
                <div className={`why-feature reveal reveal-delay-${i + 1}`} key={f.title}>
                  <div className="why-feature-icon">{f.icon}</div>
                  <div>
                    <div className="why-feature-title">{f.title}</div>
                    <div className="why-feature-desc">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Stats block */}
          <div className="why-right-side reveal reveal-delay-2">
            <div className="why-big-stat">
              <div className="why-big-stat-num">11</div>
              <div className="why-big-stat-text">Studio — Creative Media Agency</div>
            </div>
            <div className="why-stat-row">
              {[
                { num: '100%', label: 'Client Satisfaction' },
                { num: '24h', label: 'Response Time' },
                { num: '∞', label: 'Creative Capacity' },
                { num: '2025', label: 'Year Founded' },
              ].map(s => (
                <div className="why-stat-cell" key={s.label}>
                  <div className="why-stat-cell-num">{s.num}</div>
                  <div className="why-stat-cell-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   INDUSTRIES
   ============================================================ */
const INDUSTRIES = [
  { icon: '🎬', name: 'Creators' },
  { icon: '👤', name: 'Personal Brands' },
  { icon: '🏢', name: 'Businesses' },
  { icon: '🍽️', name: 'Restaurants' },
  { icon: '👗', name: 'Fashion' },
  { icon: '🎉', name: 'Events' },
  { icon: '🏠', name: 'Real Estate' },
  { icon: '🚀', name: 'Startups' },
  { icon: '💪', name: 'Health & Fitness' },
  { icon: '📚', name: 'Education' },
]

function Industries() {
  useReveal()
  return (
    <section id="industries" className="industries-section">
      <div className="container">
        <div className="industries-header reveal">
          <div>
            <div className="eyebrow">Industries We Serve</div>
            <h2 className="display" style={{ fontSize: 'clamp(40px,4.5vw,68px)' }}>
              We work with <em>everyone</em><br />who has a story to tell.
            </h2>
          </div>
          <p className="industries-header-note">
            From solo creators to established businesses — every brand deserves
            world-class content.
          </p>
        </div>

        <div className="industries-grid">
          {INDUSTRIES.map((ind, i) => (
            <div className={`industry-item reveal reveal-delay-${(i % 5) + 1}`} key={ind.name}>
              <span className="industry-icon">{ind.icon}</span>
              <span className="industry-name">{ind.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   PORTFOLIO / WORK
   ============================================================ */
const WORK = [
  { emoji: '☕', bg: '#1a1208', cat: 'Brand Reel', title: 'Café Brand Film', client: 'Cinematic morning vibes for a local café brand' },
  { emoji: '👟', bg: '#0d1520', cat: 'Product Video', title: 'Sneaker Drop Edit', client: 'High-energy product launch for a streetwear brand' },
  { emoji: '💄', bg: '#1a0d1a', cat: 'Content Creation', title: 'Beauty Brand Reels', client: 'Aesthetic reel series for an Indian beauty brand' },
  { emoji: '🏋️', bg: '#0a1a0a', cat: 'Brand Shoot', title: 'Gym Transformation', client: 'Before/after content series for a fitness studio' },
  { emoji: '🏠', bg: '#1a0a0a', cat: 'Video Editing', title: 'Real Estate Walkthrough', client: 'Cinematic property tour with drone-style cuts' },
  { emoji: '🍕', bg: '#141a0a', cat: 'Social Media', title: 'Restaurant Content', client: 'Monthly content package for a local restaurant' },
]

function Portfolio() {
  useReveal()
  return (
    <section id="portfolio" className="portfolio-section">
      <div className="container">
        <div className="portfolio-header">
          <div className="portfolio-header-left reveal">
            <div className="eyebrow">Portfolio</div>
            <h2 className="display" style={{ fontSize: 'clamp(44px,5vw,78px)' }}>
              Sample <em>Work</em>
            </h2>
          </div>
          <p className="portfolio-header-note reveal reveal-delay-2">
            A showcase of the kind of content we create for brands like yours.
          </p>
        </div>

        <div className="portfolio-grid">
          {WORK.map((w, i) => (
            <div key={w.title} className={`portfolio-card reveal reveal-delay-${(i % 3) + 1}`}>
              <div
                className="portfolio-thumb"
                style={{ background: `linear-gradient(135deg, ${w.bg} 0%, #0C0B0A 100%)` }}
              >
                <span className="portfolio-thumb-icon">{w.emoji}</span>
                <div className="portfolio-overlay">
                  <div className="play-btn">▶</div>
                </div>
              </div>
              <div className="portfolio-info">
                <p className="portfolio-cat">{w.cat}</p>
                <h3 className="portfolio-title">{w.title}</h3>
                <p className="portfolio-client">{w.client}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="portfolio-note">
          * Sample projects for portfolio demonstration. Real client work coming soon.
        </p>
      </div>
    </section>
  )
}

/* ============================================================
   MISSION & VISION
   ============================================================ */
function MissionVision() {
  useReveal()
  return (
    <section id="mission" className="mv-section">
      <div className="container">
        <div className="eyebrow reveal" style={{ marginBottom: 40 }}>Our Direction</div>
        <div className="mv-grid">
          <div className="mv-card reveal">
            <div className="mv-type">Mission</div>
            <h3 className="mv-heading">To empower creators and businesses with premium visual storytelling.</h3>
            <p className="mv-text">
              That inspires, connects, and drives growth. Every frame we create carries
              intention. Every edit tells a story. Every project gets our absolute best.
            </p>
            <div className="mv-bg-word">Mission</div>
          </div>
          <div className="mv-card reveal reveal-delay-2">
            <div className="mv-type">Vision</div>
            <h3 className="mv-heading">To become one of India&apos;s leading creative media agencies.</h3>
            <p className="mv-text">
              Known for quality, innovation, and impactful storytelling. We&apos;re building
              toward a future where every brand — big or small — has access to world-class
              creative production.
            </p>
            <div className="mv-bg-word">Vision</div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   TESTIMONIALS
   ============================================================ */
const TESTIMONIALS = [
  {
    quote: '"11 Studio completely transformed our content quality. Our engagement skyrocketed after the first month working with them."',
    name: 'Arjun Mehta',
    role: 'Founder, FitLife Brand',
  },
  {
    quote: '"Absolutely cinematic work. They understood our brand voice instantly and delivered beyond expectations. Highly recommend."',
    name: 'Priya Sharma',
    role: 'Content Creator, 2.4M Followers',
  },
  {
    quote: '"Professional, fast, and incredibly talented. The team at 11 Studio is the creative partner every brand deserves."',
    name: 'Rahul Verma',
    role: 'CEO, TechStart Inc.',
  },
]

function Testimonials() {
  useReveal()
  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        <div className="testimonials-header reveal">
          <div className="eyebrow">What Clients Say</div>
          <h2 className="display" style={{ fontSize: 'clamp(44px,5vw,78px)' }}>
            Built on <em>trust.</em>
          </h2>
          <p className="body-text" style={{ marginTop: 20 }}>
            We&apos;re just getting started — but the feedback we&apos;ve received already
            says everything about how we work.
          </p>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className={`testimonial-card reveal reveal-delay-${i + 1}`}>
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-quote">{t.quote}</p>
              <div className="testimonial-divider" />
              <p className="testimonial-name">{t.name}</p>
              <p className="testimonial-role">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   PRICING
   ============================================================ */
const PLANS = [
  {
    label: 'Starter',
    name: 'Starter',
    for: 'For individual creators',
    amount: '₹4,999',
    period: 'per month',
    features: ['1 video per week', 'Basic color grade', 'Cuts + subtitles', 'Thumbnail design', '48hr delivery'],
    cta: 'Choose Starter',
    featured: false,
  },
  {
    label: 'Growth',
    name: 'Growth',
    for: 'For growing brands',
    amount: '₹14,999',
    period: 'per month',
    features: ['4 videos / month', 'Advanced editing', 'Motion graphics', 'Content strategy', 'Priority support', 'Monthly review call'],
    cta: 'Choose Growth',
    featured: true,
    badge: 'Most Popular',
  },
  {
    label: 'Agency',
    name: 'Agency',
    for: 'For established businesses',
    amount: 'Custom',
    period: 'tailored pricing',
    features: ['Unlimited deliverables', 'Dedicated workflow', 'Full brand production', 'Brand strategy', 'Analytics & reports', 'Direct access to team'],
    cta: 'Book a Call',
    featured: false,
  },
]

function Pricing({ onCtaClick }) {
  useReveal()
  return (
    <section id="pricing" className="pricing-section">
      <div className="container">
        <div className="pricing-header reveal">
          <div className="eyebrow">Pricing</div>
          <h2 className="display" style={{ fontSize: 'clamp(44px,5vw,78px)' }}>
            Simple, honest <em>pricing.</em>
          </h2>
          <p className="body-text" style={{ marginTop: 18 }}>
            No hidden fees. No surprises. Launch pricing that rewards early clients.
          </p>
        </div>

        <div className="pricing-grid">
          {PLANS.map((p, i) => (
            <div key={p.name} className={`pricing-card reveal reveal-delay-${i + 1}${p.featured ? ' featured' : ''}`}>
              {p.badge && <div className="pricing-badge">{p.badge}</div>}
              <div className="pricing-plan-label">{p.label}</div>
              <h3 className="pricing-name">{p.name}</h3>
              <p className="pricing-for">{p.for}</p>
              <div className="pricing-amount">{p.amount}</div>
              <p className="pricing-period">{p.period}</p>
              <ul className="pricing-features">
                {p.features.map(f => <li key={f}>{f}</li>)}
              </ul>
              <button
                id={`pricing-btn-${p.name.toLowerCase()}`}
                className={p.featured ? 'btn-primary' : 'btn-outline'}
                style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }}
                onClick={onCtaClick}
              >
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   CTA BAND
   ============================================================ */
function CTABand({ onContactClick, onWorkClick }) {
  useReveal()
  return (
    <section className="cta-section">
      <div className="cta-eyebrow reveal">Ready to Build Something Extraordinary?</div>
      <h2 className="cta-heading reveal">
        Let&apos;s create content your<br />audience will <em>never forget.</em>
      </h2>
      <p className="cta-sub reveal reveal-delay-1">
        We help creators, startups, and businesses build unforgettable brands
        through cinematic storytelling and strategic digital experiences.
      </p>
      <div className="cta-btns reveal reveal-delay-2">
        <button id="cta-contact-btn" className="btn-primary" onClick={onContactClick}>
          Start a Project
        </button>
        <button id="cta-work-btn" className="btn-outline" onClick={onWorkClick}>
          View Our Work
        </button>
      </div>
    </section>
  )
}

/* ============================================================
   CONTACT
   ============================================================ */
function Contact() {
  useReveal()
  const [form, setForm] = useState({ name: '', brand: '', whatsapp: '', service: '', budget: '', project: '' })
  const [sent, setSent] = useState(false)

  const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const onSubmit = e => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-grid">
          {/* Left */}
          <div className="contact-info reveal">
            <div className="eyebrow">Get in Touch</div>
            <h2 className="display" style={{ fontSize: 'clamp(40px,4.5vw,72px)', marginBottom: 20 }}>
              Let&apos;s build<br />something <em>great.</em>
            </h2>
            <p className="body-text">
              Ready to take your brand&apos;s content to the next level? Tell us about your
              project and we&apos;ll get back to you within 24 hours.
            </p>

            <div className="contact-methods">
              <div className="contact-method">
                <div className="contact-method-icon">💬</div>
                <div>
                  <p className="contact-method-label">WhatsApp</p>
                  <p className="contact-method-value">Available on WhatsApp Business</p>
                </div>
              </div>
              <div className="contact-method">
                <div className="contact-method-icon">📸</div>
                <div>
                  <p className="contact-method-label">Instagram</p>
                  <p className="contact-method-value">@11studio (DM us anytime)</p>
                </div>
              </div>
              <div className="contact-method">
                <div className="contact-method-icon">✉️</div>
                <div>
                  <p className="contact-method-label">Email</p>
                  <p className="contact-method-value">hello@11studio.in</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <form id="contact-form" className="contact-form reveal reveal-delay-2" onSubmit={onSubmit} aria-label="Contact form">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="f-name">Your Name</label>
                <input id="f-name" name="name" className="form-input" placeholder="Rahul Kumar" value={form.name} onChange={onChange} required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="f-brand">Brand / Business</label>
                <input id="f-brand" name="brand" className="form-input" placeholder="Your Brand Name" value={form.brand} onChange={onChange} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="f-wa">WhatsApp / Email</label>
              <input id="f-wa" name="whatsapp" className="form-input" placeholder="+91 98765 43210" value={form.whatsapp} onChange={onChange} required />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="f-service">Service Needed</label>
              <select id="f-service" name="service" className="form-select" value={form.service} onChange={onChange}>
                <option value="">Select a service...</option>
                <option>Video Production</option>
                <option>Video Editing</option>
                <option>Social Media Content</option>
                <option>Product & Brand Shoots</option>
                <option>Creative Direction</option>
                <option>Brand Growth</option>
                <option>Full Package</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="f-budget">Budget Range</label>
              <select id="f-budget" name="budget" className="form-select" value={form.budget} onChange={onChange}>
                <option value="">Select budget...</option>
                <option>Under ₹5,000</option>
                <option>₹5,000 – ₹15,000</option>
                <option>₹15,000 – ₹50,000</option>
                <option>₹50,000+</option>
                <option>Custom / Ongoing</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="f-project">Tell Us About Your Project</label>
              <textarea
                id="f-project"
                name="project"
                className="form-textarea"
                placeholder="What does your brand need? What's your goal?"
                value={form.project}
                onChange={onChange}
                required
              />
            </div>

            <button id="contact-submit-btn" type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', padding: '16px 48px' }}>
              {sent ? 'Message Sent ✓' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  const goto = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <div className="footer-logo">
              <div className="footer-logo-main">
                <span className="logo-num">11</span>
                <span className="logo-name">Studio</span>
              </div>
              <span className="footer-logo-sub">Creative Media Agency</span>
            </div>
            <p className="footer-tagline">
              Turning ideas into impact. We build brands people remember through
              cinematic storytelling and premium content creation.
            </p>
          </div>

          <div>
            <p className="footer-col-title">Quick Links</p>
            <nav className="footer-links" aria-label="Footer links">
              {[['about','About'],['services','Services'],['portfolio','Work'],['testimonials','Clients'],['pricing','Pricing'],['contact','Contact']].map(([id,label]) => (
                <a key={id} href={`#${id}`} onClick={e => { e.preventDefault(); goto(id) }}>{label}</a>
              ))}
            </nav>
          </div>

          <div>
            <p className="footer-col-title">Follow Us</p>
            <div className="footer-socials">
              <a href="#" id="footer-ig" className="social-link" aria-label="Instagram">📸</a>
              <a href="#" id="footer-yt" className="social-link" aria-label="YouTube">▶</a>
              <a href="#" id="footer-tw" className="social-link" aria-label="Twitter">𝕏</a>
              <a href="#" id="footer-li" className="social-link" aria-label="LinkedIn">in</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© 2026 11 Studio. Creative Media Agency. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ============================================================
   APP ROOT
   ============================================================ */
export default function App() {
  const [loaded, setLoaded] = useState(false)
  const goto = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      <Loader onDone={() => setLoaded(true)} />
      <Navbar onBookClick={() => goto('contact')} />
      <main className={loaded ? 'page-enter' : ''} style={{ visibility: loaded ? 'visible' : 'hidden' }}>
        <Hero
          onWorkClick={() => goto('portfolio')}
          onProjectClick={() => goto('contact')}
        />
        <Marquee />
        <About />
        <Services />
        <WhyChoose />
        <Industries />
        <Portfolio />
        <MissionVision />
        <Testimonials />
        <Pricing onCtaClick={() => goto('contact')} />
        <CTABand onContactClick={() => goto('contact')} onWorkClick={() => goto('portfolio')} />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
