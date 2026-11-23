"use client";

import { useState } from "react";

export default function Home() {
  return (
    <div className="contactPage">
      <Heading />
      <GreenBlock />
    </div>
  );
}

function Heading() {
  return (
    <div className="heading">
      <h1>Contact</h1>
    </div>
  );
}

function GreenBlock() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", message: "" });
    } else {
      setStatus("error");
    }
  }

  return (
    <div className="outerContact">
      <form className="contactBlock" onSubmit={handleSubmit}>
        <h2>Contact Me</h2>
        <div>
          <h3>Name: </h3>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <h3>Email: </h3>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <h3>Phone: </h3>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <h3>Message</h3>
          <textarea
            name="message"
            placeholder="Hey wussup man"
            value={form.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Send"}
        </button>
        {status === "sent" && <p>Message sent!</p>}
        {status === "error" && <p>Something went wrong. Try again.</p>}
      </form>
    </div>
  );
}