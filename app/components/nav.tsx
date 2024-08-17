import { Girassol } from "next/font/google";
import Logo from "./logo";
import Button from "./ds/button";
import UserIcon from "./ds/icons/user-icon";
import CartIcon from "./ds/icons/cart-icon";
import SearchBar from "./search-bar";

const girassol = Girassol({ weight: "400", subsets: ["latin"] });

export default function Nav() {
  return (
    <nav className="bg-parchment-100 py-4 text-parchment-950">
      <div className="mx-auto flex items-center md:w-2/3 lg:w-1/2">
        <Logo />
        <div className="flex w-full pl-3">
          <span className={`flex text-4xl font-bold ${girassol.className}`}>
            OLIVER STREET
          </span>
          <div className="ml-auto flex items-center gap-2">
            <SearchBar />
            <Button intent="icon" size="large-icon" className="text-3xl">
              <UserIcon />
            </Button>
            <Button intent="icon" size="large-icon" className="text-3xl">
              <CartIcon />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
