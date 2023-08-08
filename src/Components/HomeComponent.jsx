import { useState } from "react";
import Navbar from "./Navbar";
import LoginComponent from "./loginComponent";
import SignupComponent from "./SignupComponent";


function HomeComponent() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsSignupModalOpen(false);
  };


  const openSignupModal = () => {
    setIsSignupModalOpen(true);
    setIsLoginModalOpen(false);
  };

  return (
    <div className="w-full h-full">
        <Navbar login={openLoginModal} signup={openSignupModal}/>
        
        {isLoginModalOpen ? (
        <LoginComponent />
      ): isSignupModalOpen ? (
        <SignupComponent />
      ) : (<div className="rounded-lg pt-10 text-center ">
      <h1 className="text-[32px] text-slate-200 my-4">
          Real Time Chat
      </h1>
    </div>)}
    </div>
  );
}

export default HomeComponent;
