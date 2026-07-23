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
