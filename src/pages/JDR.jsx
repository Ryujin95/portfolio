import { useState, useEffect } from "react";
import "../css/JDR.css";

const images = [
  "/jdr1.png",
  "/jdr2.png",
  "/jdr3.png",
  "/jdr4.png",
];

const techBadges = ["React", "Symfony", "API REST", "JWT", "WebSockets", "MySQL"];

export default function JDR() {
  const [current, setCurrent] = useState(0);
  const [zoomed, setZoomed] = useState(null);
  const [isAuto, setIsAuto] = useState(true);

  useEffect(() => {
    if (!isAuto) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAuto]);

  useEffect(() => {
    if (!zoomed) return;
    const handleKey = (e) => {
      if (e.key === "Escape") setZoomed(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [zoomed]);

  const next = () => setCurrent((prev) => (prev + 1) % images.length);
  const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  const handleNav = (fn) => {
    fn();
    setIsAuto(false);
  };

  return (
    <main>
      <section>
        <h1>Application JDR</h1>

        <div className="tech-badges">
          {techBadges.map((tech) => (
            <span key={tech} className="badge">{tech}</span>
          ))}
        </div>

        <div className="about-box">
          <p>
            Cette application JDR a pour objectif de reproduire une expérience
            de jeu de rôle complète en ligne, permettant aux joueurs de
            participer à une campagne sans avoir besoin d'être physiquement
            ensemble.
          </p>

          <p>
            L'application centralise tous les éléments nécessaires au jeu :
            communication entre les joueurs, gestion des personnages, relations
            entre personnages et suivi de l'histoire.
          </p>

          <p>
            Contrairement à une organisation classique où plusieurs outils sont
            utilisés (Discord pour discuter, applications de dés, cartes
            externes), cette application regroupe tout au même endroit pour
            offrir une expérience plus fluide et immersive.
          </p>

          <p>
            Elle intègre notamment un système de chat, un mur d'informations
            permettant de suivre les relations entre personnages, ainsi qu'un
            système de visibilité des informations. Chaque joueur ne voit que ce
            que son personnage est censé connaître, ce qui renforce le réalisme
            du jeu.
          </p>

          <p>
            L'objectif est de permettre au maître du jeu de gérer facilement la
            partie, tout en offrant aux joueurs une expérience dynamique avec
            des interactions en temps réel comme les déplacements sur carte ou
            les lancers de dés virtuels.
          </p>
        </div>
      </section>

      <section>
        <h2>Interface de l'application</h2>

        <div className="slider">
          <button
            onClick={() => handleNav(prev)}
            className="slider-btn left"
            type="button"
          >
            ‹
          </button>

          <img
            src={images[current]}
            alt={`Capture d'écran ${current + 1} de l'application JDR`}
            onClick={() => {
              setZoomed(images[current]);
              setIsAuto(false);
            }}
          />

          <button
            onClick={() => handleNav(next)}
            className="slider-btn right"
            type="button"
          >
            ›
          </button>
        </div>

        <div className="slider-dots">
          {images.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === current ? "active" : ""}`}
              onClick={() => { setCurrent(i); setIsAuto(false); }}
              type="button"
              aria-label={`Image ${i + 1}`}
            />
          ))}
        </div>
      </section>

      <section>
        <h2>État du projet</h2>

        <div className="project-status">
          <div className="status-block">
            <h3>✅ Réalisé</h3>
            <ul>
              <li>Structure frontend React</li>
              <li>Backend Symfony avec API REST</li>
              <li>Gestion des utilisateurs et des rôles</li>
              <li>Système de personnages</li>
              <li>Relations entre personnages</li>
              <li>Synchronisation des données en temps réel</li>
            </ul>
          </div>

          <div className="status-block">
            <h3>🔄 En cours</h3>
            <ul>
              <li>Amélioration de l'interface utilisateur</li>
              <li>Optimisation des performances</li>
              <li>Ajout de nouvelles interactions entre joueurs</li>
              <li>Système de lancers de dés virtuels</li>
            </ul>
          </div>

          <div className="status-block">
            <h3>⏳ À venir</h3>
            <ul>
              <li>Système de chat en temps réel</li>
              <li>Gestion avancée des campagnes</li>
              <li>Amélioration de l'expérience mobile</li>
              <li>Déploiement complet de l'application</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2>Fonctionnement et choix techniques</h2>

        <div className="about-box">
          <p>
            L'application repose sur une séparation claire entre le frontend et
            le backend, afin de garantir une bonne organisation du code et une
            évolution possible dans le temps.
          </p>

          <p>
            Le frontend a été développé avec React afin de proposer une interface
            dynamique et réactive, notamment pour les interactions entre les
            joueurs et les mises à jour en temps réel.
          </p>

          <p>
            Le backend utilise Symfony pour structurer l'application et gérer les
            données, les utilisateurs et les règles du jeu via une API REST.
          </p>

          <p>
            Cette organisation permet de garder une application propre,
            maintenable et capable d'évoluer facilement avec de nouvelles
            fonctionnalités.
          </p>
        </div>
      </section>

      <section>
        <h2>Sécurité et gestion des accès</h2>

        <div className="about-box">
          <p>
            L'application repose sur un système de rôles permettant de contrôler
            les actions de chaque utilisateur et de limiter l'accès aux
            fonctionnalités sensibles.
          </p>

          <p>
            Chaque action est vérifiée afin d'éviter les manipulations non
            autorisées, notamment sur les données liées aux personnages, aux
            relations et au déroulement de la partie.
          </p>

          <p>
            Les échanges entre le frontend et le backend sont contrôlés afin de
            garantir la validité et la cohérence des données envoyées.
          </p>

          <p>
            L'authentification des utilisateurs est basée sur un système de
            tokens JWT, permettant de sécuriser les accès et les communications
            au sein de l'application.
          </p>
        </div>
      </section>

      {zoomed && (
        <div className="zoom-overlay" onClick={() => setZoomed(null)}>
          <img src={zoomed} alt="Agrandissement de l'application JDR" />
        </div>
      )}
    </main>
  );
}
