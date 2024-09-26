import React from "react";

function Header() {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-[#1f3e57]  h-[50px]">
      <h1 className="text-[#F5F5F5] font-bold text-xl">DOCINSIGHT</h1>
      <div>
        <h2 className="text-xl cursor-pointer text-[#F5F5F5]">Login/Signup</h2>
      </div>
    </div>
  );
}

export default Header;
