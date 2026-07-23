import { useState, useEffect } from 'react';
import './Navbar.css';
import WalletButton from './WalletButton';

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
          0xmattyic333<span className="logo-skr">.skr</span>
        </a>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><a href="#mission" onClick={() => setMenuOpen(false)}>Mission</a></li>
          <li><a href="#stack" onClick={() => setMenuOpen(false)}>Stack</a></li>
          <li><a href="#projects" onClick={() => setMenuOpen(false)}>Work</a></li>
          <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
        </ul>
        <button
          className="nav-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
        </button>
        <WalletButton />
      </div>
    </nav>
  );
};

export default Navbar;
