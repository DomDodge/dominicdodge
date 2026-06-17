import Image from "next/image";
import Link from "next/link"

export default function Home() {
  return (
    <div>
      <Feature />
      <OpeningBlock />
      <AltWave />
      <OfferBlock />
    </div>
  );
}

function Feature() {
  return (
    <div className="featuredBlock">
      <div>
        <h1>Dominic Dodge</h1>
        <h3>Fullstack Engineer and Website Developer</h3>
        <Link href="/contact"><button>CONTACT</button></Link>
      </div>
      <div>
        <Image 
          className="headshot"
          src="/headshot.png"
          alt="Dominic Dodge" 
          width="420"
          height="550"
        />
      </div>
      <Wave />
    </div>
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
    <div className="openingBlock">
      <div>
        <h2>Who Am I?</h2>
        <p>
          I am Dominic. I love coding, music, and design. I have been working in the industry for almost a decade now.
          So whatever your project is, whehter big or small, personSo whatever your project is, whehter big or small,
          personal or for a large company, I am ready to help. Book an apointment and lets see how I can help you.
        </p>
      </div>

    </div>
  )
}

function OfferBlock() {
  return (
    <div className="offerBlock">
      <div>
        <h2>Who Am I?</h2>
        <p>
          I am Dominic. I love coding, music, and design. I have been working in the industry for almost a decade now.
          So whatever your project is, whehter big or small, personSo whatever your project is, whehter big or small,
          personal or for a large company, I am ready to help. Book an apointment and lets see how I can help you.
        </p>
      </div>
      <div>p</div>

    </div>
  )
}
