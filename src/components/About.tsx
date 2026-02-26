import './About.css';
import profileImg from '../assets/profile_image.png';

const About = () => {
  const skills = [
    'HTML/CSS', 'JavaScript', 'TypeScript', 'React', 
    'Python', 'Git', 'Vite', 'AI Prompting'
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
        </div>
      </div>
    </section>
  );
};

export default About;
