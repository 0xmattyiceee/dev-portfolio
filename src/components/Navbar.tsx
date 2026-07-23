import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><a href="#mission" onClick={() => setMenuOpen(false)}>Mission</a></li>
          <li><a href="#stack" onClick={() => setMenuOpen(false)}>Stack</a></li>
          <li><a href="#projects" onClick={() => setMenuOpen(false)}>Work</a></li>
        </ul>
        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
        </button>
        <a href="#contact" className="connect-pill" onClick={() => setMenuOpen(false)}>Connect</a>
      </div>
    </nav>
  );
};

export default Navbar;
