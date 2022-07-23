import React from "react";

const Header = () =>{
    return (
      <nav className="relative w-full flex flex-wrap items-center justify-between py-3 bg-blue-700 text-white shadow-lg">
      <div className="w-full flex flex-wrap items-center justify-between px-10">
        <div className="">
          <a className="text-2xl text-white font-semibold" href="https://jobie.netlify.app">JobIE</a>
        </div>
      </div>
    </nav>
    );
}

export default Header;