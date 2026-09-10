"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import LoadingSpin from "./LoadingSpin"
import Button from "./Button"
import { LuLogOut, LuMenu, LuX, LuCircleUserRound } from "react-icons/lu"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "motion/react"
import DarkModeButton from "./ui/DarkModeButton"

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const pathname = usePathname()

  function signOutUser() {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    setMenuOpen(false)
    window.location.href = "/"
  }

  function handleDarkMode() {
    if (darkMode) {
      setDarkMode(false)
      localStorage.setItem("darkMode", "false")
    } else {
      setDarkMode(true)
      localStorage.setItem("darkMode", "true")
    }

    document.documentElement.classList.toggle("dark")
  }

  useEffect(() => {
    if (localStorage.getItem("darkMode") === "false") {
      setDarkMode(false)
      document.documentElement.classList.remove("dark")
    } else {
      setDarkMode(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  useEffect(() => {
    setIsLoading(true)
    const token = localStorage.getItem("token")
    const usernameLocal = localStorage.getItem("username")
    if (usernameLocal) {
      setUsername(usernameLocal)
    }

    if (token === null) {
      setIsLoggedIn(false)
    } else {
      setIsLoggedIn(true)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  if (isLoading) {
    return (
      <header className="flex items-center justify-between pb-16">
        <LoadingSpin />
      </header>
    )
  }

  return (
    <header className="m-auto mb-16 flex max-w-6xl flex-col justify-center gap-4 rounded-4xl bg-background-50 px-4 py-4">
      <div className="flex flex-wrap items-center justify-between">
        <Link href="/">
          <h1 className="text-xl font-bold sm:text-2xl">🐝PollBee</h1>
        </Link>

        <div className="flex items-center justify-center gap-4">
          <div className="hidden sm:flex">
            <DarkModeButton darkMode={darkMode} onClick={handleDarkMode} />
          </div>

          <div className="flex gap-2">
            {isLoggedIn ? (
              <>
                <Link href="/profile">
                  <Button
                    variant="outline"
                    btnText={
                      <>
                        <LuCircleUserRound /> Profile
                      </>
                    }
                  />
                </Link>

                <div className="hidden sm:flex">
                  <Button
                    onClick={signOutUser}
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
                <Link className="hidden sm:flex" href="/login">
                  <Button variant="outline" btnText={<>Log in</>} />
                </Link>

                <Link href="/signup">
                  <Button btnText={<>Sign up</>} />
                </Link>
              </>
            )}
          </div>
          <button
            className="text-2xl sm:hidden"
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
            className="sm:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="flex w-full flex-col gap-4 rounded-4xl p-4 sm:hidden">
              {isLoggedIn ? (
                <>
                  {/* Logged in menu */}

                  <div className="flex w-full items-center justify-center text-2xl">
                    <DarkModeButton
                      darkMode={darkMode}
                      onClick={handleDarkMode}
                    />
                  </div>
                  <Button
                    onClick={signOutUser}
                    btnText={
                      <>
                        <LuLogOut size={16} /> Sign Out
                      </>
                    }
                  />
                </>
              ) : (
                <>
                  {/* Logged out menu */}

                  <div className="flex w-full items-center justify-center text-2xl">
                    <DarkModeButton
                      darkMode={darkMode}
                      onClick={handleDarkMode}
                    />
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
  )
}
