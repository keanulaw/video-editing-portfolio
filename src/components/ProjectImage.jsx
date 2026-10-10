import { useState } from "react";
import { thumbnail } from "../data/content";

export default function ProjectImage({ project, eager = false, width = 1000 }) {
  const [failed, setFailed] = useState(false);
  const [orientation, setOrientation] = useState();
  return (
    <span
      className={`project-image ${failed ? "image-unavailable" : ""}`}
      data-orientation={orientation}
    >
      {!failed && (
        <img
          src={thumbnail(project, width)}
          alt=""
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onLoad={({ currentTarget: image }) =>
            setOrientation(
              image.naturalWidth > image.naturalHeight
                ? "landscape"
                : "portrait",
            )
          }
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
