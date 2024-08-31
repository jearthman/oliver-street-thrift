export interface NavLinkProps {
  children: React.ReactNode;
}

export default function NavLink({ children }: NavLinkProps) {
  return (
    <li className="cursor-pointer font-light border-b-2 border-transparent hover:border-parchment-950 uppercase leading-tight">
      {children}
    </li>
  );
}
