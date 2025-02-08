import {
  ALargeSmall,
  AlignCenter,
  AlignLeft,
  AlignRight,
  BetweenHorizonalStart,
  Camera,
  FoldHorizontal,
  FoldVertical,
  Grid3X3,
  Highlighter,
  PilcrowLeft,
  PilcrowRight,
  Rabbit,
} from "lucide-react";
import { useSettings } from "../context/SettingsContext";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";

export const Header = () => {
  const {
    fontSize,
    setFontSize,
    vMargin,
    setVMargin,
    hMargin,
    setHMargin,
    lineSpacing,
    setLineSpacing,
    speed,
    setSpeed,
    showIndicator,
    setShowIndicator,
    cameraPreview,
    setCameraPreview,
    grid,
    setGrid,
  } = useSettings();
  return (
    <div className="fixed top-0 left-0 z-50 flex w-screen items-center justify-center bg-black/90 px-2 py-4 text-white">
      <div className="flex items-center gap-6">
        <Button>Edit text</Button>
        <div className="flex items-center gap-1">
          <ALargeSmall className="text-sm" />
          <Slider
            min={32}
            max={96}
            value={[fontSize]}
            onValueChange={(v) => setFontSize(v[0])}
          />
        </div>
        <div className="flex items-center gap-1">
          <FoldVertical className="text-sm" />
          <Slider
            min={0}
            max={300}
            value={[vMargin]}
            onValueChange={(v) => setVMargin(v[0])}
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
          <Button>
            <AlignLeft className="text-sm" />
          </Button>
          <Button>
            <AlignCenter className="text-sm" />
          </Button>
          <Button>
            <AlignRight className="text-sm" />
          </Button>
        </div>
        <div className="flex items-center gap-1">
          <Button>
            <PilcrowRight className="text-sm" />
          </Button>
          <Button>
            <PilcrowLeft className="text-sm" />
          </Button>
        </div>
        <div className="flex items-center gap-1">
          <Highlighter className="text-sm" />
          <Switch checked={showIndicator} onCheckedChange={setShowIndicator} />
        </div>
        <div className="flex items-center gap-1">
          <Camera className="text-sm" />
          <Switch checked={cameraPreview} onCheckedChange={setCameraPreview} />
        </div>
        <div className="flex items-center gap-1">
          <Grid3X3 className="text-sm" />
          <Switch checked={grid} onCheckedChange={setGrid} />
        </div>
      </div>
    </div>
  );
};
