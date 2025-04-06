type RangeSliderProps = {
  min: number;
  max: number;
  step?: number;
  values: [number, number];
  onChange: (values: [number, number]) => void;
};

export default function RangeSlider({ min, max, step = 1, values = [min, max], onChange }: RangeSliderProps) {
  return (
    <div className="relative h-4 w-40">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={values[0]}
        onChange={(e) => {
          const newMin = Math.min(Number(e.target.value), values[1]);
          onChange([newMin, values[1]]);
        }}
        className="absolute inset-0 m-auto h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={values[1]}
        onChange={(e) => {
          const newMax = Math.max(Number(e.target.value), values[0]);
          onChange([values[0], newMax]);
        }}
        className="absolute inset-0 m-auto h-2 w-full cursor-pointer appearance-none rounded-lg bg-transparent [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
      />
    </div>
  );
}
