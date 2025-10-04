// src/App.jsx
import React, { useEffect, useMemo, useState, useCallback } from "react";
import SeaAnimals from "./components/SeaAnimals";
import { choosePoem, EMOJI_POEMS } from "./lib/poems";

import taylorImg from "./asserts/taylor.jpg";
import ContactForm from "./ContactForm";
import ptImg from "./asserts/PT.jpg"; // kept (unused in hero now; safe to remove if you want)
import tay3 from "./asserts/tay3.jpg";
import tay4 from "./asserts/tay4.jpg";
import tay5 from "./asserts/tay5.jpg";
import tay6 from "./asserts/tay6.jpg";

// ✅ New hero images
import top5physi from "./asserts/Top5.jpg";
import PT6 from "./asserts/PT66.jpg";
import PT7 from "./asserts/PT77.jpeg";
import PT8 from "./asserts/PT88.webp";
import PT9 from "./asserts/PT99.webp";

// ---- Simple in-file router using URL hash ---------------------------------
const PAGES = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Clinical Experience" },
  { id: "research", label: "Research & Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

function useHashRoute(defaultPage = "home") {
  const [page, setPage] = useState(() => window.location.hash?.slice(1) || defaultPage);

  useEffect(() => {
    const onHash = () => setPage(window.location.hash?.slice(1) || defaultPage);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [defaultPage]);

  const navigate = (to) => {
    if (to?.startsWith("#")) window.location.hash = to;
    else window.location.hash = `#${to}`;
  };

  return { page, navigate };
}

// ---- Design tokens ---------------------------------------------------------
const theme = {
  brand: {
    bg: "bg-gradient-to-br from-teal-200 via-emerald-100 to-cyan-100",
    primary: "text-teal-700",
    accent: "text-emerald-600",
    pill: "bg-teal-600 text-white",
  },
  card: "rounded-2xl shadow-sm border border-slate-100 bg-white",
  section: "max-w-6xl mx-auto px-4 md:px-6 lg:px-8",
};

// ---- Background layer ------------------------------------------------------
function SiteBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <div className="blob blob1" />
        <div className="blob blob2" />
        <div className="blob blob3" />
      </div>
      <style>{`
        .blob { position: absolute; border-radius: 50%; filter: blur(60px); opacity: 0.5; mix-blend-mode: multiply; animation: blobMove 18s ease-in-out infinite; }
        .blob1 { width: 38vw; height: 38vw; min-width: 320px; min-height: 320px; background: linear-gradient(135deg, #5eead4 0%, #2dd4bf 100%); top: -10%; left: -10%; animation-delay: 0s; }
        .blob2 { width: 32vw; height: 32vw; min-width: 260px; min-height: 260px; background: linear-gradient(135deg, #a7f3d0 0%, #34d399 100%); top: 40%; left: 60%; animation-delay: 6s; }
        .blob3 { width: 28vw; height: 28vw; min-width: 200px; min-height: 200px; background: linear-gradient(135deg, #f0fded 0%, #99f6e4 100%); top: 60%; left: 10%; animation-delay: 12s; }
        @keyframes blobMove { 0%, 100% { transform: scale(1) translate(0px, 0px) } 33% { transform: scale(1.1) translate(30px, -20px) } 66% { transform: scale(0.95) translate(-20px, 30px) } }
      `}</style>
    </div>
  );
}

// ---- UI bits ---------------------------------------------------------------
const Badge = ({ children }) => (
  <span className={`inline-flex items-center gap-2 ${theme.brand.pill} px-3 py-1 rounded-full text-sm font-medium`}>{children}</span>
);

const Section = ({ id, title, subtitle, children, cta, onNext }) => (
  <section id={id} className={`py-14 md:py-20 ${theme.section}`}>
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight">{title}</h2>
        {subtitle && <p className="mt-2 text-slate-600 max-w-2xl">{subtitle}</p>}
      </div>
      {cta}
    </div>
    <div className="grid gap-6">{children}</div>
    {onNext && (
      <div className="mt-10 flex justify-end">
        <button onClick={onNext} className="px-5 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition">
          Next
        </button>
      </div>
    )}
  </section>
);

const Card = ({ children, className = "" }) => (
  <div className={`${theme.card} p-5 md:p-6 ${className}`}>{children}</div>
);

const Divider = () => <div className="h-px w-full bg-slate-100" />;

const TimelineItem = ({ when, where, title, bullets }) => (
  <li className="relative pl-8">
    <span className="absolute left-0 top-2 h-3 w-3 rounded-full bg-teal-600" />
    <div className="text-sm text-slate-500">{when} • {where}</div>
    <div className="font-semibold text-slate-900 mt-0.5">{title}</div>
    <ul className="list-disc ml-5 mt-2 text-slate-700 space-y-1">
      {bullets?.map((b, i) => <li key={i}>{b}</li>)}
    </ul>
  </li>
);

