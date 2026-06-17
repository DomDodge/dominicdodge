import Image from 'next/image'
import projectsData from './projects.json'

type Project = {
  title: string
  image: string
  text: string
  link: string
  tags: string[]
}

export default function ProjectsPage() {
  return (
    <div>
      <Heading />
      <DarkGreenBlock />
    </div>
  );
}

function Projects() {
    const projects = (projectsData as unknown as { projects: Project[] }).projects

    return (
      <div className="projects">
        {projects.map((p) => (
          <div className="project" key={p.title}>
              <h2>{p.title}</h2>
              <Image src={`/images/${p.image}`} className="projectImage" alt={p.title} width={300} height={225} />
              {/* <p>{p.text}</p>
              <a href={p.link} target="_blank" rel="noopener noreferrer">Open</a> */}
              <div className="tagHolder">
                {p.tags.map((tag) => (
                  <div className="tag" key={tag}>
                    {tag}
                  </div>
                ))}
              </div>
          </div>
        ))}
      </div>
    )
}

function Heading() {
  return (
    <div className="heading">
      <h1>Projects</h1>
    </div>
  );
}

function DarkGreenBlock() {
  return (
    <div className="projectBlock">
      <div className="controls">
        <label>Filters:</label>
        
        <div className="controls">
          <label>Search:</label>
          <input type="text" className="search"></input>
        </div>
      </div>

      <Projects />
    </div>
  )
}