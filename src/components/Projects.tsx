import './Projects.css';

interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
}

const projects: Project[] = [
  {
    title: 'IBM Z Xplore Workspace',
    description:
      'An enterprise workspace demonstrating live system integrations, algorithmic challenges, and automated tooling — proof I can navigate complex, real-world systems.',
    tags: ['Python', 'Automation', 'Systems'],
    link: 'https://github.com/0xmattyiceee/zxplore',
  },
  {
    title: 'Dev Portfolio',
    description:
      'This site — a Solana-mobile-themed portfolio built with React, TypeScript, and Vite, shipped to production on GitHub Pages.',
    tags: ['React', 'TypeScript', 'Vite'],
    link: 'https://github.com/0xmattyiceee/dev-portfolio',
  },
  {
    title: 'Digital Business Card',
    description:
      'A sleek, interactive digital identity card for modern networking — clean UI, deployed and live.',
    tags: ['React', 'CSS', 'JavaScript'],
    link: 'https://0xmattyiceee.github.io/digital-identity-card/',
  },
  {
    title: 'WolfeePackk Team Site',
    description:
      'A community website for a gaming team — schedules, content, and engagement, built and deployed end to end.',
    tags: ['React', 'CSS', 'JavaScript'],
    link: 'https://0xmattyiceee.github.io/wolfeepackk_temprgg/',
  },
];

const Projects = () => {
  return (
    <section id="projects" className="projects">
      <span className="section-tag">// proof of work</span>
      <h2 className="section-title">Things I've shipped.</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={project.title} className="project-card">
            <div className="project-icon">
              <span>0{index + 1}</span>
            </div>
            <div className="project-info">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>
              <div className="project-tags">
                {project.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                Open ↗
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
