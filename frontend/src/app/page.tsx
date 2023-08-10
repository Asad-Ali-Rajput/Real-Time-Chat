"use client";
import Footer from "@/components/Home/Footer";
import LoginForm from "@/components/Home/LoginForm";
import SignupForm from "@/components/Home/SignupForm";
import Navbar from "@/components/Home/Navbar";
import { useState } from "react";

export default function Home() {

  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState<boolean>(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsSignupModalOpen(false);
  };


  const openSignupModal = () => {
    setIsSignupModalOpen(true);
    setIsLoginModalOpen(false);
  };

  return (
    <main>
      <div className="w-full h-screen bg-slate-900">
        <Navbar login={openLoginModal} signup={openSignupModal}/>
        
        {isLoginModalOpen ? (
        <LoginForm />
      ): isSignupModalOpen ? (
        <SignupForm />
      ) : (<div className="rounded-lg pt-10 text-center ">
      <h1 className="text-[32px] text-slate-200 my-4">
          Real Time Chat
      </h1>
    </div>)}
    {/* <Footer /> */}
    </div>
    </main>
  );
}
