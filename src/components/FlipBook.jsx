import React, { useState, useRef, useEffect } from "react";
import resume from "../data/resumeData";
import "../styles/book.css";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaArrowRight,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";

function useFlipSound() {
  const ctxRef = useRef(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    } catch {
      ctxRef.current = null;
    }
  }, []);
  const play = () => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "triangle";
    o.frequency.value = 480;
    g.gain.setValueAtTime(0.001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.05);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    o.connect(g);
    g.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 0.42);
  };
  return { play };
}

export default function FlipBook() {
  const pages = [
    // 🧙 About
    {
      title: "About the Wizard",
      content: (
        <div>
          <motion.h1
            className="storybook-heading"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {resume.name}
          </motion.h1>

          <p className="text-sm text-stone-600 mb-2 italic text-center">
            {resume.contact.phone} • {resume.contact.email}
          </p>

          <div className="text-sm space-x-4 mb-5 text-center">
            <a
              href={resume.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="storybook-link"
            >
              LinkedIn
            </a>
            <a
              href={resume.contact.github}
              target="_blank"
              rel="noreferrer"
              className="storybook-link"
            >
              GitHub
            </a>
          </div>

          <p className="storybook-text">
            A full-stack developer from the realm of creativity — conjuring
            responsive React interfaces, dynamic UI enchantments, and backend
            spells that perform seamlessly across kingdoms (and browsers).
          </p>
        </div>
      ),
    },

    // 🏛 Education
    {
      title: "Education of Knowledge",
      content: (
        <div className="space-y-5">
          {resume.education.map((edu, i) => (
            <motion.div
              key={i}
              className="storybook-section"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="storybook-subtitle">{edu.degree}</div>
              <p className="storybook-meta">{edu.institute}</p>
              <p className="italic text-sm text-stone-700">{edu.year}</p>
            </motion.div>
          ))}
        </div>
      ),
    },

    // ⚙ Work
    {
      title: "Work Chronicles",
      content: (
        <div className="space-y-5">
          {resume.experience.map((ex, i) => (
            <motion.div
              key={i}
              className="storybook-section"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="storybook-subtitle">{ex.title}</div>
              <p className="storybook-meta">
                {ex.company} • {ex.date}
              </p>
              <ul className="storybook-list">
                {ex.highlights.map((h, idx) => (
                  <li key={idx}>{h}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      ),
    },

    // 💫 Projects
    {
      title: "Projects of Magic",
      content: (
        <div className="space-y-5">
          {resume.projects.map((p, i) => (
            <motion.div
              key={i}
              className="storybook-section"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="storybook-subtitle">
                {p.title}{" "}
                <span className="text-xs text-stone-500 italic">({p.year})</span>
              </div>
              <ul className="storybook-list">
                {p.details.map((d, idx) => (
                  <li key={idx}>{d}</li>
                ))}
              </ul>
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="storybook-link block mt-2"
                >
                  Visit Project ↗
                </a>
              )}
            </motion.div>
          ))}
        </div>
      ),
    },

    // 🧠 Skills
    {
      title: "Skills of Sorcery",
      content: (
        <div className="storybook-section">
          <div className="storybook-subtitle mb-2">Core Skills</div>
          <div className="flex flex-wrap gap-3 justify-center">
            {resume.skills.map((s, i) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.1 }}
                className="storybook-skill"
              >
                {s}
              </motion.span>
            ))}
          </div>
        </div>
      ),
    },

    // 🏆 Achievements
    {
      title: "Achievements of Valor",
      content: (
        <div className="storybook-section">
          <ul className="storybook-list">
            {resume.achievements.map((ach, i) => (
              <li key={i}>{ach}</li>
            ))}
          </ul>
        </div>
      ),
    },

    // 🧭 Leadership
    {
      title: "Leadership Chronicles",
      content: (
        <div className="space-y-3">
          {resume.leadership.map((lead, i) => (
            <motion.p
              key={i}
              className="storybook-text"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              • {lead}
            </motion.p>
          ))}
        </div>
      ),
    },

    // 🔗 Links
    {
      title: "Mystic Links",
      content: (
        <div className="storybook-section">
          {resume.links.map((link, i) => (
            <a
              key={i}
              href={link}
              target="_blank"
              rel="noreferrer"
              className="storybook-link block mb-2"
            >
              {link}
            </a>
          ))}
        </div>
      ),
    },
  ];

  const [current, setCurrent] = useState(0);
  const pagesRef = useRef([]);
  const { play } = useFlipSound();

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    pagesRef.current.forEach(
      (el, i) => el && (el.style.zIndex = pages.length - i)
    );
  }, [pages.length]);

  const next = () => {
    if (current < pages.length) {
      const el = pagesRef.current[current];
      el.classList.add("flipped");
      el.style.zIndex = current + 1;
      setCurrent((c) => c + 1);
      play();
    }
  };

  const prev = () => {
    if (current > 0) {
      const el = pagesRef.current[current - 1];
      el.classList.remove("flipped");
      el.style.zIndex = pages.length - (current - 1);
      setCurrent((c) => c - 1);
      play();
    }
  };

  const toggleMusic = () => {
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative flex flex-col items-center gap-8 font-serif text-gray-800 pt-10">
      <audio ref={audioRef} src="./harry_potter_theme.mp3" loop />

      <button
        onClick={toggleMusic}
        className="absolute top-4 right-6 z-20 p-3 rounded-full bg-amber-200/40 hover:bg-amber-300 shadow-lg backdrop-blur-sm transition-all"
        aria-label="Toggle Music"
      >
        {isPlaying ? (
          <FaVolumeUp className="text-amber-900 text-xl" />
        ) : (
          <FaVolumeMute className="text-amber-900 text-xl" />
        )}
      </button>

      <div className="flex items-center gap-6 z-10">
        <button
          onClick={prev}
          disabled={current === 0}
          className="storybook-btn"
        >
          <FaArrowLeft className="text-amber-900 text-2xl" />
        </button>

        <motion.div
          className="book-viewport relative"
          initial={{ scale: 0.95, rotateX: 6 }}
          animate={{ scale: 1, rotateX: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="book relative w-[620px] h-[780px] rounded-xl overflow-hidden">
            {pages.map((p, i) => (
              <div
                key={i}
                ref={(el) => (pagesRef.current[i] = el)}
                className={`page ${i < current ? "flipped" : ""}`}
                style={{ zIndex: pages.length - i }}
              >
                <div className="page-face page-front">
                  <div className="page-inner h-full px-10 py-8 overflow-y-auto">
                    <motion.h2
                      className="storybook-title"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                    >
                      {p.title}
                    </motion.h2>
                    <div className="storybook-content">{p.content}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <button
          onClick={next}
          disabled={current === pages.length}
          className="storybook-btn"
        >
          <FaArrowRight className="text-amber-900 text-2xl" />
        </button>
      </div>
    </div>
  );
}
