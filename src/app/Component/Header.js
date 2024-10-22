"use client";
import React from "react";
import Logo from "../Assets/icons/Logo.svg";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const { data: session, status } = useSession();

  return (
    <div className="flex items-center justify-between px-4 py-4 bg-[#1f3e57] h-[70px] sticky top-0 z-50">
      {/* Logo */}
      <Logo
        onClick={() => router.push("/")}
        className="w-[150px] md:w-[200px] h-8 md:h-10 hover:cursor-pointer"
      />

      {/* User Profile / Login Button */}
      <div className="flex items-center space-x-4">
        <h2
          onClick={() => router.push("/login")}
          className="text-sm md:text-xl cursor-pointer text-[#F5F5F5]"
        >
          {status === "authenticated" ? (
            <div className="relative flex justify-center items-center">
              {/* Outer circle */}
              <div className="rounded-full bg-[#ffffff2a] w-12 h-12 md:w-16 md:h-16 lg:w-18 lg:h-18 flex justify-center items-center">
                {/* Middle circle */}
                <div className="rounded-full bg-[#ffffff7a] w-[70%] h-[70%] flex justify-center items-center">
                  {/* Inner circle */}
                  <div className="rounded-full bg-white w-full h-full flex justify-center items-center">
                    <Image
                      onClick={() => signOut()}
                      src={session?.user?.image}
                      alt="profile pic"
                      height={50}
                      width={50}
                      className="object-cover rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            pathname !== "/login" && "Login / Signup"
          )}
        </h2>
      </div>
    </div>
  );
}

export default Header;
