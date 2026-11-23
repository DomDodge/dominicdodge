import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link"

const siteUrl = "https://dominicdodge.com";
const description =
  "Dominic Dodge is a full-stack engineer and web developer in St. George, Utah, building React, Next.js, PHP, and C# applications. Open to full-time roles and freelance website projects.";

export const metadata: Metadata = {
  title: { absolute: "Dominic Dodge | Full-Stack Engineer & Web Developer in St. George, Utah" },
  description,
  alternates: { canonical: "/" },
};

// Structured data so search engines and AI assistants can answer "who is Dominic Dodge?" accurately
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Dominic Dodge",
      url: siteUrl,
      image: `${siteUrl}/headshot.png`,
      jobTitle: "Full-Stack Engineer",
      description,
      address: {
        "@type": "PostalAddress",
        addressLocality: "St. George",
        addressRegion: "UT",
        addressCountry: "US",
      },
      worksFor: { "@type": "Organization", name: "Plasma Studios", url: "https://plasmastudios.dev" },
      knowsAbout: [
        "Full-stack web development",
        "React",
        "Next.js",
        "JavaScript",
        "PHP",
        "SQL",
        "REST APIs",
        "C#",
        "Unity game development",
        "Python",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#service`,
      name: "Dominic Dodge Web Development",
      url: siteUrl,
      image: `${siteUrl}/headshot.png`,
      founder: { "@id": `${siteUrl}/#person` },
      areaServed: ["St. George, UT", "United States"],
      description:
        "Freelance website and web application development: custom websites, full-stack web apps, and redesigns of existing sites.",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Dominic Dodge",
      url: siteUrl,
      author: { "@id": `${siteUrl}/#person` },
    },
  ],
};

export default function Home() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Feature />
      <OpeningBlock />
      <AltWave />
      <OfferBlock />
    </div>
  );
}

function Feature() {
  return (
    <section className="featuredBlock">
      <div>
        <h1>Dominic Dodge</h1>
        <h3>Fullstack Engineer and Website Developer</h3>
        <Link href="/contact"><button>CONTACT</button></Link>
      </div>
      <div className="headshotWrap">
        <Image
          className="headshot"
          src="/headshot.png"
          alt="Headshot of Dominic Dodge, full-stack engineer"
          width="420"
          height="550"
          preload
        />
      </div>
      <Wave />
    </section>
  )
}

function Wave() {
  return (
    <div className="wave-container">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          d="M 0 0
            C 35 0, 65 100, 100 100
            V 100 H 0 Z"
          fill="#85C79A"
        />
      </svg>
    </div>
  )
}

function AltWave() {
  return (
    <div className="alt-wave-container">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          d="M 100 0
            C 65 0, 35 100, 0 100
            V 100 H 100 Z"
          fill="#4E8D9C"
        />
      </svg>
    </div>
  )
}

function OpeningBlock() {
  return (
    <section className="openingBlock" aria-labelledby="about-heading">
      <div className="aboutText">
        <h2 id="about-heading">Who Am I?</h2>
        <p>
          I&apos;m Dominic Dodge, a full-stack engineer based in St. George, Utah. I&apos;ve been
          writing code for almost a decade, from games released on Steam to web apps used
          across a university.
        </p>
        <p>
          At Utah Tech University I built responsive web applications on an Agile team using
          PHP, AngularJS, SQL, and REST APIs. As co-founder of Plasma Studios, I design, build,
          and ship products end to end, and helped grow our community to over 13,000 members.
        </p>
        <p>
          I&apos;ve also taught Python to eighth graders through AmeriCorps, so I&apos;m comfortable
          explaining technical ideas to people who don&apos;t write code.
        </p>
        <p>
          When I&apos;m not programming, I&apos;m composing music for games and films, playing drums
          in a country band, or riding the trails around St. George.
        </p>
        <div className="buttonRow">
          <Link href="/resume"><button className="wideButton">VIEW RESUME</button></Link>
          <Link href="/projects"><button className="wideButton altButton">SEE PROJECTS</button></Link>
        </div>
      </div>
      <ul className="quickFacts" aria-label="Quick facts">
        <li><span className="factNumber">~10</span><span>years writing code</span></li>
        <li><span className="factNumber">2</span><span>games released on Steam</span></li>
        <li><span className="factNumber">13k+</span><span>community members built at Plasma Studios</span></li>
        <li><span className="factNumber">Full stack</span><span>React, Next.js, PHP, SQL, C#</span></li>
      </ul>
    </section>
  )
}

function OfferBlock() {
  return (
    <section className="offerBlock" aria-labelledby="offer-heading">
      <h2 id="offer-heading">How I Can Help</h2>
      <p className="offerIntro">
        Whether you&apos;re growing an engineering team or need a website built, here&apos;s what
        working with me looks like.
      </p>
      <div className="offerCards">
        <article className="offerCard">
          <h3>Hiring for Your Team</h3>
          <p>
            I&apos;m looking for a full-time software engineering role where I can ship real
            features from day one.
          </p>
          <ul>
            <li>Front-end in React, Next.js, and AngularJS</li>
            <li>Back-end with PHP, SQL, and REST APIs</li>
            <li>Experience on Agile teams with code review</li>
            <li>Clear communicator, shaped by time teaching</li>
          </ul>
          <Link href="/resume"><button className="wideButton">VIEW RESUME</button></Link>
        </article>
        <article className="offerCard">
          <h3>Freelance Projects</h3>
          <p>
            Small business, startup, or personal project, I&apos;ll take it from first sketch
            to a live site.
          </p>
          <ul>
            <li>Custom websites that load fast and work on phones</li>
            <li>Web apps and internal tools, like Plasma Boards</li>
            <li>Redesigns and updates for existing sites</li>
            <li>Search-friendly setup so customers can find you</li>
          </ul>
          <Link href="/contact"><button className="wideButton">START A PROJECT</button></Link>
        </article>
      </div>
    </section>
  )
}
