# Solana Seeker Portfolio Overhaul — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the existing generic dev portfolio into a distinctive, Solana-mobile-themed "building in public" site that positions the owner as a developer building dApps for the Solana Seeker and dApp Store.

**Architecture:** Same stack (React 19 + TS + Vite → GitHub Pages). We rewrite the component tree and centralize a new Solana design-token system in `variables.css`. `About` splits into two focused components (`Mission`, `Stack`). A CSS-only Seeker phone mockup anchors the hero. No new runtime dependencies.

**Tech Stack:** React 19, TypeScript, Vite 7, plain CSS (CSS variables + glassmorphism), Google Fonts (Inter + Space Mono).

## Global Constraints

- **No new npm dependencies** — build the phone mockup and all effects with CSS only.
- **Content honesty** — all Solana capability framed as *learning/mission*, never expertise. No fabricated dApps, users, metrics, or credentials. Existing projects stay factually accurate (copy may be refreshed).
- **Real assets only** — `0xmattyic333.skr` (Seeker domain) and the IBM Z Xplore Credly badge are real; use as-is. Badge displayed large (~170px).
- **Preserve structure** — one `Component.tsx` + `Component.css` per section; design tokens live in `src/styles/variables.css`.
- **No test runner exists.** Verification for every task = `npm run lint` passes + `npm run build` passes + visual check in `npm run dev`. Do not add a test framework.
- **Colors:** bg `#0b0b0f`, Solana purple `#9945ff`, Solana green `#14f195`, signature gradient `linear-gradient(120deg, #9945ff, #14f195)`.

---

### Task 0: Project setup — install deps, fonts, title

**Files:**
- Run: `npm install` (creates `node_modules/`)
- Modify: `index.html`

**Interfaces:**
- Consumes: nothing.
- Produces: working `npm run lint` / `npm run build`; global availability of `Inter` and `Space Mono` fonts; updated page title.

- [ ] **Step 1: Install dependencies**

Run: `npm install`
Expected: completes, `node_modules/` created, no fatal errors.

- [ ] **Step 2: Verify baseline build works**

Run: `npm run build`
Expected: PASS — `tsc -b && vite build` completes, `dist/` produced.

- [ ] **Step 3: Update `index.html` — add Space Mono font and set the title**

Replace the existing Inter font `<link>` line:

```html
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

with (adds Space Mono):

```html
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```

And replace the title line:

```html
    <title>Dev Portfolio</title>
```

with:

```html
    <title>0xmattyic333.skr — Solana Mobile Dev</title>
```

- [ ] **Step 4: Verify build still passes**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add index.html package-lock.json
git commit -m "chore: install deps, add Space Mono font, update page title"
```

---

### Task 1: Solana design tokens + shared primitives

**Files:**
- Modify (full replace): `src/styles/variables.css`

**Interfaces:**
- Consumes: nothing.
- Produces: CSS variables (`--bg-color`, `--sol-purple`, `--sol-green`, `--gradient`, `--card-bg`, `--glass-border`, `--glow`, `--radius`, `--font-main`, `--font-mono`, etc.) and shared classes `.section-tag`, `.section-title`, `.gradient-text`, `.btn`/`.btn-primary`/`.btn-secondary`, `.site-footer`, `.footer-handle` used by all later tasks.

- [ ] **Step 1: Replace `src/styles/variables.css` entirely**

