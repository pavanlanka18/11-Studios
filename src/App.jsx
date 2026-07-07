import { useState, useEffect, useRef } from 'react'
import './index.css'

/* ============================================================
   CUSTOM CURSOR — Cinematic Crosshair
   ============================================================ */
function Cursor() {
  const crossRef = useRef(null)
  const outerRef = useRef(null)

  useEffect(() => {
    const cross = crossRef.current
    const outer = outerRef.current
    let x = 0, y = 0, ox = 0, oy = 0
    let hovering = false

    const move = e => {
      x = e.clientX
      y = e.clientY
      cross.style.transform = `translate(${x}px, ${y}px)`
    }

    const animate = () => {
      ox += (x - ox) * 0.07
      oy += (y - oy) * 0.07
      outer.style.transform = `translate(${ox}px, ${oy}px)`
      requestAnimationFrame(animate)
    }

    const onEnter = () => {
      hovering = true
      cross.classList.add('cursor-cross--hover')
      outer.classList.add('cursor-outer--hover')
    }
    const onLeave = () => {
      hovering = false
      cross.classList.remove('cursor-cross--hover')
      outer.classList.remove('cursor-outer--hover')
    }

    window.addEventListener('mousemove', move)
    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })
    animate()
    return () => {
      window.removeEventListener('mousemove', move)
      document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      {/* Inner crosshair */}
      <div className="cursor-cross" ref={crossRef}>
        <div className="cursor-cross-h" />
        <div className="cursor-cross-v" />
        <div className="cursor-cross-dot" />
      </div>
      {/* Outer slow-follow square */}
      <div className="cursor-outer" ref={outerRef} />
    </>
  )
}

/* ============================================================
   PAGE LOADER
   ============================================================ */
