"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUpRight, Calendar } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProjectCardProps {
  title: string
  role: string
  tools: string[]
  description: string
  image: string
  link: string
  date: string
}

export default function ProjectCard({ title, role, tools, description, image, link, date }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      whileHover={{
        y: -10,
        transition: { duration: 0.2 },
      }}
    >
      <Card
        className="overflow-hidden transition-all duration-300 bg-muted/50 backdrop-blur-sm border border-border/50 hover:border-primary/20 hover:shadow-[0_10px_40px_rgba(16,185,129,0.1)]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 ease-in-out"
            style={{
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <a
              href={link}
              className="text-white font-medium flex items-center group"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Project
              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold">{title}</h3>
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              {date}
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{role}</p>
          <p className="text-sm mb-4">{description}</p>
        </CardContent>
        <CardFooter className="px-6 pb-6 pt-0 flex flex-wrap gap-2">
          {tools.map((tool) => (
            <Badge key={tool} variant="secondary" className="font-normal">
              {tool}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </motion.div>
  )
} 