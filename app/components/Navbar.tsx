import Link from 'next/link';

export default function Navbar() {
    return (
        <nav>
            <Link href="/"><h2>DominicDodge</h2></Link>
            <div className="linkContainer">
                <Link href="/">Home</Link>
                <Link href="/word">Word Game</Link>
                <Link href="/resume">Resume</Link>
                <Link href="/projects">Projects</Link>
                <Link href="/contact">Contact</Link>
            </div>
        </nav>
    );
}