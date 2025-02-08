import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";

export function Teleprompter() {
  const [text, setText] = useState("Enter your script here...");
  const [locked, setLocked] = useState(false);
  const [fontSize, setFontSize] = useState(24);
  const [vMargin, setVMargin] = useState(20);
  const [hMargin, setHMargin] = useState(20);
  const [lineSpacing, setLineSpacing] = useState(1.5);
  const [textAlign, setTextAlign] = useState("center");
  const [direction, setDirection] = useState("ltr");
  const [speed, setSpeed] = useState(1);
  const [scrolling, setScrolling] = useState(false);
  const [showIndicator, setShowIndicator] = useState(true);

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
    <div className="flex w-full flex-col items-center space-y-4 p-4">
      {/* Text Input */}
      {!locked ? (
        <textarea
          className="h-40 w-full rounded-md border p-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      ) : null}

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <Button onClick={() => setLocked(!locked)}>
          {locked ? "Unlock" : "Lock"}
        </Button>
        <div className="flex items-center gap-2">
          <span>Font</span>
          <Slider
            min={16}
            max={72}
            value={[fontSize]}
            onValueChange={(v) => setFontSize(v[0])}
          />
        </div>
        <div className="flex items-center gap-2">
          <span>V-Margin</span>
          <Slider
            min={0}
            max={100}
            value={[vMargin]}
            onValueChange={(v) => setVMargin(v[0])}
          />
        </div>
        <div className="flex items-center gap-2">
          <span>H-Margin</span>
          <Slider
            min={0}
            max={100}
            value={[hMargin]}
            onValueChange={(v) => setHMargin(v[0])}
          />
        </div>
        <div className="flex items-center gap-2">
          <span>Line Space</span>
          <Slider
            min={1}
            max={3}
            step={0.1}
            value={[lineSpacing]}
            onValueChange={(v) => setLineSpacing(v[0])}
          />
        </div>
        <div className="flex items-center gap-2">
          <span>Speed</span>
          <Slider
            min={0}
            max={10}
            value={[speed]}
            onValueChange={(v) => setSpeed(v[0])}
          />
        </div>
        <div className="flex items-center gap-2">
          <span>Align</span>
          <select
            className="rounded-md border p-1"
            value={textAlign}
            onChange={(e) => setTextAlign(e.target.value)}
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span>Direction</span>
          <select
            className="rounded-md border p-1"
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
          >
            <option value="ltr">LTR</option>
            <option value="rtl">RTL</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span>Indicator</span>
          <Switch checked={showIndicator} onCheckedChange={setShowIndicator} />
        </div>
        <Button
          onClick={() => {
            setScrolling((prev) => {
              if (prev) {
                stopScrolling();
              } else {
                startScrolling();
              }
              return !prev;
            });
          }}
        >
          {scrolling ? "Pause" : "Play"}
        </Button>
      </div>

      {/* Teleprompter View */}
      <div
        ref={scrollRef}
        className="relative h-[400px] w-full overflow-hidden rounded-md border bg-black text-white"
        style={{ paddingTop: `${vMargin}px`, paddingBottom: `${vMargin}px` }}
      >
        {showIndicator && (
          <div className="absolute top-1/2 left-0 h-[2px] w-full bg-red-500"></div>
        )}
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
          {text.split("\n").map((line, index) => (
            <p key={index} className="my-2">
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
