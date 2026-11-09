import { useEffect, useRef, useState } from "react";
import "../css/CustomCursor.css";

const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const FOLLOW_FACTOR = 0.16;
const SETTLE_DISTANCE = 0.08;

function CustomCursor() {
  const dotRef = useRef(null);
  const haloRef = useRef(null);
  const [isEnabled, setIsEnabled] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia(FINE_POINTER_QUERY).matches,
  );
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia(FINE_POINTER_QUERY);
    const handlePointerPreferenceChange = (event) => {
      setIsVisible(false);
      setIsEnabled(event.matches);
    };

    finePointer.addEventListener("change", handlePointerPreferenceChange);
    return () => {
      finePointer.removeEventListener("change", handlePointerPreferenceChange);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) return undefined;

    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let hasPointerPosition = false;
    let animationFrame = 0;

    const setPosition = (element, x, y) => {
      if (!element) return;
      element.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const animateHalo = () => {
      animationFrame = 0;

      if (reducedMotion.matches) {
        currentX = targetX;
        currentY = targetY;
        setPosition(haloRef.current, currentX, currentY);
        return;
      }

      currentX += (targetX - currentX) * FOLLOW_FACTOR;
      currentY += (targetY - currentY) * FOLLOW_FACTOR;
      setPosition(haloRef.current, currentX, currentY);

      const distance = Math.hypot(targetX - currentX, targetY - currentY);
      if (distance > SETTLE_DISTANCE) {
        animationFrame = window.requestAnimationFrame(animateHalo);
      }
    };

    const handlePointerMove = (event) => {
      if (event.pointerType && event.pointerType !== "mouse" && event.pointerType !== "pen") {
        return;
      }

      targetX = event.clientX;
      targetY = event.clientY;
      setPosition(dotRef.current, targetX, targetY);
      setIsVisible(true);

      if (!hasPointerPosition) {
        currentX = targetX;
        currentY = targetY;
        hasPointerPosition = true;
        setPosition(haloRef.current, currentX, currentY);
      }

      if (reducedMotion.matches) {
        currentX = targetX;
        currentY = targetY;
        setPosition(haloRef.current, currentX, currentY);
        return;
      }

      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(animateHalo);
      }
    };

    const hideCursor = () => setIsVisible(false);
    const handlePointerLeave = (event) => {
      if (!event.relatedTarget) hideCursor();
    };

    document.body.classList.add("custom-cursor-enabled");
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("blur", hideCursor);
    document.addEventListener("pointerout", handlePointerLeave);

    return () => {
      document.body.classList.remove("custom-cursor-enabled");
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", hideCursor);
      document.removeEventListener("pointerout", handlePointerLeave);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <>
      <div
        ref={haloRef}
        className={`custom-cursor-halo${isVisible ? " is-visible" : ""}`}
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className={`custom-cursor-dot${isVisible ? " is-visible" : ""}`}
        aria-hidden="true"
      />
    </>
  );
}

export default CustomCursor;
