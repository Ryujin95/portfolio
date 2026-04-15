import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleScrollToProjects = () => {
    if (location.pathname === "/") {
      const projectsSection = document.getElementById("projects");
      if (projectsSection) {
        projectsSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      navigate("/");
      setTimeout(() => {
        const projectsSection = document.getElementById("projects");
        if (projectsSection) {
          projectsSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <Link to="/" className="logo-link">
          <h2 className="logo">Maxime Akkus</h2>
        </Link>

        <p className="sidebar-job">Développeur d&apos;Applications Web</p>
      </div>

      <div className="sidebar-middle">
        <button className="sidebar-nav-button" onClick={handleScrollToProjects}>
          Mes projets
        </button>
      </div>

      <div className="sidebar-contact">
        <p className="sidebar-title">Contact</p>

        <div className="sidebar-contact-item">
          <p>Email</p>
          <a href="mailto:akkus.maxime@gmail.com">akkus.maxime@gmail.com</a>
        </div>

        <div className="sidebar-contact-item">
          <p>Téléphone</p>
          <a href="tel:+33788759457">07 88 75 94 57</a>
        </div>

        <div className="sidebar-contact-item">
          <p>GitHub</p>
          <a
            href="https://github.com/Ryujin95"
            target="_blank"
            rel="noreferrer"
          >
            github.com/Ryujin95
          </a>
        </div>

        <div className="sidebar-contact-item">
          <p>LinkedIn</p>
          <a
            href="https://www.linkedin.com/in/maxime-akkus-940a07242"
            target="_blank"
            rel="noreferrer"
          >
            linkedin.com/in/maxime-akkus-940a07242
          </a>
        </div>

        <a href="/cv.pdf" download className="cv-button">
          Télécharger mon CV
        </a>
      </div>
    </aside>
  );
}