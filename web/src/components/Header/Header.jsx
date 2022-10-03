import React, { useState } from "react";
import SubscribeModal from "../Modals/SubscribeModal";

const Header = () => {
  const [open, close] = useState(false);
  const [resp, setResp] = useState("");

  const closeModal = () => {
    console.log("clicked");
    setResp("");
    close(false);
  };

  const setResponse = (resp) => {
    setResp(resp);
  }

  const openModal = (e) => {
    e.preventDefault();
    console.log("Opened");
    close(true);
  }

  return (
    <>
      <nav className="relative w-full flex flex-wrap items-center justify-between py-3 bg-blue-700 text-white shadow-lg">
        <div className="w-full flex flex-wrap justify-between items-center px-10">
          <div className="">
            <a
              className="text-2xl text-white font-semibold"
              href="https://jobie.netlify.app"
            >
              JobIE
            </a>
          </div>
          <div className="">
            <a
              className="inline-block border border-white rounded hover:border-gray-200 text-white hover:bg-gray-200 py-1 px-3 hover:text-blue-700"
              href=""
              onClick={(e) => openModal(e)}
            >
              Subscribe
            </a>
          </div>
        </div>
      </nav>
      <SubscribeModal resp = {resp} setResp = {setResponse} open={open} close={closeModal} />
    </>
  );
};

export default Header;
