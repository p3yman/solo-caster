import { useState } from "react";

type SliderProps = {
  min?: number;
  max?: number;
  step?: number;
  value: number[];
  onValueChange: (value: number[]) => void;
};

export function Slider({
  min = 0,
  max = 100,
  step = 1,
  value,
  onValueChange,
}: SliderProps) {
  const [sliderValue, setSliderValue] = useState(value[0]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setSliderValue(newValue);
    onValueChange([newValue]);
  };

  return (
    <div className="flex w-36 items-center gap-2">
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
