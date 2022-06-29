import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = ({ children }) => {
  return (
    <div>
      <header className="flex justify-between items-center p-5 max-w-5xl mx-auto">
        <div className=" flex items-center gap-5">
          <Link href="/">
            <div className="  w-44 text-left cursor-pointer">
              <h1 className="text-4xl font-serif font-extrabold">Medium</h1>
            </div>
          </Link>
          <div className="hidden md:inline-flex gap-5">
            <h3>About</h3>
            <h3>Contact</h3>
            <h3 className="text-white bg-green-600 px-4 py-1 rounded-full">
              Follow
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-5 text-green-600">
          <h3> Sign In</h3>
          <h3 className="border border-green-600 px-4 py-1 rounded-full">
            Get Started
          </h3>
        </div>
      </header>
      {children}
    </div>
  );
};

export default Header;
