import './About.css';
import profileImg from '../assets/profile_image.png';

const About = () => {
  const skills = [
    'HTML/CSS', 'JavaScript', 'TypeScript', 'React', 
    'Python', 'z/OS Mainframe', 'JCL', 'Assembler', 
    'REXX', 'Git', 'Vite', 'AI Prompting'
  ];

  return (
    <section id="about" className="about">
      <div className="about-grid">
        <div className="about-image-container">
          <div className="about-image">
            <img src={profileImg} alt="Profile" />
          </div>
        </div>
        <div className="about-text">
          <h2 className="section-title" style={{ textAlign: 'left' }}>About Me</h2>
          <p>
            I'm a budding software developer with a passion for building digital experiences and 
            solving problems through code. I'm currently on an exciting journey, learning the 
            fundamentals of web development and exploring how to build modern, responsive applications.
          </p>
          <p>
            Lately, I've also been diving into the world of AI, learning how to leverage these 
            powerful tools to enhance my workflow and create smarter applications. I'm a fast 
            learner, constantly curious, and dedicated to building a strong foundation in the 
            ever-evolving tech landscape.
          </p>
        </div>
        <div className="about-skills">
          <h3 className="skills-heading">Learning Path</h3>
          <div className="skills-grid">
            {skills.map(skill => (
              <div key={skill} className="skill-item">
                {skill}
              </div>
            ))}
          </div>
          <h3 className="skills-heading" style={{ marginTop: '25px' }}>Verified Credentials</h3>
          <div style={{ marginTop: '12px', display: 'flex', gap: '15px' }}>
            <a href="https://www.credly.com/badges/ec0ccf1b-09aa-4bd9-b675-55939a8fdb3e/public_url" target="_blank" rel="noopener noreferrer">
              <img src="https://images.credly.com/images/84102927-1db7-4ef8-82ef-d7541f7cf537/IBM_Z_Xplore_-_Concepts.png" alt="IBM Z Xplore - Concepts" style={{ width: '90px', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.06)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