```css
:root {
  --bg-color: #0b0b0f;
  --bg-elevated: #14141c;
  --text-color: #ededf2;
  --text-muted: #9a9aab;
  --sol-purple: #9945ff;
  --sol-green: #14f195;
  --gradient: linear-gradient(120deg, #9945ff 0%, #14f195 100%);
  --accent-color: #9945ff;
  --accent-secondary: #14f195;
  --card-bg: rgba(255, 255, 255, 0.035);
  --glass-border: rgba(255, 255, 255, 0.08);
  --border-color: rgba(255, 255, 255, 0.08);
  --glow: 0 0 40px rgba(153, 69, 255, 0.28);
  --glow-green: 0 0 40px rgba(20, 241, 149, 0.22);
  --radius: 22px;
  --radius-sm: 14px;
  --font-main: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'Space Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  --max-width: 1120px;
  --transition: all 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
  font-family: var(--font-main);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  background-image:
    radial-gradient(circle at 15% 12%, rgba(153, 69, 255, 0.14), transparent 40%),
    radial-gradient(circle at 85% 18%, rgba(20, 241, 149, 0.10), transparent 42%);
  background-attachment: fixed;
}

a {
  text-decoration: none;
  color: inherit;
  transition: var(--transition);
}

ul {
  list-style: none;
}

button {
  cursor: pointer;
  border: none;
  background: none;
  font-family: inherit;
}

section {
  padding: 100px 24px;
  max-width: var(--max-width);
  margin: 0 auto;
}

h1, h2, h3 {
  font-weight: 800;
  line-height: 1.1;
}

.section-tag {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--sol-green);
  letter-spacing: 0.05em;
  margin-bottom: 14px;
}

.section-title {
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: 36px;
  letter-spacing: -0.02em;
}

.gradient-text {
  background: var(--gradient);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.btn {
  display: inline-block;
  padding: 13px 26px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.95rem;
  transition: var(--transition);
}

.btn-primary {
  background: var(--gradient);
  color: #0b0b0f;
  box-shadow: var(--glow);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 55px rgba(153, 69, 255, 0.45);
}

.btn-secondary {
  background: var(--card-bg);
  border: 1px solid var(--glass-border);
  color: var(--text-color);
  backdrop-filter: blur(10px);
}

.btn-secondary:hover {
  border-color: var(--sol-purple);
  transform: translateY(-2px);
}

.site-footer {
  text-align: center;
  padding: 50px 24px;
  border-top: 1px solid var(--glass-border);
  color: var(--text-muted);
  font-size: 0.82rem;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.footer-handle {
  font-family: var(--font-mono);
  font-weight: 700;
  background: var(--gradient);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

- [ ] **Step 2: Verify build passes**

Run: `npm run build`
Expected: PASS (existing components still reference `--accent-color` etc., which remain defined).

- [ ] **Step 3: Commit**

```bash
git add src/styles/variables.css
git commit -m "feat: replace design tokens with Solana mobile system"
```

---

### Task 2: Navbar rebrand

**Files:**
- Modify (full replace): `src/components/Navbar.tsx`
- Modify (full replace): `src/components/Navbar.css`

**Interfaces:**
- Consumes: `.btn` tokens not needed; uses local `.connect-pill`. Anchors target section ids `#mission`, `#stack`, `#projects`, `#contact`, `#hero` (created in later tasks).
- Produces: fixed navbar with scroll-shrink behavior (unchanged logic).

- [ ] **Step 1: Replace `src/components/Navbar.tsx`**

```tsx
import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-content">
        <a href="#hero" className="logo">
          mattyice<span className="logo-skr">.skr</span>
        </a>
        <ul className="nav-links">
          <li><a href="#mission">Mission</a></li>
          <li><a href="#stack">Stack</a></li>
          <li><a href="#projects">Work</a></li>
        </ul>
        <a href="#contact" className="connect-pill">Connect</a>
      </div>
    </nav>
  );
};

export default Navbar;
```

- [ ] **Step 2: Replace `src/components/Navbar.css`**

```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 18px 24px;
  transition: var(--transition);
}

.navbar.scrolled {
  background: rgba(11, 11, 15, 0.72);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--glass-border);
  padding: 12px 24px;
}

.navbar-content {
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-weight: 800;
  font-size: 1.15rem;
  letter-spacing: -0.02em;
}

.logo-skr {
  font-family: var(--font-mono);
  background: var(--gradient);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-links {
  display: flex;
  gap: 30px;
  font-size: 0.92rem;
}

.nav-links a {
  color: var(--text-muted);
}

.nav-links a:hover {
  color: var(--text-color);
}

.connect-pill {
  padding: 9px 20px;
  border-radius: 999px;
  background: var(--card-bg);
  border: 1px solid var(--sol-purple);
  color: var(--text-color);
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: var(--glow);
}

.connect-pill:hover {
  background: var(--gradient);
  color: #0b0b0f;
}

@media (max-width: 640px) {
  .nav-links {
    display: none;
  }
}
```

- [ ] **Step 3: Verify lint + build**

Run: `npm run lint && npm run build`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.tsx src/components/Navbar.css
git commit -m "feat: rebrand navbar for Solana mobile"
```

---

### Task 3: Hero with Seeker phone mockup

**Files:**
- Modify (full replace): `src/components/Hero.tsx`
- Modify (full replace): `src/components/Hero.css`

**Interfaces:**
- Consumes: `.btn`, `.btn-primary`, `.btn-secondary`, `.gradient-text` from Task 1; `profileImg` asset.
- Produces: `<section id="hero">`; CSS-only phone mockup.

- [ ] **Step 1: Replace `src/components/Hero.tsx`**

```tsx
import './Hero.css';
import profileImg from '../assets/profile_image.png';

