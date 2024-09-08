import React from "react";

interface NavDropdownProps {
  children: React.ReactNode;
  isOpen: boolean;
}

export default function NavDropdown({ children, isOpen }: NavDropdownProps) {
  return <div className="w-full absolute top-0">{children}</div>;
}