function Loader({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setDone(true)
            setTimeout(onDone, 800)
          }, 300)
          return 100
        }
        return p + Math.random() * 12 + 3
      })
    }, 80)
    return () => clearInterval(interval)
  }, [onDone])

  const pct = Math.min(progress, 100)

  return (
    <div className={`loader${done ? ' loader--done' : ''}`} aria-hidden="true">
      <div className="loader-inner">
        <div className="loader-logo">
          <span className="loader-num">11</span>
          <span className="loader-word">STUDIO</span>
        </div>
        <div className="loader-bar-wrap">
          <div className="loader-bar" style={{ width: `${pct}%` }} />
        </div>
        <div className="loader-counter">{Math.floor(pct).toString().padStart(3, '0')}</div>
      </div>
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
      { threshold: 0.06, rootMargin: '0px 0px -60px 0px' }
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
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { label: 'Work', id: 'portfolio' },
    { label: 'Services', id: 'services' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'About', id: 'about' },
    { label: 'Blog', id: 'blog' },
    { label: 'Contact', id: 'contact' },
  ]

  const goto = id => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} aria-label="Main navigation">
        <a href="#home" className="nav-logo" onClick={e => { e.preventDefault(); goto('home') }}>
          <span className="nav-logo-num">11</span>
          <span className="nav-logo-name">STUDIO</span>
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
          className={`hamburger${open ? ' hamburger--open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Full-screen menu overlay */}
      <div className={`menu-overlay${open ? ' menu-overlay--open' : ''}`} aria-hidden={!open}>
        <div className="menu-overlay-inner">
          {links.map((l, i) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="menu-overlay-link"
              style={{ transitionDelay: `${i * 0.06}s` }}
              onClick={e => { e.preventDefault(); goto(l.id) }}
            >
              <span className="menu-link-num">0{i + 1}</span>
              <span className="menu-link-text">{l.label}</span>
            </a>
          ))}
          <button
            className="menu-overlay-cta"
            onClick={() => { setOpen(false); onBookClick() }}
          >
            Get a Quote →
          </button>
        </div>
      </div>
    </>
  )
}

/* ============================================================
   HERO
   ============================================================ */
function Hero({ onWorkClick, onContactClick }) {
  const [lineIndex, setLineIndex] = useState(0)
  const lines = [
    'WE HELP',
    'CREATORS',
    'BRANDS &',
    'BUSINESSES',
    'BECOME',
    'IMPOSSIBLE',
    'TO IGNORE.',
  ]

  useEffect(() => {
    const t = setInterval(() => {
      setLineIndex(i => (i + 1) % lines.length)
    }, 2200)
    return () => clearInterval(t)
  }, [lines.length])

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      {/* Background glow */}
      <div className="hero-glow" />

      {/* Main Hero Content */}
      <div className="hero-content">
        <div className="hero-label">Creative Media Agency</div>

        <h1 id="hero-title" className="hero-title">
          {lines.map((line, i) => (
            <span
              key={i}
              className={`hero-title-line${i === lineIndex ? ' active' : i === (lineIndex - 1 + lines.length) % lines.length ? ' prev' : ''}`}
              aria-hidden={i !== 0}
            >
              {line}
            </span>
          ))}
        </h1>

        <div className="hero-sub-row">
          <p className="hero-sub">
            We help creators, brands, and businesses become impossible to ignore
            through world-class editing and storytelling.
          </p>
          <div className="hero-btns">
            <button id="hero-work-btn" className="btn-primary" onClick={onWorkClick}>
              View Our Work
            </button>
            <button id="hero-contact-btn" className="btn-ghost" onClick={onContactClick}>
              Start a Project →
            </button>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero-scroll">
        <div className="hero-scroll-line" />
        <span>Scroll</span>
      </div>

      {/* Large watermark */}
      <div className="hero-watermark">11</div>
    </section>
  )
}

/* ============================================================
   ABOUT
   ============================================================ */
function About() {
  useReveal()
  return (
    <section id="about" className="about-section">
      <div className="about-layout">
        <div className="about-left reveal">
          <div className="section-label">About Us</div>
          <h2 className="about-headline">
            11 Studio Is Not Just A Freelance Editing Service.
          </h2>
        </div>
        <div className="about-right reveal reveal-delay-1">
          <div className="about-statement">
            It is a <strong>creative agency</strong> focused on growth, storytelling, and premium content production.
          </div>
          <p className="about-body">
            I started 11 Studio with one laptop, an iPhone 15, and a belief that every brand
            deserves content that looks and feels world-class — no matter the size.
          </p>
          <p className="about-body">
            Every project begins with an idea and ends with a story people remember.
            We don't just create content — we build brands people remember.
          </p>

          <div className="about-stats">
            {[
              { num: '100%', label: 'Dedication' },
              { num: '24h', label: 'Response Time' },
              { num: '∞', label: 'Creative Ideas' },
              { num: '2025', label: 'Founded' },
            ].map(s => (
              <div className="about-stat" key={s.label}>
                <div className="about-stat-num">{s.num}</div>
                <div className="about-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="about-divider" />
    </section>
  )
}

/* ============================================================
   SERVICES / CAPABILITIES
   ============================================================ */
const SERVICES = [
  { num: '01', title: 'Video Production', desc: 'End-to-end cinematic production. From concept to final cut — crafted for maximum impact.' },
  { num: '02', title: 'Video Editing', desc: 'Cinematic edits that stop the scroll. Reels, brand films, ads, and YouTube — delivered fast.' },
  { num: '03', title: 'Content Creation', desc: 'Platform-native content built for Instagram, YouTube, and TikTok. Consistent, on-brand.' },
  { num: '04', title: 'Digital Storytelling', desc: 'Strategic creative vision that makes every piece of content cohesive and unmistakably yours.' },
  { num: '05', title: 'Motion Graphics', desc: 'Dynamic animations and visual effects that elevate your brand communication.' },
  { num: '06', title: 'Branding', desc: 'We build and manage your digital presence with consistent strategy and monthly reviews.' },
]

function Services() {
  useReveal()
  return (
    <section id="services" className="services-section">
      <div className="services-header reveal">
        <div className="section-label">What We Do</div>
        <h2 className="services-headline">Our Services</h2>
      </div>

      <div className="services-list">
        {SERVICES.map((s, i) => (
          <div key={s.num} className={`service-row reveal reveal-delay-${(i % 3) + 1}`}>
            <span className="service-row-num">{s.num}</span>
            <h3 className="service-row-title">{s.title}</h3>
            <p className="service-row-desc">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Large capability typography */}
      <div className="capabilities-type">
        <div className="cap-word">VIDEO EDITING</div>
        <div className="cap-word">CONTENT CREATION</div>
        <div className="cap-word">DIGITAL STORYTELLING</div>
        <div className="cap-word">MOTION GRAPHICS</div>
        <div className="cap-word">BRANDING</div>
      </div>
    </section>
  )
}

/* ============================================================
   PORTFOLIO
   ============================================================ */
const WORK = [
  {
    num: '01',
    cat: 'Cinematic Film',
    title: 'Brand Film',
    client: 'Cinematic storytelling for modern brands',
    img: '/portfolio_film.png',
  },
  {
    num: '02',
    cat: 'Product Video',
    title: 'Brand Editorial',
    client: 'Luxury product launch campaign',
    img: '/portfolio_brand.png',
  },
  {
    num: '03',
    cat: 'Motion Design',
    title: 'Motion Edit',
    client: 'Professional editing & color grading',
    img: '/portfolio_edit.png',
  },
  {
    num: '04',
    cat: 'Fashion',
    title: 'Fashion Editorial',
    client: 'High-fashion visual storytelling',
    img: '/portfolio_fashion.png',
  },
]

function Portfolio() {
  useReveal()
  return (
    <section id="portfolio" className="portfolio-section">
      <div className="portfolio-header reveal">
        <div className="section-label">Selected Work</div>
        <h2 className="portfolio-headline">Selected Works</h2>
        <p className="portfolio-desc">
          A showcase of the kind of cinematic content we create for brands like yours.
        </p>
      </div>

      <div className="portfolio-grid">
        {WORK.map((w, i) => (
          <div key={w.num} className={`portfolio-item reveal reveal-delay-${(i % 2) + 1}`}>
            <div className="portfolio-item-img">
              <img src={w.img} alt={w.title} />
              <div className="portfolio-item-overlay">
                <span className="portfolio-item-cat">{w.cat}</span>
                <span className="portfolio-view">View →</span>
              </div>
            </div>
            <div className="portfolio-item-info">
              <span className="portfolio-item-num">{w.num}</span>
              <div>
                <h3 className="portfolio-item-title">{w.title}</h3>
                <p className="portfolio-item-client">{w.client}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="portfolio-note reveal">
        * Sample portfolio. Real client work available upon request.
      </div>
    </section>
  )
}

/* ============================================================
   WHY 11 STUDIO
   ============================================================ */
const REASONS = [
  { icon: '🎯', title: 'Creative Strategy', desc: 'Every piece of content starts with a plan, not just a camera.' },
  { icon: '💎', title: 'Premium Quality', desc: 'Cinematic production value at every price point.' },
  { icon: '⚡', title: 'Fast Delivery', desc: 'Lightning-fast turnarounds without compromising on craft.' },
  { icon: '🏆', title: 'Brand-Focused', desc: 'We build content that reflects your brand identity, not generic templates.' },
  { icon: '🤝', title: 'Long-Term Partner', desc: 'We grow with you — tracking results and evolving your strategy.' },
  { icon: '🌍', title: 'India\'s Best', desc: 'Growing toward one of India\'s leading creative media agencies.' },
]

function WhyChoose() {
  useReveal()
  return (
    <section id="why" className="why-section">
      <div className="why-layout">
        <div className="why-left reveal">
          <div className="section-label">Why 11 Studio</div>
          <h2 className="why-headline">
            We Don't Just Create Content.<br />
            We Build Brands People <em>Remember.</em>
          </h2>
          <p className="why-body">
            11 Studio is a premium creative media agency specializing in visual storytelling
            that inspires, connects, and drives real growth for your business.
          </p>
        </div>
        <div className="why-right">
          {REASONS.map((r, i) => (
            <div key={r.title} className={`why-item reveal reveal-delay-${(i % 3) + 1}`}>
              <div className="why-item-icon">{r.icon}</div>
              <div>
                <div className="why-item-title">{r.title}</div>
                <div className="why-item-desc">{r.desc}</div>
              </div>
            </div>
          ))}
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
    quote: '11 Studio completely transformed our content quality. Our engagement skyrocketed after the first month working with them.',
    name: 'Arjun Mehta',
    role: 'Founder, FitLife Brand',
  },
  {
    quote: 'Absolutely cinematic work. They understood our brand voice instantly and delivered beyond expectations. Highly recommend.',
    name: 'Priya Sharma',
    role: 'Content Creator, 2.4M Followers',
  },
  {
    quote: 'Professional, fast, and incredibly talented. The team at 11 Studio is the creative partner every brand deserves.',
    name: 'Rahul Verma',
    role: 'CEO, TechStart Inc.',
  },
]

function Testimonials() {
  useReveal()
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActive(i => (i + 1) % TESTIMONIALS.length), 4500)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="testimonials-label reveal">What Clients Say</div>

      <div className="testimonial-display">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className={`testimonial-quote-block${i === active ? ' active' : ''}`}>
            "{t.quote}"
          </div>
        ))}
      </div>

      <div className="testimonial-authors reveal">
        {TESTIMONIALS.map((t, i) => (
          <button
            key={i}
            className={`testimonial-author${i === active ? ' active' : ''}`}
            onClick={() => setActive(i)}
          >
            <div className="testimonial-author-name">{t.name}</div>
            <div className="testimonial-author-role">{t.role}</div>
          </button>
        ))}
      </div>
    </section>
  )
}

/* ============================================================
   PRICING
   ============================================================ */
const PLANS = [
  {
    name: 'Starter',
    for: 'For individual creators',
    amount: '₹4,999',
    period: 'per month',
    features: ['1 video per week', 'Basic color grade', 'Cuts + subtitles', 'Thumbnail design', '48hr delivery'],
    cta: 'Choose Starter',
    featured: false,
  },
  {
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
      <div className="pricing-header reveal">
        <div className="section-label">Pricing</div>
        <h2 className="pricing-headline">Simple, Honest Pricing.</h2>
        <p className="pricing-sub">No hidden fees. No surprises. Launch pricing that rewards early clients.</p>
      </div>

      <div className="pricing-grid">
        {PLANS.map((p, i) => (
          <div key={p.name} className={`pricing-card reveal reveal-delay-${i + 1}${p.featured ? ' pricing-card--featured' : ''}`}>
            {p.badge && <div className="pricing-badge">{p.badge}</div>}
            <div className="pricing-name">{p.name}</div>
            <div className="pricing-for">{p.for}</div>
            <div className="pricing-amount">{p.amount}</div>
            <div className="pricing-period">{p.period}</div>
            <ul className="pricing-features">
              {p.features.map(f => <li key={f}><span className="pricing-check">✓</span>{f}</li>)}
            </ul>
            <button
              id={`pricing-btn-${p.name.toLowerCase()}`}
              className={p.featured ? 'btn-primary' : 'btn-outline'}
              onClick={onCtaClick}
            >
              {p.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ============================================================
   BLOG
   ============================================================ */
const POSTS = [
  {
    date: 'JUN 2025',
    cat: 'Content Strategy',
    title: 'Why Every Brand Needs Cinematic Video in 2025',
    desc: 'The shift from amateur footage to cinematic storytelling is the biggest content opportunity right now.',
  },
  {
    date: 'MAY 2025',
    cat: 'Editing Tips',
    title: '5 Color Grading Techniques That Transform Your Videos',
    desc: 'Professional color work is the difference between amateur and premium content. Here\'s how we do it.',
  },
  {
    date: 'APR 2025',
    cat: 'Brand Building',
    title: 'How to Build a Brand Identity Through Video Content',
    desc: 'Your videos should look unmistakably yours. Here\'s the framework we use with every client.',
  },
]

function Blog() {
  useReveal()
  return (
    <section id="blog" className="blog-section">
      <div className="blog-header reveal">
        <div className="section-label">Blog</div>
        <h2 className="blog-headline">Latest Insights</h2>
      </div>

      <div className="blog-grid">
        {POSTS.map((p, i) => (
          <article key={i} className={`blog-card reveal reveal-delay-${i + 1}`}>
            <div className="blog-card-meta">
              <span className="blog-date">{p.date}</span>
              <span className="blog-cat">{p.cat}</span>
            </div>
            <h3 className="blog-title">{p.title}</h3>
            <p className="blog-desc">{p.desc}</p>
            <a href="#" className="blog-read-more">Read More →</a>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ============================================================
   CONTACT
   ============================================================ */
function Contact() {
  useReveal()
  const [form, setForm] = useState({ name: '', brand: '', contact: '', service: '', budget: '', project: '' })
  const [sent, setSent] = useState(false)

  const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const onSubmit = e => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="contact" className="contact-section">
      <div className="contact-layout">
        {/* Left */}
        <div className="contact-info reveal">
          <div className="section-label">Get in Touch</div>
          <h2 className="contact-headline">
            Let's Build<br />Something <em>Great.</em>
          </h2>
          <p className="contact-body">
            Ready to take your brand's content to the next level?
            Tell us about your project and we'll get back to you within 24 hours.
          </p>

          <div className="contact-details">
            <div className="contact-detail">
              <div className="contact-detail-label">New Business</div>
              <div className="contact-detail-value">hello@11studio.in</div>
            </div>
            <div className="contact-detail">
              <div className="contact-detail-label">WhatsApp</div>
              <div className="contact-detail-value">Available on WhatsApp Business</div>
            </div>
            <div className="contact-detail">
              <div className="contact-detail-label">Instagram</div>
              <div className="contact-detail-value">@11studio</div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <form
          id="contact-form"
          className="contact-form reveal reveal-delay-2"
          onSubmit={onSubmit}
          aria-label="Contact form"
        >
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="f-name">Your Name</label>
              <input
                id="f-name"
                name="name"
                className="form-input"
                placeholder="Rahul Kumar"
                value={form.name}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="f-brand">Brand / Business</label>
              <input
                id="f-brand"
                name="brand"
                className="form-input"
                placeholder="Your Brand Name"
                value={form.brand}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="f-contact">WhatsApp / Email</label>
            <input
              id="f-contact"
              name="contact"
              className="form-input"
              placeholder="+91 98765 43210"
              value={form.contact}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="f-service">Service Needed</label>
              <select id="f-service" name="service" className="form-select" value={form.service} onChange={onChange}>
                <option value="">Select a service...</option>
                <option>Video Production</option>
                <option>Video Editing</option>
                <option>Content Creation</option>
                <option>Digital Storytelling</option>
                <option>Motion Graphics</option>
                <option>Branding</option>
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

          <button id="contact-submit-btn" type="submit" className="btn-primary">
            {sent ? 'Message Sent ✓' : 'Send Message →'}
          </button>
        </form>
      </div>
    </section>
  )
}

/* ============================================================
   CTA BAND
   ============================================================ */
function CTABand({ onContactClick }) {
  useReveal()
  return (
    <section className="cta-section">
      <div className="cta-inner">
        <div className="cta-label reveal">Ready to Build Something Extraordinary?</div>
        <h2 className="cta-headline reveal">
          Let's Create Content Your<br />Audience Will <em>Never Forget.</em>
        </h2>
        <p className="cta-body reveal reveal-delay-1">
          We help creators, startups, and businesses build unforgettable brands
          through cinematic storytelling and strategic digital experiences.
        </p>
        <div className="cta-btns reveal reveal-delay-2">
          <button id="cta-contact-btn" className="btn-primary-lg" onClick={onContactClick}>
            Start a Project
          </button>
          <a href="https://wa.me/" className="btn-ghost-lg" target="_blank" rel="noreferrer">
            WhatsApp Us →
          </a>
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
  const backToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-main">
        <div className="footer-col">
          <div className="footer-brand">
            <span className="footer-brand-num">11</span>
            <span className="footer-brand-name">STUDIO</span>
          </div>
          <p className="footer-tagline">
            Turning ideas into impact. We build brands people remember through
            cinematic storytelling and premium content creation.
          </p>
        </div>

        <div className="footer-col">
          <div className="footer-col-title">New Business</div>
          <a href="mailto:hello@11studio.in" className="footer-email">hello@11studio.in</a>
          <div className="footer-col-title" style={{ marginTop: 32 }}>Socials</div>
          <div className="footer-socials">
            <a href="#" id="footer-ig" aria-label="Instagram">Instagram</a>
            <a href="#" id="footer-yt" aria-label="YouTube">YouTube</a>
            <a href="#" id="footer-li" aria-label="LinkedIn">LinkedIn</a>
          </div>
        </div>

        <div className="footer-col">
          <div className="footer-col-title">Navigate</div>
          <nav className="footer-nav" aria-label="Footer navigation">
            {[['portfolio','Work'],['services','Services'],['pricing','Pricing'],['about','About'],['blog','Blog'],['contact','Contact']].map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={e => { e.preventDefault(); goto(id) }}>{label}</a>
            ))}
          </nav>
        </div>

        <div className="footer-col footer-col--right">
          <div className="footer-col-title">Office</div>
          <div className="footer-address">
            <div>India — Building Remotely</div>
            <div>Available Worldwide</div>
          </div>
          <button className="footer-back-top" onClick={backToTop} aria-label="Back to top">
            ↑
          </button>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copy">© 2026 11 Studio. Creative Media Agency. All rights reserved.</p>
        <div className="footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>

      {/* Large brand watermark */}
      <div className="footer-watermark">11</div>
    </footer>
  )
}

/* ============================================================
   MISSION & VISION BAND
   ============================================================ */
function MissionVision() {
  useReveal()
  return (
    <section className="mv-section">
      <div className="mv-grid">
        <div className="mv-card reveal">
          <div className="mv-type">Mission</div>
          <h3 className="mv-heading">
            To empower creators and businesses with premium visual storytelling.
          </h3>
          <p className="mv-text">
            That inspires, connects, and drives growth. Every frame we create carries
            intention. Every edit tells a story. Every project gets our absolute best.
          </p>
        </div>
        <div className="mv-card reveal reveal-delay-2">
          <div className="mv-type">Vision</div>
          <h3 className="mv-heading">
            To become one of India's leading creative media agencies.
          </h3>
          <p className="mv-text">
            Known for quality, innovation, and impactful storytelling. We're building
            toward a future where every brand — big or small — has access to world-class
            creative production.
          </p>
        </div>
      </div>
    </section>
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
      <Cursor />
      <Loader onDone={() => setLoaded(true)} />
      <Navbar onBookClick={() => goto('contact')} />
      <main
        className={loaded ? 'page-enter' : ''}
        style={{ visibility: loaded ? 'visible' : 'hidden' }}
      >
        <Hero
          onWorkClick={() => goto('portfolio')}
          onContactClick={() => goto('contact')}
        />
        <About />
        <Services />
        <Portfolio />
        <WhyChoose />
        <MissionVision />
        <Testimonials />
        <Pricing onCtaClick={() => goto('contact')} />
        <Blog />
        <CTABand onContactClick={() => goto('contact')} />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
