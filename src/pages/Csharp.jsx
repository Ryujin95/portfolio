import useLanguage from "../i18n/useLanguage.js";
import "../css/Csharp.css";

const techBadges = ["C#", "ASP.NET Core", "Razor", "PostgreSQL", "SignalR", "Telerik", "Docker", "Entity Framework"];
const featureKeys = [
  "feature1",
  "feature2",
  "feature3",
  "feature4",
  "feature5",
  "feature6",
  "feature7",
];

export default function ProjetCSharp() {
  const { t } = useLanguage();

  return (
    <main>
      <section>
        <h1>{t("csharp.title")}</h1>
        <div className="tech-badges">
          {techBadges.map((tech) => <span key={tech} className="badge">{tech}</span>)}
        </div>
        <div className="about-box">
          {[1, 2, 3].map((paragraph) => (
            <p key={paragraph}>{t(`csharp.intro${paragraph}`)}</p>
          ))}
        </div>
      </section>

      <section>
        <h2>{t("csharp.featuresTitle")}</h2>
        <ul className="project-features">
          {featureKeys.map((feature) => <li key={feature}>{t(`csharp.${feature}`)}</li>)}
        </ul>
      </section>

      <section>
        <h2>{t("csharp.architectureTitle")}</h2>
        <div className="about-box">
          {[1, 2].map((paragraph) => (
            <p key={paragraph}>{t(`csharp.architecture${paragraph}`)}</p>
          ))}
        </div>
      </section>

      <section>
        <h2>{t("csharp.accessTitle")}</h2>
        <div className="project-links">
          <a
            href="/projet.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="project-link-button"
          >
            {t("csharp.viewDossier")}
          </a>
        </div>
      </section>
    </main>
  );
}
