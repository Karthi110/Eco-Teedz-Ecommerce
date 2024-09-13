import React from "react";
import MaxWidthWrapper from "./max-width-wrapper";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { LINKS } from "@/constants";

const Footer = () => {
  return (
    <footer className="bg-primary/20 py-4">
      <MaxWidthWrapper className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="flex-[.8] lg:flex-1 flex flex-col items-center md:items-start mb-6 md:mb-0">
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight pointer-events-none cursor-default">
            EcoTeeds
          </h1>
          <p className="text-sm md:text-base mt-2 text-center md:text-left">
            Join us in raising awareness about wildlife conservation with our
            sustainably-made eco-friendly t-shirts.
          </p>
        </div>
        <div className="flex-[.4] flex flex-col items-center md:items-start mb-6 md:mb-0">
          <h2 className="text-lg font-semibold">Quick Links</h2>
          <ul className="flex flex-col items-center md:items-start space-y-2 mt-2">
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
        </div>
        <div className="flex-[.2] flex flex-col items-center md:items-start">
          <h2 className="text-lg font-semibold">Follow Us</h2>
          <ul className="flex flex-row md:flex-col items-center md:space-y-2 mt-2">
            <li>
              <Link
                href="#"
                aria-label="Facebook"
                className={buttonVariants({
                  variant: "ghost",
                  size: "icon",
                })}
              >
                <Facebook />
              </Link>
            </li>
            <li>
              <Link
                href="#"
                aria-label="Twitter"
                className={buttonVariants({
                  variant: "ghost",
                  size: "icon",
                })}
              >
                <Twitter />
              </Link>
            </li>
            <li>
              <Link
                href="#"
                aria-label="Instagram"
                className={buttonVariants({
                  variant: "ghost",
                  size: "icon",
                })}
              >
                <Instagram />
              </Link>
            </li>
          </ul>
        </div>
      </MaxWidthWrapper>
      <div className="mt-8 border-t border-gray-700 pt-4">
        <MaxWidthWrapper className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs md:text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} EcoTeeds. All rights reserved.
          </p>
          <p className="text-xs md:text-sm text-center md:text-right mt-2 md:mt-0">
            Designed by Grimmzzz.
          </p>
        </MaxWidthWrapper>
      </div>
    </footer>
  );
};

export default Footer;
