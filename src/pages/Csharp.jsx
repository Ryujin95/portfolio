import "../css/Csharp.css"
export default function ProjetCSharp() {
  return (
    <main>
      <section>
        <h1>Application de gestion de contenus</h1>

        <div className="project-card">
          <p>
            Application développée en C# avec ASP.NET Core et Razor, permettant
            de structurer et gérer des contenus organisés en répertoires, pages
            et topics.
          </p>

          <p>
            Le projet repose sur une architecture modulaire avec séparation des
            responsabilités (Domaines, Services, Contrôleurs) et une gestion des
            données via PostgreSQL.
          </p>

          <p>
            L’interface a été conçue pour être dynamique et fluide, avec un
            chargement progressif des données et une mise à jour en temps réel.
          </p>
        </div>
      </section>

      <section>
        <h2>Fonctionnalités principales</h2>

        <div className="project-features">
          <p>• Gestion complète CRUD (répertoires, pages, contenus)</p>
          <p>• Chargement dynamique et optimisation des performances</p>
          <p>• Navigation structurée avec onglets</p>
          <p>• Synchronisation en temps réel via SignalR</p>
        </div>
      </section>

      <section>
        <h2>Technologies utilisées</h2>

        <div className="project-tech">
          <p>C#, ASP.NET Core, Razor, PostgreSQL, SignalR</p>
        </div>
      </section>

      <section>
        <h2>Accès au projet</h2>

        <div className="project-links">
          <a
            href="/projet.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            Voir le dossier complet
          </a>
        </div>
      </section>
    </main>
  );
}