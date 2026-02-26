import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import './styles/variables.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <footer style={{ textAlign: 'center', padding: '40px 0', opacity: 0.5, fontSize: '0.8rem' }}>
        &copy; {new Date().getFullYear()} Matthew Fair (0xmattyiceee). Built with React & Vite.
      </footer>
    </div>
  );
}

export default App;
