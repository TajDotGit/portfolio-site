"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import ProjectCard from "@/components/project-card"
import Navbar from "@/components/navbar"
import CustomCursor from "@/components/custom-cursor"
import SkillsOrb from "@/components/skills-orb"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Footer } from "@/components/ui/footer"

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const isAboutInView = useInView(aboutRef, { once: true, amount: 0.3 })
  const isProjectsInView = useInView(projectsRef, { once: true, amount: 0.2 })

  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 100])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <CustomCursor mousePosition={mousePosition} />
      <Navbar />

      {/* Hero Section with Parallax */}
      <motion.section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ opacity: heroOpacity, y: heroY }}
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-emerald-400/10 blur-2xl" />
          <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-green-400/10 blur-2xl" />
        </div>

        <div className="container px-4 z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Taj Ikhlaas
            </motion.h1>
            <motion.h2
              className="text-2xl md:text-3xl font-semibold mb-4 text-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Building Products That Bridge Tech and Business
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Product-focused developer and entrepreneur with a passion for creating elegant solutions to complex
              problems.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button
                className="group relative overflow-hidden rounded-full px-8 py-6 text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                size="lg"
              >
                <span className="relative z-10 flex items-center">
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-500 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <motion.div
            className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center p-1"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.div
              className="w-1 h-1 bg-foreground/50 rounded-full"
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 1.5,
                ease: "easeInOut",
              }}
            />
          </motion.div>
          <motion.p
            className="text-xs text-foreground/50 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            Scroll to explore
          </motion.p>
        </div>
      </motion.section>

      {/* About Section with 3D Skills Orb */}
      <section ref={aboutRef} className="container px-4 py-32" id="about">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
          initial="hidden"
          animate={isAboutInView ? "visible" : "hidden"}
          variants={fadeInVariants}
        >
          <div className="relative aspect-square max-w-md mx-auto md:mx-0 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-2xl" />
            <div className="h-full w-full flex items-center justify-center">
              <SkillsOrb />
            </div>
          </div>

          <motion.div className="space-y-8" variants={staggerChildren}>
            <motion.div variants={fadeInVariants}>
              <Badge className="mb-4 px-3 py-1 bg-primary/10 text-primary border-none hover:bg-primary/20">
                About Me
              </Badge>
              <h2 className="text-4xl font-bold tracking-tight mb-4">Product-minded developer</h2>
              <p className="text-muted-foreground">
                I'm a product-minded developer with a background in both engineering and business. My approach combines
                technical expertise with strategic thinking to build products that solve real problems and deliver
                exceptional user experiences.
              </p>
            </motion.div>

            <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4" variants={staggerChildren}>
              <motion.div
                className="group p-6 rounded-xl bg-muted/50 backdrop-blur-sm border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]"
                variants={fadeInVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <h3 className="font-medium mb-2 group-hover:text-primary transition-colors">PM-Minded</h3>
                <p className="text-sm text-muted-foreground">User-focused approach to problem solving</p>
              </motion.div>

              <motion.div
                className="group p-6 rounded-xl bg-muted/50 backdrop-blur-sm border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]"
                variants={fadeInVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <h3 className="font-medium mb-2 group-hover:text-primary transition-colors">Engineering-Trained</h3>
                <p className="text-sm text-muted-foreground">Technical expertise with attention to detail</p>
              </motion.div>

              <motion.div
                className="group p-6 rounded-xl bg-muted/50 backdrop-blur-sm border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]"
                variants={fadeInVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <h3 className="font-medium mb-2 group-hover:text-primary transition-colors">Business-Driven</h3>
                <p className="text-sm text-muted-foreground">Strategic thinking with market awareness</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Projects Section with 3D Cards */}
      <section ref={projectsRef} className="py-32 relative" id="projects">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
          <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-emerald-400/5 blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-green-400/5 blur-3xl" />
        </div>

        <div className="container px-4">
          <motion.div
            className="max-w-3xl mx-auto mb-20 text-center"
            initial="hidden"
            animate={isProjectsInView ? "visible" : "hidden"}
            variants={fadeInVariants}
          >
            <Badge className="mb-4 px-3 py-1 bg-primary/10 text-primary border-none hover:bg-primary/20">
              Portfolio
            </Badge>
            <h2 className="text-4xl font-bold tracking-tight mb-4">Featured Projects</h2>
            <p className="text-muted-foreground">
              A selection of my recent work across product development, design, and engineering.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate={isProjectsInView ? "visible" : "hidden"}
            variants={staggerChildren}
          >
            <motion.div variants={fadeInVariants}>
              <ProjectCard
                title="Feedback Report Dashboard"
                role="Developer"
                tools={["React", "TypeScript", "RTK Query", "Cypher"]}
                description="Built a React app integrating with Neo4j to display issue tickets and report dashboards. Designed with MUI components, grid tables, and backend filtering for usability."
                image="/placeholder.svg?height=400&width=600"
                link="#"
                date="July 2024"
              />
            </motion.div>

            <motion.div variants={fadeInVariants}>
              <ProjectCard
                title="Glassdoor Salary Insights Dashboard"
                role="Data Analyst"
                tools={["Python", "Pandas", "Web Scraping", "matplotlib"]}
                description="Scraped job data from Glassdoor and analyzed salary distributions by title, location, and employer. Visualized job trends and outliers in tech hiring using bar plots and salary ranges."
                image="/placeholder.svg?height=400&width=600"
                link="#"
                date="May 2024"
              />
            </motion.div>

            <motion.div variants={fadeInVariants}>
              <ProjectCard
                title="Real-Time Bidding Application"
                role="Developer"
                tools={["C#", ".NET", "Windows Forms", "WebSockets"]}
                description="Created a real-time auction system with client-server communications using WebSockets. Used SOLID design principles to ensure codebase modularity and clarity."
                image="/placeholder.svg?height=400&width=600"
                link="#"
                date="Mar. 2024 - May 2024"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container px-4 py-32">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="text-center mb-16">
            <Badge className="mb-4 px-3 py-1 bg-primary/10 text-primary border-none hover:bg-primary/20">
              Testimonials
            </Badge>
            <h2 className="text-4xl font-bold tracking-tight mb-4">What People Say</h2>
          </div>

          <div className="relative">
            <div className="absolute top-0 left-0 w-20 h-20 -translate-x-1/2 -translate-y-1/2">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16Z"
                  fill="currentColor"
                  className="text-primary/10"
                />
              </svg>
            </div>

            <div className="bg-muted/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-12">
              <p className="text-xl md:text-2xl font-medium mb-8 italic text-foreground/90">
                "Working with Taj was a game-changer for our product. His ability to understand business needs and
                translate them into elegant technical solutions is exceptional. The attention to detail and focus on
                user experience sets him apart."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-muted mr-4"></div>
                <div>
                  <h4 className="font-medium">Sarah Johnson</h4>
                  <p className="text-sm text-muted-foreground">CPO at TechVentures</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 right-0 w-16 h-16 translate-x-1/2 translate-y-1/2">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M64 32C64 49.6731 49.6731 64 32 64C14.3269 64 0 49.6731 0 32C0 14.3269 14.3269 0 32 0C49.6731 0 64 14.3269 64 32Z"
                  fill="currentColor"
                  className="text-primary/10"
                />
              </svg>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Contact Section with Animated Form */}
      <section className="container px-4 py-32 relative" id="contact">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
          <div className="absolute top-1/3 right-1/3 w-[400px] h-[400px] rounded-full bg-emerald-400/5 blur-3xl" />
          <div className="absolute bottom-1/2 left-1/3 w-[500px] h-[500px] rounded-full bg-green-400/5 blur-3xl" />
        </div>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="text-center mb-16">
            <Badge className="mb-4 px-3 py-1 bg-primary/10 text-primary border-none hover:bg-primary/20">Contact</Badge>
            <h2 className="text-4xl font-bold tracking-tight mb-4">Get In Touch</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Interested in working together? Feel free to reach out for collaborations or just a friendly hello.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
            <div className="md:col-span-2 space-y-6">
              <motion.div
                className="group p-6 rounded-xl bg-muted/50 backdrop-blur-sm border border-border/50 hover:border-primary/20 transition-all duration-300"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <h3 className="font-medium mb-2 group-hover:text-primary transition-colors">Email</h3>
                <p className="text-sm text-muted-foreground">tajikhlaas@ksu.edu</p>
              </motion.div>

              <motion.div
                className="group p-6 rounded-xl bg-muted/50 backdrop-blur-sm border border-border/50 hover:border-primary/20 transition-all duration-300"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <h3 className="font-medium mb-2 group-hover:text-primary transition-colors">Location</h3>
                <p className="text-sm text-muted-foreground">Manhattan, KS</p>
              </motion.div>

              <motion.div
                className="group p-6 rounded-xl bg-muted/50 backdrop-blur-sm border border-border/50 hover:border-primary/20 transition-all duration-300"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <h3 className="font-medium mb-2 group-hover:text-primary transition-colors">Social</h3>
                <div className="flex space-x-4">
                  <a href="https://www.linkedin.com/in/tajammul-ikhlaas-b1a241265/" className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                  <a href="https://github.com/TajDotGit" className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </div>
              </motion.div>
            </div>

            <div className="md:col-span-3">
              <div className="bg-muted/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8">
                <form className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200"
                      placeholder="Your email"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200 resize-none"
                      placeholder="Your message"
                    ></textarea>
                  </div>

                  <Button
                    className="group relative w-full overflow-hidden rounded-lg px-6 py-6 text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    size="lg"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Send Message
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-500 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}