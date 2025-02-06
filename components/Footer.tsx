import Link from "next/link";
import CurrentYear from "./CurrentYear";

function Footer() {
  return (
    <footer className="bg-black flex flex-col items-center justify-center min-h-48 gap-3 text-white pb-6 sm:pb-0">
      <Link href="/" className="font-exo2 text-2xl font-bold">
        Tech Nexus
      </Link>

      <p>
        © <CurrentYear /> Tech Nexus. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
