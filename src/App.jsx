import { useEffect, useRef, useState } from "react";
import {
  projects,
  colorGrades,
  intro,
  skills,
  email,
  mailtoLink,
} from "./data/content";
import ProjectImage from "./components/ProjectImage";
import VideoPlayer from "./components/VideoPlayer";
import "./App.css";

const tracks = [
  { id: "V1", name: "Short form", tone: "short", width: 15, gap: 6 },
  { id: "V2", name: "Long form", tone: "long", width: 20, gap: 3 },
  { id: "C1", name: "Color grading", tone: "color", width: 24, gap: 14 },
];

const work = [...projects, ...colorGrades];
const trackOf = (project) =>
  project.category === "Short Form"
    ? tracks[0]
    : project.category === "Long Form"
      ? tracks[1]
      : tracks[2];

// Lay each track's clips end to end, offset so the tracks overlap like a real
// edit instead of starting in one column.
const clips = tracks.flatMap((track, row) => {
  let start = [2, 6, 20][row];
  return work
    .filter((project) => trackOf(project) === track)
    .map((project) => {
      const clip = { project, track, start, width: track.width };
      start += track.width + track.gap;
      return clip;
    });
});

// The ruler spans a five-minute sequence at 25 fps.
const timecode = (position) => {
  const frames = Math.round((position / 100) * 300 * 25);
  const pad = (value) => String(value).padStart(2, "0");
  return [
    0,
    Math.floor(frames / 1500),
    Math.floor(frames / 25) % 60,
    frames % 25,
  ]
    .map(pad)
    .join(":");
};

const groups = tracks.map((track) => ({
  track,
  items: work.filter((project) => trackOf(project) === track),
}));

function Timeline({ selected, onSelect, onPlay }) {
  const current = clips.find((clip) => clip.project.id === selected.id);
  const [playhead, setPlayhead] = useState(0);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setPlayhead(current.start));
    return () => cancelAnimationFrame(frame);
  }, [current.start]);
  return (
    <section className="editor" aria-label="Featured work">
      <div className="viewer">
        <button
          className="viewer-frame"
          onClick={() => onPlay(selected)}
          aria-label={`Play ${selected.title}`}
        >
          <ProjectImage key={selected.id} project={selected} eager />
          <span className="viewer-play" aria-hidden="true">
            ▶
          </span>
        </button>
        <div className="viewer-info">
          <span className={`tag tone-${trackOf(selected).tone}`}>
            {selected.category}
          </span>
          <h2>{selected.title}</h2>
          <p>{selected.description}</p>
          <button className="button" onClick={() => onPlay(selected)}>
            Play video
          </button>
        </div>
      </div>
      <div className="timeline">
        <div className="timeline-scroll">
          <div className="timeline-canvas">
            <div className="ruler" aria-hidden="true">
              <span className="timecode">{timecode(playhead)}</span>
              <span className="ruler-scale">
                {Array.from({ length: 11 }, (_, index) => (
                  <span
                    key={index}
                    className="tick"
                    style={{ left: `${index * 10}%` }}
                  />
                ))}
              </span>
            </div>
            {tracks.map((track) => (
              <div className="track" key={track.id}>
                <span className="track-name">
                  <b>{track.id}</b>
                  {track.name}
                </span>
                <div className="track-lane">
                  {clips
                    .filter((clip) => clip.track === track)
                    .map(({ project, start, width }) => (
                      <button
                        key={project.id}
                        className={`clip tone-${track.tone}`}
                        style={{ left: `${start}%`, width: `${width}%` }}
                        aria-pressed={project.id === selected.id}
                        onClick={() => onSelect(project)}
                        onDoubleClick={() => onPlay(project)}
                      >
                        {project.title}
                      </button>
                    ))}
                </div>
              </div>
            ))}
            <span className="playhead-lane" aria-hidden="true">
              <span className="playhead" style={{ left: `${playhead}%` }} />
            </span>
          </div>
        </div>
        <p className="timeline-hint">
          Pick a clip to preview it. Double-click it, or press Play video, to
          watch.
        </p>
      </div>
    </section>
  );
}