const Hero = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <div className="hero-handle">
          <span className="hero-handle-dot" />
          0xmattyic333.skr
          <span className="hero-handle-verified">verified</span>
        </div>
        <h1 className="hero-title">
          Going full <span className="gradient-text">Solana.</span>
        </h1>
        <p className="hero-description">
          I'm building dApps for the <strong>Solana Seeker</strong> and the
          <strong> Solana dApp Store</strong> — mobile-first, on-chain, and
          shipping in public.
        </p>
        <div className="hero-cta">
          <a href="#projects" className="btn btn-primary">View Work</a>
          <a href="#contact" className="btn btn-secondary">Follow the build</a>
        </div>
      </div>
      <div className="hero-visual">
        <div className="phone">
          <div className="phone-notch" />
          <div className="phone-screen">
            <div className="phone-statusbar">
              <span>9:41</span>
              <span>◈ Seeker</span>
            </div>
            <div className="phone-profile">
              <img src={profileImg} alt="0xmattyic333" className="phone-avatar" />
              <div className="phone-name">0xmattyic333.skr</div>
              <div className="phone-role">Solana Mobile Dev</div>
            </div>
            <div className="phone-status-card">
              <span className="phone-status-dot" />
              Currently building on Solana
            </div>
            <div className="phone-apps">
              <div className="phone-app"><span>⬦</span>Anchor</div>
              <div className="phone-app"><span>◈</span>Seeker</div>
              <div className="phone-app"><span>❖</span>Wallet</div>
              <div className="phone-app"><span>⟠</span>dApps</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
```

- [ ] **Step 2: Replace `src/components/Hero.css`**

```css
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  gap: 50px;
  padding-top: 120px;
  padding-bottom: 60px;
}

.hero-content {
  flex: 1;
}

.hero-handle {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  padding: 7px 14px;
  border-radius: 999px;
  background: var(--card-bg);
  border: 1px solid var(--glass-border);
  margin-bottom: 24px;
}

.hero-handle-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--sol-green);
  box-shadow: 0 0 10px var(--sol-green);
}

.hero-handle-verified {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--sol-green);
  padding-left: 8px;
  border-left: 1px solid var(--glass-border);
}

.hero-title {
  font-size: clamp(2.6rem, 7vw, 4.6rem);
  letter-spacing: -0.03em;
  margin-bottom: 22px;
}

.hero-description {
  font-size: 1.12rem;
  color: var(--text-muted);
  max-width: 480px;
  margin-bottom: 34px;
}

.hero-description strong {
  color: var(--text-color);
  font-weight: 600;
}

.hero-cta {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.hero-visual {
  flex: 0 0 300px;
  display: flex;
  justify-content: center;
}

.phone {
  position: relative;
  width: 290px;
  height: 590px;
  border-radius: 42px;
  background: linear-gradient(160deg, #1a1a24, #0d0d13);
  border: 1px solid var(--glass-border);
  padding: 14px;
  box-shadow: var(--glow), 0 30px 60px rgba(0, 0, 0, 0.5);
}

.phone-notch {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 26px;
  background: #0d0d13;
  border-radius: 0 0 16px 16px;
  z-index: 2;
}

.phone-screen {
  height: 100%;
  border-radius: 30px;
  background:
    radial-gradient(circle at 50% 0%, rgba(153, 69, 255, 0.22), transparent 55%),
    #0b0b0f;
  padding: 40px 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  overflow: hidden;
}

.phone-statusbar {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-muted);
}

.phone-profile {
  text-align: center;
  margin-top: 6px;
}

.phone-avatar {
  width: 84px;
  height: 84px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--sol-purple);
  box-shadow: var(--glow);
}

.phone-name {
  font-family: var(--font-mono);
  font-size: 0.9rem;
  margin-top: 12px;
  font-weight: 700;
}

.phone-role {
  font-size: 0.78rem;
  color: var(--text-muted);
}

.phone-status-card {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 0.8rem;
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  background: var(--card-bg);
  border: 1px solid var(--glass-border);
}

.phone-status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--sol-green);
  box-shadow: 0 0 10px var(--sol-green);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.phone-apps {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: auto;
}

