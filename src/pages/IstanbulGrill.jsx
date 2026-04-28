import "../css/IstanbulGrill.css";

const techBadges = ["HTML", "CSS", "JavaScript", "Node.js", "React"];

export default function IstanbulGrill() {
  return (
    <main>
      <section>
        <h1>Istanbul Grill</h1>

        <div className="tech-badges">
          {techBadges.map((tech) => (
            <span key={tech} className="badge">{tech}</span>
          ))}
        </div>

        <div className="about-box">
          <p>
            Projet réalisé pour un restaurant, avec une attention particulière
            portée à la présentation, à la clarté des informations et à
            l'expérience utilisateur.
          </p>

          <p>
            Le projet se concentre sur la conception de l'interface et
            l'organisation des contenus, avec un soin apporté à la lisibilité
            et à la navigation. Les données des plats sont récupérées via un
            appel externe afin de rendre le contenu dynamique.
          </p>

          <p>
            Lors de la première visite, un léger temps de chargement peut être
            nécessaire afin de relancer le serveur distant.
          </p>
        </div>
      </section>

      <section>
        <h2>Accès au projet</h2>

        <div className="project-links">
          
            <a href="https://istanbul-grill.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="project-link-button"
          >
            Voir le projet en ligne
          </a>
        </div>
      </section>
    </main>
  );
}