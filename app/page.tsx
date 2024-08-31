import Links from "../components/links";
import Nav from "../components/nav";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Nav />
      <Links />
    </main>
  );
}
