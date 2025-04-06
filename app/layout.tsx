import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import Links from "./components/links";
import Nav from "./components/nav";
import Footer from "./components/footer";
const onest = Onest({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Oliver Street Thrift",
  description:
    "A curated online resale shop with an eye for quality and timeless style! Enjoy shopping.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${onest.className} flex min-h-full w-full flex-col overflow-y-auto overflow-x-hidden`}
      >
        <div className="fixed top-0 z-50 flex h-28 w-full flex-col">
          <Nav />
          <Links />
        </div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
