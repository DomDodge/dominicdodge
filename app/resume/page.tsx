// import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Heading />
      <GreenBlock />
    </div>

  );
}

function Heading() {
  return (
    <div className="heading">
      <h1>Resume</h1>
    </div>
  );
}

function GreenBlock() {
  return (
    <div className="openingBlock">
      <div className="resume">
        <div className="left">
          <h3>Work Experiance:</h3>
          <div className="tabbed">
           <h2>Software Engineer — Plasma Studios</h2>
           <h5>MAY 2017 - PRESENT</h5>
           <p>
            Co-founded and developed several projects ranging 
            from video games to web applications. Gained leadership skills 
            and built up the companies audience to over 13,000 members. 
            Developed and deployed commercial software.
           </p>

           <h2>Web Application Internship — Utah Tech University</h2>
           <h5>AUG 2025 - MAY 2026</h5>

           <p>
            Used the LAMP stack to create responsive web apps used by the 
            university. Apps were created on an AGILE development team which 
            required frameworks, 
            REST API’s, and team communication.
           </p>

           <h2>Computer Science Teacher — Americorps</h2>
           <h5>MAY 2025 - AUG 2025, MAY 2026 - AUG 2026</h5>

           <p>
            Taught four classes of eighth graders the fundamentals of programming in 
            Python. Helped them to debug and improve their code. 
            Deepened technical communication abilities.
           </p>
          </div>
          <h3>Interest:</h3>
          <div className="tabbed">
            <p>
              <b>Music Composition</b> I love writing soundtracks for video games 
              and short films. I play drums in a country band and have played 
              on many stages in Utah
            </p>
            
            <p>
              <b>Biking</b> when I’m not programming, I often head to the trails 
              in St. George to clear my head.
            </p>
          </div>
        </div>
        <div className="right">
          <h3>Skills:</h3>
          <div className="tabbed">
            <ul>
              <li><b>Languages: </b>C#, Python, JavaScript, HTML, CSS, PHP, SQL</li>
              <li><b>Tools: </b>AngularJS, NextJS, React, .NET MAUI</li>
              <li><b>Soft Skills: </b>AngularJS, NextJS, React, .NET MAUI</li>
            </ul>
          </div>
          <h3>Projects:</h3>
          <div className="tabbed">
           <a href="https://store.steampowered.com/app/2994950/Throw_Bro/"><h2>Throw Bro</h2></a>
           <p>
            is a full, commercially released, 
            video game I developed in C# with Unity where you can 
            throw anything.
           </p>

           <a href="https://boards.plasmastudios.dev/"><h2>Plasma Boards</h2></a>
           <p>
            is a NextJS/React todo app created as an internal tool for my startup. 
            It works similarly to Kanban or Trello in allowing users to easily collaborate on 
            project management.
           </p>

           <a href="https://dominicdodge.com/emails/"><h2>Email Template Generator</h2></a>
           <p>
            is a full stack web application I developed for my university. 
            It’s a block editor that allows users to easily create vibrant emails. 
           </p>
          </div>

          <h3>Volunteer:</h3>
          <div className="tabbed">
           <h2>Church Mission</h2>
           <h5>JUL 2021 - JUL 2023</h5>
           <p>
            Served and taught others by using good communication, 
            team work, and leadership skills.
           </p>
          </div>
        </div>
      </div>

    </div>
  )
}