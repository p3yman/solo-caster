import { useRef, useEffect, useCallback, useContext } from "react";
import { useSettings } from "../context/SettingsContext";
import { SheetContext } from "@/App";

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
    scrolling,
    setScrolling,
  } = useSettings();
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastFrameTime = useRef<number>(0);
  const rafId = useRef<number | null>(null);

  const effectiveSpeed = speed * 0.15;

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
  const {sheetOn} = useContext(SheetContext);


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " && !sheetOn) {
        if (scrolling) {
          stopScrolling();
        } else {
          startScrolling();
        }
        setScrolling(!scrolling);
      }
      if (e.key === "ArrowUp" && !sheetOn) {
        scrollRef.current?.scrollBy({ top: -20 });
      }
      if (e.key === "ArrowDown" && !sheetOn) {
        scrollRef.current?.scrollBy({ top: 20 });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [scrolling, setScrolling, startScrolling]);

  useEffect(() => {
    if (scrolling) {
      startScrolling();
    } else {
      stopScrolling();
    }

    return () => {
      stopScrolling();
    };
  }, [scrolling, startScrolling]);

  return (
    <div className="relative h-full w-full">
      {showIndicator && (
        <div className="absolute left-0 top-1/2 -z-0 -mt-10 h-20 w-full bg-red-500/15"></div>
      )}
      <div
        ref={scrollRef}
        className="relative h-full w-full overflow-y-auto overflow-x-hidden text-white"
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
            paddingTop: `calc(35% - ${fontSize}px)`,
            paddingBottom: `calc(35% - ${fontSize}px)`,
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
