'use client'
import React, { useState } from 'react'
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
  const projects = (projectsData as unknown as { projects: Project[] }).projects
  const [selected, setSelected] = useState<Project | null>(null)

  function openProject(p: Project) {
    setSelected(p)
  }
  function closeProject() {
    setSelected(null)
  }

  return (
    <div>
      <Heading />
      <DarkGreenBlock projects={projects} onOpen={openProject} />

      {selected && (
        <div className="faded-background " onClick={closeProject}>
          <div className="modal-overlay">
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h3>{selected.title}</h3>
              <div className="modal-content">
                <div className="modal-left">
                  <Image src={`/images/${selected.image}`} className="projectImage" alt={selected.title} width={360} height={270} />
                </div>
                <div className="modal-right">
                  <p>{selected.text}</p>
                  {selected.link && (
                    <a className="modal-link" href={selected.link} target="_blank" rel="noopener noreferrer">Visit project</a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Projects({ projects, onOpen }: { projects: Project[]; onOpen: (p: Project) => void }) {
    return (
      <div className="projects">
        {projects.map((p) => (
          <div className="project" key={p.title} onClick={() => onOpen(p)} style={{cursor: 'pointer'}}>
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

function DarkGreenBlock({ projects, onOpen }: { projects: Project[]; onOpen: (p: Project) => void }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [language, setLanguage] = useState('all')

  const filteredProjects = projects.filter((p) => {
    // search query (checks title, text, and tags)
    const q = search.trim().toLowerCase()
    if (q) {
      const hay = (p.title + ' ' + p.text + ' ' + p.tags.join(' ')).toLowerCase()
      if (!hay.includes(q)) return false
    }

    if (category !== 'all') {
      const tags = p.tags.map(t => t.toLowerCase())
      if (!tags.includes(category.toLowerCase())) return false
    }

    if (language !== 'all') {
      const tags = p.tags.map(t => t.toLowerCase())
      if (!tags.includes(language.toLowerCase())) return false
    }

    return true
  })

  const hasFilters = search.trim() !== '' || category !== 'all' || language !== 'all'

  function clearFilters() {
    setSearch('')
    setCategory('all')
    setLanguage('all')
  }

  return (
    <div className="projectBlock">
      <div className="controls">
        <div className="control control-search">
          <label htmlFor="project-search">Search</label>
          <input
            id="project-search"
            type="text"
            className="search"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="control">
          <label htmlFor="project-category">Category</label>
          <select id="project-category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">All</option>
            <option value="games">Games</option>
            <option value="website">Website</option>
            <option value="software">Software</option>
          </select>
        </div>
        <div className="control">
          <label htmlFor="project-language">Language</label>
          <select id="project-language" value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="all">All</option>
            <option value="c#">C#</option>
            <option value="js">JavaScript</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="php">PHP</option>
            <option value="react">React</option>
            <option value="angularjs">AngularJS</option>
          </select>
        </div>
        <div className="control-summary">
          <span className="result-count">
            {filteredProjects.length} of {projects.length} projects
          </span>
          {hasFilters && (
            <button type="button" className="clear-filters" onClick={clearFilters}>Clear</button>
          )}
        </div>
      </div>

      {filteredProjects.length > 0 ? (
        <Projects projects={filteredProjects} onOpen={onOpen} />
      ) : (
        <div className="no-results">
          <h3>No projects found</h3>
          <p>None of my projects match the filters you&apos;ve set. Try a different search or clear your filters.</p>
          <button type="button" onClick={clearFilters}>Clear filters</button>
        </div>
      )}
    </div>
  )
}
