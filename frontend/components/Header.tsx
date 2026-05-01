"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import LoadingSpin from "./LoadingSpin";
import Button from "./Button";
import {
  LuLogOut,
  LuArrowRight,
  LuMenu,
  LuX,
  LuSun,
  LuMoonStar,
} from "react-icons/lu";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();

  function signOutUser() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setMenuOpen(false);
    window.location.href = "/";
  }

  function handleDarkMode() {
    if (darkMode) {
      setDarkMode(false);
      localStorage.setItem("darkMode", "false");
    } else {
      setDarkMode(true);
      localStorage.setItem("darkMode", "true");
    }

    document.documentElement.classList.toggle("dark");
  }

  useEffect(() => {
    if (localStorage.getItem("darkMode") === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    const usernameLocal = localStorage.getItem("username");
    if (usernameLocal) {
      setUsername(usernameLocal);
    }

    if (token === null) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  if (isLoading) {
    return (
      <header className="flex justify-between items-center pb-16">
        <LoadingSpin />
      </header>
    );
  }

  return (
    <header className="flex flex-col max-w-6xl m-auto gap-4 pb-16">
      <div className="flex justify-between items-center ">
        <Link href="/">
          <h1 className="font-bold text-xl sm:text-2xl">PollBee🐝</h1>
        </Link>

        <div className="flex gap-4 justify-center items-center ">
          <button className="hidden sm:flex text-2xl" onClick={handleDarkMode}>
            {darkMode ? <LuSun /> : <LuMoonStar />}
          </button>

          <div className="flex gap-2">
            {isLoggedIn ? (
              <>
                <Link href="/profile">
                  <Button
                    variant="outline"
                    btnText={<>{username ? `@${username}` : "Profile"}</>}
                  />
                </Link>

                <div className="sm:flex hidden">
                  <Button
                    onClick={signOutUser}
                    variant="secondary"
                    btnText={
                      <>
                        <LuLogOut /> Sign Out
                      </>
                    }
                  />
                </div>
              </>
            ) : (
              <>
                <Link className="sm:flex hidden" href="/login">
                  <Button variant="outline" btnText={<>Log in</>} />
                </Link>

                <Link href="/signup">
                  <Button btnText={<>Sign Up</>} />
                </Link>
              </>
            )}
          </div>
          <button
            className="sm:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <LuX /> : <LuMenu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="sm:hidden w-full bg-text/5 p-4 rounded-xl flex flex-col gap-4 ">
              {isLoggedIn ? (
                <>
                  <div className="flex justify-center items-center w-full text-2xl">
                    <button onClick={handleDarkMode}>
                      {darkMode ? <LuSun /> : <LuMoonStar />}
                    </button>
                  </div>
                  <Button
                    onClick={signOutUser}
                    variant="secondary"
                    btnText={
                      <>
                        <LuLogOut size={16} /> Sign Out
                      </>
                    }
                  />
                </>
              ) : (
                <>
                  <div className="flex justify-center items-center w-full text-2xl">
                    <button onClick={handleDarkMode}>
                      {darkMode ? <LuSun /> : <LuMoonStar />}
                    </button>
                  </div>
                  <Link href="/login" className="w-full">
                    <Button variant="outline" btnText={<>Log in</>} />
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
