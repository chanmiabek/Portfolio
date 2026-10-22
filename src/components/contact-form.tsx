 "use client";

import { useState } from "react";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [notice, setNotice] = useState("");
  async function submit(formData: FormData) {
    setState("sending"); setNotice("");
    const payload = Object.fromEntries(formData.entries());
    try {
      const response = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to send message.");
      setState("success"); setNotice("Thanks — your message has been sent."); (document.getElementById("contact-form") as HTMLFormElement)?.reset();
    } catch (error) {
      setState("error"); setNotice(error instanceof Error ? error.message : "Something went wrong.");
    }
  }
  return <form id="contact-form" action={submit} className="grid gap-5">
    <div className="grid gap-5 sm:grid-cols-2">
      <div className="form-field">
        
        <label htmlFor="name">Your name</label>
        <input id="name" name="name" required minLength={2} maxLength={100} placeholder="Jane Doe" />
        </div>
      <div className="form-field">
        <label htmlFor="email">Email address</label>
        <input id="email" name="email" type="email" required maxLength={254} placeholder="jane@example.com" />
        </div>
    </div>
    <div className="form-field">
      <label htmlFor="subject">Subject</label>
      <input id="subject" name="subject" required minLength={2} maxLength={150} placeholder="Project enquiry" />
      </div>
    <div className="form-field">
      <label htmlFor="message">Message</label>
      <textarea id="message" name="message" rows={5} required minLength={10} maxLength={5000} placeholder="Tell me a little about what you’re working on..." />
      </div>
    <div aria-hidden="true" className="hidden">
      <label htmlFor="website">Website</label>
      <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
    <div className="flex flex-wrap items-center gap-4">
      <button className="btn-primary disabled:opacity-60" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send message ↗"}</button>{notice && <p role="status" className={`text-sm ${state === "error" ? "text-red-700" : "text-green-700"}`}>{notice}</p>}
    </div>
  </form>;
}
