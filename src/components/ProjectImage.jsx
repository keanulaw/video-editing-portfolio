import { useState } from "react";
import { thumbnail } from "../data/content";

export default function ProjectImage({ project, eager = false, width = 1000 }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className={`project-image ${failed ? "image-unavailable" : ""}`}>
      {!failed && (
        <img
          src={thumbnail(project, width)}
          alt=""
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
      {failed && (
        <span className="image-fallback">
          <span>▶</span>
          {project.title}
          <small>Watch the original video</small>
        </span>
      )}
    </span>
  );
}
