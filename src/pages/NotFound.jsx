import { Link } from "react-router-dom";
import useLanguage from "../i18n/useLanguage.js";
import styles from "./NotFound.module.css";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <main>
      <section className={styles.content} aria-labelledby="not-found-title">
        <h1 id="not-found-title">{t("notFound.title")}</h1>
        <p>{t("notFound.description")}</p>
        <Link to="/">{t("notFound.home")}</Link>
      </section>
    </main>
  );
}
