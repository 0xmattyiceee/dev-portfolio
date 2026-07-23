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
          <a href="mailto:0xmattyiceee@gmail.com" className="btn btn-primary">Say gm</a>
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
