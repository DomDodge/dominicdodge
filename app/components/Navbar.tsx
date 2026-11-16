'use client'
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav>
            <Link href="/" onClick={() => setOpen(false)}><h2>DominicDodge</h2></Link>
            {/* Hamburger toggle, only visible on mobile */}
            <button
                type="button"
                className={`nav-toggle ${open ? 'open' : ''}`}
                aria-label="Toggle menu"
                aria-expanded={open}
                onClick={() => setOpen(!open)}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
            <div className={`linkContainer ${open ? 'open' : ''}`} onClick={() => setOpen(false)}>
                <Link href="/">Home</Link>
                <Link href="/word">Word Game</Link>
                <Link href="/resume">Resume</Link>
                <Link href="/projects">Projects</Link>
                <Link href="/contact">Contact</Link>
            </div>
        </nav>
    );
}
