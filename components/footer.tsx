import Logo from "./logo";

type FooterProps = {
  className?: string;
};

export default function Footer({ className }: FooterProps) {
  return (
    <div
      className={`${className} flex w-full items-center justify-center gap-16 bg-parchment-50 py-20 text-parchment-950`}
    >
      <Logo height="200" width="200" />
      <div>
        <h2 className="font-semibold">OLIVER STREET</h2>
        <ul className="mt-2 flex flex-col gap-2">
          <li>Our Story</li>
          <li>Media</li>
          <li>Reviews</li>
        </ul>
      </div>
      <div>
        <h2 className="font-semibold">HELP</h2>
        <ul className="mt-2 flex flex-col gap-2">
          <li>Contact Us</li>
          <li>Frequently Asked Questions</li>
          <li>Returns</li>
        </ul>
      </div>
      <div>
        <h2 className="font-semibold">MORE</h2>
        <ul className="mt-2 flex flex-col gap-2">
          <li className="text-opacity-75">Shipping Policy</li>
          <li>Privacy Policy</li>
          <li>Terms & Conditions</li>
        </ul>
      </div>
    </div>
  );
}
