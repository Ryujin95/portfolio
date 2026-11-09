import useLanguage from "../i18n/useLanguage.js";
import "../css/IstanbulGrill.css";

const techBadges = ["HTML", "CSS", "JavaScript", "Node.js", "React"];

export default function IstanbulGrill() {
  const { t } = useLanguage();

  return (
    <main>
      <section>
        <h1>{t("istanbul.title")}</h1>
        <div className="tech-badges">
          {techBadges.map((tech) => <span key={tech} className="badge">{tech}</span>)}
        </div>
        <div className="about-box">
          {[1, 2, 3].map((paragraph) => (
            <p key={paragraph}>{t(`istanbul.intro${paragraph}`)}</p>
          ))}
        </div>
      </section>

      <section>
        <h2>{t("istanbul.accessTitle")}</h2>
        <div className="project-links">
          <a
            href="https://www.istanbulgrill-cergy.com/"
            target="_blank"
            rel="noreferrer"
            className="project-link-button"
          >
            {t("istanbul.viewOnline")}
          </a>
        </div>
      </section>
    </main>
  );
}
