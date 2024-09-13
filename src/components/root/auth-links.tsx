import { Button, buttonVariants } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

const AuthLinks = () => {
  return (
    <>
      <SignedOut>
        <Button asChild>
          <SignInButton mode="modal" fallbackRedirectUrl={"/auth-callback"} />
        </Button>
        <Button asChild variant="outline">
          <SignUpButton
            mode="modal"
            signInFallbackRedirectUrl={"/auth-callback"}
          />
        </Button>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <Link
        href="/cart"
        className={buttonVariants({ variant: "ghost", size: "icon" })}
      >
        <ShoppingCart className="w-6 h-6" />
      </Link>
    </>
  );
};

export default AuthLinks;
