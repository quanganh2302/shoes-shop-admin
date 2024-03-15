import { UserButton, auth } from "@clerk/nextjs";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "./theme-toggle";
import { components } from "@/lib/style";
import Link from "next/link";
const Navbar = async () => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link href="/dashboard" className={components.logo}>
          WalkWonder
        </Link>
        <MainNav className="mx-6" />
        <div className=" ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
