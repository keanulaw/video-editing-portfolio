import { useEffect, useRef, useState } from "react";
import { projects, colorGrades, intro, skills } from "./data/content";
import { useSequence } from "./hooks/useSequence";
import ProjectImage from "./components/ProjectImage";
import VideoPlayer from "./components/VideoPlayer";
import "./App.css";

const Arrow = () => (
  <span className="arrow" aria-hidden="true">
    ↗
  </span>
);
const Play = () => <span aria-hidden="true">▶</span>;

function WorkFrame({ project, onPlay, className = "" }) {
  return (
    <article className={`work-frame ${className}`} data-reveal="frame">
      <button
        className="video-trigger"
        onClick={() => onPlay(project)}
        aria-label={`Watch ${project.title}`}
      >
        <ProjectImage project={project} />
        <span className="frame-corners" aria-hidden="true" />
        <span className="frame-number">CUT / 0{project.id}</span>
        <span className="play-disc">
          <Play />
          <span>PLAY</span>
        </span>
        <span className="frame-bottom">
          <span>{project.category}</span>
          <span>WATCH THE CUT ↗</span>
        </span>
      </button>
      <div className="work-caption">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
    </article>
  );
}

export default function App() {
  const [video, setVideo] = useState(null);
  const videoTrigger = useRef(null);
  const openVideo = (project) => {
    videoTrigger.current = document.activeElement;
    setVideo(project);
  };
  const closeVideo = () => {
    setVideo(null);
    requestAnimationFrame(() => videoTrigger.current?.focus());
  };
  const [menu, setMenu] = useState(false);
  const [motion, setMotion] = useState(
    () => !matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [active, setActive] = useState("home");
  useSequence(motion);
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setMotion(!query.matches);
    query.addEventListener("change", change);
    return () => query.removeEventListener("change", change);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    document
      .querySelectorAll("main > section[id]")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const escape = (event) => {
      if (event.key === "Escape") setMenu(false);
    };
    addEventListener("keydown", escape);
    return () => removeEventListener("keydown", escape);
  }, []);
  return (
    <div className={`site ${motion ? "motion-on" : "motion-off"}`}>
      <a className="skip-link" href="#work">
        Skip to the work
      </a>
      <header className="navigation">
        <a href="#home" className="wordmark" aria-label="Shannon, home">
          SHANNON
          <span className="logo-play">
            <Play />
          </span>
        </a>
        <span className="nav-label">INDEPENDENT VIDEO EDITOR</span>
        <button
          className="menu-toggle"
          aria-expanded={menu}
          aria-controls="main-nav"
          onClick={() => setMenu(!menu)}
        >
          {menu ? "Close −" : "Menu +"}
        </button>
        <nav
          id="main-nav"
          aria-label="Main navigation"
          className={menu ? "is-open" : ""}
        >
          {["work", "about", "toolkit", "contact"].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              aria-current={active === item ? "location" : undefined}
              onClick={() => setMenu(false)}
            >
              {item}
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
        <div className="reading-progress" aria-hidden="true" />
      </header>
      <main>
        <section id="home" className="hero">
          <div className="hero-top eyebrow">
            <span>SHORT FORM / LONG FORM / MOTION GRAPHICS</span>
            <span>PORTFOLIO — PRESS PLAY</span>
          </div>
          <h1>
            <span className="hero-name">
              SHANNON
              <span className="asterisk" aria-hidden="true">
                ✳
              </span>
            </span>
            <span className="hero-role">
              VIDEO EDITOR<span className="period">.</span>
            </span>
          </h1>
          <div className="hero-lower">
            <p>
              The right cut.
              <br />
              The right feeling.
            </p>
            <a className="round-link" href="#work">
              <span>
                Explore
                <br />
                the work
              </span>
              <span aria-hidden="true">↓</span>
            </a>
            <p className="hero-note">
              From a quick laugh to a longer story.
              <br />I edit for the moment that matters.
            </p>
          </div>
          <div className="hero-film" aria-label="A few cuts from the portfolio">
            {[projects[0], projects[2], projects[4]].map((project, index) => (
              <button
                key={project.id}
                onClick={() => openVideo(project)}
                className={`film-shot shot-${index}`}
                aria-label={`Watch ${project.title}`}
              >
                <ProjectImage project={project} eager width={800} />
                <span>
                  <span>
                    0{index + 1} / {project.title}
                  </span>
                  <Play />
                </span>
              </button>
            ))}
            <span className="film-label eyebrow">
              A FEW FRAMES.
              <br />A LOT OF POSSIBILITIES.
            </span>
          </div>
          <div className="hero-footer eyebrow">
            <span>
              <span className="red-dot" /> EDIT. REFINE. REPEAT.
            </span>
            <span>SCROLL TO START THE SEQUENCE ↓</span>
            <span>01 — 05</span>
          </div>
        </section>
        <section id="work" className="work-section">
          <div className="section-top eyebrow">
            <span>01 / SELECTED WORK</span>
            <span>
              {projects.length + colorGrades.length} CUTS. DIFFERENT MOODS.
            </span>
          </div>
          <div className="section-heading" data-reveal="type">
            <h2>
              LESS TALK.
              <br />
              <span>MORE PLAY.</span>
            </h2>
            <p>
              Short-form, long-form, and everything
              <br className="desktop-break" /> that makes the edit click.
            </p>
          </div>
          <WorkFrame
            project={projects[2]}
            onPlay={openVideo}
            className="featured-frame"
          />
          <div className="shorts-heading" data-reveal="slide">
            <span className="eyebrow">THE SHORT CUTS</span>
            <h3>
              Same format.
              <br />
              Different energy.
            </h3>
            <span className="giant-arrow" aria-hidden="true">
              ↘
            </span>
          </div>
          <div className="shorts-pair">
            <WorkFrame
              project={projects[0]}
              onPlay={openVideo}
              className="portrait-frame"
            />
            <WorkFrame
              project={projects[1]}
              onPlay={openVideo}
              className="portrait-frame offset-frame"
            />
          </div>
          <div className="longs-heading eyebrow">
            <span>LET IT PLAY A LITTLE LONGER</span>
            <span>LONG FORM ↓</span>
          </div>
          <div className="longs-pair">
            <WorkFrame project={projects[3]} onPlay={openVideo} />
            <WorkFrame
              project={projects[4]}
              onPlay={openVideo}
              className="offset-frame"
            />
          </div>
          <section
            id="color-grading"
            className="color-study"
            aria-labelledby="color-title"
          >
            <div className="section-top eyebrow">
              <span>IN FOCUS / COLOR GRADING</span>
              <span>TWO FILMS. MY COLOR WORK.</span>
            </div>
            <div className="color-heading" data-reveal="type">
              <h3 id="color-title">
                A FEEL
                <br />
                FOR <em>COLOR.</em>
              </h3>
              <p>
                Two examples of my color grading work.
                <br />
                Watch each film to see the finished look.
              </p>
            </div>
            <div className="color-films">
              {colorGrades.map((project) => (
                <WorkFrame
                  key={project.id}
                  project={project}
                  onPlay={openVideo}
                />
              ))}
            </div>
          </section>
          <div className="more-work">
            <h3 data-reveal="type">
              STILL ROLLING<span>↙</span>
            </h3>
            {projects.slice(5).map((project) => (
              <button
                key={project.id}
                onClick={() => openVideo(project)}
                className="project-row"
                data-reveal="slide"
              >
                <span className="eyebrow">0{project.id}</span>
                <ProjectImage project={project} width={400} />
                <span className="row-title">
                  {project.title}
                  <small>{project.category}</small>
                </span>
                <span className="row-watch">
                  Watch <Arrow />
                </span>
              </button>
            ))}
          </div>
        </section>
        <section
          className="motion-section"
          aria-label="Motion graphics interlude"
        >
          <div className="eyebrow">
            <span>02 / A LITTLE MOTION</span>
            <span>TYPE. TIMING. RHYTHM.</span>
          </div>
          <div className="kinetic-type" data-reveal="kinetic">
            <span>MAKE</span>
            <span className="outlined">
              IT MOVE
              <span className="motion-star" aria-hidden="true">
                ✳
              </span>
            </span>
            <span>
              MAKE IT <em>FEEL.</em>
            </span>
          </div>
          <div className="motion-bottom">
            <span className="eyebrow">
              MOTION GRAPHICS / SOUND DESIGN / COLOR
            </span>
            <p>
              Not every frame needs more.
              <br />
              Sometimes it just needs the right beat.
            </p>
          </div>
        </section>
        <section id="about" className="about-section">
          <div className="section-top eyebrow">
            <span>03 / BEHIND THE CUT</span>
            <span>HELLO, I'M SHANNON.</span>
          </div>
          <div className="about-layout">
            <div className="about-visual" data-reveal="frame">
              <button
                onClick={() => openVideo(intro)}
                aria-label="Watch Meet Shannon, video introduction"
              >
                <ProjectImage project={intro} />
                <span className="intro-sticker">
                  MEET THE
                  <br />
                  EDITOR <Arrow />
                </span>
                <span className="play-disc">
                  <Play />
                </span>
              </button>
              <span className="eyebrow">
                A PERSONAL INTRODUCTION — WATCH WITH SOUND
              </span>
            </div>
            <div className="about-copy" data-reveal="slide">
              <h2>
                BEHIND
                <br />
                THE
                <br />
                <span>TIMELINE.</span>
              </h2>
              <p>
                I'm Shannon, a video editor with an eye for storytelling and
                visual detail. I turn raw footage into finished edits, from
                corporate videos to creative content.
              </p>
              <p>
                I combine the technical side of editing with a feel for the
                story. To me, great editing serves the footage, the audience,
                and the moment.
              </p>
              <button className="text-link" onClick={() => openVideo(intro)}>
                A little more about me <Arrow />
              </button>
            </div>
          </div>
        </section>
        <section id="toolkit" className="toolkit-section">
          <div className="section-top eyebrow">
            <span>04 / THE TOOLKIT</span>
            <span>FROM FIRST CUT TO FINAL EXPORT</span>
          </div>
          <h2 data-reveal="type">
            IN THE <span>EDIT.</span>
          </h2>
          <div className="tool-list">
            {skills.map(([name, detail, stage], index) => (
              <details className="tool-item" key={name} data-reveal="slide">
                <summary className="tool-row">
                  <span className="eyebrow">
                    0{index + 1} / {stage}
                  </span>
                  <h3>{name}</h3>
                  <span className="tool-symbol" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="tool-detail">{detail}</p>
              </details>
            ))}
          </div>
        </section>
        <section id="contact" className="contact-section">
          <div className="section-top eyebrow">
            <span>05 / YOUR NEXT PROJECT</span>
            <span>END OF SEQUENCE. START OF SOMETHING ELSE.</span>
          </div>
          <a
            className="contact-title"
            href="mailto:shannonkeanu1@gmail.com"
            data-reveal="type"
          >
            LET'S
            <br />
            <span>MAKE</span> THE CUT.
            <Arrow />
          </a>
          <div className="contact-bottom">
            <p>
              Got footage? A brief? An idea?
              <br />
              Let's talk about the edit.
            </p>
            <a href="mailto:shannonkeanu1@gmail.com">
              shannonkeanu1@gmail.com <Arrow />
            </a>
          </div>
        </section>
      </main>
      <footer>
        <a href="#home" className="wordmark">
          SHANNON
          <span className="logo-play">
            <Play />
          </span>
        </a>
        <span>© {new Date().getFullYear()} Shannon. Made to be watched.</span>
        <button
          className="motion-toggle"
          aria-pressed={motion}
          onClick={() => setMotion(!motion)}
        >
          Motion {motion ? "on" : "off"}{" "}
          <span aria-hidden="true">{motion ? "◉" : "○"}</span>
        </button>
        <a href="#home">Back to top ↑</a>
      </footer>
      {video && <VideoPlayer video={video} onClose={closeVideo} />}
    </div>
  );
}
