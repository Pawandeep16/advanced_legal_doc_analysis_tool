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
    <div className="flex items-center justify-between px-3 py-6 bg-[#1f3e57]  h-[70px]  sticky top-0 z-50">
      <Logo
        onClick={() => router.push("/")}
        className=" w-[200px] h-10 hover:cursor-pointer "
      />
      <div className="flex items-center">
        <h2
          onClick={() => router.push("/login")}
          className="text-xl cursor-pointer text-[#F5F5F5]"
        >
          {status === "authenticated" ? (
            <Image
              onClick={() => signOut()}
              src={session?.user?.image}
              alt=""
              height={50}
              width={50}
              className=" object-cover rounded-full"
            />
          ) : (
            pathname !== "/login" && "Login / Signup"
          )}
        </h2>
      </div>
    </div>
  );
}

export default Header;
