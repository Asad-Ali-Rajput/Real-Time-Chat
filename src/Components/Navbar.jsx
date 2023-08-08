import { useState } from "react";

function Navbar() {
    const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div className="flex justify-end w-screen">
      <button
        type="button"
        className="text-white bg-gradient-to-br m-4 from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        LOGIN
      </button>
      <button className="relative inline-flex my-4 items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          SIGNUP
        </span>
      </button>
    </div>
  );
}

export default Navbar;
