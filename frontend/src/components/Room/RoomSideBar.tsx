'use client';
import React, { useState, useEffect } from "react";
import RoomCard from "./RoomCard";
import IRoom from "@/interfaces/IRoom";
import { useRoom } from "@/contexts/RoomContext";
import { useSocket } from "@/contexts/SocketContext";
import { BiMessageAdd } from "react-icons/bi";
import AddRoomPanel from "./AddRoomPanel";
import { Modal } from "antd";
import Profile from "./UserProfile";

function RoomSideBar() {
  const [showAddRoomPanel, setShowAddRoomPanel] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [rooms, setRooms] = useState([]);
  const { roomUsers } = useSocket();

  const user = {
    pictureUrl: "path-to-user-picture.jpg",
    name: "John Doe",
    status: "Online",
  };

  const handleUpdatePicture = (newPictureUrl) => {
    // Update user's picture URL
  };

  const handleUpdateName = (newName) => {
    // Update user's name
  };

  const hideAddRoomPanel = () => setShowAddRoomPanel(false);

  useEffect(() => {
    // Fetch room data from your API
    fetch("http://localhost:8080/chatrooms")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setRooms(data);
      })
      .catch((error) => {
        console.error("Error fetching room data:", error);
      });
  }, []);

  return (
    <div className="overflow-y-scroll w-20 h-screen border-r-2 p-2 sm:w-1/4">
      <Modal
        title="Vertically centered modal dialog"
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
      >
        <Profile
          initialPictureUrl={user.pictureUrl}
          initialName={user.name}
          status={user.status}
          onUpdatePicture={handleUpdatePicture}
          onUpdateName={handleUpdateName}
        />
      </Modal>
      <div className="flex justify-between">
        <p className="text-xl sm:text-2xl font-semibold">Chat Room</p>
        <button
          className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          type="button"
          onClick={() => setModal2Open(true)}
        >
          <span className="sr-only">Open user menu</span>
          <img
            className="w-8 h-8 rounded-full"
            src="/docs/images/people/profile-picture-3.jpg"
            alt="user photo"
          />
        </button>
      </div>
      {rooms.map((room: IRoom, index) => {
        return <RoomCard room={room} users={roomUsers[room.id] ?? []} key={index} />;
      })}
      <p className="pt-3 text-lg font-semibold sm:text-xl">My Rooms</p>
      <div className="py-1">
        {rooms.map((room: IRoom, index) => {
          return <RoomCard room={room} users={roomUsers[room.id] ?? []} key={index} />;
        })}
      </div>
      <button
        className="w-[60px] rounded-full absolute bottom-4 left-[190px] inline-flex my-4 items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
        onClick={() => setShowAddRoomPanel(true)}
      >
        <span className="w-full flex justify-center items-center relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0">
          <BiMessageAdd size={30} />
        </span>
      </button>
      {showAddRoomPanel && (
        <div>
          <AddRoomPanel hideAddRoomPanel={hideAddRoomPanel} />
        </div>
      )}
    </div>
  );
}

export default RoomSideBar;
