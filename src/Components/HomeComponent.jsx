import Navbar from "./Navbar";

function HomeComponent() {
  return (
    <div className="w-screen h-screen bg-slate-800">
        <Navbar />
      <div className="rounded-lg h-full text-center bg-slate-300 m-4">
        <h1 className="text-[32px] text-slate-900 my-5">
            Real Time Chat
        </h1>
      </div>
    </div>
  );
}

export default HomeComponent;
