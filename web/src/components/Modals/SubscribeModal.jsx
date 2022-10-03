import React, { useState } from "react";
import axios from "axios";

const SubscribeModal = ({ open, close, resp, setResp }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pClass, setPClass] = useState("");

  const testEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };


  const handleClose = () => {
    close();
    setResp("");
    setEmail("");
    setName("");
  }

  async function fetchData() {
    await axios
      .post(`${process.env.REACT_APP_BACKENDURL}/mail`, {
        email: email,
        name: name,
      })
      .then((response) => {
        console.log(response);
        setResp("Successfully Subscribed");
        setPClass("text-green-500");
        setTimeout(() => {
          handleClose();
        }, 1000);
      })
      .catch((error) => {
        console.log("error", error);
        if (error.response.status === 400) {
          setResp(error.response.data.message);
        } else {
          setResp(error.message);
        }
        console.log("Resp", resp);
        setPClass("text-red-500");
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (testEmail(email)) {
      fetchData();
    } else {
      setResp("Please enter a valid email");
      setPClass("text-red-500");
    }
  };

  return (
    <div
      className={`container flex justify-center mx-auto ${
        open ? "block z-50" : "hidden"
      }`}
    >
      <div
        className={`absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50
        }`}
      >
        <div className="p-6 w-1/3 bg-white divide-y divide-gray-500">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl text-center w-full">
              SUBSCRIBE FOR UPDATES!
            </h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 hover:cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={handleClose}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="mt-4">
            <input
              className="border py-2 px-3 text-grey-darkest mb-4 w-full"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
            <input
              className="border py-2 px-3 text-grey-darkest mb-4 w-full"
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
            />
            <div className="flex items-center justify-evenly">
              <button
                onClick={(e) => handleSubmit(e)}
                className="px-4 py-2 w-full text-white bg-blue-600 rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Subscribe
              </button>
            </div>
            {resp && (
              <p className={`w-full text-center ${pClass}`} id="pid">
                {resp}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribeModal;
