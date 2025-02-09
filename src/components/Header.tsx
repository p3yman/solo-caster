import {
  ALargeSmall,
  AlignCenter,
  AlignLeft,
  AlignRight,
  BetweenHorizonalStart,
  Camera,
  FoldHorizontal,
  Pause,
  PilcrowLeft,
  PilcrowRight,
  Play,
  Rabbit,
  Settings,
  SquarePen,
  Turtle,
} from "lucide-react";
import { useSettings } from "../context/SettingsContext";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Textarea } from "./ui/textarea";
import { CameraSelector } from "./CameraSelector";
import { OBSConnection } from "./OBSConnection";

export const Header = () => {
  const {
    content,
    setContent,
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
    textAlign,
    setTextAlign,
    direction,
    setDirection,
    scrolling,
    setScrolling,
  } = useSettings();
  return (
    <>
      <div className="absolute left-0 top-0 z-50 flex w-screen flex-col items-center justify-center border-b border-white/10 bg-black/90 px-2 py-4 text-white">
        <div className="flex items-center gap-4">
          <Button onClick={() => setScrolling(!scrolling)} size="icon">
            {scrolling ? <Pause /> : <Play />}
          </Button>
          <div className="flex items-center gap-2">
            <Turtle className="text-sm" />
            <Slider
              defaultValue={[speed]}
              min={5}
              max={40}
              step={1}
              onValueChange={(v) => setSpeed(v[0])}
              className="w-32"
            />
            <Rabbit className="text-sm" />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="showCamera"
              checked={showCamera}
              onCheckedChange={setShowCamera}
            />
            <Label htmlFor="showCamera">Camera</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="showTeleprompter"
              checked={showTeleprompter}
              onCheckedChange={setShowTeleprompter}
            />
            <Label htmlFor="showTeleprompter">Telepromter</Label>
          </div>
          <div className="flex gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <SquarePen className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[800px] !max-w-[90%]">
                <SheetHeader>
                  <SheetTitle>Edit content</SheetTitle>
                  <SheetDescription></SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <Textarea
                    rows={21}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    dir="auto"
                  />
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button type="submit">Save changes</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
            <OBSConnection />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Settings className="size-5" />
                  More settings
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>More settings</SheetTitle>
                  <SheetDescription></SheetDescription>
                </SheetHeader>
                <div className="grid gap-6 py-4">
                  <div className="grid gap-2">
                    <Label className="flex items-center gap-2">
                      <Camera className="size-5" />
                      Camera
                    </Label>
                    <CameraSelector />
                  </div>
                  <div className="grid gap-2">
                    <Label className="flex items-center gap-2">
                      <ALargeSmall className="size-5" />
                      Font Size
                    </Label>
                    <Slider
                      min={32}
                      max={128}
                      value={[fontSize]}
                      onValueChange={(v) => setFontSize(v[0])}
                      className="w-full"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className="flex items-center gap-2">
                      <FoldHorizontal className="size-5" />
                      Horizontal Margin
                    </Label>
                    <Slider
                      min={0}
                      max={600}
                      value={[hMargin]}
                      onValueChange={(v) => setHMargin(v[0])}
                      className="w-full"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className="flex items-center gap-2">
                      <BetweenHorizonalStart className="size-5" />
                      Line Spacing
                    </Label>
                    <Slider
                      min={1}
                      max={3}
                      step={0.1}
                      value={[lineSpacing]}
                      onValueChange={(v) => setLineSpacing(v[0])}
                      className="w-full"
                    />
                  </div>
                  <div className="grid grid-cols-2 items-start">
                    <div className="grid items-start gap-2">
                      <Label className="flex items-center gap-2">
                        Text Alignment
                      </Label>
                      <ToggleGroup
                        type="single"
                        value={textAlign}
                        onValueChange={setTextAlign}
                        className="justify-start"
                      >
                        <ToggleGroupItem value="left">
                          <AlignLeft className="size-5" />
                        </ToggleGroupItem>
                        <ToggleGroupItem value="center">
                          <AlignCenter className="size-5" />
                        </ToggleGroupItem>
                        <ToggleGroupItem value="right">
                          <AlignRight className="size-5" />
                        </ToggleGroupItem>
                      </ToggleGroup>
                    </div>
                    <div className="grid gap-2">
                      <Label className="flex items-center gap-2">
                        Direction
                      </Label>
                      <ToggleGroup
                        type="single"
                        value={direction}
                        onValueChange={setDirection}
                        className="justify-start"
                      >
                        <ToggleGroupItem value="ltr">
                          <PilcrowRight className="size-5" />
                        </ToggleGroupItem>
                        <ToggleGroupItem value="rtl">
                          <PilcrowLeft className="size-5" />
                        </ToggleGroupItem>
                      </ToggleGroup>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="showGrid"
                      checked={showGrid}
                      onCheckedChange={setShowGrid}
                    />
                    <Label htmlFor="showGrid">Show Grid</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="showIndicator"
                      checked={showIndicator}
                      onCheckedChange={setShowIndicator}
                    />
                    <Label htmlFor="showIndicator">Show Indicator</Label>
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button>Close</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </>
  );
};
