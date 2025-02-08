import {
  ALargeSmall,
  AlignCenter,
  AlignLeft,
  AlignRight,
  BetweenHorizonalStart,
  Camera,
  FoldHorizontal,
  Grid3X3,
  Highlighter,
  PilcrowLeft,
  PilcrowRight,
  Rabbit,
  TypeOutline,
} from "lucide-react";
import { useSettings } from "../context/SettingsContext";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { useState } from "react";

export const Header = () => {
  const [showMore, setShowMore] = useState(false);
  const {
    fontSize,
    setFontSize,
    hMargin,
    setHMargin,
    lineSpacing,
    setLineSpacing,
    speed,
    setSpeed,
    showIndicator,
    setShowIndicator,
    showCamera,
    setShowCamera,
    showGrid,
    setShowGrid,
    showTeleprompter,
    setShowTeleprompter,
    setTextAlign,
    setDirection,
  } = useSettings();
  return (
    <div className="absolute top-0 left-0 z-50 flex w-screen flex-col items-center justify-center bg-black/90 px-2 py-4 text-white">
      <div className="flex items-center gap-6">
        <Button>Edit text</Button>
        <Button onClick={() => setShowMore(!showMore)}>Show more</Button>
        <div className="flex items-center gap-1">
          <Rabbit className="text-sm" />
          <Slider
            min={1}
            max={40}
            step={1}
            value={[speed]}
            onValueChange={(v) => setSpeed(v[0])}
          />
        </div>
        <div className="flex items-center gap-1">
          <Highlighter className="text-sm" />
          <Switch checked={showIndicator} onCheckedChange={setShowIndicator} />
        </div>
        <div className="flex items-center gap-1">
          <Camera className="text-sm" />
          <Switch checked={showCamera} onCheckedChange={setShowCamera} />
        </div>
        <div className="flex items-center gap-1">
          <Grid3X3 className="text-sm" />
          <Switch checked={showGrid} onCheckedChange={setShowGrid} />
        </div>
        <div className="flex items-center gap-1">
          <TypeOutline className="text-sm" />
          <Switch
            checked={showTeleprompter}
            onCheckedChange={setShowTeleprompter}
          />
        </div>
      </div>
      {showMore && (
        <div className="mt-2 flex items-center gap-6">
          <div className="flex items-center gap-1">
            <ALargeSmall className="text-sm" />
            <Slider
              min={32}
              max={128}
              value={[fontSize]}
              onValueChange={(v) => setFontSize(v[0])}
            />
          </div>
          <div className="flex items-center gap-1">
            <FoldHorizontal className="text-sm" />
            <Slider
              min={0}
              max={600}
              value={[hMargin]}
              onValueChange={(v) => setHMargin(v[0])}
            />
          </div>
          <div className="flex items-center gap-1">
            <BetweenHorizonalStart className="text-sm" />
            <Slider
              min={1}
              max={3}
              step={0.1}
              value={[lineSpacing]}
              onValueChange={(v) => setLineSpacing(v[0])}
            />
          </div>
          <div className="flex items-center gap-1">
            <Button>
              <AlignLeft
                className="text-sm"
                onClick={() => setTextAlign("left")}
              />
            </Button>
            <Button>
              <AlignCenter
                className="text-sm"
                onClick={() => setTextAlign("center")}
              />
            </Button>
            <Button>
              <AlignRight
                className="text-sm"
                onClick={() => setTextAlign("right")}
              />
            </Button>
          </div>
          <div className="flex items-center gap-1">
            <Button>
              <PilcrowRight
                className="text-sm"
                onClick={() => setDirection("ltr")}
              />
            </Button>
            <Button>
              <PilcrowLeft
                className="text-sm"
                onClick={() => setDirection("rtl")}
              />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