.phone-app {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 0;
  border-radius: var(--radius-sm);
  background: var(--card-bg);
  border: 1px solid var(--glass-border);
  font-size: 0.72rem;
  color: var(--text-muted);
}

.phone-app span {
  font-size: 1.3rem;
  background: var(--gradient);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

@media (max-width: 860px) {
  .hero {
    flex-direction: column-reverse;
    text-align: center;
  }

  .hero-description {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-cta {
    justify-content: center;
  }
}
```

- [ ] **Step 3: Verify lint + build**

Run: `npm run lint && npm run build`
Expected: PASS.

- [ ] **Step 4: Visual check**

Run: `npm run dev`, open the local URL. Confirm: `.skr` chip glows, headline gradient renders, phone mockup shows avatar + pulsing status + 4 app tiles, layout stacks on narrow width.

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.tsx src/components/Hero.css
git commit -m "feat: Solana hero with Seeker phone mockup and .skr chip"
```

---

### Task 4: Mission + Stack components; rewire App; remove About

**Files:**
- Create: `src/components/Mission.tsx`
- Create: `src/components/Mission.css`
- Create: `src/components/Stack.tsx`
- Create: `src/components/Stack.css`
- Modify (full replace): `src/App.tsx`
- Delete: `src/components/About.tsx`
- Delete: `src/components/About.css`

**Interfaces:**
- Consumes: `.section-tag`, `.section-title`, `.site-footer`, `.footer-handle` from Task 1.
- Produces: `<section id="mission">`, `<section id="stack">`; final `App` tree (Navbar → Hero → Mission → Stack → Projects → Contact → footer).

- [ ] **Step 1: Create `src/components/Mission.tsx`**

```tsx
import './Mission.css';

const Mission = () => {
  return (
    <section id="mission" className="mission">
      <span className="section-tag">// the mission</span>
      <h2 className="section-title">All-in on Solana mobile.</h2>
      <div className="mission-body">
        <p>
          I'm a developer going all-in on Solana mobile. The focus is simple:
          learn the stack deeply and ship real dApps for the <strong>Seeker</strong>
          {' '}and the <strong>Solana dApp Store</strong>.
        </p>
        <p>
          I'm building in public — leveling up on Rust, Anchor, and the Solana
          Mobile Stack while shipping projects that prove I can take an idea from
          zero to deployed. If it runs on-chain and lives on a phone, that's where
          I want to be.
        </p>
      </div>
    </section>
  );
};

export default Mission;
```

- [ ] **Step 2: Create `src/components/Mission.css`**

```css
.mission-body {
  display: grid;
  gap: 22px;
  max-width: 760px;
  font-size: 1.15rem;
  color: var(--text-muted);
}

.mission-body strong {
  color: var(--text-color);
  font-weight: 600;
}
```

- [ ] **Step 3: Create `src/components/Stack.tsx`**

```tsx
import './Stack.css';

const shipping = ['React', 'TypeScript', 'Solidity', 'Python', 'HTML/CSS', 'Git', 'Vite'];
const leveling = ['Rust', 'Anchor', 'Solana Mobile Stack', 'Solana Kit / web3.js', 'Mobile Wallet Adapter'];

const Stack = () => {
  return (
    <section id="stack" className="stack">
      <span className="section-tag">// the stack</span>
      <h2 className="section-title">What I build with.</h2>
      <div className="stack-grid">
        <div className="stack-card">
          <h3 className="stack-heading">Shipping with</h3>
          <div className="chips">
            {shipping.map(s => <span key={s} className="chip">{s}</span>)}
          </div>
        </div>
        <div className="stack-card">
          <h3 className="stack-heading">
            Leveling up <span className="stack-sub">// learning now</span>
          </h3>
          <div className="chips">
            {leveling.map(s => <span key={s} className="chip chip-learning">{s}</span>)}
          </div>
        </div>
      </div>
      <div className="credential">
        <h3 className="stack-heading">Verified credential</h3>
        <a
          href="https://www.credly.com/badges/ec0ccf1b-09aa-4bd9-b675-55939a8fdb3e/public_url"
          target="_blank"
          rel="noopener noreferrer"
          className="credential-badge"
        >
          <img
            src="https://images.credly.com/images/0f3e4162-ab6b-457c-8c0d-835a14680666/linkedin_thumb_image.png"
            alt="IBM Z Xplore - Concepts"
          />
        </a>
      </div>
    </section>
  );
};

export default Stack;
```

- [ ] **Step 4: Create `src/components/Stack.css`**

```css
.stack-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.stack-card {
  background: var(--card-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius);
  padding: 30px;
  backdrop-filter: blur(10px);
}

.stack-heading {
  font-size: 1.05rem;
  margin-bottom: 18px;
  font-weight: 700;
}

.stack-sub {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--sol-green);
  font-weight: 400;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.chip {
  padding: 8px 15px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--glass-border);
  font-size: 0.85rem;
  font-weight: 500;
}

.chip-learning {
  border-color: rgba(153, 69, 255, 0.4);
  background: rgba(153, 69, 255, 0.08);
}

.credential {
  margin-top: 42px;
}

.credential-badge {
  display: inline-block;
  margin-top: 6px;
  padding: 22px;
  border-radius: var(--radius);
  background: var(--card-bg);
  border: 1px solid var(--glass-border);
  transition: var(--transition);
}

.credential-badge:hover {
  transform: translateY(-4px);
  box-shadow: var(--glow);
  border-color: var(--sol-purple);
}

.credential-badge img {
  width: 170px;
  display: block;
}

@media (max-width: 700px) {
  .stack-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 5: Replace `src/App.tsx` (final tree + footer)**

```tsx
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Mission from './components/Mission';
import Stack from './components/Stack';
import Projects from './components/Projects';
import Contact from './components/Contact';
import './styles/variables.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Mission />
        <Stack />
        <Projects />
        <Contact />
      </main>
      <footer className="site-footer">
        <span className="footer-handle">0xmattyic333.skr</span>
        <span>
          &copy; {new Date().getFullYear()} · Building on Solana Mobile · Built with React &amp; Vite
        </span>
      </footer>
    </div>
  );
}

