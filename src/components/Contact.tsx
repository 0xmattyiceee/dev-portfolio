import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <div className="contact-card">
        <h2 className="section-title">Interested in working together?</h2>
        <p className="contact-description">
          Whether you have a question or just want to say hi, my inbox is always open. 
          I'm currently available for new opportunities and freelance work.
        </p>
        <div className="contact-actions">
          <a href="mailto:abc0xmattyic333@gmail.com" className="btn btn-primary">Say Hello</a>
          <div className="social-links">
            <a href="https://github.com/0xmattyiceee" target="_blank" rel="noopener noreferrer" className="social-link">GitHub</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
