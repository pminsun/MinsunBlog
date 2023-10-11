import Link from "next/link";
import DarkModeToggleBtn from "./darkModeToggleBtn";
import { useRouter } from "next/router";
import { cls } from "libs/utils";

export default function Header() {
  const router = useRouter();
  return (
    <header className="fixed top-0 z-50 bg-primary w-full">
      <div className="max-w-3xl flex items-center justify-between py-2 px-4 lg:px-0 mx-auto">
        <nav className="flex gap-2 items-start header-style">
          <Link
            href="/"
            className={cls(router.pathname === "/" ? "text-point-color" : "")}
          >
            About
          </Link>
          <Link
            href="/blog"
            className={cls(
              router.pathname.startsWith("/blog") ? "text-point-color" : ""
            )}
          >
            Blog
          </Link>
          <Link
            href="/project"
            className={cls(
              router.pathname.startsWith("/project") ? "text-point-color" : ""
            )}
          >
            Projects
          </Link>
          {/* <Link href="/resume">Resume</Link> */}
        </nav>
        <DarkModeToggleBtn />
      </div>
    </header>
  );
}
