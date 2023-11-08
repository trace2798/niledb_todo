import Image from "next/image";
import { FC } from "react";
import { ModeToggle } from "./mode-toggle";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  return (
    <>
      <nav className="p-5 flex flex-row justify-between">
        <Image
          src="/next.svg"
          alt="Next.js Logo"
          height={24}
          width={100}
          className="dark:invert"
        />
        <div className="flex">
          <ModeToggle />
          <div className="ml-3">
            <a
              href="https://thenile.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              Created by{" "}
              <Image
                src="/nile_logo.svg"
                alt="Nile Logo"
                className="ml-2 dark:invert"
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
