import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useLanguage from "../i18n/useLanguage.js";

const routeMetadata = {
  "/": "home",
  "/jdr": "jdr",
  "/istanbulGrill": "istanbul",
  "/csharp": "csharp",
  "/mini-jeu-1": "fps",
  "/mini-jeu-2": "runner",
};

export default function PageMetadata() {
  const { pathname } = useLocation();
  const { t } = useLanguage();
  const page = routeMetadata[pathname] ?? "notFound";

  useEffect(() => {
    document.title = t(`meta.${page}.title`);

    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement("meta");
      description.name = "description";
      document.head.append(description);
    }
    description.content = t(`meta.${page}.description`);
  }, [page, t]);

  return null;
}