export default App;
```

- [ ] **Step 6: Delete the old About component**

Run: `git rm src/components/About.tsx src/components/About.css`
Expected: both files removed.

- [ ] **Step 7: Verify lint + build**

Run: `npm run lint && npm run build`
Expected: PASS (no remaining imports of `About`; badge image alt text present).

- [ ] **Step 8: Commit**

```bash
git add src/components/Mission.tsx src/components/Mission.css src/components/Stack.tsx src/components/Stack.css src/App.tsx
git commit -m "feat: add Mission and Stack sections, rewire App, remove About"
```

---

### Task 5: Projects as app-store-style cards

**Files:**
- Modify (full replace): `src/components/Projects.tsx`
- Modify (full replace): `src/components/Projects.css`

**Interfaces:**
- Consumes: `.section-tag`, `.section-title` from Task 1.
- Produces: `<section id="projects">` with app-store card grid.

- [ ] **Step 1: Replace `src/components/Projects.tsx`**

```tsx
import './Projects.css';

interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
}

const projects: Project[] = [
  {
    title: 'IBM Z Xplore Workspace',
    description:
      'An enterprise workspace demonstrating live system integrations, algorithmic challenges, and automated tooling — proof I can navigate complex, real-world systems.',
    tags: ['Python', 'Automation', 'Systems'],
    link: 'https://github.com/0xmattyiceee/zxplore',
  },
  {
    title: 'Dev Portfolio',
    description:
      'This site — a Solana-mobile-themed portfolio built with React, TypeScript, and Vite, shipped to production on GitHub Pages.',
    tags: ['React', 'TypeScript', 'Vite'],
    link: 'https://github.com/0xmattyiceee/dev-portfolio',
  },
  {
    title: 'Digital Business Card',
    description:
      'A sleek, interactive digital identity card for modern networking — clean UI, deployed and live.',
    tags: ['React', 'CSS', 'JavaScript'],
    link: 'https://0xmattyiceee.github.io/digital-identity-card/',
  },
  {
    title: 'WolfeePackk Team Site',
    description:
      'A community website for a gaming team — schedules, content, and engagement, built and deployed end to end.',
    tags: ['React', 'CSS', 'JavaScript'],
    link: 'https://0xmattyiceee.github.io/wolfeepackk_temprgg/',
  },
];

