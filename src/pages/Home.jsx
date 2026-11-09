import { Link } from "react-router-dom";
import useLanguage from "../i18n/useLanguage.js";
import "../css/Home.css";
import "../css/Layout.css";

export default function Home() {
  const { t } = useLanguage();

  const skills = [
    ["frontend", "frontendDescription"],
    ["backend", "backendDescription"],
    ["database", "databaseDescription"],
    ["frameworks", "frameworksDescription"],
    ["tools", "toolsDescription"],
    ["concepts", "conceptsDescription"],
  ];

  const professionalProjects = [
    {
      to: "/istanbulGrill",
      title: "Istanbul Grill",
      meta: t("home.istanbulRole"),
      description: t("home.istanbulDescription"),
    },
    {
      to: "/csharp",
      title: "AKIRA",
      meta: t("home.akiraRole"),
      description: t("home.akiraDescription"),
    },
  ];

  const personalProjects = [
    {
      to: "/jdr",
      title: "StoryForge",
      description: t("home.storyforgeDescription"),
    },
    {
      to: "/mini-jeu-1",
      title: t("home.fpsTitle"),
      description: t("home.fpsDescription"),
    },
    {
      to: "/mini-jeu-2",
      title: t("home.runnerTitle"),
      description: t("home.runnerDescription"),
    },
  ];

  return (
    <main>
      <section className="hero">
        <div className="hero-text">
          <p className="hero-kicker">{t("home.heroKicker")}</p>
          <h1 className="hero-title">{t("home.name")}</h1>
          <h2 className="hero-subtitle">{t("home.title")}</h2>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <h2>{t("home.skillsTitle")}</h2>
          <p>{t("home.skillsIntro")}</p>
        </div>
        <div className="skills-grid">
          {skills.map(([titleKey, descriptionKey]) => (
            <article className="skill-card" key={titleKey}>
              <h3>{t(`home.${titleKey}`)}</h3>
              <p>{t(`home.${descriptionKey}`)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <h2>{t("home.aboutTitle")}</h2>
        </div>
        <div className="about-box">
          {[1, 2, 3, 4].map((paragraph) => (
            <p key={paragraph}>{t(`home.about${paragraph}`)}</p>
          ))}
        </div>
      </section>

      <div id="projects">
        <section className="section" aria-labelledby="professional-experiences-title">
          <div className="section-heading">
            <h2 id="professional-experiences-title">{t("home.professionalTitle")}</h2>
          </div>
          <div className="projects-grid">
            {professionalProjects.map((project) => (
              <Link to={project.to} className="project-card" key={project.to}>
                <h3>{project.title}</h3>
                <p className="experience-meta">{project.meta}</p>
                <p>{project.description}</p>
                <span>{t("home.viewProject")}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="section" aria-labelledby="personal-projects-title">
          <div className="section-heading">
            <h2 id="personal-projects-title">{t("home.personalTitle")}</h2>
          </div>
          <div className="projects-grid">
            {personalProjects.map((project) => (
              <Link to={project.to} className="project-card" key={project.to}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <span>{t("home.viewProject")}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
