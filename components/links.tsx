import NavLink from "./nav-links";

export default function Links() {
  return (
    <div className="bg-parchment-50 py-3 text-parchment-950">
      <ul className="mx-auto flex items-center justify-between tracking-wider md:w-2/3 lg:w-1/2">
        <NavLink>new arrivals</NavLink>
        <NavLink>women</NavLink>
        <NavLink>men</NavLink>
        <NavLink>jewelery</NavLink>
        <NavLink>home goods</NavLink>
      </ul>
    </div>
  );
}
