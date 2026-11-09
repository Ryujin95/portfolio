import { useEffect, useState } from "react";
import useLanguage from "../i18n/useLanguage.js";
import "../css/JDR.css";

const images = ["/jdr1.png", "/jdr2.png", "/jdr3.png", "/jdr4.png"];
const techBadges = ["React", "Symfony", "API REST", "JWT", "WebSockets", "MySQL"];
const statusGroups = [
  { title: "done", items: ["done1", "done2", "done3", "done4", "done5", "done6"] },
  { title: "inProgress", items: ["progress1", "progress2", "progress3", "progress4"] },
  { title: "upcoming", items: ["upcoming1", "upcoming2", "upcoming3", "upcoming4"] },
];

export default function JDR() {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [zoomed, setZoomed] = useState(null);
  const [isAuto, setIsAuto] = useState(true);

  useEffect(() => {
    if (!isAuto) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAuto]);

  useEffect(() => {
    if (!zoomed) return;
    const handleKey = (event) => {
      if (event.key === "Escape") setZoomed(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [zoomed]);

  const handleNav = (direction) => {
    setCurrent((prev) => (prev + direction + images.length) % images.length);
    setIsAuto(false);
  };

  return (
    <main>
      <section>
        <h1>{t("jdr.title")}</h1>
        <div className="tech-badges">
          {techBadges.map((tech) => <span key={tech} className="badge">{tech}</span>)}
        </div>
        <div className="about-box">
          {[1, 2, 3, 4, 5].map((paragraph) => (
            <p key={paragraph}>{t(`jdr.intro${paragraph}`)}</p>
          ))}
        </div>
      </section>

      <section>
        <h2>{t("jdr.interfaceTitle")}</h2>
        <div className="slider">
          <button
            onClick={() => handleNav(-1)}
            className="slider-btn left"
            type="button"
            aria-label={t("jdr.previousImage")}
          >
            ‹
          </button>
          <img
            src={images[current]}
            alt={t("jdr.imageAlt", { number: current + 1 })}
            onClick={() => {
              setZoomed(images[current]);
              setIsAuto(false);
            }}
          />
          <button
            onClick={() => handleNav(1)}
            className="slider-btn right"
            type="button"
            aria-label={t("jdr.nextImage")}
          >
            ›
          </button>
        </div>
        <div className="slider-dots">
          {images.map((image, index) => (
            <button
              key={image}
              className={`dot ${index === current ? "active" : ""}`}
              onClick={() => {
                setCurrent(index);
                setIsAuto(false);
              }}
              type="button"
              aria-label={t("jdr.imageAlt", { number: index + 1 })}
              aria-current={index === current ? "true" : undefined}
            />
          ))}
        </div>
      </section>

      <section>
        <h2>{t("jdr.projectStatus")}</h2>
        <div className="project-status">
          {statusGroups.map((group) => (
            <div className="status-block" key={group.title}>
              <h3>{t(`jdr.${group.title}`)}</h3>
              <ul>
                {group.items.map((item) => <li key={item}>{t(`jdr.${item}`)}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>{t("jdr.technicalTitle")}</h2>
        <div className="about-box">
          {[1, 2, 3, 4].map((paragraph) => (
            <p key={paragraph}>{t(`jdr.technical${paragraph}`)}</p>
          ))}
        </div>
      </section>

      <section>
        <h2>{t("jdr.securityTitle")}</h2>
        <div className="about-box">
          {[1, 2, 3, 4].map((paragraph) => (
            <p key={paragraph}>{t(`jdr.security${paragraph}`)}</p>
          ))}
        </div>
      </section>

      {zoomed && (
        <div
          className="zoom-overlay"
          onClick={() => setZoomed(null)}
          role="dialog"
          aria-modal="true"
          aria-label={t("jdr.closeZoom")}
        >
          <img src={zoomed} alt={t("jdr.zoomAlt")} />
        </div>
      )}
    </main>
  );
}
