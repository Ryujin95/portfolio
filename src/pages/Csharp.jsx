import "../css/Csharp.css";

const techBadges = ["C#", "ASP.NET Core", "Razor", "PostgreSQL", "SignalR", "Telerik", "Docker", "Entity Framework"];

export default function ProjetCSharp() {
  return (
    <main>
      <section>
        <h1>Application de gestion de contenus</h1>

        <div className="tech-badges">
          {techBadges.map((tech) => (
            <span key={tech} className="badge">{tech}</span>
          ))}
        </div>

        <div className="about-box">
          <p>
            Projet réalisé en stage chez Akira, une entreprise spécialisée dans
            la conception de logiciels professionnels. L'application est destinée
            aux entreprises de pompes funèbres et permet de centraliser toutes
            les informations utiles à leur activité.
          </p>

          <p>
            C# était un langage que je ne connaissais pas avant ce stage. J'ai
            dû m'adapter rapidement à l'environnement de l'entreprise, apprendre
            la technologie en autonomie et livrer une fonctionnalité complète
            dans le délai imparti.
          </p>

          <p>
            On m'a confié la création d'un système permettant de gérer des
            répertoires, des pages et des topics (contenus textuels enrichis),
            avec une interface dynamique, un chargement progressif des données
            et une synchronisation en temps réel via SignalR.
          </p>
        </div>
      </section>

      <section>
        <h2>Fonctionnalités développées</h2>

        <ul className="project-features">
          <li>Gestion complète CRUD des répertoires, pages et topics</li>
          <li>Chargement progressif et système de cache local pour les topics</li>
          <li>Navigation par onglets avec Telerik TabStrip</li>
          <li>Recherche par mot-clé avec affichage du chemin complet (Répertoire / Page / Topic)</li>
          <li>Synchronisation en temps réel via SignalR</li>
          <li>Gestion des rôles : certaines actions réservées aux modérateurs</li>
          <li>Formulaires dynamiques avec ObjectProxy et éditeur de texte enrichi</li>
        </ul>
      </section>

      <section>
        <h2>Architecture technique</h2>

        <div className="about-box">
          <p>
            L'application repose sur une architecture modulaire avec une
            séparation claire des responsabilités : couche Domaines pour les
            entités, Services pour la logique métier, et Contrôleurs pour
            exposer les endpoints API.
          </p>

          <p>
            La base de données PostgreSQL est hébergée via Docker. Les schémas
            ont été générés automatiquement à partir des entités C# avec Entity
            Framework. Le versionnement du code a été géré avec Git sur Azure
            DevOps, avec des commits réguliers et des messages explicites.
          </p>
        </div>
      </section>

      <section>
        <h2>Accès au dossier</h2>

        <div className="project-links">
          
          <a  href="/projet.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="project-link-button"
          >
            Voir le dossier complet
          </a>
        </div>
      </section>
    </main>
  );
}