import './Contact.css';
import { usePayModal } from '../solana/PayModalProvider';

const Contact = () => {
  const { openPay } = usePayModal();
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
          <button type="button" className="btn btn-primary" onClick={openPay}>
            Support / Hire me
          </button>
          <a href="mailto:0xmattyiceee@gmail.com" className="btn btn-secondary">Say gm</a>
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
