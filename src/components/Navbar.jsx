import { Link, useLocation, useNavigate } from "react-router-dom";
import useLanguage from "../i18n/useLanguage.js";
import "../css/Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  const handleScrollToProjects = () => {
    if (location.pathname === "/") {
      const projectsSection = document.getElementById("projects");
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById("projects")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <Link to="/" className="logo-link">
          <h2 className="logo">Maxime Akkus</h2>
        </Link>
        <p className="sidebar-job">{t("nav.role")}</p>
      </div>

      <div className="sidebar-middle">
        <button className="sidebar-nav-button" onClick={handleScrollToProjects}>
          {t("nav.projects")}
        </button>
      </div>

      <div className="sidebar-contact">
        <p className="sidebar-title">{t("nav.contact")}</p>
        <div className="sidebar-contact-item">
          <p>{t("nav.email")}</p>
          <a href="mailto:akkus.maxime@gmail.com">akkus.maxime@gmail.com</a>
        </div>
        <div className="sidebar-contact-item">
          <p>{t("nav.phone")}</p>
          <a href="tel:+33788759457">07 88 75 94 57</a>
        </div>
        <div className="sidebar-contact-item">
          <p>{t("nav.github")}</p>
          <a href="https://github.com/Ryujin95" target="_blank" rel="noreferrer">
            github.com/Ryujin95
          </a>
        </div>
        <div className="sidebar-contact-item">
          <p>{t("nav.linkedin")}</p>
          <a
            href="https://www.linkedin.com/in/maxime-akkus-940a07242"
            target="_blank"
            rel="noreferrer"
          >
            linkedin.com/in/maxime-akkus-940a07242
          </a>
        </div>

        <div className="language-switcher" role="group" aria-label={t("nav.languageLabel")}>
          <button
            type="button"
            className={`language-button ${language === "fr" ? "active" : ""}`}
            aria-label={t("nav.switchToFrench")}
            aria-pressed={language === "fr"}
            title={language === "fr" ? "Français" : "French"}
            onClick={() => setLanguage("fr")}
          >
            <span className="language-flag" aria-hidden="true">
              <svg viewBox="0 0 30 20" focusable="false">
                <path fill="#002395" d="M0 0h10v20H0z" />
                <path fill="#fff" d="M10 0h10v20H10z" />
                <path fill="#ed2939" d="M20 0h10v20H20z" />
              </svg>
            </span>
            <span>FR</span>
          </button>
          <button
            type="button"
            className={`language-button ${language === "en" ? "active" : ""}`}
            aria-label={t("nav.switchToEnglish")}
            aria-pressed={language === "en"}
            title={language === "fr" ? "Anglais" : "English"}
            onClick={() => setLanguage("en")}
          >
            <span className="language-flag" aria-hidden="true">
              <svg viewBox="0 0 60 30" focusable="false">
                <rect width="60" height="30" fill="#012169" />
                <path d="M0 0 60 30M60 0 0 30" stroke="#fff" strokeWidth="6" />
                <path d="M0 0 60 30M60 0 0 30" stroke="#c8102e" strokeWidth="2" />
                <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
                <path d="M30 0v30M0 15h60" stroke="#c8102e" strokeWidth="6" />
              </svg>
            </span>
            <span>EN</span>
          </button>
        </div>

        <a href={language === "fr" ? "/cv.pdf" : "/cv-en.pdf"} download className="cv-button">
          {t("nav.downloadCv")}
        </a>
      </div>
    </aside>
  );
}
