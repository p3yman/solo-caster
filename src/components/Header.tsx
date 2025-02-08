import {
  ALargeSmall,
  AlignCenter,
  AlignLeft,
  AlignRight,
  BetweenHorizonalStart,
  FoldHorizontal,
  PilcrowLeft,
  PilcrowRight,
  Rabbit,
  Turtle,
} from "lucide-react";
import { useSettings } from "../context/SettingsContext";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { useState } from "react";
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

export const Header = () => {
  const [showMore, setShowMore] = useState(false);
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
  } = useSettings();
  return (
    <>
      <div className="absolute left-0 top-0 z-50 flex w-screen flex-col items-center justify-center border-b border-white/10 bg-black/90 px-2 py-4 text-white">
        <div className="flex items-center gap-6">
          {/* Edit content */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Edit content</Button>
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
              id="showIndicator"
              checked={showIndicator}
              onCheckedChange={setShowIndicator}
            />
            <Label htmlFor="showIndicator">Indicator</Label>
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
              id="showGrid"
              checked={showGrid}
              onCheckedChange={setShowGrid}
            />
            <Label htmlFor="showGrid">Grid</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="showTeleprompter"
              checked={showTeleprompter}
              onCheckedChange={setShowTeleprompter}
            />
            <Label htmlFor="showTeleprompter">Telepromter</Label>
          </div>
          <Button onClick={() => setShowMore(!showMore)} variant="outline">
            More
          </Button>
        </div>
        {showMore && (
          <div className="mt-4 flex items-center gap-6">
            <div className="flex items-center gap-1">
              <ALargeSmall className="text-sm" />
              <Slider
                min={32}
                max={128}
                value={[fontSize]}
                onValueChange={(v) => setFontSize(v[0])}
                className="w-32"
              />
            </div>
            <div className="flex items-center gap-1">
              <FoldHorizontal className="text-sm" />
              <Slider
                min={0}
                max={600}
                value={[hMargin]}
                onValueChange={(v) => setHMargin(v[0])}
                className="w-32"
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
                className="w-32"
              />
            </div>
            <ToggleGroup
              type="single"
              value={textAlign}
              onValueChange={setTextAlign}
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
            <ToggleGroup
              type="single"
              value={direction}
              onValueChange={setDirection}
            >
              <ToggleGroupItem value="ltr">
                <PilcrowRight className="size-5" />
              </ToggleGroupItem>
              <ToggleGroupItem value="rtl">
                <PilcrowLeft className="size-5" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        )}
      </div>
    </>
  );
};