const Projects = () => {
  return (
    <section id="projects" className="projects">
      <span className="section-tag">// proof of work</span>
      <h2 className="section-title">Things I've shipped.</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={project.title} className="project-card">
            <div className="project-icon">
              <span>0{index + 1}</span>
            </div>
            <div className="project-info">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>
              <div className="project-tags">
                {project.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                Open ↗
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
```

- [ ] **Step 2: Replace `src/components/Projects.css`**

```css
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 22px;
}

.project-card {
  display: flex;
  align-items: flex-start;
  gap: 18px;
  background: var(--card-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius);
  padding: 26px;
  backdrop-filter: blur(10px);
  transition: var(--transition);
}

.project-card:hover {
  transform: translateY(-4px);
  border-color: var(--sol-purple);
  box-shadow: var(--glow);
}

.project-icon {
  flex: 0 0 56px;
  height: 56px;
  border-radius: 16px;
  background: var(--gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-weight: 700;
  color: #0b0b0f;
  font-size: 1.1rem;
}

.project-info {
  flex: 1;
}

.project-title {
  font-size: 1.15rem;
  margin-bottom: 8px;
}

.project-desc {
  font-size: 0.92rem;
  color: var(--text-muted);
  margin-bottom: 14px;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.tag {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--glass-border);
  color: var(--text-muted);
}

.project-link {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--sol-green);
}

.project-link:hover {
  text-shadow: 0 0 12px rgba(20, 241, 149, 0.5);
}

@media (max-width: 700px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 3: Verify lint + build**

Run: `npm run lint && npm run build`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/components/Projects.tsx src/components/Projects.css
git commit -m "feat: app-store-style project cards with refreshed copy"
```

---

### Task 6: Contact section + README refresh

**Files:**
- Modify (full replace): `src/components/Contact.tsx`
- Modify (full replace): `src/components/Contact.css`
- Modify: `README.md` (title + description paragraph)

**Interfaces:**
- Consumes: `.section-tag`, `.section-title`, `.btn`, `.btn-primary`, `.btn-secondary` from Task 1.
- Produces: `<section id="contact">`; final full-page build.

- [ ] **Step 1: Replace `src/components/Contact.tsx`**

```tsx
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <div className="contact-card">
        <span className="section-tag">// let's connect</span>
        <h2 className="section-title">Let's build on Solana.</h2>
        <p className="contact-description">
          Building for the Seeker or the dApp Store, want to collaborate, or just
          want to follow the build? My inbox and GitHub are open.
        </p>
        <div className="contact-handle">0xmattyic333.skr</div>
        <div className="contact-actions">
          <a href="mailto:abc0xmattyic333@gmail.com" className="btn btn-primary">Say gm</a>
          <a
            href="https://github.com/0xmattyiceee"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
```

- [ ] **Step 2: Replace `src/components/Contact.css`**

```css
.contact-card {
  position: relative;
  overflow: hidden;
  background: var(--card-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius);
  padding: 60px 40px;
  text-align: center;
  backdrop-filter: blur(12px);
  box-shadow: var(--glow);
}

.contact-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 0%, rgba(153, 69, 255, 0.18), transparent 60%);
  pointer-events: none;
}

.contact-description {
  color: var(--text-muted);
  max-width: 520px;
  margin: 0 auto 22px;
  font-size: 1.05rem;
  position: relative;
}

.contact-handle {
  font-family: var(--font-mono);
  font-size: 0.95rem;
  margin-bottom: 28px;
  position: relative;
  background: var(--gradient);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.contact-actions {
  position: relative;
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}
```

- [ ] **Step 3: Update `README.md`**

Replace the first two lines:

```markdown
# Dev Portfolio

A modern, responsive portfolio website built with React, TypeScript, and Vite. This project showcases my professional journey, technical skills, and a curated selection of my latest work.
```

with:

```markdown
# 0xmattyic333.skr — Solana Mobile Portfolio

A Solana-mobile-themed portfolio built with React, TypeScript, and Vite. It showcases my mission to build dApps for the Solana Seeker and the Solana dApp Store, my stack, and the projects I've shipped.
```

- [ ] **Step 4: Verify lint + build**

Run: `npm run lint && npm run build`
Expected: PASS.

- [ ] **Step 5: Full visual check**

Run: `npm run dev`. Scroll the whole page top to bottom. Confirm all six sections render cohesively (navbar, hero + phone, mission, stack with enlarged badge, project cards, contact card), gradients/glows read as "Solana," and the layout holds on a narrow (mobile) width.

- [ ] **Step 6: Commit**

```bash
git add src/components/Contact.tsx src/components/Contact.css README.md
git commit -m "feat: Solana contact section and refreshed README"
```

---

## Deploy (after all tasks, on user approval)

Deployment is unchanged. When the user is ready to publish:

Run: `npm run deploy`
Expected: `gh-pages` publishes `dist/` to the `gh-pages` branch.

Do **not** deploy without explicit user confirmation.
