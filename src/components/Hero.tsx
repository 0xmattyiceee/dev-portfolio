import './Hero.css';
import profileImg from '../assets/profile_image.png';

const Hero = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <h2 className="hero-subtitle">Software Developer</h2>
        <h1 className="hero-title">
          Building digital products, <br /> 
          <span className="gradient-text">brands, and experiences.</span>
        </h1>
        <p className="hero-description">
          A passionate developer specializing in building modern digital experiences. 
          Currently focused on learning and building accessible, human-centered products.
        </p>
        <div className="hero-cta">
          <a href="#projects" className="btn btn-primary">View Projects</a>
          <a href="#contact" className="btn btn-secondary">Get In Touch</a>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-image-wrapper">
          <img src={profileImg} alt="Matthew" className="hero-profile-img" />
          <div className="blob"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
