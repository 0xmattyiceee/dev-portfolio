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
