export interface NavLinkProps {
  children: React.ReactNode;
}

export default function NavLink({ children }: NavLinkProps) {
  return (
    <li className="transition-link hover:text-shadow cursor-pointer border-b-2 border-transparent uppercase leading-tight ease-in-out hover:border-parchment-950">
      {children}
    </li>
  );
}
