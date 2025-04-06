"use client";

import { Minus } from "lucide-react";
import Dropdown from "./dropdown";
import Input from "./input";
export default function RangeDropdown() {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <span>Range</span>
      </Dropdown.Trigger>
      <Dropdown.Content>
        <div className="flex items-center gap-1">
          <Input prepend={<span className="text-parchment-800/50">$</span>} type="number" placeholder="Min" />
          <Minus size={20} className="text-parchment-800" />
          <Input prepend={<span className="text-parchment-800/50">$</span>} type="number" placeholder="Max" />
        </div>
      </Dropdown.Content>
    </Dropdown>
  );
}
