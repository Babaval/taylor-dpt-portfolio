import React, { useRef } from "react";

export default function ContactForm() {
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  function handleSend(e) {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const message = messageRef.current.value;
    const mailto = `mailto:taylor.phillips11@okstate.edu?subject=Message from ${encodeURIComponent(name || "Portfolio Visitor")}&body=${encodeURIComponent(message)}%0A%0AFrom: ${encodeURIComponent(email)}`;
    window.location.href = mailto;
  }

  return (
    <form className="grid gap-4" onSubmit={handleSend}>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-slate-600 mb-1">Your Name</label>
          <input ref={nameRef} className="w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="Name"/>
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">Email</label>
          <input ref={emailRef} type="email" className="w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="you@example.com"/>
        </div>
      </div>
      <div>
        <label className="block text-sm text-slate-600 mb-1">Message</label>
        <textarea ref={messageRef} rows={5} className="w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="Write your message..."/>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-500">Or email: <a className="underline" href="mailto:taylor.phillips11@okstate.edu">taylor.phillips11@okstate.edu</a></div>
        <button type="submit" className="px-5 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800">Send</button>
      </div>
    </form>
  );
}
