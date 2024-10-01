"use client";
import React from "react";
import Logo from "../Assets/icons/Logo.svg";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const { data: session, status } = useSession();

  console.log(status);

  return (
    <div className="flex items-center justify-between px-3 py-6 bg-[#1f3e57]  h-[70px]">
      <Logo onClick={() => router.push("/")} className=" w-[200px] h-10" />
      <div>
        <h2
          onClick={() => router.push("/login")}
          className="text-xl cursor-pointer text-[#F5F5F5]"
        >
          {status === "authenticated" ? (
            <h2 onClick={() => signOut()}>Welcome {session?.user?.name}!</h2>
          ) : (
            pathname !== "/login" && "Login / Signup"
          )}
        </h2>
      </div>
    </div>
  );
}

export default Header;