// ---- Curated emojis (kept for footer Easter Egg) ---------------------------
const CURATED_EMOJIS = [
  '🌹','🌸','🌼','🌻','💐',
  '🌙','✨','🌟','💫','🌌',
  '☀️','🌈','🔥','🌞','🕊️',
  '🦋','🌊','🍃','🌲','🌺',
  '❤️','🩷','💜','💕','💖',
  '🎶','🎨','📖','🕰️','🌍',
  '🪐','🧚','🪞','🕯️','🧿',
  '🏹','🪄','🗝️','🎇','🌋',
  '🪻','🪶','🦢','🐚','🪽',
  '🕊️🌿','🪷','🌒','🎐','🪁',
  '🪙','🧭','🧊','🪨','🧵',
  '🐉','🦄','🧜‍♀️','🎭','🛡️'
];

// ---- Accessibility: reduced motion ----------------------------------------
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(!!mq.matches);
    onChange();
    mq.addEventListener ? mq.addEventListener("change", onChange) : mq.addListener(onChange);
    return () => (mq.removeEventListener ? mq.removeEventListener("change", onChange) : mq.removeListener(onChange));
  }, []);
  return reduced;
}

// ---- Image Showcase (replaces static hero image) ---------------------------
function HeroImageShowcase() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const SLIDES = useMemo(() => [
    { src: top5physi, caption: "Evidence-based rehabilitation for every body." },
    { src: PT6,       caption: "Teamwork, movement, and measurable progress." },
    { src: PT7,       caption: "Strength returns one stable step at a time." },
    { src: PT8,       caption: "Athletics to everyday life—programs tailored to goals." },
    { src: PT9,       caption: "Guided healing with compassion and science." },
  ], []);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || prefersReducedMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 4200);
    return () => clearInterval(id);
  }, [paused, prefersReducedMotion, SLIDES.length]);

  const go = useCallback((n) => {
    setIndex((i) => (i + n + SLIDES.length) % SLIDES.length);
  }, [SLIDES.length]);

  const active = SLIDES[index];

  return (
    <div
      className={`${theme.card} overflow-hidden relative`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div className="relative w-full h-[340px] md:h-[420px]">
        <img
          key={active.src}
          src={active.src}
          alt={active.caption}
          className={`absolute inset-0 w-full h-full object-cover ${prefersReducedMotion ? "" : "animate-slide-fade"}`}
        />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <div className="inline-block bg-white/85 backdrop-blur px-3 py-1.5 rounded-lg text-sm md:text-base font-medium text-slate-800 border border-white/60 shadow">
            {active.caption}
          </div>
        </div>

        <button
          aria-label="Previous slide"
          onClick={() => go(-1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 grid place-items-center rounded-full bg-white/80 hover:bg-white shadow border border-white/70"
        >
          ‹
        </button>
        <button
          aria-label="Next slide"
          onClick={() => go(1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 grid place-items-center rounded-full bg-white/80 hover:bg-white shadow border border-white/70"
        >
          ›
        </button>

        <div className="absolute bottom-3 w-full flex justify-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i+1}`}
              onClick={() => setIndex(i)}
              className={`h-2.5 w-2.5 rounded-full border border-white/70 ${i===index ? "bg-white" : "bg-white/40"}`}
            />
          ))}
        </div>

        <div className="absolute top-2 right-2 text-[10px] md:text-xs text-slate-600 bg-white/80 rounded-md px-2 py-0.5 border border-white/70">
          {paused ? "paused" : "hover/tap to pause"}
        </div>
      </div>

      <style>{`
        @keyframes slideFade {
          0% { opacity: 0; transform: scale(1.02) }
          15% { opacity: 1; transform: scale(1.0) }
          85% { opacity: 1; transform: scale(1.0) }
          100% { opacity: 0; transform: scale(0.995) }
        }
        .animate-slide-fade { animation: slideFade 4s ease-in-out; }
        @media (prefers-reduced-motion: reduce) {
          .animate-slide-fade { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

// ---- Modern brand mark (pulse + glass capsule) ----------------------------
function BrandMark({ onClick }) {
  const reduced = usePrefersReducedMotion();

  return (
    <button
      onClick={(e) => { e.preventDefault(); onClick?.("home"); }}
      className="group relative flex items-center gap-3 px-2 py-1.5 rounded-xl hover:bg-white/70 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
      aria-label="Go to Home"
    >
      {/* Gradient ring + inner tile */}
      <div className="relative shrink-0">
        <div className="h-10 w-10 rounded-2xl p-[2px] bg-gradient-to-tr from-teal-500 to-emerald-500 shadow-sm">
          <div className="h-full w-full rounded-[14px] bg-white grid place-items-center">
            {/* Minimal physio icon: spine curve + heartbeat tick */}
            <svg
              viewBox="0 0 40 40"
              className="h-6 w-6 text-teal-600"
              aria-hidden
            >
              <defs>
                <linearGradient id="pulseGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#14b8a6" />
                </linearGradient>
              </defs>
              {/* Spine-like curve */}
              <path
                d="M8,28 C14,10 26,10 32,18"
                fill="none"
                stroke="url(#pulseGrad)"
                strokeWidth="2.2"
                strokeLinecap="round"
                className={reduced ? "" : "brand-draw"}
              />
              {/* Small heartbeat tick */}
              <path
                d="M16,24 l3,-3 l2,5 l2,-3 l3,2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={reduced ? "" : "brand-draw-delayed"}
              />
            </svg>
          </div>
        </div>

        {/* Soft pulse glow */}
        {!reduced && (
          <span
            className="pointer-events-none absolute -inset-1 rounded-2xl bg-emerald-400/30 blur-md animate-pulse"
            aria-hidden
          />
        )}
      </div>

      {/* Text stack with subtle animated gradient on name */}
      <div className="text-left">
        <div
          className={`font-semibold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 ${
            reduced ? "" : "brand-shine"
          }`}
        >
          Taylor Phillips — DPT Candidate
        </div>
        <div className="text-xs text-slate-500">
          Physiotherapy • Movement • Rehab
        </div>
      </div>

      {/* Local styles for tiny animations */}
      <style>{`
        @keyframes draw {
          0% { stroke-dasharray: 1 100; stroke-dashoffset: 0; opacity: .7 }
          60% { stroke-dasharray: 80 100; }
          100% { stroke-dasharray: 100 0; stroke-dashoffset: 0; opacity: 1 }
        }
        .brand-draw {
          stroke-dasharray: 100 0;
          animation: draw 1.4s ease forwards;
        }
        .brand-draw-delayed {
          stroke-dasharray: 100 0;
          animation: draw 1.2s .25s ease forwards;
        }
        @keyframes shine {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .brand-shine {
          background-size: 200% 100%;
          animation: shine 6s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .brand-draw, .brand-draw-delayed, .brand-shine { animation: none !important; }
        }
      `}</style>
    </button>
  );
}

// ---- Updated Navbar --------------------------------------------------------
function Navbar({ current, onNav }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b border-slate-100">
      <div className={`${theme.section} flex flex-col gap-2 md:flex-row items-center justify-between py-3 px-2`}>
        {/* New brand cluster */}
        <BrandMark onClick={onNav} />

        {/* Nav links */}
        <nav className="flex flex-wrap justify-center md:flex-nowrap md:flex items-center gap-1 w-full md:w-auto mt-2 md:mt-0">
          {PAGES.map(p => (
            <a
              key={p.id}
              href={`#${p.id}`}
              onClick={(e)=>{e.preventDefault(); onNav(p.id);}}
              className={`px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-100 ${current===p.id?"text-slate-900 bg-slate-100":"text-slate-600"}`}
            >
              {p.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          onClick={(e)=>{e.preventDefault(); onNav("contact");}}
          className="mt-2 md:mt-0 px-3 py-2 rounded-lg text-sm font-medium bg-slate-900 text-white hover:bg-slate-800 w-full md:w-auto text-center"
        >
          Get in touch
        </a>
      </div>
    </header>
  );
}

function Hero({ onPrimary }) {
  return (
    <div className={`${theme.section} pt-10 md:pt-24 pb-8 md:pb-12`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
        <div>
          <Badge>Doctor of Physical Therapy</Badge>
          <h1 className="mt-4 text-2xl sm:text-3xl md:text-5xl font-semibold tracking-tight text-slate-900">Helping people move better, heal faster, and live fully.</h1>
          <p className="mt-4 text-slate-600 max-w-xl text-base md:text-lg">Hi! I’m <span className="font-semibold">Taylor Phillips</span> from Ponca City, Oklahoma a DPT candidate at Langston University focused on evidence-based rehabilitation, human movement, and compassionate, patient-centered care.</p>
          <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3">
            <button onClick={onPrimary} className="px-5 py-2.5 rounded-xl bg-teal-600 text-white hover:bg-teal-700">Explore my work</button>
            <a href="#contact" className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50">Contact</a>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm text-slate-500">
            <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500"/> Patient-first</span>
            <span>Evidence-based</span>
            <span>Interdisciplinary</span>
          </div>
        </div>

        {/* NEW: rotating image showcase */}
        <HeroImageShowcase />
      </div>
    </div>
  );
}

function AboutPage({ onNext }) {
  return (
    <Section
      id="about"
      title="About Me"
      subtitle="DPT candidate with a passion for restoring function and improving quality of life."
      onNext={onNext}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
        <div className="flex flex-col items-center md:items-start">
          <img
            src={taylorImg}
            alt="Taylor Phillips portrait"
            className="rounded-2xl shadow-xl w-40 h-52 sm:w-56 sm:h-72 md:w-64 md:h-80 object-cover mb-4 border-4 border-white"
            style={{ background: '#e0f2fe' }}
          />
          <span className="text-slate-700 text-center md:text-left text-base sm:text-lg font-semibold mt-2">Taylor Phillips</span>
        </div>
        <div className="md:col-span-2 flex flex-col gap-6">
          <Card>
            <h3 className="text-lg font-semibold text-slate-900">Bio</h3>
            <p className="mt-2 text-slate-700 leading-relaxed">
              Taylor Phillips is a dedicated and compassionate Doctor of Physical Therapy (DPT) candidate at <strong>Langston University</strong> (2024–present; expected 2027). Taylor believes that movement is medicine and is passionate about helping people restore function and improve their quality of life. Her journey in physical therapy began with a strong academic foundation and hands-on experience, including finishing her junior year at <strong>Oklahoma State University (OSU)</strong> and starting her career as a Physical Therapy Tech at <strong>Northern Therapy and Rehabilitation</strong>.<br /><br />
              Taylor’s interests include orthopedics, sports rehab, and neuro-rehabilitation. She values collaboration with patients and providers to craft personalized, evidence-based plans that meet people where they are. Taylor is known for her positive attitude, strong work ethic, and commitment to lifelong learning in the field of physical therapy.
            </p>
          </Card>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <Card>
              <h4 className="font-medium">Education</h4>
              <ul className="mt-2 text-slate-700 text-sm space-y-1">
                <li><strong>Doctor of Physical Therapy (DPT)</strong>, Langston University (2024–present; expected 2027)</li>
                <li><strong>Oklahoma State University</strong> — Class of 2024 (completed junior year)</li>
                <li><strong>Northern Oklahoma College</strong> — Class of 2022</li>
              </ul>
            </Card>
            <Card>
              <h4 className="font-medium">Focus Areas</h4>
              <ul className="mt-2 text-slate-700 text-sm space-y-1 list-disc ml-5">
                <li>Musculoskeletal & Sports Rehab</li>
                <li>Neurological Rehabilitation</li>
                <li>Manual Therapy & Exercise Prescription</li>
              </ul>
            </Card>
          </div>
          <Card>
            <h3 className="text-lg font-semibold text-slate-900">Quick Facts</h3>
            <ul className="mt-3 space-y-2 text-slate-700 text-sm">
              <li>Birthday: March 17</li>
              <li>Hometown: Ponca City, Oklahoma</li>
              <li>CPR/AED Certified</li>
              <li>HIPAA-aware documentation</li>
              <li>EMR familiar: Epic, WebPT</li>
              <li>Volunteer: Community mobility workshops</li>
              <li>Started as Physical Therapy Tech at Northern Therapy and Rehabilitation</li>
            </ul>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-slate-900">Family</h3>
            <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
              <img
                src={tay4}
                alt="Taylor with family"
                className="rounded-xl shadow-md w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 object-cover border-2 border-white"
                style={{ background: '#e0f2fe' }}
              />
              <p className="mt-2 text-slate-700 leading-relaxed text-center md:text-left">
                Taylor comes from a supportive family that has always encouraged her academic and athletic pursuits. Their encouragement has played a key role in her journey to becoming a physical therapist.
              </p>
            </div>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-slate-900">Interests & Achievements</h3>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                <img
                  src={tay3}
                  alt="Taylor playing football"
                  className="rounded-xl shadow-md w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 object-cover border-2 border-white"
                  style={{ background: '#e0f2fe' }}
                />
                <img
                  src={tay5}
                  alt="Taylor's soccer team"
                  className="rounded-xl shadow-md w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 object-cover border-2 border-white"
                  style={{ background: '#e0f2fe' }}
                />
                <img
                  src={tay6}
                  alt="Taylor's achievement"
                  className="rounded-xl shadow-md w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 object-cover border-2 border-white"
                  style={{ background: '#e0f2fe' }}
                />
              </div>
              <ul className="mt-3 space-y-2 text-slate-700 text-sm list-disc ml-5">
                <li>Enjoys playing football (soccer) and swimming in her free time</li>
                <li>Her team won the Indoor Soccer League at OSU</li>
                <li>Active participant in recreational sports and wellness activities</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}

function ExperiencePage({ onNext }) {
  return (
    <Section
      id="experience"
      title={
        <span className="flex items-center gap-3">
          Clinical Experience
          <a
            href="/resume/taylorResume.pdf"
            download
            className="ml-2 group relative inline-flex items-center justify-center p-2 rounded-full bg-gradient-to-tr from-teal-400 to-emerald-400 shadow-lg hover:scale-110 transition-transform duration-200"
            title="Download Resume"
            style={{ outline: 'none' }}
          >
            <svg className="w-8 h-8 text-white animate-bounce" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4" />
              <ellipse cx="12" cy="19" rx="7" ry="2.5" fill="currentColor" opacity=".15" className="animate-pulse" />
            </svg>
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200">Download Resume</span>
          </a>
        </span>
      }
      subtitle="Internships, rotations, and hands-on patient care."
      onNext={onNext}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <Card className="md:col-span-2">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Rotations & Internships</h3>
          <div className="relative pl-8 before:content-[''] before:absolute before:top-0 before:left-4 before:w-1 before:h-full before:bg-gradient-to-b before:from-teal-300 before:to-emerald-200 before:rounded-full">
            <div className="relative mb-12">
              <div className="absolute -left-2 top-0 w-8 h-8 flex items-center justify-center bg-white border-4 border-emerald-200 rounded-full shadow-lg">
                <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h2a4 4 0 014 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              </div>
              <div className="ml-12">
                <div className="text-sm text-teal-700 font-semibold">Jan 2025 – Present</div>
                <div className="text-base font-bold text-slate-900">Stillwater Sports & Rehab</div>
                <div className="text-sm text-slate-600 mb-2">Clinical Intern — Orthopedics & Sports</div>
                <ul className="list-disc ml-5 text-slate-700 text-sm space-y-1">
                  <li>Performed initial assessments under supervision and contributed to individualized treatment plans.</li>
                  <li>Led therapeutic exercise sessions emphasizing return-to-sport milestones.</li>
                  <li>Tracked outcomes: ROM, strength, and functional movement screens.</li>
                </ul>
              </div>
            </div>
            <div className="relative mb-12">
              <div className="absolute -left-2 top-0 w-8 h-8 flex items-center justify-center bg-white border-4 border-teal-200 rounded-full shadow-lg">
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h5l2-2h5a2 2 0 012 2v12a2 2 0 01-2 2z" /></svg>
              </div>
              <div className="ml-12">
                <div className="text-sm text-emerald-700 font-semibold">Aug 2024 – Dec 2024</div>
                <div className="text-base font-bold text-slate-900">Langston University Health Sciences Clinic</div>
                <div className="text-sm text-slate-600 mb-2">Student Therapist — Neuro Rehab</div>
                <ul className="list-disc ml-5 text-slate-700 text-sm space-y-1">
                  <li>Supported gait training and balance interventions for stroke recovery.</li>
                  <li>Applied task-oriented strategies and cueing to improve ADLs.</li>
                  <li>Collaborated with OTs and SLPs in an interdisciplinary team.</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Skills in Practice</h3>
          <div className="space-y-4">
            <SkillBar label="Manual Therapy & Joint Mobilizations" percent={90} color="from-teal-400 to-emerald-400" />
            <SkillBar label="Exercise Progression & Program Design" percent={85} color="from-emerald-400 to-teal-400" />
            <SkillBar label="Pain Education & Patient Coaching" percent={80} color="from-teal-300 to-emerald-300" />
            <SkillBar label="Outcome Measures & Documentation" percent={88} color="from-emerald-300 to-teal-300" />
          </div>
        </Card>
      </div>
    </Section>
  );
}

function ResearchPage({ onNext }) {
  return (
    <Section
      id="research"
      title="Research & Projects"
      subtitle="Evidence-based practice, case studies, and academic work."
      onNext={onNext}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Recent Publications</h3>
          <ul className="divide-y divide-slate-200">
            <li className="py-2">
              <div className="font-medium text-slate-800">The Impact of Early Mobilization on Post-Operative Recovery in Orthopedic Patients</div>
              <div className="text-xs text-slate-500">Taylor Smith, J. Doe, A. Lee — <span className="italic">Journal of Physical Therapy Science</span>, 2025</div>
            </li>
            <li className="py-2">
              <div className="font-medium text-slate-800">Aquatic Therapy for Stroke Rehabilitation: A Systematic Review</div>
              <div className="text-xs text-slate-500">Taylor Smith, M. Patel — <span className="italic">Rehabilitation Research & Practice</span>, 2024</div>
            </li>
            <li className="py-2">
              <div className="font-medium text-slate-800">Balance Training Protocols for Older Adults: A Randomized Controlled Trial</div>
              <div className="text-xs text-slate-500">Taylor Smith, S. Kim — <span className="italic">Geriatric PT Journal</span>, 2023</div>
            </li>
          </ul>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Projects & Posters</h3>
          <ul className="list-disc ml-5 text-slate-700 text-sm space-y-2">
            <li>Capstone: Optimizing Gait Retraining in Post-ACL Reconstruction Patients</li>
            <li>Poster: The Role of Aquatic Therapy in Early Stroke Rehab</li>
            <li>Community Project: “Move Better” Workshops for Local Schools</li>
          </ul>
        </Card>
      </div>
    </Section>
  );
}

function SkillBar({ label, percent, color }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm text-slate-700 font-medium">{label}</span>
        <span className="text-xs text-slate-500 font-semibold">{percent}%</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-3">
        <div
          className={`h-3 rounded-full bg-gradient-to-r ${color} transition-all duration-700`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function AchievementsPage({ onNext }) {
  return (
    <Section id="achievements" title="Achievements" subtitle="Milestones, honors, leadership, and community impact." onNext={onNext}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <Card className="md:col-span-2">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Key Achievements</h3>
          <div className="w-full flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <svg viewBox="0 0 320 160" width="100%" height="120" className="mb-2">
                <rect x="0" y="0" width="320" height="160" fill="#f0fdfa" rx="16" />
                <rect x="30" y="60" width="32" height="80" fill="#2dd4bf" rx="6" />
                <rect x="90" y="30" width="32" height="110" fill="#34d399" rx="6" />
                <rect x="150" y="90" width="32" height="50" fill="#5eead4" rx="6" />
                <rect x="210" y="40" width="32" height="100" fill="#99f6e4" rx="6" />
                <text x="46" y="155" fontSize="13" fill="#0f172a" textAnchor="middle">DPT</text>
                <text x="106" y="155" fontSize="13" fill="#0f172a" textAnchor="middle">NOC</text>
                <text x="166" y="155" fontSize="13" fill="#0f172a" textAnchor="middle">OSU</text>
                <text x="226" y="155" fontSize="13" fill="#0f172a" textAnchor="middle">Workshops</text>
              </svg>
              <div className="flex justify-between text-xs text-slate-500 px-2">
                <span>Accepted DPT</span>
                <span>NOC Grad</span>
                <span>OSU Jr Year</span>
                <span>Workshops</span>
              </div>
            </div>
            <ul className="flex-1 mt-4 md:mt-0 text-slate-700 text-sm space-y-2">
              <li>Accepted to the <strong>Langston University DPT program</strong> (2024 cohort)</li>
              <li>Graduated <strong>Northern Oklahoma College</strong>, Class of 2022</li>
              <li><strong>Oklahoma State University</strong> — Class of 2024</li>
              <li>Organized free “Move Better” community workshops</li>
            </ul>
          </div>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Interests Breakdown</h3>
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 120 120" width="100" height="100">
              <circle r="48" cx="60" cy="60" fill="#f0fdfa" />
              <path d="M60 60 L60 12 A48 48 0 0 1 110 60 Z" fill="#2dd4bf" />
              <path d="M60 60 L110 60 A48 48 0 0 1 60 108 Z" fill="#34d399" />
              <path d="M60 60 L60 108 A48 48 0 0 1 12 60 Z" fill="#5eead4" />
              <path d="M60 60 L12 60 A48 48 0 0 1 60 12 Z" fill="#99f6e4" />
            </svg>
            <div className="mt-3 text-xs text-slate-600">
              <div><span className="inline-block w-3 h-3 rounded-full mr-2 align-middle" style={{background:'#2dd4bf'}}></span>Orthopedics & Sports</div>
              <div><span className="inline-block w-3 h-3 rounded-full mr-2 align-middle" style={{background:'#34d399'}}></span>Neuro Rehab</div>
              <div><span className="inline-block w-3 h-3 rounded-full mr-2 align-middle" style={{background:'#5eead4'}}></span>Women’s Health</div>
              <div><span className="inline-block w-3 h-3 rounded-full mr-2 align-middle" style={{background:'#99f6e4'}}></span>Community Health</div>
            </div>
          </div>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold text-slate-900">Leadership & Service</h3>
          <ul className="mt-3 list-disc ml-5 text-slate-700 text-sm space-y-2">
            <li>Student Member — APTA (American Physical Therapy Association)</li>
            <li>Volunteer — Local 5K events: warm-up stations & injury prevention booths</li>
            <li>Clinic Hours — Assisted therapists with patient intake and home-exercise education</li>
          </ul>
        </Card>
      </div>
    </Section>
  );
}

function ContactPage() {
  return (
    <Section
      id="contact"
      title="Get in Touch"
      subtitle="Have a question, collaboration, or placement opportunity? Let’s talk."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <Card className="md:col-span-2">
          <ContactForm />
        </Card>
        <Card>
          <h3 className="text-lg font-semibold text-slate-900">Connect</h3>
          <ul className="mt-3 text-slate-700 text-sm space-y-2">
            <li className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 32 32" fill="none" className="inline-block"><rect width="32" height="32" rx="6" fill="#2563eb"/><path d="M10.5 13.5V22.5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><circle cx="10.5" cy="10.5" r="1.5" fill="#fff"/><path d="M15.5 16.5V22.5M15.5 18.5C15.5 17.1193 16.6193 16 18 16C19.3807 16 20.5 17.1193 20.5 18.5V22.5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
              <span>LinkedIn:</span> <a className="underline" href="https://linkedin.com/in/taylor-phillips" target="_blank" rel="noopener noreferrer">linkedin.com/in/taylor-phillips <span className="text-xs">(sample)</span></a>
            </li>
            <li className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 32 32" fill="none" className="inline-block"><rect width="32" height="32" rx="8" fill="#e1306c"/><circle cx="16" cy="16" r="7" stroke="#fff" strokeWidth="2"/><circle cx="23" cy="9" r="1.5" fill="#fff"/></svg>
              <span>Instagram:</span> <a className="underline" href="https://www.instagram.com/tailer_flips/" target="_blank" rel="noopener noreferrer">@tailer_flips</a>
            </li>
            <li className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 32 32" fill="none" className="inline-block"><rect width="32" height="32" rx="8" fill="#0ea5e9"/><path d="M16 10V22M16 22L11 17M16 22L21 17" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span>Resume:</span> <a className="underline" href="/resume/taylorResume.pdf" target="_blank" rel="noopener noreferrer">Download PDF</a>
            </li>
            <li className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 32 32" fill="none" className="inline-block"><rect width="32" height="32" rx="8" fill="#22c55e"/><path d="M16 25C20 19 24 15.4183 24 12C24 8.68629 21.3137 6 18 6C14.6863 6 12 8.68629 12 12C12 15.4183 16 19 16 25Z" stroke="#fff" strokeWidth="2"/><circle cx="18" cy="12" r="2" fill="#fff"/></svg>
              <span>Location:</span> Ponca City, OK
            </li>
          </ul>
        </Card>
      </div>
    </Section>
  );
}

// ---- Emoji/Poem popup (kept for footer Easter Egg) ------------------------
function EmojiPoemPopup({ visible, emojiChar, poem }) {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="text-center pointer-events-none select-none">
        {emojiChar && (
          <div className="mb-4 animate-pop" style={{ fontSize: 96, lineHeight: 1 }} aria-hidden>
            {Array.isArray(emojiChar) ? emojiChar[0] : emojiChar}
          </div>
        )}
        {poem && (
          <div className="animate-fade-in text-slate-900 text-lg md:text-2xl font-semibold px-6 py-4 rounded-2xl shadow-2xl relative bg-white/90">
            <div className="twinkle absolute -inset-1 rounded-2xl pointer-events-none" aria-hidden />
            <div className="relative z-10">{poem}</div>
          </div>
        )}
      </div>
      <style>{`
        .animate-pop { animation: popIn 0.45s cubic-bezier(.22,.9,.36,1) both; }
        .animate-fade-in { animation: fadeIn 0.4s ease both; }
        @keyframes popIn { 0% { transform: scale(0.2); opacity: 0 } 100% { transform: scale(1); opacity: 1 } }
        @keyframes fadeIn { 0% { opacity: 0; transform: translateY(6px) } 100% { opacity: 1; transform: translateY(0) } }
        .twinkle {
          background: radial-gradient(circle at 10% 20%, rgba(255,232,150,0.9) 0%, rgba(255,232,150,0.0) 6%),
                      radial-gradient(circle at 80% 80%, rgba(255,200,200,0.85) 0%, rgba(255,200,200,0.0) 6%),
                      linear-gradient(90deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
          box-shadow: 0 6px 30px rgba(0,0,0,0.12) inset;
          animation: twinkle 1.2s linear infinite;
          mix-blend-mode: screen;
        }
        @keyframes twinkle {
          0% { opacity: 0.85; filter: blur(0px) }
          50% { opacity: 1; filter: blur(1px) }
          100% { opacity: 0.85; filter: blur(0px) }
        }
      `}</style>
    </div>
  );
}

function Footer() {
  const [showEmoji, setShowEmoji] = useState(false);
  const [showPoem, setShowPoem] = useState(false);
  const [currentEmojiSeq, setCurrentEmojiSeq] = useState(['😊']);
  const [currentPoem, setCurrentPoem] = useState('');
  const timersRef = React.useRef([]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach(t => clearTimeout(t));
      timersRef.current = [];
    };
  }, []);

  function handleEggClick() {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
    setShowPoem(false);

    const chosen = CURATED_EMOJIS[Math.floor(Math.random() * CURATED_EMOJIS.length)];
    setCurrentEmojiSeq([chosen]);
    setShowEmoji(true);

    const tShowPoem = setTimeout(() => {
      setShowEmoji(false);
      const poem =
        EMOJI_POEMS[chosen] ||
        (typeof choosePoem === 'function' ? choosePoem('default') : 'You are the line my soul keeps reading.');
      setCurrentPoem(poem);
      setShowPoem(true);
      const tHide = setTimeout(() => setShowPoem(false), 5000);
      timersRef.current.push(tHide);
    }, 5000);

    timersRef.current.push(tShowPoem);
  }

  return (
    <footer className="mt-10 md:mt-16 border-t border-slate-100 relative">
      <EmojiPoemPopup visible={showEmoji || showPoem} emojiChar={showEmoji ? currentEmojiSeq : null} poem={showPoem ? currentPoem : null} />
      <div className={`${theme.section} py-6 md:py-10 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 px-2`}>
        <div className="text-slate-500 text-sm">© {new Date().getFullYear()} Taylor Phillips • DPT Candidate</div>
        <div className="text-slate-500 text-sm flex items-center gap-2">
          Built with ❤️ by Baba
          <button
            type="button"
            aria-label="Easter Egg"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleEggClick(); }}
            style={{ opacity: 0.6, marginLeft: 8, background: 'none', border: 'none', cursor: 'pointer', transition: 'opacity 0.2s', padding: 0 }}
            onMouseOver={e => (e.currentTarget.style.opacity = 1)}
            onMouseOut={e => (e.currentTarget.style.opacity = 0.6)}
          >
            <span className="inline-block align-middle">
              <svg width="18" height="18" viewBox="0 0 18 24" fill="none">
                <ellipse cx="9" cy="14" rx="7" ry="10" fill="#22c55e" stroke="#16a34a" strokeWidth="1.5"/>
                <ellipse cx="9" cy="14" rx="4" ry="6" fill="#bbf7d0" opacity="0.7"/>
                <ellipse cx="9" cy="18" rx="1.5" ry="1" fill="#16a34a" opacity="0.4"/>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}

// ---- App ------------------------------------------------------------------
export default function App() {
  const { page, navigate: navigateHash } = useHashRoute("home");
  const [transitionActive, setTransitionActive] = useState(false);
  const [nextTarget, setNextTarget] = useState(null);

  const navigate = useCallback((to) => {
    if (!to) return;
    const target = to.startsWith('#') ? to.slice(1) : to;
    if (target === (window.location.hash?.slice(1) || 'home')) return;
    setNextTarget(target);
    setTransitionActive(true);
  }, []);

  function handleTransitionFinish() {
    setTransitionActive(false);
    if (nextTarget) {
      navigateHash(nextTarget);
      setNextTarget(null);
    }
  }

  useEffect(() => {
    console.assert(Array.isArray(PAGES), "PAGES should be an array");
    const ids = new Set();
    for (const p of PAGES) {
      console.assert(typeof p.id === "string" && typeof p.label === "string", "Each page needs id and label strings");
      console.assert(!ids.has(p.id), `Duplicate page id: ${p.id}`);
      ids.add(p.id);
    }
  }, []);

  function renderPage() {
    switch (page) {
      case "home":
        return <Hero onPrimary={() => navigate("about")} />;
      case "about":
        return <AboutPage onNext={() => navigate("experience")} />;
      case "experience":
        return <ExperiencePage onNext={() => navigate("research")} />;
      case "research":
        return <ResearchPage onNext={() => navigate("achievements")} />;
      case "achievements":
        return <AchievementsPage onNext={() => navigate("contact")} />;
      case "contact":
        return <ContactPage />;
      default:
        return <Hero onPrimary={() => navigate("about")} />;
    }
  }

  return (
    <div className={theme.brand.bg}>
      <SiteBackground />
      <Navbar current={page} onNav={navigate} />
      <SeaAnimals
        active={transitionActive}
        count={3 + Math.floor(Math.random() * 4)}
        duration={1600 + Math.floor(Math.random() * 1400)}
        onFinish={handleTransitionFinish}
      />
      <main>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}
