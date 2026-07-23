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
