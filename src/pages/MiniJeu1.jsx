import { useEffect, useRef, useState } from "react";
import "../css/MiniJeu1.css";

export default function MiniJeu1() {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [targets, setTargets] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const spawnIntervalRef = useRef(null);
  const gameIntervalRef = useRef(null);
  const targetIdRef = useRef(0);

  const GAME_DURATION = 60;
  const SPAWN_EVERY_MS = 800;
  const TARGET_LIFETIME_MS = 1000;
  const TARGET_SIZE = 50;
  const CONTAINER_WIDTH = 1000;
  const CONTAINER_HEIGHT = 500;

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

    const newTarget = {
      id,
      top,
      left,
    };

    setTargets((prev) => [...prev, newTarget]);

    window.setTimeout(() => {
      removeTarget(id);
    }, TARGET_LIFETIME_MS);
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

    spawnIntervalRef.current = window.setInterval(() => {
      spawnTarget();
    }, SPAWN_EVERY_MS);

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

  useEffect(() => {
    return () => {
      clearAllIntervals();
    };
  }, []);

  return (
    <main>
      <section>
        <h1>Mini Jeu 1</h1>
        <p className="intro">
          Mini-jeu réalisé en JavaScript puis adapté en React pour travailler la
          logique interactive, la gestion du temps et les événements utilisateur.
        </p>
      </section>

      <section>
        <div className="game">
<div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
  <button className="start_but" onClick={startGame} type="button">
    start / restart
  </button>

  <button className="stop_but" onClick={stopGame} type="button">
    stop
  </button>
</div>

          <div className="game_info">
            <span className="score">score : {score}</span>
            <span className="time">temps : {time}</span>
          </div>

          <div className="container">
            {!isRunning && time === 0 && score > 0 ? (
              <div className="end-message">
                Le jeu est fini
                <br />
                Votre score est de {score}
              </div>
            ) : null}

            {targets.map((target) => (
              <img
                key={target.id}
                src="/silly.jpg"
                alt="cible"
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