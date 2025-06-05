"use client"

import { useRef, useEffect, useState } from "react"
import { useTheme } from "next-themes"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export default function SkillsOrb() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    camera.position.z = 200

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    containerRef.current.appendChild(renderer.domElement)

    // Controls - make it interactive
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.5

    // Create sphere
    const geometry = new THREE.SphereGeometry(70, 64, 64)

    // Material
    const isDark = theme === "dark"
    const material = new THREE.MeshBasicMaterial({
      color: isDark ? 0x10b981 : 0x10b981, // Emerald green
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    })

    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

    // Add skills as points
    const skills = [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "UI/UX",
      "Product",
      "Design",
      "Strategy",
      "Business",
      "Analytics",
      "Marketing",
      "Leadership",
    ]

    const pointsGroup = new THREE.Group()
    scene.add(pointsGroup)

    const skillPoints: { point: THREE.Mesh; sprite: THREE.Sprite; skill: string }[] = []

    skills.forEach((skill, i) => {
      // Create point
      const phi = Math.acos(-1 + (2 * i) / skills.length)
      const theta = Math.sqrt(skills.length * Math.PI) * phi

      const x = 80 * Math.sin(phi) * Math.cos(theta)
      const y = 80 * Math.sin(phi) * Math.sin(theta)
      const z = 80 * Math.cos(phi)

      // Point geometry
      const pointGeometry = new THREE.SphereGeometry(3, 16, 16)
      const pointMaterial = new THREE.MeshBasicMaterial({
        color: isDark ? 0x10b981 : 0x10b981, // Emerald green
      })

      const point = new THREE.Mesh(pointGeometry, pointMaterial)
      point.position.set(x, y, z)
      pointsGroup.add(point)

      // Create text sprite for skill name
      const canvas = document.createElement("canvas")
      const context = canvas.getContext("2d")
      if (context) {
        canvas.width = 256
        canvas.height = 128
        context.fillStyle = "transparent"
        context.fillRect(0, 0, canvas.width, canvas.height)
        context.font = "bold 28px Arial"
        context.textAlign = "center"
        context.fillStyle = isDark ? "#ffffff" : "#000000"
        context.fillText(skill, canvas.width / 2, canvas.height / 2)

        const texture = new THREE.CanvasTexture(canvas)
        const spriteMaterial = new THREE.SpriteMaterial({
          map: texture,
          transparent: true,
        })

        const sprite = new THREE.Sprite(spriteMaterial)
        sprite.position.set(x * 1.2, y * 1.2, z * 1.2)
        sprite.scale.set(30, 15, 1)
        pointsGroup.add(sprite)

        // Store reference to point and skill
        skillPoints.push({ point, sprite, skill })
      }
    })

    // Raycaster for interactivity
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    // Handle mouse move for hover effects
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()

      // Calculate mouse position in normalized device coordinates
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      // Update the raycaster
      raycaster.setFromCamera(mouse, camera)

      // Check for intersections with skill points
      const intersects = raycaster.intersectObjects(skillPoints.map((item) => item.point))

      if (intersects.length > 0) {
        // Find which skill was intersected
        const intersectedPoint = intersects[0].object
        const skillItem = skillPoints.find((item) => item.point === intersectedPoint)

        if (skillItem) {
          // Highlight the skill
          skillItem.point.scale.set(1.5, 1.5, 1.5)
          skillItem.sprite.scale.set(40, 20, 1)
          setHoveredSkill(skillItem.skill)

          // Change cursor
          document.body.style.cursor = "pointer"
        }
      } else {
        // Reset all points
        skillPoints.forEach((item) => {
          item.point.scale.set(1, 1, 1)
          item.sprite.scale.set(30, 15, 1)
        })
        setHoveredSkill(null)
        document.body.style.cursor = "auto"
      }
    }

    containerRef.current.addEventListener("mousemove", handleMouseMove)

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return

      camera.aspect = 1
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
        containerRef.current.removeEventListener("mousemove", handleMouseMove)
      }
      window.removeEventListener("resize", handleResize)
      document.body.style.cursor = "auto"
    }
  }, [theme])

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />
      {hoveredSkill && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 text-sm font-medium">
          {hoveredSkill}
        </div>
      )}
    </div>
  )
} 