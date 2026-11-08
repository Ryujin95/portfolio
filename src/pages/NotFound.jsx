import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <main>
      <section className={styles.content} aria-labelledby="not-found-title">
        <h1 id="not-found-title">Page introuvable</h1>
        <p>La page demandée n’existe pas ou n’est plus disponible.</p>
        <Link to="/">Retour à l’accueil</Link>
      </section>
    </main>
  );
}
