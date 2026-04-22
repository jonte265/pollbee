"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import LoadingSpin from "./LoadingSpin";
import Button from "./Button";
import { LuLogOut, LuArrowRight } from "react-icons/lu";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function signOutUser() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/";
  }

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

  if (isLoading) {
    return (
      <header className="flex justify-between items-center pb-16">
        <LoadingSpin />
      </header>
    );
  }

  return (
    <header className="flex justify-between items-center pb-16 max-w-6xl m-auto">
      <Link href="/">
        <h1 className="font-bold text-xl sm:text-2xl">PollBee🐝</h1>
      </Link>
      {isLoggedIn ? (
        <div
          className="flex 
        gap-2 justify-center items-center"
        >
          <Link href="/profile">
            <Button
              variant="outline"
              btnText={<>{username ? `@${username}` : "Profile"}</>}
            />
          </Link>

          <Button
            onClick={signOutUser}
            variant="secondary"
            btnText={
              <>
                <span className="sm:hidden ">
                  <LuLogOut size={16} />
                </span>

                <span className="hidden sm:flex items-center gap-1">
                  <LuLogOut size={16} />
                  <span>Sign Out</span>
                </span>
              </>
            }
          />
        </div>
      ) : (
        <div className="flex gap-2 justify-center items-center">
          <Link href="/login">
            <Button variant="outline" btnText={<>Log in</>} />
          </Link>
          <Link href="/signup">
            <Button
              btnText={
                <>
                  Sign Up <LuArrowRight />
                </>
              }
            />
          </Link>
        </div>
      )}
    </header>
  );
}
