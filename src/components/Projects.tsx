import './Projects.css';

interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
}

const projects: Project[] = [
  {
    title: 'Personal Portfolio',
    description: 'A modern, responsive portfolio website built with React and Vite to showcase my learning journey.',
    tags: ['React', 'TypeScript', 'CSS'],
    link: '#',
  },
  {
    title: 'AI Task Tracker',
    description: 'A simple task management application featuring basic AI-powered task suggestions.',
    tags: ['JavaScript', 'HTML', 'CSS', 'AI API'],
    link: '#',
  },
  {
    title: 'Interactive Quiz App',
    description: 'A dynamic quiz application designed to test knowledge on web development fundamentals.',
    tags: ['TypeScript', 'Vite', 'React'],
    link: '#',
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
