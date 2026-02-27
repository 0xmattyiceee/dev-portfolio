import './Projects.css';

interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
}

const projects: Project[] = [
  {
    title: 'Dev Portfolio',
    description: 'A modern, responsive portfolio website built with React and Vite to showcase my learning journey and projects.',
    tags: ['React', 'TypeScript', 'Vite', 'CSS'],
    link: 'https://github.com/0xmattyiceee/dev-portfolio',
  },
  {
    title: 'Digital Business Card',
    description: 'A sleek, interactive digital business card designed for modern networking and professional branding.',
    tags: ['React', 'CSS', 'JavaScript'],
    link: 'https://0xmattyiceee.github.io/digital-identity-card/',
  },
];

const Projects = () => {
  return (
    <section id="projects" className="projects">
      <h2 className="section-title">Selected Works</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <div className="project-img-placeholder">
              <span className="project-number">0{index + 1}</span>
            </div>
            <div className="project-info">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>
              <div className="project-tags">
                {project.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <a href={project.link} className="project-link">View Case Study →</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
