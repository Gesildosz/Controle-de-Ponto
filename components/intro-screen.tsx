"use client"

import { useState, useEffect } from "react"

export function IntroScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    // Start fade-out after 2 seconds
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true)
    }, 2000) // Show for 2 seconds

    // Hide completely after fade-out animation completes (0.5s)
    const hideTimer = setTimeout(() => {
      setIsVisible(false)
    }, 2500) // 2 seconds + 0.5 seconds fadeOut animation

    return () => {
      clearTimeout(fadeOutTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!isVisible) {
    return null
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-800 text-white transition-opacity duration-500 ${
        isFadingOut ? "animate-fade-out" : ""
      }`}
    >
      <h1 className="text-6xl font-extrabold animate-zoom-in-fade-in">Colaborador +</h1>
    </div>
  )
}
