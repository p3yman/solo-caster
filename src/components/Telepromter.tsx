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
  const [scrolling, setScrolling] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<unknown | null>(null);

  const startScrolling = useCallback(() => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ top: speed, behavior: "smooth" });
      }
    }, 50);
  }, [speed]);

  const stopScrolling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
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
        scrollRef.current?.scrollBy({ top: -20, behavior: "smooth" });
      }
      if (e.key === "ArrowDown") {
        scrollRef.current?.scrollBy({ top: 20, behavior: "smooth" });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [startScrolling]);

  return (
    <div className="relative flex h-full w-full flex-col items-center space-y-4 p-4">
      {showIndicator && (
        <div className="absolute top-1/2 left-0 z-50 -mt-10 h-20 w-full bg-red-500/15"></div>
      )}
      <div
        ref={scrollRef}
        className="relative h-full w-full overflow-hidden text-white"
        style={{ paddingTop: `${vMargin}px`, paddingBottom: `${vMargin}px` }}
      >
        <div
          className="w-full text-center"
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: `${lineSpacing}`,
            textAlign: textAlign as "left" | "center" | "right",
            direction: direction as "ltr" | "rtl",
            paddingLeft: `${hMargin}px`,
            paddingRight: `${hMargin}px`,
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
