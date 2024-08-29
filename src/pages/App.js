import { useEffect, useRef, useState } from "react";
import ChatDisplay from "../components/ChatDisplay";
import ChatInput from "../components/ChatInput";
import UserInfo from "../components/UserInfo";
import useLogout from "../hooks/useLogout";
import pb from "../lib/pocketbase";
import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();
  const logout = useLogout();
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);
  const menuBtnRef = useRef(null);
  const userData = pb.authStore.model;
  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (openMenu && menuBtnRef.current && !menuBtnRef.current.contains(e.target) && !menuRef.current.contains(e.target)) {
        setOpenMenu((prev) => !prev);
      }
    };
    document.documentElement.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.documentElement.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu]);

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="h-full max-w-screen-md w-full grid grid-cols-3 text-white">
      <div className="relative col-span-1 border-2 border-zinc-800 md:ml-4 md:my-32 md:rounded-l-2xl bg-zinc-800/50 overflow-hidden">
        <button ref={menuBtnRef} onClick={() => setOpenMenu((prev) => !prev)} className="relative h-14 w-full px-3 flex items-center justify-between font-bold bg-zinc-800" type="button">
          <div className="size-6"></div>
          <div className="text-lg">
            My<span className="handwriting text-amber-500">PocketChat</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`size-6 ${openMenu ? "rotate-180" : ""}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
        <div ref={menuRef} className={`${openMenu ? "block" : "hidden"} absolute top-14 right-0 w-full font-bold rounded-b-lg bg-zinc-800 overflow-hidden`}>
          <button onClick={handleLogout} className="w-full py-2 text-rose-700 hover:text-rose-600 hover:bg-zinc-700" type="button">Logout</button>
        </div>
        <UserInfo userData={userData} />
      </div>

      <div className="flex flex-col col-span-2 border-2 border-l-0 border-zinc-800 md:mr-4 md:my-32 md:rounded-r-2xl bg-zinc-800/50 overflow-hidden">
        <div className="flex flex-none items-center h-14 w-full px-3 text-lg bg-zinc-800">Chat</div>
        <ChatDisplay userData={userData ? userData.id : "anon"} />
        <ChatInput userData={userData ? userData.id : "anon"} />
      </div>
    </div>
  );
};