import { useRef, useEffect, useCallback, useState } from "react";
import { useSettings } from "../context/SettingsContext";

export function Teleprompter() {
  const {
    content,
    speed,
    vMargin,
    hMargin,
    fontSize,
    lineSpacing,
    textAlign,
    direction,
    showIndicator,
  } = useSettings();

  const [, setScrolling] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastFrameTime = useRef<number>(0);
  const rafId = useRef<number | null>(null);

  const effectiveSpeed = speed * 0.2;

  const animateScroll = useCallback(
    (timestamp: number) => {
      if (!scrollRef.current) return;

      if (!lastFrameTime.current) lastFrameTime.current = timestamp;

      const deltaTime = (timestamp - lastFrameTime.current) / 1000;
      lastFrameTime.current = timestamp;

      const scrollAmount = effectiveSpeed * deltaTime * 60;
      scrollRef.current.scrollBy({ top: scrollAmount });

      rafId.current = requestAnimationFrame(animateScroll);
    },
    [effectiveSpeed],
  );

  const startScrolling = useCallback(() => {
    if (rafId.current) return;
    lastFrameTime.current = performance.now();
    rafId.current = requestAnimationFrame(animateScroll);
  }, [animateScroll]);

  const stopScrolling = () => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " ") {
        e.preventDefault();
        setScrolling((prev) => {
          if (prev) {
            stopScrolling();
          } else {
            startScrolling();
          }
          return !prev;
        });
      }
      if (e.key === "ArrowUp") {
        scrollRef.current?.scrollBy({ top: -20 });
      }
      if (e.key === "ArrowDown") {
        scrollRef.current?.scrollBy({ top: 20 });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [startScrolling]);

  return (
    <div className="relative h-full w-full">
      {showIndicator && (
        <div className="absolute top-1/2 left-0 -z-0 -mt-10 h-20 w-full bg-red-500/15"></div>
      )}
      <div
        ref={scrollRef}
        className="relative h-full w-full overflow-x-hidden overflow-y-auto text-white"
        style={{ paddingTop: `${vMargin}px`, paddingBottom: `${vMargin}px` }}
      >
        <div
          className="w-full text-center"
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: `${lineSpacing}`,
            textAlign,
            direction,
            paddingLeft: `${hMargin}px`,
            paddingRight: `${hMargin}px`,
            paddingTop: `calc(35% - ${fontSize}px)`, // Push first line below center
          }}
        >
          {content.split("\n").map((line, index) => (
            <p key={index} className="my-2">
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
