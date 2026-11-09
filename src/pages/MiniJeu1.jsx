import { useEffect, useRef, useState } from "react";
import useLanguage from "../i18n/useLanguage.js";
import "../css/MiniJeu1.css";

const GAME_DURATION = 60;
const SPAWN_EVERY_MS = 800;
const TARGET_LIFETIME_MS = 1000;
const TARGET_SIZE = 50;
const CONTAINER_WIDTH = 1000;
const CONTAINER_HEIGHT = 500;
const techBadges = ["CSS", "JavaScript", "React"];

export default function MiniJeu1() {
  const { t } = useLanguage();
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [targets, setTargets] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const spawnIntervalRef = useRef(null);
  const gameIntervalRef = useRef(null);
  const targetIdRef = useRef(0);

  const clearAllIntervals = () => {
    if (spawnIntervalRef.current) {
      clearInterval(spawnIntervalRef.current);
      spawnIntervalRef.current = null;
    }
    if (gameIntervalRef.current) {
      clearInterval(gameIntervalRef.current);
      gameIntervalRef.current = null;
    }
  };

  const removeTarget = (id) => {
    setTargets((prev) => prev.filter((target) => target.id !== id));
  };

  const spawnTarget = () => {
    const id = targetIdRef.current++;
    const top = Math.random() * (CONTAINER_HEIGHT - TARGET_SIZE);
    const left = Math.random() * (CONTAINER_WIDTH - TARGET_SIZE);
    setTargets((prev) => [...prev, { id, top, left }]);
    window.setTimeout(() => removeTarget(id), TARGET_LIFETIME_MS);
  };

  const stopGame = () => {
    clearAllIntervals();
    setIsRunning(false);
  };

  const startGame = () => {
    clearAllIntervals();
    setScore(0);
    setTime(GAME_DURATION);
    setTargets([]);
    setIsRunning(true);
    spawnIntervalRef.current = window.setInterval(spawnTarget, SPAWN_EVERY_MS);
    gameIntervalRef.current = window.setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearAllIntervals();
          setTargets([]);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const hitTarget = (id) => {
    if (!isRunning) return;
    removeTarget(id);
    setScore((prev) => prev + 1);
  };

  useEffect(() => () => clearAllIntervals(), []);

  return (
    <main>
      <section>
        <h1>{t("fps.title")}</h1>
        <div className="tech-badges">
          {techBadges.map((tech) => <span key={tech} className="badge">{tech}</span>)}
        </div>
        <p className="intro">{t("fps.intro")}</p>
        <p className="intro">{t("fps.instructions")}</p>
      </section>

      <section>
        <div className="game">
          <div className="game-buttons">
            <button className="start_but" onClick={startGame} type="button">
              {t("fps.start")}
            </button>
            <button className="stop_but" onClick={stopGame} type="button">
              {t("fps.stop")}
            </button>
          </div>

          <div className="game_info">
            <span className="score">{t("fps.score", { score })}</span>
            <span className="time">{t("fps.time", { seconds: time })}</span>
          </div>

          <div className="container">
            {!isRunning && time === 0 && score > 0 ? (
              <div className="end-message">
                {t("fps.finished")}
                <br />
                {t("fps.finalScore", { score })}
              </div>
            ) : null}

            {targets.map((target) => (
              <img
                key={target.id}
                src="/silly.jpg"
                alt={t("fps.targetAlt")}
                className="target"
                style={{
                  top: `${target.top}px`,
                  left: `${target.left}px`,
                  width: `${TARGET_SIZE}px`,
                  height: `${TARGET_SIZE}px`,
                  position: "absolute",
                }}
                onClick={() => hitTarget(target.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
