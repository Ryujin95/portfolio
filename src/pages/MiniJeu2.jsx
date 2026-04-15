import { useEffect, useMemo, useRef, useState } from "react";
import "../css/MiniJeu2.css";

const GAME_WIDTH = 1000;
const GROUND_Y = 50;
const PLAYER_LEFT_START = 80;
const PLAYER_MOVE_STEP = 50;

const PLAYER_WIDTH = 90;
const PLAYER_HEIGHT = 90;
const PLAYER_CROUCH_HEIGHT = 60;

const JUMP_HEIGHT = 170;
const JUMP_UP_MS = 300;
const JUMP_DOWN_MS = 400;

const OBSTACLE_WIDTH = 50;
const OBSTACLE_HEIGHT = 90;
const HIGH_OBSTACLE_BOTTOM = 120;
const LOW_OBSTACLE_BOTTOM = 50;

const OBSTACLE_SPEED = 5;
const OBSTACLE_TICK_MS = 20;
const SPAWN_MS = 2000;
const GAME_DURATION = 60;

export default function MiniJeu2() {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(GAME_DURATION);
  const [isJumping, setIsJumping] = useState(false);
  const [isCrouching, setIsCrouching] = useState(false);
  const [playerBottom, setPlayerBottom] = useState(GROUND_Y);
  const [playerLeft, setPlayerLeft] = useState(PLAYER_LEFT_START);
  const [obstacles, setObstacles] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const obstacleIdRef = useRef(0);
  const spawnIntervalRef = useRef(null);
  const moveIntervalRef = useRef(null);
  const timerRef = useRef(null);
  const jumpTimeoutsRef = useRef([]);

  const playerBottomRef = useRef(GROUND_Y);
  const playerLeftRef = useRef(PLAYER_LEFT_START);
  const isCrouchingRef = useRef(false);
  const isJumpingRef = useRef(false);

  const playerHeight = isCrouching ? PLAYER_CROUCH_HEIGHT : PLAYER_HEIGHT;

  useEffect(() => {
    playerBottomRef.current = playerBottom;
  }, [playerBottom]);

  useEffect(() => {
    playerLeftRef.current = playerLeft;
  }, [playerLeft]);

  useEffect(() => {
    isCrouchingRef.current = isCrouching;
  }, [isCrouching]);

  useEffect(() => {
    isJumpingRef.current = isJumping;
  }, [isJumping]);

  const playerGif = useMemo(() => {
    if (isJumping) return "jump.gif";
    if (isCrouching) return "down.gif";
    return "run.gif";
  }, [isJumping, isCrouching]);

  const clearAllTimers = () => {
    if (spawnIntervalRef.current) {
      clearInterval(spawnIntervalRef.current);
      spawnIntervalRef.current = null;
    }

    if (moveIntervalRef.current) {
      clearInterval(moveIntervalRef.current);
      moveIntervalRef.current = null;
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    jumpTimeoutsRef.current.forEach((id) => clearTimeout(id));
    jumpTimeoutsRef.current = [];
  };

  const stopGame = () => {
    clearAllTimers();
    setIsRunning(false);
  };

  const resetGame = () => {
    clearAllTimers();
    setScore(0);
    setTime(GAME_DURATION);
    setIsJumping(false);
    setIsCrouching(false);
    setPlayerBottom(GROUND_Y);
    setPlayerLeft(PLAYER_LEFT_START);
    setObstacles([]);
    setIsGameOver(false);
    setIsRunning(false);
    obstacleIdRef.current = 0;

    playerBottomRef.current = GROUND_Y;
    playerLeftRef.current = PLAYER_LEFT_START;
    isCrouchingRef.current = false;
    isJumpingRef.current = false;
  };

  const startGame = () => {
    resetGame();
    setIsRunning(true);

    timerRef.current = window.setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearAllTimers();
          setIsRunning(false);
          setIsGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    spawnIntervalRef.current = window.setInterval(() => {
      setObstacles((prev) => [
        ...prev,
        {
          id: obstacleIdRef.current++,
          x: GAME_WIDTH,
          isHigh: Math.random() > 0.5,
        },
      ]);
    }, SPAWN_MS);

    moveIntervalRef.current = window.setInterval(() => {
      setObstacles((prev) => {
        let scoredCount = 0;
        let collided = false;

        const currentPlayerLeft = playerLeftRef.current;
        const currentPlayerBottom = playerBottomRef.current;
        const currentPlayerHeight = isCrouchingRef.current
          ? PLAYER_CROUCH_HEIGHT
          : PLAYER_HEIGHT;

        const nextObstacles = prev
          .map((obstacle) => {
            const nextX = obstacle.x - OBSTACLE_SPEED;

            const playerHitLeft = currentPlayerLeft + 24;
            const playerHitRight = currentPlayerLeft + PLAYER_WIDTH - 24;
            const playerHitBottom = currentPlayerBottom + 10;
            const playerHitTop = currentPlayerBottom + currentPlayerHeight - 10;

            const obstacleBottom = obstacle.isHigh
              ? HIGH_OBSTACLE_BOTTOM
              : LOW_OBSTACLE_BOTTOM;
            const obstacleTop = obstacleBottom + OBSTACLE_HEIGHT;

            const obstacleHitLeft = nextX + 8;
            const obstacleHitRight = nextX + OBSTACLE_WIDTH - 8;
            const obstacleHitBottom = obstacleBottom + 6;
            const obstacleHitTop = obstacleTop - 6;

            const isColliding =
              playerHitRight > obstacleHitLeft &&
              playerHitLeft < obstacleHitRight &&
              playerHitTop > obstacleHitBottom &&
              playerHitBottom < obstacleHitTop;

            if (isColliding) {
              collided = true;
            }

            return { ...obstacle, x: nextX };
          })
          .filter((obstacle) => {
            if (obstacle.x < -OBSTACLE_WIDTH) {
              scoredCount += 1;
              return false;
            }
            return true;
          });

        if (scoredCount > 0) {
          setScore((prevScore) => prevScore + scoredCount);
        }

        if (collided) {
          clearAllTimers();
          setIsRunning(false);
          setIsGameOver(true);
          return prev;
        }

        return nextObstacles;
      });
    }, OBSTACLE_TICK_MS);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
        event.preventDefault();
      }

      if (!isRunning || isGameOver) return;

      if (event.key === "ArrowUp" && !isJumpingRef.current) {
        setIsJumping(true);
        isJumpingRef.current = true;

        setPlayerBottom(JUMP_HEIGHT);
        playerBottomRef.current = JUMP_HEIGHT;

        const upTimeout = window.setTimeout(() => {
          setPlayerBottom(GROUND_Y);
          playerBottomRef.current = GROUND_Y;

          const downTimeout = window.setTimeout(() => {
            setIsJumping(false);
            isJumpingRef.current = false;
          }, JUMP_DOWN_MS);

          jumpTimeoutsRef.current.push(downTimeout);
        }, JUMP_UP_MS);

        jumpTimeoutsRef.current.push(upTimeout);
      }

      if (event.key === "ArrowDown") {
        setIsCrouching(true);
        isCrouchingRef.current = true;
      }

      if (event.key === "ArrowRight") {
        setPlayerLeft((prev) => {
          const next = Math.min(prev + PLAYER_MOVE_STEP, GAME_WIDTH - PLAYER_WIDTH);
          playerLeftRef.current = next;
          return next;
        });
      }

      if (event.key === "ArrowLeft") {
        setPlayerLeft((prev) => {
          const next = Math.max(prev - PLAYER_MOVE_STEP, 0);
          playerLeftRef.current = next;
          return next;
        });
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === "ArrowDown") {
        setIsCrouching(false);
        isCrouchingRef.current = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isRunning, isGameOver]);

  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, []);

  return (
    <main>
      <section>
        <h1>Mini Jeu 2</h1>
        <p>
          Runner 2D adapté en React pour travailler les déplacements, le saut,
          l’accroupissement, les collisions et la logique temps réel.
        </p>
      </section>

      <section>
        <div className="runner-actions">
          <button className="start_but" onClick={startGame} type="button">
            start / restart
          </button>

          <button className="stop_but" onClick={stopGame} type="button">
            stop
          </button>
        </div>

        <div className="runner-score">Score : {score}</div>
        <div className="runner-time">Temps : {time}s</div>

        <div className="runner-game">
          <div
            id="player"
            style={{
              left: `${playerLeft}px`,
              bottom: `${playerBottom}px`,
              width: `${PLAYER_WIDTH}px`,
              height: `${playerHeight}px`,
            }}
          >
            <img src={playerGif} alt="joueur" />
          </div>

          {obstacles.map((obstacle) => (
            <div
              key={obstacle.id}
              className={`obstacle ${obstacle.isHigh ? "high" : "low"}`}
              style={{
                left: `${obstacle.x}px`,
                width: `${OBSTACLE_WIDTH}px`,
                height: `${OBSTACLE_HEIGHT}px`,
                bottom: `${
                  obstacle.isHigh ? HIGH_OBSTACLE_BOTTOM : LOW_OBSTACLE_BOTTOM
                }px`,
              }}
            />
          ))}

          {isGameOver && (
            <div className="runner-overlay">
              <div className="runner-overlay-box">
                <h2>{time === 0 ? "Temps écoulé" : "Game Over"}</h2>
                <p>Score : {score}</p>
                <button className="start_but" onClick={startGame} type="button">
                  recommencer
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}