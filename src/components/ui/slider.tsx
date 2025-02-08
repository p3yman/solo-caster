import { useState } from "react";
import { cn } from "../../lib/utils";

type SliderProps = {
  min?: number;
  max?: number;
  step?: number;
  value: number[];
  className?: string;
  onValueChange: (value: number[]) => void;
};

export function Slider({
  min = 0,
  max = 100,
  step = 1,
  value,
  className,
  onValueChange,
}: SliderProps) {
  const [sliderValue, setSliderValue] = useState(value[0]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setSliderValue(newValue);
    onValueChange([newValue]);
  };

  return (
    <div className={cn("flex w-32 items-center gap-2", className)}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={sliderValue}
        onChange={handleChange}
        className="w-full cursor-pointer"
      />
      <span className="text-sm font-medium">{sliderValue}</span>
    </div>
  );
}
