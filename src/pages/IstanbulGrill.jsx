import "../css/IstanbulGrill.css";

export default function IstanbulGrill() {
  return (
    <main>
      <section>
        <h1>Istanbul Grill</h1>

        <div className="project-box">
          <p>
            Projet réalisé pour un restaurant, avec une attention particulière
            portée à la présentation, à la clarté des informations et à
            l’expérience utilisateur.
          </p>

          <p>
            Le projet se concentre principalement sur la conception de l’interface et
            l’organisation des contenus, avec une attention particulière portée à la
            lisibilité et à la navigation. Une partie des données, comme les plats, est
            récupérée via un appel externe afin de rendre le contenu dynamique.
          </p>

          <p>
            Lors de la première visite, un léger temps de chargement peut être
            nécessaire afin de relancer le serveur distant.
          </p>
        </div>
      </section>

      <section>
        <h2>Technologies utilisées</h2>

        <div className="project-box">
          <p>HTML, CSS, JavaScript, Node.js</p>
        </div>
      </section>

      <section>
        <h2>Accès au projet</h2>

        <div className="project-links">
          <a
            href="https://istanbul-grill.vercel.app/"
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