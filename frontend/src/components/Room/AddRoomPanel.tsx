"use client";
import { useRoom } from "@/contexts/RoomContext";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AiFillCloseCircle } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";

function AddRoomPanel({ hideAddRoomPanel }: any) {
  const [title, setTitle] = useState<string>("");
  const [id, setID] = useState<string>("");
  const { myRooms, setMyRooms } = useRoom();
  const router = useRouter();

  useEffect(() => {
    setID(uuidv4());
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/createroom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          id,
        }),
      });

      if (response.ok) {
        setMyRooms([
          ...myRooms,
          {
            title,
            id,
          },
        ]);
        hideAddRoomPanel(true);
        router.replace("/chat/" + id);
      } else {
        // Handle error cases
      }
    } catch (error) {
      // Handle error cases
    }
  };


  return (
    <div className="flex absolute top-0 left-0 z-20 flex-col justify-center items-center px-6 py-8 mx-auto w-full h-screen backdrop-blur-sm lg:py-0">
      <div className="relative w-full bg-white rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0">
        <AiFillCloseCircle
          size={30}
          className="absolute rounded-full text-slate-50 -top-2 -right-2 cursor-pointer bg-gradient-to-br m-4 from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 text-center"
          onClick={() => hideAddRoomPanel(true)}
        />
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold tracking-tight leading-tight text-gray-900 md:text-2xl">
            Create or join room
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Room Title
              </label>
              <input
                type="text"
                id="name"
                value={title}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-50 focus:outline-none  text-gray-900 sm:text-sm rounded-lg border focus:border-primary block w-full p-2.5 "
                required={true}
              />
            </div>
            <div>
              <label
                htmlFor="roomId"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Room ID
              </label>
              <input
                type="text"
                id="chatroomID"
                value={id}
                minLength={5}
                onChange={(e) => setChatRoomID(e.target.value)}
                className="bg-gray-50  focus:outline-none text-gray-900 sm:text-sm rounded-lg border focus:border-primary block w-full p-2.5 "
                required={true}
              />
            </div>
            <button type="submit" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">
              Join Room
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddRoomPanel;