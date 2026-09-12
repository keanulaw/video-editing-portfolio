import { useEffect, useRef } from "react";
import { videoLink } from "../data/content";

export default function VideoPlayer({ video, onClose }) {
  const dialog = useRef(null);
  useEffect(() => {
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);
  const source =
    video.type === "youtube"
      ? `https://www.youtube-nocookie.com/embed/${video.videoId}?rel=0`
      : `https://drive.google.com/file/d/${video.videoId}/preview`;
  return (
    <dialog
      ref={dialog}
      className="player"
      aria-labelledby="player-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="player-inner">
        <header>
          <span className="eyebrow">{video.category}</span>
          <button
            autoFocus
            onClick={onClose}
            className="close-player"
            aria-label="Close video"
          >
            Close <span aria-hidden="true">×</span>
          </button>
        </header>
        <iframe
          src={source}
          title={video.title}
          allow="fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
        <div className="player-caption">
          <div>
            <h2 id="player-title">{video.title}</h2>
            <p>{video.description}</p>
          </div>
          <a href={videoLink(video)} target="_blank" rel="noreferrer">
            Open on {video.type === "youtube" ? "YouTube" : "Google Drive"} ↗
          </a>
        </div>
        <p className="player-note">
          If the player is unavailable, use the direct link above.
        </p>
      </div>
    </dialog>
  );
}
