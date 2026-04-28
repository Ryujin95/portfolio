import { Link } from "react-router-dom";
import "../css/Home.css";
import "../css/Layout.css";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-text">
          <p className="hero-kicker">Portfolio développeur d'application web</p>
          <h1 className="hero-title">Maxime Akkus</h1>
          <h2 className="hero-subtitle">Développeur d'application web Full-Stack</h2>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <h2>Compétences</h2>
          <p>Technologies et outils utilisés dans mes projets.</p>
        </div>

        <div className="skills-grid">
          <article className="skill-card">
            <h3>Frontend</h3>
            <p>HTML, CSS, JavaScript, React, responsive design, UI/UX</p>
          </article>

          <article className="skill-card">
            <h3>Backend</h3>
            <p>PHP, Symfony, Node.js, C#, .NET, .NET Core, API REST, Swagger, endpoints HTTP</p>
          </article>

          <article className="skill-card">
            <h3>Base de données</h3>
            <p>SQL, MySQL, PostgreSQL, modélisation des données, relations entre entités, gestion des données</p>
          </article>

          <article className="skill-card">
            <h3>Frameworks et technologies</h3>
            <p>Symfony, React, Blazor, Razor Pages, Telerik, JWT</p>
          </article>

          <article className="skill-card">
            <h3>Outils et conception</h3>
            <p>Git, GitHub, UML, Figma, logique métier, formulaires dynamiques</p>
          </article>

          <article className="skill-card">
            <h3>Concepts et architecture</h3>
            <p>Programmation orientée objet (POO), architecture MVC, gestion des rôles, ObjectProxy, WebSockets, temps réel, synchronisation de données</p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <h2>À propos</h2>
        </div>

        <div className="about-box">
          <p>
            J’ai développé plusieurs projets concrets, allant de mini-jeux en JavaScript à une application JDR complète construite avec React et Symfony, incluant gestion des rôles, logique métier, API REST et synchronisation de données en temps réel via WebSockets.
          </p>

          <p>
            Je ne me limite pas à faire fonctionner une application : je m’intéresse à sa structure, à la séparation frontend/backend et à la manière dont elle peut évoluer dans le temps.
          </p>

          <p>
            Je suis particulièrement attiré par les projets techniques qui demandent de la réflexion, de la logique et une vraie organisation du code.
          </p>

          <p>
            Aujourd’hui, je suis à la recherche d’un environnement où je peux continuer à progresser rapidement, relever des défis concrets et m’impliquer dans des projets réels.
          </p>
        </div>
      </section>

      <section className="section" id="projects">
        <div className="section-heading">
          <h2>Mes projets</h2>
          <p>
            Chaque projet montre une facette différente de mon niveau technique
            et de ma manière de construire une application.
          </p>
        </div>

        <div className="projects-grid">
          <Link to="/jdr" className="project-card">
            <h3>Application JDR</h3>
            <p>
              Application complète développée avec React et Symfony, incluant
              gestion des rôles, logique métier, API REST et structure modulaire.
            </p>
            <span>Voir le projet</span>
          </Link>

          <Link to="/istanbulGrill" className="project-card">
            <h3>Istanbul Grill</h3>
            <p>
              Site réalisé pour un besoin concret, avec attention portée au
              design, à la navigation et à l’expérience utilisateur.
            </p>
            <span>Voir le projet</span>
          </Link>

          <Link to="/mini-jeu-1" className="project-card">
            <h3>FPS</h3>
            <p>
              Projet JavaScript mettant en avant la logique, les interactions
              utilisateur et la gestion des événements.
            </p>
            <span>Voir le projet</span>
          </Link>

          <Link to="/mini-jeu-2" className="project-card">
            <h3>Runner</h3>
            <p>
              Deuxième projet orienté dynamique côté client, règles de jeu et
              comportement interactif.
            </p>
            <span>Voir le projet</span>
          </Link>

          <Link to="/csharp" className="project-card">
            <h3>Projet C# (stage)</h3>
            <p>
              Expérience réalisée en contexte professionnel, présentée sans code
              public mais avec description du travail effectué.
            </p>
            <span>Voir le projet</span>
          </Link>
        </div>
      </section>
    </main>
  );
}