import { useEffect } from "react";

// Native scrolling: no wheel interception, artificial delays, or scroll trapping.
export function useSequence(enabled) {
  useEffect(() => {
    const elements = [...document.querySelectorAll("[data-reveal]")];
    if (!enabled) {
      elements.forEach((element) => element.classList.add("in-view"));
      document.documentElement.style.setProperty("--scroll", "0");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    elements.forEach((element) => {
      element.classList.remove("in-view");
      observer.observe(element);
    });
    let frame;
    const kinetic = document.querySelector(".kinetic-type");
    const update = () => {
      frame = null;
      const max = document.documentElement.scrollHeight - innerHeight;
      document.documentElement.style.setProperty(
        "--scroll",
        String(max > 0 ? scrollY / max : 0),
      );
      document.documentElement.style.setProperty(
        "--hero-shift",
        `${Math.min(scrollY * 0.12, 120)}px`,
      );
      if (kinetic) {
        const position = kinetic.getBoundingClientRect();
        const progress = Math.max(
          -1,
          Math.min(1, (position.top - innerHeight * 0.35) / innerHeight),
        );
        kinetic.style.setProperty(
          "--kinetic-shift",
          `${progress * (innerWidth < 600 ? 14 : 60)}px`,
        );
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
    };
  }, [enabled]);
}
