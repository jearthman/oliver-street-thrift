import React from "react";
import * as Select from "@radix-ui/react-select";

interface FilterSelectProps {
  options: string[];
  placeholder?: string;
  onValueChange?: (value: string) => void;
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  options,
  placeholder = "Select an option",
  onValueChange,
}) => {
  return (
    <Select.Root onValueChange={onValueChange}>
      <Select.Trigger className="inline-flex items-center justify-between rounded-full bg-white px-4 py-2 text-sm leading-none text-parchment-950 shadow-sm hover:bg-parchment-100 focus:outline-none">
        <Select.Value placeholder={placeholder} />
        <Select.Icon>{/* <ChevronDownIcon /> */}</Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="overflow-hidden rounded-md bg-white shadow-lg">
          <Select.ScrollUpButton className="flex h-6 cursor-default items-center justify-center bg-white text-parchment-950">
            {/* <ChevronUpIcon /> */}
          </Select.ScrollUpButton>
          <Select.Viewport className="p-2">
            {options.map((option) => (
              <Select.Item
                key={option}
                value={option}
                className="relative flex select-none items-center rounded px-8 py-2 text-sm text-parchment-950 hover:bg-parchment-100 focus:bg-parchment-200 focus:outline-none"
              >
                <Select.ItemText>{option}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton className="flex h-6 cursor-default items-center justify-center bg-white text-parchment-950">
            {/* <ChevronDownIcon /> */}
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default FilterSelect;
