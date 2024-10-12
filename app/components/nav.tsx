import { Girassol } from "next/font/google";
import Logo from "./logo";
import Button from "./ds/button";
import UserIcon from "./ds/icons/user-icon";
import CartIcon from "./ds/icons/cart-icon";
import SearchBar from "./search-bar";

const girassol = Girassol({ weight: "400", subsets: ["latin"] });

export default function Nav() {
  return (
    <nav className="flex-grow bg-parchment-100 text-parchment-950">
      <div className="m-auto flex h-full items-center md:w-3/4 lg:w-2/3">
        <Logo />
        <div className="flex w-full pl-3">
          <div className={`my-auto text-4xl font-bold ${girassol.className}`}>
            OLIVER STREET
          </div>
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
