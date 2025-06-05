"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface CustomCursorProps {
  mousePosition: { x: number; y: number }
}

export default function CustomCursor({ mousePosition }: CustomCursorProps) {
  const [cursorVariant, setCursorVariant] = useState("default")

  useEffect(() => {
    const handleMouseDown = () => setCursorVariant("click")
    const handleMouseUp = () => setCursorVariant("default")

    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    const handleLinkHover = () => setCursorVariant("hover")
    const handleLinkLeave = () => setCursorVariant("default")

    const links = document.querySelectorAll("a, button")
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleLinkHover)
      link.addEventListener("mouseleave", handleLinkLeave)
    })

    return () => {
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleLinkHover)
        link.removeEventListener("mouseleave", handleLinkLeave)
      })
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(16, 185, 129, 0)",
      mixBlendMode: "difference" as const,
      border: "1px solid rgba(255, 255, 255, 0.5)",
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "rgba(16, 185, 129, 0.2)",
      mixBlendMode: "normal" as const,
      border: "1px solid rgba(16, 185, 129, 0.5)",
    },
    click: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(16, 185, 129, 0.4)",
      mixBlendMode: "normal" as const,
      border: "1px solid rgba(16, 185, 129, 0.8)",
    },
  }

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-50 hidden md:block"
      variants={variants}
      animate={cursorVariant}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    />
  )
} 