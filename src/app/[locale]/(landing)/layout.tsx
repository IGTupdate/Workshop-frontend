"use client";
import LandingNavbar from "@/app/components/Landing/__components/Navbar";
import { ChildrenProps } from "../dashboard/__components/__utils/types";
import { useEffect, useState } from "react";

const RootLayout: React.FC<ChildrenProps> = ({ children }) => {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <main>
        <div
          style={{
            background: scrolling ? "#000000ad" : "transparent",
            boxShadow: scrolling ? "5px 5px 15px #ffffff5e" : "none",
          }}
          className="fixed top-0 left-1/2 translate-x-[-50%] z-20 w-full"
        >
          <LandingNavbar />
        </div>
        <div> {children}</div>
      </main>
    </>
  );
};

export default RootLayout;