export default function App() {
  const [video, setVideo] = useState(null);
  const [selected, setSelected] = useState(projects[2]);
  const [copied, setCopied] = useState(false);
  const [menu, setMenu] = useState(false);
  const videoTrigger = useRef(null);
  const openVideo = (project) => {
    videoTrigger.current = document.activeElement;
    setVideo(project);
  };
  const closeVideo = () => {
    setVideo(null);
    requestAnimationFrame(() => videoTrigger.current?.focus());
  };
  const stepVideo = (step) => {
    const index = work.findIndex((item) => item.id === video?.id);
    if (index === -1) return;
    setVideo(work[(index + step + work.length) % work.length]);
  };
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      location.href = `mailto:${email}`;
    }
  };
  useEffect(() => {
    const escape = (event) => {
      if (event.key === "Escape") setMenu(false);
    };
    addEventListener("keydown", escape);
    return () => removeEventListener("keydown", escape);
  }, []);
  return (
    <div className="site">
      <a className="skip-link" href="#work">
        Skip to the work
      </a>
      <header className="topbar">
        <a href="#top" className="wordmark">
          <span className="wordmark-mark" aria-hidden="true" />
          Shannon
        </a>
        <button
          className="menu-toggle"
          aria-expanded={menu}
          aria-controls="main-nav"
          onClick={() => setMenu(!menu)}
        >
          {menu ? "Close" : "Menu"}
        </button>
        <nav
          id="main-nav"
          aria-label="Main navigation"
          className={menu ? "is-open" : ""}
        >
          {[
            ["work", "Work"],
            ["about", "About"],
            ["contact", "Contact"],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
              {label}
            </a>
          ))}
          <a className="button" href={mailtoLink}>
            Email me
          </a>
        </nav>
      </header>
      <main id="top">
        <section className="hero">
          <h1>I edit short‑form, long‑form, motion graphics and color.</h1>
          <p className="hero-sub">
            I'm Shannon, a video editor with 1–2 years of experience. I take
            raw footage all the way to a delivered video: the cut, the sound,
            the graphics and the grade.
          </p>
          <Timeline
            selected={selected}
            onSelect={setSelected}
            onPlay={openVideo}
          />
        </section>

        <section id="work" className="work" aria-labelledby="work-title">
          <h2 id="work-title" className="section-title">
            All work
          </h2>
          {groups.map(({ track, items }) => (
            <div className="bin" key={track.id}>
              <h3 className={`bin-title tone-${track.tone}`}>
                {track.name}
                <span>{items.length}</span>
              </h3>
              <div className={`bin-grid bin-${track.tone}`}>
                {items.map((project) => (
                  <article className="card" key={project.id}>
                    <button
                      className={`card-frame tone-${track.tone}`}
                      onClick={() => openVideo(project)}
                      aria-label={`Play ${project.title}`}
                    >
                      <ProjectImage project={project} width={700} />
                      <span className="card-play" aria-hidden="true">
                        ▶
                      </span>
                    </button>
                    <h4>{project.title}</h4>
                    <p>{project.description}</p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section id="about" className="about" aria-labelledby="about-title">
          <button
            className="about-video"
            onClick={() => openVideo(intro)}
            aria-label="Play Meet Shannon, a video introduction"
          >
            <ProjectImage project={intro} />
            <span className="card-play" aria-hidden="true">
              ▶
            </span>
          </button>
          <div className="about-copy">
            <h2 id="about-title" className="section-title">
              About me
            </h2>
            <p>
              I'm a video editor with an eye for storytelling and visual
              detail. I've cut brand intros, comedy and serious shorts,
              voice-over explainers, talking-head videos and gaming content.
            </p>
            <p>
              Good editing serves the footage, the audience and the moment.
              Sometimes that means more energy; often it just means the right
              beat.
            </p>
            <button className="text-link" onClick={() => openVideo(intro)}>
              Watch my video introduction
            </button>
            <dl className="skills">
              {skills.map(([name, detail]) => (
                <div key={name}>
                  <dt>{name}</dt>
                  <dd>{detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section
          id="contact"
          className="contact"
          aria-labelledby="contact-title"
        >
          <h2 id="contact-title">Got footage? Let's make the cut.</h2>
          <p>
            Tell me the video type, length and deadline, and send a link to the
            footage if you have it. I reply by email, usually within 1–2 days.
          </p>
          <div className="contact-actions">
            <a className="button button-large" href={mailtoLink}>
              Send a project brief
            </a>
            <a className="contact-email" href={`mailto:${email}`}>
              {email}
            </a>
            <button type="button" className="ghost" onClick={copyEmail}>
              {copied ? "Copied" : "Copy email"}
            </button>
          </div>
        </section>
      </main>
      <footer>
        <span>© {new Date().getFullYear()} Shannon</span>
        <a href="#top">Back to top</a>
      </footer>
      {video && (
        <VideoPlayer
          key={video.id}
          video={video}
          onClose={closeVideo}
          onStep={video.id === intro.id ? undefined : stepVideo}
        />
      )}
    </div>
  );
}
