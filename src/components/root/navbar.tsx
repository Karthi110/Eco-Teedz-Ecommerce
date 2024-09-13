import MaxWidthWrapper from "./max-width-wrapper";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { LINKS } from "@/constants";
import AuthLinks from "./auth-links";

const Navbar = () => {
  return (
    <MaxWidthWrapper className="sticky top-0 backdrop-blur-md flex justify-between items-center h-16 w-full gap-5 border-b-2 border-dashed px-4 md:px-8 z-50">
      <aside className="flex-1">
        <Link
          href="/"
          className="text-xl md:text-3xl font-bold tracking-tighter text-primary"
        >
          EcoTeedz
        </Link>
      </aside>
      <aside className="flex-1 hidden md:block">
        <ul className="flex items-center justify-center space-x-6">
          {LINKS.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className={buttonVariants({
                variant: "link",
                className: "text-lg",
              })}
            >
              {link.name}
            </Link>
          ))}
        </ul>
      </aside>
      <aside className="flex-1 flex items-center justify-end gap-4">
        <AuthLinks />
      </aside>
    </MaxWidthWrapper>
  );
};

export default Navbar;
